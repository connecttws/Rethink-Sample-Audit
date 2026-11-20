"use client";

export const dynamic = "force-dynamic";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportCover } from "@/components/report/ReportCover";
import { ReportBreakdown } from "@/components/report/ReportBreakdown";
import { ReportActionPlan } from "@/components/report/ReportActionPlan";
import { ReportFindings } from "@/components/report/ReportFindings";
import { AuditRecord, AuditType } from "@/lib/types";
import {
  getSessionRecord,
  decodeRecordFromPayload,
  getSampleRecordForType,
} from "@/lib/session-store";
import { Loader2 } from "lucide-react";

function ReportContent({ record }: { record: AuditRecord }) {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Executive Cover Banner */}
      <ReportCover record={record} />

      {/* 2. Pillar Score Breakdown */}
      <ReportBreakdown sectionScores={record.sectionScores} auditType={record.auditType} />

      {/* 3. Prescribed Turnaround Blueprint */}
      <ReportActionPlan record={record} />

      {/* 4. Itemized Findings Breakdown */}
      <ReportFindings findings={record.findings} />

      {/* Report Footer */}
      <div className="text-center py-10 text-xs text-slate-400 space-y-1.5 font-mono">
        <div className="flex items-center justify-center gap-2 mb-1">
          <p className="font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
            {record.auditType === "business"
              ? "TWS Business · Lifestyle & Health Audit"
              : record.auditType === "fitness"
              ? "TWS Fitness · Comprehensive 1-on-1 Fitness Diagnostic"
              : "TWS Nutrition · Clinical Diet & Metabolic Diagnostic"}
          </p>
        </div>
        <p className="text-[11px] text-slate-400">
          TWS Client Diagnostic Report · Ref {record.id}
        </p>
      </div>
    </div>
  );
}

export default function CustomerReportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-950">
      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-7 h-7 text-black animate-spin" />
            <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Initializing Diagnostic Engine...
            </p>
          </div>
        }
      >
        <ReportViewerWrapper />
      </Suspense>
    </div>
  );
}

function ReportViewerWrapper() {
  const searchParams = useSearchParams();
  const [record, setRecord] = useState<AuditRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get("id");
    const payload = searchParams.get("d");
    const rawType = (searchParams.get("type") || "fitness") as AuditType;

    let isMounted = true;

    async function resolveReport() {
      // 1. If an ID is provided, check instant caches first, then DB
      if (id) {
        // Fast local session check
        const sessionRecord = getSessionRecord();
        if (
          sessionRecord &&
          (sessionRecord.id === id || sessionRecord.id.toLowerCase() === id.toLowerCase())
        ) {
          if (isMounted) {
            setRecord(sessionRecord);
            setIsLoading(false);
          }
          return;
        }

        // Fast localStorage history check
        if (typeof window !== "undefined") {
          try {
            const raw = localStorage.getItem("tws_audit_history_records_v1");
            if (raw) {
              const parsed = JSON.parse(raw);
              const found = parsed.find((p: any) => p.id === id);
              if (found?.payload) {
                const decoded = decodeRecordFromPayload(found.payload);
                if (decoded) {
                  if (isMounted) {
                    setRecord(decoded);
                    setIsLoading(false);
                  }
                  return;
                }
              }
            }
          } catch {}
        }

        // Fetch from Database API
        try {
          const res = await fetch(`/api/audits/${encodeURIComponent(id)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.audit) {
              if (isMounted) {
                setRecord(data.audit);
                setIsLoading(false);
              }
              return;
            }
          }
        } catch (err) {
          console.warn("API lookup by ID failed, falling back:", err);
        }
      }

      // 2. Fallback to URL payload (?d=...)
      if (payload) {
        const fromPayload = decodeRecordFromPayload(payload);
        if (fromPayload) {
          if (isMounted) {
            setRecord(fromPayload);
            setIsLoading(false);
          }
          return;
        }
      }

      // 3. Fallback to active session
      const sessionRecord = getSessionRecord();
      if (sessionRecord && (!rawType || sessionRecord.auditType === rawType)) {
        if (isMounted) {
          setRecord(sessionRecord);
          setIsLoading(false);
        }
        return;
      }

      // 4. Sample Record Fallback
      if (isMounted) {
        setRecord(getSampleRecordForType(rawType));
        setIsLoading(false);
      }
    }

    resolveReport();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  if (isLoading || !record) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 text-black animate-spin" />
        <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Loading Diagnostic Intelligence...
        </p>
      </div>
    );
  }

  return (
    <>
      <ReportHeader record={record} />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-10">
        <ReportContent record={record} />
      </main>
    </>
  );
}
