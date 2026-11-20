import {
  AuditSection,
  ScoreBand,
  AuditRecord,
  ProfileDetails,
  SectionScore,
  Finding,
} from "./types";

export const NUTRITIONAL_TARGETS = [
  { name: "Drop Visceral Belly Fat & Lose 8-12 kg", icon: "Flame", subtitle: "Reverse central adiposity, caloric leaks & insulin resistance" },
  { name: "Reverse Insulin Resistance & Pre-Diabetes", icon: "HeartPulse", subtitle: "HbA1c optimization, glycemic control & post-meal stabilization" },
  { name: "Gut Dysbiosis & Chronic Bloat Protocol", icon: "ShieldAlert", subtitle: "Microbiome repair, digestive transit & anti-inflammatory nutrition" },
  { name: "Thyroid & PCOS Metabolic Rebalance", icon: "Target", subtitle: "Hormonal co-factors, estrogen/androgen regulation & weight release" },
  { name: "Fatty Liver Grade 1/2 Clinical Reversal", icon: "Activity", subtitle: "Eliminate hepatic lipid accumulation & liquid fructose load" },
  { name: "Lean Muscle Recomp & Metabolic Repair", icon: "Dumbbell", subtitle: "High-protein satiety, progressive surplus & metabolic acceleration" },
];

export const DIET_PREFERENCES = [
  "Vegetarian (Dairy)",
  "Pure Vegetarian / Vegan",
  "Eggetarian",
  "Non-Vegetarian (Chicken, Fish & Eggs)",
  "Jain Vegetarian",
];

