import {
  AuditSection,
  ScoreBand,
  AuditRecord,
  ProfileDetails,
  SectionScore,
  Finding,
  calculateBmi,
} from "./types";

export const BUSINESS_FITNESS_GOALS = [
  { name: "Fat Loss & Lean Toning", icon: "Flame", subtitle: "Deficit management, calorie expenditure & muscle preservation" },
  { name: "Muscle Hypertrophy & Bulk", icon: "Dumbbell", subtitle: "Progressive overload, high-protein surplus & muscle mass" },
  { name: "Strength & Athletic Performance", icon: "Zap", subtitle: "Power output, functional performance, speed & resilience" },
  { name: "Lifestyle, Posture & Back Relief", icon: "ShieldCheck", subtitle: "Spine decompression, posture alignment & joint mobility" },
  { name: "General Stamina & Daily Energy", icon: "Heart", subtitle: "Cardiovascular health, daytime vitality & endurance" },
];

export const BUSINESS_CATEGORIES = BUSINESS_FITNESS_GOALS;

export const BUSINESS_SECTIONS: AuditSection[] = [
  {
    id: "activity",
    name: "Daily Activity & Movement Habit",
    shortName: "Activity",
    pillarNumber: 1,
    icon: "Footprints",
    maxPoints: 20,
    subtitle: "Daily steps, weekly dedicated workout frequency, and non-exercise movement.",
    questions: [
      {
        id: "act1",
        sectionId: "activity",
        numberStr: "1.1",
        text: "Daily Step Count & Non-Exercise Movement (NEAT)",
        description: "How much active walking and non-exercise daily physical movement do you accumulate outside workouts?",
        options: [
          { text: "8,000–12,000+ Steps", points: 7, hint: "Highly active daily routine", badge: "High Activity" },
          { text: "4,000–8,000 Steps", points: 4, hint: "Moderate baseline steps", badge: "Moderate NEAT" },
          { text: "< 4,000 Steps", points: 0, hint: "Mostly sedentary desk lifestyle", badge: "Sedentary Lock" },
        ],
      },
      {
        id: "act2",
        sectionId: "activity",
        numberStr: "1.2",
        text: "Weekly Dedicated Workout Frequency",
        description: "How many days per week do you engage in focused resistance, cardio, or athletic training?",
        options: [
          { text: "4–5 Days / Week", points: 7, hint: "Consistent and structured split", badge: "Consistent Split" },
          { text: "2–3 Days", points: 4, hint: "Irregular or easily missed", badge: "Irregular Routine" },
          { text: "0–1 Day", points: 0, hint: "Zero regular physical training", badge: "Zero Training" },
        ],
      },
      {
        id: "act3",
        sectionId: "activity",
        numberStr: "1.3",
        text: "Sedentary Hours (Sitting / Desk / Commute)",
        description: "How many continuous hours do you spend seated without walking breaks throughout the day?",
        options: [
          { text: "Active Standing Mix", points: 6, hint: "Breaks sitting every hour", badge: "Frequent Breaks" },
          { text: "5–8 Hours", points: 3, hint: "Average corporate schedule", badge: "Desk Lock" },
          { text: "> 8 Hours", points: 0, hint: "High tight-hip / slouch risk", badge: "Severe Stagnation" },
        ],
      },
    ],
  },
  {
    id: "nutrition",
    name: "Nutrition & Protein Consistency",
    shortName: "Nutrition",
    pillarNumber: 2,
    icon: "Utensils",
    maxPoints: 20,
    subtitle: "Daily protein target intake, liquid sugar cravings, and weekend portion control.",
    questions: [
      {
        id: "nut1",
        sectionId: "nutrition",
        numberStr: "2.1",
        text: "Daily Dietary Protein Intake",
        description: "Do you hit your target protein intake across daily meals (eggs, chicken, paneer, tofu, whey, lentils)?",
        options: [
          { text: "1.2–1.8g / kg", points: 7, hint: "Adequate protein every meal", badge: "Optimal Protein" },
          { text: "Occasional Eggs/Paneer", points: 4, hint: "Inconsistent daily intake", badge: "Inconsistent" },
          { text: "Low / No Idea", points: 0, hint: "Predominantly carb/fat heavy", badge: "Protein Deficit" },
        ],
      },
      {
        id: "nut2",
        sectionId: "nutrition",
        numberStr: "2.2",
        text: "Liquid Calories & Sugar Cravings (Chai, Soda, Snacks)",
        description: "How frequently do sweetened teas, coffees, juices, or sugary snacks enter your daily nutrition?",
        options: [
          { text: "Rare / Controlled", points: 6, hint: "Mainly water, zero sugar drinks", badge: "Zero Liquid Kcal" },
          { text: "2–3 Times / Week", points: 3, hint: "Moderate sweet / beverage habit", badge: "Moderate Leaks" },
          { text: "Daily Habit", points: 0, hint: "Daily sugary cups & junk spikes", badge: "Daily Sugar Spike" },
        ],
      },
      {
        id: "nut3",
        sectionId: "nutrition",
        numberStr: "2.3",
        text: "Weekend Eating Patterns",
        description: "What happens to your nutrition tracking and portion discipline from Friday night to Sunday evening?",
        options: [
          { text: "Structured Balance", points: 7, hint: "Controlled meals & portions", badge: "7-Day Balance" },
          { text: "1 Cheat Meal", points: 4, hint: "Slight surplus, recovers fast", badge: "Controlled Drift" },
          { text: "Weekend Binge", points: 0, hint: "Erases 5 days of weekly effort", badge: "Weekend Blowout" },
        ],
      },
    ],
  },
  {
    id: "recovery",
    name: "Sleep, Recovery & Daily Energy",
    shortName: "Recovery",
    pillarNumber: 3,
    icon: "Moon",
    maxPoints: 20,
    subtitle: "Sleep duration & depth, daytime energy stability, and joint or lower-back stiffness.",
    questions: [
      {
        id: "rec1",
        sectionId: "recovery",
        numberStr: "3.1",
        text: "Nightly Sleep Duration & Depth",
        description: "How many hours of uninterrupted, deep restorative sleep do you log each night?",
        options: [
          { text: "7–8+ Hours", points: 7, hint: "Deep restorative sleep", badge: "Optimal Recovery" },
          { text: "6–7 Hours", points: 4, hint: "Average, occasional fatigue", badge: "Mild Deficit" },
          { text: "< 6 Hours", points: 0, hint: "Broken sleep, high cortisol", badge: "High Cortisol" },
        ],
      },
      {
        id: "rec2",
        sectionId: "recovery",
        numberStr: "3.2",
        text: "Daytime Energy Stability",
        description: "Do you experience persistent afternoon brain fog, energy crashes, or heavy caffeine dependency?",
        options: [
          { text: "High & Steady", points: 7, hint: "No afternoon crash", badge: "Sustained Energy" },
          { text: "Needs Caffeine", points: 4, hint: "Coffee/tea dependent to work", badge: "Caffeine Reliant" },
          { text: "Constantly Exhausted", points: 0, hint: "Heavy midday brain fog", badge: "Severe Fatigue" },
        ],
      },
      {
        id: "rec3",
        sectionId: "recovery",
        numberStr: "3.3",
        text: "Chronic Stiffness, Lower Back or Joint Pain",
        description: "Do you experience recurring tightness in knees, lower back, neck, or shoulder joints?",
        options: [
          { text: "Pain-Free & Mobile", points: 6, hint: "Zero recurring joint pains", badge: "Pain Free" },
          { text: "Mild Stiffness", points: 3, hint: "Tight neck or lower spine", badge: "Mild Tightness" },
          { text: "Frequent Aches", points: 0, hint: "Needs rehab/posture protocol", badge: "Rehab Needed" },
        ],
      },
    ],
  },
  {
    id: "form",
    name: "Workout Execution & Lifting Form",
    shortName: "Form",
    pillarNumber: 4,
    icon: "Dumbbell",
    maxPoints: 20,
    subtitle: "Gym floor lifting confidence, dynamic joint warmup, and long-term gym consistency.",
    questions: [
      {
        id: "form1",
        sectionId: "form",
        numberStr: "4.1",
        text: "Gym Floor Confidence & Exercise Technique",
        description: "How comfortable are you executing compound lifts with proper spinal alignment and progressive overload?",
        options: [
          { text: "High Technique IQ", points: 7, hint: "Knows progressive overload", badge: "Confident Form" },
          { text: "Basic Movements", points: 4, hint: "Unsure about heavier free-weights", badge: "Needs Guidance" },
          { text: "Beginner / Intimidated", points: 0, hint: "Confused by machines & angles", badge: "Floor Anxiety" },
        ],
      },
      {
        id: "form2",
        sectionId: "form",
        numberStr: "4.2",
        text: "Warmup, Mobility & Joint Prep",
        description: "Do you perform structured dynamic warmup drills before lifting heavy weights?",
        options: [
          { text: "Dynamic Activation", points: 6, hint: "Pre-workout mobility drills", badge: "Structured Warmup" },
          { text: "Basic Arm Circles", points: 3, hint: "Minimal 2-minute stretch", badge: "Minimal Prep" },
          { text: "Skip Completely", points: 0, hint: "Directly lifts cold (Injury prone)", badge: "Injury Risk" },
        ],
      },
      {
        id: "form3",
        sectionId: "form",
        numberStr: "4.3",
        text: "Gym Consistency Track Record",
        description: "What has been your longest continuous streak of gym adherence without a multi-week drop-off?",
        options: [
          { text: "> 6 Months Consistent", points: 7, hint: "Established gym habit", badge: "Habit Formed" },
          { text: "On and Off", points: 4, hint: "Frequent 2-3 week gaps", badge: "Frequent Gaps" },
          { text: "Start & Quit (Dropout)", points: 0, hint: "Repeatedly leaves after 30 days", badge: "High Dropout" },
        ],
      },
    ],
  },
  {
    id: "mindset",
    name: "Mindset & Accountability System",
    shortName: "Mindset",
    pillarNumber: 5,
    icon: "Target",
    maxPoints: 20,
    subtitle: "Coach accountability, strict 90-day progress metrics, and routine survival under stress.",
    questions: [
      {
        id: "mind1",
        sectionId: "mindset",
        numberStr: "5.1",
        text: "Coaching & External Accountability Support",
        description: "Do you have an experienced coach monitoring your workout logs, form videos, and weekly progress?",
        options: [
          { text: "Dedicated Coach", points: 7, hint: "Weekly check-ins & form review", badge: "Guided Coaching" },
          { text: "Gym Buddy", points: 4, hint: "Dependent on friend's mood", badge: "Buddy Reliant" },
          { text: "Solo (No Accountability)", points: 0, hint: "Nobody notices if you skip", badge: "Solo Dropout Risk" },
        ],
      },
      {
        id: "mind2",
        sectionId: "mindset",
        numberStr: "5.2",
        text: "Goal Metrics & 90-Day Milestones",
        description: "Do you track precise 90-day physical targets (waist circumference, body fat %, weight on the bar)?",
        options: [
          { text: "Strict 90-Day Target", points: 6, hint: "Measured body-fat & logs", badge: "Tracked Milestones" },
          { text: "Vague Plan", points: 3, hint: "Just 'wants to get fit'", badge: "Vague Plan" },
          { text: "Zero Tracking", points: 0, hint: "No targets, no progress logs", badge: "No Tracking" },
        ],
      },
      {
        id: "mind3",
        sectionId: "mindset",
        numberStr: "5.3",
        text: "Discipline Under Stress & Busy Schedules",
        description: "When work deadlines or family emergencies happen, does your workout routine survive?",
        options: [
          { text: "Non-Negotiable", points: 7, hint: "Fits minimum 30-min session", badge: "Resilient Habit" },
          { text: "Struggles but Manages", points: 4, hint: "Workout intensity drops", badge: "Stress Vulnerable" },
          { text: "Skips Immediately", points: 0, hint: "Gym is first thing sacrificed", badge: "Routine Collapse" },
        ],
      },
    ],
  },
];

