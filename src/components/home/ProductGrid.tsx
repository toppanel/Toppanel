"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const PRODUCTS = [
  { label: "LPM 큐비클",     href: "/products/lpm",        icon: "🚪" },
  { label: "HPM 큐비클",     href: "/products/hpm",        icon: "🏗️" },
  { label: "디자인 큐비클",  href: "/products/design",     icon: "✨" },
  { label: "메탈릭 큐비클",  href: "/products/metallic",   icon: "🔩" },
  { label: "텍스처 큐비클",  href: "/products/texture",    icon: "🧱" },
  { label: "스탠 큐비클",    href: "/products/steel",      icon: "🔘" },
  { label: "칼라강판 큐비클",href: "/products/colorsteel", icon: "🎨" },
  { label: "특수/주문제작",  href: "/products/special",    icon: "⚙️" },
  { label: "도어 시스템",    href: "/products/door",       icon: "🚪" },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" } }),
};

export default function ProductGrid() {
  return (
    <section className="bg-white py-20 border-b border-[#E0E0E0]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-[#AAAAAA] uppercase mb-2">Products</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight">제품소개</h2>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex text-[12px] font-semibold tracking-[0.08em] text-[#555555] hover:text-[#111111] underline underline-offset-4 transition-colors"
          >
            전체보기
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.href}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Link href={product.href}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
                  transition={{ duration: 0.22 }}
                  className="group relative aspect-[4/3] bg-[#F5F5F3] border border-[#E8E8E8] rounded-sm overflow-hidden cursor-pointer"
                >
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="text-3xl">{product.icon}</span>
                    <span className="text-[12px] font-medium text-[#666666] text-center leading-snug px-2">
                      {product.label}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#111111] flex items-center justify-center"
                  >
                    <span className="text-[13px] font-semibold text-white tracking-wide">
                      {product.label}
                    </span>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/products"
            className="inline-block px-8 py-3 border border-[#111111] text-[13px] font-semibold tracking-[0.06em] hover:bg-[#111111] hover:text-white transition-colors"
          >
            전체 제품보기
          </Link>
        </div>
      </div>
    </section>
  );
}
