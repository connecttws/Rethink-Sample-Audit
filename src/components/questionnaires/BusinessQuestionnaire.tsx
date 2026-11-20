"use client";

import React, { useState, useMemo } from "react";
import {
  AuditSection,
  ProfileDetails,
  calculateBmi,
  convertFtInToCm,
  convertCmToFtIn,
} from "@/lib/types";
import { BUSINESS_CATEGORIES } from "@/lib/business-data";
import {
  Check,
  ArrowRight,
  Phone,
  Scale,
  Flame,
  User,
  Activity,
  Dumbbell,
  Utensils,
  Moon,
  Target,
  ChevronDown,
  X,
  Footprints,
  MapPin,
} from "lucide-react";

interface BusinessQuestionnaireProps {
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
  activity: { icon: Footprints, color: "#0284C7", bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  nutrition: { icon: Utensils, color: "#10B981", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  recovery: { icon: Moon, color: "#8B5CF6", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  form: { icon: Dumbbell, color: "#F59E0B", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  mindset: { icon: Target, color: "#EC4899", bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
};

export function BusinessQuestionnaire({
  sections,
  business,
  onBusinessChange,
  answers,
  onAnswer,
  onGenerateReport,
  currentScore,
}: BusinessQuestionnaireProps) {
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

  // Calculate live BMI, safe optimal range & delta
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
      alert("Please enter Member Full Name before generating the report.");
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
      {/* 1. INTRO & PHASE 01: MEMBER PROFILE & BODY METRICS */}
      {/* ======================================================== */}
      <section className="bg-white rounded-3xl border border-blue-200/80 shadow-sm overflow-hidden">
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white p-6 sm:p-8 border-b border-blue-900/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
                <span>Walk-in & Trial Member Intake</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-sans tracking-tight">
                BMI & Lifestyle Health Audit
              </h1>
              <p className="text-xs sm:text-sm text-blue-200/80 font-normal leading-relaxed max-w-2xl">
                Instantaneous body biometrics, safe target ranges & 5-pillar lifestyle health assessment.
              </p>
            </div>

            {/* Prominent Audit Scope Badge on Desktop & Mobile */}
            <div className="shrink-0 self-start sm:self-center">
              <div className="inline-flex sm:flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2.5 sm:gap-1.5 px-4 py-3 rounded-2xl bg-blue-900/60 border border-blue-400/40 shadow-lg backdrop-blur-sm min-w-[190px]">
                <span className="text-blue-200 font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
                  Audit Scope
                </span>
                <span className="font-mono text-xs sm:text-sm font-extrabold text-white tracking-wide whitespace-nowrap bg-blue-600/50 border border-blue-300/40 px-3 py-1.5 rounded-xl shadow-xs">
                  5 Pillars · 15 Points
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Row 1: Member Name, WhatsApp & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Member Full Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2">
                Member Full Name <span className="text-blue-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={business.name}
                  onChange={(e) => onBusinessChange({ name: e.target.value, clientName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-bold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
                <span>WhatsApp Number <span className="text-blue-600">*</span></span>
                <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">1-Tap Share</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-slate-700 font-mono text-xs font-bold border-r border-slate-200 pr-2.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
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
                  className="w-full pl-20 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Member Age */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2">
                Member Age
              </label>
              <div className="relative">
                <Activity className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="number"
                  min="12"
                  max="100"
                  value={business.age || ""}
                  onChange={(e) => onBusinessChange({ age: e.target.value })}
                  placeholder="e.g. 28"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Primary Goal & Gym Branch / Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
            {/* Primary Fitness Goal */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-blue-600" />
                <span>Primary Fitness Goal <span className="text-blue-600">*</span></span>
              </label>
              <div className="relative">
                <select
                  value={business.category || "Fat Loss & Lean Toning"}
                  onChange={(e) =>
                    onBusinessChange({ category: e.target.value, goal: e.target.value })
                  }
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs cursor-pointer"
                >
                  {BUSINESS_CATEGORIES.map((goal) => (
                    <option key={goal.name} value={goal.name}>
                      {goal.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500">
                {BUSINESS_CATEGORIES.find(
                  (g) => g.name === (business.category || "Fat Loss & Lean Toning")
                )?.subtitle}
              </p>
            </div>

            {/* Gym Branch / Locality */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Gym Branch / Locality</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={business.locality || ""}
                  onChange={(e) => onBusinessChange({ locality: e.target.value })}
                  placeholder="e.g. Connaught Place Gym"
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Branch or training facility where member conducts workouts.
              </p>
            </div>
          </div>

          {/* Row 3: Biometrics (Height & Current Weight) */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-blue-600" />
                <span>Body Biometrics & Live BMI</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
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
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
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
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
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
                  Body Weight (kg)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="300"
                    value={business.weightKg || ""}
                    onChange={(e) => onBusinessChange({ weightKg: e.target.value })}
                    placeholder="e.g. 74"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
                  />
                  <span className="absolute right-3.5 text-xs font-mono text-slate-400 font-bold pointer-events-none">
                    kg
                  </span>
                </div>
              </div>
            </div>

            {/* Live BMI & Target Weight Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-blue-900/60 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/60 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 block">
                    Live Body Mass Index
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                      {bmiData ? bmiData.formattedBmi : "24.2"}
                    </span>
                    <span className="text-xs text-blue-300 font-mono">Live BMI</span>

                    <span
                      className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border font-mono"
                      style={{
                        color: bmiData?.categoryColor || "#10B981",
                        borderColor: `${bmiData?.categoryColor || "#10B981"}40`,
                        backgroundColor: `${bmiData?.categoryColor || "#10B981"}15`,
                      }}
                    >
                      {bmiData ? bmiData.category : "Normal"}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 block">
                    Safe Optimal Range
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                    {bmiData ? bmiData.idealRangeText : "56.7 - 76.5 kg"}
                  </span>
                </div>
              </div>

              {/* 3 Metrics: Target Weight Gap, Assessment Status, Branch */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Target Weight Gap
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-emerald-400 mt-0.5 block">
                    {bmiData && bmiData.deltaKg !== 0 ? bmiData.weightGapText : "Optimal"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Recommended Delta
                  </span>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Goal
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white mt-1 block truncate">
                    {business.category || "Fat Loss & Lean Toning"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Primary Baseline
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Facility
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-blue-300 mt-1 block truncate">
                    {business.locality || "Connaught Place Gym"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Assigned Branch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FIVE LIFESTYLE PILLARS & 15 DIAGNOSTIC QUESTIONS */}
      {/* ======================================================== */}
      <div className="space-y-10">
        {sections.map((section, sIdx) => {
          const meta = PILLAR_META[section.id] || {
            icon: Footprints,
            color: "#2563EB",
            bg: "bg-blue-50",
            text: "text-blue-700",
            border: "border-blue-200",
          };
          const PillarIcon = meta.icon;

          return (
            <div key={section.id} className="space-y-5">
              {/* Pillar Header */}
              <div className="pt-4 pb-2 border-b border-blue-200/80 space-y-1.5">
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
                          ? "border-blue-300 ring-1 ring-blue-100"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Top Meta: Number & Points */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                            Question {q.numberStr || `${sIdx + 1}.${currentQNum}`}
                          </span>
                        </div>

                        {/* Points Status */}
                        <div>
                          {isAnswered ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                              <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
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
                                  ? "bg-blue-50/80 border-blue-600 shadow-sm ring-2 ring-blue-500/20"
                                  : "bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/90 text-slate-900"
                              }`}
                            >
                              {/* Radio Indicator */}
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isSelected
                                    ? "border-blue-600 bg-blue-600 text-white"
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
                                      isSelected ? "text-blue-950 font-black" : "text-slate-900"
                                    }`}
                                  >
                                    {opt.text}
                                  </span>

                                  <div className="flex items-center gap-2 shrink-0">
                                    {opt.badge && (
                                      <span
                                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                          isSelected
                                            ? "bg-blue-200/80 text-blue-900 border border-blue-300"
                                            : "bg-slate-200/70 text-slate-700 border border-slate-200"
                                        }`}
                                      >
                                        {opt.badge}
                                      </span>
                                    )}
                                    <span
                                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                        isSelected
                                          ? "bg-blue-100 text-blue-800 border border-blue-300"
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
                                        ? "text-blue-900/90 font-medium"
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B132B]/95 text-white border-t border-blue-900/80 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300 block leading-none">
              Live Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white leading-none">
                {currentScore}
              </span>
              <span className="text-xs font-mono text-blue-300">/ 100</span>
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                ({answeredCount}/{totalQuestions} Answered · {progressPercent}%)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateClick}
            className="px-6 sm:px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2.5 shadow-lg shadow-blue-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Generate Lifestyle Health Report</span>
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
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
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
              Enter the member&apos;s WhatsApp number (or your own mobile number to test the report dispatch):
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 font-mono font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
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
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-500/20"
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
