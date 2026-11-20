"use client";

import React from "react";
import Link from "next/link";
import { AuditType } from "@/lib/types";

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
    mark: "RB",
    gradient: "from-blue-600 to-indigo-700",
    title: "Rethink Business",
    subtitle: "BMI & Lifestyle Health Audit",
    scoreLabel: "Health Score",
    navBg: "bg-[#0B132B]/95",
    navBorder: "border-[#1C2541]",
    scoreColor: "text-blue-400",
    accentDot: "bg-blue-400",
  },
  fitness: {
    mark: "RF",
    gradient: "from-emerald-500 to-teal-700",
    title: "Rethink Fitness",
    subtitle: "1-on-1 Fitness Diagnostic",
    scoreLabel: "Fitness Score",
    navBg: "bg-[#090D16]/95",
    navBorder: "border-[#1E293B]",
    scoreColor: "text-emerald-400",
    accentDot: "bg-emerald-400",
  },
  nutrition: {
    mark: "RN",
    gradient: "from-amber-500 to-orange-700",
    title: "Rethink Nutrition",
    subtitle: "Clinical Diet Intake",
    scoreLabel: "Metabolic Score",
    navBg: "bg-[#1C130E]/95",
    navBorder: "border-[#362419]",
    scoreColor: "text-amber-400",
    accentDot: "bg-amber-400",
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
      className={`sticky top-11 sm:top-11 z-40 ${brand.navBg} text-white border-b ${brand.navBorder} shadow-lg backdrop-blur-md no-print`}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Monogram & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${brand.gradient} text-white font-black text-xs tracking-wider shrink-0 shadow-md flex items-center justify-center font-mono`}
            title={brand.title}
          >
            {brand.mark}
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-black text-xs sm:text-sm tracking-tight text-white block truncate">
                {brand.title}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${brand.accentDot} shrink-0`} />
              <span className={`text-xs font-semibold ${brand.scoreColor} truncate hidden sm:inline`}>
                {businessName?.trim() ? businessName : "Diagnostic Intake"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              {brand.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Answered Progress & Live Score Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Progress pill */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
            <span className="text-slate-400">Answered:</span>
            <span className="font-bold text-white">
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          {/* Live Score Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-black/40 border border-white/10">
            <div className="text-right">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none">
                {brand.scoreLabel}
              </span>
              <div className="flex items-baseline gap-0.5 leading-none mt-1">
                <span className={`text-lg sm:text-xl font-black tracking-tight font-mono text-white`}>
                  {currentScore}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">
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
