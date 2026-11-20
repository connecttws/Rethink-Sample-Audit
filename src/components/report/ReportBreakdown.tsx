"use client";

import React from "react";
import {
  Activity,
  ShieldAlert,
  Dumbbell,
  Utensils,
  Moon,
  Target,
  MapPin,
  Camera,
  Globe,
  TrendingUp,
  Zap,
  Coffee,
  Calendar,
  HeartPulse,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  Footprints,
} from "lucide-react";
import { SectionScore, AuditType } from "@/lib/types";

interface ReportBreakdownProps {
  sectionScores: SectionScore[];
  auditType: AuditType;
}

const PILLAR_COLOR_MAP: Record<string, { color: string; icon: React.ElementType }> = {
  // Business (TWS Business: Activity, Nutrition, Recovery, Form, Mindset)
  activity: { color: "#0284C7", icon: Footprints },
  nutrition: { color: "#10B981", icon: Utensils },
  recovery: { color: "#8B5CF6", icon: Moon },
  form: { color: "#F59E0B", icon: Dumbbell },
  mindset: { color: "#EC4899", icon: Target },

  // GMB / Web fallbacks if ever needed
  gmb_maps: { color: "#3B82F6", icon: MapPin },
  visual_trust: { color: "#8B5CF6", icon: Camera },
  web_funnel: { color: "#06B6D4", icon: Globe },
  ads_positioning: { color: "#F59E0B", icon: TrendingUp },
  speed_to_lead: { color: "#10B981", icon: Zap },

  // Fitness
  posture: { color: "#0284C7", icon: Activity },
  pain_joints: { color: "#EF4444", icon: ShieldAlert },
  gym_habits: { color: "#F59E0B", icon: Dumbbell },
  nutrition_fuel: { color: "#10B981", icon: Utensils },
  recovery_sleep: { color: "#8B5CF6", icon: Moon },
  history_commitment: { color: "#EC4899", icon: Target },

  // Nutrition
  protein: { color: "#10B981", icon: Utensils },
  liquid_sugar: { color: "#F59E0B", icon: Coffee },
  weekend_social: { color: "#EC4899", icon: Calendar },
  gut_digestion: { color: "#EF4444", icon: ShieldAlert },
  cravings_stress: { color: "#8B5CF6", icon: Moon },
  hormonal_energy: { color: "#0284C7", icon: HeartPulse },
};

export function ReportBreakdown({ sectionScores, auditType }: ReportBreakdownProps) {
  const pillarCount = sectionScores.length;

  return (
    <div className="bg-white p-6 sm:p-9 rounded-3xl border border-slate-200/90 shadow-sm space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Diagnostic Matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-sans">
            {pillarCount}-Pillar Performance Breakdown
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Evaluated on a standardized 100-point diagnostic scale across {pillarCount} specialized pillars.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold self-start sm:self-auto border border-slate-200 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{auditType.toUpperCase()} · {pillarCount} Pillars</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionScores.map((sec, idx) => {
          const cfg = PILLAR_COLOR_MAP[sec.id] || {
            color: "#475569",
            icon: Sparkles,
          };
          const IconComp = cfg.icon;
          const pct = Math.round((sec.score / sec.maxScore) * 100);

          let statusTheme = {
            label: "Optimal",
            colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
            icon: CheckCircle2,
          };
          if (pct < 40) {
            statusTheme = {
              label: "High Risk Gap",
              colorClass: "text-rose-700 bg-rose-50 border-rose-200",
              icon: AlertOctagon,
            };
          } else if (pct < 70) {
            statusTheme = {
              label: "Baseline Building",
              colorClass: "text-amber-700 bg-amber-50 border-amber-200",
              icon: AlertTriangle,
            };
          }

          const StatusIcon = statusTheme.icon;

          return (
            <div
              key={sec.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 bg-white hover:shadow-md flex flex-col justify-between space-y-4 border-slate-200/90 ${
                pillarCount === 5 && idx === 4 ? "md:col-span-2" : ""
              }`}
            >
              <div className="space-y-3">
                {/* Pillar Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: cfg.color }}
                    >
                      <IconComp className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Pillar 0{idx + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {sec.name}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border shrink-0 ${statusTheme.colorClass}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span>{statusTheme.label}</span>
                  </span>
                </div>
              </div>

              {/* Score Bar & Metric */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-slate-500">
                    Pillar Performance
                  </span>
                  <span className="font-black text-slate-950 text-sm">
                    {sec.score} / {sec.maxScore}{" "}
                    <span className="text-slate-400 font-normal text-xs">
                      ({pct}%)
                    </span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: cfg.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
