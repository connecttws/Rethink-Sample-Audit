"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { AuditRecord } from "@/lib/types";

interface ReportActionPlanProps {
  record: AuditRecord;
}

const BLUEPRINTS = {
  business: [
    {
      step: "01",
      timing: "Weeks 1–2",
      title: "Google Maps & Local 3-Pack Optimization",
      desc: "Audit and verify GBP profile, clean secondary categories, seed keyword-rich reviews, and geotag studio photos to climb into top 3 map positions.",
      bullets: ["Google 3-Pack Radius Optimization", "Review Generation System"],
    },
    {
      step: "02",
      timing: "Weeks 3–4",
      title: "Visual Trust & Signature Video Shoots",
      desc: "Produce 6 high-definition reels showcasing facility ambience and founder expertise to capture attention across Instagram and Google profile.",
      bullets: ["Professional On-Site Video Shoot", "Weekly Reel Publishing Cadence"],
    },
    {
      step: "03",
      timing: "Weeks 5–6",
      title: "1-Tap WhatsApp Funnel & Speed-to-Lead",
      desc: "Deploy prefilled 1-tap WhatsApp chat buttons and implement automated 5-minute lead response sequences to stop customer leakage to competitors.",
      bullets: ["Direct Conversational Funnel", "Sub-5-Min Automated Follow-Up"],
    },
  ],
  fitness: [
    {
      step: "01",
      timing: "Weeks 1–2",
      title: "Reset Baseline, Posture & Joint Mobility",
      desc: "Address sedentary tight hips and lower back stiffness with targeted mobility prep and set daily step baselines to jumpstart metabolism.",
      bullets: ["Dynamic Mobility Activation", "Daily Step Target Tracking"],
    },
    {
      step: "02",
      timing: "Weeks 3–8",
      title: "Progressive Overload Split & Protein Target",
      desc: "Establish a structured 4-day resistance split with high-protein daily targets (1.6–2.0g/kg) to trigger lean muscle growth and fat oxidation.",
      bullets: ["Compound Lifting Form Mastery", "Protein Consistency Protocol"],
    },
    {
      step: "03",
      timing: "Weeks 9–12",
      title: "Body Recomposition & Habit Lock",
      desc: "Lock in deep sleep recovery, optimize weekend social dining, and celebrate measurable body fat reduction and strength personal records.",
      bullets: ["Deep Sleep Optimization", "Sustainable Lifestyle Habit"],
    },
  ],
  nutrition: [
    {
      step: "01",
      timing: "Weeks 1–2",
      title: "Eliminate Liquid Sugar & Reset Gut Inflammation",
      desc: "Replace sweet chai and packaged juices with whole fiber fruit, hydrate with 3L clean water, and eliminate antacid-triggering processed snacks.",
      bullets: ["Zero Liquid Sugar Calorie Rule", "Bowel Transit & Microbiome Reset"],
    },
    {
      step: "02",
      timing: "Weeks 3–8",
      title: "3-Meal Protein Anchoring & Glycemic Control",
      desc: "Anchor 25g+ quality protein into breakfast, lunch, and dinner to stabilize blood glucose and eliminate 4 PM and late-night cravings completely.",
      bullets: ["25g+ Protein in Every Meal", "12-Hour Overnight Digestive Fast"],
    },
    {
      step: "03",
      timing: "Weeks 9–12",
      title: "Visceral Fat Oxidation & Long-Term Metabolic Rate",
      desc: "Lock in 7-day social eating discipline without rebound guilt, and sustain effortless metabolic rate release with high leptin sensitivity.",
      bullets: ["Weekend Calorie Stabilization", "Repaired Resting Metabolic Rate"],
    },
  ],
};

export function ReportActionPlan({ record }: ReportActionPlanProps) {
  const blueprintSteps =
    BLUEPRINTS[record.auditType] || BLUEPRINTS.fitness;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-9 rounded-3xl border border-slate-800 shadow-xl space-y-7 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-emerald-500/10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Prescribed Turnaround Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            {record.band.sprintRecommendation}
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {record.band.sprintDetails}
          </p>
        </div>

        <div className="shrink-0 bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sprint Target: Score 85+ / 100</span>
        </div>
      </div>

      {/* 3 Step Blueprint Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
        {blueprintSteps.map((step, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-slate-600 transition-all space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-black flex items-center justify-center">
                {step.step}
              </div>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {step.timing}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                {step.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-300">
              {step.bullets.map((b, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
