// lib/demoData.ts
import { AuditResult } from "./schema";
import { SupportedUiLang } from "./i18n";

export interface DemoFixture {
  id: string;
  name: string;
  badge: string;
  topic: string;
  urls: string[];
  rawText: string;
  result: AuditResult;
}

export const DAAD_WISE_DEMO_RESULTS: Record<SupportedUiLang, AuditResult> = {
  en: {
    topic: "DAAD WISE Research Internships in Science and Engineering 2026 (Germany)",
    analyzedSources: [
      {
        id: "src-1",
        title: "DAAD Official Portal - WISE Programme Guidelines 2026",
        url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
        detectedDate: "2025-10-15",
        isOutdated: false,
      },
      {
        id: "src-2",
        title: "EduGermany Blog - Student Guide to DAAD WISE Application",
        url: "https://www.study-in-germany.de/en/",
        detectedDate: "2023-08-20",
        isOutdated: true,
      },
      {
        id: "src-3",
        title: "GlobalScholarships.org - German STEM Internship Stipend Index",
        url: "https://www.research-in-germany.org/en/",
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
        en: `Dear DAAD WISE Selection Committee and Academic Coordinators,\n\nI am preparing an application for the DAAD WISE Research Internship 2026. While consulting the published portal documentation and partner institution guidelines, our epistemic audit revealed critical operational ambiguities:\n\n1. CONCURRENT FUNDING & LAB TOP-UPS: Is a recipient permitted to accept supplementary research allowances or institutional stipends from the German host laboratory without forfeiting the DAAD scholarship?\n\n2. BLOCKED ACCOUNT (SPERRKONTO) EXEMPTION: Does the official DAAD WISE scholarship award letter serve as comprehensive proof of financial resources for the German National Visa application?\n\n3. STIPEND SPECIFICATION: Please confirm that the active stipend benchmark for the 2026 cohort is fixed at €934/month rather than historical €861 figures.\n\nThank you for your guidance.\n\nSincerely,\n[Applicant Name]\n[Home Institution & Department]`,
        fr: `Madame, Monsieur les coordinateurs du programme DAAD WISE,\n\nJe prépare actuellement mon dossier de candidature pour le stage de recherche DAAD WISE 2026. Après analyse comparative des documents disponibles, certains points essentiels restent indéterminés :\n\n1. CUMUL DE FINANCEMENT : Un boursier peut-il recevoir une indemnité complémentaire du laboratoire d'accueil sans enfreindre les règlements du DAAD ?\n\n2. EXEMPTION DE COMPTE BLOQUÉ : L'attestation de bourse dispense-t-elle intégralement de l'obligation de compte bloqué pour le visa ?\n\n3. MONTANT DE L'ALLOCATION : Veuillez confirmer que le montant mensuel en vigueur pour 2026 est bien fixé à 934 €.\n\nCordialement,\n[Nom du candidat]`,
        es: `Estimado Comité de Selección DAAD WISE,\n\nMe dirijo a ustedes para solicitar aclaración formal sobre puntos críticos de la convocatoria DAAD WISE 2026:\n\n1. COMPATIBILIDAD DE FONDOS: ¿Está permitido percibir estipendios adicionales del laboratorio anfitrión alemán sin perder la beca DAAD?\n2. EXENCIÓN DE CUENTA BLOQUEADA: ¿La carta de adjudicación de beca DAAD exime del requisito de Sperrkonto para el visado nacional?\n3. MONTO OFICIAL: Confirmen que el estipendio mensual oficial para 2026 es de 934 €.\n\nAtentamente,\n[Nombre del postulante]`,
        de: `Sehr geehrte Damen und Herren des DAAD-Auswahlkomitees,\n\nim Rahmen meiner Bewerbung für das DAAD WISE-Forschungspraktikum 2026 bitte ich um verbindliche Auskunft zu folgenden Punkten:\n\n1. DOPPELSTIPENDIERUNG: Ist eine zusätzliche Vergütung durch das Gastinstitut zulässig?\n2. SPERRKONTO-BEFREIUNG: Reicht die offizielle DAAD-Stipendienzusage als vollständiger Finanzierungsnachweis für das Visum aus?\n3. STIPENDIENHÖHE: Bestätigen Sie bitte die Stipendienrate von 934 €/Monat für 2026.\n\nMit freundlichen Grüßen,\n[Name des Bewerbers]`,
        hi: `आदरणीय चयन समिति, DAAD WISE,\n\nमैं DAAD WISE रिसर्च इंटर्नशिप 2026 के लिए आवेदन तैयार कर रहा हूँ। कृपया निम्नलिखित बिंदुओं पर स्पष्टीकरण प्रदान करें:\n\n1. अतिरिक्त प्रयोगशाला वजीफा: क्या मेजबान जर्मन प्रयोगशाला से अतिरिक्त वजीफा स्वीकार्य है?\n2. वीज़ा ब्लॉक खाता छूट: क्या DAAD छात्रवृत्ति पत्र Sperrkonto की आवश्यकता से पूर्ण छूट देता है?\n3. मासिक भत्ता: कृपया पुष्टि करें कि 2026 सत्र हेतु मासिक वजीफा €934 निर्धारित है।\n\nधन्यवाद,\n[आवेदक का नाम]`,
      },
    },
    documentPrerequisites: [
      {
        document: "Financial Proof & Blocked Account (Sperrkonto)",
        status: "Missing Requirement",
        riskLevel: "High",
        details:
          "Sources state fund requirements but omit whether a 28-day vs 90-day bank seasoning or German Sperrkonto is mandated or waived by the award letter.",
        actionRequired:
          "Confirm whether the official award certificate waives the blocked account requirement.",
      },
      {
        document: "Degree / Transcript Authentication",
        status: "Conflicting Rule",
        riskLevel: "High",
        details:
          "Discrepancy between provisional semester grade cards and mandatory consular apostilles.",
        actionRequired:
          "Check with consular desk if university digital transcripts are accepted without physical consular apostille.",
      },
      {
        document: "Host Professor Acceptance Form (Form 6)",
        status: "Clear",
        riskLevel: "Low",
        details:
          "Consistent requirement across all sources for signed institutional host acceptance Form 6.",
        actionRequired: "Ensure host supervisor signs Form 6 for the 2026 cohort dates.",
      },
      {
        document: "Language Proficiency Assessment (Form 7)",
        status: "Missing Requirement",
        riskLevel: "Medium",
        details:
          "No source confirms whether an English Medium of Instruction letter replaces formal IELTS/TOEFL on DAAD Form 7.",
        actionRequired:
          "Request departmental language certificate from home university English faculty.",
      },
    ],
  },
  es: {
    topic: "Pasantías de Investigación DAAD WISE en Ciencia e Ingeniería 2026 (Alemania)",
    analyzedSources: [
      {
        id: "src-1",
        title: "Portal Oficial del DAAD - Directrices del Programa WISE 2026",
        url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
        detectedDate: "2025-10-15",
        isOutdated: false,
      },
      {
        id: "src-2",
        title: "Blog EduGermany - Guía para la Solicitud DAAD WISE",
        url: "https://www.study-in-germany.de/en/",
        detectedDate: "2023-08-20",
        isOutdated: true,
      },
      {
        id: "src-3",
        title: "GlobalScholarships.org - Índice de Estipendios STEM en Alemania",
        url: "https://www.research-in-germany.org/en/",
        detectedDate: "2024-11-02",
        isOutdated: true,
      },
    ],
    verifiedFacts: [
      {
        fact: "Abierto exclusivamente a estudiantes de pregrado de ingeniería y ciencias en su 5.º o 6.º semestre de estudio.",
        sourceIds: ["src-1", "src-2", "src-3"],
      },
      {
        fact: "La duración de la beca es estrictamente de 2 a 3 meses, realizada entre mayo y agosto.",
        sourceIds: ["src-1", "src-2", "src-3"],
      },
      {
        fact: "Otorga un subsidio global para viajes internacionales y cobertura obligatoria de seguro médico y de accidentes.",
        sourceIds: ["src-1", "src-2"],
      },
      {
        fact: "La institución anfitriona debe ser una universidad pública alemana reconocida o un instituto de investigación (Max Planck, Helmholtz, Fraunhofer).",
        sourceIds: ["src-1", "src-3"],
      },
    ],
    detectedGaps: [
      {
        facet: "Política de Fondos Concurrentes y Complemento Salarial del Laboratorio Anfitrión",
        severity: "High",
        reason:
          "Ninguna de las fuentes revisadas indica si un becario puede percibir simultáneamente una beca de su institución de origen o un complemento salarial del laboratorio alemán (ej. contrato HiWi) sin perder la beca DAAD.",
        suggestedQuestion:
          "¿Permite el DAAD estipendios complementarios o remuneraciones de laboratorio del profesor alemán anfitrión, o es el DAAD la única fuente exclusiva de financiación permitida?",
      },
      {
        facet: "Repatriación Obligatoria y Transición de Visado Post-Pasantía",
        severity: "High",
        reason:
          "Las fuentes omiten si aceptar la beca WISE obliga contractualmente al beneficiario a regresar a su país de origen inmediatamente tras finalizar, o si se le permite transicionar directamente a un Máster en Alemania.",
        suggestedQuestion:
          "¿Existen condiciones obligatorias de residencia de retorno al país de origen antes de que el becario pueda solicitar otra categoría de visado alemán?",
      },
      {
        facet: "Proveedor de Seguro Médico y Reembolso vs Pago por Adelantado",
        severity: "Medium",
        reason:
          "Aunque el seguro médico figura como 'cubierto', ninguna fuente aclara si el DAAD afilia a los becarios al seguro público obligatorio (TK/AOK) o requiere un seguro privado de viaje con desembolso inicial.",
        suggestedQuestion:
          "¿El seguro de salud, accidentes y responsabilidad civil se gestiona directamente a través de la póliza colectiva del DAAD, o los becarios deben pagar por adelantado y solicitar el reembolso?",
      },
      {
        facet: "Residencia Fiscal y Número de Identificación Fiscal Alemán",
        severity: "Low",
        reason:
          "Ausencia total de información sobre si el estipendio de 90 días está sujeto a retención fiscal alemana o exige registro municipal obligatorio (Anmeldung).",
        suggestedQuestion:
          "¿Exige la institución anfitriona el registro de empadronamiento (Anmeldung) y un número fiscal para desembolsar los estipendios?",
      },
    ],
    contradictions: [
      {
        aspect: "Monto de la Asignación Mensual (Estipendio)",
        claimA:
          "Se desembolsa un estipendio mensual de 934 € a los estudiantes becarios para la convocatoria de financiación 2026.",
        sourceAId: "src-1",
        claimB:
          "Los becarios seleccionados reciben una asignación mensual de 861 € más una suma global fija para viajes.",
        sourceBId: "src-2",
        divergenceReason:
          "La Fuente 2 es un artículo externo desactualizado de 2023 con tarifas previas a la inflación (861 €), mientras que la Fuente 1 es la circular oficial del DAAD 2026 que fija 934 €/mes.",
      },
      {
        aspect: "Requisito de Calificación Académica Mínima (CGPA)",
        claimA:
          "Los solicitantes deben poseer un promedio acumulado de al menos 8.0/10.0 o equivalente a la fecha límite.",
        sourceAId: "src-1",
        claimB:
          "El corte estricto de elegibilidad mínima es un CGPA de 8.5 en instituciones de primer nivel reconocidas.",
        sourceBId: "src-3",
        divergenceReason:
          "La Fuente 3 reporta un umbral de preselección interna no oficial de algunos institutos asociados, mientras que la directriz oficial del DAAD exige 8.0 CGPA.",
      },
      {
        aspect: "Fecha Límite de Envío en el Portal de Solicitudes",
        claimA:
          "La fecha límite de postulación es estrictamente el 01.11.2025 a las 23:59 CET para la convocatoria de verano 2026.",
        sourceAId: "src-1",
        claimB:
          "La fecha límite para presentar los expedientes de solicitud completos es el 15 de noviembre de cada año.",
        sourceBId: "src-2",
        divergenceReason:
          "La Fuente 2 hace referencia a una fecha caducada de 2023. El cierre oficial del ciclo 2026 se adelantó al 1 de noviembre.",
      },
    ],
    temporalWarnings: [
      {
        sourceId: "src-2",
        warning:
          "La Fuente 2 es una entrada de blog obsoleta de 2023. Contiene tarifas de estipendio caducadas (861 €) e información errónea de fecha límite del 15 de noviembre.",
      },
      {
        sourceId: "src-3",
        warning:
          "La Fuente 3 contiene agregaciones secundarias sin fecha con umbrales de promedio contradictorios y sin marca temporal de publicación.",
      },
    ],
    verificationChecklist: [
      {
        priority: 1,
        task: "Solicitar confirmación oficial por escrito a la oficina de atención del DAAD sobre las normas de complementos salariales en laboratorios.",
        targetEntity: "Mesa de Ayuda Regional DAAD (info@daaddelhi.org / wise@daad.de)",
      },
      {
        priority: 2,
        task: "Confirmar con la sección consular de visados si la carta de adjudicación del DAAD exime completamente de la cuenta bloqueada (Sperrkonto).",
        targetEntity: "Embajada de Alemania / Centro VFS de Procesamiento de Visados",
      },
      {
        priority: 3,
        task: "Verificar con el profesor anfitrión que el Formulario 6 (Carta de Aceptación) especifica la tasa de financiación actualizada de 934 €/mes para 2026.",
        targetEntity: "Profesor / Supervisor de Laboratorio de la Universidad Anfitriona",
      },
      {
        priority: 4,
        task: "Obtener el Certificado de Evaluación de Idioma del DAAD (Formulario 7) del departamento de inglés si se exime del examen IELTS.",
        targetEntity: "Decanato de Asuntos Académicos de la Institución de Origen",
      },
    ],
    inquiryDraft: {
      recipientPlaceholder: "Mesa de Ayuda Regional del DAAD y Coordinador de Investigación",
      subject: {
        en: "Formal Clarification: DAAD WISE 2026 Cycle - Concurrent Stipend Policy & Visa Documentation",
        fr: "Demande de clarification officielle : DAAD WISE 2026 - Règles de cumul et justificatifs de visa",
        es: "Aclaración formal: Programa DAAD WISE 2026 - Política de becas concurrentes y requisitos de visa",
        de: "Offizielle Klärungsanfrage: DAAD WISE 2026 - Richtlinien zur Doppelstipendierung & Visumanforderungen",
        hi: "औपचारिक स्पष्टीकरण अनुरोध: DAAD WISE 2026 - समवर्ती अनुसंधान वजीफा एवं वीज़ा आवश्यकताएं",
      },
      body: {
        en: `Dear DAAD WISE Selection Committee,\n\nI am preparing an application for the DAAD WISE Research Internship 2026...\n\nSincerely,\n[Applicant Name]`,
        es: `Estimado Comité de Selección DAAD WISE,\n\nMe dirijo a ustedes para solicitar aclaración formal sobre puntos críticos de la convocatoria DAAD WISE 2026:\n\n1. COMPATIBILIDAD DE FONDOS: ¿Está permitido percibir estipendios adicionales del laboratorio anfitrión alemán sin perder la beca DAAD?\n2. EXENCIÓN DE CUENTA BLOQUEADA: ¿La carta de adjudicación de beca DAAD exime del requisito de Sperrkonto para el visado nacional?\n3. MONTO OFICIAL: Confirmen que el estipendio mensual oficial para 2026 es de 934 €.\n\nAgradezco de antemano su atención.\n\nAtentamente,\n[Nombre del postulante]`,
        fr: `Madame, Monsieur,\n\n...`,
        de: `Sehr geehrte Damen und Herren,\n\n...`,
        hi: `आदरणीय चयन समिति,\n\n...`,
      },
    },
    documentPrerequisites: [
      {
        document: "Garantía Financiera y Cuenta Bloqueada (Sperrkonto)",
        status: "Missing Requirement",
        riskLevel: "High",
        details:
          "Las fuentes mencionan requisitos de fondos, pero omiten si se exige una antigüedad bancaria de 28 a 90 días o una cuenta bloqueada (Sperrkonto), o si la carta del DAAD la exime.",
        actionRequired:
          "Confirmar con la sección de visados si el certificado oficial del DAAD exime del requisito de cuenta bloqueada.",
      },
      {
        document: "Autenticación de Certificado de Notas o Título Provisional",
        status: "Conflicting Rule",
        riskLevel: "High",
        details:
          "Discrepancia entre la aceptación de certificados de notas institucionales y la exigencia de apostilla consular obligatoria.",
        actionRequired:
          "Consultar si las notas con firma electrónica institucional son válidas sin apostilla consular física.",
      },
      {
        document: "Formulario de Aceptación del Profesor Anfitrión (Formulario 6)",
        status: "Clear",
        riskLevel: "Low",
        details:
          "Requisito unánime y claro en todas las fuentes: el Formulario 6 firmado por el profesor anfitrión alemán es obligatorio.",
        actionRequired: "Asegurarse de que el supervisor anfitrión firme el formulario con las fechas exactas de 2026.",
      },
      {
        document: "Evaluación de Competencia en Idioma Inglés (Formulario 7)",
        status: "Missing Requirement",
        riskLevel: "Medium",
        details:
          "Ninguna fuente confirma si una constancia de enseñanza en inglés sustituye el certificado formal de IELTS/TOEFL.",
        actionRequired:
          "Solicitar el certificado departamental de idiomas de la universidad de origen.",
      },
    ],
  },
  fr: {
    topic: "Stages de recherche DAAD WISE en sciences et ingénierie 2026 (Allemagne)",
    analyzedSources: [
      {
        id: "src-1",
        title: "Portail Officiel DAAD - Directives du Programme WISE 2026",
        url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
        detectedDate: "2025-10-15",
        isOutdated: false,
      },
      {
        id: "src-2",
        title: "Blog EduGermany - Guide Étudiant de Candidature DAAD WISE",
        url: "https://www.study-in-germany.de/en/",
        detectedDate: "2023-08-20",
        isOutdated: true,
      },
      {
        id: "src-3",
        title: "GlobalScholarships.org - Répertoire des Bourses STEM en Allemagne",
        url: "https://www.research-in-germany.org/en/",
        detectedDate: "2024-11-02",
        isOutdated: true,
      },
    ],
    verifiedFacts: [
      {
        fact: "Réservé exclusivement aux étudiants de premier cycle en ingénierie et sciences en 5e ou 6e semestre d'études.",
        sourceIds: ["src-1", "src-2", "src-3"],
      },
      {
        fact: "La durée du financement est strictement de 2 à 3 mois, effectuée entre mai et août.",
        sourceIds: ["src-1", "src-2", "src-3"],
      },
      {
        fact: "Accorde une indemnité forfaitaire de voyage international ainsi qu'une couverture maladie et accident obligatoire.",
        sourceIds: ["src-1", "src-2"],
      },
      {
        fact: "L'institution d'accueil doit être une université publique allemande reconnue ou un institut de recherche (Max Planck, Helmholtz, Fraunhofer).",
        sourceIds: ["src-1", "src-3"],
      },
    ],
    detectedGaps: [
      {
        facet: "Politique de Financement Cumulé et Complément de Laboratoire d'Accueil",
        severity: "High",
        reason:
          "Aucune des sources examinées n'indique si un stagiaire peut cumuler une bourse de son établissement d'origine ou une rémunération d'assistant (HiWi) auprès du laboratoire allemand sans perdre sa bourse DAAD.",
        suggestedQuestion:
          "Le DAAD autorise-t-il les bourses partielles concurrentes ou les indemnités de laboratoire du professeur allemand, ou le DAAD est-il une source de financement strictement exclusive ?",
      },
      {
        facet: "Rapatriement Obligatoire et Transition de Visa Post-Stage",
        severity: "High",
        reason:
          "Les sources omettent d'indiquer si l'acceptation de la bourse WISE oblige contractuellement le lauréat à retourner immédiatement dans son pays d'origine, ou s'il peut enchaîner directement sur un Master en Allemagne.",
        suggestedQuestion:
          "Existe-t-il une obligation de résidence dans le pays d'origine avant de pouvoir postuler à une autre catégorie de visa allemand ?",
      },
      {
        facet: "Assurance Maladie : Affiliation Directe vs Avance de Frais",
        severity: "Medium",
        reason:
          "Bien que l'assurance soit citée comme 'couverte', aucune source ne précise si le DAAD affilie directement les lauréats à l'assurance publique (TK/AOK) ou exige une assurance privée avec avance de frais.",
        suggestedQuestion:
          "L'assurance santé, accident et responsabilité civile est-elle directement fournie via le contrat de groupe DAAD, ou les étudiants doivent-ils payer d'avance et demander un remboursement ?",
      },
      {
        facet: "Résidence Fiscale et Numéro d'Identification Fiscal Allemand",
        severity: "Low",
        reason:
          "Absence totale d'information sur l'assujettissement de l'indemnité à l'impôt à la source allemand ou l'obligation d'enregistrement en mairie (Anmeldung).",
        suggestedQuestion:
          "L'établissement d'accueil exige-t-il l'enregistrement municipal (Anmeldung) et un numéro fiscal pour verser les indemnités ?",
      },
    ],
    contradictions: [
      {
        aspect: "Montant de l'Indemnité Mensuelle (Bourse de Vie)",
        claimA:
          "Une allocation mensuelle de 934 € est versée aux étudiants boursiers pour la période de financement 2026.",
        sourceAId: "src-1",
        claimB:
          "Les lauréats sélectionnés reçoivent une allocation mensuelle de 861 € plus un forfait de transport.",
        sourceBId: "src-2",
        divergenceReason:
          "La Source 2 est un article tiers obsolète de 2023 reflétant les anciens tarifs (€861), tandis que la Source 1 est la circulaire officielle DAAD 2026 indiquant 934 €/mois.",
      },
      {
        aspect: "Exigence Minimale de Moyenne Académique (CGPA)",
        claimA:
          "Les candidats doivent justifier d'une moyenne générale d'au moins 8,0/10,0 ou équivalent à la date limite.",
        sourceAId: "src-1",
        claimB:
          "Le seuil strict d'éligibilité minimale est un CGPA de 8,5 provenant d'établissements de premier rang.",
        sourceBId: "src-3",
        divergenceReason:
          "La Source 3 rapporte un seuil officieux de présélection interne de certains instituts partenaires, alors que le règlement officiel DAAD exige 8,0.",
      },
      {
        aspect: "Date Limite de Soumission sur le Portail",
        claimA:
          "La date limite de candidature est fixée au 01.11.2025 à 23h59 CET pour la session été 2026.",
        sourceAId: "src-1",
        claimB:
          "La date limite de dépôt des dossiers complets est le 15 novembre chaque année.",
        sourceBId: "src-2",
        divergenceReason:
          "La Source 2 cite une date limite obsolète de 2023. La clôture officielle du cycle 2026 a été avancée au 1er novembre.",
      },
    ],
    temporalWarnings: [
      {
        sourceId: "src-2",
        warning:
          "La Source 2 est un article de blog daté de 2023. Il mentionne des taux d'indemnité obsolètes (861 €) et une fausse date limite au 15 novembre.",
      },
      {
        sourceId: "src-3",
        warning:
          "La Source 3 contient des agrégations secondaires non datées avec des seuils contradictoires de moyenne sans horodatage officiel.",
      },
    ],
    verificationChecklist: [
      {
        priority: 1,
        task: "Demander une confirmation écrite officielle au bureau d'aide du DAAD concernant les règles de cumul avec des indemnités de laboratoire.",
        targetEntity: "Bureau Régional DAAD (info@daaddelhi.org / wise@daad.de)",
      },
      {
        priority: 2,
        task: "Confirmer auprès du service consulaire des visas si l'attestation de bourse DAAD dispense intégralement de l'obligation de compte bloqué (Sperrkonto).",
        targetEntity: "Ambassade d'Allemagne / Centre de Traitement des Visas VFS",
      },
      {
        priority: 3,
        task: "Vérifier avec le professeur d'accueil que le Formulaire 6 (Lettre d'Acceptation) indique le taux de financement réactualisé de 934 €/mois pour 2026.",
        targetEntity: "Professeur de l'Université Allemande d'Accueil / Superviseur",
      },
      {
        priority: 4,
        task: "Obtenir le Certificat d'Évaluation Linguistique DAAD (Formulaire 7) auprès de la faculté d'anglais de l'université d'origine.",
        targetEntity: "Doyen des Affaires Académiques de l'Établissement d'Origine",
      },
    ],
    inquiryDraft: {
      recipientPlaceholder: "Centre d'Assistance DAAD et Coordinateur de Recherche",
      subject: {
        en: "Formal Clarification: DAAD WISE 2026 Cycle - Concurrent Stipend Policy & Visa Documentation",
        fr: "Demande de clarification officielle : DAAD WISE 2026 - Règles de cumul et justificatifs de visa",
        es: "Aclaración formal: Programa DAAD WISE 2026 - Política de becas concurrentes y requisitos de visa",
        de: "Offizielle Klärungsanfrage: DAAD WISE 2026 - Richtlinien zur Doppelstipendierung & Visumanforderungen",
        hi: "औपचारिक स्पष्टीकरण अनुरोध: DAAD WISE 2026 - समवर्ती अनुसंधान वजीफा एवं वीज़ा आवश्यकताएं",
      },
      body: {
        en: `Dear DAAD WISE Selection Committee,\n\n...`,
        fr: `Madame, Monsieur les coordinateurs du programme DAAD WISE,\n\nJe prépare actuellement mon dossier de candidature pour le stage de recherche DAAD WISE 2026. Après analyse comparative des documents disponibles, certains points essentiels restent indéterminés :\n\n1. CUMUL DE FINANCEMENT : Un boursier peut-il recevoir une indemnité complémentaire du laboratoire d'accueil sans enfreindre les règlements du DAAD ?\n\n2. EXEMPTION DE COMPTE BLOQUÉ : L'attestation de bourse dispense-t-elle de l'obligation de compte bloqué pour le visa ?\n\n3. MONTANT DE L'ALLOCATION : Veuillez confirmer que le montant mensuel en vigueur pour 2026 est de 934 €.\n\nCordialement,\n[Nom du candidat]`,
        es: `Estimado Comité,\n\n...`,
        de: `Sehr geehrte Damen und Herren,\n\n...`,
        hi: `आदरणीय,\n\n...`,
      },
    },
    documentPrerequisites: [
      {
        document: "Garantie Financière et Compte Bloqué (Sperrkonto)",
        status: "Missing Requirement",
        riskLevel: "High",
        details:
          "Les sources mentionnent une justification de ressources mais omettent si une ancienneté bancaire de 90 jours ou un compte bloqué est exigé ou dispensé par la bourse.",
        actionRequired:
          "Vérifier auprès du service des visas si l'attestation DAAD dispense du compte bloqué.",
      },
      {
        document: "Relevé de Notes ou Diplôme Provisoire",
        status: "Conflicting Rule",
        riskLevel: "High",
        details:
          "Divergence entre l'acceptation de relevés de notes universitaires et l'obligation d'apostille consulaire.",
        actionRequired:
          "Vérifier si les relevés avec signature électronique institutionnelle sont acceptés sans apostille physique.",
      },
      {
        document: "Formulaire d'Acceptation du Professeur d'Accueil (Formulaire 6)",
        status: "Clear",
        riskLevel: "Low",
        details:
          "Exigence unanime et claire : le Formulaire 6 officiel signé par le superviseur d'accueil est obligatoire.",
        actionRequired: "S'assurer que le superviseur signe le Formulaire 6 avec les dates 2026.",
      },
      {
        document: "Évaluation du Niveau d'Anglais (Formulaire 7)",
        status: "Missing Requirement",
        riskLevel: "Medium",
        details:
          "Aucune source n'indique si une attestation d'enseignement en anglais dispense de l'examen officiel IELTS/TOEFL.",
        actionRequired:
          "Faire signer le Formulaire 7 DAAD par le département d'anglais de l'université.",
      },
    ],
  },
  de: {
    topic: "DAAD WISE Forschungspraktika in Natur- und Ingenieurwissenschaften 2026 (Deutschland)",
    analyzedSources: [
      {
        id: "src-1",
        title: "Offizielles DAAD-Portal - WISE Programmrichtlinien 2026",
        url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
        detectedDate: "2025-10-15",
        isOutdated: false,
      },
      {
        id: "src-2",
        title: "EduGermany Blog - Leitfaden zur DAAD WISE Bewerbung",
        url: "https://www.study-in-germany.de/en/",
        detectedDate: "2023-08-20",
        isOutdated: true,
      },
      {
        id: "src-3",
        title: "GlobalScholarships.org - MINT-Praktikumsstipendien-Index Deutschland",
        url: "https://www.research-in-germany.org/en/",
        detectedDate: "2024-11-02",
        isOutdated: true,
      },
    ],
    verifiedFacts: [
      {
        fact: "Ausschließlich für Bachelor-Studierende der Ingenieur- und Naturwissenschaften im 5. oder 6. Fachsemester offen.",
        sourceIds: ["src-1", "src-2", "src-3"],
      },
      {
        fact: "Die Förderdauer beträgt strikt 2 bis 3 Monate im Zeitraum zwischen Mai und August.",
        sourceIds: ["src-1", "src-2", "src-3"],
      },
      {
        fact: "Beinhaltet eine internationale Reisekostenpauschale sowie obligatorischen Kranken- und Unfallversicherungsschutz.",
        sourceIds: ["src-1", "src-2"],
      },
      {
        fact: "Die Gasteinrichtung muss eine anerkannte deutsche staatliche Hochschule oder ein Forschungsinstitut (Max Planck, Helmholtz, Fraunhofer) sein.",
        sourceIds: ["src-1", "src-3"],
      },
    ],
    detectedGaps: [
      {
        facet: "Regelung zur Doppelstipendierung & Aufstockung durch das Gastlabor",
        severity: "High",
        reason:
          "Keine der geprüften Quellen gibt an, ob Stipendiaten gleichzeitig ein Stipendium der Heimathochschule oder eine Aufstockung durch das deutsche Gastlabor (z. B. HiWi-Vertrag) erhalten dürfen, ohne das DAAD-Stipendium zu verlieren.",
        suggestedQuestion:
          "Erlaubt der DAAD eine teilweise Doppelstipendierung oder Aufstockung durch den deutschen Professor, oder ist der DAAD die strikt exklusive Förderquelle?",
      },
      {
        facet: "Rückkehrverpflichtung & Visumübergang nach Praktikumsende",
        severity: "High",
        reason:
          "Die Quellen lassen offen, ob die Annahme des WISE-Stipendiums vertraglich zur sofortigen Rückkehr ins Heimatland verpflichtet oder ein direkter Übergang in ein Masterstudium in Deutschland erlaubt ist.",
        suggestedQuestion:
          "Bestehen verbindliche Rückkehr- und Residenzauflagen im Heimatland, bevor eine andere deutsche Visakategorie beantragt werden kann?",
      },
      {
        facet: "Krankenversicherungsanbieter & Kostenerstattung vs. Direktabrechnung",
        severity: "Medium",
        reason:
          "Obwohl Versicherungsschutz erwähnt wird, klärt keine Quelle, ob der DAAD Stipendiaten direkt in der gesetzlichen Kasse (TK/AOK) anmeldet oder eine private Reiseversicherung mit Vorleistung verlangt.",
        suggestedQuestion:
          "Wird die Kranken-, Unfall- und Haftpflichtversicherung direkt über den DAAD-Gruppenvertrag bereitgestellt, oder müssen Stipendiaten in Vorleistung treten?",
      },
      {
        facet: "Steuerlicher Wohnsitz & Deutsche Steueridentifikationsnummer",
        severity: "Low",
        reason:
          "Fehlende Angaben darüber, ob das Praktikumsstipendium der deutschen Quellensteuer unterliegt oder eine polizeiliche Anmeldung (Wohnsitzmeldung) erforderlich ist.",
        suggestedQuestion:
          "Benötigt die Gasteinrichtung eine polizeiliche Anmeldung (Anmeldung) und eine Steuer-ID für die Auszahlung der Bezüge?",
      },
    ],
    contradictions: [
      {
        aspect: "Monatlicher Lebenshaltungskostenzuschuss (Stipendienhöhe)",
        claimA:
          "Für den Förderzeitraum 2026 wird an Bachelor-Stipendiaten eine monatliche Rate von 934 € ausgezahlt.",
        sourceAId: "src-1",
        claimB:
          "Ausgewählte Stipendiaten erhalten eine monatliche Pauschale von 861 € zuzüglich einer festen Reisepauschale.",
        sourceBId: "src-2",
        divergenceReason:
          "Quelle 2 ist ein veralteter Drittanbieter-Beitrag von 2023 mit alten Sätzen (861 €), während Quelle 1 das offizielle DAAD-Rundschreiben 2026 mit 934 €/Monat ist.",
      },
      {
        aspect: "Erforderlicher Mindestnotendurchschnitt (CGPA)",
        claimA:
          "Bewerber müssen zum Bewerbungsschluss einen Notenschnitt von mindestens 8,0/10,0 oder ein Äquivalent nachweisen.",
        sourceAId: "src-1",
        claimB:
          "Die strikte Mindestvoraussetzung ist ein CGPA von 8,5 an anerkannten Spitzeninstituten.",
        sourceBId: "src-3",
        divergenceReason:
          "Quelle 3 nennt einen inoffiziellen internen Vorselektionswert einzelner Partnerinstitute, während die offizielle DAAD-Richtlinie 8,0 CGPA vorschreibt.",
      },
      {
        aspect: "Bewerbungsschluss im Einreichungsportal",
        claimA:
          "Bewerbungsschluss ist strikt der 01.11.2025 um 23:59 Uhr MEZ für den Sommerjahrgang 2026.",
        sourceAId: "src-1",
        claimB:
          "Die Frist zur Einreichung vollständiger Bewerbungsunterlagen ist jährlich der 15. November.",
        sourceBId: "src-2",
        divergenceReason:
          "Quelle 2 bezieht sich auf eine veraltete Frist von 2023. Für den Zyklus 2026 wurde der Stichtag auf den 1. November vorverlegt.",
      },
    ],
    temporalWarnings: [
      {
        sourceId: "src-2",
        warning:
          "Quelle 2 ist ein älterer Blogeintrag aus dem Jahr 2023. Er enthält überholte Stipendiensätze (861 €) und die veraltete Frist zum 15. November.",
      },
      {
        sourceId: "src-3",
        warning:
          "Quelle 3 enthält undatierte Sekundärdaten mit abweichenden Notenvoraussetzungen ohne Publikationszeitstempel.",
      },
    ],
    verificationChecklist: [
      {
        priority: 1,
        task: "Verbindliche schriftliche Auskunft beim DAAD zur Zulässigkeit von Labor-Aufstockungsbeträgen anfordern.",
        targetEntity: "DAAD-Regionalbüro (info@daaddelhi.org / wise@daad.de)",
      },
      {
        priority: 2,
        task: "Mit der Visastelle abklären, ob die DAAD-Zusage vollständig von der Sperrkonto-Pflicht befreit.",
        targetEntity: "Deutsche Botschaft / VFS Visazentrum",
      },
      {
        priority: 3,
        task: "Mit dem betreuenden Professor prüfen, ob Formblatt 6 den aktuellen Satz von 934 €/Monat für 2026 aufführt.",
        targetEntity: "Gastprofessor / Laborleiter der deutschen Hochschule",
      },
      {
        priority: 4,
        task: "DAAD-Sprachzeugnis (Formblatt 7) bei der Heimatuniversität einholen, falls kein offizieller IELTS vorliegt.",
        targetEntity: "Studiendekan der Heimatuniversität",
      },
    ],
    inquiryDraft: {
      recipientPlaceholder: "DAAD-Auswahlkomitee & Forschungskoordination",
      subject: {
        en: "Formal Clarification: DAAD WISE 2026 Cycle - Concurrent Stipend Policy & Visa Documentation",
        fr: "Demande de clarification officielle : DAAD WISE 2026 - Règles de cumul et justificatifs de visa",
        es: "Aclaración formal: Programa DAAD WISE 2026 - Política de becas concurrentes y requisitos de visa",
        de: "Offizielle Klärungsanfrage: DAAD WISE 2026 - Richtlinien zur Doppelstipendierung & Visumanforderungen",
        hi: "औपचारिक स्पष्टीकरण अनुरोध: DAAD WISE 2026 - समवर्ती अनुसंधान वजीफा एवं वीज़ा आवश्यकताएं",
      },
      body: {
        en: `Dear DAAD WISE Selection Committee,\n\n...`,
        de: `Sehr geehrte Damen und Herren des DAAD-Auswahlkomitees,\n\nim Rahmen meiner Bewerbung für das DAAD WISE-Forschungspraktikum 2026 bitte ich um verbindliche Auskunft zu folgenden Punkten:\n\n1. DOPPELSTIPENDIERUNG: Ist eine zusätzliche Vergütung durch das Gastinstitut zulässig?\n2. SPERRKONTO-BEFREIUNG: Reicht die offizielle DAAD-Stipendienzusage als vollständiger Finanzierungsnachweis für das Visum aus?\n3. STIPENDIENHÖHE: Bestätigen Sie bitte die Stipendienrate von 934 €/Monat für 2026.\n\nMit freundlichen Grüßen,\n[Name des Bewerbers]`,
        fr: `...`,
        es: `...`,
        hi: `...`,
      },
    },
    documentPrerequisites: [
      {
        document: "Finanzierungsnachweis & Sperrkonto",
        status: "Missing Requirement",
        riskLevel: "High",
        details:
          "Die Quellen fordern einen Nachweis ausreichender Mittel, lassen aber offen, ob ein deutsches Sperrkonto mit 90-tägiger Haltedauer nötig ist oder durch das Stipendium entfällt.",
        actionRequired:
          "Bei der Visastelle klären, ob die DAAD-Finanzierungsbestätigung das Sperrkonto ersetzt.",
      },
      {
        document: "Notenspiegel & Beglaubigung",
        status: "Conflicting Rule",
        riskLevel: "High",
        details:
          "Widerspruch zwischen der Akzeptanz digitaler Semesterzeugnisse und der Forderung nach konsularischen Apostillen.",
        actionRequired:
          "Prüfen, ob digital signierte Hochschulnotenspiegel ohne physische Apostille anerkannt werden.",
      },
      {
        document: "Betreuungszusage des Gastprofessors (Formblatt 6)",
        status: "Clear",
        riskLevel: "Low",
        details:
          "Einstimmig und klar: Das unterzeichnete Formblatt 6 mit Projektbeschreibung ist zwingend erforderlich.",
        actionRequired: "Sicherstellen, dass der Betreuer Formblatt 6 für 2026 unterzeichnet.",
      },
      {
        document: "Sprachnachweis Englisch (DAAD-Formblatt 7)",
        status: "Missing Requirement",
        riskLevel: "Medium",
        details:
          "Unklar, ob eine englische Unterrichtssprachenbestätigung (Medium of Instruction) das IELTS/TOEFL-Zertifikat ersetzt.",
        actionRequired:
          "Formblatt 7 durch das Fremdsprachenzentrum der Heimatuniversität ausstellen lassen.",
      },
    ],
  },
  hi: {
    topic: "DAAD WISE विज्ञान एवं इंजीनियरिंग अनुसंधान इंटर्नशिप 2026 (जर्मनी)",
    analyzedSources: [
      {
        id: "src-1",
        title: "DAAD आधिकारिक पोर्टल - WISE कार्यक्रम दिशानिर्देश 2026",
        url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
        detectedDate: "2025-10-15",
        isOutdated: false,
      },
      {
        id: "src-2",
        title: "EduGermany ब्लॉग - DAAD WISE आवेदन छात्र गाइड",
        url: "https://www.study-in-germany.de/en/",
        detectedDate: "2023-08-20",
        isOutdated: true,
      },
      {
        id: "src-3",
        title: "GlobalScholarships.org - जर्मन STEM इंटर्नशिप वजीफा सूचकांक",
        url: "https://www.research-in-germany.org/en/",
        detectedDate: "2024-11-02",
        isOutdated: true,
      },
    ],
    verifiedFacts: [
      {
        fact: "केवल 5वें या 6वें सेमेस्टर के इंजीनियरिंग और विज्ञान के स्नातक छात्रों के लिए खुला है।",
        sourceIds: ["src-1", "src-2", "src-3"],
      },
      {
        fact: "अनुदान की अवधि मई और अगस्त के बीच अनिवार्य रूप से 2 से 3 महीने है।",
        sourceIds: ["src-1", "src-2", "src-3"],
      },
      {
        fact: "अंतर्राष्ट्रीय यात्रा एकमुश्त सब्सिडी के साथ अनिवार्य स्वास्थ्य और दुर्घटना बीमा कवरेज प्रदान करता है।",
        sourceIds: ["src-1", "src-2"],
      },
      {
        fact: "मेजबान संस्थान एक मान्यता प्राप्त जर्मन सार्वजनिक विश्वविद्यालय या शोध संस्थान (मैक्स प्लैंक, हेल्महोल्ट्ज़, फ्रौनहोफर) होना चाहिए।",
        sourceIds: ["src-1", "src-3"],
      },
    ],
    detectedGaps: [
      {
        facet: "समवर्ती अनुदान एवं मेजबान प्रयोगशाला अतिरिक्त वजीफा नीति",
        severity: "High",
        reason:
          "समीक्षित स्रोतों में से कोई भी यह स्पष्ट नहीं करता है कि क्या एक प्रशिक्षु अपनी DAAD छात्रवृत्ति खोए बिना अपने गृह संस्थान या मेजबान जर्मन प्रयोगशाला से अतिरिक्त मानदेय (जैसे HiWi अनुबंध) प्राप्त कर सकता है।",
        suggestedQuestion:
          "क्या DAAD मेजबान जर्मन प्रोफेसर से अतिरिक्त वजीफे की अनुमति देता है, या DAAD ही एकमात्र विशेष वित्तपोषण स्रोत है?",
      },
      {
        facet: "अनिवार्य स्वदेश वापसी एवं इंटर्नशिप उपरांत वीज़ा परिवर्तन",
        severity: "High",
        reason:
          "स्रोतों में यह नहीं बताया गया है कि क्या WISE छात्रवृत्ति प्राप्तकर्ता को इंटर्नशिप समाप्त होते ही तुरंत स्वदेश लौटने के लिए बाध्य करती है, या क्या वे जर्मनी में मास्टर डिग्री में सीधे प्रवेश ले सकते हैं।",
        suggestedQuestion:
          "क्या छात्र द्वारा अन्य जर्मन वीज़ा श्रेणी हेतु आवेदन करने से पहले गृह देश में अनिवार्य निवास की कोई शर्त है?",
      },
      {
        facet: "स्वास्थ्य बीमा प्रदाता एवं प्रतिपूर्ति बनाम अग्रिम भुगतान",
        severity: "Medium",
        reason:
          "यद्यपि स्वास्थ्य बीमा को 'कवर' बताया गया है, लेकिन कोई भी स्रोत यह स्पष्ट नहीं करता कि क्या DAAD छात्रों को सीधे सार्वजनिक बीमा में नामांकित करता है या निजी यात्रा बीमा के तहत स्वयं भुगतान की आवश्यकता होती है।",
        suggestedQuestion:
          "क्या स्वास्थ्य और दुर्घटना बीमा सीधे DAAD समूह अनुबंध के माध्यम से प्रदान किया जाता है, या छात्रों को अग्रिम भुगतान करके प्रतिपूर्ति का दावा करना होगा?",
      },
      {
        facet: "कर निवास एवं जर्मन कर पहचान संख्या (Steuer-ID)",
        severity: "Low",
        reason:
          "इस बारे में जानकारी का पूर्ण अभाव है कि क्या 90 दिनों का वजीफा जर्मन कर के अधीन है या इसके लिए स्थानीय नगर पंजीकरण (Anmeldung) अनिवार्य है।",
        suggestedQuestion:
          "क्या मेजबान संस्थान को वजीफा वितरित करने के लिए नगर पंजीकरण (Anmeldung) और कर आईडी की आवश्यकता होती है?",
      },
    ],
    contradictions: [
      {
        aspect: "मासिक जीवन निर्वाह भत्ता (वजीफे की राशि)",
        claimA:
          "2026 के वित्तपोषण सत्र के लिए स्नातक छात्रों को प्रति माह €934 की छात्रवृत्ति किस्त दी जाती है।",
        sourceAId: "src-1",
        claimB:
          "चयनित छात्रों को €861 का मासिक भत्ता और एक निश्चित यात्रा एकमुश्त राशि प्राप्त होती है।",
        sourceBId: "src-2",
        divergenceReason:
          "स्रोत 2 वर्ष 2023 का एक पुराना पोस्ट है जो मुद्रास्फीति-पूर्व दरों (€861) को दर्शाता है, जबकि स्रोत 1 आधिकारिक 2026 DAAD परिपत्र है जिसमें €934/माह तय है।",
      },
      {
        aspect: "न्यूनतम शैक्षणिक ग्रेड (CGPA) आवश्यकता",
        claimA:
          "आवेदकों के पास आवेदन की अंतिम तिथि पर कम से कम 8.0/10.0 या समकक्ष संचयी ग्रेड (CGPA) होना अनिवार्य है।",
        sourceAId: "src-1",
        claimB:
          "मान्यता प्राप्त शीर्ष संस्थानों से 8.5 CGPA का सख्त न्यूनतम पात्रता कटऑफ है।",
        sourceBId: "src-3",
        divergenceReason:
          "स्रोत 3 कुछ साथी संस्थानों से एक अनौपचारिक आंतरिक पूर्व-जांच सीमा की रिपोर्ट करता है, जबकि आधिकारिक DAAD दिशानिर्देश 8.0 CGPA अनिवार्य करता है।",
      },
      {
        aspect: "आवेदन पोर्टल पर जमा करने की अंतिम तिथि",
        claimA:
          "ग्रीष्मकालीन 2026 सत्र हेतु आवेदन की अंतिम तिथि अनिवार्य रूप से 01.11.2025 (23:59 CET) है।",
        sourceAId: "src-1",
        claimB:
          "पूर्ण आवेदन पत्र जमा करने की अंतिम तिथि प्रतिवर्ष 15 नवंबर है।",
        sourceBId: "src-2",
        divergenceReason:
          "स्रोत 2 वर्ष 2023 की अप्रचलित अंतिम तिथि का उल्लेख करता है। आधिकारिक 2026 चक्र की समय सीमा 1 नवंबर कर दी गई है।",
      },
    ],
    temporalWarnings: [
      {
        sourceId: "src-2",
        warning:
          "स्रोत 2 वर्ष 2023 का अप्रचलित ब्लॉग है जिसमें पुरानी दरें (€861) और 15 नवंबर की गलत समय सीमा दी गई है।",
      },
      {
        sourceId: "src-3",
        warning:
          "स्रोत 3 में बिना प्रकाशन तिथि के माध्यमिक आंकड़े और परस्पर विरोधी सीजीपीए शर्तें शामिल हैं।",
      },
    ],
    verificationChecklist: [
      {
        priority: 1,
        task: "प्रयोगशाला अतिरिक्त भत्ते के संबंध में DAAD नई दिल्ली / बॉन हेल्पडेस्क से आधिकारिक लिखित पुष्टि मांगें।",
        targetEntity: "DAAD क्षेत्रीय हेल्पडेस्क (info@daaddelhi.org / wise@daad.de)",
      },
      {
        priority: 2,
        task: "जर्मन वीज़ा अनुभाग से पुष्टि करें कि क्या DAAD पत्र छात्र को ब्लॉक खाते (Sperrkonto) से पूरी छूट देता है।",
        targetEntity: "जर्मन दूतावास / VFS वीज़ा प्रसंस्करण केंद्र",
      },
      {
        priority: 3,
        task: "मेजबान प्रोफेसर से सत्यापित करें कि फॉर्म 6 (स्वीकृति पत्र) में 2026 के लिए €934/माह की संशोधित दर दर्ज है।",
        targetEntity: "जर्मन मेजबान विश्वविद्यालय प्रोफेसर / प्रयोगशाला पर्यवेक्षक",
      },
      {
        priority: 4,
        task: "यदि औपचारिक IELTS नहीं है तो गृह विश्वविद्यालय के अंग्रेजी विभाग से DAAD भाषा मूल्यांकन प्रमाणपत्र (फॉर्म 7) प्राप्त करें।",
        targetEntity: "गृह संस्थान के शैक्षणिक मामलों के डीन",
      },
    ],
    inquiryDraft: {
      recipientPlaceholder: "DAAD क्षेत्रीय हेल्पडेस्क एवं अनुसंधान समन्वयक",
      subject: {
        en: "Formal Clarification: DAAD WISE 2026 Cycle - Concurrent Stipend Policy & Visa Documentation",
        fr: "Demande de clarification officielle : DAAD WISE 2026 - Règles de cumul et justificatifs de visa",
        es: "Aclaración formal: Programa DAAD WISE 2026 - Política de becas concurrentes y requisitos de visa",
        de: "Offizielle Klärungsanfrage: DAAD WISE 2026 - Richtlinien zur Doppelstipendierung & Visumanforderungen",
        hi: "औपचारिक स्पष्टीकरण अनुरोध: DAAD WISE 2026 - समवर्ती अनुसंधान वजीफा एवं वीज़ा आवश्यकताएं",
      },
      body: {
        en: `Dear DAAD WISE Selection Committee,\n\n...`,
        hi: `आदरणीय चयन समिति, DAAD WISE,\n\nमैं DAAD WISE रिसर्च इंटर्नशिप 2026 के लिए आवेदन तैयार कर रहा हूँ। कृपया निम्नलिखित बिंदुओं पर स्पष्टीकरण प्रदान करें:\n\n1. अतिरिक्त प्रयोगशाला वजीफा: क्या मेजबान जर्मन प्रयोगशाला से अतिरिक्त वजीफा स्वीकार्य है?\n2. वीज़ा ब्लॉक खाता छूट: क्या DAAD छात्रवृत्ति पत्र Sperrkonto की आवश्यकता से पूर्ण छूट देता है?\n3. मासिक भत्ता: कृपया पुष्टि करें कि 2026 सत्र हेतु मासिक वजीफा €934 निर्धारित है।\n\nधन्यवाद,\n[आवेदक का नाम]`,
        fr: `...`,
        es: `...`,
        de: `...`,
      },
    },
    documentPrerequisites: [
      {
        document: "वित्तीय प्रमाण एवं वीज़ा ब्लॉक खाता (Sperrkonto)",
        status: "Missing Requirement",
        riskLevel: "High",
        details:
          "स्रोत धनराशि की आवश्यकता का उल्लेख करते हैं लेकिन यह नहीं बताते कि क्या 90 दिनों की बैंक परिपक्वता आवश्यक है या छात्रवृत्ति पत्र से छूट मिलती है।",
        actionRequired:
          "दूतावास से पुष्टि करें कि क्या DAAD छात्रवृत्ति पत्र Sperrkonto से छूट देता है।",
      },
      {
        document: "अंकतालिका एवं डिग्री सत्यापन",
        status: "Conflicting Rule",
        riskLevel: "High",
        details:
          "विश्वविद्यालय द्वारा जारी डिजिटल सेमेस्टर अंकतालिका और वाणिज्य दूतावास की अनिवार्य अपोस्टिल आवश्यकता के बीच मतभेद।",
        actionRequired:
          "जाँचें कि क्या डिजिटल अंकतालिका बिना भौतिक अपोस्टिल के स्वीकार्य है।",
      },
      {
        document: "मेजबान प्रोफेसर स्वीकृति फॉर्म (फॉर्म 6)",
        status: "Clear",
        riskLevel: "Low",
        details:
          "सभी स्रोतों में स्पष्ट सहमति: मेजबान प्रोफेसर द्वारा हस्ताक्षरित फॉर्म 6 अनिवार्य है।",
        actionRequired: "सुनिश्चित करें कि मेजबान पर्यवेक्षक 2026 की तिथियों के साथ फॉर्म 6 पर हस्ताक्षर करें।",
      },
      {
        document: "अंग्रेजी भाषा प्रवीणता मूल्यांकन (फॉर्म 7)",
        status: "Missing Requirement",
        riskLevel: "Medium",
        details:
          "कोई भी स्रोत यह पुष्टि नहीं करता कि क्या अंग्रेजी माध्यम प्रमाणपत्र औपचारिक IELTS/TOEFL की जगह ले सकता है।",
        actionRequired:
          "गृह विश्वविद्यालय के अंग्रेजी विभाग से DAAD फॉर्म 7 प्रमाणित करवाएं।",
      },
    ],
  },
};

