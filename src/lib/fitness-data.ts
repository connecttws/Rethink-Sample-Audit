import {
  AuditSection,
  ScoreBand,
  AuditRecord,
  ProfileDetails,
  SectionScore,
  Finding,
} from "./types";

export const FITNESS_GOALS = [
  { name: "Burn Belly Fat & Lose Extra Weight", icon: "Flame", subtitle: "Deficit management, calorie expenditure & muscle preservation" },
  { name: "Build Muscle Mass & Tone Body", icon: "Dumbbell", subtitle: "Progressive overload, high-protein surplus & muscle mass" },
  { name: "Improve Stamina, Posture & Daily Energy", icon: "Zap", subtitle: "Power output, functional performance, speed & resilience" },
  { name: "Fix Back Pain, Stiff Joints & Flexibility", icon: "ShieldAlert", subtitle: "Spine decompression, posture alignment & joint mobility" },
  { name: "Athletic Conditioning & Core Strength", icon: "Target", subtitle: "Cardiovascular health, daytime vitality & endurance" },
];

export const TARGET_HORIZONS = [
  "Fast Track 8 Weeks",
  "Structured 12 Weeks (Recommended)",
  "Complete 16 Weeks",
  "Long Term 6 Months Lifestyle",
];

export const FITNESS_SECTIONS: AuditSection[] = [
  {
    id: "posture",
    name: "Body Posture & Biomechanics Screen",
    shortName: "Posture & Mechanics",
    pillarNumber: 1,
    icon: "Activity",
    maxPoints: 17,
    subtitle: "Squat depth & butt-wink, 8–10h desk lock, and overhead shoulder mobility.",
    questions: [
      {
        id: "p1_1",
        sectionId: "posture",
        numberStr: "1.1",
        text: "What happens when you do a bodyweight squat (sitting down deep)?",
        description: "Assesses hip mobility, ankle dorsiflexion, and lumbar spine stability under loading.",
        options: [
          { text: "Lower Back Curves / Rounds", points: 0, hint: "Tailbone tucks under (butt-wink). High risk of spine injury under weights.", badge: "High Risk Flag" },
          { text: "Half Squat Only (Tight Hips)", points: 2, hint: "Can't hit parallel depth without heels lifting off or leaning forward heavily.", badge: "Limited Range" },
          { text: "Deep Squat with Neutral Spine & Stable Feet", points: 6, hint: "Can sit deep past parallel with an upright chest and planted heels.", badge: "Optimal Mobility" },
        ],
      },
      {
        id: "p1_2",
        sectionId: "posture",
        numberStr: "1.2",
        text: "Daily Sitting Posture & Desk Load",
        description: "Evaluates daily cumulative spinal compression and hip flexor shortening from work desks.",
        options: [
          { text: "8–10+ Hours Seated Desk Lock", points: 0, hint: "Hunched neck, shoulders rolled forward, severe hip flexor tightness.", badge: "Severe Stagnation" },
          { text: "5–7 Hours Desk Work", points: 2, hint: "Moderate sitting with occasional breaks, but shoulders feel stiff by evening.", badge: "Moderate Drag" },
          { text: "Active / Upright Daily Posture", points: 6, hint: "Take frequent standing breaks and accumulate 8,000+ daily steps.", badge: "High Daily Movement" },
        ],
      },
      {
        id: "p1_3",
        sectionId: "posture",
        numberStr: "1.3",
        text: "Overhead Reach & Shoulder Flexibility",
        description: "Tests thoracic spine extension and rotator cuff clearance for overhead pressing and lifting.",
        options: [
          { text: "Sharp Pinch or Clicking", points: 0, hint: "Pinching in front shoulders when raising arms straight up overhead.", badge: "Impingement Risk" },
          { text: "Tight Upper Back Arch", points: 2, hint: "Have to arch lower back excessively to get arms straight past ears.", badge: "Thoracic Restriction" },
          { text: "Smooth Pain-Free Reach", points: 5, hint: "Can touch biceps to ears with zero neck or shoulder tension.", badge: "Full Scapular Clearance" },
        ],
      },
    ],
  },
  {
    id: "pain_joints",
    name: "Pain & Joint Safety Screen",
    shortName: "Pain & Joint Safety",
    pillarNumber: 2,
    icon: "ShieldAlert",
    maxPoints: 17,
    subtitle: "Lower back aches, knee valgus tracking, and past disc/ligament injuries.",
    questions: [
      {
        id: "p2_1",
        sectionId: "pain_joints",
        numberStr: "2.1",
        text: "Do you experience Lower Back stiffness, dull aches, or pain?",
        description: "Screens for spinal fatigue, disc compression, and posterior chain weakness.",
        options: [
          { text: "Frequent Morning / Seated Ache", points: 0, hint: "Aches after prolonged sitting, standing, or bending forward.", badge: "High PT Need" },
          { text: "Occasional Fatigue / Tightness", points: 3, hint: "Tight on stressful work days, but no sharp medical pinch or sciatica.", badge: "Muscular Fatigue" },
          { text: "Completely Pain-Free", points: 6, hint: "Back feels strong, flexible, and comfortable all day long.", badge: "Zero Symptoms" },
        ],
      },
      {
        id: "p2_2",
        sectionId: "pain_joints",
        numberStr: "2.2",
        text: "Do your knees cave inward or ache when climbing stairs or squatting?",
        description: "Screens for glute medius weakness and patellofemoral tracking dysfunctions.",
        options: [
          { text: "Yes, Knees Wobble / Cave Inward", points: 0, hint: "Puts heavy twisting shear on knees during loaded gym movements.", badge: "Ligament Strain Risk" },
          { text: "Occasional Clicking on Stairs", points: 3, hint: "Clicking sounds without sharp pain, but feel hesitant on heavy sets.", badge: "Patellar Tracking Flag" },
          { text: "Solid & Stable Knee Tracking", points: 6, hint: "Knees track cleanly over toes with zero wobble or clicking.", badge: "Stable Joint Mechanics" },
        ],
      },
      {
        id: "p2_3",
        sectionId: "pain_joints",
        numberStr: "2.3",
        text: "History of Past Joint Sprains, Disc Bulge, or Ligament Tears",
        description: "Checks medical clearance and previous orthopedic injuries that require exercise modifications.",
        options: [
          { text: "Past Disc Slip / Ligament Injury", points: 0, hint: "Prior diagnosed injury; unguided floor lifting is medically risky.", badge: "Medical Red Flag" },
          { text: "Old Sprain (Healed But Guarded)", points: 2, hint: "Healed ankle/wrist sprain, but subconsciously avoid certain exercises.", badge: "Guarded Movement" },
          { text: "Clean Medical & Orthopedic Record", points: 5, hint: "No bone, disc, or tendon injuries. Full clearance to train.", badge: "Clean Clearance" },
        ],
      },
    ],
  },
  {
    id: "gym_habits",
    name: "Gym Floor Habits & Technique",
    shortName: "Gym Technique",
    pillarNumber: 3,
    icon: "Dumbbell",
    maxPoints: 17,
    subtitle: "Free-weight confidence, logbook tracking, and dynamic joint preparation.",
    questions: [
      {
        id: "p3_1",
        sectionId: "gym_habits",
        numberStr: "3.1",
        text: "How confident are you using free weights & barbells on the gym floor?",
        description: "Assesses floor autonomy, barbell setup competency, and guidance requirement.",
        options: [
          { text: "Total Guesswork / Lost on Floor", points: 0, hint: "Stick to treadmills or wander around randomly copying strangers.", badge: "Needs Supervised Guidance" },
          { text: "Machines Only / Avoid Free Weights", points: 2, hint: "Comfortable on guided machines, but avoid deadlifts and squat racks.", badge: "Free Weight Hesitation" },
          { text: "Confident With Written Plan", points: 6, hint: "Follow a periodized workout log with safe progressive overload.", badge: "High Floor Autonomy" },
        ],
      },
      {
        id: "p3_2",
        sectionId: "gym_habits",
        numberStr: "3.2",
        text: "Do you track your weights, sets, and reps every workout?",
        description: "Checks for progressive overload tracking vs uncalibrated gym plateauing.",
        options: [
          { text: "Never Track (Repeat Same Weights)", points: 0, hint: "Lift whatever looks open. No structured progressive overload.", badge: "Plateau Guaranteed" },
          { text: "Mental Guesswork Tracking", points: 2, hint: "Try to remember last week's weight in head, but frequently forget.", badge: "Inconsistent Progression" },
          { text: "Logged Logbook / App Tracking", points: 6, hint: "Record exact poundages and reps to ensure progressive stimulus.", badge: "Systematic Periodization" },
        ],
      },
      {
        id: "p3_3",
        sectionId: "gym_habits",
        numberStr: "3.3",
        text: "What is your Warm-up & Joint Preparation Protocol?",
        description: "Differentiates cold acute injury risks from active joint lubrication and CNS priming.",
        options: [
          { text: "Zero Prep / Lift Heavy While Cold", points: 0, hint: "Jump straight into working sets. Cold muscles tear easily.", badge: "Acute Injury Risk" },
          { text: "5 Mins Treadmill Only", points: 2, hint: "Gets heart rate up, but does zero dynamic mobility for hips or shoulders.", badge: "Incomplete Preparation" },
          { text: "Dynamic Mobility & Activation", points: 5, hint: "Perform specific joint prep, rotator cuff drills, and ramp-up sets.", badge: "Optimal CNS Prep" },
        ],
      },
    ],
  },
  {
    id: "nutrition_fuel",
    name: "Daily Nutrition & Fuel Quality",
    shortName: "Nutrition & Fuel",
    pillarNumber: 4,
    icon: "Utensils",
    maxPoints: 17,
    subtitle: "Daily protein intake, sweet chai/beverages, and weekend portion discipline.",
    questions: [
      {
        id: "p4_1",
        sectionId: "nutrition_fuel",
        numberStr: "4.1",
        text: "Daily Protein Intake (Eggs, Paneer, Chicken, Soya, Whey)?",
        description: "Essential macronutrient for muscle preservation, fat oxidation, and metabolic recovery.",
        options: [
          { text: "Severe Deficit / Mostly Carbs & Fats", points: 0, hint: "Mostly roti, rice, snacks. Muscles can't repair, leaving you tired.", badge: "<0.6g / kg Bodyweight" },
          { text: "Only 1 Meal Has Some Protein", points: 3, hint: "Eat eggs or paneer once a day, but total daily amount is insufficient.", badge: "Sub-optimal Synthesis" },
          { text: "High Protein in Every Single Meal", points: 6, hint: "Hit daily target (1.6g-2g/kg). Muscles recover quickly with minimal soreness.", badge: "Optimal Hypertrophy & Fat Loss" },
        ],
      },
      {
        id: "p4_2",
        sectionId: "nutrition_fuel",
        numberStr: "4.2",
        text: "Sweet Chai, Coffee, Soda & Sugary Drinks Frequency",
        description: "Screens for silent liquid calories and insulin spikes driving visceral abdominal fat storage.",
        options: [
          { text: "3–4+ Cups Sweet Chai / Soda Daily", points: 0, hint: "350–500 empty calories daily spiking insulin and causing belly fat storage.", badge: "Hidden Calorie Leak" },
          { text: "1–2 Cups Sweet Beverage Daily", points: 3, hint: "Moderate sugar intake, but adds 150-200 uncounted liquid calories daily.", badge: "Moderate Drag" },
          { text: "Black Coffee / Green Tea / Zero Sugar", points: 6, hint: "Drink 3+ liters of water with zero liquid sugar calories.", badge: "Zero Liquid Calories" },
        ],
      },
      {
        id: "p4_3",
        sectionId: "nutrition_fuel",
        numberStr: "4.3",
        text: "Weekend Eating & Dining Out Discipline",
        description: "Evaluates whether 48-hour weekend blowouts wipe out 5 days of weekday gym discipline.",
        options: [
          { text: "Heavy Weekend Blowout", points: 0, hint: "Friday to Sunday binging completely wipes out Mon-Thu gym progress.", badge: "Deficit Destroyer" },
          { text: "1–2 Social Meals with Family", points: 2, hint: "Eat out on Saturday, but try to keep portions under control.", badge: "Controlled Drift" },
          { text: "Disciplined 7-Day Lifestyle", points: 5, hint: "Make mindful choices even when eating out; prioritize grilled proteins and salads.", badge: "Sustained Caloric Deficit" },
        ],
      },
    ],
  },
  {
    id: "recovery_sleep",
    name: "Sleep, Stress & Daily Energy",
    shortName: "Recovery & Sleep",
    pillarNumber: 5,
    icon: "Moon",
    maxPoints: 16,
    subtitle: "Restful sleep hours, 3 PM energy crashes, and nocturnal stress munching.",
    questions: [
      {
        id: "p5_1",
        sectionId: "recovery_sleep",
        numberStr: "5.1",
        text: "How many hours of restful sleep do you get every night?",
        description: "Evaluates hormonal recovery, growth hormone release, and daytime cortisol regulation.",
        options: [
          { text: "Under 5.5 Hours / Broken Sleep", points: 0, hint: "Wake up exhausted. High cortisol blocks fat loss and promotes muscle breakdown.", badge: "High Cortisol State" },
          { text: "6 to 7 Hours Inconsistent", points: 3, hint: "Moderate sleep, but late screen time causes delayed sleep onset.", badge: "Marginal Rest" },
          { text: "7.5 to 8.5 Hours Deep Sleep", points: 6, hint: "Wake up fully rested with high natural morning energy.", badge: "Optimal Recovery" },
        ],
      },
      {
        id: "p5_2",
        sectionId: "recovery_sleep",
        numberStr: "5.2",
        text: "Afternoon Energy Crash & Caffeine Need",
        description: "Tests for adrenal fatigue, post-prandial reactive hypoglycemia, and sleep debt.",
        options: [
          { text: "Severe 3 PM Crash & Brain Fog", points: 0, hint: "Need chai/coffee/sugary snacks just to stay awake through work.", badge: "Adrenal & Blood Sugar Dip" },
          { text: "Mild Post-Lunch Slump", points: 2, hint: "Slight dip in energy, but can push through without heavy sugar.", badge: "Circadian Drag" },
          { text: "Sustained Alert Energy All Day", points: 5, hint: "Zero brain fog; steady mental clarity from morning till evening.", badge: "Stable Blood Glucose" },
        ],
      },
      {
        id: "p5_3",
        sectionId: "recovery_sleep",
        numberStr: "5.3",
        text: "Stress Cravings & Late-Night Snacking",
        description: "Identifies cortisol-driven emotional eating and evening snacking habits.",
        options: [
          { text: "High Stress & Late Night Munching", points: 0, hint: "Work stress triggers cravings for sweets or namkeen late at night.", badge: "Emotional Eating" },
          { text: "Occasional Midnight Snacks", points: 2, hint: "Eat clean during the day, but crave biscuits or ice cream after 10 PM.", badge: "Nocturnal Appetite Leak" },
          { text: "Zero Stress Eating / High Discipline", points: 5, hint: "Eat strictly for nourishment with zero late-night junk grazing.", badge: "Leptin Sensitivity" },
        ],
      },
    ],
  },
  {
    id: "history_commitment",
    name: "Past Gym History & Commitment",
    shortName: "History & Consistency",
    pillarNumber: 6,
    icon: "Target",
    maxPoints: 16,
    subtitle: "Solo dropout history, workout resilience under deadlines, and floor coach accountability.",
    questions: [
      {
        id: "p6_1",
        sectionId: "history_commitment",
        numberStr: "6.1",
        text: "In the past, what happened when you tried going to the gym alone?",
        description: "Analyzes solo dropout psychological patterns and unguided gym frustration.",
        options: [
          { text: "Quit Within 2–4 Weeks Solo", points: 0, hint: "Missed 2 days due to work or soreness, lost steam, and stopped completely.", badge: "The Solo Dropout Wall" },
          { text: "Lasted 2–3 Months Then Plateaued", points: 2, hint: "Stopped seeing results, got bored with the same routine, and faded out.", badge: "Unprogressive Plateau" },
          { text: "Consistently Trained 1+ Year", points: 6, hint: "Have strong workout habit, looking to break through to peak physique.", badge: "High Adherence" },
        ],
      },
      {
        id: "p6_2",
        sectionId: "history_commitment",
        numberStr: "6.2",
        text: "What happens to your workout routine when work deadlines get busy?",
        description: "Tests routine fragility under professional stress and time constraints.",
        options: [
          { text: "Workout Habit Collapses Completely", points: 0, hint: "Work stress wipes out gym attendance for weeks at a time.", badge: "Extreme Friction" },
          { text: "Miss 1–2 Workouts, Try to Catch Up", points: 2, hint: "Attendance drops to 1-2 days, but attempt weekend recovery sessions.", badge: "Moderate Friction" },
          { text: "Non-Negotiable Routine (Never Miss)", points: 5, hint: "Gym is booked on calendar as non-negotiable stress management.", badge: "Unshakeable Habit" },
        ],
      },
      {
        id: "p6_3",
        sectionId: "history_commitment",
        numberStr: "6.3",
        text: "Do you need a dedicated coach waiting for you on the gym floor?",
        description: "Measures accountability leverage to convert intentions into flawless attendance.",
        options: [
          { text: "Yes, Need an Appointment with a Coach", points: 2, hint: "If a trainer is waiting for me, I show up 100% of the time. Alone, I make excuses.", badge: "High Accountability Need" },
          { text: "Need Guidance for Initial 4 Weeks", points: 3, hint: "Need form correction and routine setup, then can execute independently.", badge: "Initial Floor Coaching" },
          { text: "Completely Self-Driven", points: 5, hint: "Show up consistently on my own; only need advanced programming tweaks.", badge: "Autonomous Trainee" },
        ],
      },
    ],
  },
];

