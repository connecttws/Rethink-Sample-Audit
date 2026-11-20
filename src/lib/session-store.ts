import { AuditRecord, AuditType } from "./types";
import { SAMPLE_BUSINESS_RECORD } from "./business-data";
import { SAMPLE_FITNESS_RECORD } from "./fitness-data";
import { SAMPLE_NUTRITION_RECORD } from "./nutrition-data";

const SESSION_STORAGE_KEY = "rethink_sample_audit_current";

export function saveSessionRecord(record: AuditRecord): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(record));
  } catch (err) {
    console.warn("sessionStorage save error:", err);
  }
}

export function getSessionRecord(): AuditRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("sessionStorage read error:", err);
    return null;
  }
}

export function clearSessionRecord(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.warn("sessionStorage clear error:", err);
  }
}

export function encodeRecordToPayload(record: AuditRecord): string {
  try {
    const jsonStr = JSON.stringify(record);
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      return encodeURIComponent(window.btoa(encodeURIComponent(jsonStr)));
    }
    return encodeURIComponent(Buffer.from(jsonStr).toString("base64"));
  } catch (err) {
    console.error("Payload encode error:", err);
    return "";
  }
}

export function decodeRecordFromPayload(payload: string): AuditRecord | null {
  if (!payload) return null;
  try {
    const decoded = decodeURIComponent(payload);
    let jsonStr = "";
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      jsonStr = decodeURIComponent(window.atob(decoded));
    } else {
      jsonStr = Buffer.from(decoded, "base64").toString("utf-8");
    }
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Payload decode error:", err);
    return null;
  }
}

export function getSampleRecordForType(type: AuditType): AuditRecord {
  switch (type) {
    case "business":
      return SAMPLE_BUSINESS_RECORD;
    case "nutrition":
      return SAMPLE_NUTRITION_RECORD;
    case "fitness":
    default:
      return SAMPLE_FITNESS_RECORD;
  }
}

export function generateWhatsAppReportMessage(record: AuditRecord, reportUrl: string): string {
  if (record.auditType === "business") {
    const ageStr = record.business.age ? ` (Age: ${record.business.age})` : "";
    const bmiStr = record.business.bmi ? `*Live BMI:* ${record.business.bmi} (${record.business.bmiCategory || "Normal"})\n` : "";
    const optimalStr = record.business.optimalMinKg ? `*Safe Optimal Range:* ${record.business.optimalMinKg} - ${record.business.optimalMaxKg} kg\n` : "";
    const gapStr = record.business.weightGapKg ? `*Weight Gap:* ${record.business.weightGapKg}\n` : "";
    const facilityStr = record.business.locality ? `*Facility:* ${record.business.locality}\n` : "";

    return (
      `*RETHINK • BMI & Lifestyle Health Audit*\n` +
      `*Member:* ${record.business.name}${ageStr}\n` +
      `*Primary Fitness Goal:* ${record.business.category}\n` +
      facilityStr +
      bmiStr +
      optimalStr +
      gapStr +
      `\n*Lifestyle Health Score:* ${record.totalScore} / 100 — ${record.band.title}\n\n` +
      `*5-Pillar Score Breakdown:*\n` +
      record.sectionScores
        .map((s) => `• ${s.shortName || s.name}: ${s.score}/${s.maxScore}`)
        .join("\n") +
      `\n\n*Recommended Turnaround Protocol:*\n${record.band.sprintRecommendation}\n${record.band.sprintDetails}\n\n` +
      `*View Full Diagnostic Report Online:*\n${reportUrl}\n\n` +
      `_Prepared by Rethink Lifestyle & Fitness Coaching Team._`
    );
  }

  if (record.auditType === "nutrition") {
    const ageSexStr =
      record.business.age || record.business.biologicalSex
        ? ` (${[record.business.age ? `Age: ${record.business.age}` : "", record.business.biologicalSex].filter(Boolean).join(", ")})`
        : "";
    const dietStr = record.business.dietPreference ? `*Diet:* ${record.business.dietPreference}\n` : "";
    const bmiStr = record.business.bmi ? `*Live BMI:* ${record.business.bmi} (${record.business.bmiCategory || "Assessed"})\n` : "";
    const proteinStr = record.business.proteinNeedMin ? `*Target Protein Need:* ${record.business.proteinNeedMin} - ${record.business.proteinNeedMax}g / day\n` : "";
    const gapStr = record.business.weightGapKg ? `*Weight Gap:* ${record.business.weightGapKg}\n` : "";

    return (
      `*RETHINK NUTRITION • Clinical Diet Intake Summary*\n` +
      `*Nutritional Deficit, Gut Health & Metabolic Rate Diagnostic*\n\n` +
      `*Client:* ${record.business.name}${ageSexStr}\n` +
      `*Target:* ${record.business.category}\n` +
      dietStr +
      bmiStr +
      proteinStr +
      gapStr +
      `\n*Metabolic Score:* ${record.totalScore} / 100 — ${record.band.title}\n\n` +
      `*6-Pillar Nutritional Breakdown:*\n` +
      record.sectionScores
        .map((s) => `• ${s.shortName || s.name}: ${s.score}/${s.maxScore}`)
        .join("\n") +
      `\n\n*Recommended Clinical Protocol:*\n${record.band.sprintRecommendation}\n${record.band.sprintDetails}\n\n` +
      `*View Full Clinical Report Online:*\n${reportUrl}\n\n` +
      `_Prepared by Rethink Clinical Nutrition & Metabolic Team._`
    );
  }

  // Fitness audit
  const ageSexStr =
    record.business.age || record.business.biologicalSex
      ? ` (${[record.business.age ? `Age: ${record.business.age}` : "", record.business.biologicalSex].filter(Boolean).join(", ")})`
      : "";
  const horizonStr = record.business.targetHorizon ? `*Horizon:* ${record.business.targetHorizon}\n` : "";
  const bmiStr = record.business.bmi ? `*Live BMI:* ${record.business.bmi} (${record.business.bmiCategory || "Assessed"})\n` : "";
  const idealStr = record.business.optimalMinKg ? `*Ideal Range:* ${record.business.optimalMinKg} - ${record.business.optimalMaxKg} kg\n` : "";
  const gapStr = record.business.weightGapKg ? `*Weight Gap:* ${record.business.weightGapKg}\n` : "";

  return (
    `*RETHINK FITNESS • Diagnostic Intake Summary*\n` +
    `*Comprehensive Pre-Pitch 1-on-1 Fitness Diagnostic*\n\n` +
    `*Prospect:* ${record.business.name}${ageSexStr}\n` +
    `*Primary Fitness Goal:* ${record.business.category}\n` +
    horizonStr +
    bmiStr +
    idealStr +
    gapStr +
    `\n*Total Fitness Score:* ${record.totalScore} / 100 — ${record.band.title}\n\n` +
    `*6-Pillar Biomechanical & Lifestyle Score:*\n` +
    record.sectionScores
      .map((s) => `• ${s.shortName || s.name}: ${s.score}/${s.maxScore}`)
      .join("\n") +
    `\n\n*Recommended Coaching Protocol:*\n${record.band.sprintRecommendation}\n${record.band.sprintDetails}\n\n` +
    `*View Full Diagnostic Report Online:*\n${reportUrl}\n\n` +
    `_Prepared by Rethink Fitness Coaching & Biomechanics Team._`
  );
}
