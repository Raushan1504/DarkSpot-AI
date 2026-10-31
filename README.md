# DarkSpot AI — Epistemic Information Gap & Contradiction Auditor
**Shinchan Online Hackathon 2026 Official Submission**  
*Project Category:* Web Development • Artificial Intelligence • Research & Information Technology

---

## 1. Problem Statement & Mission
When individuals make high-stakes decisions—such as applying for international scholarships (e.g., DAAD, Eiffel), study/work visas, or research grants—they are forced to gather information scattered across uncoordinated websites, legacy student forums, and institutional circulars.

Traditional search engines retrieve documents, while typical LLM summarizers condense visible text. Both fail catastrophically due to the **"closed-world" assumption**: they cannot inform the user about **what is missing, what is obsolete, or what directly contradicts itself across sources**. 

Applicants frequently meet the visible criteria only to be disqualified by silent dealbreakers: unmentioned renewal requirements, hidden repatriation bond clauses, outdated stipend figures, or conflicting document legalization rules (apostille vs. provisional transcript).

**DarkSpot AI** breaks the closed-world assumption by auditing scattered documents for high-stakes decisions, surfacing:
1. **Agreed Core Facts (Verified Baseline):** Sourced and verified across documents.
2. **Information Dark Spots:** Critical facets completely omitted across all sources.
3. **Side-by-Side Contradictions:** Numerical and policy discrepancies with verbatim quotes.
4. **Temporal Drift:** Stale cycles and expired deadlines compared to the current 2026 intake.
5. **Actionable Verification Checklist:** A prioritized to-do list with target verification entities.
6. **Multilingual Inquiry Drafts:** One-click pre-formulated letters addressing the exact gaps discovered.

---

## 2. Core Architecture & Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling & Design System:** Tailwind CSS v4, Base UI, Lucide Icons, Glassmorphism, Sleek Dark Aesthetics
- **AI & Epistemic Reasoning:** Google Gemini API (`@ai-sdk/google` + `ai` SDK) with Zod Schema Structured Outputs
- **Data Acquisition:** Cheerio + JSDOM + Mozilla Readability engine with server-side caching
- **Feedback & Notifications:** Sonner rich toasts
- **Resilience:** Offline Demo Fixture fallback (zero-crash guarantee during live evaluations)

---

## 3. Key Features & Workflow
- **Intake Engine:** Enter research goal or question, add multiple canonical URLs, or paste raw circular text.
- **Provenance Dossier:** Live cards displaying title, canonical URLs, publication timestamps, and amber badges for prior cycle/stale links.
- **4-Tab Epistemic Dashboard:**
  - *Tab 1: Information Gaps (Dark Spots)* — Explicitly badged `"Potential Signal: Unmentioned in Any Source"` to maintain epistemic humility.
  - *Tab 2: Conflicting Claims (Diff View)* — Side-by-side quotes contrasting Source A vs. Source B with divergence explanations.
  - *Tab 3: Verified Baseline* — High-confidence consensus facts.
  - *Tab 4: Document & Prerequisite Auditor* — Risk matrix for seasoning days, apostilles, and language forms.
- **Official Clarification Generator:** Modal formatting formal inquiry emails with multilingual toggles (English, French, Spanish, German, Hindi), copy-to-clipboard, and system mail client integration.

---

## 4. Getting Started Locally

```bash
# Clone the repository
git clone <your-repo-url>
cd darkspot-ai

# Install dependencies
npm install

# (Optional) Add your Gemini API key in .env.local
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Click **"Load Demo Fixture"** to immediately test the platform using the realistic DAAD WISE 2026 scenario.
