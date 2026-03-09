"use client";

import { useState, useEffect, useMemo } from "react";
import { store, JournalEntry } from "@/lib/store";
import { journalPrompts, moods } from "@/lib/data";

type Mode = "gratitude" | "reframe" | "reflection";

export default function JournalPage() {
  const [mode, setMode] = useState<Mode>("reflection");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setEntries(store.getJournalEntries());
  }, []);

  const prompt = useMemo(() => {
    const prompts = journalPrompts[mode];
    return prompts[Math.floor(Math.random() * prompts.length)];
  }, [mode]);

  const handleSave = () => {
    if (!content.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: content.trim(),
      mood: selectedMood || "Neutral",
      mode,
      prompt,
    };
    store.saveJournalEntry(entry);
    setEntries(store.getJournalEntries());
    setContent("");
    setSelectedMood("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  };

  return (
    <div className="animate-fade-in px-5 pt-14 pb-6">
      {/* Header */}
      <div className="mb-1">
        <h1 className="text-xl font-bold text-primary font-heading">Journal</h1>
        <div className="flex items-center gap-2 text-[11px] text-muted-light">
          <span>Private &amp; encrypted</span>
          <span className="inline-block w-3 h-3 bg-journal/20 rounded-full text-[8px] text-journal flex items-center justify-center">🔒</span>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-2 my-4">
        {(["gratitude", "reframe", "reflection"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-medium capitalize transition-all duration-200"
            style={{
              background: mode === m ? "#7A9E87" : "#E3EDE6",
              color: mode === m ? "white" : "#7A9E87",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Prompt + Entry */}
      <div className="bg-journal-light rounded-2xl p-4 mb-4">
        <div className="text-[11px] text-journal mb-3 italic font-heading text-base">
          &ldquo;{prompt}&rdquo;
        </div>

        {/* Mood selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => setSelectedMood(m.label)}
              className="px-2 py-1 rounded-full text-[10px] transition-all duration-200"
              style={{
                background: selectedMood === m.label ? m.color : "rgba(255,255,255,0.7)",
                color: selectedMood === m.label ? "white" : "#555",
              }}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          rows={5}
          className="w-full bg-white rounded-xl p-3 text-[13px] text-primary/80 leading-relaxed outline-none resize-none focus:ring-2 focus:ring-journal/30"
        />

        <div className="flex justify-between items-center mt-3">
          <span className="text-[10px] text-muted-light">
            {content.length} characters
          </span>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="bg-journal text-white px-5 py-2 rounded-xl text-[12px] font-medium disabled:opacity-40 transition-all duration-200 hover:shadow-md active:scale-95"
          >
            {saved ? "Saved ✓" : "Save Entry"}
          </button>
        </div>
      </div>

      {/* Past Entries */}
      {entries.length > 0 && (
        <div>
          <div className="text-[11px] text-muted tracking-[1px] uppercase mb-3">
            Past Entries
          </div>
          <div className="space-y-1">
            {entries.slice(0, 10).map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center py-2.5 border-b border-cream-dark"
              >
                <div>
                  <span className="text-[12px] text-primary/70">
                    {formatDate(entry.date)}
                  </span>
                  <span className="text-[11px] text-muted-light ml-2 capitalize">
                    {entry.mode}
                  </span>
                </div>
                <span className="text-[12px] text-accent">{entry.mood}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
