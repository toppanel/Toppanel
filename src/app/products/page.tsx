import { Suspense } from "react";
import Image from "next/image";
import ProductsContent from "@/components/products/ProductsContent";

export const metadata = {
  title: "제품소개 | TOPPANEL",
  description: "탑판넬의 전체 큐비클 제품군을 확인하세요.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Full-width page header */}
      <div className="relative border-b border-[#e8e4e0] min-h-75 flex flex-col justify-center px-6 lg:px-12 py-12 overflow-hidden">
        <Image
          src="/images/page-headers/products.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "40% 40%", transform: "scale(1.15)" }}
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/60 uppercase mb-3">
            TOPPANEL · PRODUCTS
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            제품소개
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
            탑판넬은 화장실칸막이·장애인칸막이·유리칸막이·탈의실·하부장·월패널까지 — 모든 공간 요구에 맞는 완성된 솔루션을 제공합니다.
          </p>
        </div>
      </div>

      {/* Client-side content — Suspense required for useSearchParams in static export */}
      <Suspense fallback={
        <div className="max-w-7xl mx-auto w-full min-h-screen flex items-center justify-center">
          <div className="text-muted text-sm">로딩 중...</div>
        </div>
      }>
        <ProductsContent />
      </Suspense>

    </div>
  );
}
