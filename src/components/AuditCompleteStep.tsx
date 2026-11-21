"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  Phone,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  User,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import {
  AuditRecord,
  formatWhatsAppUrl,
  isValidIndianMobile,
} from "@/lib/types";
import {
  generateWhatsAppReportMessage,
  saveSessionRecord,
} from "@/lib/session-store";

interface AuditCompleteStepProps {
  record: AuditRecord;
  onReviewAnswers: () => void;
  onReset: () => void;
  onViewFullReport?: () => void;
}

const AUDIT_THEMES = {
  business: {
    bg: "bg-[#0B132B]",
    border: "border-[#1C2541]",
    accent: "#2563EB",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    title: "TWS Lifestyle",
    subtitle: "Lifestyle & Health Assessment",
    metricLabel: "Lifestyle Health & Vitals Index",
  },
  fitness: {
    bg: "bg-[#090D16]",
    border: "border-[#1E293B]",
    accent: "#10B981",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    title: "TWS Training",
    subtitle: "1-on-1 Training Diagnostic",
    metricLabel: "Training & Conditioning Index",
  },
  nutrition: {
    bg: "bg-[#1C130E]",
    border: "border-[#362419]",
    accent: "#D97706",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    title: "TWS Nutrition",
    subtitle: "Clinical Diet & Metabolic Diagnostic",
    metricLabel: "Metabolic & Gut Health Index",
  },
};

