# TWS Interactive Sample Diagnostic Suite

A unified interactive demonstrator combining **Local Business Audit**, **1-on-1 Fitness Diagnostic**, and **Clinical Nutrition Audit** for seamless client walkthroughs, live demonstrations, and instant WhatsApp report dispatch.

---

## 🔗 Repository

- **GitHub Repository**: [https://github.com/connecttws/Rethink-Sample-Audit](https://github.com/connecttws/Rethink-Sample-Audit)

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Architecture**: Pure Client-Side / Session Storage / URL Payload State (Zero Database Required)

---

## 🎭 Pre-Loaded Demonstration Personas

The suite features 1-click sample profiles accessible directly from the pinned top demo bar (`SampleTopBar.tsx`) to enable rapid live pitch demonstrations:

| Persona | Module | Key Diagnostic Metrics | Highlighted Findings |
| :--- | :--- | :--- | :--- |
| **Dr. Dental Care Clinic** | 🏢 Business Audit | 5 Pillars, 15 Checkpoints, Local SEO score | Low Google Review velocity, Missing GBP categories, Unclaimed citations |
| **Aakash Verma** | 🏋️‍♂️ Fitness Diagnostic | Age 32, BMI 27.8 (Overweight), Target -8kg | Sedentary work posture, Core instability, Recovery deficit |
| **Priya Sharma** | 🥗 Nutrition Audit | Age 29, Eggetarian, Protein Deficit | Suboptimal morning protein intake, High evening glycemic load, Hydration lag |

---

## ✨ Features & Diagnostic Engines

### 1. Hub Selection (`/`)
High-converting diagnostic selector allowing evaluators or clients to choose between Business, Fitness, or Nutrition audits, with direct 1-click links and "Copy Shareable Link" actions.

### 2. Dedicated Audit Modules
- 🏢 **`/business` — Local Business Growth & Digital Audit**:
  - Evaluates 5 core pillars across 15 diagnostic scoring checkpoints.
  - Generates revenue-leakage insights, digital footprint analysis, and conversion action plans.
- 🏋️‍♂️ **`/fitness` — 1-on-1 Fitness & Biomechanics Diagnostic**:
  - Assesses 6 pillars across 18 points with live BMI calculation and optimal target weight gap.
  - Evaluates posture, mobility, strength consistency, and cardiovascular baseline.
- 🥗 **`/nutrition` — Clinical Nutrition & Metabolic Rate Intake**:
  - Covers 6 clinical pillars across 18 points with protein target estimation and diet preference categorization.
  - Diagnoses micronutrient variety, gut health, meal timing, and metabolic triggers.

### 3. Pinned Top Shareable Bar (`SampleTopBar.tsx`)
Always visible during client walkthroughs with:
- Live direct shareable client link display.
- 1-click **"Copy Shareable Link"**.
- 1-click **"Load Sample Profile"** for instantaneous pitch presentations.
- 1-click **"Switch Audit"** back to the central hub.

### 4. Zero Database / Universal URL Payload Engine
- Uses in-memory & browser session storage — completely stateless and privacy-preserving.
- Encodes diagnostic results directly into compressed URL parameters (`?d=...`), allowing generated report links to render on any mobile or desktop browser without a backend database.
- Zero database credentials or environment variables required — deploys to Vercel in seconds.

### 5. Instant WhatsApp Dispatch
- Clients or coaches enter a WhatsApp phone number.
- 1-tap **"Send Report on WhatsApp ↗"** pre-formats the executive summary, diagnostic score, and interactive report link.

---

## 📊 Priority Matrix & Report Structure

Every generated report (`/report`) delivers:
1. **Executive Cover**: Overall audit score, prospect tiering, and date stamp.
2. **Pillar Score Breakdown**: Detailed percentage gauges across every evaluated pillar.
3. **Prioritized Action Plan**: Ranked findings (Critical, High, Moderate) with immediate operational fixes.
4. **WhatsApp Lead Conversion CTA**: Direct engagement loop back to the consultant or coach.

---

## 📁 Directory Structure

```
Rethink-Sample-Audit/
├── public/                                           # Static assets and icons
├── src/
│   ├── app/
│   │   ├── business/page.tsx                         # Business audit entry
│   │   ├── fitness/page.tsx                          # Fitness diagnostic entry
│   │   ├── nutrition/page.tsx                        # Clinical nutrition audit entry
│   │   ├── report/page.tsx                           # Universal report presentation page
│   │   ├── globals.css                               # Tailwind v4 styles & custom design tokens
│   │   ├── layout.tsx                                # Root layout
│   │   └── page.tsx                                  # Central hub selector
│   ├── components/
│   │   ├── questionnaires/                           # Specialized intake forms
│   │   │   ├── BusinessQuestionnaire.tsx
│   │   │   ├── FitnessQuestionnaire.tsx
│   │   │   └── NutritionQuestionnaire.tsx
│   │   ├── report/                                   # Executive report cards & visualizers
│   │   │   ├── ReportActionPlan.tsx
│   │   │   ├── ReportBreakdown.tsx
│   │   │   ├── ReportCover.tsx
│   │   │   ├── ReportFindings.tsx
│   │   │   ├── ReportHeader.tsx
│   │   │   └── ReportWhatsAppCta.tsx
│   │   ├── AuditCompleteStep.tsx
│   │   ├── AuditorNav.tsx
│   │   ├── ContinuousQuestionnaire.tsx
│   │   └── SampleTopBar.tsx                          # Pinned quick-loader demo bar
│   └── lib/
│       ├── business-data.ts                          # Business diagnostic criteria
│       ├── fitness-data.ts                           # Fitness criteria & BMI math
│       ├── nutrition-data.ts                         # Nutrition criteria & dietary tags
│       ├── session-store.ts                          # Stateless session persistence
│       └── types.ts                                  # TypeScript definitions
├── package.json
└── tsconfig.json
```

---

## 🛠️ Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/connecttws/Rethink-Sample-Audit.git
cd Rethink-Sample-Audit
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🚀 One-Click Vercel Deployment

Deploy directly without configuring any database or environment variables:
```bash
vercel
```

---

## 📄 License

All rights reserved © Rethink / TWS. Built for interactive audit demonstrations and instant client walkthroughs.
