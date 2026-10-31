// lib/demoData.ts
import { AuditResult } from "./schema";

export interface DemoFixture {
  id: string;
  name: string;
  badge: string;
  topic: string;
  urls: string[];
  rawText: string;
  result: AuditResult;
}

export const DAAD_WISE_DEMO_RESULT: AuditResult = {
  topic: "DAAD WISE Research Internships in Science and Engineering 2026 (Germany)",
  analyzedSources: [
    {
      id: "src-1",
      title: "DAAD Official Portal - WISE Programme Guidelines 2026",
      url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-wise-2026/",
      detectedDate: "2025-10-15",
      isOutdated: false,
    },
    {
      id: "src-2",
      title: "EduGermany Blog - Student Guide to DAAD WISE Application",
      url: "https://edugermany-forum.org/scholarships/daad-wise-tips",
      detectedDate: "2023-08-20",
      isOutdated: true,
    },
    {
      id: "src-3",
      title: "GlobalScholarships.org - German STEM Internship Stipend Index",
      url: "https://globalscholarships.org/europe/germany-stem-daad-overview",
      detectedDate: "2024-11-02",
      isOutdated: true,
    },
  ],
  verifiedFacts: [
    {
      fact: "Open exclusively to undergraduate engineering and science students in their 5th or 6th semester of study.",
      sourceIds: ["src-1", "src-2", "src-3"],
    },
    {
      fact: "Funding tenure is strictly 2 to 3 months, conducted between May and August.",
      sourceIds: ["src-1", "src-2", "src-3"],
    },
    {
      fact: "Provides an international travel lump-sum subsidy alongside mandatory health and accident insurance coverage.",
      sourceIds: ["src-1", "src-2"],
    },
    {
      fact: "Host institution must be a recognized German public university or non-university research institute (Max Planck, Helmholtz, Fraunhofer).",
      sourceIds: ["src-1", "src-3"],
    },
  ],
  detectedGaps: [
    {
      facet: "Concurrent Funding & Host Laboratory Top-Up Policy",
      severity: "High",
      reason:
        "None of the reviewed sources state whether an intern may concurrently receive a home-institution fellowship or stipendiary top-up from the host German laboratory (e.g. HiWi contract) without forfeiting the DAAD scholarship.",
      suggestedQuestion:
        "Does DAAD permit concurrent partial stipends or laboratory top-ups from the host German professor, or is DAAD the strictly exclusive funding source?",
    },
    {
      facet: "Mandatory Repatriation & Post-Internship Visa Transition",
      severity: "High",
      reason:
        "Sources omit whether accepting the WISE scholarship contractually obligates the awardee to return to their home country immediately upon completion, or if they are permitted to transition directly into a German Master's thesis/degree.",
      suggestedQuestion:
        "Are there mandatory return-to-home-institution residency conditions before the scholar can apply for another German visa category?",
    },
    {
      facet: "Health Insurance Provider & Reimbursement vs Upfront Billing",
      severity: "Medium",
      reason:
        "While health insurance is nominally cited as 'covered', no source clarifies whether DAAD enrolls scholars directly in statutory public insurance (TK/AOK) or requires private travel insurance with out-of-pocket upfront payments.",
      suggestedQuestion:
        "Is health, accident, and liability insurance directly provided through the DAAD group contract, or must scholars pay up front and claim reimbursement?",
    },
    {
      facet: "Tax Residency & German Fiscal Identification Number",
      severity: "Low",
      reason:
        "Complete absence of information on whether a 90-day internship stipend is subject to German withholding tax or mandates local city registration (Anmeldung).",
      suggestedQuestion:
        "Does the host institution require city registration (Anmeldung) and a Steueridentifikationsnummer for disbursing stipends?",
    },
  ],
  contradictions: [
    {
      aspect: "Monthly Living Allowance (Stipend Amount)",
      claimA:
        "A monthly scholarship installment of €934 is disbursed to undergraduate scholars for the 2026 funding tenure.",
      sourceAId: "src-1",
      claimB:
        "Selected scholars receive a monthly allowance of €861 plus a fixed travel lump-sum.",
      sourceBId: "src-2",
      divergenceReason:
        "Source 2 is an outdated 2023 third-party post reflecting pre-inflation rates (€861), while Source 1 is the official 2026 DAAD circular stating €934/month.",
    },
    {
      aspect: "Minimum Academic CGPA Requirement",
      claimA:
        "Applicants must possess an aggregate GPA of at least 8.0/10.0 or equivalent at the time of deadline.",
      sourceAId: "src-1",
      claimB:
        "Strict minimum eligibility cutoff is an 8.5 CGPA from recognized premier tier institutions.",
      sourceBId: "src-3",
      divergenceReason:
        "Source 3 reports an unofficial internal pre-screening threshold from select partner institutes, whereas the official DAAD guideline mandates 8.0 CGPA.",
    },
    {
      aspect: "Application Portal Submission Deadline",
      claimA:
        "Application deadline is strictly 01.11.2025 at 23:59 CET for the summer 2026 intake.",
      sourceAId: "src-1",
      claimB:
        "The deadline for submission of complete application dossiers is November 15 annually.",
      sourceBId: "src-2",
      divergenceReason:
        "Source 2 references an obsolete 2023 deadline date. The official 2026 cycle cutoff was moved forward to November 1st.",
    },
  ],
  temporalWarnings: [
    {
      sourceId: "src-2",
      warning:
        "Source 2 is a legacy 2023 blog entry (Cycle 2023). It contains obsolete stipend rates (€861) and outdated November 15 deadline information.",
    },
    {
      sourceId: "src-3",
      warning:
        "Source 3 contains undated secondary aggregations with conflicting grade point average thresholds and no publication timestamp.",
    },
  ],
  verificationChecklist: [
    {
      priority: 1,
      task: "Request official written confirmation from DAAD New Delhi / Bonn helpdesk regarding concurrent research lab top-up rules.",
      targetEntity: "DAAD Regional Helpdesk (info@daaddelhi.org / wise@daad.de)",
    },
    {
      priority: 2,
      task: "Confirm with the German Consular Visa Section whether the DAAD WISE award letter fully exempts the student from blocked account (Sperrkonto) seasoning.",
      targetEntity: "German Embassy / VFS Visa Processing Desk",
    },
    {
      priority: 3,
      task: "Verify with the host professor that Form 6 (Acceptance Letter) lists the updated 2026 funding rate of €934/month.",
      targetEntity: "German Host University Professor / Laboratory Supervisor",
    },
    {
      priority: 4,
      task: "Obtain DAAD Language Evaluation Certificate (Form 7) from home university English faculty if formal IELTS is waived.",
      targetEntity: "Home Institution Dean of Academic Affairs",
    },
  ],
  inquiryDraft: {
    recipientPlaceholder: "DAAD Regional Helpdesk & Host Research Coordinator",
    subject: {
      en: "Formal Clarification: DAAD WISE 2026 Cycle - Concurrent Stipend Policy & Visa Documentation",
      fr: "Demande de clarification officielle : DAAD WISE 2026 - Règles de cumul et justificatifs de visa",
      es: "Aclaración formal: Programa DAAD WISE 2026 - Política de becas concurrentes y requisitos de visa",
      de: "Offizielle Klärungsanfrage: DAAD WISE 2026 - Richtlinien zur Doppelstipendierung & Visumanforderungen",
      hi: "औपचारिक स्पष्टीकरण अनुरोध: DAAD WISE 2026 - समवर्ती अनुसंधान वजीफा एवं वीज़ा आवश्यकताएं",
    },
    body: {
      en: `Dear DAAD WISE Selection Committee and Academic Coordinators,\n\nI am preparing an application for the DAAD WISE Research Internship 2026. While consulting the published portal documentation and partner institution guidelines, our epistemic audit revealed two critical operational ambiguities that require official verification:\n\n1. CONCURRENT FUNDING & LAB TOP-UPS: Is a recipient permitted to accept supplementary research allowances or institutional stipends from the German host laboratory (e.g. Max Planck/Fraunhofer student assistant contract), or does DAAD require exclusive single-source funding?\n\n2. BLOCKED ACCOUNT (SPERRKONTO) EXEMPTION: Does the official DAAD WISE scholarship award letter serve as comprehensive proof of financial resources (Verpflichtungserklärung) for the German National Visa application, completely waiving personal bank statement seasoning?\n\n3. STIPEND SPECIFICATION: Please confirm that the active stipend benchmark for the 2026 cohort is fixed at €934/month (as cited in current 2026 circulars) rather than historical €861 figures found in secondary guides.\n\nThank you for your guidance and time.\n\nSincerely,\n[Applicant Name]\n[Home Institution & Department]\n[Contact Information / DAAD Portal Application ID]`,
      fr: `Madame, Monsieur les coordinateurs du programme DAAD WISE,\n\nJe prépare actuellement mon dossier de candidature pour le stage de recherche DAAD WISE 2026. Après analyse comparative des documents disponibles, certains points essentiels restent indéterminés :\n\n1. CUMUL DE FINANCEMENT : Un boursier peut-il recevoir une indemnité complémentaire du laboratoire d'accueil allemand sans enfreindre les règlements du DAAD ?\n\n2. EXEMPTION DE COMPTE BLOQUÉ (SPERRKONTO) : L'attestation de bourse officielle dispense-t-elle intégralement de l'obligation de compte bloqué pour la demande de visa ?\n\n3. MONTANT DE L'ALLOCATION : Veuillez confirmer que le montant mensuel en vigueur pour la session 2026 est bien fixé à 934 €.\n\nEn vous remerciant par avance pour vos éclaircissements.\n\nCordialement,\n[Nom du candidat]\n[Établissement d'origine]`,
      es: `Estimado Comité de Selección DAAD WISE,\n\nMe dirijo a ustedes para solicitar aclaración formal sobre puntos críticos de la convocatoria DAAD WISE 2026:\n\n1. COMPATIBILIDAD DE FONDOS: ¿Está permitido percibir estipendios adicionales del laboratorio anfitrión alemán?\n2. EXENCIÓN DE CUENTA BLOQUEADA: ¿La carta de adjudicación de beca DAAD exime del requisito de Sperrkonto para el visado nacional?\n3. MONTO OFICIAL: Confirmen que el estipendio mensual oficial para 2026 es de 934 €.\n\nAgradezco de antemano su atención.\n\nAtentamente,\n[Nombre del postulante]`,
      de: `Sehr geehrte Damen und Herren des DAAD-Auswahlkomitees,\n\nim Rahmen meiner Bewerbung für das DAAD WISE-Forschungspraktikum 2026 bitte ich um verbindliche Auskunft zu folgenden Punkten:\n\n1. DOPPELSTIPENDIERUNG: Ist eine zusätzliche Vergütung durch das gastgebende Institut zulässig?\n2. SPERRKONTO-BEFREIUNG: Reicht die offizielle DAAD-Stipendienzusage als vollständiger Finanzierungsnachweis für das Visum aus?\n3. STIPENDIENHÖHE: Bestätigen Sie bitte die Stipendienrate von 934 €/Monat für 2026.\n\nMit freundlichen Grüßen,\n[Name des Bewerbers]`,
      hi: `आदरणीय चयन समिति, DAAD WISE,\n\nमैं DAAD WISE रिसर्च इंटर्नशिप 2026 के लिए आवेदन तैयार कर रहा हूँ। कृपया निम्नलिखित बिंदुओं पर स्पष्टीकरण प्रदान करें:\n\n1. अतिरिक्त प्रयोगशाला वजीफा: क्या मेजबान जर्मन प्रयोगशाला से अतिरिक्त वजीफा स्वीकार्य है?\n2. वीज़ा ब्लॉक खाता छूट: क्या DAAD छात्रवृत्ति पत्र Sperrkonto की आवश्यकता से पूर्ण छूट देता है?\n3. मासिक भत्ता: कृपया पुष्टि करें कि 2026 सत्र हेतु मासिक वजीफा €934 निर्धारित है।\n\nधन्यवाद,\n[आवेदक का नाम]`,
    },
  },
  documentPrerequisites: [
    {
      document: "Financial Guarantee & Blocked Account (Sperrkonto)",
      status: "Missing Requirement",
      riskLevel: "High",
      details:
        "Sources state 'proof of sufficient funds for personal expenses', but omit whether a German Sperrkonto with 90-day bank statement seasoning is mandated or waived by the DAAD award letter.",
      actionRequired:
        "Contact German Visa Desk to verify if DAAD Form 'Finanzierungsbestätigung' waives the blocked account requirement.",
    },
    {
      document: "Transcript of Records vs. Provisional Degree",
      status: "Conflicting Rule",
      riskLevel: "High",
      details:
        "Source 1 accepts an institutional sealed semester transcript; Source 2 asserts a provisional degree with consular apostille is required.",
      actionRequired:
        "Confirm if institutional e-signed grade card is accepted without physical consular apostille.",
    },
    {
      document: "Host Acceptance & Research Commitment (Form 6)",
      status: "Clear",
      riskLevel: "Low",
      details:
        "All sources confirm official 'Form 6: Acceptance of Host Professor' with explicit research project description is mandatory.",
      actionRequired:
        "Ensure host supervisor signs Form 6 specifying the exact 2026 cohort dates.",
    },
    {
      document: "English Language Proficiency (DAAD Form 7)",
      status: "Missing Requirement",
      riskLevel: "Medium",
      details:
        "Sources do not specify whether formal IELTS/TOEFL is mandatory or if a university English Medium of Instruction (MOI) certificate on Form 7 is sufficient.",
      actionRequired:
        "Obtain DAAD Form 7 certified by English faculty head if IELTS is unavailable.",
    },
  ],
};

