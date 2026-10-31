"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  GitCompare,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  Copy,
  Check,
  CalendarClock,
  Sparkles,
  Info,
  ChevronRight,
  ShieldAlert,
  ArrowRightLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AuditResult,
  DetectedGap,
  Contradiction,
  VerifiedFact,
  DocumentPrerequisite,
} from "@/lib/schema";
import { TranslationDict } from "@/lib/i18n";
import { toast } from "sonner";

interface AuditDashboardProps {
  result: AuditResult;
  onOpenInquiryModal?: () => void;
  dict: TranslationDict;
}

type TabType = "gaps" | "contradictions" | "baseline" | "documents";

export function AuditDashboard({ result, onOpenInquiryModal, dict }: AuditDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("gaps");
  const [copiedQuestionIndex, setCopiedQuestionIndex] = useState<number | null>(null);

  const {
    detectedGaps = [],
    contradictions = [],
    verifiedFacts = [],
    temporalWarnings = [],
    analyzedSources = [],
  } = result;

  const getSourceById = (sourceId: string) => {
    return analyzedSources.find((s) => s.id === sourceId);
  };

  const handleCopyQuestion = async (question: string, index: number) => {
    try {
      await navigator.clipboard.writeText(question);
      setCopiedQuestionIndex(index);
      toast.success(dict.copied);
      setTimeout(() => setCopiedQuestionIndex(null), 2000);
    } catch {
      toast.error("Failed to copy question.");
    }
  };

  const documentPrerequisites: DocumentPrerequisite[] =
    result.documentPrerequisites && result.documentPrerequisites.length > 0
      ? result.documentPrerequisites
      : [
          {
            document: "Financial Proof & Blocked Account (Sperrkonto)",
            status: "Missing Requirement",
            details:
              "Sources mention fund requirements but omit whether a 28-day vs 90-day bank seasoning or German Sperrkonto is mandated.",
            riskLevel: "High",
            actionRequired:
              "Confirm whether the official award certificate waives the blocked account requirement.",
          },
          {
            document: "Degree / Transcript Authentication",
            status: "Conflicting Rule",
            details:
              "Discrepancy between provisional semester grade cards and mandatory consular apostilles.",
            riskLevel: "High",
            actionRequired:
              "Check with consular desk if university digital transcripts are accepted.",
          },
          {
            document: "Host Professor Acceptance Form",
            status: "Clear",
            details:
              "Consistent requirement across all sources for signed institutional host acceptance.",
            riskLevel: "Low",
            actionRequired: "Ensure host supervisor signs the active cycle form.",
          },
          {
            document: "Language Proficiency Assessment",
            status: "Missing Requirement",
            details:
              "No source confirms whether an English Medium of Instruction letter replaces formal IELTS/TOEFL.",
            riskLevel: "Medium",
            actionRequired:
              "Request departmental language waiver form from home university.",
          },
        ];

  return (
    <div className="w-full space-y-6">
      {/* Temporal Warning Alert Strip if any outdated sources found */}
      {temporalWarnings.length > 0 && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <CalendarClock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300 uppercase tracking-wider">
                  {dict.staleCycleWarning}:
                </span>
                <Badge
                  variant="outline"
                  className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px]"
                >
                  {dict.staleBadge}
                </Badge>
              </div>
              {temporalWarnings.map((warning, i) => {
                const src = getSourceById(warning.sourceId);
                return (
                  <p key={i} className="text-zinc-300 leading-relaxed">
                    <strong className="text-amber-200">
                      [{warning.sourceId} - {src?.title || "Reference"}]:
                    </strong>{" "}
                    {warning.warning}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Epistemic Navigation Tab Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("gaps")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "gaps"
              ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 border border-red-500/40 shadow-md shadow-red-500/5"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>{dict.tabGaps}</span>
          <Badge
            variant="secondary"
            className={`text-[10px] px-1.5 py-0 ${
              activeTab === "gaps"
                ? "bg-red-500/30 text-red-200"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {detectedGaps.length}
          </Badge>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contradictions")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "contradictions"
              ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-500/5"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
          }`}
        >
          <GitCompare className="w-4 h-4 text-amber-400" />
          <span>{dict.tabConflicts}</span>
          <Badge
            variant="secondary"
            className={`text-[10px] px-1.5 py-0 ${
              activeTab === "contradictions"
                ? "bg-amber-500/30 text-amber-200"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {contradictions.length}
          </Badge>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("baseline")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "baseline"
              ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-md shadow-emerald-500/5"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{dict.tabBaseline}</span>
          <Badge
            variant="secondary"
            className={`text-[10px] px-1.5 py-0 ${
              activeTab === "baseline"
                ? "bg-emerald-500/30 text-emerald-200"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {verifiedFacts.length}
          </Badge>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("documents")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "documents"
              ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/40 shadow-md shadow-blue-500/5"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-blue-400" />
          <span>{dict.tabDocuments}</span>
          <Badge
            variant="secondary"
            className={`text-[10px] px-1.5 py-0 ${
              activeTab === "documents"
                ? "bg-blue-500/30 text-blue-200"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {documentPrerequisites.length}
          </Badge>
        </button>
      </div>

      {/* TAB 1: INFORMATION GAPS (DARK SPOTS) */}
      {activeTab === "gaps" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {dict.gapsSubtitle}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              {dict.epistemicStandard}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {detectedGaps.map((gap: DetectedGap, index: number) => {
              const severityColor =
                gap.severity === "High"
                  ? "border-red-500/30 bg-red-950/15"
                  : gap.severity === "Medium"
                  ? "border-amber-500/30 bg-amber-950/15"
                  : "border-blue-500/30 bg-blue-950/15";

              const badgeColor =
                gap.severity === "High"
                  ? "bg-red-500/10 text-red-400 border-red-500/30"
                  : gap.severity === "Medium"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/30";

              return (
                <Card
                  key={index}
                  className={`border rounded-2xl p-5 transition-all duration-200 hover:border-zinc-700 ${severityColor}`}
                >
                  <div className="space-y-4">
                    {/* Header line */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 ${badgeColor}`}
                        >
                          {dict.blindSpotSeverity[gap.severity] || `${gap.severity} Severity Blind Spot`}
                        </Badge>

                        {/* MANDATORY SHINCHAN HACKATHON EPISTEMIC HUMILITY BADGE */}
                        <Badge
                          variant="outline"
                          className="bg-zinc-900/90 text-amber-300 border-amber-500/40 text-[11px] font-semibold py-0.5 flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          <span>{dict.epistemicBadge}</span>
                        </Badge>
                      </div>

                      <span className="text-xs font-mono text-zinc-400">
                        {dict.gapLabel} {index + 1}
                      </span>
                    </div>

                    {/* Facet Title */}
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                        <span>{gap.facet}</span>
                      </h4>
                    </div>

                    {/* Why this matters */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        {dict.whyThisMatters}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {gap.reason}
                      </p>
                    </div>

                    {/* What question must be answered */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5" />
                          {dict.whatMustBeAnswered}
                        </span>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyQuestion(gap.suggestedQuestion, index)}
                          className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                        >
                          {copiedQuestionIndex === index ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400 mr-1" />
                              <span className="text-emerald-400">{dict.copied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 mr-1" />
                              <span>{dict.copyQuestion}</span>
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-emerald-300 italic pl-1 border-l-2 border-emerald-500/60">
                        &ldquo;{gap.suggestedQuestion}&rdquo;
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CONFLICTING CLAIMS (DIFF VIEW) */}
      {activeTab === "contradictions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span className="flex items-center gap-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
              {dict.diffSubtitle}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              {dict.crossDocDiffing}
            </span>
          </div>

          <div className="space-y-4">
            {contradictions.map((c: Contradiction, idx: number) => {
              const srcA = getSourceById(c.sourceAId);
              const srcB = getSourceById(c.sourceBId);

              return (
                <Card
                  key={idx}
                  className="border border-amber-500/30 bg-zinc-950/70 rounded-2xl p-5 space-y-4 shadow-lg shadow-black/40"
                >
                  {/* Aspect Title Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-amber-500/10 text-amber-400">
                        <GitCompare className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-zinc-100">
                        {dict.contradiction} {c.aspect}
                      </h4>
                    </div>

                    <Badge
                      variant="outline"
                      className="border-red-500/40 bg-red-500/10 text-red-300 text-[11px]"
                    >
                      {dict.directDiscrepancy}
                    </Badge>
                  </div>

                  {/* Split Side-by-Side Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Source A Column */}
                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                          [{c.sourceAId}] {srcA?.title ? srcA.title.slice(0, 30) + "..." : "Source A"}
                        </span>
                        {srcA?.isOutdated ? (
                          <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400">
                            {dict.staleBadge}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400">
                            {dict.activeBadge}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          {dict.verbatimA}
                        </span>
                        <blockquote className="text-xs sm:text-sm text-zinc-200 bg-black/40 p-3 rounded-lg border-l-2 border-amber-500 leading-relaxed font-mono">
                          &ldquo;{c.claimA}&rdquo;
                        </blockquote>
                      </div>
                    </div>

                    {/* Source B Column */}
                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                          [{c.sourceBId}] {srcB?.title ? srcB.title.slice(0, 30) + "..." : "Source B"}
                        </span>
                        {srcB?.isOutdated ? (
                          <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400">
                            {dict.staleBadge}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400">
                            {dict.activeBadge}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          {dict.verbatimB}
                        </span>
                        <blockquote className="text-xs sm:text-sm text-zinc-200 bg-black/40 p-3 rounded-lg border-l-2 border-orange-500 leading-relaxed font-mono">
                          &ldquo;{c.claimB}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>

                  {/* Divergence Reason Explanation */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        {dict.divergenceDiagnosis}
                      </span>
                      <p className="text-xs text-zinc-200 leading-relaxed">
                        {c.divergenceReason}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFIED BASELINE */}
      {activeTab === "baseline" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {dict.baselineSubtitle}
            </span>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px]"
            >
              {dict.highConfidence}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {verifiedFacts.map((fact: VerifiedFact, i: number) => (
              <Card
                key={i}
                className="border border-emerald-500/30 bg-zinc-950/70 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed">
                      {fact.fact}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                        {dict.crossVerifiedIn}
                      </span>
                      {fact.sourceIds.map((srcId) => {
                        const s = getSourceById(srcId);
                        return (
                          <Badge
                            key={srcId}
                            variant="secondary"
                            className="bg-zinc-800 text-emerald-300 border border-zinc-700 text-[10px] font-mono px-1.5 py-0"
                            title={s?.title || srcId}
                          >
                            [{srcId}]
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DOCUMENT & PREREQUISITE AUDITOR */}
      {activeTab === "documents" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span className="flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-blue-400" />
              {dict.documentsSubtitle}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              {dict.riskMatrix}
            </span>
          </div>

          <div className="space-y-3">
            {documentPrerequisites.map((doc, index) => {
              const statusBadge =
                doc.status === "Missing Requirement"
                  ? "bg-red-500/10 text-red-400 border-red-500/30"
                  : doc.status === "Conflicting Rule"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

              return (
                <Card
                  key={index}
                  className="border border-zinc-800 bg-zinc-950/70 rounded-xl p-4 space-y-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-blue-400">
                        <FileCheck2 className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-zinc-100">
                        {doc.document}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[11px] font-medium px-2 py-0.5 ${statusBadge}`}
                      >
                        {dict.docStatus[doc.status as keyof typeof dict.docStatus] || doc.status}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-zinc-900 text-zinc-400 text-[10px]"
                      >
                        {dict.riskLevel[doc.riskLevel as keyof typeof dict.riskLevel] || `${doc.riskLevel} ${dict.risk}`}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {doc.details}
                  </p>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <strong className="text-amber-400">{dict.actionRequired}</strong> {doc.actionRequired}
                    </span>
                    {onOpenInquiryModal && (
                      <button
                        type="button"
                        onClick={onOpenInquiryModal}
                        className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-0.5 ml-2 cursor-pointer"
                      >
                        <span>{dict.draftInquiry}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
