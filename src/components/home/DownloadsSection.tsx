"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Ruler, BookOpen, ShieldCheck, Wrench, Palette } from "lucide-react";

const DOWNLOADS = [
  { icon: Ruler,       label: "도면",      sub: "DWG · PDF",   href: "/download/drawings"     },
  { icon: FileText,    label: "시방서",    sub: "PDF · HWP",   href: "/download/specs"        },
  { icon: BookOpen,    label: "카탈로그",  sub: "PDF",         href: "/download/catalog"      },
  { icon: ShieldCheck, label: "시험성적서",sub: "PDF",         href: "/download/certificates" },
  { icon: Wrench,      label: "설치메뉴얼",sub: "PDF",         href: "/download/manual"       },
  { icon: Palette,     label: "색상",      sub: "PDF · JPG",   href: "/download/colors"       },
];

export default function DownloadsSection() {
  return (
    <section className="bg-white py-20 border-b border-[#E0E0E0]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.2em] text-[#AAAAAA] uppercase mb-2">Downloads</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight">자료실</h2>
          <p className="text-[14px] text-[#888888] mt-3">
            도면·시방서·카탈로그를 무료로 다운로드하세요.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DOWNLOADS.map(({ icon: Icon, label, sub, href }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
            >
              <Link href={href}>
                <motion.div
                  whileHover={{ y: -3, backgroundColor: "#111111" }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col items-center gap-3 py-8 px-4 bg-[#F5F5F3] border border-transparent hover:border-[#111111] rounded-sm text-center cursor-pointer transition-colors"
                >
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-[#888888] group-hover:text-white transition-colors"
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-[#333333] group-hover:text-white transition-colors">
                      {label}
                    </p>
                    <p className="text-[10px] text-[#AAAAAA] group-hover:text-white/60 transition-colors mt-0.5">
                      {sub}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
