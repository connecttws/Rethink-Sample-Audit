# TWS Interactive Sample Diagnostic Suite

A unified interactive clinical & business diagnostic suite combining **TWS Lifestyle & Health Audit**, **1-on-1 Fitness Diagnostic**, and **Clinical Nutrition Audit** for seamless client walkthroughs, live demonstrations, and instant WhatsApp report dispatch.

---

## 🔗 Repository

- **GitHub Repository**: [https://github.com/connecttws/Rethink-Sample-Audit](https://github.com/connecttws/Rethink-Sample-Audit)

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Database / ORM**: [Prisma 6](https://www.prisma.io/) + [Supabase PostgreSQL](https://supabase.com/) (`business_audit.tws_sample_audit`)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Architecture**: Dual Cloud PostgreSQL Sync + Instant Offline / LocalStorage Fallback

---

## ✨ Key Features & Capabilities

### 1. Interactive Intake Pop-Up Modal
- When any diagnostic engine is selected on the Hub (`/`), a modal prompts for:
  - **Member / Client Name** (Required)
  - **WhatsApp Mobile Number** (`+91` 10-digit validation)
- Automatically stores the auditor and prospect details in `localStorage` and `sessionStorage`, pre-filling the questionnaire so clients never have to type their details twice.

### 2. Secret Auditor History (Double-Click TWS Logo)
- **Master Password Protected**: Double-clicking the **TWS Logo** triggers the authorization prompt (`Welcome@123`).
- **5-Item Pagination**: Loads 5 records initially with a **"View More (+5 Records)"** button to load additional batches.
- **Auditor Attribution**: Prominently displays the audited client name and an auditor badge:
  - `👤 Auditor: [Name] (You)` if conducted from this device.
  - `👤 Auditor: [Name]` if conducted by another team member.
- **Category Tabs**: Switch between **All Audits**, **Business & Lifestyle**, **Fitness & Biomechanics**, **Clinical Nutrition**, and **Physio / Clinical**.
- **Search**: Real-time filtering across member name, phone, auditor, and location.

### 3. Dedicated Diagnostic Modules
- 🏢 **`/business` — TWS BMI & Lifestyle Health Audit**:
  - 5-Pillar daily activity, nutrition, sleep recovery, form prep, and mindset assessment (15 Points).
- 🏋️‍♂️ **`/fitness` — TWS 1-on-1 Fitness & Biomechanics Diagnostic**:
  - 6-Pillar posture, joint safety, desk slouch, gym habits, and energy screen (18 Points) with live BMI math.
- 🥗 **`/nutrition` — TWS Clinical Nutrition & Metabolic Rate Intake**:
  - 6-Pillar protein density, gut dysbiosis, liquid calorie leaks, and meal cadence screen (18 Points).

### 4. Cloud Database Persistence (`business_audit.tws_sample_audit`)
- Submissions automatically save to the Supabase PostgreSQL database table `business_audit.tws_sample_audit` via `POST /api/audits`.
- Full diagnostic payloads, answers, scores, and findings are stored with dedicated B-Tree indexes for fast historical search.

### 5. Instant WhatsApp Dispatch & Clean Short URLs (`/r/[id]`)
- Replaced lengthy Base64 token payload URLs with clean, short URLs: `/r/[id]` (e.g. `https://domain.com/r/RB-261120-1048`).
- Database-backed report lookup via `GET /api/audits/[id]` with instant session and local cache fallbacks.
- Removed hardcoded owner numbers (`8368052044`) from client report views.
- Clients can share their diagnostic report directly via WhatsApp (`wa.me/?text=...`) with a concise, professional preview link.

---

## 📊 Report Structure (`/report`)

Every generated diagnostic report provides:
1. **Executive Cover**: Overall score (0–100), benchmark tier, prospect biometrics, and reference ID.
2. **5 / 6 Pillar Score Breakdown**: Self-contained progress bars comparing current score vs optimal capacity.
3. **Prescribed Turnaround Protocol**: Structured 12-week intervention recommendations.
4. **Itemized Findings Breakdown**: Transparent audit of all points evaluated with strategic guidance.
5. **Universal WhatsApp Export & Print**: Shareable WhatsApp report payload and clean one-click PDF printing.

---

## 📁 Directory Structure

```
Rethink-Sample-Audit/
├── prisma/
│   ├── schema.prisma                                     # Prisma multi-schema model for tws_sample_audit
│   └── create_tws_sample_audit.sql                       # Database DDL and indexing script
├── public/
│   └── tws-logo.png                                      # Official TWS branding logo
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── audits/route.ts                           # Cloud audit create & list API
│   │   │   └── history/route.ts                          # Secret history query API
│   │   ├── business/page.tsx                             # TWS Lifestyle Health audit entry
│   │   ├── fitness/page.tsx                              # TWS Fitness diagnostic entry
│   │   ├── nutrition/page.tsx                            # TWS Clinical Nutrition audit entry
│   │   ├── report/page.tsx                               # Universal report presentation page
│   │   ├── globals.css                                   # Tailwind v4 styles & design tokens
│   │   ├── layout.tsx                                    # Root layout with fonts & metadata
│   │   └── page.tsx                                      # Central diagnostic selector hub
│   ├── components/
│   │   ├── questionnaires/                               # Specialized questionnaire forms
│   │   │   ├── BusinessQuestionnaire.tsx
│   │   │   ├── FitnessQuestionnaire.tsx
│   │   │   └── NutritionQuestionnaire.tsx
│   │   ├── report/                                       # Executive report components
│   │   │   ├── ReportActionPlan.tsx
│   │   │   ├── ReportBreakdown.tsx
│   │   │   ├── ReportCover.tsx
│   │   │   ├── ReportFindings.tsx
│   │   │   ├── ReportHeader.tsx
│   │   │   └── ReportWhatsAppCta.tsx
│   │   ├── AuditCompleteStep.tsx
│   │   ├── AuditorNav.tsx
│   │   ├── SampleTopBar.tsx                              # Quick-loader demo bar
│   │   ├── SecretHistoryModal.tsx                        # Master-password protected history modal
│   │   ├── StartAuditModal.tsx                           # Intake modal for name & WhatsApp
│   │   └── TwsLogo.tsx                                   # Interactive double-click logo component
│   └── lib/
│       ├── business-data.ts                              # Business diagnostic criteria
│       ├── fitness-data.ts                               # Fitness criteria & BMI math
│       ├── history-storage.ts                            # Dual cloud + local history manager
│       ├── nutrition-data.ts                             # Nutrition criteria & dietary tags
│       ├── prisma.ts                                     # Shared Prisma client instance
│       ├── session-store.ts                              # Session persistence & WhatsApp formatter
│       └── types.ts                                      # TypeScript definitions
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

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres.<user>:<password>@<host>:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.<user>:<password>@<host>:5432/postgres"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🔐 Master Security Key
- **Auditor History Unlock**: `Welcome@123` (Triggered by double-clicking the TWS Logo on any page)
