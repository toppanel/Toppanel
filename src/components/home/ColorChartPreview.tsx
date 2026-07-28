"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERIES = [
  {
    label: "솔리드", href: "/colors/solid",
    desc: "단색 계열",
    swatches: ["#F5F5F0","#E8E0D8","#D4C4B0","#B09880","#886655","#554433","#221A14","#0A0A0A"],
  },
  {
    label: "우드", href: "/colors/wood",
    desc: "목재 패턴",
    swatches: ["#F0E8D8","#E0CEB0","#C8A87A","#B08050","#8A5C30","#6B3F1E","#4A2A10","#2A1508"],
  },
  {
    label: "메탈", href: "/colors/metal",
    desc: "금속 질감",
    swatches: ["#EFEFEF","#DCDCDC","#C8C8C8","#B0B0B0","#909090","#686868","#404040","#202020"],
  },
  {
    label: "대리석", href: "/colors/marble",
    desc: "대리석 패턴",
    swatches: ["#F8F6F2","#EDE8E0","#DDD5C8","#C8BEB0","#A89888","#887060","#604A3C","#3A2820"],
  },
];

export default function ColorChartPreview() {
  return (
    <section className="bg-[#F5F5F3] py-20 border-b border-[#E0E0E0]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-[#AAAAAA] uppercase mb-2">Color Chart</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight">컬러차트</h2>
          </div>
          <Link
            href="/colors"
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] text-[#555555] hover:text-[#111111] transition-colors"
          >
            전체보기 <ArrowRight size={13} />
          </Link>
        </div>

        {/* Series cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {SERIES.map((series, i) => (
            <motion.div
              key={series.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
            >
              <Link href={series.href}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-white border border-[#E8E8E8] p-5 rounded-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  {/* Swatch strip */}
                  <div className="flex mb-4 rounded-sm overflow-hidden h-10">
                    {series.swatches.map((color) => (
                      <div
                        key={color}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <p className="text-[10px] tracking-[0.14em] text-[#AAAAAA] uppercase mb-1">{series.desc}</p>
                  <h3 className="text-[15px] font-semibold text-[#111111] group-hover:text-[#333333] transition-colors">
                    {series.label}
                  </h3>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
