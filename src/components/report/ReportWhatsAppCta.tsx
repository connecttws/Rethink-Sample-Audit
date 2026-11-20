"use client";

import React from "react";
import { MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { AuditRecord } from "@/lib/types";
import { encodeRecordToPayload } from "@/lib/session-store";

interface ReportWhatsAppCtaProps {
  record: AuditRecord;
}

const RETHINK_SUPPORT_PHONE = "918368052044";
const RETHINK_DISPLAY_PHONE = "+91 8368052044";

const CTA_CONTENT = {
  business: {
    headline: "Ready to turn this lifestyle & BMI assessment into your 12-week body transformation?",
    description: "Rethink Coaching provides guided 1-on-1 accountability, progressive strength splits, tailored macro-nutrition targets, and bi-weekly body composition scans.",
    bullets: ["1-on-1 Dedicated Coach", "Custom Nutrition & Macros", "90-Day Guaranteed Milestones"],
  },
  fitness: {
    headline: "Ready to turn this biomechanical assessment into your 12-week body transformation?",
    description: "Rethink Fitness provides guided 1-on-1 coaching, progressive strength splits, tailored macro-nutrition targets, and bi-weekly body composition scans.",
    bullets: ["1-on-1 Dedicated Coach", "Custom Nutrition & Macros", "90-Day Guaranteed Milestones"],
  },
  nutrition: {
    headline: "Ready to reset your metabolism, clear bloating and drop visceral belly fat?",
    description: "Rethink Nutrition pairs you with a Clinical Nutritionist for daily photo food logging, targeted gut microbiome repair, and high-protein satiety anchoring.",
    bullets: ["1-on-1 Clinical Nutritionist", "Microbiome & Bloat Reset", "Daily WhatsApp Accountability"],
  },
};

export function ReportWhatsAppCta({ record }: ReportWhatsAppCtaProps) {
  const content = CTA_CONTENT[record.auditType] || CTA_CONTENT.fitness;

  const handleConnectWhatsApp = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const payloadStr = encodeRecordToPayload(record);
    const shortUrl = `${origin}/report?type=${record.auditType}&d=${payloadStr}`;

    const text =
      `Hi Rethink Team! I reviewed my diagnostic report for *${record.business.name}* (Score: ${record.totalScore}/100, Ref: ${record.id}).\n\n` +
      `*My Diagnostic Report:* ${shortUrl}\n\n` +
      `I would like to discuss enrolling in the recommended *${record.band.sprintRecommendation}*. Please let me know the next available onboarding slot!`;

    window.open(
      `https://wa.me/${RETHINK_SUPPORT_PHONE}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white p-7 sm:p-10 shadow-2xl border border-emerald-500/30 space-y-7">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-emerald-500/20" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 flex-1 text-center lg:text-left">
          {/* Status pill with Rethink contact badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Rethink Diagnostic Direct Line · {RETHINK_DISPLAY_PHONE}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
            {content.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            {content.description}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-300 font-semibold">
            {content.bullets.map((b, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Big WhatsApp Conversion Button */}
        <div className="shrink-0 w-full sm:w-auto text-center space-y-2">
          <button
            type="button"
            onClick={handleConnectWhatsApp}
            className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1da851] text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>Chat on WhatsApp ({RETHINK_DISPLAY_PHONE})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
            <span>Direct link with diagnostic report attached</span>
            <span>·</span>
            <span className="text-emerald-400 font-bold">Fast Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
}