export const FITNESS_SCORE_BANDS: ScoreBand[] = [
  {
    title: "High Injury & Dropout Risk",
    range: "0–39",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    accentColor: "#EF4444",
    headline: "Severe Biomechanical Restrictions & High Solo Dropout Risk",
    description:
      "Your diagnostic screen indicates significant lumbar butt-wink during squats, high sedentary sitting load, uneven protein intake, and an acute risk of gym dropout without supervised 1-on-1 coaching.",
    sprintRecommendation: "12-Week Guided Transformation (1-on-1 Onboarding)",
    sprintDetails:
      "Dedicated 1-on-1 floor coach, progressive mobility rehab, baseline macro nutrition plan, and daily habit accountability.",
  },
  {
    title: "Moderate Biomechanical Drag",
    range: "40–69",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    accentColor: "#F59E0B",
    headline: "Decent Foundation Sapped by Recovery Leaks & Missing Overload",
    description:
      "You have the physical capability to transform, but unlogged weights, 3 PM energy dips, and weekend social eating are blunting your physical progression.",
    sprintRecommendation: "12-Week Hypertrophy & Metabolic Sprint",
    sprintDetails:
      "Logbook-tracked progressive overload, customized daily protein targets (1.6g/kg), and structured weekend meal guidelines.",
  },
  {
    title: "Strong Athletic Foundation",
    range: "70–89",
    badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    accentColor: "#0EA5E9",
    headline: "Consistent Trainee Poised for Advanced Body Recomposition",
    description:
      "High baseline discipline with clean movement patterns. Micro-calibrating your pre-workout CNS activation and sleep depth will unlock sub-15% body fat.",
    sprintRecommendation: "12-Week Advanced Body Recomposition",
    sprintDetails:
      "Periodized RPE loading, nutrient timing around training windows, and advanced posterior chain stabilization.",
  },
  {
    title: "Elite Conditioning Baseline",
    range: "90–100",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    accentColor: "#10B981",
    headline: "Flawless Biomechanics, Optimal Nutrition & Bulletproof Adherence",
    description:
      "Outstanding kinematic mobility, dialed nutrition, and strong mind-muscle connection. You are operating at peak athletic potential.",
    sprintRecommendation: "Performance Mastery & Peak Conditioning",
    sprintDetails:
      "High-level athletic periodization, velocity-based training, and competition-ready body fat maintenance.",
  },
];

