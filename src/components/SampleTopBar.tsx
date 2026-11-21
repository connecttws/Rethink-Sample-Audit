"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowLeft, Share2 } from "lucide-react";
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

interface SampleTopBarProps {
  auditType: AuditType;
  onLoadSample: () => void;
  sampleName: string;
}

const AUDIT_BAR_CONFIG: Record<
  AuditType,
  {
    name: string;
    path: string;
    badge: string;
    bgClass: string;
    borderClass: string;
    btnClass: string;
    btnText: string;
    accentDot: string;
    activeTabClass: string;
  }
> = {
  business: {
    name: "TWS Lifestyle Audit",
    path: "/business",
    badge: "TWS Lifestyle Health Assessment",
    bgClass: "bg-[#0B132B]",
    borderClass: "border-[#1C2541]",
    btnClass: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30",
    btnText: "Load Sample (Rahul Sharma)",
    accentDot: "bg-blue-400",
    activeTabClass: "bg-blue-600 text-white font-bold",
  },
  fitness: {
    name: "TWS Training Audit",
    path: "/fitness",
    badge: "TWS 1-on-1 Training Diagnostic",
    bgClass: "bg-[#090D16]",
    borderClass: "border-[#1E293B]",
    btnClass: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30",
    btnText: "Load Sample (Aakash Verma)",
    accentDot: "bg-emerald-400",
    activeTabClass: "bg-emerald-600 text-white font-bold",
  },
  nutrition: {
    name: "TWS Nutrition Audit",
    path: "/nutrition",
    badge: "TWS Clinical Diet Intake",
    bgClass: "bg-[#1C130E]",
    borderClass: "border-[#362419]",
    btnClass: "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30",
    btnText: "Load Sample (Priya Sharma)",
    accentDot: "bg-amber-400",
    activeTabClass: "bg-amber-600 text-white font-bold",
  },
};

export function SampleTopBar({
  auditType,
  onLoadSample,
  sampleName,
}: SampleTopBarProps) {
  const [copied, setCopied] = useState(false);
  const origin = useSyncExternalStore(subscribe, getOriginSnapshot, getServerSnapshot);

  const config = AUDIT_BAR_CONFIG[auditType];
  const shareableUrl = origin ? `${origin}${config.path}` : config.path;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert(`Shareable Link: ${shareableUrl}`);
    }
  };

  return (
    <div
      className={`${config.bgClass} text-white border-b ${config.borderClass} px-3.5 sm:px-4 py-2.5 shadow-md no-print sticky top-0 z-50`}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
        {/* Left: Hub Link, Active Badge & Switcher Tabs */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white transition-colors shrink-0 font-bold"
            title="Return to Audit Selection Hub"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hub</span>
          </Link>

          {/* Switcher Tabs */}
          <div className="inline-flex items-center p-0.5 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono">
            <Link
              href="/business"
              className={`px-2.5 py-1 rounded-lg transition-all ${
                auditType === "business"
                  ? AUDIT_BAR_CONFIG.business.activeTabClass
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Lifestyle
            </Link>
            <Link
              href="/fitness"
              className={`px-2.5 py-1 rounded-lg transition-all ${
                auditType === "fitness"
                  ? AUDIT_BAR_CONFIG.fitness.activeTabClass
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Training
            </Link>
            <Link
              href="/nutrition"
              className={`px-2.5 py-1 rounded-lg transition-all ${
                auditType === "nutrition"
                  ? AUDIT_BAR_CONFIG.nutrition.activeTabClass
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Nutrition
            </Link>
          </div>
        </div>

        {/* Right: Shareable Link & 1-Click Load Sample */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Shareable Link Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold border transition-all cursor-pointer ${
              copied
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                : "bg-white/10 hover:bg-white/15 text-slate-200 border-white/15"
            }`}
            title={`Copy direct link: ${shareableUrl}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">Shareable Sample Link</span>
                <span className="sm:hidden">Share</span>
              </>
            )}
          </button>

          {/* Load Sample Profile */}
          <button
            type="button"
            onClick={onLoadSample}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-extrabold text-xs shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5 ${config.btnClass}`}
            title={`Auto-fill sample profile for ${sampleName}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{config.btnText}</span>
            <span className="sm:hidden">Load Sample</span>
          </button>
        </div>
      </div>
    </div>
  );
}
