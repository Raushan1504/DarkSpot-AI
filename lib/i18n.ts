// lib/i18n.ts
export type SupportedUiLang = "en" | "fr" | "es" | "de" | "hi";

export interface TranslationDict {
  navSubtitle: string;
  hackathonBadge: string;
  loadDemo: string;
  demoShort: string;
  heroTag: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDesc: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  section1: string;
  clearWorkspace: string;
  statSources: string;
  statGaps: string;
  statConflicts: string;
  statBaseline: string;
  section2: string;
  section3: string;
  section4: string;
  footerNotice: string;
  presetsLabel: string;
  goalLabel: string;
  goalPlaceholder: string;
  sourcesLabel: string;
  sourcesSub: string;
  addSource: string;
  autoDiscover: string;
  discovering: string;
  rawTextAccordion: string;
  rawTextDesc: string;
  rawTextPlaceholder: string;
  submitButton: string;
  submittingButton: string;
  crossExamine: string;
  dossierTitle: string;
  staleCycleWarning: string;
  allActiveWarning: string;
  staleBadge: string;
  activeBadge: string;
  inspect: string;
  textInput: string;
  undated: string;
  tabGaps: string;
  tabConflicts: string;
  tabBaseline: string;
  tabDocuments: string;
  gapsSubtitle: string;
  epistemicBadge: string;
  whyThisMatters: string;
  whatMustBeAnswered: string;
  copyQuestion: string;
  copied: string;
  contradiction: string;
  directDiscrepancy: string;
  verbatimA: string;
  verbatimB: string;
  divergenceDiagnosis: string;
  baselineSubtitle: string;
  crossVerifiedIn: string;
  documentsSubtitle: string;
  actionRequired: string;
  draftInquiry: string;
  checklistTitle: string;
  checklistSubtitle: string;
  generateDraftBtn: string;
  progressText: string;
  verifyWith: string;
  priority: string;
  gapLabel: string;
  blindSpotSeverity: {
    High: string;
    Medium: string;
    Low: string;
  };
  docStatus: {
    "Missing Requirement": string;
    "Conflicting Rule": string;
    Clear: string;
  };
  riskLevel: {
    High: string;
    Medium: string;
    Low: string;
  };
  badgeOmissions: string;
  badgeConflicts: string;
  badgeConsensus: string;
  epistemicStandard: string;
  diffSubtitle: string;
  crossDocDiffing: string;
  highConfidence: string;
  riskMatrix: string;
  confirmedOf: string;
  of: string;
  risk: string;
}

