"use client";

import React, { useState, useMemo } from "react";
import {
  AuditSection,
  ProfileDetails,
  calculateBmi,
  convertFtInToCm,
  convertCmToFtIn,
} from "@/lib/types";
import { FITNESS_GOALS, TARGET_HORIZONS } from "@/lib/fitness-data";
import {
  Check,
  ArrowRight,
  Phone,
  Scale,
  Flame,
  User,
  Activity,
  ShieldAlert,
  Dumbbell,
  Utensils,
  Moon,
  Target,
  ChevronDown,
  X,
} from "lucide-react";

interface FitnessQuestionnaireProps {
  sections: AuditSection[];
  business: ProfileDetails;
  onBusinessChange: (fields: Partial<ProfileDetails>) => void;
  answers: Record<string, number>;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onGenerateReport: () => void;
  currentScore: number;
}

const PILLAR_META: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
    text: string;
    border: string;
  }
> = {
  posture: { icon: Activity, color: "#0284C7", bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  pain_joints: { icon: ShieldAlert, color: "#EF4444", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  gym_habits: { icon: Dumbbell, color: "#F59E0B", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  nutrition_fuel: { icon: Utensils, color: "#10B981", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  recovery_sleep: { icon: Moon, color: "#8B5CF6", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  history_commitment: { icon: Target, color: "#EC4899", bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
};

export function FitnessQuestionnaire({
  sections,
  business,
  onBusinessChange,
  answers,
  onAnswer,
  onGenerateReport,
  currentScore,
}: FitnessQuestionnaireProps) {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [modalPhone, setModalPhone] = useState(
    business.whatsappNumber || business.phone || ""
  );
  const [phoneError, setPhoneError] = useState("");

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Height unit & calculations
  const heightUnit = business.heightUnit || "cm";

  // Calculate live BMI, ideal range & weight gap
  const bmiData = useMemo(() => {
    return calculateBmi(
      business.heightCm || "",
      business.weightKg || "",
      business.targetWeightKg || ""
    );
  }, [business.heightCm, business.weightKg, business.targetWeightKg]);

  // Height unit toggling
  const handleToggleHeightUnit = (newUnit: "cm" | "ft") => {
    if (newUnit === heightUnit) return;
    if (newUnit === "ft" && business.heightCm) {
      const { feet, inches } = convertCmToFtIn(parseFloat(business.heightCm));
      onBusinessChange({
        heightUnit: "ft",
        heightFt: feet.toString(),
        heightIn: inches.toString(),
      });
    } else if (newUnit === "cm" && business.heightFt) {
      const cmVal = convertFtInToCm(
        parseInt(business.heightFt || "0", 10),
        parseInt(business.heightIn || "0", 10)
      );
      onBusinessChange({
        heightUnit: "cm",
        heightCm: cmVal.toString(),
      });
    } else {
      onBusinessChange({ heightUnit: newUnit });
    }
  };

  const handleHeightFtInChange = (feetStr: string, inchStr: string) => {
    const feet = parseInt(feetStr || "0", 10);
    const inches = parseInt(inchStr || "0", 10);
    const cmVal = convertFtInToCm(feet, inches);
    onBusinessChange({
      heightFt: feetStr,
      heightIn: inchStr,
      heightCm: cmVal > 0 ? cmVal.toString() : "",
    });
  };

  const handleGenerateClick = () => {
    if (!business.name.trim()) {
      alert("Please enter Prospect Full Name before generating the diagnostic report.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const currentPhone = (business.whatsappNumber || business.phone || "").trim();
    if (!currentPhone) {
      setModalPhone("");
      setPhoneError("");
      setShowPhoneModal(true);
      return;
    }

    onGenerateReport();
  };

  const handleConfirmModalPhone = (skip = false) => {
    if (!skip) {
      const digits = modalPhone.replace(/\D/g, "");
      if (digits.length !== 10 && digits.length !== 12) {
        setPhoneError("Please enter a valid 10-digit Indian WhatsApp mobile number.");
        return;
      }
      onBusinessChange({
        whatsappNumber: modalPhone,
        phone: modalPhone,
      });
    }
    setShowPhoneModal(false);
    onGenerateReport();
  };

  let globalQuestionNumber = 0;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      {/* ======================================================== */}
      {/* 1. INTRO & PHASE 01: PROSPECT PROFILE & BIOMETRICS */}
      {/* ======================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-[#090D16] via-[#111827] to-[#090D16] text-white p-6 sm:p-8 border-b border-emerald-900/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Phase 01 · Prospect Profile & Baseline Biometrics</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-sans tracking-tight">
                Diagnostic Intake
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-2xl">
                Comprehensive Pre-Pitch 1-on-1 Fitness Diagnostic & Biomechanical Screen.
              </p>
            </div>

            {/* Prominent Screen Scope Badge on Desktop & Mobile */}
            <div className="shrink-0 self-start sm:self-center">
              <div className="inline-flex sm:flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2.5 sm:gap-1.5 px-4 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-400/40 shadow-lg backdrop-blur-sm min-w-[190px]">
                <span className="text-emerald-300 font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  Screen Scope
                </span>
                <span className="font-mono text-xs sm:text-sm font-extrabold text-white tracking-wide whitespace-nowrap bg-emerald-600/50 border border-emerald-300/40 px-3 py-1.5 rounded-xl shadow-xs">
                  6 Pillars · 18 Points
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Row 1: Name, Phone & Age/Sex */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Prospect Full Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2">
                Prospect Full Name <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={business.name}
                  onChange={(e) => onBusinessChange({ name: e.target.value, clientName: e.target.value })}
                  placeholder="e.g. Aakash Verma"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-bold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* WhatsApp / Phone */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
                <span>WhatsApp / Phone <span className="text-emerald-600">*</span></span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">1-Tap Share</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-slate-700 font-mono text-xs font-bold border-r border-slate-200 pr-2.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  value={business.whatsappNumber || business.phone || ""}
                  onChange={(e) =>
                    onBusinessChange({
                      whatsappNumber: e.target.value,
                      phone: e.target.value,
                    })
                  }
                  placeholder="98765 01234 (or your number)"
                  className="w-full pl-20 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Age & Biological Sex */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2">
                Age & Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="12"
                  max="100"
                  value={business.age || ""}
                  onChange={(e) => onBusinessChange({ age: e.target.value })}
                  placeholder="Age (e.g. 32)"
                  className="w-full px-3 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm text-center focus:outline-none focus:border-emerald-600 focus:bg-white shadow-xs"
                />
                <select
                  value={business.biologicalSex || "Male"}
                  onChange={(e) =>
                    onBusinessChange({
                      biologicalSex: e.target.value as "Male" | "Female",
                    })
                  }
                  className="w-full px-2.5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer shadow-xs"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Primary Goal & Target Horizon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
            {/* Primary Fitness Goal */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-emerald-600" />
                <span>Primary Fitness Goal <span className="text-emerald-600">*</span></span>
              </label>
              <div className="relative">
                <select
                  value={business.category || "Burn Belly Fat & Lose Extra Weight"}
                  onChange={(e) =>
                    onBusinessChange({ category: e.target.value, goal: e.target.value })
                  }
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white shadow-xs cursor-pointer"
                >
                  {FITNESS_GOALS.map((goal) => (
                    <option key={goal.name} value={goal.name}>
                      {goal.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500">
                {FITNESS_GOALS.find(
                  (g) => g.name === (business.category || "Burn Belly Fat & Lose Extra Weight")
                )?.subtitle}
              </p>
            </div>

            {/* Target Horizon */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target Horizon <span className="text-emerald-600">*</span></span>
                </label>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                  Coaching Scope
                </span>
              </div>
              <div className="relative">
                <select
                  value={business.targetHorizon || "Structured 12 Weeks (Recommended)"}
                  onChange={(e) => onBusinessChange({ targetHorizon: e.target.value })}
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white shadow-xs cursor-pointer"
                >
                  {TARGET_HORIZONS.map((horiz) => (
                    <option key={horiz} value={horiz}>
                      {horiz}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500">
                Periodized training phases tailored to hit your target weight safely.
              </p>
            </div>
          </div>

          {/* Row 3: Biometrics (Height, Current Wt & Target Wt) */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Live Biometrics & Status</span>
              </span>

              {/* Height Unit Switcher */}
              <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold">
                <button
                  type="button"
                  onClick={() => handleToggleHeightUnit("cm")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    heightUnit === "cm"
                      ? "bg-white text-slate-950 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleHeightUnit("ft")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    heightUnit === "ft"
                      ? "bg-white text-slate-950 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  ft / in
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Height Input */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Height {heightUnit === "cm" ? "(cm)" : "(ft / in)"}
                </label>
                {heightUnit === "cm" ? (
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="50"
                      max="250"
                      value={business.heightCm || ""}
                      onChange={(e) => onBusinessChange({ heightCm: e.target.value })}
                      placeholder="e.g. 175"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white shadow-xs"
                    />
                    <span className="absolute right-3.5 text-xs font-mono text-slate-400 font-bold pointer-events-none">
                      cm
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="3"
                        max="7"
                        value={business.heightFt || ""}
                        onChange={(e) =>
                          handleHeightFtInChange(e.target.value, business.heightIn || "0")
                        }
                        placeholder="5"
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white shadow-xs"
                      />
                      <span className="absolute right-3 text-xs font-mono text-slate-400 font-bold pointer-events-none">
                        ft
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={business.heightIn || ""}
                        onChange={(e) =>
                          handleHeightFtInChange(business.heightFt || "5", e.target.value)
                        }
                        placeholder="9"
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white shadow-xs"
                      />
                      <span className="absolute right-3 text-xs font-mono text-slate-400 font-bold pointer-events-none">
                        in
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Body Weight */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Current (kg)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="300"
                    value={business.weightKg || ""}
                    onChange={(e) => onBusinessChange({ weightKg: e.target.value })}
                    placeholder="e.g. 86"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white shadow-xs"
                  />
                  <span className="absolute right-3.5 text-xs font-mono text-slate-400 font-bold pointer-events-none">
                    kg
                  </span>
                </div>
              </div>

              {/* Target Weight */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target (kg)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="200"
                    value={business.targetWeightKg || ""}
                    onChange={(e) => onBusinessChange({ targetWeightKg: e.target.value })}
                    placeholder="e.g. 73"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white shadow-xs"
                  />
                  <span className="absolute right-3.5 text-xs font-mono text-slate-400 font-bold pointer-events-none">
                    kg
                  </span>
                </div>
              </div>
            </div>

            {/* Live Biometrics Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#090D16] via-[#111827] to-[#090D16] text-white border border-emerald-900/60 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                    Live Body Mass Index
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                      {bmiData ? bmiData.formattedBmi : "--.-"}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Live BMI</span>

                    {bmiData && (
                      <span
                        className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border font-mono"
                        style={{
                          color: bmiData.categoryColor,
                          borderColor: `${bmiData.categoryColor}40`,
                          backgroundColor: `${bmiData.categoryColor}15`,
                        }}
                      >
                        {bmiData.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                    Ideal Athletic Range
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                    {bmiData ? bmiData.idealRangeText : "Ideal: 57 - 76 kg"}
                  </span>
                </div>
              </div>

              {/* 3 Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Weight Gap
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-amber-400 mt-0.5 block">
                    {bmiData ? bmiData.weightGapText : "-13.0 kg"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Target Delta
                  </span>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Status
                  </span>
                  <span
                    className="text-base sm:text-lg font-black font-mono mt-0.5 block"
                    style={{ color: bmiData?.categoryColor || "#F59E0B" }}
                  >
                    {bmiData ? bmiData.category : "Overweight"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Body Composition
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Horizon
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200 mt-1 block truncate">
                    {business.targetHorizon || "Structured 12 Weeks"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Guided Transformation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SIX BIOMECHANICAL PILLARS & 18 QUESTIONS */}
      {/* ======================================================== */}
      <div className="space-y-10">
        {sections.map((section, sIdx) => {
          const meta = PILLAR_META[section.id] || {
            icon: Dumbbell,
            color: "#10B981",
            bg: "bg-emerald-50",
            text: "text-emerald-700",
            border: "border-emerald-200",
          };
          const PillarIcon = meta.icon;

          return (
            <div key={section.id} className="space-y-5">
              {/* Pillar Header */}
              <div className="pt-4 pb-2 border-b border-slate-200/90 space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider ${meta.bg} ${meta.text} border ${meta.border} inline-flex items-center gap-1.5`}
                    >
                      <PillarIcon className="w-3.5 h-3.5" />
                      Pillar 0{section.pillarNumber || sIdx + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      · {section.questions.length} Diagnostic Points
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    Max: +{section.maxPoints} pts
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-sans">
                  {section.name}
                </h2>

                {section.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal font-normal">
                    {section.subtitle}
                  </p>
                )}
              </div>

              {/* Questions List */}
              <div className="space-y-5">
                {section.questions.map((q) => {
                  globalQuestionNumber++;
                  const currentQNum = globalQuestionNumber;
                  const chosenIdx = answers[q.id];
                  const isAnswered = chosenIdx !== undefined;

                  return (
                    <article
                      key={q.id}
                      id={`question-${q.id}`}
                      className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-sm ${
                        isAnswered
                          ? "border-emerald-300 ring-1 ring-emerald-100"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Top Meta Line: Number & Points */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                            Question {q.numberStr || `${sIdx + 1}.${currentQNum}`}
                          </span>
                        </div>

                        {/* Points Status */}
                        <div>
                          {isAnswered ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                              <span>Awarded: +{q.options[chosenIdx].points} pts</span>
                            </span>
                          ) : (
                            <span className="text-xs font-mono font-semibold text-slate-400">
                              Max: +{Math.max(...q.options.map((o) => o.points))} pts
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Text */}
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug font-sans mt-2">
                        {q.text}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mt-1.5 mb-5 font-normal">
                        {q.description}
                      </p>

                      {/* Options Vertical Stack */}
                      <div className="space-y-3">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = chosenIdx === optIdx;

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => onAnswer(q.id, optIdx)}
                              className={`w-full p-4 sm:p-4.5 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-150 cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-50/80 border-emerald-600 shadow-sm ring-2 ring-emerald-500/20"
                                  : "bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/90 text-slate-900"
                              }`}
                            >
                              {/* Radio Indicator */}
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isSelected
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {isSelected ? (
                                  <Check className="w-3 h-3 text-white stroke-[3.5]" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                                )}
                              </div>

                              {/* Text & Meta */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                  <span
                                    className={`text-sm sm:text-[15px] font-bold leading-snug tracking-tight ${
                                      isSelected ? "text-emerald-950 font-black" : "text-slate-900"
                                    }`}
                                  >
                                    {opt.text}
                                  </span>

                                  <div className="flex items-center gap-2 shrink-0">
                                    {opt.badge && (
                                      <span
                                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                          isSelected
                                            ? "bg-emerald-200/80 text-emerald-900 border border-emerald-300"
                                            : "bg-slate-200/70 text-slate-700 border border-slate-200"
                                        }`}
                                      >
                                        {opt.badge}
                                      </span>
                                    )}
                                    <span
                                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                        isSelected
                                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                          : "bg-slate-200/80 text-slate-700 border border-slate-200"
                                      }`}
                                    >
                                      +{opt.points}
                                    </span>
                                  </div>
                                </div>

                                {opt.hint && (
                                  <p
                                    className={`text-xs sm:text-[12.5px] mt-1.5 leading-relaxed ${
                                      isSelected
                                        ? "text-emerald-900/90 font-medium"
                                        : "text-slate-600 font-normal"
                                    }`}
                                  >
                                    {opt.hint}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 3. STICKY BOTTOM ACTION BAR */}
      {/* ======================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#090D16]/95 text-white border-t border-emerald-900/80 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block leading-none">
              Live Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white leading-none">
                {currentScore}
              </span>
              <span className="text-xs font-mono text-emerald-400">/ 100</span>
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                ({answeredCount}/{totalQuestions} Answered · {progressPercent}%)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateClick}
            className="px-6 sm:px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Generate Fitness Diagnostic Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MODAL FOR PHONE IF MISSING */}
      {/* ======================================================== */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  WhatsApp Report Dispatch
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPhoneModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Enter the prospect&apos;s WhatsApp number (or your own mobile number to test the report dispatch):
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                WhatsApp Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-xs font-mono font-bold text-slate-400 pointer-events-none">
                  +91
                </span>
                <input
                  type="tel"
                  value={modalPhone}
                  onChange={(e) => {
                    setModalPhone(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="98765 01234"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                  autoFocus
                />
              </div>
              {phoneError && (
                <p className="text-xs text-red-600 font-semibold">{phoneError}</p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleConfirmModalPhone(true)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Skip for Now
              </button>
              <button
                type="button"
                onClick={() => handleConfirmModalPhone(false)}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20"
              >
                Generate Report →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
