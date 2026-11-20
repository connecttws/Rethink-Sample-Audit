import { AuditRecord, AuditType } from "./types";
import { encodeRecordToPayload } from "./session-store";

export interface HistoryRecord {
  id: string;
  type: AuditType | "physio";
  typeBadge: string;
  clientName: string;
  phone: string;
  auditorName?: string;
  auditorPhone?: string;
  score: number;
  maxScore: number;
  bandTitle: string;
  date: string;
  createdAt: number;
  locality?: string;
  payload?: string;
}

const STORAGE_KEY = "tws_audit_history_records_v1";

export const SEED_HISTORY_RECORDS: HistoryRecord[] = [];

export function getAuditHistory(): HistoryRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: HistoryRecord[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Automatically purge any old/legacy mock seed records if cached in localStorage
        return parsed.filter(
          (r) =>
            !r.id.startsWith("tws-biz-") &&
            !r.id.startsWith("tws-fit-") &&
            !r.id.startsWith("tws-nut-") &&
            !r.id.startsWith("tws-phy-")
        );
      }
    }
  } catch (err) {
    console.warn("Failed to read audit history from localStorage:", err);
  }

  return [];
}

export async function fetchAuditHistoryAsync(category = "all"): Promise<HistoryRecord[]> {
  const localList = getAuditHistory();

  try {
    const res = await fetch(`/api/history?type=${encodeURIComponent(category)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.history)) {
        // Merge cloud database records with local records (deduplicate by id)
        const dbIds = new Set(data.history.map((h: HistoryRecord) => h.id));
        const merged = [...data.history, ...localList.filter((l) => !dbIds.has(l.id))];
        return merged;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch history from API, using local storage:", err);
  }

  return localList;
}

export function saveAuditToHistory(record: AuditRecord): void {
  if (typeof window === "undefined") return;

  try {
    const currentList = getAuditHistory();
    const payload = encodeRecordToPayload(record);

    const typeBadge =
      record.auditType === "business"
        ? "TWS Business & Lifestyle"
        : record.auditType === "fitness"
        ? "TWS Fitness Diagnostic"
        : "TWS Clinical Nutrition";

    // Read stored auditor profile from localStorage
    const localAuditorName = localStorage.getItem("tws_auditor_name") || undefined;
    const localAuditorPhone = localStorage.getItem("tws_auditor_phone") || undefined;

    const auditorName =
      localAuditorName ||
      record.business.auditorName ||
      "TWS Coach";

    const newEntry: HistoryRecord = {
      id: record.id,
      type: record.auditType,
      typeBadge,
      clientName: record.business.name || record.business.clientName || "Client Intake",
      phone: record.business.whatsappNumber || record.business.phone || "Not Provided",
      auditorName,
      auditorPhone: localAuditorPhone,
      score: record.totalScore,
      maxScore: record.maxScore,
      bandTitle: record.band.title,
      date: new Date(record.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      createdAt: new Date(record.createdAt).getTime(),
      locality: record.business.category || record.business.locality || undefined,
      payload,
    };

    // Save to local storage for instant offline availability
    const filtered = currentList.filter((item) => item.id !== record.id);
    const updated = [newEntry, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Save asynchronously to Supabase PostgreSQL database table (tws_sample_audit)
    fetch("/api/audits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        record,
        auditor: {
          name: auditorName,
          phone: localAuditorPhone,
        },
        payload,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Successfully saved audit to PostgreSQL tws_sample_audit table, ID:", data.id);
        }
      })
      .catch((err) => console.warn("Background API save to tws_sample_audit error:", err));
  } catch (err) {
    console.warn("Failed to save audit to history:", err);
  }
}

export function clearAuditHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear audit history:", err);
  }
}
