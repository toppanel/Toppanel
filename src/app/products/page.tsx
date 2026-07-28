import { Suspense } from "react";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import ProductsContent from "@/components/products/ProductsContent";

export const metadata = {
  title: "제품소개 | TOPPANEL",
  description: "탑판넬의 전체 큐비클 제품군을 확인하세요.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Full-width page header */}
      <div className="border-b border-[#e8e4e0] px-6 lg:px-12 py-10 lg:py-14 flex items-start justify-between gap-8">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.25em] text-muted uppercase mb-3">
            TOPPANEL · PRODUCTS
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">
            제품소개
          </h1>
          <p className="text-body text-sm leading-relaxed max-w-2xl">
            탑판넬은 화장실칸막이·장애인칸막이·유리칸막이·탈의실·하부장·월패널까지 — 모든 공간 요구에 맞는 완성된 솔루션을 제공합니다.
          </p>
        </div>
        <div className="shrink-0 pt-1">
          <PageBreadcrumb />
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
