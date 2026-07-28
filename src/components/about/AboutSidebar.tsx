"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "philosophy",      label: "브랜드 철학" },
  { id: "solution",        label: "공간 솔루션" },
  { id: "history",         label: "회사 연혁" },
  { id: "certifications",  label: "인증·특허" },
  { id: "manufacturing",   label: "제조 설비" },
];

export default function AboutSidebar() {
  const [activeId, setActiveId] = useState<string>("philosophy");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -50% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <aside className="hidden lg:block">
      {/* pt-14 matches the main content's top padding so the sidebar frame's
          top edge lines up with the content's top edge. */}
      <div className="sticky top-20 pt-14 pb-8 px-3">
        <div className="border border-[#e0dbd4] rounded-xl shadow-sm bg-white">
          <div className="px-7 pt-8 pb-5">
            <p className="text-[15px] font-bold text-ink">회사소개</p>
          </div>

          <nav aria-label="회사소개 섹션" className="pb-4">
            <ul>
              {SECTIONS.map(({ id, label }) => {
                const active = activeId === id;
                return (
                  <li key={id}>
                    <div className="relative flex items-center">
                      {active && (
                        <span className="absolute left-0 inset-y-0 w-0.75 bg-ink z-10" />
                      )}
                      <button
                        onClick={() => scrollTo(id)}
                        className={`flex-1 text-left px-7 py-3.5 text-[15px] transition-colors ${
                          active ? "font-bold text-ink" : "text-body hover:text-ink"
                        }`}
                      >
                        {label}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