export function AuditCompleteStep({
  record,
  onReviewAnswers,
  onReset,
  onViewFullReport,
}: AuditCompleteStepProps) {
  const [copied, setCopied] = useState(false);
  const [clientPhone, setClientPhone] = useState(
    record.business.whatsappNumber || record.business.phone || ""
  );
  const [phoneError, setPhoneError] = useState("");
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [wasSent, setWasSent] = useState(false);

  const theme = AUDIT_THEMES[record.auditType] || AUDIT_THEMES.business;

  // Clean short report URL (/r/[id])
  const reportUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/r/${record.id}`
      : `/r/${record.id}`;

  const isPhoneValid = isValidIndianMobile(clientPhone);

  const handlePhoneChange = (val: string) => {
    setClientPhone(val);
    setPhoneError("");
    setWasSent(false);
    const updatedRecord: AuditRecord = {
      ...record,
      business: {
        ...record.business,
        whatsappNumber: val,
        phone: val,
      },
    };
    saveSessionRecord(updatedRecord);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(reportUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("Please copy the URL manually from your address bar.");
    }
  };

  const handleShareWhatsApp = () => {
    if (!isPhoneValid) {
      setPhoneError("Please enter a valid 10-digit Indian WhatsApp mobile number.");
      return;
    }

    const message = generateWhatsAppReportMessage(record, reportUrl);
    const waUrl = formatWhatsAppUrl(clientPhone, message);
    setWasSent(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const fullMessageText = generateWhatsAppReportMessage(record, reportUrl);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-24">
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200/90 pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 rounded border inline-block ${theme.badgeBg}`}>
              {theme.title}
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400">
              Diagnostic Intake Evaluated
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
            Diagnostic Summary & WhatsApp Dispatch
          </h2>
        </div>

        <button
          type="button"
          onClick={onReviewAnswers}
          className="text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
        >
          ← Edit Answers
        </button>
      </div>

      {/* 2. Executive Summary Card */}
      <div className={`relative overflow-hidden rounded-3xl ${theme.bg} text-white p-6 sm:p-8 shadow-2xl border ${theme.border}`}>
        {/* Glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: theme.accent }}
        />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              <span>Assessment ID: {record.id}</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {new Date(record.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-slate-400 text-xs font-semibold">
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-md text-white">
                  <span>{record.business.category}</span>
                </span>
                {record.business.age && (
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-md text-slate-300">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Age: {record.business.age}</span>
                  </span>
                )}
                {record.business.biologicalSex && (
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-md text-slate-300">
                    <span>{record.business.biologicalSex}</span>
                  </span>
                )}
                {record.business.locality && (
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-md text-slate-300">
                    <span>{record.business.locality}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans">
                {record.business.name}
              </h1>

              {/* Biometrics row if fitness or nutrition */}
              {(record.business.bmi || record.business.weightKg) && (
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                  {record.business.bmi && (
                    <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-amber-300">
                      Live BMI: <span className="font-bold text-white">{record.business.bmi}</span> ({record.business.bmiCategory})
                    </div>
                  )}
                  {record.business.weightKg && (
                    <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300">
                      Current Wt: <span className="font-bold text-white">{record.business.weightKg} kg</span>
                    </div>
                  )}
                  {record.business.optimalMinKg && record.business.optimalMaxKg && (
                    <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-emerald-300">
                      Healthy Range: <span className="font-bold text-white">{record.business.optimalMinKg} - {record.business.optimalMaxKg} kg</span>
                    </div>
                  )}
                  {record.business.proteinNeedMin && (
                    <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-emerald-300">
                      Protein Need: <span className="font-bold text-white">{record.business.proteinNeedMin} - {record.business.proteinNeedMax}g/day</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Score Pill */}
            <div className="shrink-0 text-left sm:text-right space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                {theme.metricLabel}
              </span>
              <div className="flex items-baseline gap-1 sm:justify-end leading-none">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                  {record.totalScore}
                </span>
                <span className="text-sm font-mono text-slate-400">/ 100</span>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border font-mono ${record.band.badgeClass}`}>
                {record.band.title}
              </span>
            </div>
          </div>

          {/* Diagnosis Headline */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-300 block">
              Core Diagnostic Bottlenecks:
            </span>
            <p className="text-sm sm:text-base font-extrabold text-white leading-snug">
              {record.diagnosis?.headline || "Pillar Optimization & Growth Vectors"}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {record.diagnosis?.diagnosisText || record.band.description}
            </p>
          </div>
        </div>
      </div>

      {/* 3. WhatsApp Dispatch & Share Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Client WhatsApp Transmission</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 font-sans tracking-tight">
            Send Diagnostic Report via WhatsApp
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Verify the recipient mobile number below. You can send this report directly to the client, or test sending to your own WhatsApp number.
          </p>
        </div>

        {/* Recipient Phone Input & 1-Click WhatsApp Button */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Recipient WhatsApp Mobile Number <span className="text-red-500">*</span></span>
              <span className="text-[10px] font-mono text-slate-500">Self-number testing supported</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-slate-700 font-mono text-xs font-bold border-r border-slate-200 pr-2.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+91</span>
              </div>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="98765 43210"
                className={`w-full pl-20 pr-4 py-3.5 rounded-2xl border text-sm font-mono font-bold transition-all shadow-xs ${
                  phoneError
                    ? "border-red-400 bg-red-50/30 text-red-950 focus:border-red-500"
                    : "border-slate-300 bg-slate-50 text-slate-950 focus:border-emerald-600 focus:bg-white"
                }`}
              />
            </div>
            {phoneError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                {phoneError}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1da851] text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950" />
              <span>Send Report to WhatsApp ({clientPhone || "Phone"})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Report URL Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Report URL</span>
                </>
              )}
            </button>
          </div>

          {wasSent && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                WhatsApp web/app launched! The client will receive the formatted score card and private report link.
              </span>
            </div>
          )}
        </div>

        {/* Message Preview Accordion */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowMessagePreview(!showMessagePreview)}
            className="w-full p-4 bg-slate-50 hover:bg-slate-100/80 text-left flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Preview WhatsApp Message Dispatch Text</span>
            </span>
            {showMessagePreview ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showMessagePreview && (
            <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed border-t border-slate-800">
              {fullMessageText}
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Actions: View Full Report & Reset */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {onViewFullReport ? (
            <button
              type="button"
              onClick={onViewFullReport}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>View Full Diagnostic Report Below</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          ) : (
            <Link
              href={`/report?id=${encodeURIComponent(record.id)}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Open Full Interactive Customer Report</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </Link>
          )}

          <Link
            href={`/r/${encodeURIComponent(record.id)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Fresh Audit</span>
        </button>
      </div>
    </div>
  );
}