export const NUTRITION_SECTIONS: AuditSection[] = [
  {
    id: "protein",
    name: "Daily Protein Density & Satiety",
    shortName: "Protein & Satiety",
    pillarNumber: 1,
    icon: "Utensils",
    maxPoints: 17,
    subtitle: "Protein density, meal distribution, and post-meal satiety duration.",
    questions: [
      {
        id: "n1_1",
        sectionId: "protein",
        numberStr: "1.1",
        text: "Where do you get your daily protein from?",
        description: "Assess the primary sources of protein across your regular daily diet.",
        options: [
          { text: "Mainly Dal, Roti & Milk Tea", points: 0, hint: "Dal is 75% carb by weight. Net daily protein is severely below metabolic baseline.", badge: "<30g Daily Intake" },
          { text: "Occasional Paneer / 1-2 Eggs", points: 3, hint: "Eat eggs or paneer once every few days, but no consistent daily protein source.", badge: "40-55g Irregular" },
          { text: "Structured Quality Protein Daily", points: 6, hint: "Include measured paneer, tofu, soya, eggs, chicken, or whey protein consistently.", badge: "1.2g–1.6g / kg Optimal" },
        ],
      },
      {
        id: "n1_2",
        sectionId: "protein",
        numberStr: "1.2",
        text: "Protein Distribution Across Your Meals",
        description: "How protein is distributed from breakfast through dinner.",
        options: [
          { text: "Zero Protein in Breakfast", points: 0, hint: "Breakfast is strictly poha, upma, bread butter, or biscuits. Triggers morning glucose spike.", badge: "High Insulin Spike" },
          { text: "Protein Only at Dinner", points: 3, hint: "Breakfast and lunch are carb-heavy; only evening meal has paneer or chicken.", badge: "Unbalanced Fuel" },
          { text: "25g+ Protein in 3 Meals", points: 6, hint: "Every meal includes a solid protein anchor, stabilizing appetite and blood sugar.", badge: "Optimal Satiety" },
        ],
      },
      {
        id: "n1_3",
        sectionId: "protein",
        numberStr: "1.3",
        text: "Satiety & Hunger Rebound (How soon are you hungry after eating?)",
        description: "How long you stay comfortably full after meals without urgent hunger.",
        options: [
          { text: "Hungry Again Within 90 Mins", points: 0, hint: "Meals feel heavy while eating, but sudden cravings and hunger kick in soon after.", badge: "Reactive Hypoglycemia" },
          { text: "Stays Full for 2–3 Hours", points: 2, hint: "Moderate fullness, but feel the need to graze on rusks or roasted chana by 4 PM.", badge: "Short Satiety Window" },
          { text: "Effortless 4–5 Hour Fullness", points: 5, hint: "Zero food noise or urgent hunger between meals; sustained mental focus.", badge: "High Leptin Sensitivity" },
        ],
      },
    ],
  },
  {
    id: "liquid_sugar",
    name: "Liquid Calories, Sugar & Hidden Calorie Leaks",
    shortName: "Sugar & Liquid Leaks",
    pillarNumber: 2,
    icon: "Coffee",
    maxPoints: 17,
    subtitle: "Chai/coffee frequency, sweet drinks, and refined evening tea snacks.",
    questions: [
      {
        id: "n2_1",
        sectionId: "liquid_sugar",
        numberStr: "2.1",
        text: "Daily Chai / Coffee with Milk & Sugar Intake",
        description: "Total volume of sweetened teas or coffees consumed throughout the day.",
        options: [
          { text: "3–5+ Cups Sweet Chai Daily", points: 0, hint: "Full cream milk + 2 spoons sugar per cup. Adds 350–550 hidden liquid calories daily.", badge: "~15,000 Extra Kcal/Mo" },
          { text: "1–2 Cups with Half Sugar", points: 3, hint: "Moderate tea intake, but usually paired with 2–3 biscuits or rusks.", badge: "Moderate Calorie Leak" },
          { text: "Black Coffee / Green Tea (No Sugar)", points: 6, hint: "Zero liquid sugar; drink 3+ liters of plain water daily.", badge: "Zero Liquid Calories" },
        ],
      },
      {
        id: "n2_2",
        sectionId: "liquid_sugar",
        numberStr: "2.2",
        text: "Packaged Juices, Cold Drinks, Shakes & \"Healthy\" Beverages",
        description: "Intake of fruit juices, smoothies, packaged beverages or sodas.",
        options: [
          { text: "Frequent Juices / Smoothies / Shakes", points: 0, hint: "Belief that fresh juice is 'healthy' for fat loss. Fructose directly enters liver fat.", badge: "High Fructose Liver Load" },
          { text: "Occasional Soda / Diet Drinks", points: 3, hint: "Drink sweet drinks 1–2 times weekly during social outings.", badge: "Occasional Spike" },
          { text: "Eat Whole Fruits Only", points: 6, hint: "Never drink juice; eat whole apples/papaya with natural fiber intact.", badge: "Intact Fiber Matrix" },
        ],
      },
      {
        id: "n2_3",
        sectionId: "liquid_sugar",
        numberStr: "2.3",
        text: "Evening 5 PM Namkeen, Biscuits, Bhujia & Fried Snacks",
        description: "Snacking habits during the notorious 4 PM - 6 PM tea window.",
        options: [
          { text: "Daily Namkeen / Biscuit Habit", points: 0, hint: "Mindless handfuls of bhujia, mathri, or digestives. Refined palm oil + salt.", badge: "Refined Oil Drag" },
          { text: "Roasted Makhana / Chana", points: 2, hint: "Better food quality, but often overeat portions without realizing calorie density.", badge: "Portion Creep" },
          { text: "Planned High-Protein Snack", points: 5, hint: "Pre-portioned sprouts, boiled eggs, curd, or almonds; zero junk munching.", badge: "Clean Macro Control" },
        ],
      },
    ],
  },
  {
    id: "weekend_social",
    name: "Weekend Damage & Social Eating",
    shortName: "Weekend & Social",
    pillarNumber: 3,
    icon: "Calendar",
    maxPoints: 17,
    subtitle: "Friday to Sunday eating patterns, restaurant dining, and post-weekend guilt.",
    questions: [
      {
        id: "n3_1",
        sectionId: "weekend_social",
        numberStr: "3.1",
        text: "The Friday Night to Sunday Evening Eating Pattern",
        description: "What happens to your nutrition discipline over the weekend.",
        options: [
          { text: "Complete Weekend Blowout", points: 0, hint: "Strict Mon–Thu, but Swiggy/Zomato, pizza, sweets, and heavy dinners Friday through Sunday.", badge: "Wipes Mon–Thu Deficit" },
          { text: "1–2 Social Meals with Family", points: 3, hint: "Eat out on Saturday, but try to keep portions reasonable.", badge: "Moderate Calorie Drift" },
          { text: "Conscious 7-Day Lifestyle", points: 6, hint: "Maintain healthy choices when dining out; prioritize grilled proteins and salads.", badge: "Sustained Balance" },
        ],
      },
      {
        id: "n3_2",
        sectionId: "weekend_social",
        numberStr: "3.2",
        text: "Alcohol, Mocktails & Restaurant Dining Out",
        description: "Alcohol frequency and heavy restaurant starters.",
        options: [
          { text: "Weekly Alcohol + Fried Starters", points: 0, hint: "Beer/cocktails paired with nachos, tandoori tikka butter, and late-night carbs.", badge: "Blocks Fat Oxidation 48h" },
          { text: "Occasional Drinks (1–2 Drinks/Month)", points: 3, hint: "Rare social drinking; mostly stick to food when dining out.", badge: "Low Impact" },
          { text: "Zero Alcohol / Clean Social Outings", points: 6, hint: "Do not drink alcohol; choose fresh lemon water without sugar at events.", badge: "Clean Liver Clearance" },
        ],
      },
      {
        id: "n3_3",
        sectionId: "weekend_social",
        numberStr: "3.3",
        text: "Monday Guilt, Skipping Meals & Crash Detoxes",
        description: "Your behavioral response on Monday morning following social weekends.",
        options: [
          { text: "Starve–Binge–Guilt Cycle", points: 0, hint: "Feel guilty on Monday morning, skip meals or drink green juice all day, binge by night.", badge: "Metabolic Slowdown" },
          { text: "Mild Guilt, Try to \"Eat Light\"", points: 2, hint: "Notice puffiness and water weight on Monday, but resume normal food by Tuesday.", badge: "Water Weight Fluctuation" },
          { text: "Steady, Calibrated Weekly Routine", points: 5, hint: "Zero crash dieting or skipping; maintain steady metabolic fuel 365 days a year.", badge: "Unbreakable Consistency" },
        ],
      },
    ],
  },
  {
    id: "gut_digestion",
    name: "Gut Health, Digestion & Bloating",
    shortName: "Gut & Digestion",
    pillarNumber: 4,
    icon: "ShieldAlert",
    maxPoints: 17,
    subtitle: "Post-meal bloating, bowel regularity, and dietary fiber/probiotic intake.",
    questions: [
      {
        id: "n4_1",
        sectionId: "gut_digestion",
        numberStr: "4.1",
        text: "Post-Meal Bloating, Gas & Acid Reflux / Heartburn",
        description: "Presence of abdominal distension, gas, or acidity after regular meals.",
        options: [
          { text: "Severe Daily Bloat & Acidity", points: 0, hint: "Stomach distends like a balloon after lunch/dinner; need antacids (Pantaloc/Digene).", badge: "Gut Dysbiosis Flag" },
          { text: "Bloating After Specific Foods", points: 3, hint: "Get bloated after raw salads, kidney beans (rajma/chole), or excess wheat/gluten.", badge: "Food Sensitivity" },
          { text: "Flat Stomach & Zero Discomfort", points: 6, hint: "Smooth, quiet digestion with zero heartburn or painful stomach tightness.", badge: "Optimal Microbiome" },
        ],
      },
      {
        id: "n4_2",
        sectionId: "gut_digestion",
        numberStr: "4.2",
        text: "Morning Bowel Movement Regularity & Elimination",
        description: "Ease and frequency of daily natural morning bowel movements.",
        options: [
          { text: "Chronic Constipation / Sluggish", points: 0, hint: "Skip days without bowel movements or feel incomplete evacuation. Needs warm water/churna.", badge: "Toxin Reabsorption Risk" },
          { text: "Irregular Depending on Travel/Stress", points: 3, hint: "Mostly okay, but any change in schedule or work stress causes 2-day constipation.", badge: "Stress-Linked Bowel" },
          { text: "Effortless Daily Morning Clearance", points: 6, hint: "Natural, complete elimination every morning within 30 minutes of waking up.", badge: "Clean Colon Clearance" },
        ],
      },
      {
        id: "n4_3",
        sectionId: "gut_digestion",
        numberStr: "4.3",
        text: "Dietary Fiber, Fermented Foods & Water Intake",
        description: "Intake of raw salads, soluble fiber, homemade curd, and water.",
        options: [
          { text: "<1.5L Water & Zero Raw Salads", points: 0, hint: "Hardly drink water; meals are purely refined cooked gravies without raw fiber or curd.", badge: "Fiber Starvation" },
          { text: "2L Water & Occasional Cucumber/Curd", points: 2, hint: "Eat cucumber or curd sometimes, but inconsistent with daily soluble fiber.", badge: "Marginal Fiber" },
          { text: "30g+ Fiber & Homemade Probiotics", points: 5, hint: "Daily raw vegetables, chia seeds, homemade curd/buttermilk, and 3L water.", badge: "Robust Microbiome" },
        ],
      },
    ],
  },
  {
    id: "cravings_stress",
    name: "Night Cravings, Stress & Cortisol Eating",
    shortName: "Cravings & Stress",
    pillarNumber: 5,
    icon: "Moon",
    maxPoints: 16,
    subtitle: "Post-dinner sweets, stress comfort eating, and late-night screen munching.",
    questions: [
      {
        id: "n5_1",
        sectionId: "cravings_stress",
        numberStr: "5.1",
        text: "Post-Dinner \"Meetha\" (Sweet) Cravings",
        description: "Urge to consume sweets, chocolate, ice cream or jaggery right after dinner.",
        options: [
          { text: "Daily Compulsory Sweet Craving", points: 0, hint: "Cannot sleep without chocolate, mithai, ice cream, or jaggery (gud) right after dinner.", badge: "Dopamine / Serotonin Loop" },
          { text: "Occasional Craving (2–3 Days/Wk)", points: 3, hint: "Control it on weekdays, but crave a piece of dark chocolate or sweet treat when tired.", badge: "Fatigue Induced" },
          { text: "Zero Cravings After Dinner", points: 6, hint: "Balanced meals completely eliminate the urge to search the kitchen for sugar.", badge: "Stable Blood Sugar" },
        ],
      },
      {
        id: "n5_2",
        sectionId: "cravings_stress",
        numberStr: "5.2",
        text: "Stress, Anxiety & Emotional Comfort Eating",
        description: "Tendency to reach for crunchy or sugary comfort snacks when stressed.",
        options: [
          { text: "Food is My Primary Stress Relief", points: 0, hint: "When anxious, bored, or stressed from work/family, I immediately look for crunchy or sugary food.", badge: "High Cortisol Drive" },
          { text: "Stress Snack Only on Heavy Workdays", points: 2, hint: "Normally disciplined, but long working nights break my willpower.", badge: "Situational Stress" },
          { text: "Mindful & Conscious Eating", points: 5, hint: "Eat purely for bodily nourishment; manage stress with walking, breathing, or sleep.", badge: "Autonomous Discipline" },
        ],
      },
      {
        id: "n5_3",
        sectionId: "cravings_stress",
        numberStr: "5.3",
        text: "Late Night 11 PM+ Screen Grazing",
        description: "Snacking while streaming shows or scrolling on phone late at night.",
        options: [
          { text: "Binge While Watching TV / OTT", points: 0, hint: "Eating chips, popcorn, or sweets in bed while watching Netflix or scrolling Instagram.", badge: "Nocturnal Insulin Spike" },
          { text: "Occasional Warm Milk / Fox Nuts", points: 2, hint: "Have a light snack before bed when dinner was eaten too early at 7 PM.", badge: "Early Dinner Gap" },
          { text: "Kitchen Closed After 8:30 PM", points: 5, hint: "Maintain an effortless 12-hour overnight digestive rest window.", badge: "12h Fasting Window" },
        ],
      },
    ],
  },
  {
    id: "hormonal_energy",
    name: "Hormonal, Energy & Blood Health",
    shortName: "Hormones & Energy",
    pillarNumber: 6,
    icon: "HeartPulse",
    maxPoints: 16,
    subtitle: "Clinical blood markers, post-lunch fatigue crashes, and past crash dieting rebound.",
    questions: [
      {
        id: "n6_1",
        sectionId: "hormonal_energy",
        numberStr: "6.1",
        text: "Diagnosed Hormonal / Metabolic Markers",
        description: "Diagnosed conditions impacting metabolism (Thyroid, PCOS, Fatty Liver, HbA1c).",
        options: [
          { text: "Thyroid / PCOS / Pre-Diabetes / Fatty Liver", points: 0, hint: "Diagnosed clinical condition making fat loss impossible without a therapeutic nutrition plan.", badge: "Clinical Therapeutic Need" },
          { text: "Borderline Cholesterol / High Uric Acid", points: 3, hint: "Mildly elevated lipids or uric acid from sedentary desk work and diet leaks.", badge: "Metabolic Warning" },
          { text: "All Blood Tests Completely Normal", points: 6, hint: "Normal HbA1c (<5.6), balanced thyroid hormones, and clean ultrasound.", badge: "Optimal Biomarkers" },
        ],
      },
      {
        id: "n6_2",
        sectionId: "hormonal_energy",
        numberStr: "6.2",
        text: "Daytime Fatigue, Lethargy & 3 PM Energy Crash",
        description: "Afternoon sluggishness, heavy post-lunch eyelids, or brain fog.",
        options: [
          { text: "Heavy Post-Lunch Sleepiness", points: 0, hint: "Eyes feel heavy at desk; severe sluggishness proves insulin resistance and carb overload.", badge: "Glucose Spike Crash" },
          { text: "Mild After-Lunch Slump", points: 2, hint: "A bit sluggish after roti/rice meals, but recover after a walk or glass of water.", badge: "Moderate Drag" },
          { text: "High Sustained Energy All Day", points: 5, hint: "Sharp, active, and productive from morning until evening without caffeine dependency.", badge: "Metabolic Flexibility" },
        ],
      },
      {
        id: "n6_3",
        sectionId: "hormonal_energy",
        numberStr: "6.3",
        text: "Past Crash Dieting & Weight Rebound History",
        description: "History of soup/salad diets, severe calorie deprivation, or stubborn weight plateaus.",
        options: [
          { text: "Lost Weight on Crash Diet, Gained Double Back", points: 0, hint: "Starved on soups/salads or keto in past; metabolism slowed down, body rebounded heavier.", badge: "Damaged Metabolic Rate" },
          { text: "Stuck at Same Weight for 6+ Months", points: 2, hint: "Eating less and exercising, but weight scale won't budge. Hitting a chronic plateau.", badge: "Adaptation Plateau" },
          { text: "First Time Starting a Clinical Diet", points: 5, hint: "Never damaged metabolism with crash diets; clean slate ready for metabolic coaching.", badge: "Responsive Metabolism" },
        ],
      },
    ],
  },
];

