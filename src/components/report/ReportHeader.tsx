"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Printer, Share2, Check, ArrowLeft, MessageSquare } from "lucide-react";
import { AuditRecord } from "@/lib/types";
import {
  generateWhatsAppReportMessage,
  encodeRecordToPayload,
} from "@/lib/session-store";
import { TwsLogo } from "@/components/TwsLogo";

interface ReportHeaderProps {
  record: AuditRecord;
}

const BRAND_CONFIGS = {
  business: {
    mark: "TB",
    gradient: "from-blue-600 to-indigo-700",
    name: "TWS Business",
    subtitle: "BMI & Lifestyle Health Audit",
    path: "/business",
  },
  fitness: {
    mark: "TF",
    gradient: "from-emerald-500 to-teal-700",
    name: "TWS Fitness",
    subtitle: "1-on-1 Fitness Diagnostic",
    path: "/fitness",
  },
  nutrition: {
    mark: "TN",
    gradient: "from-amber-500 to-orange-700",
    name: "TWS Nutrition",
    subtitle: "Clinical Diet & Metabolic Diagnostic",
    path: "/nutrition",
  },
};

export function ReportHeader({ record }: ReportHeaderProps) {
  const [copied, setCopied] = useState(false);
  const brand = BRAND_CONFIGS[record.auditType] || BRAND_CONFIGS.fitness;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const payloadStr = encodeRecordToPayload(record);
  const reportUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/report?type=${record.auditType}&d=${payloadStr}`
      : `/report?type=${record.auditType}&d=${payloadStr}`;

  const handleShareWhatsApp = () => {
    const text = generateWhatsAppReportMessage(record, reportUrl);
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(reportUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert(`Report Link: ${reportUrl}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 text-slate-900 border-b border-slate-200/90 shadow-xs backdrop-blur-md no-print">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand & Reference */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={brand.path}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            title="Back to Diagnostic Intake"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2.5 min-w-0">
            <TwsLogo
              auditCategory={record.auditType}
              imageClassName="h-7 w-auto"
              showLink={false}
            />
            <div className="min-w-0 truncate border-l border-slate-200 pl-2.5">
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-black text-xs sm:text-sm tracking-tight text-slate-900 truncate">
                  {brand.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-emerald-700 truncate">
                  {record.business.name}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium truncate">
                {brand.subtitle} · Ref: {record.id}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save PDF</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1da851] text-slate-950 transition-colors shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
}
