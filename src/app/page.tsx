"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dumbbell,
  Utensils,
  Activity,
  Check,
  ArrowRight,
  Sparkles,
  Share2,
} from "lucide-react";
import { AuditType } from "@/lib/types";
import { TwsLogo } from "@/components/TwsLogo";
import { StartAuditModal } from "@/components/StartAuditModal";

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
}

const AUDIT_CARDS: AuditCardConfig[] = [
  {
    type: "business",
    path: "/business",
    badge: "TWS Lifestyle Health Audit",
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
  },
  {
    type: "fitness",
    path: "/fitness",
    badge: "TWS Fitness Diagnostic",
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
  },
  {
    type: "nutrition",
    path: "/nutrition",
    badge: "TWS Clinical Nutrition",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    title: "Clinical Nutrition & Metabolic Diagnostic",
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
  },
];

export default function AuditHubPage() {
  const router = useRouter();
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [selectedAuditModal, setSelectedAuditModal] = useState<AuditCardConfig | null>(null);

  const origin = useSyncExternalStore(subscribe, getOriginSnapshot, getServerSnapshot);

  // Prefetch all diagnostic routes on mount for instant navigation
  useEffect(() => {
    router.prefetch("/business");
    router.prefetch("/fitness");
    router.prefetch("/nutrition");
  }, [router]);

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
      <div className="bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 text-center font-mono text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <strong className="text-white">TWS Diagnostic Suite</strong> · 3 Specialized Intake Engines ·
          Direct Client Demonstration & Instant WhatsApp Dispatch
        </span>
      </div>

      {/* Clean White Brand Navigation Header Bar */}
      <header className="w-full bg-white border-b border-slate-200 shadow-xs sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TwsLogo imageClassName="h-8 sm:h-9 w-auto" auditCategory="all" />
            <span className="hidden sm:inline-block text-xs font-mono font-bold text-slate-500 border-l border-slate-200 pl-3">
              Diagnostic & Biomechanical Suite
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-slate-600 block">
              Auditor Access: <span className="text-emerald-600 font-bold">Double-Click Logo</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-6 sm:pb-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Select Diagnostic Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Choose Client Intake
        </h1>

        <p className="text-sm sm:lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Select an interactive diagnostic below, enter client details, and experience real-time scoring with instant WhatsApp dispatch.
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
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${audit.badgeBg} w-fit`}
                    >
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
                </div>

                {/* Bottom Actions: Start Audit Popup Trigger & Shareable Link */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 relative z-10">
                  <button
                    type="button"
                    onClick={() => setSelectedAuditModal(audit)}
                    className={`w-full py-3.5 px-5 rounded-2xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 ${audit.buttonBg}`}
                  >
                    <span>Start Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

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

      {/* Intake Popup Modal */}
      <StartAuditModal
        isOpen={!!selectedAuditModal}
        onClose={() => setSelectedAuditModal(null)}
        auditConfig={selectedAuditModal}
      />

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-slate-500 font-mono border-t border-slate-900">
        <p>TWS Client Diagnostic Engine · In-Memory Sample Storage · 100% Vercel Ready</p>
      </footer>
    </div>
  );
}
