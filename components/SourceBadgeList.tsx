"use client";

import React from "react";
import {
  ExternalLink,
  CalendarClock,
  AlertTriangle,
  CheckCircle2,
  Globe2,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnalyzedSource } from "@/lib/schema";
import { TranslationDict } from "@/lib/i18n";

interface SourceBadgeListProps {
  sources: AnalyzedSource[];
  dict: TranslationDict;
}

export function SourceBadgeList({ sources, dict }: SourceBadgeListProps) {
  if (!sources || sources.length === 0) return null;

  const outdatedCount = sources.filter((s) => s.isOutdated).length;

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            {dict.dossierTitle} ({sources.length})
          </h3>
        </div>
        {outdatedCount > 0 ? (
          <Badge
            variant="outline"
            className="border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs flex items-center gap-1.5 py-0.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{outdatedCount} {dict.staleCycleWarning}</span>
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-1.5 py-0.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{dict.allActiveWarning}</span>
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {sources.map((source, index) => {
          const isUrl =
            source.url.startsWith("http://") || source.url.startsWith("https://");
          const displayDomain = isUrl
            ? new URL(source.url).hostname.replace("www.", "")
            : dict.textInput;

          return (
            <Card
              key={source.id || index}
              className={`relative overflow-hidden border transition-all duration-200 bg-zinc-900/70 hover:bg-zinc-900 ${
                source.isOutdated
                  ? "border-amber-500/30 hover:border-amber-500/60 shadow-sm shadow-amber-500/5"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {/* Subtle top indicator bar */}
              <div
                className={`h-1 w-full ${
                  source.isOutdated ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />

              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                      [{source.id || `Source ${index + 1}`}]
                    </span>
                    <span className="text-[11px] text-zinc-400 truncate max-w-[140px]">
                      {displayDomain}
                    </span>
                  </div>

                  {source.isOutdated ? (
                    <Badge
                      variant="destructive"
                      className="bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30 text-[10px] font-semibold py-0.5"
                    >
                      <AlertTriangle className="w-3 h-3 mr-1 text-amber-400" />
                      {dict.staleBadge}
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] font-semibold py-0.5"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" />
                      {dict.activeBadge}
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-zinc-100 line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {source.title || "Source Reference Document"}
                  </h4>
                </div>

                <div className="pt-1 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <CalendarClock className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-mono text-[11px]">
                      {source.detectedDate || dict.undated}
                    </span>
                  </div>

                  {isUrl ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 hover:underline transition-colors ml-auto"
                    >
                      <span>{dict.inspect}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
                      <FileText className="w-3 h-3" />
                      <span>{dict.textInput}</span>
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
