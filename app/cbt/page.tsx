"use client";

import { useState, useEffect } from "react";
import { store, ThoughtRecord } from "@/lib/store";
import { cognitiveDistortions } from "@/lib/data";

export default function CBTPage() {
  const [records, setRecords] = useState<ThoughtRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [situation, setSituation] = useState("");
  const [thought, setThought] = useState("");
  const [emotion, setEmotion] = useState("");
  const [distortion, setDistortion] = useState("");
  const [evidence, setEvidence] = useState("");
  const [reframe, setReframe] = useState("");
  const [saved, setSaved] = useState(false);
  const [showDistortions, setShowDistortions] = useState(false);

  useEffect(() => {
    setRecords(store.getThoughtRecords());
  }, []);

  const handleSave = () => {
    if (!situation.trim() || !thought.trim()) return;
    const record: ThoughtRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      situation: situation.trim(),
      thought: thought.trim(),
      emotion: emotion.trim(),
      distortion,
      evidence: evidence.trim(),
      reframe: reframe.trim(),
    };
    store.saveThoughtRecord(record);
    setRecords(store.getThoughtRecords());
    setSituation("");
    setThought("");
    setEmotion("");
    setDistortion("");
    setEvidence("");
    setReframe("");
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowForm(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in px-5 pt-14 pb-6">
      <h1 className="text-xl font-bold text-primary font-heading mb-1">CBT Toolkit</h1>
      <div className="text-[11px] text-muted-light mb-6">
        Evidence-based tools for healthier thinking
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => { setShowForm(true); setShowDistortions(false); }}
          className="bg-cbt-light rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="text-lg mb-1">📝</div>
          <div className="text-[12px] font-bold text-primary">Thought Record</div>
          <div className="text-[10px] text-muted-light mt-0.5">Challenge a thought</div>
        </button>
        <button
          onClick={() => { setShowDistortions(true); setShowForm(false); }}
          className="bg-cbt-light rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="text-lg mb-1">🔍</div>
          <div className="text-[12px] font-bold text-primary">Distortions</div>
          <div className="text-[10px] text-muted-light mt-0.5">Identify patterns</div>
        </button>
      </div>

      {/* Thought Record Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 animate-fade-up">
          <div className="flex justify-between items-center mb-4">
            <div className="text-[11px] text-cbt tracking-[1px] uppercase">New Thought Record</div>
            <button onClick={() => setShowForm(false)} className="text-muted-light text-sm">✕</button>
          </div>

          {[
            { label: "Situation", value: situation, set: setSituation, placeholder: "What happened?", rows: 2 },
            { label: "Automatic Thought", value: thought, set: setThought, placeholder: "What went through your mind?", rows: 2 },
            { label: "Emotion", value: emotion, set: setEmotion, placeholder: "What did you feel? (e.g., anxious, sad, angry)", rows: 1 },
            { label: "Evidence Against", value: evidence, set: setEvidence, placeholder: "What evidence contradicts this thought?", rows: 2 },
            { label: "Balanced Reframe", value: reframe, set: setReframe, placeholder: "A more balanced way to see this...", rows: 2 },
          ].map((field) => (
            <div key={field.label} className="mb-3">
              <label className="text-[11px] text-muted block mb-1">{field.label}</label>
              <textarea
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows}
                className="w-full bg-cream rounded-xl px-3 py-2 text-[12px] outline-none resize-none focus:ring-2 focus:ring-cbt/30"
              />
            </div>
          ))}

          {/* Distortion picker */}
          <div className="mb-4">
            <label className="text-[11px] text-muted block mb-1">Cognitive Distortion</label>
            <div className="flex flex-wrap gap-1.5">
              {cognitiveDistortions.map((d) => (
                <button
                  key={d.name}
                  onClick={() => setDistortion(d.name)}
                  className="px-2.5 py-1 rounded-full text-[10px] transition-all duration-200"
                  style={{
                    background: distortion === d.name ? "#C47A7A" : "#F5E3E3",
                    color: distortion === d.name ? "white" : "#C47A7A",
                  }}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!situation.trim() || !thought.trim()}
            className="w-full bg-cbt text-white py-2.5 rounded-xl text-[12px] font-medium disabled:opacity-40 transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          >
            {saved ? "Saved ✓" : "Save Record"}
          </button>
        </div>
      )}

      {/* Distortions Guide */}
      {showDistortions && (
        <div className="mb-4 animate-fade-up">
          <div className="flex justify-between items-center mb-3">
            <div className="text-[11px] text-cbt tracking-[1px] uppercase">Cognitive Distortions</div>
            <button onClick={() => setShowDistortions(false)} className="text-muted-light text-sm">✕</button>
          </div>
          <div className="space-y-2">
            {cognitiveDistortions.map((d) => (
              <div key={d.name} className="bg-white rounded-xl p-3">
                <div className="text-[12px] font-bold text-primary mb-0.5">{d.name}</div>
                <div className="text-[11px] text-muted leading-relaxed">{d.description}</div>
                <div className="text-[10px] text-cbt italic mt-1">{d.example}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Records */}
      {records.length > 0 && !showForm && !showDistortions && (
        <div>
          <div className="text-[11px] text-muted tracking-[1px] uppercase mb-3">
            Past Records ({records.length})
          </div>
          <div className="space-y-2">
            {records.slice(0, 10).map((record) => (
              <div key={record.id} className="bg-white rounded-xl p-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-[12px] font-medium text-primary">{record.situation.slice(0, 60)}...</div>
                  <div className="text-[10px] text-muted-light">
                    {new Date(record.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </div>
                </div>
                {record.distortion && (
                  <span className="inline-block bg-cbt-light text-cbt text-[10px] px-2 py-0.5 rounded-full">
                    {record.distortion}
                  </span>
                )}
                {record.reframe && (
                  <div className="text-[11px] text-journal italic mt-1.5">
                    ↳ {record.reframe.slice(0, 80)}...
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
