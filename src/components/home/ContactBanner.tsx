"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageSquare, FileEdit } from "lucide-react";
import { COMPANY } from "@/data/data";
import { HingeRail, DoorPlate, DoorIndicator } from "@/components/ui/partition-decor";

const CHANNELS = [
  { icon: Phone,        label: "전화 문의",    sub: COMPANY.phone,    href: "/contact",        primary: false },
  { icon: MessageSquare,label: "카카오톡",      sub: "채널 바로가기",  href: COMPANY.kakao,     primary: false },
  { icon: FileEdit,     label: "무료 견적 문의",sub: "온라인 양식",    href: "/contact/quote",  primary: true  },
];

export default function ContactBanner() {
  return (
    <section className="bg-white py-20 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <p className="text-[11px] tracking-[0.2em] text-body uppercase mb-3">Contact</p>
            <div className="mb-4">
              <DoorIndicator label="지금 상담 가능 · Available Now" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink leading-snug mb-4">
              전문가와 상담하세요
            </h2>
            <p className="text-[14px] text-body leading-relaxed max-w-sm">
              규모와 예산에 맞는 최적의 칸막이 솔루션을 제안해 드립니다.<br />
              영업일 기준 24시간 이내 답변 드립니다.
            </p>
          </motion.div>

          {/* Right: channels — the two secondary channels are styled as closed
              partition doors (hinge pins + numbered plate) you click open;
              the primary CTA is the open doorway itself: solid, no hardware. */}
          <div className="lg:flex-1 lg:flex lg:justify-end">
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4" style={{ perspective: 1400 }}>
              {CHANNELS.map(({ icon: Icon, label, sub, href, primary }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <motion.div
                      whileHover={primary ? { y: -3 } : { y: -3, rotateY: -5 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={!primary ? { transformOrigin: "left center", transformStyle: "preserve-3d" } : undefined}
                      className={`group relative flex flex-col items-center gap-3 px-8 py-6 rounded-sm text-center cursor-pointer transition-[border-color,box-shadow,background-color] min-w-35 ${
                        primary
                          ? "bg-navy hover:bg-navy-hover"
                          : "bg-white border border-border pl-10 shadow-sm hover:border-navy hover:shadow-lg"
                      }`}
                    >
                      {!primary && (
                        <>
                          <HingeRail />
                          <div className="absolute top-2.5 right-2.5">
                            <DoorPlate n={i + 1} />
                          </div>
                        </>
                      )}
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={primary ? "text-white" : "text-muted"}
                      />
                      <div>
                        <p className={`text-[13px] font-semibold ${primary ? "text-white" : "text-ink"}`}>
                          {label}
                        </p>
                        <p className={`text-[11px] mt-0.5 ${primary ? "text-white/60" : "text-muted"}`}>
                          {sub}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
