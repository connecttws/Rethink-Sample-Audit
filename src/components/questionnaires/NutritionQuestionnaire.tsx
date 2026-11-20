"use client";

import React, { useState, useMemo } from "react";
import {
  AuditSection,
  ProfileDetails,
  calculateBmi,
  convertFtInToCm,
  convertCmToFtIn,
} from "@/lib/types";
import { NUTRITIONAL_TARGETS, DIET_PREFERENCES } from "@/lib/nutrition-data";
import {
  Check,
  ArrowRight,
  Phone,
  Scale,
  Flame,
  User,
  Activity,
  ShieldAlert,
  Utensils,
  Moon,
  Target,
  ChevronDown,
  X,
} from "lucide-react";

interface NutritionQuestionnaireProps {
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
  protein: { icon: Utensils, color: "#10B981", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  liquid_sugar: { icon: Flame, color: "#F59E0B", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  weekend_social: { icon: Moon, color: "#EC4899", bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  gut_digestion: { icon: ShieldAlert, color: "#EF4444", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  cravings: { icon: Target, color: "#8B5CF6", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  cravings_stress: { icon: Target, color: "#8B5CF6", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  hormones: { icon: Activity, color: "#0284C7", bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  hormonal_energy: { icon: Activity, color: "#0284C7", bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
};

export function NutritionQuestionnaire({
  sections,
  business,
  onBusinessChange,
  answers,
  onAnswer,
  onGenerateReport,
  currentScore,
}: NutritionQuestionnaireProps) {
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

  // Calculate live BMI, healthy range & weight gap
  const bmiData = useMemo(() => {
    return calculateBmi(
      business.heightCm || "",
      business.weightKg || "",
      business.targetWeightKg || ""
    );
  }, [business.heightCm, business.weightKg, business.targetWeightKg]);

  // Daily Protein Need Calculator (1.2g - 1.5g per kg)
  const proteinNeedText = useMemo(() => {
    const w = parseFloat(business.weightKg || "0");
    if (!w || w <= 0) return "91 - 114g / day";
    const minP = Math.round(w * 1.2);
    const maxP = Math.round(w * 1.5);
    return `${minP} - ${maxP}g / day`;
  }, [business.weightKg]);

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
      alert("Please enter Client Full Name before generating the clinical report.");
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
      {/* 1. INTRO & PHASE 01: CLIENT PROFILE, GOALS & BIOMETRICS */}
      {/* ======================================================== */}
      <section className="bg-white rounded-3xl border border-amber-200/80 shadow-sm overflow-hidden">
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-[#1C130E] via-[#2B1D15] to-[#1C130E] text-white p-6 sm:p-8 border-b border-amber-900/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span>Phase 01 · Client Profile, Goals & Biometrics</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-sans tracking-tight">
                Clinical Diet Intake
              </h1>
              <p className="text-xs sm:text-sm text-amber-200/80 font-normal leading-relaxed max-w-2xl">
                Nutritional Deficit, Gut Health & Metabolic Rate Diagnostic.
              </p>
            </div>

            {/* Prominent Clinical Scope Badge on Desktop & Mobile */}
            <div className="shrink-0 self-start sm:self-center">
              <div className="inline-flex sm:flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2.5 sm:gap-1.5 px-4 py-3 rounded-2xl bg-amber-950/80 border border-amber-400/40 shadow-lg backdrop-blur-sm min-w-[190px]">
                <span className="text-amber-300 font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  Clinical Scope
                </span>
                <span className="font-mono text-xs sm:text-sm font-extrabold text-white tracking-wide whitespace-nowrap bg-amber-600/50 border border-amber-300/40 px-3 py-1.5 rounded-xl shadow-xs">
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
            {/* Client Full Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2">
                Client Full Name <span className="text-amber-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={business.name}
                  onChange={(e) => onBusinessChange({ name: e.target.value, clientName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-bold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* WhatsApp / Phone */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
                <span>WhatsApp / Phone <span className="text-amber-600">*</span></span>
                <span className="text-[10px] font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">1-Tap Share</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-slate-700 font-mono text-xs font-bold border-r border-slate-200 pr-2.5">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
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
                  placeholder="98765 43210 (or your number)"
                  className="w-full pl-20 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-mono font-bold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all shadow-xs"
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
                  placeholder="Age (e.g. 34)"
                  className="w-full px-3 py-3.5 rounded-2xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-mono font-bold text-sm text-center focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
                />
                <select
                  value={business.biologicalSex || "Female"}
                  onChange={(e) =>
                    onBusinessChange({
                      biologicalSex: e.target.value as "Female" | "Male",
                    })
                  }
                  className="w-full px-2.5 py-3.5 rounded-2xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white cursor-pointer shadow-xs"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Nutritional Target & Diet Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
            {/* Primary Nutritional Target */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                <span>Primary Nutritional Target <span className="text-amber-600">*</span></span>
              </label>
              <div className="relative">
                <select
                  value={business.category || "Drop Visceral Belly Fat & Lose 8-12 kg"}
                  onChange={(e) =>
                    onBusinessChange({ category: e.target.value, goal: e.target.value })
                  }
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs cursor-pointer"
                >
                  {NUTRITIONAL_TARGETS.map((target) => (
                    <option key={target.name} value={target.name}>
                      {target.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500">
                {NUTRITIONAL_TARGETS.find(
                  (g) => g.name === (business.category || "Drop Visceral Belly Fat & Lose 8-12 kg")
                )?.subtitle}
              </p>
            </div>

            {/* Diet Preference */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  <span>Diet Preference <span className="text-amber-600">*</span></span>
                </label>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200">
                  Macro Baseline
                </span>
              </div>
              <div className="relative">
                <select
                  value={business.dietPreference || "Vegetarian (Dairy)"}
                  onChange={(e) => onBusinessChange({ dietPreference: e.target.value })}
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs cursor-pointer"
                >
                  {DIET_PREFERENCES.map((pref) => (
                    <option key={pref} value={pref}>
                      {pref}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500">
                Daily protein sources calibrated to your dietary baseline.
              </p>
            </div>
          </div>

          {/* Row 3: Biometrics (Height, Current Wt & Target Wt) */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>Live Body Status & Biometrics</span>
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
                      placeholder="e.g. 162"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
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
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
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
                        placeholder="4"
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
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
                  Current Wt (kg)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="300"
                    value={business.weightKg || ""}
                    onChange={(e) => onBusinessChange({ weightKg: e.target.value })}
                    placeholder="e.g. 76"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
                  />
                  <span className="absolute right-3.5 text-xs font-mono text-slate-400 font-bold pointer-events-none">
                    kg
                  </span>
                </div>
              </div>

              {/* Target Weight */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target Wt (kg)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="200"
                    value={business.targetWeightKg || ""}
                    onChange={(e) => onBusinessChange({ targetWeightKg: e.target.value })}
                    placeholder="e.g. 60"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
                  />
                  <span className="absolute right-3.5 text-xs font-mono text-slate-400 font-bold pointer-events-none">
                    kg
                  </span>
                </div>
              </div>
            </div>

            {/* Live Body Status Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1C130E] via-[#2B1D15] to-[#1C130E] text-white border border-amber-900/60 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-950 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                    Live Body Status
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                      {bmiData ? bmiData.formattedBmi : "29.0"}
                    </span>
                    <span className="text-xs text-amber-300 font-mono">Live BMI</span>

                    <span
                      className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border font-mono"
                      style={{
                        color: bmiData?.categoryColor || "#F97316",
                        borderColor: `${bmiData?.categoryColor || "#F97316"}40`,
                        backgroundColor: `${bmiData?.categoryColor || "#F97316"}15`,
                      }}
                    >
                      {bmiData ? bmiData.category : "Overweight"}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                    Healthy Target Range
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                    {bmiData ? bmiData.healthyRangeText : "Healthy: 49 - 65 kg"}
                  </span>
                </div>
              </div>

              {/* 3 Metrics: Weight Gap, Protein Need, Dietary Baseline */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-900/90 rounded-xl p-3 border border-amber-950">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Weight Gap
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-amber-400 mt-0.5 block">
                    {bmiData ? bmiData.weightGapText : "-16.0 kg"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Difference to Target
                  </span>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3 border border-amber-950">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Protein Need
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-emerald-400 mt-0.5 block">
                    {proteinNeedText}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    1.2g - 1.5g / kg Target
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-slate-900/90 rounded-xl p-3 border border-amber-950">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Dietary Baseline
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-200 mt-1 block truncate">
                    {business.dietPreference || "Vegetarian (Dairy)"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Active Macro Split
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SIX CLINICAL PILLARS & 18 QUESTIONS */}
      {/* ======================================================== */}
      <div className="space-y-10">
        {sections.map((section, sIdx) => {
          const meta = PILLAR_META[section.id] || {
            icon: Utensils,
            color: "#D97706",
            bg: "bg-amber-50",
            text: "text-amber-700",
            border: "border-amber-200",
          };
          const PillarIcon = meta.icon;

          return (
            <div key={section.id} className="space-y-5">
              {/* Pillar Header */}
              <div className="pt-4 pb-2 border-b border-amber-200/80 space-y-1.5">
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
                  <span className="text-xs font-mono font-bold text-slate-600 bg-amber-50/70 px-2.5 py-0.5 rounded-md border border-amber-200/80">
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
                          ? "border-amber-300 ring-1 ring-amber-100"
                          : "border-slate-200 hover:border-amber-200"
                      }`}
                    >
                      {/* Top Meta: Number & Points */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/70">
                            Question {q.numberStr || `${sIdx + 1}.${currentQNum}`}
                          </span>
                        </div>

                        {/* Points Status */}
                        <div>
                          {isAnswered ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                              <Check className="w-3.5 h-3.5 text-amber-600 stroke-[3]" />
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
                                  ? "bg-amber-50/90 border-amber-600 shadow-sm ring-2 ring-amber-500/20"
                                  : "bg-[#FFFDF9] hover:bg-amber-50/40 border-slate-200/90 text-slate-900"
                              }`}
                            >
                              {/* Radio Indicator */}
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isSelected
                                    ? "border-amber-600 bg-amber-600 text-white"
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
                                      isSelected ? "text-amber-950 font-black" : "text-slate-900"
                                    }`}
                                  >
                                    {opt.text}
                                  </span>

                                  <div className="flex items-center gap-2 shrink-0">
                                    {opt.badge && (
                                      <span
                                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                          isSelected
                                            ? "bg-amber-200/80 text-amber-950 border border-amber-300"
                                            : "bg-slate-200/70 text-slate-700 border border-slate-200"
                                        }`}
                                      >
                                        {opt.badge}
                                      </span>
                                    )}
                                    <span
                                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                        isSelected
                                          ? "bg-amber-100 text-amber-900 border border-amber-300"
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
                                        ? "text-amber-950/90 font-medium"
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1C130E]/95 text-white border-t border-amber-900/80 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 block leading-none">
              Live Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white leading-none">
                {currentScore}
              </span>
              <span className="text-xs font-mono text-amber-300">/ 100</span>
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                ({answeredCount}/{totalQuestions} Answered · {progressPercent}%)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateClick}
            className="px-6 sm:px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2.5 shadow-lg shadow-amber-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Generate Clinical Diet Report</span>
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
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
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
              Enter the client&apos;s WhatsApp number (or your own mobile number to test the report dispatch):
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
                  placeholder="98765 43210"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-amber-600 focus:bg-white"
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
                className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow-md shadow-amber-500/20"
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
