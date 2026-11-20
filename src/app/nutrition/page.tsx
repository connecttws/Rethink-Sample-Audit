"use client";

import React, { useState, useMemo } from "react";
import { SampleTopBar } from "@/components/SampleTopBar";
import { AuditorNav } from "@/components/AuditorNav";
import { NutritionQuestionnaire } from "@/components/questionnaires/NutritionQuestionnaire";
import { AuditCompleteStep } from "@/components/AuditCompleteStep";
import { ReportCover } from "@/components/report/ReportCover";
import { ReportBreakdown } from "@/components/report/ReportBreakdown";
import { ReportActionPlan } from "@/components/report/ReportActionPlan";
import { ReportFindings } from "@/components/report/ReportFindings";
import { ReportWhatsAppCta } from "@/components/report/ReportWhatsAppCta";
import {
  ProfileDetails,
  AuditRecord,
} from "@/lib/types";
import {
  NUTRITION_SECTIONS,
  calculateNutritionAudit,
  SAMPLE_NUTRITION_RECORD,
} from "@/lib/nutrition-data";
import { saveSessionRecord, clearSessionRecord } from "@/lib/session-store";

export default function NutritionAuditPage() {
  const [business, setBusiness] = useState<ProfileDetails>({
    name: "",
    clientName: "",
    category: "Drop Visceral Belly Fat & Lose 8-12 kg",
    locality: "",
    phone: "",
    whatsappNumber: "",
    mapsUrl: "",
    auditorName: "Rethink Clinical Nutritionist",
    age: "34",
    biologicalSex: "Female",
    dietPreference: "Vegetarian (Dairy)",
    heightUnit: "cm",
    heightCm: "162",
    heightFt: "5",
    heightIn: "4",
    weightKg: "76",
    targetWeightKg: "60",
    goal: "Drop Visceral Belly Fat & Lose 8-12 kg",
  });

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completedRecord, setCompletedRecord] = useState<AuditRecord | null>(null);
  const [viewMode, setViewMode] = useState<"questionnaire" | "dispatch" | "full_report">("questionnaire");

  // Compute live score dynamically as answers are selected
  const liveScore = useMemo(() => {
    let sum = 0;
    NUTRITION_SECTIONS.forEach((section) => {
      section.questions.forEach((q) => {
        const chosenIdx = answers[q.id];
        if (chosenIdx !== undefined && q.options[chosenIdx]) {
          sum += q.options[chosenIdx].points;
        }
      });
    });
    return sum;
  }, [answers]);

  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleBusinessChange = (fields: Partial<ProfileDetails>) => {
    setBusiness((prev) => ({ ...prev, ...fields }));
  };

  const handleLoadSample = () => {
    setBusiness(SAMPLE_NUTRITION_RECORD.business);
    setAnswers(SAMPLE_NUTRITION_RECORD.answers);
  };

  const handleGenerateReport = () => {
    const record = calculateNutritionAudit(business, answers);
    setCompletedRecord(record);
    saveSessionRecord(record);
    setViewMode("dispatch");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setBusiness({
      name: "",
      clientName: "",
      category: "Drop Visceral Belly Fat & Lose 8-12 kg",
      locality: "",
      phone: "",
      whatsappNumber: "",
      mapsUrl: "",
      auditorName: "Rethink Clinical Nutritionist",
      age: "34",
      biologicalSex: "Female",
      dietPreference: "Vegetarian (Dairy)",
      heightUnit: "cm",
      heightCm: "162",
      heightFt: "5",
      heightIn: "4",
      weightKg: "76",
      targetWeightKg: "60",
      goal: "Drop Visceral Belly Fat & Lose 8-12 kg",
    });
    setAnswers({});
    setCompletedRecord(null);
    setViewMode("questionnaire");
    clearSessionRecord();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] font-sans text-slate-950">
      {/* 1. Shareable Sample Link Bar at Top */}
      <SampleTopBar
        auditType="nutrition"
        onLoadSample={handleLoadSample}
        sampleName="Priya Sharma"
      />

      {/* 2. Top Auditor Navigation Bar */}
      <AuditorNav
        auditType="nutrition"
        businessName={business.name}
        category={business.category}
        currentScore={liveScore}
        maxScore={100}
        answeredCount={answeredCount}
        totalQuestions={18}
      />

      {/* 3. Main Content Container */}
      <main className="max-w-4xl w-full mx-auto px-4 py-8 flex-1">
        {viewMode === "questionnaire" && (
          <NutritionQuestionnaire
            sections={NUTRITION_SECTIONS}
            business={business}
            onBusinessChange={handleBusinessChange}
            answers={answers}
            onAnswer={handleAnswer}
            onGenerateReport={handleGenerateReport}
            currentScore={liveScore}
          />
        )}

        {viewMode === "dispatch" && completedRecord && (
          <AuditCompleteStep
            record={completedRecord}
            onReviewAnswers={() => setViewMode("questionnaire")}
            onReset={handleReset}
            onViewFullReport={() => setViewMode("full_report")}
          />
        )}

        {viewMode === "full_report" && completedRecord && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/80">
              <button
                type="button"
                onClick={() => setViewMode("dispatch")}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                ← Back to WhatsApp Dispatch
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Start New Audit
              </button>
            </div>

            <ReportCover record={completedRecord} />
            <ReportBreakdown sectionScores={completedRecord.sectionScores} auditType="nutrition" />
            <ReportActionPlan record={completedRecord} />
            <ReportFindings findings={completedRecord.findings} />
            <ReportWhatsAppCta record={completedRecord} />
          </div>
        )}
      </main>
    </div>
  );
}
