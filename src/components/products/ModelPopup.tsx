"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Info, ArrowRight } from "lucide-react";
import { type ProductCategory, type Model, getModelImage } from "@/lib/products";

const CATEGORY_ACCENT: Record<string, { bg: string; text: string; border: string }> = {
  cubicle:         { bg: "#eef3f0", text: "#3d7a55", border: "#b5d4c1" },
  accessible:      { bg: "#edf2f8", text: "#2d5f8a", border: "#adc6de" },
  glass:           { bg: "#edf3f5", text: "#2a6878", border: "#a8cdd8" },
  "changing-room": { bg: "#f5eef8", text: "#7a4a8a", border: "#d0aade" },
  "lower-cabinet": { bg: "#f8f1e8", text: "#8a5a28", border: "#ddc49a" },
  "wall-panel":    { bg: "#f8eeee", text: "#8a3a3a", border: "#d8aaaa" },
};

/**
 * Product-detail popup — shown when a gallery photo is clicked. Self-contained:
 * owns its own Escape-to-close and body-scroll-lock, so any parent just needs
 * to conditionally render it (inside an AnimatePresence for the exit animation).
 */
export default function ModelPopup({
  cat,
  model,
  image,
  onClose,
}: {
  cat: ProductCategory;
  model: Model;
  image?: string;
  onClose: () => void;
}) {
  const accent = CATEGORY_ACCENT[cat.slug] ?? { bg: "#f0ece6", text: "#555555", border: "#d4cfc9" };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-auto w-full max-w-5xl"
        >
          <div
            className="bg-white w-[95vw] max-w-330 max-h-[96vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="닫기"
              className="absolute top-6 right-6 z-20 p-2.5 rounded-sm hover:bg-off transition-colors"
            >
              <X size={22} className="text-muted" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[580px_1fr]">

              {/* Left: image */}
              <div className="relative border-b lg:border-b-0 lg:border-r border-[#e0dbd4] min-h-80 lg:min-h-165">
                <Image
                  src={image ?? getModelImage(model)}
                  alt={model.nameKo}
                  fill
                  sizes="(min-width: 1024px) 580px, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Right: details */}
              <div className="p-6 sm:p-8 lg:p-16 flex flex-col">

                {/* Breadcrumb */}
                <p className="text-[12px] text-muted mb-8 tracking-wide">
                  홈 &gt; 제품보기 &gt; {cat.label} &gt; {model.nameKo}
                </p>

                {/* Title + category badge */}
                <div className="flex items-baseline gap-4 mb-3">
                  <h2 className="text-[32px] font-bold text-ink tracking-tight leading-tight">
                    {model.nameKo}
                  </h2>
                  <span className="text-[14px] text-muted border-l border-[#d0d0d0] pl-4">
                    {cat.labelSub}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[14px] text-body leading-relaxed mb-10 border-b border-[#eeeeee] pb-10">
                  {cat.description}
                </p>

                {/* Spec table */}
                <div className="space-y-5 mb-10">
                  <div className="flex items-center">
                    <span className="text-[14px] font-semibold w-28 shrink-0" style={{ color: accent.text }}>
                      모델명
                    </span>
                    <span className="text-[14px] text-ink font-medium">{model.code}</span>
                  </div>
                  {model.codeS && (
                    <div className="flex items-center">
                      <span className="text-[14px] font-semibold w-28 shrink-0" style={{ color: accent.text }}>
                        안심스크린
                      </span>
                      <span className="text-[14px] text-ink">{model.codeS}</span>
                      <span className="ml-3 text-[10px] bg-ink text-white px-2 py-0.5 font-bold tracking-wide">SUS</span>
                    </div>
                  )}
                  <div className="flex items-center flex-wrap gap-y-2">
                    <span className="text-[14px] font-semibold w-28 shrink-0" style={{ color: accent.text }}>
                      적용 옵션
                    </span>
                    <span className="text-[14px] text-ink">컬러, 규격</span>
                    <span className="ml-4 text-[12px] border border-[#c8c8c8] text-[#666666] px-3 py-1 hover:bg-off cursor-pointer transition-colors">
                      옵션 기능 설명
                    </span>
                  </div>
                </div>

                {/* Note */}
                <div className="flex items-start gap-2.5 text-[13px] text-muted mb-12">
                  <Info size={15} className="shrink-0 mt-0.5 text-[#aaaaaa]" />
                  <span>도어와 포스트의 컬러 및 옵션 변경이 가능합니다.</span>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-auto">
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-ink text-white text-[14px] font-semibold hover:bg-ink-soft transition-colors"
                  >
                    견적 문의하기
                    <ArrowRight size={15} />
                  </Link>
                  <button
                    onClick={onClose}
                    className="px-6 py-4 border border-[#e0dbd4] text-[14px] font-semibold text-muted hover:border-ink hover:text-ink transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
