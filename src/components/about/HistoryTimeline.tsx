"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

type EventTag = "창업" | "등록" | "인증" | "특허" | "합병" | "출범" | "기타";

const TAG_DOT: Record<EventTag, string> = {
  창업: "#111111",
  출범: "#1D3557",
  합병: "#333333",
  특허: "#1D3557",
  인증: "#888880",
  등록: "#b0afa9",
  기타: "#cccccc",
};

type HistoryItem = {
  year: string;
  milestone?: boolean;
  events: { month: string; event: string; tag: EventTag }[];
};

const HISTORY: HistoryItem[] = [
  {
    year: "1986",
    milestone: true,
    events: [
      { month: "03", event: "신암건영 창업", tag: "창업" },
      { month: "04", event: "공장등록", tag: "등록" },
    ],
  },
  {
    year: "2014",
    milestone: true,
    events: [
      { month: "02", event: "탑판넬 창업", tag: "창업" },
      { month: "04", event: "제1공장등록", tag: "등록" },
      { month: "10", event: "여성기업확인", tag: "인증" },
      { month: "10", event: "ISO9001 인증", tag: "인증" },
      { month: "12", event: "나라장터 종합쇼핑몰 물품등록", tag: "등록" },
    ],
  },
  {
    year: "2015",
    events: [
      { month: "02", event: "디자인등록 (제30-0786685호)", tag: "등록" },
      { month: "02", event: "디자인등록 (제30-0786751호)", tag: "등록" },
    ],
  },
  {
    year: "2016",
    events: [
      { month: "02", event: "기업부설연구소 개설", tag: "기타" },
      { month: "11", event: "벤처기업인증", tag: "인증" },
      { month: "12", event: "환경표지인증 (화장실칸막이)", tag: "인증" },
      { month: "12", event: "환경표지인증 (실내벽체마감패널)", tag: "인증" },
    ],
  },
  {
    year: "2018",
    events: [
      { month: "06", event: "제2공장 공장등록", tag: "등록" },
      { month: "09", event: "특허등록 (제10-1896241호)", tag: "특허" },
      { month: "12", event: "디자인등록 (제30-0985116호)", tag: "등록" },
    ],
  },
  {
    year: "2019",
    milestone: true,
    events: [
      { month: "03", event: "직접생산확인인증", tag: "인증" },
      { month: "06", event: "탑판넬·신암건영 합병", tag: "합병" },
      { month: "06", event: "탑판넬 주식회사 법인설립", tag: "창업" },
    ],
  },
  {
    year: "2020",
    events: [
      { month: "12", event: "Q마크·품질인증지정", tag: "인증" },
    ],
  },
  {
    year: "2026",
    milestone: true,
    events: [
      { month: "01", event: "큐비클유니버스 출범", tag: "출범" },
      { month: "04", event: "특허등록 (제10-2959054호)", tag: "특허" },
      { month: "06", event: "특허등록 (10-2025-0067469)", tag: "특허" },
    ],
  },
];

/* ── Animated stat counter ──────────────────────────────────────────────── */
function StatCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [triggered, setTriggered] = useState(false);

  const spring = useSpring(0, { stiffness: 60, damping: 14 });
  const display = useTransform(spring, (v) => Math.floor(v));

  useEffect(() => {
    if (inView && !triggered) {
      spring.set(value);
      setTriggered(true);
    }
  }, [inView, triggered, spring, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="text-3xl font-black text-[#111111] tracking-tight tabular-nums flex justify-center items-end gap-0.5">
        <motion.span>{display}</motion.span>
        <span className="text-2xl">+</span>
      </div>
      <p className="text-[11px] text-[#888880] tracking-widest mt-1.5 uppercase">{label}</p>
    </motion.div>
  );
}

/* ── Single "partition panel" — the history row is built like a real toilet-
   cubicle wall: narrow panels standing side by side, a nameplate at the top
   of each (like a stall door plate) and a hinge dot on every joint between
   panels. Milestone years get the same brushed-steel accent bar used to call
   out the SUS 안심스크린 hardware elsewhere on the site. ────────────────────── */
function Panel({ item, isLast, index }: { item: HistoryItem; isLast: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMilestone = !!item.milestone;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      className={`relative w-42 lg:w-auto shrink-0 lg:shrink flex flex-col ${
        !isLast ? "border-r border-[#e0dbd4]" : ""
      }`}
    >
      {/* joint hinge */}
      {!isLast && (
        <span className="hidden lg:block absolute -right-0.75 top-11 w-1.5 h-1.5 rounded-full bg-[#c8c4be] z-10" />
      )}

      {/* accent bar — brushed-steel for milestones, flat for regular years */}
      <div
        className="h-1 w-full shrink-0"
        style={
          isMilestone
            ? { background: "linear-gradient(90deg, #9aa1a8, #eef0f2, #9aa1a8)" }
            : { background: "#e8e4de" }
        }
      />

      {/* nameplate — the small red dot echoes the door-lock indicator in the
          reference photo above, marking milestone years like an "occupied" light. */}
      <div className={`relative px-4 py-4 text-center ${isMilestone ? "bg-ink text-white" : "bg-[#f5f2ee] text-ink"}`}>
        {isMilestone && (
          <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#c0392b] ring-2 ring-white/25" />
        )}
        <span className="text-xl font-black tracking-tight tabular-nums">{item.year}</span>
      </div>

      {/* events */}
      <div className="flex-1 px-4 py-5 space-y-3.5 bg-white">
        {item.events.map((ev, i) => (
          <div key={i} className="flex items-start gap-1.5 text-[11px] leading-snug">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1"
              style={{ background: TAG_DOT[ev.tag] }}
            />
            <div className="min-w-0">
              <span className="tabular-nums text-muted">{ev.month}월</span>
              <p className="text-body">{ev.event}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export default function HistoryTimeline() {
  return (
    <div>
      <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
        <div className="flex lg:grid lg:grid-cols-8 border border-[#e0dbd4] border-b-2 border-b-[#d4d0cb]">
          {HISTORY.map((item, i) => (
            <Panel key={item.year} item={item} isLast={i === HISTORY.length - 1} index={i} />
          ))}
        </div>
      </div>
      <p className="lg:hidden text-[11px] text-muted mt-2">← 옆으로 스크롤하여 더 보기 →</p>

      {/* Summary stats */}
      <motion.div
        className="mt-10 pt-10 border-t border-[#e0dbd4] grid grid-cols-2 sm:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <StatCounter value={40} label="년 역사" />
        <StatCounter value={2} label="생산 공장" />
        <StatCounter value={5} label="특허·디자인" />
        <StatCounter value={8} label="인증 보유" />
      </motion.div>
    </div>
  );
}