export function getScoreBand(score: number): ScoreBand {
  if (score < 40) {
    return {
      title: "High Risk / Reset Needed",
      range: "0–39",
      badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      accentColor: "#EF4444",
      headline: "Heavy Metabolic Drag & High Dropout Risk",
      description:
        "Your daily baseline shows heavy metabolic drag and high risk of gym dropout. Training alone without structured coaching will likely lead to burnout or joint injury.",
      sprintRecommendation: "12-Week Guided Transformation (1-on-1 Onboarding)",
      sprintDetails:
        "Dedicated 1-on-1 coach, progressive mobility rehab, baseline macro nutrition plan, and daily habit accountability.",
    };
  }
  if (score < 70) {
    return {
      title: "Moderate Drag / Baseline Building",
      range: "40–69",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      accentColor: "#F59E0B",
      headline: "Solid Foundation With Major Conversion Gaps",
      description:
        "You have genuine motivation, but gaps in protein timing, sleep depth, and progressive programming are stalling body recomposition.",
      sprintRecommendation: "TWS Strength & Body Recomp Accelerator",
      sprintDetails:
        "Hypertrophy-focused training split, structured protein targets, and bi-weekly body composition scans.",
    };
  }
  if (score < 90) {
    return {
      title: "Strong Foundation",
      range: "70–89",
      badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      accentColor: "#0EA5E9",
      headline: "High Performing Presence Ready For Scaling",
      description:
        "You maintain admirable discipline. Fine-tuning intra-workout nutrition, recovery modalities, and advanced periodization will break plateaus.",
      sprintRecommendation: "TWS Performance & Hypertrophy Sprint",
      sprintDetails:
        "Advanced periodized split, deload protocols, targeted micronutrient stacking, and 1RM benchmark progression.",
    };
  }
  return {
    title: "Peak Athletic Lifestyle",
    range: "90–100",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    accentColor: "#10B981",
    headline: "Elite Fitness Lifestyle & Metabolic Mastery",
    description:
      "Outstanding consistency across all 5 health pillars. Maintain movement variability, prevent overuse strain, and sustain lifelong peak vitality.",
    sprintRecommendation: "TWS VIP Athletic Retainer",
    sprintDetails:
      "Long-term athletic maintenance, advanced biometric tracking, and sports performance optimization.",
  };
}

