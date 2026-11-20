"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Utensils,
  Activity,
  Check,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { AuditType } from "@/lib/types";

function subscribe() {
  return () => {};
}
function getOriginSnapshot() {
  return window.location.origin;
}
function getServerSnapshot() {
  return "";
}

interface AuditCardConfig {
  type: AuditType;
  path: string;
  badge: string;
  badgeBg: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  cardBg: string;
  borderCol: string;
  textColor: string;
  buttonBg: string;
  pillarsCount: number;
  questionsCount: number;
  sampleName: string;
  sampleMeta: string;
  bullets: string[];
}

const AUDIT_CARDS: AuditCardConfig[] = [
  {
    type: "business",
    path: "/business",
    badge: "BMI & Lifestyle Health Audit",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    title: "BMI & Lifestyle Health Audit",
    tagline: "15-Point Daily Activity, Nutrition, Sleep, Form & Mindset Assessment",
    icon: Activity,
    color: "#2563EB",
    gradient: "from-blue-600 to-indigo-700",
    cardBg: "bg-[#0B132B]/95",
    borderCol: "border-[#1C2541] hover:border-blue-500/80",
    textColor: "text-blue-400",
    buttonBg: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30",
    pillarsCount: 5,
    questionsCount: 15,
    sampleName: "Rahul Sharma",
    sampleMeta: "28 yrs Male · 74 kg · Connaught Place Gym · Fat Loss & Toning",
    bullets: [
      "Daily Step Count (NEAT) & Weekly Dedicated Workout Split",
      "Dietary Protein Target Intake & Liquid Sugar Spikes",
      "Nightly Sleep Recovery, Cortisol & Chronic Stiffness",
      "Lifting Form Confidence, Joint Prep & 90-Day Milestones",
    ],
  },
  {
    type: "fitness",
    path: "/fitness",
    badge: "1-on-1 Fitness Diagnostic",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    title: "Fitness & Biomechanics Diagnostic",
    tagline: "18-Point Posture, Joint Safety, Gym Habits & Energy Screen",
    icon: Dumbbell,
    color: "#10B981",
    gradient: "from-emerald-600 to-teal-700",
    cardBg: "bg-[#090D16]/95",
    borderCol: "border-[#1E293B] hover:border-emerald-500/80",
    textColor: "text-emerald-400",
    buttonBg: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30",
    pillarsCount: 6,
    questionsCount: 18,
    sampleName: "Aakash Verma",
    sampleMeta: "32 yrs Male · 86 kg · Burn Belly Fat · 12 Wks",
    bullets: [
      "Squat Depth & Lumbar Butt-Wink Movement Screen",
      "8–10h Desk Slouch & Overhead Shoulder Impingement",
      "Free-Weight Confidence & Logbook Overload Tracking",
      "12-Week Guided Onboarding Transformation Protocol",
    ],
  },
  {
    type: "nutrition",
    path: "/nutrition",
    badge: "Clinical Diet Intake",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    title: "Clinical Nutrition & Metabolic Rate Diagnostic",
    tagline: "18-Point Protein Density, Gut Dysbiosis & Sugar Leak Audit",
    icon: Utensils,
    color: "#D97706",
    gradient: "from-amber-600 to-orange-700",
    cardBg: "bg-[#1C130E]/95",
    borderCol: "border-[#362419] hover:border-amber-500/80",
    textColor: "text-amber-400",
    buttonBg: "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30",
    pillarsCount: 6,
    questionsCount: 18,
    sampleName: "Priya Sharma",
    sampleMeta: "34 yrs Female · 76 kg · Drop Visceral Belly Fat",
    bullets: [
      "Daily Protein Deficit & 3-Meal Anchor Calibration",
      "Sweet Chai / Juice Hidden Liquid Calorie Leaks",
      "Post-Meal Bloating, Antacid Reliance & Gut Dysbiosis",
      "Post-Dinner Meetha Cravings & Cortisol Snacking",
    ],
  },
];

export default function AuditHubPage() {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const origin = useSyncExternalStore(subscribe, getOriginSnapshot, getServerSnapshot);

  const handleCopyLink = async (path: string, type: string) => {
    const fullUrl = origin ? `${origin}${path}` : path;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      alert(`Link: ${fullUrl}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Top Banner */}
      <div className="bg-black/60 border-b border-slate-800 text-xs py-2 px-4 text-center font-mono text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <strong className="text-white">Rethink Diagnostic Suite</strong> · 3 Specialized Intake Engines ·
          Ready for Direct Client Demonstration & WhatsApp Dispatch
        </span>
      </div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 pt-10 sm:pt-16 pb-8 sm:pb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Select Diagnostic Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Choose Client Intake
        </h1>

        <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Select an interactive diagnostic below to explore the questions, test pre-filled sample client profiles, and experience instant WhatsApp report generation.
        </p>
      </header>

      {/* 3 Audit Cards Grid */}
      <main className="max-w-6xl w-full mx-auto px-4 pb-20 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {AUDIT_CARDS.map((audit) => {
            const Icon = audit.icon;
            const isCopied = copiedType === audit.type;

            return (
              <div
                key={audit.type}
                className={`${audit.cardBg} rounded-3xl border ${audit.borderCol} transition-all p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden group hover:-translate-y-1`}
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: audit.color }}
                />

                <div className="space-y-5 relative z-10">
                  {/* Top Badges */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${audit.badgeBg} w-fit`}>
                      {audit.badge}
                    </span>

                    <span className="text-xs font-mono font-bold text-slate-200 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10 w-fit shrink-0">
                      {audit.pillarsCount} Pillars · {audit.questionsCount} Points
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2.5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${audit.gradient} text-white flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-white font-sans leading-snug">
                      {audit.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                      {audit.tagline}
                    </p>
                  </div>

                  {/* Sample Client Card */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">Sample Profile</span>
                      <span className="text-[10px] font-bold text-emerald-400">1-Click Auto-Fill</span>
                    </div>
                    <div className="font-bold text-white text-sm truncate">
                      {audit.sampleName}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {audit.sampleMeta}
                    </div>
                  </div>

                  {/* Key Pillars Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Audit Scope:
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-300">
                        {audit.pillarsCount} Pillars · {audit.questionsCount} Points
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                      {audit.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: audit.color }}
                          />
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions: Direct Launch & Shareable Link */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 relative z-10">
                  <Link
                    href={audit.path}
                    className={`w-full py-3.5 px-5 rounded-2xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 ${audit.buttonBg}`}
                  >
                    <span>Launch Diagnostic</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleCopyLink(audit.path, audit.type)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
                    title={`Copy shareable link for ${audit.title}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Direct Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Shareable Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-slate-500 font-mono border-t border-slate-900">
        <p>Rethink Client Diagnostic Engine · In-Memory Sample Storage · 100% Vercel Ready</p>
      </footer>
    </div>
  );
}
