"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface AuditConfigSummary {
  type: string;
  path: string;
  title: string;
  tagline: string;
  badge: string;
  badgeBg: string;
  color: string;
  pillarsCount: number;
  questionsCount: number;
}

interface StartAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditConfig: AuditConfigSummary | null;
}

export function StartAuditModal({
  isOpen,
  onClose,
  auditConfig,
}: StartAuditModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  if (!isOpen || !auditConfig) return null;

  const isPhoneValid = /^[6-9]\d{9}$/.test(phone.trim().replace(/\D/g, ""));
  const isFormValid = name.trim().length >= 2 && isPhoneValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (!isPhoneValid) {
      setPhoneError("Please enter a valid 10-digit Indian WhatsApp mobile number.");
      return;
    }

    const prospect = {
      name: name.trim(),
      phone: cleanPhone,
      category: auditConfig.type,
      startedAt: new Date().toISOString(),
    };

    // Store in sessionStorage so audit pages can initialize state immediately
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("tws_active_prospect", JSON.stringify(prospect));
      } catch (err) {
        console.warn("Error storing prospect in sessionStorage:", err);
      }
    }

    // Navigate to target diagnostic intake page with query parameters
    const targetUrl = `${auditConfig.path}?name=${encodeURIComponent(
      name.trim()
    )}&phone=${encodeURIComponent(cleanPhone)}`;

    onClose();
    router.push(targetUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white space-y-6">
        {/* Glow accent */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-25"
          style={{ backgroundColor: auditConfig.color }}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center h-7 w-auto">
              <Image
                src="/tws-logo.png"
                alt="TWS Logo"
                width={95}
                height={35}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="border-l border-slate-700 pl-3">
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${auditConfig.badgeBg}`}
              >
                {auditConfig.badge}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Title */}
        <div className="space-y-1.5 relative z-10">
          <h3 className="text-xl sm:text-2xl font-black text-white font-sans leading-snug">
            {auditConfig.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Enter member name and WhatsApp number to initiate the personalized{" "}
            {auditConfig.pillarsCount}-pillar diagnostic screen.
          </p>
        </div>

        {/* Intake Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Member / Client Name</span>
              <span className="text-emerald-400 text-[10px]">Required</span>
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                autoFocus
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/60 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white font-medium placeholder:text-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* 2. WhatsApp Mobile Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>WhatsApp Number</span>
              <span className="text-emerald-400 text-[10px]">10-Digit Mobile</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 font-mono text-xs font-bold text-slate-400 border-r border-slate-700 pr-2 pointer-events-none">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, "");
                  setPhone(cleaned);
                  setPhoneError("");
                }}
                placeholder="9876543210"
                required
                className="w-full pl-16 pr-4 py-3 rounded-2xl bg-black/60 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white font-mono placeholder:text-slate-500 outline-none transition-all"
              />
            </div>
            {phoneError && (
              <p className="text-[11px] text-rose-400 font-mono mt-1">{phoneError}</p>
            )}
          </div>

          {/* Value Props Summary */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1.5 font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                {auditConfig.pillarsCount} Pillars · {auditConfig.questionsCount} Scoring
                Touchpoints
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Instant Diagnostic PDF & WhatsApp Report Ready</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                isFormValid
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 transform hover:-translate-y-0.5"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
              }`}
            >
              <span>Start Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