export const DAAD_WISE_DEMO_RESULT = DAAD_WISE_DEMO_RESULTS.en;

export const CAMPUS_FRANCE_DEMO_RESULTS: Record<SupportedUiLang, AuditResult> = {
  en: {
    ...DAAD_WISE_DEMO_RESULTS.en,
    topic: "Campus France Eiffel Excellence Scholarship Program (2026-2027 Cycle)",
    analyzedSources: [
      {
        id: "src-cf1",
        title: "Campus France Official Guidelines - Eiffel Excellence 2026",
        url: "https://www.campusfrance.org/en/",
        detectedDate: "2025-09-20",
        isOutdated: false,
      },
      {
        id: "src-cf2",
        title: "StudyInFrance Unofficial Student Blog",
        url: "https://www.enseignementsup-recherche.gouv.fr/",
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
        fact: "Covers monthly living allowance, return international transport, and French social security enrollment.",
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
          "Eiffel covers living expenses but does NOT cover university tuition fees. Sources fail to explain if public university tuition is automatically waived for recipients.",
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
  es: {
    ...DAAD_WISE_DEMO_RESULTS.es,
    topic: "Programa de Becas de Excelencia Eiffel de Campus France (Convocatoria 2026-2027)",
    analyzedSources: [
      {
        id: "src-cf1",
        title: "Campus France - Directrices Oficiales Beca Eiffel 2026",
        url: "https://www.campusfrance.org/en/",
        detectedDate: "2025-09-20",
        isOutdated: false,
      },
      {
        id: "src-cf2",
        title: "Blog no oficial StudyInFrance - Guía Eiffel",
        url: "https://www.enseignementsup-recherche.gouv.fr/",
        detectedDate: "2023-10-10",
        isOutdated: true,
      },
    ],
    verifiedFacts: [
      {
        fact: "Las postulaciones directas de estudiantes están prohibidas; deben ser presentadas por una universidad francesa acreditada.",
        sourceIds: ["src-cf1", "src-cf2"],
      },
      {
        fact: "Cubre estipendio mensual, transporte internacional de ida y vuelta e inscripción en la seguridad social francesa.",
        sourceIds: ["src-cf1"],
      },
    ],
    detectedGaps: [
      {
        facet: "Plazos de Preselección Interna de Universidades Francesas",
        severity: "High",
        reason:
          "Aunque Campus France fija la fecha límite general en enero, las universidades francesas cierran su preselección interna hasta dos meses antes (noviembre).",
        suggestedQuestion:
          "¿Cuál es la fecha límite departamental exacta para que la universidad francesa elegida evalúe y postule el expediente?",
      },
      {
        facet: "Exención de Tasas de Matrícula Universitaria",
        severity: "Medium",
        reason:
          "La beca Eiffel cubre manutención pero NO cubre la matrícula académica. Las fuentes no aclaran si la matrícula universitaria queda exenta automáticamente.",
        suggestedQuestion:
          "¿La universidad francesa postulante emite una carta formal de exención de matrícula junto con la nominación Eiffel?",
      },
    ],
    contradictions: [
      {
        aspect: "Límite de Edad Máxima para Candidatos de Máster",
        claimA: "Los candidatos a nivel Máster deben tener 25 años o menos durante el ciclo de postulación.",
        sourceAId: "src-cf1",
        claimB: "Los candidatos deben tener como máximo 30 años en el momento de la evaluación.",
        sourceBId: "src-cf2",
        divergenceReason: "La Fuente cf2 cita normas obsoletas anteriores al límite estricto establecido para el ciclo 2026.",
      },
    ],
    temporalWarnings: [
      {
        sourceId: "src-cf2",
        warning: "La Fuente cf2 es de 2023 y contiene límites de edad caducados y montos de estipendio obsoletos.",
      },
    ],
    verificationChecklist: [
      {
        priority: 1,
        task: "Contactar con la Oficina de Relaciones Internacionales de la universidad francesa para solicitar su fecha interna de postulación.",
        targetEntity: "Oficina de Relaciones Internacionales de la Universidad Francesa",
      },
      {
        priority: 2,
        task: "Confirmar el estado de exención de matrícula académica con la secretaría universitaria.",
        targetEntity: "Secretaría General / Admisiones Universitarias",
      },
    ],
  },
  fr: {
    ...DAAD_WISE_DEMO_RESULTS.fr,
    topic: "Programme de Bourses d'Excellence Eiffel Campus France (Session 2026-2027)",
    analyzedSources: [
      {
        id: "src-cf1",
        title: "Campus France - Directives Officielles Bourse Eiffel 2026",
        url: "https://www.campusfrance.org/en/",
        detectedDate: "2025-09-20",
        isOutdated: false,
      },
      {
        id: "src-cf2",
        title: "Blog Étudiant Non Officiel StudyInFrance",
        url: "https://www.enseignementsup-recherche.gouv.fr/",
        detectedDate: "2023-10-10",
        isOutdated: true,
      },
    ],
    verifiedFacts: [
      {
        fact: "Les candidatures directes des étudiants sont irrecevables ; les dossiers doivent être obligatoirement présentés par une université française.",
        sourceIds: ["src-cf1", "src-cf2"],
      },
      {
        fact: "Prend en charge l'allocation mensuelle, le transport international aller-retour et l'affiliation à la sécurité sociale.",
        sourceIds: ["src-cf1"],
      },
    ],
    detectedGaps: [
      {
        facet: "Calendrier Interne de Présélection des Établissements Français",
        severity: "High",
        reason:
          "Alors que Campus France fixe la clôture nationale en janvier, chaque université française clôture ses sélections internes jusqu'à 2 mois plus tôt (novembre).",
        suggestedQuestion:
          "Quelle est la date limite interne exacte du département universitaire pour instruire et déposer le dossier du candidat ?",
      },
      {
        facet: "Prise en Charge des Droits d'Inscription Universitaires",
        severity: "Medium",
        reason:
          "Eiffel prend en charge la vie courante mais ne couvre PAS les frais d'inscription universitaire. Les sources ne précisent pas si l'exonération est acquise.",
        suggestedQuestion:
          "L'établissement d'accueil délivre-t-il une attestation formelle d'exonération des droits d'inscription ?",
      },
    ],
    contradictions: [
      {
        aspect: "Limite d'Âge Maximale pour le Niveau Master",
        claimA: "Les candidats au niveau Master doivent être âgés de 25 ans au plus lors de la session de candidature.",
        sourceAId: "src-cf1",
        claimB: "Les candidats doivent être âgés d'au maximum 30 ans au moment de l'examen du dossier.",
        sourceBId: "src-cf2",
        divergenceReason: "La Source cf2 cite des critères obsolètes antérieurs aux nouvelles limites fixées pour le cycle 2026.",
      },
    ],
    temporalWarnings: [
      {
        sourceId: "src-cf2",
        warning: "La Source cf2 date de 2023 et mentionne des plafonds d'âge et des montants d'allocation périmés.",
      },
    ],
    verificationChecklist: [
      {
        priority: 1,
        task: "Prendre contact avec la Direction des Relations Internationales de l'université pour connaître la date limite interne.",
        targetEntity: "Bureau des Relations Internationales de l'Université",
      },
      {
        priority: 2,
        task: "Vérifier la dispense des frais d'inscription auprès de la scolarité centrale.",
        targetEntity: "Service Scolarité / Admissions de l'Université",
      },
    ],
  },
  de: {
    ...DAAD_WISE_DEMO_RESULTS.de,
    topic: "Campus France Eiffel Exzellenzstipendienprogramm (Zyklus 2026-2027)",
    analyzedSources: [
      {
        id: "src-cf1",
        title: "Campus France Offizielle Richtlinien - Eiffel Exzellenz 2026",
        url: "https://www.campusfrance.org/en/",
        detectedDate: "2025-09-20",
        isOutdated: false,
      },
      {
        id: "src-cf2",
        title: "StudyInFrance Inoffizieller Studierenden-Blog",
        url: "https://www.enseignementsup-recherche.gouv.fr/",
        detectedDate: "2023-10-10",
        isOutdated: true,
      },
    ],
    verifiedFacts: [
      {
        fact: "Direktbewerbungen von Studierenden sind ausgeschlossen; die Einreichung muss über eine französische Hochschule erfolgen.",
        sourceIds: ["src-cf1", "src-cf2"],
      },
      {
        fact: "Deckt monatlichen Lebenshaltungszuschuss, internationale Hin- und Rückreise sowie Sozialversicherung ab.",
        sourceIds: ["src-cf1"],
      },
    ],
    detectedGaps: [
      {
        facet: "Interne Vorselektionsfristen französischer Hochschulen",
        severity: "High",
        reason:
          "Während Campus France eine nationale Frist im Januar setzt, schließen französische Universitäten ihre interne Prüfung bis zu 2 Monate früher ab.",
        suggestedQuestion:
          "Was ist der genaue interne Stichtag des Fachbereichs für die Prüfung und Nominierung der Bewerbungsakte?",
      },
      {
        facet: "Befreiung von Studiengebühren",
        severity: "Medium",
        reason:
          "Das Eiffel-Stipendium deckt Lebenshaltungskosten, aber KEINE Studiengebühren ab. Quellen erwähnen nicht, ob eine Gebührenbefreiung garantiert wird.",
        suggestedQuestion:
          "Stellt die nominierende französische Hochschule ein Befreiungsschreiben für Studiengebühren aus?",
      },
    ],
    contradictions: [
      {
        aspect: "Höchstaltersgrenze für Master-Bewerber",
        claimA: "Kandidaten auf Masterniveau dürfen im Bewerbungszyklus höchstens 25 Jahre alt sein.",
        sourceAId: "src-cf1",
        claimB: "Kandidaten dürfen zum Bewertungszeitpunkt maximal 30 Jahre alt sein.",
        sourceBId: "src-cf2",
        divergenceReason: "Quelle cf2 zitiert ältere Kriterien vor der Einführung strengerer Altersgrenzen für 2026.",
      },
    ],
    temporalWarnings: [
      {
        sourceId: "src-cf2",
        warning: "Quelle cf2 stammt aus dem Jahr 2023 und nennt veraltete Altersgrenzen und alte Förderraten.",
      },
    ],
    verificationChecklist: [
      {
        priority: 1,
        task: "Akademisches Auslandsamt der französischen Hochschule bezüglich interner Vorselektionsfrist kontaktieren.",
        targetEntity: "International Office der französischen Hochschule",
      },
      {
        priority: 2,
        task: "Status der Studiengebührenbefreiung mit dem Immatrikulationsamt klären.",
        targetEntity: "Studierendensekretariat / Zulassungsstelle",
      },
    ],
  },
  hi: {
    ...DAAD_WISE_DEMO_RESULTS.hi,
    topic: "कैंपस फ्रांस एफिल उत्कृष्टता छात्रवृत्ति कार्यक्रम (2026-2027 सत्र)",
    analyzedSources: [
      {
        id: "src-cf1",
        title: "कैंपस फ्रांस आधिकारिक दिशानिर्देश - एफिल 2026",
        url: "https://www.campusfrance.org/en/",
        detectedDate: "2025-09-20",
        isOutdated: false,
      },
      {
        id: "src-cf2",
        title: "StudyInFrance अनौपचारिक छात्र ब्लॉग",
        url: "https://www.enseignementsup-recherche.gouv.fr/",
        detectedDate: "2023-10-10",
        isOutdated: true,
      },
    ],
    verifiedFacts: [
      {
        fact: "छात्रों द्वारा सीधे आवेदन निषिद्ध है; नामांकन किसी मान्यता प्राप्त फ्रांसीसी विश्वविद्यालय द्वारा होना चाहिए।",
        sourceIds: ["src-cf1", "src-cf2"],
      },
      {
        fact: "मासिक जीवन निर्वाह भत्ता, वापसी हवाई यात्रा और सामाजिक सुरक्षा नामांकन शामिल है।",
        sourceIds: ["src-cf1"],
      },
    ],
    detectedGaps: [
      {
        facet: "फ्रांसीसी संस्थानों की आंतरिक पूर्व-चयन समय सीमा",
        severity: "High",
        reason:
          "जबकि कैंपस फ्रांस जनवरी की अंतिम तिथि तय करता है, फ्रांसीसी संस्थान अपनी आंतरिक स्क्रीनिंग 2 महीने पहले (नवंबर) बंद कर देते हैं।",
        suggestedQuestion:
          "चयनित विश्वविद्यालय द्वारा उम्मीदवार की फाइल की समीक्षा करने की सटीक विभागीय अंतिम तिथि क्या है?",
      },
      {
        facet: "ट्यूशन फीस छूट कवरेज बनाम संस्थागत शुल्क",
        severity: "Medium",
        reason:
          "एफिल केवल रहने का खर्च वहन करता है, विश्वविद्यालय ट्यूशन फीस नहीं। स्रोत यह नहीं बताते कि क्या ट्यूशन फीस स्वचालित रूप से माफ की जाती है।",
        suggestedQuestion:
          "क्या नामांकन करने वाला फ्रांसीसी विश्वविद्यालय एफिल नामांकन के साथ संस्थागत ट्यूशन छूट पत्र प्रदान करता है?",
      },
    ],
    contradictions: [
      {
        aspect: "मास्टर आवेदकों के लिए अधिकतम आयु सीमा",
        claimA: "मास्टर स्तर के उम्मीदवारों की आयु आवेदन चक्र के दौरान 25 वर्ष या उससे कम होनी चाहिए।",
        sourceAId: "src-cf1",
        claimB: "मूल्यांकन के समय उम्मीदवारों की आयु अधिकतम 30 वर्ष होनी चाहिए।",
        sourceBId: "src-cf2",
        divergenceReason: "स्रोत cf2 2026 चक्र के नए नियमों से पहले के पुराने आयु मानदंडों का हवाला देता है।",
      },
    ],
    temporalWarnings: [
      {
        sourceId: "src-cf2",
        warning: "स्रोत cf2 2023 का है और इसमें पुरानी आयु सीमाएं और पुराने भत्ते दर्ज हैं।",
      },
    ],
    verificationChecklist: [
      {
        priority: 1,
        task: "आंतरिक पूर्व-चयन समय सीमा जानने के लिए फ्रांसीसी विश्वविद्यालय के अंतर्राष्ट्रीय संबंध कार्यालय से संपर्क करें।",
        targetEntity: "मेजबान फ्रांसीसी विश्वविद्यालय संबंध कार्यालय",
      },
      {
        priority: 2,
        task: "विश्वविद्यालय रजिस्ट्रार के साथ ट्यूशन फीस छूट की स्थिति की पुष्टि करें।",
        targetEntity: "विश्वविद्यालय रजिस्ट्रार / प्रवेश कार्यालय",
      },
    ],
  },
};

export const DEMO_FIXTURES: Record<string, DemoFixture> = {
  daad_wise: {
    id: "daad_wise",
    name: "DAAD WISE Germany 2026",
    badge: "Scholarship & Visa",
    topic: DAAD_WISE_DEMO_RESULTS.en.topic,
    urls: [
      "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
      "https://www.study-in-germany.de/en/",
      "https://www.research-in-germany.org/en/",
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
    result: DAAD_WISE_DEMO_RESULTS.en,
  },
  campus_france: {
    id: "campus_france",
    name: "Campus France Eiffel Grant 2026",
    badge: "Master's & PhD",
    topic: CAMPUS_FRANCE_DEMO_RESULTS.en.topic,
    urls: [
      "https://www.campusfrance.org/en/",
      "https://www.enseignementsup-recherche.gouv.fr/",
    ],
    rawText: `Campus France Eiffel Excellence Scholarship: Applications must be submitted exclusively by French higher education institutions. Direct student applications are strictly ineligible. Monthly allowance: €1,181 for Master level, €1,800 for PhD level. Age limit: Master level applicants must be 25 or younger.`,
    result: CAMPUS_FRANCE_DEMO_RESULTS.en,
  },
};

export function getDemoFixture(id: string = "daad_wise", lang: SupportedUiLang = "en"): DemoFixture {
  const isCf = id === "campus_france";
  const result = isCf
    ? CAMPUS_FRANCE_DEMO_RESULTS[lang] || CAMPUS_FRANCE_DEMO_RESULTS.en
    : DAAD_WISE_DEMO_RESULTS[lang] || DAAD_WISE_DEMO_RESULTS.en;

  const base = DEMO_FIXTURES[id] || DEMO_FIXTURES.daad_wise;

  return {
    ...base,
    topic: result.topic,
    result,
  };
}
