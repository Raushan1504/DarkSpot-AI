"use client";

import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Languages,
  Send,
  Sparkles,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryDraft: {
    recipientPlaceholder: string;
    subject: {
      en: string;
      fr: string;
      es?: string;
      de?: string;
      hi?: string;
    };
    body: {
      en: string;
      fr: string;
      es?: string;
      de?: string;
      hi?: string;
    };
  };
  topic: string;
  activeLang?: LangKey;
}

type LangKey = "en" | "fr" | "es" | "de" | "hi";

const LANGUAGE_CONFIG: { key: LangKey; label: string; code: string; flag: string }[] = [
  { key: "en", label: "English", code: "EN", flag: "🇬🇧" },
  { key: "fr", label: "Français", code: "FR", flag: "🇫🇷" },
  { key: "es", label: "Español", code: "ES", flag: "🇪🇸" },
  { key: "de", label: "Deutsch", code: "DE", flag: "🇩🇪" },
  { key: "hi", label: "हिन्दी", code: "HI", flag: "🇮🇳" },
];

export function InquiryModal({
  isOpen,
  onClose,
  inquiryDraft,
  topic,
  activeLang = "en",
}: InquiryModalProps) {
  const [selectedLang, setSelectedLang] = useState<LangKey>(activeLang);
  const [recipient, setRecipient] = useState<string>(
    inquiryDraft.recipientPlaceholder || "Official Coordinator / Helpdesk"
  );
  const [userSubjectOverrides, setUserSubjectOverrides] = useState<Record<string, string>>({});
  const [userBodyOverrides, setUserBodyOverrides] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<boolean>(false);

  // Derived subject and body based on active language tab, allowing user in-place edits per language
  const activeSubject =
    userSubjectOverrides[selectedLang] ??
    (inquiryDraft.subject[selectedLang] || inquiryDraft.subject.en || "");

  const activeBody =
    userBodyOverrides[selectedLang] ??
    (inquiryDraft.body[selectedLang] || inquiryDraft.body.en || "");

  const handleCopy = async () => {
    try {
      const fullDraft = `To: ${recipient}\nSubject: ${activeSubject}\n\n${activeBody}`;
      await navigator.clipboard.writeText(fullDraft);
      setCopied(true);
      toast.success("Official inquiry draft copied to clipboard!", {
        description: `Draft in ${LANGUAGE_CONFIG.find((l) => l.key === selectedLang)?.label} ready to paste.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  const handleMailto = () => {
    const encodedSubject = encodeURIComponent(activeSubject);
    const encodedBody = encodeURIComponent(activeBody);
    const mailtoUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
    window.open(mailtoUrl, "_blank");
    toast.info("Opening system email client with pre-drafted inquiry...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 text-zinc-100 p-6 rounded-2xl shadow-2xl">
        <DialogHeader className="space-y-1.5 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                Official Inquiry Generator
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-[10px]"
                >
                  Epistemic Clarification
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400">
                Formal clarification letter addressing the gaps identified for &ldquo;{topic}&rdquo;.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Language Selection Pills */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              Target Ingestion Language:
            </span>
            <span className="text-[11px] text-zinc-500">
              Multi-lingual Epistemic Access
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/90 rounded-xl border border-zinc-800">
            {LANGUAGE_CONFIG.map((lang) => {
              const isSelected = selectedLang === lang.key;
              const hasTranslation =
                Boolean(inquiryDraft.subject[lang.key]) &&
                Boolean(inquiryDraft.body[lang.key]);

              return (
                <button
                  key={lang.key}
                  type="button"
                  onClick={() => setSelectedLang(lang.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  <span
                    className={`text-[10px] uppercase font-mono px-1 rounded ${
                      isSelected
                        ? "bg-black/20 text-zinc-950"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {lang.code}
                  </span>
                  {!hasTranslation && lang.key !== "en" && (
                    <span className="text-[9px] text-amber-300/80">(AI fallback)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Email Form Fields */}
        <div className="space-y-4 pt-1">
          {/* Recipient */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Target Official Recipient / Helpdesk</span>
              <span className="text-[11px] text-zinc-500">Editable</span>
            </label>
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. info@daaddelhi.org / visa-inquiry@embassy.gov"
              className="bg-zinc-900 border-zinc-800 text-zinc-200 text-xs h-9 rounded-lg"
            />
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Email Subject Line</span>
              <span className="text-[11px] text-zinc-500">Includes Audit Topic</span>
            </label>
            <Input
              value={activeSubject}
              onChange={(e) =>
                setUserSubjectOverrides((prev) => ({
                  ...prev,
                  [selectedLang]: e.target.value,
                }))
              }
              className="bg-zinc-900 border-zinc-800 text-zinc-200 text-xs font-medium h-9 rounded-lg"
            />
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300">
                Formal Clarification Letter Body
              </label>
              <span className="text-[11px] text-amber-400/90 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Derived from discovered Dark Spots & Contradictions
              </span>
            </div>
            <Textarea
              value={activeBody}
              onChange={(e) =>
                setUserBodyOverrides((prev) => ({
                  ...prev,
                  [selectedLang]: e.target.value,
                }))
              }
              rows={9}
              className="bg-zinc-900 border-zinc-800 text-zinc-200 text-xs leading-relaxed font-mono rounded-xl p-3 resize-y focus-visible:ring-amber-500/50"
            />
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5 text-xs text-zinc-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-snug">
              <strong className="text-zinc-200">Tip for Hackathon Demonstration:</strong>{" "}
              Sending this targeted inquiry protects applicants against retroactive visa disqualifications by securing written precedent before deadlines close.
            </p>
          </div>
        </div>

        {/* Actions Footer */}
        <DialogFooter className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
          >
            Close
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="flex-1 sm:flex-none text-xs border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Draft</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleMailto}
              className="flex-1 sm:flex-none text-xs bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send via Mail Client</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