export const DEMO_FIXTURES: Record<string, DemoFixture> = {
  daad_wise: {
    id: "daad_wise",
    name: "DAAD WISE Germany 2026",
    badge: "Scholarship & Visa",
    topic: "DAAD WISE Research Internships in Science and Engineering 2026 (Germany)",
    urls: [
      "https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-wise-2026/",
      "https://edugermany-forum.org/scholarships/daad-wise-tips",
      "https://globalscholarships.org/europe/germany-stem-daad-overview",
    ],
    rawText: `[OFFICIAL CIRCULAR EXCERPT - DAAD WISE 2026]
Target Group: Students pursuing Bachelor's degree (B.Tech, B.E., B.S.) at Indian higher education institutions.
Eligibility: Minimum aggregate CGPA of 8.0/10.0 at the time of application. Must be in 5th or 6th semester.
Duration: 2 to 3 months between May and August 2026.
Benefits: Monthly stipend installment €934. Travel subsidy €1,075. Combined health, accident and personal liability insurance covered.
Deadline: 1st November 2025 (23:59 CET).
Mandatory: Form 6 signed by German professor.

[THIRD-PARTY FORUM ADVICE 2023]
"Students get €861 stipend. You need 8.5 CGPA to be shortlisted. Portal closes Nov 15th every year. Make sure you get your provisional degree apostilled by MEA before applying."`,
    result: DAAD_WISE_DEMO_RESULT,
  },
  campus_france: {
    id: "campus_france",
    name: "Campus France Eiffel Grant 2026",
    badge: "Master's & PhD",
    topic: "Campus France Eiffel Excellence Scholarship Program (2026-2027 Cycle)",
    urls: [
      "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence",
      "https://studyinfrance-admissions.com/eiffel-scholarship-guide-2024",
    ],
    rawText: `Campus France Eiffel Excellence Scholarship: Applications must be submitted exclusively by French higher education institutions. Direct student applications are strictly ineligible. Monthly allowance: €1,181 for Master level, €1,800 for PhD level. Age limit: Master level applicants must be 27 or younger.`,
    result: {
      ...DAAD_WISE_DEMO_RESULT,
      topic: "Campus France Eiffel Excellence Scholarship Program (2026-2027 Cycle)",
      analyzedSources: [
        {
          id: "src-cf1",
          title: "Campus France Official Guidelines - Eiffel Excellence 2026",
          url: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence",
          detectedDate: "2025-09-20",
          isOutdated: false,
        },
        {
          id: "src-cf2",
          title: "StudyInFrance Unofficial Student Blog",
          url: "https://studyinfrance-admissions.com/eiffel-scholarship-guide-2024",
          detectedDate: "2023-10-10",
          isOutdated: true,
        },
      ],
      verifiedFacts: [
        {
          fact: "Direct student applications are prohibited; submissions must be sponsored by an accredited French university.",
          sourceIds: ["src-cf1", "src-cf2"],
        },
        {
          fact: "Covers monthly allowance, return international transport, and social security enrollment.",
          sourceIds: ["src-cf1"],
        },
      ],
      detectedGaps: [
        {
          facet: "French Institutional Internal Pre-Selection Deadlines",
          severity: "High",
          reason:
            "While Campus France sets an external January deadline, French institutions close their internal candidate vetting up to 2 months earlier (November). Sources omit internal deadlines.",
          suggestedQuestion:
            "What is the exact departmental cutoff date for the chosen university to review and nominate the applicant dossier?",
        },
        {
          facet: "Tuition Fee Waiver Coverage vs Institutional Fees",
          severity: "Medium",
          reason:
            "Eiffel covers living expenses but does NOT cover tuition fees. Sources fail to explain if public university tuition is automatically waived for recipients.",
          suggestedQuestion:
            "Does the nominating French university provide an institutional tuition exemption letter alongside the Eiffel nomination?",
        },
      ],
      contradictions: [
        {
          aspect: "Maximum Age Cutoff for Master's Applicants",
          claimA: "Candidates for Master level must be aged 25 or younger during the application cycle.",
          sourceAId: "src-cf1",
          claimB: "Candidates must be at most 30 years old at the time of evaluation.",
          sourceBId: "src-cf2",
          divergenceReason: "Source cf2 cites older criteria prior to regulatory age caps enacted for the 2025/2026 cycle.",
        },
      ],
      temporalWarnings: [
        {
          sourceId: "src-cf2",
          warning: "Source cf2 was compiled in 2023 and lists obsolete age boundaries and old allowance schedules.",
        },
      ],
      verificationChecklist: [
        {
          priority: 1,
          task: "Contact French University International Relations office to obtain their internal pre-selection deadline.",
          targetEntity: "Host French University Relations Office",
        },
        {
          priority: 2,
          task: "Confirm tuition fee waiver status with the university registrar.",
          targetEntity: "University Registrar / Admissions Office",
        },
      ],
    },
  },
};

export function getDemoFixture(id: string = "daad_wise"): DemoFixture {
  return DEMO_FIXTURES[id] || DEMO_FIXTURES.daad_wise;
}
