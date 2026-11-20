import { AuditRecord, AuditType } from "./types";
import { encodeRecordToPayload } from "./session-store";

export interface HistoryRecord {
  id: string;
  type: AuditType | "physio";
  typeBadge: string;
  clientName: string;
  phone: string;
  score: number;
  maxScore: number;
  bandTitle: string;
  date: string;
  createdAt: number;
  locality?: string;
  payload?: string;
}

const STORAGE_KEY = "tws_audit_history_records_v1";

export const SEED_HISTORY_RECORDS: HistoryRecord[] = [
  // 1. Business / Lifestyle Records
  {
    id: "tws-biz-901",
    type: "business",
    typeBadge: "TWS Business & Lifestyle",
    clientName: "Rahul Sharma",
    phone: "9810234567",
    score: 74,
    maxScore: 100,
    bandTitle: "Strong Foundation (Tier 2)",
    date: "19 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 18,
    locality: "Connaught Place · Fat Loss & Toning",
  },
  {
    id: "tws-biz-902",
    type: "business",
    typeBadge: "TWS Business & Lifestyle",
    clientName: "Kunal Mehra",
    phone: "9871122334",
    score: 58,
    maxScore: 100,
    bandTitle: "Moderate Friction & Drag",
    date: "18 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 42,
    locality: "Cyber City, Gurugram · Desk Worker Recomp",
  },
  {
    id: "tws-biz-903",
    type: "business",
    typeBadge: "TWS Business & Lifestyle",
    clientName: "Neha Aggarwal",
    phone: "9910554433",
    score: 82,
    maxScore: 100,
    bandTitle: "High Metabolic Momentum",
    date: "17 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 65,
    locality: "South Ex Branch · Lean Muscle Gain",
  },
  {
    id: "tws-biz-904",
    type: "business",
    typeBadge: "TWS Business & Lifestyle",
    clientName: "Vikram Singhania",
    phone: "9820011223",
    score: 44,
    maxScore: 100,
    bandTitle: "Critical Lifestyle Reset Needed",
    date: "16 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 88,
    locality: "Noida Sector 62 · Stress & Sleep Deficit",
  },
  {
    id: "tws-biz-905",
    type: "business",
    typeBadge: "TWS Business & Lifestyle",
    clientName: "Rohan Malhotra",
    phone: "9899887766",
    score: 66,
    maxScore: 100,
    bandTitle: "Moderate Friction & Drag",
    date: "15 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 112,
    locality: "Indirapuram · Visceral Fat Drop",
  },
  {
    id: "tws-biz-906",
    type: "business",
    typeBadge: "TWS Business & Lifestyle",
    clientName: "Aditi Rao",
    phone: "9818822334",
    score: 88,
    maxScore: 100,
    bandTitle: "Optimal Metabolic Fitness",
    date: "14 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 135,
    locality: "GK-2 Studio · Marathon Conditioning",
  },

  // 2. Fitness / Biomechanics Records
  {
    id: "tws-fit-801",
    type: "fitness",
    typeBadge: "TWS Fitness Diagnostic",
    clientName: "Aakash Verma",
    phone: "9899123456",
    score: 78,
    maxScore: 100,
    bandTitle: "Athletic Ready / Solid Base",
    date: "19 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 20,
    locality: "Vasant Kunj · 32 yrs · Burn Belly Fat",
  },
  {
    id: "tws-fit-802",
    type: "fitness",
    typeBadge: "TWS Fitness Diagnostic",
    clientName: "Siddharth Oberoi",
    phone: "9958774411",
    score: 52,
    maxScore: 100,
    bandTitle: "Structural Compensations Detected",
    date: "18 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 45,
    locality: "Saket Gym · Anterior Pelvic Tilt",
  },
  {
    id: "tws-fit-803",
    type: "fitness",
    typeBadge: "TWS Fitness Diagnostic",
    clientName: "Tarun Kapoor",
    phone: "9811443322",
    score: 92,
    maxScore: 100,
    bandTitle: "Peak Functional Symmetry",
    date: "17 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 68,
    locality: "Defence Colony · Strength & Hypertrophy",
  },
  {
    id: "tws-fit-804",
    type: "fitness",
    typeBadge: "TWS Fitness Diagnostic",
    clientName: "Gaurav Chawla",
    phone: "9810123987",
    score: 48,
    maxScore: 100,
    bandTitle: "Lumbar Shear & Desk Slouch",
    date: "16 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 92,
    locality: "Dwarka Sector 10 · Shoulder Impingement",
  },
  {
    id: "tws-fit-805",
    type: "fitness",
    typeBadge: "TWS Fitness Diagnostic",
    clientName: "Manish Batra",
    phone: "9873344556",
    score: 64,
    maxScore: 100,
    bandTitle: "Moderate Joint Restrictions",
    date: "15 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 115,
    locality: "Punjabi Bagh · Squat Knee Valgus",
  },
  {
    id: "tws-fit-806",
    type: "fitness",
    typeBadge: "TWS Fitness Diagnostic",
    clientName: "Arjun Nair",
    phone: "9845012345",
    score: 76,
    maxScore: 100,
    bandTitle: "Solid Athletic Foundation",
    date: "14 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 140,
    locality: "Hauz Khas · Kettlebell & Mobility",
  },

  // 3. Nutrition / Metabolic Records
  {
    id: "tws-nut-701",
    type: "nutrition",
    typeBadge: "TWS Clinical Nutrition",
    clientName: "Priya Sharma",
    phone: "9818765432",
    score: 68,
    maxScore: 100,
    bandTitle: "Metabolic Drag & Sugar Spikes",
    date: "19 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 22,
    locality: "Gurugram Phase 5 · Gut Dysbiosis & Bloat",
  },
  {
    id: "tws-nut-702",
    type: "nutrition",
    typeBadge: "TWS Clinical Nutrition",
    clientName: "Ananya Deshmukh",
    phone: "9820556677",
    score: 84,
    maxScore: 100,
    bandTitle: "High Protein Density & Clean Gut",
    date: "18 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    locality: "Bandra West · Plant-Based Hormone Balance",
  },
  {
    id: "tws-nut-703",
    type: "nutrition",
    typeBadge: "TWS Clinical Nutrition",
    clientName: "Ritu Sengupta",
    phone: "9830112233",
    score: 42,
    maxScore: 100,
    bandTitle: "Critical Nutrient & Protein Deficit",
    date: "17 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 70,
    locality: "Salt Lake · Evening Cortisol Cravings",
  },
  {
    id: "tws-nut-704",
    type: "nutrition",
    typeBadge: "TWS Clinical Nutrition",
    clientName: "Shalini Saxena",
    phone: "9811889900",
    score: 60,
    maxScore: 100,
    bandTitle: "Hidden Liquid Sugar Leaks",
    date: "16 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 95,
    locality: "Alaknanda · Chai & Biscuit Habit",
  },
  {
    id: "tws-nut-705",
    type: "nutrition",
    typeBadge: "TWS Clinical Nutrition",
    clientName: "Deepika Joshi",
    phone: "9871144332",
    score: 72,
    maxScore: 100,
    bandTitle: "Moderate Metabolic Momentum",
    date: "15 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 118,
    locality: "Rajouri Garden · Postpartum Recomp",
  },
  {
    id: "tws-nut-706",
    type: "nutrition",
    typeBadge: "TWS Clinical Nutrition",
    clientName: "Meenakshi Sundaram",
    phone: "9840123456",
    score: 86,
    maxScore: 100,
    bandTitle: "Optimal Gut & Insulin Sensitivity",
    date: "14 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 144,
    locality: "Anna Nagar · High Protein Anchor",
  },

  // 4. Other / Physiotherapy Records
  {
    id: "tws-phy-601",
    type: "physio",
    typeBadge: "TWS Physio Audit",
    clientName: "Amit Patel",
    phone: "9825012345",
    score: 62,
    maxScore: 100,
    bandTitle: "Compensatory Strain & Disc Bulge",
    date: "19 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 16,
    locality: "Lumbar Spine Track · 38 yrs · Desk Slouch",
  },
  {
    id: "tws-phy-602",
    type: "physio",
    typeBadge: "TWS Physio Audit",
    clientName: "Harsh Vardhan",
    phone: "9910022334",
    score: 48,
    maxScore: 100,
    bandTitle: "Subacromial Impingement Arc",
    date: "18 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 40,
    locality: "Cervical & Shoulder Track · Overhead Catch",
  },
  {
    id: "tws-phy-603",
    type: "physio",
    typeBadge: "TWS Physio Audit",
    clientName: "Vandana Sethi",
    phone: "9811225544",
    score: 76,
    maxScore: 100,
    bandTitle: "Functional Joint Restoration",
    date: "17 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 64,
    locality: "Knee Joint Track · Patellar Shear Relieved",
  },
  {
    id: "tws-phy-604",
    type: "physio",
    typeBadge: "TWS Physio Audit",
    clientName: "Pradeep Joshi",
    phone: "9876543210",
    score: 38,
    maxScore: 100,
    bandTitle: "Acute Mechanical Block & Nerve Pinch",
    date: "16 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 90,
    locality: "Sciatic Radiculopathy · Red Flag Cleared",
  },
  {
    id: "tws-phy-605",
    type: "physio",
    typeBadge: "TWS Physio Audit",
    clientName: "Kavita Menon",
    phone: "9847012345",
    score: 68,
    maxScore: 100,
    bandTitle: "Rotator Cuff Tendinopathy",
    date: "15 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 114,
    locality: "Shoulder Complex · Phase 2 Stabilizer",
  },
  {
    id: "tws-phy-606",
    type: "physio",
    typeBadge: "TWS Physio Audit",
    clientName: "Deepak Choudhary",
    phone: "9829012345",
    score: 82,
    maxScore: 100,
    bandTitle: "Gait & Pelvic Neutral Restored",
    date: "14 Nov 2026",
    createdAt: Date.now() - 1000 * 60 * 60 * 138,
    locality: "Hip & Pelvis Track · Glute Medius Re-education",
  },
];

export function getAuditHistory(): HistoryRecord[] {
  if (typeof window === "undefined") return SEED_HISTORY_RECORDS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: HistoryRecord[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to read audit history from localStorage:", err);
  }

  // Save seed if nothing stored
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_HISTORY_RECORDS));
  } catch {
    // Ignore storage quota
  }

  return SEED_HISTORY_RECORDS;
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

    const newEntry: HistoryRecord = {
      id: record.id,
      type: record.auditType,
      typeBadge,
      clientName: record.business.name || record.business.clientName || "Client Intake",
      phone: record.business.whatsappNumber || record.business.phone || "Not Provided",
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

    // Remove if duplicate id exists
    const filtered = currentList.filter((item) => item.id !== record.id);
    const updated = [newEntry, ...filtered];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
