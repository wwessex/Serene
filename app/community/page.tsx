"use client";

import { crisisResources } from "@/lib/data";

const topics = [
  { name: "Anxiety & Worry", members: "2.4k", color: "#C47A7A", icon: "💭" },
  { name: "Work Stress", members: "1.8k", color: "#D4A574", icon: "💼" },
  { name: "Self-Esteem", members: "1.2k", color: "#9B7EC8", icon: "🌱" },
  { name: "Relationships", members: "1.5k", color: "#7A9E87", icon: "💛" },
  { name: "Sleep Issues", members: "980", color: "#8B9DC3", icon: "🌙" },
  { name: "Grief & Loss", members: "760", color: "#C4A44A", icon: "🕊️" },
];

export default function CommunityPage() {
  return (
    <div className="animate-fade-in px-5 pt-14 pb-6">
      <h1 className="text-xl font-bold text-primary font-heading mb-1">Safe Space</h1>
      <div className="text-[11px] text-muted-light mb-6">
        Anonymous peer support — you&apos;re never alone
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-community-light rounded-2xl p-5 mb-5 text-center">
        <div className="text-2xl mb-2">⬡</div>
        <div className="text-[15px] font-bold text-primary font-heading mb-2">
          Community Coming Soon
        </div>
        <div className="text-[12px] text-muted leading-relaxed max-w-xs mx-auto">
          We&apos;re building a safe, moderated space for peer support. Anonymous by default, human-first always.
        </div>
      </div>

      {/* Preview: Support Groups */}
      <div className="text-[11px] text-muted tracking-[1px] uppercase mb-3">
        Support Groups (Preview)
      </div>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {topics.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-xl p-3 opacity-80 transition-all duration-200 hover:opacity-100"
          >
            <div className="text-lg mb-1">{t.icon}</div>
            <div className="text-[12px] font-bold text-primary">{t.name}</div>
            <div className="text-[10px] text-muted-light">{t.members} members</div>
          </div>
        ))}
      </div>

      {/* Features list */}
      <div className="text-[11px] text-muted tracking-[1px] uppercase mb-3">
        What to Expect
      </div>
      <div className="space-y-2 mb-6">
        {[
          "Topic-based anonymous support groups",
          "Peer-to-peer encouragement threads",
          "Moderated by trained volunteers",
          "Crisis escalation & signposting",
          "Weekly themed community challenges",
        ].map((feature, i) => (
          <div key={i} className="flex gap-2.5 items-center bg-white rounded-xl px-3 py-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-community flex-shrink-0" />
            <span className="text-[12px] text-primary/70">{feature}</span>
          </div>
        ))}
      </div>

      {/* Crisis Resources */}
      <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-5 text-white">
        <h3 className="font-heading text-lg font-semibold mb-1">Need Immediate Support?</h3>
        <p className="text-[11px] text-white/60 mb-4">
          If you&apos;re in crisis, please reach out to one of these services.
        </p>
        <div className="space-y-2.5">
          {crisisResources.map((r) => (
            <div key={r.name} className="flex justify-between items-start">
              <div>
                <div className="text-[12px] font-medium">{r.name}</div>
                <div className="text-[10px] text-white/50">{r.description}</div>
              </div>
              <div className="text-[12px] font-bold text-accent whitespace-nowrap ml-3">
                {r.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
