"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SampleTopBar } from "@/components/SampleTopBar";
import { AuditorNav } from "@/components/AuditorNav";
import { FitnessQuestionnaire } from "@/components/questionnaires/FitnessQuestionnaire";
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
  FITNESS_SECTIONS,
  calculateFitnessAudit,
  SAMPLE_FITNESS_RECORD,
} from "@/lib/fitness-data";
import { saveSessionRecord, clearSessionRecord } from "@/lib/session-store";
import { saveAuditToHistory } from "@/lib/history-storage";

export default function FitnessAuditPage() {
  const [business, setBusiness] = useState<ProfileDetails>({
    name: "",
    clientName: "",
    category: "Burn Belly Fat & Lose Extra Weight",
    locality: "",
    phone: "",
    whatsappNumber: "",
    mapsUrl: "",
    auditorName: "TWS Fitness Coach",
    age: "32",
    biologicalSex: "Male",
    targetHorizon: "Structured 12 Weeks (Recommended)",
    heightUnit: "cm",
    heightCm: "175",
    heightFt: "5",
    heightIn: "9",
    weightKg: "86",
    targetWeightKg: "73",
    goal: "Burn Belly Fat & Lose Extra Weight",
  });

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completedRecord, setCompletedRecord] = useState<AuditRecord | null>(null);
  const [viewMode, setViewMode] = useState<"questionnaire" | "dispatch" | "full_report">("questionnaire");

  // Read URL query params or sessionStorage set from the Start Audit popup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get("name");
      const urlPhone = params.get("phone");

      if (urlName || urlPhone) {
        setBusiness((prev) => ({
          ...prev,
          name: urlName || prev.name,
          clientName: urlName || prev.clientName,
          phone: urlPhone || prev.phone,
          whatsappNumber: urlPhone || prev.whatsappNumber,
        }));
      } else {
        try {
          const raw = sessionStorage.getItem("tws_active_prospect");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.name || parsed.phone) {
              setBusiness((prev) => ({
                ...prev,
                name: parsed.name || prev.name,
                clientName: parsed.name || prev.clientName,
                phone: parsed.phone || prev.phone,
                whatsappNumber: parsed.phone || prev.whatsappNumber,
              }));
            }
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, []);

  // Compute live score dynamically as answers are selected
  const liveScore = useMemo(() => {
    let sum = 0;
    FITNESS_SECTIONS.forEach((section) => {
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
    setBusiness(SAMPLE_FITNESS_RECORD.business);
    setAnswers(SAMPLE_FITNESS_RECORD.answers);
  };

  const handleGenerateReport = () => {
    const record = calculateFitnessAudit(business, answers);
    setCompletedRecord(record);
    saveSessionRecord(record);
    saveAuditToHistory(record);
    setViewMode("dispatch");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setBusiness({
      name: "",
      clientName: "",
      category: "Burn Belly Fat & Lose Extra Weight",
      locality: "",
      phone: "",
      whatsappNumber: "",
      mapsUrl: "",
      auditorName: "TWS Fitness Coach",
      age: "32",
      biologicalSex: "Male",
      targetHorizon: "Structured 12 Weeks (Recommended)",
      heightUnit: "cm",
      heightCm: "175",
      heightFt: "5",
      heightIn: "9",
      weightKg: "86",
      targetWeightKg: "73",
      goal: "Burn Belly Fat & Lose Extra Weight",
    });
    setAnswers({});
    setCompletedRecord(null);
    setViewMode("questionnaire");
    clearSessionRecord();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-950">
      {/* 1. Shareable Sample Link Bar at Top */}
      <SampleTopBar
        auditType="fitness"
        onLoadSample={handleLoadSample}
        sampleName="Aakash Verma"
      />

      {/* 2. Top Auditor Navigation Bar */}
      <AuditorNav
        auditType="fitness"
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
          <FitnessQuestionnaire
            sections={FITNESS_SECTIONS}
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
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode("dispatch")}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
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
            <ReportBreakdown sectionScores={completedRecord.sectionScores} auditType="fitness" />
            <ReportActionPlan record={completedRecord} />
            <ReportFindings findings={completedRecord.findings} />
            <ReportWhatsAppCta record={completedRecord} />
          </div>
        )}
      </main>
    </div>
  );
}
