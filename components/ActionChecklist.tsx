"use client";

import React, { useState } from "react";
import {
  ListTodo,
  Mail,
  Building2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationTask } from "@/lib/schema";
import { TranslationDict } from "@/lib/i18n";

interface ActionChecklistProps {
  checklist: VerificationTask[];
  onOpenInquiryModal: () => void;
  dict: TranslationDict;
}

export function ActionChecklist({
  checklist,
  onOpenInquiryModal,
  dict,
}: ActionChecklistProps) {
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  const toggleTask = (index: number) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReset = () => {
    setCompletedTasks({});
  };

  if (!checklist || checklist.length === 0) return null;

  const total = checklist.length;
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / total) * 100);

  return (
    <Card className="border border-zinc-800 bg-zinc-950/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
      <CardHeader className="p-5 sm:p-6 pb-4 border-b border-zinc-800/80 bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <ListTodo className="w-5 h-5" />
            </div>
            <CardTitle className="text-base sm:text-lg font-bold text-zinc-100">
              {dict.checklistTitle}
            </CardTitle>
          </div>
          <p className="text-xs text-zinc-400">
            {dict.checklistSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {completedCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-zinc-400 hover:text-zinc-200 h-8 px-2"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
          )}

          <Button
            type="button"
            onClick={onOpenInquiryModal}
            className="text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 h-9 px-4 rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{dict.generateDraftBtn}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 space-y-5">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-300">
              {dict.progressText} {completedCount} {dict.of} {total} {dict.confirmedOf}
            </span>
            <span className="font-mono font-bold text-amber-400">
              {progressPercent}%
            </span>
          </div>
          <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {checklist
            .sort((a, b) => a.priority - b.priority)
            .map((item, index) => {
              const isDone = Boolean(completedTasks[index]);

              return (
                <div
                  key={index}
                  onClick={() => toggleTask(index)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                    isDone
                      ? "bg-zinc-900/30 border-zinc-800/60 opacity-60"
                      : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 shadow-sm"
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleTask(index)}
                      className="w-4 h-4 rounded border-zinc-700 text-amber-500 focus:ring-amber-500/40 bg-zinc-800 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 ${
                          item.priority === 1
                            ? "bg-red-500/10 text-red-400 border-red-500/30"
                            : item.priority === 2
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        {dict.priority} {item.priority}
                      </Badge>

                      <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-zinc-400 font-medium truncate">
                          {dict.verifyWith} <strong className="text-zinc-300">{item.targetEntity}</strong>
                        </span>
                      </div>
                    </div>

                    <p
                      className={`text-sm text-zinc-200 leading-snug ${
                        isDone ? "line-through text-zinc-500" : ""
                      }`}
                    >
                      {item.task}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
