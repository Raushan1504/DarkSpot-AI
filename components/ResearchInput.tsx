"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  FileText,
  Globe,
  Sparkles,
  Loader2,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DEMO_FIXTURES } from "@/lib/demoData";
import { TranslationDict } from "@/lib/i18n";
import { toast } from "sonner";

interface ResearchInputProps {
  topic: string;
  setTopic: (topic: string) => void;
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
  rawText: string;
  setRawText: (text: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  onLoadFixture: (fixtureId: string) => void;
  dict: TranslationDict;
}

export function ResearchInput({
  topic,
  setTopic,
  urls,
  setUrls,
  rawText,
  setRawText,
  onSubmit,
  isLoading,
  onLoadFixture,
  dict,
}: ResearchInputProps) {
  const [isSearching, setIsSearching] = useState(false);

  const handleAutoDiscover = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a research topic first.");
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(topic)}`);
      const data = await res.json();
      if (data.sources && data.sources.length > 0) {
        const foundUrls = data.sources.map((s: { url: string }) => s.url);
        setUrls(foundUrls);
        toast.success(`Discovered ${foundUrls.length} relevant candidate sources!`, {
          description: "Contrasting official circulars and third-party reports auto-populated.",
        });
      }
    } catch {
      toast.error("Failed to auto-discover sources.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddUrl = () => {
    if (urls.length >= 6) return;
    setUrls([...urls, ""]);
  };

  const handleRemoveUrl = (index: number) => {
    if (urls.length <= 1) {
      setUrls([""]);
      return;
    }
    const updated = urls.filter((_, i) => i !== index);
    setUrls(updated);
  };

  const handleUrlChange = (index: number, value: string) => {
    const updated = [...urls];
    updated[index] = value;
    setUrls(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit(e);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Subtle ambient gradient in card background */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Quick Preset Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {dict.presetsLabel}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {Object.values(DEMO_FIXTURES).map((fixture) => (
            <button
              key={fixture.id}
              type="button"
              onClick={() => onLoadFixture(fixture.id)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-700/80 hover:border-amber-500/60 hover:text-amber-300 hover:bg-zinc-800/80 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{fixture.name}</span>
              <Badge variant="outline" className="text-[10px] py-0 px-1 border-zinc-700 text-zinc-400">
                {fixture.badge}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Research Goal / Topic Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="research-topic"
              className="text-sm font-semibold text-zinc-200 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-amber-400" />
              {dict.goalLabel}
              <span className="text-amber-400">*</span>
            </label>
            <span className="text-xs text-zinc-400">
              e.g., Scholarships, Visas, Grant Guidelines
            </span>
          </div>
          <div className="relative">
            <Input
              id="research-topic"
              type="text"
              placeholder={dict.goalPlaceholder}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              className="w-full bg-zinc-900/90 border-zinc-750 border-zinc-700/80 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-amber-500/50 h-12 text-sm pl-4 pr-10 rounded-xl"
            />
            {topic && (
              <button
                type="button"
                onClick={() => setTopic("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Source URLs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              {dict.sourcesLabel}
              <Badge variant="secondary" className="text-[11px] bg-zinc-800 text-zinc-300">
                {urls.filter((u) => u.trim().length > 0).length} active
              </Badge>
            </label>
            <span className="text-xs text-zinc-400">
              {dict.sourcesSub}
            </span>
          </div>

          <div className="space-y-2.5">
            {urls.map((url, index) => (
              <div key={index} className="flex items-center gap-2 group">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 shrink-0">
                  {index + 1}
                </div>
                <Input
                  type="url"
                  placeholder={`https://source-${index + 1}-portal.org/guidelines...`}
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  disabled={isLoading}
                  className="bg-zinc-900/80 border-zinc-800 text-zinc-200 text-sm h-10 rounded-lg placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveUrl(index)}
                  disabled={isLoading || urls.length <= 1}
                  className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 h-10 w-10 shrink-0 rounded-lg transition-colors"
                  title="Remove Source"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddUrl}
                disabled={isLoading || urls.length >= 6}
                className="text-xs border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                {dict.addSource} ({urls.length}/6)
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAutoDiscover}
                disabled={isLoading || isSearching || !topic.trim()}
                className="text-xs border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin text-amber-400" />
                    {dict.discovering}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    {dict.autoDiscover}
                  </>
                )}
              </Button>
            </div>

            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Official circulars, portal URLs, or forums supported
            </span>
          </div>
        </div>

        {/* Alternative Raw Text Accordion */}
        <Accordion className="border border-zinc-800/80 rounded-xl bg-zinc-900/40 px-4">
          <AccordionItem value="raw-text" className="border-none">
            <AccordionTrigger className="py-3 text-xs font-medium text-zinc-300 hover:text-zinc-100 hover:no-underline">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                {dict.rawTextAccordion}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-4">
              <p className="text-xs text-zinc-400 mb-2">
                {dict.rawTextDesc}
              </p>
              <Textarea
                placeholder={dict.rawTextPlaceholder}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                disabled={isLoading}
                rows={4}
                className="bg-zinc-950/90 border-zinc-800 text-zinc-200 text-xs font-mono rounded-lg focus-visible:ring-purple-500/40 resize-y"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Submit & Scan Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full sm:flex-1 h-12 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-zinc-950 font-bold tracking-wide shadow-lg shadow-amber-500/20 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-zinc-950" />
                <span className="animate-pulse">{dict.submittingButton}</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{dict.submitButton}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/20 text-zinc-900 ml-1">
                  {dict.crossExamine}
                </span>
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onLoadFixture("daad_wise")}
            disabled={isLoading}
            className="w-full sm:w-auto h-12 px-5 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-medium rounded-xl flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>{dict.loadDemo}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