export const NUTRITION_SCORE_BANDS: ScoreBand[] = [
  {
    title: "Severe Deficit / Metabolic Drag",
    range: "0–39",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    accentColor: "#EF4444",
    headline: "High Visceral Drag & Chronic Metabolic Slowdown",
    description:
      "Your clinical baseline indicates severe daily protein deficit, hidden liquid calorie accumulation, gut dysbiosis, and high cortisol snacking. Traditional low-calorie crash dieting will further damage your basal metabolic rate; a structured clinical nutrition reset is urgently required.",
    sprintRecommendation: "12-Week Clinical Metabolic & Gut Reset Protocol",
    sprintDetails:
      "Dedicated Clinical Nutritionist, anti-inflammatory meal templates, daily photo food logging, therapeutic protein calibration (1.2–1.5g/kg), and bi-weekly body composition scans.",
  },
  {
    title: "Moderate Deficit / Macro Inconsistency",
    range: "40–69",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    accentColor: "#F59E0B",
    headline: "Good Intentions With Major Hidden Calorie & Protein Gaps",
    description:
      "You maintain good health consciousness, but uneven protein distribution, evening tea snacking creep, and weekend calorie blowouts are neutralizing your weekly deficit.",
    sprintRecommendation: "TWS 8-Week Visceral Belly & Fat Loss Accelerator",
    sprintDetails:
      "Glycemic stabilization roadmap, high-satiety protein anchoring across all 3 meals, weekend social dining protocol, and daily WhatsApp accountability.",
  },
  {
    title: "Disciplined / Needs Metabolic Tuning",
    range: "70–89",
    badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    accentColor: "#0EA5E9",
    headline: "Strong Baseline Ready for Precision Micronutrient Scaling",
    description:
      "Consistently clean nutritional choices with strong satiety control. Fine-tuning gut microbiome diversity, circadian fasting timing, and hormonal balancing will unlock stubborn belly fat.",
    sprintRecommendation: "TWS Precision Metabolic & Hormone Coaching",
    sprintDetails:
      "Nutrient timing optimization, gut prebiotic diversity protocol, continuous glucose stability, and body recomposition.",
  },
  {
    title: "Peak Metabolic Health & Gut Resilience",
    range: "90–100",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    accentColor: "#10B981",
    headline: "Elite Nutritional Discipline & High Leptin Sensitivity",
    description:
      "Outstanding consistency across all 6 nutritional pillars. Quiet effortless satiety, flat bloat-free digestion, zero sugar reliance, and resilient metabolic flexibility.",
    sprintRecommendation: "TWS VIP Nutritional Retainer",
    sprintDetails:
      "Quarterly biomarker screening, seasonal nutrition adjustments, longevity protocols, and intuitive lifestyle sustainability.",
  },
];

