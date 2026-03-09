"use client";

import { useState, useEffect } from "react";
import { store, SleepLog } from "@/lib/store";
import { sleepTips } from "@/lib/data";

export default function SleepPage() {
  const [logs, setLogs] = useState<SleepLog[]>([]);
  const [quality, setQuality] = useState(3);
  const [duration, setDuration] = useState("7.5");
  const [bedtime, setBedtime] = useState("22:30");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    setLogs(store.getSleepLogs());
    setTipIndex(Math.floor(Math.random() * sleepTips.length));
  }, []);

  const handleSave = () => {
    const log: SleepLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      quality,
      duration: parseFloat(duration) || 0,
      bedtime,
      notes: notes.trim(),
    };
    store.saveSleepLog(log);
    setLogs(store.getSleepLogs());
    setNotes("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const qualityLabels = ["", "Poor", "Fair", "Okay", "Good", "Great"];

  return (
    <div className="animate-fade-in px-5 pt-14 pb-6">
      <h1 className="text-xl font-bold text-primary font-heading mb-1">Sleep Sanctuary</h1>
      <div className="text-[11px] text-muted-light mb-6">Track your rest, improve your nights</div>

      {/* Tonight's tip */}
      <div className="bg-sleep-light rounded-2xl p-4 mb-4">
        <div className="text-[10px] text-sleep tracking-[1px] uppercase mb-2">Tonight&apos;s Tip</div>
        <div className="text-[13px] text-primary font-medium">{sleepTips[tipIndex]}</div>
      </div>

      {/* Log Form */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <div className="text-[11px] text-sleep tracking-[1px] uppercase mb-4">Log Last Night</div>

        {/* Quality */}
        <div className="mb-4">
          <label className="text-[12px] text-muted block mb-2">
            Sleep quality: <span className="font-medium text-primary">{qualityLabels[quality]}</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className="flex-1 py-2 rounded-xl text-[12px] font-medium transition-all duration-200"
                style={{
                  background: quality >= q ? "#9B7EC8" : "#EDE4F5",
                  color: quality >= q ? "white" : "#9B7EC8",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="text-[12px] text-muted block mb-2">
            Hours slept
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            max="14"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-cream rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sleep/30"
          />
        </div>

        {/* Bedtime */}
        <div className="mb-4">
          <label className="text-[12px] text-muted block mb-2">
            Bedtime
          </label>
          <input
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            className="w-full bg-cream rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sleep/30"
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="text-[12px] text-muted block mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did you sleep? Any dreams?"
            rows={2}
            className="w-full bg-cream rounded-xl px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-sleep/30"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-sleep text-white py-2.5 rounded-xl text-[12px] font-medium transition-all duration-200 hover:shadow-md active:scale-[0.98]"
        >
          {saved ? "Saved ✓" : "Log Sleep"}
        </button>
      </div>

      {/* History */}
      {logs.length > 0 && (
        <div>
          <div className="text-[11px] text-muted tracking-[1px] uppercase mb-3">
            Recent Nights
          </div>
          <div className="space-y-2">
            {logs.slice(0, 7).map((log) => (
              <div key={log.id} className="bg-white rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="text-[12px] text-primary font-medium">{log.date}</div>
                  <div className="text-[11px] text-muted-light">
                    {log.duration}h · Bed at {log.bedtime}
                  </div>
                </div>
                <div className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{
                  background: log.quality >= 4 ? "#E3EDE6" : log.quality >= 3 ? "#F5EDD3" : "#F5E3E3",
                  color: log.quality >= 4 ? "#7A9E87" : log.quality >= 3 ? "#C4A44A" : "#C47A7A",
                }}>
                  {qualityLabels[log.quality]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
