"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Phone, Printer, Mail, Factory, Building2 } from "lucide-react";
import { COMPANY } from "@/data/data";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

export default function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-[#242424]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 pb-14">

          {/* Brand */}
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/TopPanel logo white.svg"
              alt="TOPPANEL"
              className="h-10 w-auto object-contain mb-5"
            />
            <p className="text-[13px] text-muted leading-relaxed max-w-65 mb-7">
              공간을 완성하는<br />화장실칸막이 솔루션
            </p>
            <a
              href="https://www.g2b.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-navy-hover text-[#7DA5E0] text-[12px] font-semibold tracking-[0.04em] hover:bg-navy hover:text-white hover:border-navy transition-colors rounded-sm"
            >
              나라장터 바로가기
              <ExternalLink size={12} />
            </a>
          </motion.div>

          {/* Office */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.08 }} className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={15} className="text-[#5B8DCA]" />
              <p className="text-[11px] tracking-[0.18em] text-[#666666] uppercase">사무실 · Office</p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-[12.5px] text-[#AAAAAA] leading-relaxed">
                <MapPin size={14} className="text-body mt-0.5 shrink-0" />
                {COMPANY.officeAddress}
              </li>
              <li className="flex items-center gap-2.5 text-[12.5px] text-[#AAAAAA]">
                <Phone size={14} className="text-body shrink-0" />
                {COMPANY.phone}
              </li>
              <li className="flex items-center gap-2.5 text-[12.5px] text-[#AAAAAA]">
                <Printer size={14} className="text-body shrink-0" />
                {COMPANY.fax}
              </li>
              <li className="flex items-center gap-2.5 text-[12.5px] text-[#AAAAAA]">
                <Mail size={14} className="text-body shrink-0" />
                {COMPANY.email}
              </li>
            </ul>
          </motion.div>

          {/* Factory */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.16 }} className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <Factory size={15} className="text-[#5B8DCA]" />
              <p className="text-[11px] tracking-[0.18em] text-[#666666] uppercase">공장 · Factory</p>
            </div>
            <p className="flex items-start gap-2.5 text-[12.5px] text-[#AAAAAA] leading-relaxed">
              <MapPin size={14} className="text-body mt-0.5 shrink-0" />
              {COMPANY.factoryAddress}
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 pt-8 border-t border-[#242424]">
          <p className="text-[11px] text-[#666666] leading-relaxed">
            <span className="text-[#AAAAAA] font-medium">{COMPANY.name}</span>
            <span className="mx-2 text-ink-soft">|</span>
            대표 {COMPANY.ceo}
            <span className="mx-2 text-ink-soft">|</span>
            사업자등록번호 {COMPANY.businessNumber}
          </p>
          <p className="text-[11px] text-[#4A4A4A] lg:ml-auto">
            © 2026 {COMPANY.nameEn}. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
