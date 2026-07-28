"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { end: 2000, suffix: "년",  label: "창 립" },
  { end: 2500, suffix: "+",   label: "시공 실적" },
  { end: 20,   suffix: "+",   label: "보유 특허" },
  { end: 24,   suffix: "H",   label: "A/S 대응" },
];

export default function StatsSection() {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const triggers = STATS.map((stat, i) => {
      const el = numRefs.current[i];
      if (!el) return null;
      const obj = { val: 0 };
      return ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: stat.end,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString(); },
          });
        },
      });
    });
    return () => triggers.forEach((t) => t?.kill());
  }, []);

  return (
    <section className="bg-white py-20 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[#E0E0E0]">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center text-center md:py-4">
              <div className="flex items-end gap-1 mb-2">
                <span
                  ref={(el) => { numRefs.current[i] = el; }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] tabular-nums"
                >
                  0
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#111111] mb-1">{stat.suffix}</span>
              </div>
              <span className="text-[11px] tracking-[0.16em] text-[#888888] uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
