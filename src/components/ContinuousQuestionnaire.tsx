"use client";

import React from "react";
import {
  AuditType,
  AuditSection,
  ProfileDetails,
} from "@/lib/types";
import { BusinessQuestionnaire } from "./questionnaires/BusinessQuestionnaire";
import { FitnessQuestionnaire } from "./questionnaires/FitnessQuestionnaire";
import { NutritionQuestionnaire } from "./questionnaires/NutritionQuestionnaire";

interface ContinuousQuestionnaireProps {
  auditType: AuditType;
  sections: AuditSection[];
  business: ProfileDetails;
  onBusinessChange: (fields: Partial<ProfileDetails>) => void;
  answers: Record<string, number>;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onGenerateReport: () => void;
  currentScore: number;
}

export function ContinuousQuestionnaire(props: ContinuousQuestionnaireProps) {
  if (props.auditType === "business") {
    return <BusinessQuestionnaire {...props} />;
  }
  if (props.auditType === "nutrition") {
    return <NutritionQuestionnaire {...props} />;
  }
  return <FitnessQuestionnaire {...props} />;
}