export function getFitnessScoreBand(score: number): ScoreBand {
  if (score >= 90) return FITNESS_SCORE_BANDS[3];
  if (score >= 70) return FITNESS_SCORE_BANDS[2];
  if (score >= 40) return FITNESS_SCORE_BANDS[1];
  return FITNESS_SCORE_BANDS[0];
}

export function calculateFitnessAudit(
  business: ProfileDetails,
  answers: Record<string, number>,
  idPrefix = "RFA"
): AuditRecord {
  let totalScore = 0;
  const sectionScores: SectionScore[] = [];
  const findings: Finding[] = [];

  FITNESS_SECTIONS.forEach((section) => {
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

  const band = getFitnessScoreBand(totalScore);

  const lagging = [...sectionScores]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3)
    .map((s) => s.name);

  const diagnosis = {
    headline: lagging.join(" & "),
    laggingPillars: lagging,
    diagnosisText:
      "Your intake indicates significant biomechanical friction, unlogged training, or nutritional leaks. Supervised 1-on-1 coaching will eliminate injury risk and guarantee 12-week body transformation.",
  };

  const finalId = `${idPrefix}-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: finalId,
    auditType: "fitness",
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

export const SAMPLE_FITNESS_RECORD: AuditRecord = {
  id: "RFA-261119-3240",
  auditType: "fitness",
  createdAt: "2026-11-19T10:30:00.000Z",
  business: {
    name: "Aakash Verma",
    clientName: "Aakash Verma",
    phone: "+91 98765 01234",
    whatsappNumber: "9876501234",
    age: "32",
    biologicalSex: "Male",
    category: "Burn Belly Fat & Lose Extra Weight",
    targetHorizon: "Structured 12 Weeks (Recommended)",
    locality: "32 yrs • Male • Structured 12 Weeks (Recommended)",
    heightCm: "175",
    heightUnit: "cm",
    weightKg: "86",
    targetWeightKg: "73",
    bmi: "28.1",
    bmiCategory: "Overweight",
    optimalMinKg: "57",
    optimalMaxKg: "76",
    weightGapKg: "-13.0 kg",
    auditorName: "TWS Coach",
    goal: "Burn Belly Fat & Lose Extra Weight",
  },
  answers: {
    p1_1: 0, // Lower Back Curves / Rounds (0 pts)
    p1_2: 0, // 8-10+ Hours Seated Desk Lock (0 pts)
    p1_3: 1, // Tight Upper Back Arch (2 pts) -> 2/17

    p2_1: 1, // Occasional Fatigue / Tightness (3 pts)
    p2_2: 1, // Occasional Clicking on Stairs (3 pts)
    p2_3: 2, // Clean Medical & Orthopedic Record (5 pts) -> 11/17

    p3_1: 0, // Total Guesswork / Lost on Floor (0 pts)
    p3_2: 0, // Never Track (Repeat Same Weights) (0 pts)
    p3_3: 1, // 5 Mins Treadmill Only (2 pts) -> 2/17

    p4_1: 1, // Only 1 Meal Has Some Protein (3 pts)
    p4_2: 0, // 3-4+ Cups Sweet Chai / Soda Daily (0 pts)
    p4_3: 0, // Heavy Weekend Blowout (0 pts) -> 3/17

    p5_1: 1, // 6 to 7 Hours Inconsistent (3 pts)
    p5_2: 0, // Severe 3 PM Crash & Brain Fog (0 pts)
    p5_3: 0, // High Stress & Late Night Munching (0 pts) -> 3/16

    p6_1: 0, // Quit Within 2-4 Weeks Solo (0 pts)
    p6_2: 0, // Workout Habit Collapses Completely (0 pts)
    p6_3: 0, // Yes, Need an Appointment with a Coach (2 pts) -> 2/16
  },
  sectionScores: [
    { id: "posture", name: "Body Posture & Biomechanics Screen", shortName: "Posture & Mechanics", icon: "Activity", score: 2, maxScore: 17, percentage: 12 },
    { id: "pain_joints", name: "Pain & Joint Safety Screen", shortName: "Pain & Joint Safety", icon: "ShieldAlert", score: 11, maxScore: 17, percentage: 65 },
    { id: "gym_habits", name: "Gym Floor Habits & Technique", shortName: "Gym Technique", icon: "Dumbbell", score: 2, maxScore: 17, percentage: 12 },
    { id: "nutrition_fuel", name: "Daily Nutrition & Fuel Quality", shortName: "Nutrition & Fuel", icon: "Utensils", score: 3, maxScore: 17, percentage: 18 },
    { id: "recovery_sleep", name: "Sleep, Stress & Daily Energy", shortName: "Recovery & Sleep", icon: "Moon", score: 3, maxScore: 16, percentage: 19 },
    { id: "history_commitment", name: "Past Gym History & Commitment", shortName: "History & Consistency", icon: "Target", score: 2, maxScore: 16, percentage: 13 },
  ],
  totalScore: 23,
  maxScore: 100,
  percentage: 23,
  band: FITNESS_SCORE_BANDS[0],
  findings: [],
  diagnosis: {
    headline: "Body Posture & Gym Floor Habits & Past Gym History",
    laggingPillars: [
      "Body Posture & Biomechanics Screen",
      "Gym Floor Habits & Technique",
      "Past Gym History & Commitment",
    ],
    diagnosisText:
      "Your intake indicates significant biomechanical friction, unlogged training, or nutritional leaks. Supervised 1-on-1 coaching will eliminate injury risk and guarantee 12-week body transformation.",
  },
};
