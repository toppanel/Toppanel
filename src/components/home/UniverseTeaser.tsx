"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HingeRail, DoorPlate } from "@/components/ui/partition-decor";

const POSTS = [
  {
    category: "자재이야기",
    title: "HPL 소재의 내구성과 미학적 완성도",
    desc: "TAKIRON HPL이 왜 화장실칸막이에 최적인지, 표면 마감부터 내충격성까지 낱낱이 해부합니다.",
    href: "/story",
    bg: "#1A1A1A",
  },
  {
    category: "시공이야기",
    title: "강남 대형 오피스 빌딩 현장 시공 사례",
    desc: "400칸 규모 현장에서 일정 단축과 품질 유지를 동시에 달성한 탑판넬의 시공 노하우.",
    href: "/story",
    bg: "#222222",
  },
  {
    category: "가격이야기",
    title: "합리적인 견적, 어떻게 만들어지는가",
    desc: "자재비·시공비·A/S 비용 구조를 투명하게 공개합니다. 숨겨진 비용은 없습니다.",
    href: "/story",
    bg: "#1E1E1E",
  },
];

export default function UniverseTeaser() {
  return (
    <section className="bg-white py-20 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] text-body uppercase mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="1" />
                <circle cx="15" cy="12" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              Content Hub
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight">
              Cubicle Universe<br />
              <span className="text-muted text-xl font-normal tracking-[0.12em]">by TOPPANEL</span>
            </h2>
          </div>
          <Link
            href="/story"
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] text-muted hover:text-ink transition-colors"
          >
            전체보기 <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cards — styled like a row of partition doors: hinge pins on the
            left edge, a numbered door plate top-right, and a hover tilt that
            "swings open" from that hinge line. */}
        <div className="grid md:grid-cols-3 gap-4" style={{ perspective: 1400 }}>
          {POSTS.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
            >
              <Link href={post.href}>
                <motion.div
                  whileHover={{ y: -4, rotateY: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                  className="group relative h-full bg-white border border-border pl-9 pr-7 py-7 rounded-sm cursor-pointer shadow-sm hover:border-navy hover:shadow-lg transition-[border-color,box-shadow]"
                >
                  <HingeRail />
                  <div className="absolute top-5 right-5">
                    <DoorPlate n={i + 1} />
                  </div>

                  <span className="inline-block text-[10px] tracking-[0.18em] text-muted uppercase border border-border px-3 py-1 mb-5">
                    {post.category}
                  </span>
                  <h3 className="text-[15px] font-semibold text-ink leading-snug mb-3 pr-12 group-hover:text-navy transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[12px] text-body leading-relaxed mb-6">
                    {post.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] text-muted group-hover:text-navy transition-colors">
                    읽어보기 <ArrowRight size={11} />
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/story"
            className="inline-block px-8 py-3 border border-border text-ink text-[13px] font-semibold tracking-[0.06em] hover:bg-off transition-colors"
          >
            전체 콘텐츠 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
