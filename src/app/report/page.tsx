"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportCover } from "@/components/report/ReportCover";
import { ReportBreakdown } from "@/components/report/ReportBreakdown";
import { ReportActionPlan } from "@/components/report/ReportActionPlan";
import { ReportFindings } from "@/components/report/ReportFindings";
import { ReportWhatsAppCta } from "@/components/report/ReportWhatsAppCta";
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

      {/* 5. Direct WhatsApp Conversion CTA */}
      <ReportWhatsAppCta record={record} />

      {/* Report Footer */}
      <div className="text-center py-10 text-xs text-slate-400 space-y-1.5 font-mono">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-slate-900 text-emerald-400 font-black text-[10px] flex items-center justify-center font-mono border border-emerald-500/30">
            {record.auditType === "business" ? "RB" : record.auditType === "fitness" ? "RF" : "RN"}
          </div>
          <p className="font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
            {record.auditType === "business"
              ? "Rethink Business · Local Growth & Digital Audit"
              : record.auditType === "fitness"
              ? "Rethink Fitness · Comprehensive 1-on-1 Fitness Diagnostic"
              : "Rethink Nutrition · Clinical Diet & Metabolic Diagnostic"}
          </p>
        </div>
        <p className="text-[11px] text-slate-400">
          Client Diagnostic Report · Ref {record.id}
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
    const rawType = (searchParams.get("type") || "fitness") as AuditType;
    const payload = searchParams.get("d");

    let resolvedRecord: AuditRecord | null = null;
    if (payload) {
      resolvedRecord = decodeRecordFromPayload(payload);
    }
    if (!resolvedRecord) {
      const sessionRecord = getSessionRecord();
      if (sessionRecord && sessionRecord.auditType === rawType) {
        resolvedRecord = sessionRecord;
      }
    }
    if (!resolvedRecord) {
      resolvedRecord = getSampleRecordForType(rawType);
    }

    const timer = setTimeout(() => {
      setRecord(resolvedRecord);
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
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