export const TRANSLATIONS: Record<SupportedUiLang, TranslationDict> = {
  en: {
    navSubtitle: "Epistemic Information Gap & Contradiction Auditor",
    hackathonBadge: "Shinchan 2026 Hackathon",
    loadDemo: "Load Demo Fixture",
    demoShort: "Demo",
    heroTag: "Beyond Closed-World Summarization",
    heroTitle: "Uncovering What ",
    heroTitleHighlight: "Online Documents Don't Tell You.",
    heroDesc:
      "Traditional LLMs condense visible text but suffer from the closed-world assumption—they cannot warn you about omitted prerequisites, expired cycles, or hidden contradictions. DarkSpot AI audits scattered sources for scholarships, visas, and grants, surfacing silent dealbreakers before it's too late.",
    pillar1Title: "Information Dark Spots",
    pillar1Desc: "Missing renewal rules & hidden bond clauses.",
    pillar2Title: "Conflicting Claims",
    pillar2Desc: "Side-by-side diffing of stipend & CGPA discrepancies.",
    pillar3Title: "Temporal Drift",
    pillar3Desc: "Flags stale 2023 links & outdated dead-ends.",
    section1: "1. Research Intake & Source Cross-Examination",
    clearWorkspace: "Clear Workspace",
    statSources: "Sources Audited",
    statGaps: "Information Dark Spots",
    statConflicts: "Direct Contradictions",
    statBaseline: "Verified Baseline",
    section2: "2. Audited Sources & Provenance Trail",
    section3: "3. Epistemic Findings & Cross-Document Matrix",
    section4: "4. Action Verification Plan & Official Inquiry",
    footerNotice:
      "Epistemic Humility Notice: Findings are labelled as potential signals and omission risks to guide verification, not absolute guarantees.",
    presetsLabel: "Quick Audit Presets:",
    goalLabel: "Research Goal or High-Stakes Decision",
    goalPlaceholder:
      "e.g. What are the complete prerequisites and potential conflicts for DAAD WISE 2026?",
    sourcesLabel: "Source URLs to Audit & Cross-Examine",
    sourcesSub: "Contrast 2+ sources to expose contradictions",
    addSource: "Add Source URL",
    autoDiscover: "Auto-Discover Sources",
    discovering: "Discovering...",
    rawTextAccordion: "Optional: Paste Raw Circular Text or Policy Excerpts",
    rawTextDesc:
      "If certain circulars are behind internal intranets, scanned PDFs, or unlinked portals, paste the verbatim text here:",
    rawTextPlaceholder: "Paste verbatim scholarship / circular excerpts here...",
    submitButton: "Audit Information Dark Spots",
    submittingButton: "Auditing Epistemic Gaps & Contradictions...",
    crossExamine: "Cross-Examine",
    dossierTitle: "Audited Source Dossier",
    staleCycleWarning: "Source(s) Flagged Outdated / Prior Cycle",
    allActiveWarning: "All Sources Active (Current Cycle)",
    staleBadge: "Stale Cycle",
    activeBadge: "2026 Active",
    inspect: "Inspect",
    textInput: "Text Input",
    undated: "Undated circular",
    tabGaps: "Information Gaps (Dark Spots)",
    tabConflicts: "Conflicting Claims (Diff View)",
    tabBaseline: "Verified Baseline",
    tabDocuments: "Document & Prerequisite Auditor",
    gapsSubtitle:
      "Exposing hidden blind spots completely omitted across all reviewed sources",
    epistemicBadge: "Potential Signal: Unmentioned in Any Source",
    whyThisMatters: "Why this matters (Decision Risk):",
    whatMustBeAnswered: "What question must be answered:",
    copyQuestion: "Copy Question",
    copied: "Copied",
    contradiction: "Contradiction:",
    directDiscrepancy: "Direct Discrepancy",
    verbatimA: "Verbatim Statement A:",
    verbatimB: "Verbatim Statement B:",
    divergenceDiagnosis: "Divergence Diagnosis:",
    baselineSubtitle: "Consensus facts unanimously affirmed across audited sources",
    crossVerifiedIn: "Cross-Verified In:",
    documentsSubtitle:
      "Document prerequisite integrity, seasoning periods & consular rules",
    actionRequired: "Action:",
    draftInquiry: "Draft Inquiry",
    checklistTitle: "Prioritized Verification Action Plan",
    checklistSubtitle:
      "Next steps to resolve detected dark spots and contradictory prerequisites before committing.",
    generateDraftBtn: "Generate Official Inquiry Draft",
    progressText: "Verification Progress:",
    verifyWith: "Verify with:",
    priority: "Priority",
    gapLabel: "Gap #",
    blindSpotSeverity: {
      High: "HIGH SEVERITY BLIND SPOT",
      Medium: "MEDIUM SEVERITY BLIND SPOT",
      Low: "LOW SEVERITY BLIND SPOT",
    },
    docStatus: {
      "Missing Requirement": "Missing Requirement",
      "Conflicting Rule": "Conflicting Rule",
      Clear: "Clear",
    },
    riskLevel: {
      High: "High Risk",
      Medium: "Medium Risk",
      Low: "Low Risk",
    },
    badgeOmissions: "Omissions",
    badgeConflicts: "Conflicts",
    badgeConsensus: "Consensus",
    epistemicStandard: "Epistemic Humility Standard Active",
    diffSubtitle: "Side-by-side claim conflict analysis with verbatim quotes",
    crossDocDiffing: "Cross-Document Diffing",
    highConfidence: "High Epistemic Confidence",
    riskMatrix: "Prerequisite Risk Matrix",
    confirmedOf: "confirmed",
    of: "of",
    risk: "Risk",
  },
  fr: {
    navSubtitle: "Auditeur d'Angles Morts et de Contradictions Épistémiques",
    hackathonBadge: "Hackathon Shinchan 2026",
    loadDemo: "Charger Démo Réaliste",
    demoShort: "Démo",
    heroTag: "Au-delà de la Synthèse Fermée",
    heroTitle: "Révéler ce que ",
    heroTitleHighlight: "les Documents Ne Disent Pas.",
    heroDesc:
      "Les modèles IA classiques résument les textes visibles mais échouent face aux omissions cachées. DarkSpot AI audite les sources éparses (bourses, visas, financements) pour exposer les conditions manquantes, dates expirées et politiques contradictoires.",
    pillar1Title: "Angles Morts Épistémiques",
    pillar1Desc: "Règles de renouvellement & clauses d'engagement omises.",
    pillar2Title: "Réclamations Contradictoires",
    pillar2Desc: "Comparaison textuelle directe des montants & conditions.",
    pillar3Title: "Dérive Temporelle",
    pillar3Desc: "Alerte sur les circulaires 2023 et calendriers obsolètes.",
    section1: "1. Saisie de Recherche & Contre-Interrogatoire",
    clearWorkspace: "Réinitialiser l'Espace",
    statSources: "Sources Auditées",
    statGaps: "Angles Morts Détectés",
    statConflicts: "Contradictions Directes",
    statBaseline: "Vérités Concordantes",
    section2: "2. Dossier des Sources & Traçabilité",
    section3: "3. Matrice Épistémique & Différences Documentaires",
    section4: "4. Plan d'Action & Demande de Clarification",
    footerNotice:
      "Avertissement d'Humilité Épistémique : Les signaux détectés sont des alertes d'aide à la vérification et non des affirmations absolues.",
    presetsLabel: "Scénarios Préconfigurés :",
    goalLabel: "Objectif de Recherche ou Décision Critique",
    goalPlaceholder:
      "ex. Quelles sont les conditions complètes et contradictions pour DAAD WISE 2026 ?",
    sourcesLabel: "URLs des Sources à Croiser",
    sourcesSub: "Confrontez 2 sources ou plus pour révéler les conflits",
    addSource: "Ajouter une URL",
    autoDiscover: "Découverte Automatique",
    discovering: "Recherche en cours...",
    rawTextAccordion: "Facultatif : Coller le Texte Brut d'une Circulaire",
    rawTextDesc:
      "Si certaines circulaires proviennent d'intranets ou de PDF scannés, collez le texte ici :",
    rawTextPlaceholder: "Collez l'extrait textuel de la circulaire ici...",
    submitButton: "Auditer les Angles Morts",
    submittingButton: "Audit Épistémique en cours...",
    crossExamine: "Contre-Examen",
    dossierTitle: "Dossier des Sources Auditées",
    staleCycleWarning: "Source(s) Identifiée(s) Obsolète(s) / Cycle Précédent",
    allActiveWarning: "Toutes les Sources sont Actives (Cycle 2026)",
    staleBadge: "Cycle Obsolète",
    activeBadge: "Actif 2026",
    inspect: "Consulter",
    textInput: "Texte Brut",
    undated: "Circulaire non datée",
    tabGaps: "Angles Morts (Informations Manquantes)",
    tabConflicts: "Réclamations Contradictoires (Vue Diff)",
    tabBaseline: "Base Factuelle Validée",
    tabDocuments: "Auditeur de Pièces Justificatives",
    gapsSubtitle:
      "Révélation des points aveugles totalement omis dans l'ensemble des sources",
    epistemicBadge: "Signal Potentiel : Absent de Toutes les Sources",
    whyThisMatters: "Pourquoi cela compte (Risque Décisionnel) :",
    whatMustBeAnswered: "Question impérative à poser :",
    copyQuestion: "Copier Question",
    copied: "Copié",
    contradiction: "Contradiction :",
    directDiscrepancy: "Divergence Directe",
    verbatimA: "Déclaration Textuelle Source A :",
    verbatimB: "Déclaration Textuelle Source B :",
    divergenceDiagnosis: "Diagnostic de Divergence :",
    baselineSubtitle: "Faits concordants unanimement validés par les sources",
    crossVerifiedIn: "Croisé dans :",
    documentsSubtitle:
      "Exigences documentaires, périodes d'ancienneté bancaire et apostilles",
    actionRequired: "Action Requise :",
    draftInquiry: "Rédiger Demande",
    checklistTitle: "Plan d'Action de Vérification Priorisé",
    checklistSubtitle:
      "Étapes indispensables pour résoudre les zones d'ombre avant de vous engager.",
    generateDraftBtn: "Générer la Demande Officielle",
    progressText: "Progression de la Vérification :",
    verifyWith: "À vérifier auprès de :",
    priority: "Priorité",
    gapLabel: "Angle mort #",
    blindSpotSeverity: {
      High: "ANGLE MORT DE HAUTE GRAVITÉ",
      Medium: "ANGLE MORT DE GRAVITÉ MOYENNE",
      Low: "ANGLE MORT DE FAIBLE GRAVITÉ",
    },
    docStatus: {
      "Missing Requirement": "Condition Manquante",
      "Conflicting Rule": "Règle Contradictoire",
      Clear: "Conforme",
    },
    riskLevel: {
      High: "Risque Élevé",
      Medium: "Risque Moyen",
      Low: "Faible Risque",
    },
    badgeOmissions: "Omissions",
    badgeConflicts: "Conflits",
    badgeConsensus: "Consensus",
    epistemicStandard: "Norme d'Humilité Épistémique Active",
    diffSubtitle: "Analyse comparative textuelle des conflits de déclarations",
    crossDocDiffing: "Diff Inter-Documents",
    highConfidence: "Haute Confiance Épistémique",
    riskMatrix: "Matrice des Risques Prérequis",
    confirmedOf: "confirmés",
    of: "sur",
    risk: "Risque",
  },
  es: {
    navSubtitle: "Auditor de Brechas de Información y Contradicciones",
    hackathonBadge: "Hackathon Shinchan 2026",
    loadDemo: "Cargar Demo Realista",
    demoShort: "Demo",
    heroTag: "Más Allá del Resumen Tradicional",
    heroTitle: "Descubriendo lo que ",
    heroTitleHighlight: "los Documentos Ocultan.",
    heroDesc:
      "Los LLMs comunes resumen lo visible pero sufren del sesgo de mundo cerrado: no advierten sobre requisitos omitidos, convocatorias caducadas o normas en conflicto. DarkSpot AI audita fuentes dispersas para becas y visados antes de que sea tarde.",
    pillar1Title: "Puntos Ciegos de Información",
    pillar1Desc: "Falta de normas de renovación y cláusulas de retorno.",
    pillar2Title: "Reclamaciones en Conflicto",
    pillar2Desc: "Comparativa textual de estipendios y notas mínimas.",
    pillar3Title: "Desfase Temporal",
    pillar3Desc: "Detecta convocatorias caducadas de 2023.",
    section1: "1. Ingesta de Fuentes y Contrastación",
    clearWorkspace: "Limpiar Espacio",
    statSources: "Fuentes Auditadas",
    statGaps: "Brechas Detectadas",
    statConflicts: "Contradicciones Directas",
    statBaseline: "Hechos Verificados",
    section2: "2. Expediente de Fuentes y Trazabilidad",
    section3: "3. Hallazgos Epistémicos y Matriz Comparativa",
    section4: "4. Plan de Verificación y Solicitud Oficial",
    footerNotice:
      "Aviso de Humildad Epistémica: Los hallazgos se presentan como señales potenciales para orientar la verificación, no como certezas absolutas.",
    presetsLabel: "Casos Preconfigurados:",
    goalLabel: "Meta de Investigación o Decisión de Alto Impacto",
    goalPlaceholder:
      "ej. ¿Cuáles son los requisitos completos y discrepancias para DAAD WISE 2026?",
    sourcesLabel: "Enlaces de Fuentes a Contrastar",
    sourcesSub: "Contraste 2 o más fuentes para exponer discrepancias",
    addSource: "Agregar Enlace",
    autoDiscover: "Auto-Descubrir Fuentes",
    discovering: "Buscando...",
    rawTextAccordion: "Opcional: Pegar Texto de Circulares o Decretos",
    rawTextDesc:
      "Si ciertos reglamentos están en intranets o PDFs escaneados, pegue el texto aquí:",
    rawTextPlaceholder: "Pegue el texto verbatim de la convocatoria...",
    submitButton: "Auditar Brechas Ocultas",
    submittingButton: "Auditando Brechas y Contradicciones...",
    crossExamine: "Interrogar",
    dossierTitle: "Expediente de Fuentes Analizadas",
    staleCycleWarning: "Fuente(s) con Convocatoria Caducada / Ciclo Anterior",
    allActiveWarning: "Todas las Fuentes Vigentes (Ciclo 2026)",
    staleBadge: "Ciclo Caducado",
    activeBadge: "Vigente 2026",
    inspect: "Inspeccionar",
    textInput: "Texto Pegado",
    undated: "Documento sin fecha",
    tabGaps: "Brechas Ocultas (Puntos Ciegos)",
    tabConflicts: "Afirmaciones en Conflicto (Vista Diff)",
    tabBaseline: "Línea Base Verificada",
    tabDocuments: "Auditor de Documentos y Requisitos",
    gapsSubtitle:
      "Exposición de requisitos críticos totalmente omitidos en todas las fuentes",
    epistemicBadge: "Señal Potencial: No Mencionada en Ninguna Fuente",
    whyThisMatters: "Por qué es crítico (Riesgo de Decisión):",
    whatMustBeAnswered: "Pregunta que debe responderse:",
    copyQuestion: "Copiar Pregunta",
    copied: "Copiado",
    contradiction: "Contradicción:",
    directDiscrepancy: "Discrepancia Directa",
    verbatimA: "Declaración Textual Fuente A:",
    verbatimB: "Declaración Textual Fuente B:",
    divergenceDiagnosis: "Diagnóstico de Divergencia:",
    baselineSubtitle: "Hechos unánimemente respaldados por las fuentes auditadas",
    crossVerifiedIn: "Verificado en:",
    documentsSubtitle:
      "Requisitos de fondos, antigüedad bancaria y apostillas consulares",
    actionRequired: "Acción:",
    draftInquiry: "Generar Consulta",
    checklistTitle: "Plan Priorizado de Verificación",
    checklistSubtitle:
      "Pasos concretos para despejar ambigüedades antes de enviar su solicitud.",
    generateDraftBtn: "Generar Carta Oficial de Consulta",
    progressText: "Progreso de Verificación:",
    verifyWith: "Verificar con:",
    priority: "Prioridad",
    gapLabel: "Brecha #",
    blindSpotSeverity: {
      High: "PUNTO CIEGO DE ALTA GRAVEDAD",
      Medium: "PUNTO CIEGO DE GRAVEDAD MEDIA",
      Low: "PUNTO CIEGO DE BAJA GRAVEDAD",
    },
    docStatus: {
      "Missing Requirement": "Requisito Omitido",
      "Conflicting Rule": "Norma en Conflicto",
      Clear: "Conforme",
    },
    riskLevel: {
      High: "Riesgo Alto",
      Medium: "Riesgo Medio",
      Low: "Riesgo Bajo",
    },
    badgeOmissions: "Omisiones",
    badgeConflicts: "Conflictos",
    badgeConsensus: "Consenso",
    epistemicStandard: "Estándar de Humildad Epistémica Activo",
    diffSubtitle: "Análisis comparativo de discrepancias con citas textuales",
    crossDocDiffing: "Comparación Inter-Documental",
    highConfidence: "Alta Confianza Epistémica",
    riskMatrix: "Matriz de Riesgo de Requisitos",
    confirmedOf: "confirmados",
    of: "de",
    risk: "Riesgo",
  },
  de: {
    navSubtitle: "Auditor für Epistemische Informationslücken & Widersprüche",
    hackathonBadge: "Shinchan Hackathon 2026",
    loadDemo: "Demo-Szenario Laden",
    demoShort: "Demo",
    heroTag: "Jenseits Standardisierter Zusammenfassungen",
    heroTitle: "Wir decken auf, was ",
    heroTitleHighlight: "in Dokumenten Verschwiegen Wird.",
    heroDesc:
      "Konventionelle LLMs fassen vorhandenen Text zusammen, übersehen aber Auslassungen und Widersprüche. DarkSpot AI prüft verstreute Quellen für Stipendien, Visa und Förderungen auf entscheidende blinde Flecken.",
    pillar1Title: "Informationslücken (Dark Spots)",
    pillar1Desc: "Fehlende Verlängerungsklauseln & Rückkehrpflichten.",
    pillar2Title: "Widersprüchliche Angaben",
    pillar2Desc: "Direkter Vergleich von Stipendienraten & Notenschnitten.",
    pillar3Title: "Zeitliche Diskrepanzen",
    pillar3Desc: "Warnungen vor veralteten 2023-Rundschreiben.",
    section1: "1. Forschungsziel & Quellen-Gegenprüfung",
    clearWorkspace: "Arbeitsbereich Leeren",
    statSources: "Geprüfte Quellen",
    statGaps: "Aufgedeckte Lücken",
    statConflicts: "Direkte Konflikte",
    statBaseline: "Bestätigte Fakten",
    section2: "2. Quellendossier & Nachweisprotokoll",
    section3: "3. Epistemische Befunde & Widerspruchsmatrix",
    section4: "4. Verifizierungs-Aktionsplan & Offizielle Anfrage",
    footerNotice:
      "Epistemischer Demutshinweis: Befunde sind potenzielle Signale zur Prüfungsunterstützung, keine absoluten Garantien.",
    presetsLabel: "Schnellwahl-Szenarien:",
    goalLabel: "Forschungsziel oder Relevante Entscheidung",
    goalPlaceholder:
      "z. B. Vollständige Voraussetzungen und Widersprüche für DAAD WISE 2026?",
    sourcesLabel: "Zu Vergleichende Quellen-URLs",
    sourcesSub: "Mindestens 2 Quellen für Widerspruchsanalyse angeben",
    addSource: "URL Hinzufügen",
    autoDiscover: "Quellen Automatisch Finden",
    discovering: "Suche läuft...",
    rawTextAccordion: "Optional: Text aus Richtlinien oder PDFs Einfügen",
    rawTextDesc:
      "Fügen Sie hier Rundschreiben aus Intranets oder Scans im Volltext ein:",
    rawTextPlaceholder: "Volltext des Rundschreibens hier einfügen...",
    submitButton: "Informationslücken Prüfen",
    submittingButton: "Prüfe Lücken & Widersprüche...",
    crossExamine: "Gegenprüfen",
    dossierTitle: "Geprüftes Quellendossier",
    staleCycleWarning: "Quelle(n) aus Vormaligem Zyklus / Veraltet",
    allActiveWarning: "Alle Quellen Aktiv (Zyklus 2026)",
    staleBadge: "Veralteter Zyklus",
    activeBadge: "Aktiv 2026",
    inspect: "Prüfen",
    textInput: "Texteingabe",
    undated: "Undatiertes Dokument",
    tabGaps: "Informationslücken (Blinde Flecken)",
    tabConflicts: "Widersprüchliche Behauptungen (Diff-Ansicht)",
    tabBaseline: "Verifizierte Faktenbasis",
    tabDocuments: "Dokumenten- & Zulassungsprüfer",
    gapsSubtitle:
      "Kritische Voraussetzungen, die in allen eingereichten Quellen fehlen",
    epistemicBadge: "Potenzielles Signal: In Keiner Quelle Erwähnt",
    whyThisMatters: "Warum dies entscheidend ist (Risiko):",
    whatMustBeAnswered: "Erforderliche Klärungsfrage:",
    copyQuestion: "Frage Kopieren",
    copied: "Kopiert",
    contradiction: "Widerspruch:",
    directDiscrepancy: "Direkte Diskrepanz",
    verbatimA: "Wortlaut Quelle A:",
    verbatimB: "Wortlaut Quelle B:",
    divergenceDiagnosis: "Ursache der Abweichung:",
    baselineSubtitle: "Fakten, die von allen Quellen einstimmig belegt sind",
    crossVerifiedIn: "Bestätigt in:",
    documentsSubtitle:
      "Nachweispflichten, Sperrkonto-Haltefristen und Apostillen",
    actionRequired: "Maßnahme:",
    draftInquiry: "Anfrage Erstellen",
    checklistTitle: "Priorisierter Verifizierungsplan",
    checklistSubtitle:
      "Konkrete Schritte zur Beseitigung von Unklarheiten vor Einreichung.",
    generateDraftBtn: "Offiziellen Klärungsentwurf Generieren",
    progressText: "Prüffortschritt:",
    verifyWith: "Zu prüfen bei:",
    priority: "Priorität",
    gapLabel: "Lücke #",
    blindSpotSeverity: {
      High: "HOHE SCHWERE: BLINDER FLECK",
      Medium: "MITTLERE SCHWERE: BLINDER FLECK",
      Low: "GERINGE SCHWERE: BLINDER FLECK",
    },
    docStatus: {
      "Missing Requirement": "Fehlende Anforderung",
      "Conflicting Rule": "Widersprüchliche Regel",
      Clear: "Eindeutig",
    },
    riskLevel: {
      High: "Hohes Risiko",
      Medium: "Mittleres Risiko",
      Low: "Geringes Risiko",
    },
    badgeOmissions: "Auslassungen",
    badgeConflicts: "Konflikte",
    badgeConsensus: "Konsens",
    epistemicStandard: "Epistemischer Demutsstandard Aktiv",
    diffSubtitle: "Direkter Textvergleich von widersprüchlichen Aussagen",
    crossDocDiffing: "Dokumentenübergreifender Abgleich",
    highConfidence: "Hohe Epistemische Zuverlässigkeit",
    riskMatrix: "Risikomatrix der Voraussetzungen",
    confirmedOf: "bestätigt",
    of: "von",
    risk: "Risiko",
  },
  hi: {
    navSubtitle: "सूचना अंतराल एवं अंतर्विरोध विश्लेषक (डार्क स्पॉट AI)",
    hackathonBadge: "शिनचैन हैकाथॉन 2026",
    loadDemo: "डेमो डेटा लोड करें",
    demoShort: "डेमो",
    heroTag: "साधारण सारांश से परे epistemic विश्लेषण",
    heroTitle: "जानिए वो सब कुछ जो ",
    heroTitleHighlight: "ऑनलाइन दस्तावेज़ आपसे छुपाते हैं।",
    heroDesc:
      "सामान्य AI केवल दिखाई देने वाले पाठ का सारांश बनाता है। डार्क स्पॉट AI विभिन्न स्रोतों की गहन जांच कर छिपे हुए नियमों, समय सीमा के अंतर्विरोधों और छुपी शर्तों को उजागर करता है ताकि आपका आवेदन खारिज न हो।",
    pillar1Title: "सूचना डार्क स्पॉट्स",
    pillar1Desc: "गायब नवीनीकरण नियम और छिपे हुए बांड क्लॉज।",
    pillar2Title: "विरोधाभासी दावे",
    pillar2Desc: "वजीफे और सीजीपीए आवश्यकताओं की सीधी तुलना।",
    pillar3Title: "समय सीमा का भटकाव",
    pillar3Desc: "पुराने 2023 के नियमों और मृत कड़ियों की पहचान।",
    section1: "1. अनुसंधान प्रश्न एवं स्रोत सत्यापन",
    clearWorkspace: "कार्यस्थान रीसेट करें",
    statSources: "सत्यापित स्रोत",
    statGaps: "पहचाने गए डार्क स्पॉट्स",
    statConflicts: "सीधे अंतर्विरोध",
    statBaseline: "सहमति तथ्य",
    section2: "2. जाँचे गए स्रोतों का रिकॉर्ड",
    section3: "3. सूचना अंतराल एवं अंतर्विरोध तालिका",
    section4: "4. प्राथमिकता सत्यापन सूची एवं औपचारिक पत्र",
    footerNotice:
      "सत्यनिष्ठा सूचना: पाए गए निष्कर्ष संभावित संकेतों के रूप में प्रस्तुत हैं ताकि आप आधिकारिक पुष्टि कर सकें।",
    presetsLabel: "त्वरित परीक्षण परिदृश्य:",
    goalLabel: "अनुसंधान लक्ष्य या महत्वपूर्ण निर्णय",
    goalPlaceholder: "उदा. DAAD WISE 2026 के लिए क्या नियम और अंतर्विरोध हैं?",
    sourcesLabel: "तुलना हेतु स्रोत लिंक (URLs)",
    sourcesSub: "विरोधाभासों को पकड़ने के लिए कम से कम 2 स्रोत जोड़ें",
    addSource: "नया लिंक जोड़ें",
    autoDiscover: "स्रोत स्वतः खोजें",
    discovering: "खोज जारी है...",
    rawTextAccordion: "वैकल्पिक: सीधे परिपत्र या नियम का पाठ पेस्ट करें",
    rawTextDesc: "यदि दस्तावेज़ किसी पोर्टल के अंदर या पीडीएफ में है, तो पाठ यहाँ डालें:",
    rawTextPlaceholder: "दस्तावेज़ का पाठ यहाँ पेस्ट करें...",
    submitButton: "सूचना डार्क स्पॉट्स की जाँच करें",
    submittingButton: "गहन विश्लेषण जारी है...",
    crossExamine: "सत्यापन",
    dossierTitle: "समीक्षित स्रोतों का विवरण",
    staleCycleWarning: "पुराने चक्र (2023) से संबंधित स्रोत चिह्नित",
    allActiveWarning: "सभी स्रोत वर्तमान (2026 चक्र) हेतु मान्य हैं",
    staleBadge: "पुराना चक्र",
    activeBadge: "2026 सक्रिय",
    inspect: "जाँचें",
    textInput: "पेस्ट किया पाठ",
    undated: "बिना तारीख का परिपत्र",
    tabGaps: "सूचना अंतराल (डार्क स्पॉट्स)",
    tabConflicts: "विरोधाभासी दावे (तुलनात्मक दृश्य)",
    tabBaseline: "सत्यापित बुनियादी तथ्य",
    tabDocuments: "दस्तावेज़ एवं वीज़ा पूर्वशर्त परीक्षक",
    gapsSubtitle: "सभी स्रोतों से पूरी तरह गायब महत्वपूर्ण परिचालन शर्तें",
    epistemicBadge: "संभावित संकेत: किसी भी स्रोत में उल्लेख नहीं",
    whyThisMatters: "यह क्यों महत्वपूर्ण है (निर्णय जोखिम):",
    whatMustBeAnswered: "किस प्रश्न का उत्तर आवश्यक है:",
    copyQuestion: "प्रश्न कॉपी करें",
    copied: "कॉपी हो गया",
    contradiction: "अंतर्विरोध:",
    directDiscrepancy: "सीधा मतभेद",
    verbatimA: "स्रोत A का मूल कथन:",
    verbatimB: "स्रोत B का मूल कथन:",
    divergenceDiagnosis: "मतभेद का कारण:",
    baselineSubtitle: "सभी स्रोतों द्वारा सर्वसम्मति से प्रमाणित तथ्य",
    crossVerifiedIn: "पुष्टि स्रोत:",
    documentsSubtitle: "दस्तावेज़ आवश्यकताएं, बैंक खाता अवधि और अपोस्टिल नियम",
    actionRequired: "आवश्यक कार्रवाई:",
    draftInquiry: "पूछताछ पत्र बनाएं",
    checklistTitle: "प्राथमिकता सत्यापन कार्य योजना",
    checklistSubtitle: "अंतिम आवेदन से पहले इन बिंदुओं की आधिकारिक पुष्टि करें।",
    generateDraftBtn: "आधिकारिक पूछताछ पत्र तैयार करें",
    progressText: "सत्यापन प्रगति:",
    verifyWith: "पुष्टि यहाँ करें:",
    priority: "प्राथमिकता",
    gapLabel: "अंतराल #",
    blindSpotSeverity: {
      High: "अति गंभीर डार्क स्पॉट",
      Medium: "मध्यम गंभीर डार्क स्पॉट",
      Low: "सामान्य डार्क स्पॉट",
    },
    docStatus: {
      "Missing Requirement": "गायब पूर्वशर्त",
      "Conflicting Rule": "विरोधाभासी नियम",
      Clear: "स्पष्ट",
    },
    riskLevel: {
      High: "उच्च जोखिम",
      Medium: "मध्यम जोखिम",
      Low: "कम जोखिम",
    },
    badgeOmissions: "चूकें",
    badgeConflicts: "विवाद",
    badgeConsensus: "सहमति",
    epistemicStandard: "ज्ञानमीमांसक मानक सक्रिय",
    diffSubtitle: "स्रोतों के मूल कथनों का सीधा तुलनात्मक विश्लेषण",
    crossDocDiffing: "दस्तावेज़ तुलना",
    highConfidence: "उच्च प्रमाणिकता",
    riskMatrix: "जोखिम मैट्रिक्स",
    confirmedOf: "पुष्टि की गई",
    of: "में से",
    risk: "जोखिम",
  },
};
