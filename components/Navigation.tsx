"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { features } from "@/lib/data";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-cream-dark">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-1">
        {features.map((f) => {
          const isActive = f.href === "/" ? pathname === "/" : pathname.startsWith(f.href);
          return (
            <Link
              key={f.id}
              href={f.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200"
              style={{
                color: isActive ? f.color : "#9A8E80",
              }}
            >
              <span className={`text-lg transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                {f.icon}
              </span>
              <span className="text-[10px] font-medium tracking-wide">
                {f.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