export function getImprovementVectors(sectionScores: SectionScore[]): {
  headline: string;
  laggingPillars: string[];
  diagnosisText: string;
} {
  const sorted = [...sectionScores].sort((a, b) => a.score - b.score);
  const lowest = sorted.filter((s) => s.score < 14);

  if (lowest.length === 0) {
    return {
      headline: "All 5 Pillars Balanced",
      laggingPillars: ["Peak Maintenance"],
      diagnosisText:
        "Your lifestyle baseline is exceptionally balanced. Focus on sustaining progressive overload without overtraining.",
    };
  }

  const laggingPillars = lowest.map((l) => l.name);
  const headline = laggingPillars.slice(0, 3).join(" & ");

  return {
    headline,
    laggingPillars,
    diagnosisText:
      "Your daily baseline shows heavy metabolic drag and high risk of gym dropout. Training alone without structured coaching will likely lead to burnout or joint injury.",
  };
}

export function calculateBusinessAudit(
  business: ProfileDetails,
  answers: Record<string, number>,
  auditId?: string
): AuditRecord {
  // Sync live BMI into business if biometrics are present
  if (business.heightCm && business.weightKg) {
    const bmiRes = calculateBmi(business.heightCm, business.weightKg, business.targetWeightKg);
    if (bmiRes) {
      business.bmi = bmiRes.formattedBmi;
      business.bmiCategory = bmiRes.category;
      business.optimalMinKg = bmiRes.optimalMinKg.toString();
      business.optimalMaxKg = bmiRes.optimalMaxKg.toString();
      business.weightGapKg = bmiRes.weightGapText;
    }
  }

  const sectionScores: SectionScore[] = BUSINESS_SECTIONS.map((section) => {
    let score = 0;
    section.questions.forEach((q) => {
      const chosenIdx = answers[q.id];
      if (chosenIdx !== undefined && q.options[chosenIdx]) {
        score += q.options[chosenIdx].points;
      }
    });
    return {
      id: section.id,
      name: section.name,
      shortName: section.shortName,
      icon: section.icon,
      score,
      maxScore: section.maxPoints,
      percentage: Math.round((score / section.maxPoints) * 100),
    };
  });

  const totalScore = sectionScores.reduce((sum, s) => sum + s.score, 0);
  const band = getScoreBand(totalScore);
  const diagnosis = getImprovementVectors(sectionScores);

  const findings: Finding[] = [];
  BUSINESS_SECTIONS.forEach((section) => {
    section.questions.forEach((q) => {
      const chosenIdx = answers[q.id];
      const opt = chosenIdx !== undefined ? q.options[chosenIdx] : null;
      findings.push({
        questionText: q.text,
        chosenOptionText: opt ? opt.text : "Not answered",
        pointsAwarded: opt ? opt.points : 0,
        maxPoints: Math.max(...q.options.map((o) => o.points)),
        sectionName: section.name,
        hint: opt?.hint,
        badge: opt?.badge,
      });
    });
  });

  const finalId =
    auditId ||
    `RB-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: finalId,
    auditType: "business",
    createdAt: new Date().toISOString(),
    business,
    answers,
    sectionScores,
    totalScore,
    maxScore: 100,
    percentage: totalScore,
    band,
    findings,
    diagnosis,
  };
}

// Exact Sample Record for TWS Business Audit
export const SAMPLE_BUSINESS_RECORD: AuditRecord = {
  id: "RB-261019-1048",
  auditType: "business",
  createdAt: "2026-10-19T10:30:00.000Z",
  business: {
    name: "Rahul Sharma",
    clientName: "Rahul Sharma",
    category: "Fat Loss & Lean Toning",
    locality: "Connaught Place Gym",
    phone: "+91 98765 43210",
    whatsappNumber: "9876543210",
    auditorName: "TWS Coach",
    age: "28",
    biologicalSex: "Male",
    heightCm: "175",
    heightUnit: "cm",
    weightKg: "74",
    targetWeightKg: "68",
    bmi: "24.2",
    bmiCategory: "Normal",
    optimalMinKg: "56.7",
    optimalMaxKg: "76.5",
    weightGapKg: "Optimal",
  },
  answers: {
    act1: 1, // 4,000–8,000 (4 pts)
    act2: 1, // 2–3 Days (4 pts)
    act3: 1, // 5–8 Hours (3 pts) -> Activity: 11/20
    nut1: 1, // Occasional (4 pts)
    nut2: 1, // 2–3 times (3 pts)
    nut3: 1, // 1 cheat meal (4 pts) -> Nutrition: 11/20
    rec1: 1, // 6–7 Hours (4 pts)
    rec2: 1, // Needs Caffeine (4 pts)
    rec3: 1, // Mild Stiffness (3 pts) -> Recovery: 11/20
    form1: 1, // Basic (4 pts)
    form2: 1, // Basic (3 pts)
    form3: 1, // On and Off (4 pts) -> Form: 11/20
    mind1: 1, // Gym Buddy (4 pts)
    mind2: 1, // Vague Plan (3 pts)
    mind3: 1, // Struggles (4 pts) -> Mindset: 11/20
  },
  sectionScores: [
    { id: "activity", name: "Daily Activity & Movement Habit", shortName: "Activity", icon: "Footprints", score: 11, maxScore: 20, percentage: 55 },
    { id: "nutrition", name: "Nutrition & Protein Consistency", shortName: "Nutrition", icon: "Utensils", score: 11, maxScore: 20, percentage: 55 },
    { id: "recovery", name: "Sleep, Recovery & Daily Energy", shortName: "Recovery", icon: "Moon", score: 11, maxScore: 20, percentage: 55 },
    { id: "form", name: "Workout Execution & Lifting Form", shortName: "Form", icon: "Dumbbell", score: 11, maxScore: 20, percentage: 55 },
    { id: "mindset", name: "Mindset & Accountability System", shortName: "Mindset", icon: "Target", score: 11, maxScore: 20, percentage: 55 },
  ],
  totalScore: 55,
  maxScore: 100,
  percentage: 55,
  band: getScoreBand(55),
  findings: [],
  diagnosis: {
    headline: "Nutrition & Protein & Sleep & Recovery",
    laggingPillars: ["Nutrition & Protein Consistency", "Sleep, Recovery & Daily Energy"],
    diagnosisText:
      "Your daily baseline shows heavy metabolic drag and high risk of gym dropout. Training alone without structured coaching will likely lead to burnout or joint injury.",
  },
};
