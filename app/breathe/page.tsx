"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { breathingTechniques } from "@/lib/data";

export default function BreathePage() {
  const [technique, setTechnique] = useState(breathingTechniques[0]);
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalCycles, setTotalCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentPhase = technique.phases[phaseIndex];

  const cleanup = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
  }, []);

  const advancePhase = useCallback(() => {
    setPhaseIndex((prev) => {
      const next = (prev + 1) % technique.phases.length;
      if (next === 0) setTotalCycles((c) => c + 1);
      return next;
    });
  }, [technique.phases.length]);

  useEffect(() => {
    if (!isActive) {
      cleanup();
      return;
    }

    const duration = currentPhase.duration;
    setTimeLeft(duration);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    phaseTimerRef.current = setTimeout(() => {
      advancePhase();
    }, duration * 1000);

    return cleanup;
  }, [isActive, phaseIndex, currentPhase.duration, advancePhase, cleanup]);

  const handleStart = () => {
    setPhaseIndex(0);
    setTotalCycles(0);
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setTimeLeft(0);
  };

  const handleTechniqueChange = (t: typeof technique) => {
    handleStop();
    setTechnique(t);
  };

  const orbScale = isActive
    ? currentPhase.label.toLowerCase().includes("inhale")
      ? "scale-[1.4]"
      : currentPhase.label.toLowerCase().includes("exhale")
      ? "scale-[0.85]"
      : "scale-[1.2]"
    : "scale-100";

  const orbTransition = isActive ? `transform ${currentPhase.duration}s ease-in-out` : "transform 0.5s ease";

  return (
    <div className="animate-fade-in px-5 pt-14 pb-6 text-center">
      {/* Header */}
      <h1 className="text-xl font-bold text-primary font-heading mb-1">Breathe</h1>
      <div className="text-[11px] text-muted-light mb-8">
        {technique.name} · {technique.phases.map((p) => p.duration).join("–")}
      </div>

      {/* Breathing Orb */}
      <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">
        {/* Outer glow */}
        <div
          className={`absolute w-full h-full rounded-full transition-all ${orbScale} ${isActive ? "" : "animate-pulse-slow"}`}
          style={{
            background: "radial-gradient(circle, rgba(139,157,195,0.2) 0%, transparent 70%)",
            transition: orbTransition,
          }}
        />
        {/* Middle ring */}
        <div
          className={`absolute w-[85%] h-[85%] rounded-full transition-all ${orbScale}`}
          style={{
            background: "radial-gradient(circle, rgba(139,157,195,0.3) 0%, rgba(139,157,195,0.1) 100%)",
            transition: orbTransition,
          }}
        />
        {/* Inner orb */}
        <div
          className={`absolute w-[65%] h-[65%] rounded-full transition-all ${orbScale}`}
          style={{
            background: "radial-gradient(circle, #C3D4E8 0%, #8B9DC3 100%)",
            boxShadow: "0 0 40px rgba(139,157,195,0.4)",
            transition: orbTransition,
          }}
        />
        {/* Label */}
        <div className="relative z-10 text-center">
          {isActive ? (
            <>
              <div className="text-[14px] font-bold text-primary/80">
                {currentPhase.label}
              </div>
              <div className="text-[24px] font-bold text-breathe mt-1">{timeLeft}</div>
            </>
          ) : (
            <div className="text-[13px] font-medium text-primary/50">
              Tap start
            </div>
          )}
        </div>
      </div>

      {/* Start/Stop */}
      <button
        onClick={isActive ? handleStop : handleStart}
        className="mb-6 px-8 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 active:scale-95"
        style={{
          background: isActive ? "#C47A7A" : "#8B9DC3",
          color: "white",
        }}
      >
        {isActive ? "Stop" : "Start"}
      </button>

      {/* Cycles counter */}
      {totalCycles > 0 && (
        <div className="text-[11px] text-muted-light mb-6">
          {totalCycles} cycle{totalCycles !== 1 ? "s" : ""} completed
        </div>
      )}

      {/* Technique Switcher */}
      <div className="flex justify-center gap-2 mb-8">
        {breathingTechniques.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTechniqueChange(t)}
            className="px-4 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200"
            style={{
              background: technique.id === t.id ? "#8B9DC3" : "#E0E6F3",
              color: technique.id === t.id ? "white" : "#555",
            }}
          >
            {t.name.replace(" Breathing", "")}
          </button>
        ))}
      </div>

      {/* Technique Info */}
      <div className="bg-breathe-light rounded-2xl p-4 text-left">
        <div className="text-[13px] font-bold text-primary mb-1 font-heading text-lg">
          {technique.name}
        </div>
        <div className="text-[12px] text-muted leading-relaxed">
          {technique.description}
        </div>
        <div className="flex gap-2 mt-3">
          {technique.phases.map((p, i) => (
            <div
              key={i}
              className="flex-1 rounded-xl p-2 text-center"
              style={{
                background: isActive && phaseIndex === i ? "#8B9DC3" : "white",
                color: isActive && phaseIndex === i ? "white" : "#555",
              }}
            >
              <div className="text-[10px] font-medium">{p.label}</div>
              <div className="text-[14px] font-bold">{p.duration}s</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