export function getNutritionScoreBand(score: number): ScoreBand {
  if (score >= 90) return NUTRITION_SCORE_BANDS[3];
  if (score >= 70) return NUTRITION_SCORE_BANDS[2];
  if (score >= 40) return NUTRITION_SCORE_BANDS[1];
  return NUTRITION_SCORE_BANDS[0];
}

export function calculateNutritionAudit(
  business: ProfileDetails,
  answers: Record<string, number>,
  idPrefix = "RN"
): AuditRecord {
  let totalScore = 0;
  const sectionScores: SectionScore[] = [];
  const findings: Finding[] = [];

  NUTRITION_SECTIONS.forEach((section) => {
    let sectionScoreVal = 0;
    section.questions.forEach((q) => {
      const chosenIdx = answers[q.id];
      if (chosenIdx !== undefined && q.options[chosenIdx]) {
        const option = q.options[chosenIdx];
        sectionScoreVal += option.points;
        const maxOptPoints = Math.max(...q.options.map((o) => o.points));
        findings.push({
          questionText: q.text,
          chosenOptionText: option.text,
          pointsAwarded: option.points,
          maxPoints: maxOptPoints,
          sectionName: section.name,
          hint: option.hint,
          badge: option.badge,
        });
      }
    });

    const secPercentage = Math.round((sectionScoreVal / section.maxPoints) * 100);
    sectionScores.push({
      id: section.id,
      name: section.name,
      shortName: section.shortName,
      icon: section.icon,
      score: sectionScoreVal,
      maxScore: section.maxPoints,
      percentage: secPercentage,
    });
    totalScore += sectionScoreVal;
  });

  const band = getNutritionScoreBand(totalScore);

  const lagging = [...sectionScores]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3)
    .map((s) => s.name);

  const diagnosis = {
    headline: lagging.join(" & "),
    laggingPillars: lagging,
    diagnosisText:
      "Your intake reveals significant metabolic drag caused by protein deficits, liquid calorie spikes, or digestive inflammation. Structured clinical coaching will reset your metabolism.",
  };

  const finalId = `${idPrefix}-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: finalId,
    auditType: "nutrition",
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

export const SAMPLE_NUTRITION_RECORD: AuditRecord = {
  id: "RN-261119-4820",
  auditType: "nutrition",
  createdAt: "2026-11-19T10:30:00.000Z",
  business: {
    name: "Priya Sharma",
    clientName: "Priya Sharma",
    phone: "+91 98765 43210",
    whatsappNumber: "9876543210",
    age: "34",
    biologicalSex: "Female",
    category: "Drop Visceral Belly Fat & Lose 8-12 kg",
    dietPreference: "Vegetarian (Dairy)",
    locality: "34 yrs • Female • Vegetarian (Dairy)",
    heightCm: "162",
    heightUnit: "cm",
    weightKg: "76",
    targetWeightKg: "60",
    bmi: "29.0",
    bmiCategory: "Overweight",
    optimalMinKg: "49",
    optimalMaxKg: "65",
    weightGapKg: "-16.0 kg",
    proteinNeedMin: "91",
    proteinNeedMax: "114",
    auditorName: "TWS Clinical Nutritionist",
    goal: "Drop Visceral Belly Fat & Lose 8-12 kg",
  },
  answers: {
    n1_1: 0, // Mainly Dal, Roti & Milk Tea (0 pts)
    n1_2: 0, // Zero Protein in Breakfast (0 pts)
    n1_3: 0, // Hungry Again Within 90 Mins (0 pts) -> 0/17

    n2_1: 0, // 3-5+ Cups Sweet Chai Daily (0 pts)
    n2_2: 1, // Occasional Soda / Diet Drinks (3 pts)
    n2_3: 0, // Daily Namkeen / Biscuit Habit (0 pts) -> 3/17

    n3_1: 0, // Complete Weekend Blowout (0 pts)
    n3_2: 2, // Zero Alcohol / Clean Social Outings (6 pts)
    n3_3: 0, // Starve–Binge–Guilt Cycle (0 pts) -> 6/17

    n4_1: 0, // Severe Daily Bloat & Acidity (0 pts)
    n4_2: 1, // Irregular Depending on Travel/Stress (3 pts)
    n4_3: 1, // 2L Water & Occasional Cucumber/Curd (2 pts) -> 5/17

    n5_1: 0, // Daily Compulsory Sweet Craving (0 pts)
    n5_2: 0, // Food is My Primary Stress Relief (0 pts)
    n5_3: 1, // Occasional Warm Milk / Fox Nuts (2 pts) -> 2/16

    n6_1: 1, // Borderline Cholesterol / High Uric Acid (3 pts)
    n6_2: 0, // Heavy Post-Lunch Sleepiness (0 pts)
    n6_3: 0, // Lost Weight on Crash Diet, Gained Double Back (0 pts) -> 3/16
  },
  sectionScores: [
    { id: "protein", name: "Daily Protein Density & Satiety", shortName: "Protein & Satiety", icon: "Utensils", score: 0, maxScore: 17, percentage: 0 },
    { id: "liquid_sugar", name: "Liquid Calories, Sugar & Hidden Calorie Leaks", shortName: "Sugar & Liquid Leaks", icon: "Coffee", score: 3, maxScore: 17, percentage: 18 },
    { id: "weekend_social", name: "Weekend Damage & Social Eating", shortName: "Weekend & Social", icon: "Calendar", score: 6, maxScore: 17, percentage: 35 },
    { id: "gut_digestion", name: "Gut Health, Digestion & Bloating", shortName: "Gut & Digestion", icon: "ShieldAlert", score: 5, maxScore: 17, percentage: 29 },
    { id: "cravings_stress", name: "Night Cravings, Stress & Cortisol Eating", shortName: "Cravings & Stress", icon: "Moon", score: 2, maxScore: 16, percentage: 13 },
    { id: "hormonal_energy", name: "Hormonal, Energy & Blood Health", shortName: "Hormones & Energy", icon: "HeartPulse", score: 3, maxScore: 16, percentage: 19 },
  ],
  totalScore: 19,
  maxScore: 100,
  percentage: 19,
  band: NUTRITION_SCORE_BANDS[0],
  findings: [],
  diagnosis: {
    headline: "Daily Protein Density & Night Cravings & Liquid Calories",
    laggingPillars: [
      "Daily Protein Density & Satiety",
      "Night Cravings, Stress & Cortisol Eating",
      "Liquid Calories, Sugar & Hidden Calorie Leaks",
    ],
    diagnosisText:
      "Your intake reveals significant metabolic drag caused by protein deficits, liquid calorie spikes, or digestive inflammation. Structured clinical coaching will reset your metabolism.",
  },
};
