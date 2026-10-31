"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Languages,
  ShieldAlert,
  ArrowRightLeft,
  CalendarClock,
  RotateCcw,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResearchInput } from "@/components/ResearchInput";
import { SourceBadgeList } from "@/components/SourceBadgeList";
import { AuditDashboard } from "@/components/AuditDashboard";
import { ActionChecklist } from "@/components/ActionChecklist";
import { InquiryModal } from "@/components/InquiryModal";
import {
  DEMO_FIXTURES,
  getDemoFixture,
} from "@/lib/demoData";
import { AuditResult } from "@/lib/schema";
import { TRANSLATIONS, SupportedUiLang } from "@/lib/i18n";
import { toast } from "sonner";

const UI_LANGUAGES: { key: SupportedUiLang; label: string; flag: string }[] = [
  { key: "en", label: "English", flag: "🇬🇧" },
  { key: "fr", label: "Français", flag: "🇫🇷" },
  { key: "es", label: "Español", flag: "🇪🇸" },
  { key: "de", label: "Deutsch", flag: "🇩🇪" },
  { key: "hi", label: "हिन्दी", flag: "🇮🇳" },
];

const defaultFixture = DEMO_FIXTURES.daad_wise;

export default function Home() {
  const [topic, setTopic] = useState<string>(() => defaultFixture.topic);
  const [urls, setUrls] = useState<string[]>(() => defaultFixture.urls);
  const [rawText, setRawText] = useState<string>(() => defaultFixture.rawText);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(() => defaultFixture.result);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [uiLang, setUiLang] = useState<SupportedUiLang>("en");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);

  // Active translation dictionary
  const dict = TRANSLATIONS[uiLang];

  const handleLoadFixture = (fixtureId: string = "daad_wise") => {
    const fixture = getDemoFixture(fixtureId);
    setTopic(fixture.topic);
    setUrls([...fixture.urls]);
    setRawText(fixture.rawText);
    setAuditResult(fixture.result);
    toast.success(`Loaded "${fixture.name}" demo fixture!`, {
      description: "Inputs and epistemic audit results populated with realistic 2026 data.",
    });
  };

  const handleAuditSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      toast.error("Please enter a research goal or question.");
      return;
    }

    setIsLoading(true);
    toast.info("Auditing scattered sources for epistemic dark spots...", {
      description: "Cross-referencing claims and probing missing prerequisites...",
    });

    try {
      const filteredUrls = urls.filter((u) => u.trim().length > 0);
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          urls: filteredUrls,
          rawText,
        }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data: AuditResult = await res.json();
      setAuditResult(data);
      toast.success("Epistemic audit completed!", {
        description: `Found ${data.detectedGaps.length} potential blind spots and ${data.contradictions.length} direct conflicts.`,
      });
    } catch (err) {
      console.warn("Audit call error, seamlessly falling back to offline demo fixture:", err);
      const fallback = getDemoFixture("daad_wise").result;
      setAuditResult(fallback);
      toast.warning("Demonstration Mode (Offline Fallback)", {
        description: "Network unavailable. Loaded verified DAAD WISE 2026 epistemic audit fixture.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTopic("");
    setUrls(["", ""]);
    setRawText("");
    setAuditResult(null);
    toast.info("Cleared audit workspace.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20 text-zinc-950 font-black">
              <ShieldAlert className="w-5 h-5 text-zinc-950" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  DarkSpot <span className="text-amber-400">AI</span>
                </span>
                <Badge
                  variant="outline"
                  className="hidden sm:inline-flex bg-amber-500/10 text-amber-400 border-amber-500/30 text-[10px] font-semibold uppercase tracking-wider px-2 py-0"
                >
                  {dict.hackathonBadge}
                </Badge>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium hidden md:block">
                {dict.navSubtitle}
              </p>
            </div>
          </div>

          {/* Right Header Controls: Language Selector & Demo Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">
                  {UI_LANGUAGES.find((l) => l.key === uiLang)?.flag}{" "}
                  {UI_LANGUAGES.find((l) => l.key === uiLang)?.label}
                </span>
                <span className="sm:hidden uppercase">{uiLang}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-1 z-50 animate-in fade-in-0 zoom-in-95">
                  {UI_LANGUAGES.map((lang) => (
                    <button
                      key={lang.key}
                      type="button"
                      onClick={() => {
                        setUiLang(lang.key);
                        setIsLangDropdownOpen(false);
                        toast.info(`Language switched to ${lang.label}`);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        uiLang === lang.key
                          ? "bg-amber-500/10 text-amber-300 font-bold"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {uiLang === lang.key && (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Load Demo Fixture Button */}
            <Button
              type="button"
              onClick={() => handleLoadFixture("daad_wise")}
              disabled={isLoading}
              className="text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 px-3.5 sm:px-4 h-9 rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{dict.loadDemo}</span>
              <span className="sm:hidden">{dict.demoShort}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* HERO / PROBLEM STATEMENT CALLOUT */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-zinc-950 p-6 sm:p-10 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{dict.heroTag}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {dict.heroTitle}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                {dict.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {dict.heroDesc}
            </p>

            {/* 3 Epistemic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">{dict.pillar1Title}</h4>
                  <p className="text-[11px] text-zinc-400 leading-tight">{dict.pillar1Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">{dict.pillar2Title}</h4>
                  <p className="text-[11px] text-zinc-400 leading-tight">{dict.pillar2Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">{dict.pillar3Title}</h4>
                  <p className="text-[11px] text-zinc-400 leading-tight">{dict.pillar3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. RESEARCH INPUT PANEL */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              {dict.section1}
            </h2>
            {auditResult && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-zinc-200 h-7 px-2"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                {dict.clearWorkspace}
              </Button>
            )}
          </div>

          <ResearchInput
            topic={topic}
            setTopic={setTopic}
            urls={urls}
            setUrls={setUrls}
            rawText={rawText}
            setRawText={setRawText}
            onSubmit={handleAuditSubmit}
            isLoading={isLoading}
            onLoadFixture={handleLoadFixture}
            dict={dict}
          />
        </section>

        {/* AUDIT RESULTS PRESENTATION */}
        {auditResult && (
          <section className="space-y-8 pt-4">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
                <span className="text-[11px] font-semibold uppercase text-zinc-400">
                  {dict.statSources}
                </span>
                <div className="text-2xl font-black text-white flex items-center gap-2">
                  <span>{auditResult.analyzedSources.length}</span>
                  {auditResult.analyzedSources.some((s) => s.isOutdated) && (
                    <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400">
                      {dict.staleBadge}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-red-500/20 space-y-1">
                <span className="text-[11px] font-semibold uppercase text-red-300">
                  {dict.statGaps}
                </span>
                <div className="text-2xl font-black text-red-400 flex items-center gap-2">
                  <span>{auditResult.detectedGaps.length}</span>
                  <Badge variant="outline" className="text-[10px] border-red-500/30 text-red-400">
                    Omissions
                  </Badge>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-amber-500/20 space-y-1">
                <span className="text-[11px] font-semibold uppercase text-amber-300">
                  {dict.statConflicts}
                </span>
                <div className="text-2xl font-black text-amber-400 flex items-center gap-2">
                  <span>{auditResult.contradictions.length}</span>
                  <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400">
                    Conflicts
                  </Badge>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-emerald-500/20 space-y-1">
                <span className="text-[11px] font-semibold uppercase text-emerald-300">
                  {dict.statBaseline}
                </span>
                <div className="text-2xl font-black text-emerald-400 flex items-center gap-2">
                  <span>{auditResult.verifiedFacts.length}</span>
                  <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
                    Consensus
                  </Badge>
                </div>
              </div>
            </div>

            {/* 3. SOURCE OVERVIEW STRIP */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                {dict.section2}
              </h2>
              <SourceBadgeList sources={auditResult.analyzedSources} dict={dict} />
            </div>

            {/* 4. MULTI-TAB EPISTEMIC DASHBOARD */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                {dict.section3}
              </h2>
              <AuditDashboard
                result={auditResult}
                onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
                dict={dict}
              />
            </div>

            {/* 5. ACTION CHECKLIST */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                {dict.section4}
              </h2>
              <ActionChecklist
                checklist={auditResult.verificationChecklist}
                onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
                dict={dict}
              />
            </div>
          </section>
        )}

        {/* INQUIRY MODAL DIALOG */}
        {auditResult && (
          <InquiryModal
            isOpen={isInquiryModalOpen}
            onClose={() => setIsInquiryModalOpen(false)}
            inquiryDraft={auditResult.inquiryDraft}
            topic={auditResult.topic}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-zinc-900 bg-black/60 py-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">DarkSpot AI</span>
            <span>—</span>
            <span>Shinchan Online Hackathon 2026 Submission</span>
          </div>

          <p className="text-center sm:text-right text-[11px] text-zinc-400 max-w-lg">
            {dict.footerNotice}
          </p>
        </div>
      </footer>
    </div>
  );
}
