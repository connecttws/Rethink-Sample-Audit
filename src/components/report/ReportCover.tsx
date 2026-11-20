"use client";

import React from "react";
import {
  ShieldCheck,
  Calendar,
  Flame,
  User,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  Target,
  MapPin,
  Utensils,
} from "lucide-react";
import { AuditRecord } from "@/lib/types";

interface ReportCoverProps {
  record: AuditRecord;
}

export function ReportCover({ record }: ReportCoverProps) {
  const score = record.totalScore;

  const getTheme = (s: number) => {
    if (s >= 90) {
      return {
        badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        strokeColor: "#10B981",
        statusLabel: "Market Benchmark / Optimal",
        statusIcon: CheckCircle2,
      };
    }
    if (s >= 70) {
      return {
        badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/30",
        strokeColor: "#0EA5E9",
        statusLabel: "Strong Foundation",
        statusIcon: TrendingUp,
      };
    }
    if (s >= 40) {
      return {
        badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        strokeColor: "#F59E0B",
        statusLabel: "Moderate Friction & Drag",
        statusIcon: AlertTriangle,
      };
    }
    return {
      badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      strokeColor: "#EF4444",
      statusLabel: "Critical Risk & Reset Needed",
      statusIcon: AlertOctagon,
    };
  };

  const theme = getTheme(score);
  const StatusIcon = theme.statusIcon;

  // Radial progress calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 shadow-2xl border border-slate-800/90 space-y-7">
      {/* Ambient background lighting */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ backgroundColor: theme.strokeColor }}
      />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-emerald-600/15" />

      <div className="relative z-10 space-y-7">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800/80 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {record.auditType === "business"
                ? "Rethink Business · Local Growth Audit"
                : record.auditType === "fitness"
                ? "Rethink Fitness · 1-on-1 Diagnostic"
                : "Rethink Nutrition · Clinical Diet Intake"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
              Ref ID: {record.id}
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(record.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Hero Main: Details + Radial Gauge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-1">
          <div className="space-y-4 flex-1">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-semibold text-emerald-300">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {record.auditType === "business"
                    ? `Category: ${record.business.category}`
                    : `Goal: ${record.business.category || record.business.goal}`}
                </span>
              </span>

              {record.business.age && (
                <span className="inline-flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-medium text-slate-200">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <span>Age: <strong>{record.business.age}</strong></span>
                </span>
              )}

              {record.business.biologicalSex && (
                <span className="inline-flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-medium text-slate-200">
                  <span>{record.business.biologicalSex}</span>
                </span>
              )}

              {record.business.targetHorizon && (
                <span className="inline-flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-medium text-purple-300">
                  <Target className="w-3.5 h-3.5 text-purple-400" />
                  <span>{record.business.targetHorizon}</span>
                </span>
              )}

              {record.business.dietPreference && (
                <span className="inline-flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-medium text-amber-300">
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>{record.business.dietPreference}</span>
                </span>
              )}

              {record.business.locality && record.auditType === "business" && (
                <span className="inline-flex items-center gap-1.5 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700/80 text-xs font-medium text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{record.business.locality}</span>
                </span>
              )}

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold ${theme.badgeBg}`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{theme.statusLabel}</span>
              </span>
            </div>

            {/* Title & Headline */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">
                {record.auditType === "business"
                  ? "Local Business Performance Report"
                  : record.auditType === "fitness"
                  ? "Comprehensive 1-on-1 Fitness Diagnostic Report"
                  : "Clinical Nutrition & Metabolic Health Report"}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {record.business.name}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium mt-2 leading-relaxed max-w-2xl">
                {record.band.headline}
              </p>
            </div>

            {/* Auditor Signature */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 font-mono">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>
                Assessment Conducted by:{" "}
                <strong className="text-slate-200 font-semibold">
                  {record.business.auditorName || "Rethink Diagnostic Team"}
                </strong>
              </span>
            </div>
          </div>

          {/* Radial SVG Score Gauge */}
          <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800/90 shadow-xl shrink-0">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 128 128">
                {/* Background Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="9"
                  className="text-slate-800"
                  fill="transparent"
                />
                {/* Dynamic Value Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke={theme.strokeColor}
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>

              {/* Central Text Value */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white leading-none">
                  {score}
                </span>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mt-1">
                  / 100
                </span>
              </div>
            </div>

            <div className="text-center sm:text-center">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400 block">
                Total Score
              </span>
              <span
                className="text-xs font-bold uppercase tracking-wider block mt-0.5"
                style={{ color: theme.strokeColor }}
              >
                {record.band.title}
              </span>
            </div>
          </div>
        </div>

        {/* Biometrics & Metrics Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-800/80 text-xs font-mono">
          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Live BMI</span>
            <span className="text-base font-bold text-amber-300 mt-0.5 block">
              {record.business.bmi ? `${record.business.bmi}` : "24.2"}
            </span>
            <span className="text-[11px] text-slate-400 font-semibold block mt-0.5">
              {record.business.bmiCategory || "Assessed"}
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Current Wt</span>
            <span className="text-base font-bold text-white mt-0.5 block">
              {record.business.weightKg ? `${record.business.weightKg} kg` : "74 kg"}
            </span>
            <span className="text-[11px] text-slate-400 font-normal block mt-0.5">Measured</span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Target Wt</span>
            <span className="text-base font-bold text-sky-400 mt-0.5 block">
              {record.business.targetWeightKg ? `${record.business.targetWeightKg} kg` : "70 kg"}
            </span>
            <span className="text-[11px] text-slate-400 font-normal block mt-0.5">Goal</span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              {record.auditType === "nutrition" ? "Protein Need" : "Safe Range"}
            </span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block truncate">
              {record.auditType === "nutrition" && record.business.proteinNeedMin
                ? `${record.business.proteinNeedMin}-${record.business.proteinNeedMax}g/d`
                : record.business.optimalMinKg && record.business.optimalMaxKg
                ? `${record.business.optimalMinKg} - ${record.business.optimalMaxKg} kg`
                : "57 - 76 kg"}
            </span>
            <span className="text-[11px] text-slate-400 font-normal block mt-0.5">
              {record.auditType === "nutrition" ? "Daily Target" : "Optimal Range"}
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Weight Gap</span>
            <span className="text-base font-bold text-rose-400 mt-0.5 block">
              {record.business.weightGapKg
                ? record.business.weightGapKg
                : record.business.weightKg && record.business.targetWeightKg
                ? `${(parseFloat(record.business.targetWeightKg) - parseFloat(record.business.weightKg)).toFixed(1)} kg`
                : "Optimal"}
            </span>
            <span className="text-[11px] text-slate-400 font-normal block mt-0.5">
              {record.business.heightCm ? `${record.business.heightCm} cm` : "175 cm"}
            </span>
          </div>
        </div>

        {/* Diagnosis & Key Gaps Strip */}
        <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
            <HeartPulse className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Diagnosis & Primary Growth Constraints:</span>
            <span className="text-white">
              {record.diagnosis?.headline || "Pillar Optimization & Growth Vectors"}
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
            {record.diagnosis?.diagnosisText || record.band.description}
          </p>
        </div>
      </div>
    </div>
  );
}
