"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { store, MoodEntry } from "@/lib/store";
import { moods } from "@/lib/data";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getDateString(): string {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function Home() {
  const [todayMood, setTodayMood] = useState<MoodEntry | undefined>();
  const [streak, setStreak] = useState(0);
  const [name, setName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    setTodayMood(store.getTodayMood());
    setStreak(store.getStreak());
    const settings = store.getSettings();
    setName(settings.name);
    if (!settings.name) setShowNameInput(true);
  }, []);

  const handleMoodSelect = (mood: (typeof moods)[0]) => {
    const entry: MoodEntry = {
      date: new Date().toISOString().split("T")[0],
      mood: mood.label,
      timestamp: Date.now(),
    };
    store.saveMood(entry);
    setTodayMood(entry);
    setStreak(store.getStreak());
  };

  const handleNameSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      store.saveSettings({ ...store.getSettings(), name: name.trim() });
      setShowNameInput(false);
    }
  };

  return (
    <div className="animate-fade-in px-5 pt-14 pb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-[11px] text-muted-light tracking-[2px] uppercase">
            {getDateString()}
          </div>
          <div className="text-lg font-bold text-primary mt-0.5 font-heading">
            {getGreeting()}{name ? `, ${name}` : ""}.
          </div>
        </div>
        <button
          onClick={() => setShowNameInput(!showNameInput)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm text-white font-medium"
          style={{ background: "linear-gradient(135deg, #D4A574, #C47A7A)" }}
        >
          {name ? name[0].toUpperCase() : "?"}
        </button>
      </div>

      {/* Name input */}
      {showNameInput && (
        <form onSubmit={handleNameSave} className="mb-4 animate-fade-up">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-[11px] text-muted tracking-[1px] uppercase block mb-2">
              What should we call you?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="flex-1 bg-cream rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
              />
              <button
                type="submit"
                className="bg-primary text-cream px-4 py-2 rounded-xl text-sm font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Mood Check-in */}
      <div
        className="rounded-2xl p-5 mb-4 text-white"
        style={{ background: "linear-gradient(135deg, #D4A574 0%, #C4905A 100%)" }}
      >
        <div className="text-[11px] opacity-80 tracking-[1.5px] uppercase mb-1.5">
          Today&apos;s Check-in
        </div>
        {todayMood ? (
          <div>
            <div className="text-[15px] font-bold mb-1">
              You&apos;re feeling {todayMood.mood.toLowerCase()} today
            </div>
            <div className="text-[12px] opacity-70">
              Check in again tomorrow to keep your streak going
            </div>
          </div>
        ) : (
          <>
            <div className="text-[15px] font-bold mb-3">How are you feeling?</div>
            <div className="flex flex-wrap gap-2">
              {moods.slice(0, 4).map((m) => (
                <button
                  key={m.label}
                  onClick={() => handleMoodSelect(m)}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-[11px] hover:bg-white/30 transition-all duration-200 active:scale-95"
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Link href="/journal" className="group">
          <div className="bg-journal-light rounded-2xl p-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
            <div className="text-[10px] text-journal tracking-[1px] uppercase mb-1">
              Journal Streak
            </div>
            <div className="text-2xl font-bold text-primary">
              {streak} <span className="text-xs font-normal">days</span>
            </div>
          </div>
        </Link>
        <Link href="/sleep" className="group">
          <div className="bg-sleep-light rounded-2xl p-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
            <div className="text-[10px] text-sleep tracking-[1px] uppercase mb-1">
              Sleep
            </div>
            <div className="text-sm font-bold text-primary">
              Wind-down
              <br />
              <span className="font-normal text-xs">at 10:00 PM</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Suggested Action */}
      <Link href="/breathe" className="block group">
        <div className="bg-cream-dark rounded-2xl p-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
          <div className="text-[10px] text-accent-dark tracking-[1px] uppercase mb-2">
            Suggested for Now
          </div>
          <div className="text-[13px] text-primary font-bold mb-1">
            5-min Breathing Reset
          </div>
          <div className="text-[11px] text-muted-light">
            Based on your mood patterns this week
          </div>
        </div>
      </Link>

      {/* Quick Links */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { href: "/journal", label: "Journal", icon: "✦", bg: "bg-journal-light", color: "text-journal" },
          { href: "/cbt", label: "CBT Tools", icon: "△", bg: "bg-cbt-light", color: "text-cbt" },
          { href: "/community", label: "Community", icon: "⬡", bg: "bg-community-light", color: "text-community" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <div className={`${item.bg} rounded-2xl p-3 text-center transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md`}>
              <div className={`text-xl mb-1 ${item.color}`}>{item.icon}</div>
              <div className="text-[10px] font-medium text-primary">{item.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
