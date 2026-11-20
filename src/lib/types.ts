export type AuditType = "business" | "fitness" | "nutrition";

export interface AnswerOption {
  text: string;
  points: number;
  hint?: string;
  badge?: string;
}

export interface Question {
  id: string;
  sectionId: string;
  numberStr?: string; // e.g. "1.1", "1.2"
  text: string;
  description: string;
  options: AnswerOption[];
}

export interface AuditSection {
  id: string;
  name: string;
  shortName: string;
  pillarNumber?: number;
  icon: string;
  maxPoints: number;
  subtitle?: string;
  questions: Question[];
}

export interface ProfileDetails {
  name: string; // Business or Prospect or Client Full Name
  clientName?: string;
  category: string; // Primary Category or Goal
  locality?: string; // Location or Biometrics Summary
  phone?: string;
  whatsappNumber?: string;
  mapsUrl?: string;
  auditorName?: string; // Auditor or Coach Name
  
  // Biometrics & Personal
  age?: string;
  biologicalSex?: "Male" | "Female";
  dietPreference?: string;
  targetHorizon?: string;
  heightCm?: string;
  heightFt?: string;
  heightIn?: string;
  heightUnit?: "cm" | "ft";
  weightKg?: string;
  targetWeightKg?: string;
  bmi?: string;
  bmiCategory?: string;
  optimalMinKg?: string;
  optimalMaxKg?: string;
  weightGapKg?: string;
  proteinNeedMin?: string;
  proteinNeedMax?: string;
  goal?: string;
}

export interface ScoreBand {
  title: string;
  range: string;
  badgeClass: string;
  accentColor: string;
  headline: string;
  description: string;
  sprintRecommendation: string;
  sprintDetails: string;
}

export interface SectionScore {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface Finding {
  questionText: string;
  chosenOptionText: string;
  pointsAwarded: number;
  maxPoints: number;
  sectionName: string;
  hint?: string;
  badge?: string;
}

export interface AuditRecord {
  id: string;
  auditType: AuditType;
  createdAt: string;
  business: ProfileDetails;
  answers: Record<string, number>;
  sectionScores: SectionScore[];
  totalScore: number;
  maxScore: number;
  percentage: number;
  band: ScoreBand;
  findings: Finding[];
  diagnosis?: {
    headline: string;
    laggingPillars: string[];
    diagnosisText: string;
  };
}

export function formatTitleCase(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function cleanPhoneNumber(rawPhone: string): string {
  const digits = (rawPhone || "").replace(/\D/g, "");
  if (digits.length === 10) return "91" + digits;
  if (digits.length === 11 && digits.startsWith("0")) return "91" + digits.slice(1);
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
}

export function isValidIndianMobile(rawPhone: string): boolean {
  const digits = (rawPhone || "").replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 12 && digits.startsWith("91"));
}

export function formatWhatsAppUrl(rawPhone: string, message: string): string {
  const cleanNumber = cleanPhoneNumber(rawPhone);
  const encodedText = encodeURIComponent(message);
  if (cleanNumber && cleanNumber.length >= 10) {
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  }
  return `https://wa.me/?text=${encodedText}`;
}

export function convertFtInToCm(feet: number, inches: number): number {
  const totalInches = (feet || 0) * 12 + (inches || 0);
  return Math.round(totalInches * 2.54);
}

export function convertCmToFtIn(cm: number): { feet: number; inches: number } {
  if (!cm || cm <= 0) return { feet: 0, inches: 0 };
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

export interface BmiAnalysis {
  bmi: number;
  formattedBmi: string;
  category: "Underweight" | "Normal" | "Overweight" | "Obese";
  categoryColor: string;
  optimalMinKg: number;
  optimalMaxKg: number;
  deltaKg: number;
  idealRangeText: string;
  healthyRangeText: string;
  weightGapText: string;
  summary: string;
}

export function calculateBmi(
  heightCmRaw: number | string,
  weightKgRaw: number | string,
  targetKgRaw?: number | string
): BmiAnalysis | null {
  const hCm = typeof heightCmRaw === "string" ? parseFloat(heightCmRaw) : heightCmRaw;
  const wKg = typeof weightKgRaw === "string" ? parseFloat(weightKgRaw) : weightKgRaw;
  const tKg = typeof targetKgRaw === "string" ? parseFloat(targetKgRaw) : targetKgRaw;

  if (!hCm || !wKg || hCm <= 0 || wKg <= 0 || isNaN(hCm) || isNaN(wKg)) {
    return null;
  }

  const hM = hCm / 100;
  const bmiVal = wKg / (hM * hM);
  const formattedBmi = bmiVal.toFixed(1);

  const optimalMinKg = Math.round(18.5 * (hM * hM));
  const optimalMaxKg = Math.round(24.9 * (hM * hM));

  let category: "Underweight" | "Normal" | "Overweight" | "Obese" = "Normal";
  let categoryColor = "#10B981"; // Emerald
  let summary = "Optimal body mass index.";

  if (bmiVal < 18.5) {
    category = "Underweight";
    categoryColor = "#0284C7"; // Sky
    summary = "Below optimal range; muscle mass building recommended.";
  } else if (bmiVal >= 25 && bmiVal < 30) {
    category = "Overweight";
    categoryColor = "#F59E0B"; // Amber
    summary = "Above optimal baseline; calibrated calorie deficit recommended.";
  } else if (bmiVal >= 30) {
    category = "Obese";
    categoryColor = "#EF4444"; // Rose
    summary = "High visceral load; supervised metabolic and fitness protocol needed.";
  }

  let deltaKg = 0;
  if (wKg > optimalMaxKg) {
    deltaKg = -(wKg - optimalMaxKg);
  } else if (wKg < optimalMinKg) {
    deltaKg = optimalMinKg - wKg;
  }

  const idealRangeText = `Ideal: ${optimalMinKg} - ${optimalMaxKg} kg`;
  const healthyRangeText = `Healthy: ${optimalMinKg} - ${optimalMaxKg} kg`;

  let weightGapText = `${deltaKg > 0 ? `+${deltaKg.toFixed(1)}` : deltaKg.toFixed(1)} kg`;
  if (tKg && !isNaN(tKg) && tKg > 0) {
    const gap = tKg - wKg;
    weightGapText = `${gap > 0 ? `+${gap.toFixed(1)}` : gap.toFixed(1)} kg`;
  }

  return {
    bmi: parseFloat(formattedBmi),
    formattedBmi,
    category,
    categoryColor,
    optimalMinKg,
    optimalMaxKg,
    deltaKg,
    idealRangeText,
    healthyRangeText,
    weightGapText,
    summary,
  };
}
