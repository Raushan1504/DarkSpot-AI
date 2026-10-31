// lib/schema.ts
import { z } from "zod";

export const AuditResultSchema = z.object({
  topic: z.string().describe("The research topic or goal being analyzed"),
  analyzedSources: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      url: z.string(),
      detectedDate: z.string().optional().describe("Publication or modified timestamp if detected"),
      isOutdated: z.boolean().describe("Whether this source appears to be from a prior cycle or obsolete year"),
    })
  ),
  verifiedFacts: z.array(
    z.object({
      fact: z.string().describe("Verified core fact agreed upon by sources"),
      sourceIds: z.array(z.string()),
    })
  ),
  detectedGaps: z.array(
    z.object({
      facet: z.string().describe("The operational area or prerequisite that is missing (e.g., Renewal Policy, Bond Clauses)"),
      severity: z.enum(["High", "Medium", "Low"]),
      reason: z.string().describe("Why this missing information constitutes a blind spot or risk for the user"),
      suggestedQuestion: z.string().describe("The specific question the user must answer to close the gap"),
    })
  ),
  contradictions: z.array(
    z.object({
      aspect: z.string().describe("The specific metric or rule where sources disagree (e.g., Deadline, Monthly Stipend)"),
      claimA: z.string().describe("Exact quote or statement from Source A"),
      sourceAId: z.string(),
      claimB: z.string().describe("Exact quote or statement from Source B"),
      sourceBId: z.string(),
      divergenceReason: z.string().describe("Explanation of the conflict (e.g., different cycle, conflicting portal updates)"),
    })
  ),
  temporalWarnings: z.array(
    z.object({
      sourceId: z.string(),
      warning: z.string().describe("Warning about expired dates, previous batches, or unconfirmed timelines"),
    })
  ),
  verificationChecklist: z.array(
    z.object({
      priority: z.number().describe("1 = highest priority"),
      task: z.string().describe("Actionable task the user must complete before finalizing their decision"),
      targetEntity: z.string().describe("Where to verify this (e.g., Official Portal FAQ, University Desk)"),
    })
  ),
  inquiryDraft: z.object({
    recipientPlaceholder: z.string(),
    subject: z.object({
      en: z.string(),
      fr: z.string(),
      es: z.string().optional(),
      de: z.string().optional(),
      hi: z.string().optional(),
    }),
    body: z.object({
      en: z.string(),
      fr: z.string(),
      es: z.string().optional(),
      de: z.string().optional(),
      hi: z.string().optional(),
    }),
  }),
  documentPrerequisites: z.array(
    z.object({
      document: z.string(),
      status: z.enum(["Missing Requirement", "Conflicting Rule", "Clear"]),
      details: z.string(),
      riskLevel: z.enum(["High", "Medium", "Low"]),
      actionRequired: z.string(),
    })
  ).optional(),
});

export type AuditResult = z.infer<typeof AuditResultSchema>;
export type AnalyzedSource = AuditResult["analyzedSources"][number];
export type VerifiedFact = AuditResult["verifiedFacts"][number];
export type DetectedGap = AuditResult["detectedGaps"][number];
export type Contradiction = AuditResult["contradictions"][number];
export type TemporalWarning = AuditResult["temporalWarnings"][number];
export type VerificationTask = AuditResult["verificationChecklist"][number];
export type DocumentPrerequisite = NonNullable<AuditResult["documentPrerequisites"]>[number];