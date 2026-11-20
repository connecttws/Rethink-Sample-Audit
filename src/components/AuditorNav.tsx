"use client";

import React from "react";
import Link from "next/link";
import { AuditType } from "@/lib/types";
import { TwsLogo } from "./TwsLogo";

interface AuditorNavProps {
  auditType: AuditType;
  businessName?: string;
  category?: string;
  currentScore: number;
  maxScore?: number;
  answeredCount: number;
  totalQuestions?: number;
}

const BRAND_CONFIGS: Record<
  AuditType,
  {
    mark: string;
    gradient: string;
    title: string;
    subtitle: string;
    scoreLabel: string;
    navBg: string;
    navBorder: string;
    scoreColor: string;
    accentDot: string;
  }
> = {
  business: {
    mark: "TB",
    gradient: "from-blue-600 to-indigo-700",
    title: "TWS Business",
    subtitle: "BMI & Lifestyle Health Audit",
    scoreLabel: "Health Score",
    navBg: "bg-white/95",
    navBorder: "border-slate-200",
    scoreColor: "text-blue-600",
    accentDot: "bg-blue-600",
  },
  fitness: {
    mark: "TF",
    gradient: "from-emerald-500 to-teal-700",
    title: "TWS Fitness",
    subtitle: "1-on-1 Fitness Diagnostic",
    scoreLabel: "Fitness Score",
    navBg: "bg-white/95",
    navBorder: "border-slate-200",
    scoreColor: "text-emerald-600",
    accentDot: "bg-emerald-600",
  },
  nutrition: {
    mark: "TN",
    gradient: "from-amber-500 to-orange-700",
    title: "TWS Nutrition",
    subtitle: "Clinical Diet Intake",
    scoreLabel: "Metabolic Score",
    navBg: "bg-white/95",
    navBorder: "border-slate-200",
    scoreColor: "text-amber-600",
    accentDot: "bg-amber-600",
  },
};

export function AuditorNav({
  auditType,
  businessName,
  currentScore,
  maxScore = 100,
  answeredCount,
  totalQuestions = 18,
}: AuditorNavProps) {
  const brand = BRAND_CONFIGS[auditType];

  return (
    <header
      className={`sticky top-11 sm:top-11 z-40 ${brand.navBg} text-slate-900 border-b ${brand.navBorder} shadow-sm backdrop-blur-md no-print`}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: TWS Logo (with double-click secret history) & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="shrink-0" title="Back to Intake Engine Hub">
            <TwsLogo
              auditCategory={auditType}
              imageClassName="h-7 sm:h-8 w-auto"
              showLink={false}
            />
          </Link>

          <div className="min-w-0 border-l border-slate-200 pl-3">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-black text-xs sm:text-sm tracking-tight text-slate-900 block truncate">
                {brand.title}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${brand.accentDot} shrink-0`} />
              <span className={`text-xs font-semibold ${brand.scoreColor} truncate hidden sm:inline`}>
                {businessName?.trim() ? businessName : "Diagnostic Intake"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              {brand.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Answered Progress & Live Score Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Progress pill */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs text-slate-700">
            <span className="text-slate-500">Answered:</span>
            <span className="font-bold text-slate-900">
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          {/* Live Score Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
            <div className="text-right">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block leading-none">
                {brand.scoreLabel}
              </span>
              <div className="flex items-baseline gap-0.5 leading-none mt-1">
                <span className={`text-lg sm:text-xl font-black tracking-tight font-mono text-slate-900`}>
                  {currentScore}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 font-mono">
                  /{maxScore}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
