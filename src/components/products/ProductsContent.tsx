"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryBySlug, getModelBySlug, getModelGallery } from "@/lib/products";
import Sidebar from "@/components/layout/Sidebar";
import ProductCatalogGrid from "@/components/products/ProductCatalogGrid";
import CategoryModelGrid from "@/components/products/CategoryModelGrid";
import ModelGallery from "@/components/products/ModelGallery";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat") ?? undefined;
  const modelSlug = searchParams.get("model") ?? undefined;
  const selectedCat = cat ? getCategoryBySlug(cat) : null;
  const selectedModel = selectedCat && modelSlug ? getModelBySlug(selectedCat.slug, modelSlug) : null;

  return (
    <div className="max-w-360 mx-auto w-full lg:grid lg:grid-cols-[260px_1fr] lg:gap-10 min-h-screen">
      <Sidebar activeCat={cat} activeModel={modelSlug} />

      <main>
        <div className="px-5 sm:px-8 lg:px-12 py-14">

          {selectedCat && selectedModel ? (
            /* ── Model selected: gallery, image click pops up product details ── */
            <>
              <div className="mb-8">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-muted uppercase mb-1">
                  {selectedCat.labelSub} · {selectedModel.code}
                </p>
                <h2 className="text-2xl font-bold text-ink tracking-tight">{selectedModel.nameKo} 갤러리</h2>
              </div>

              <ModelGallery images={getModelGallery(selectedModel)} cat={selectedCat} model={selectedModel} />

              <div className="mt-10">
                <Link
                  href={`/products?cat=${selectedCat.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-ink transition-colors"
                >
                  ← {selectedCat.label}
                </Link>
              </div>
            </>
          ) : selectedCat ? (
            /* ── Category selected: show model cards ── */
            <>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-muted uppercase mb-1">
                    {selectedCat.labelSub}
                  </p>
                  <h2 className="text-2xl font-bold text-ink tracking-tight">{selectedCat.label}</h2>
                  <p className="text-sm text-body mt-2 leading-relaxed max-w-xl">{selectedCat.description}</p>
                </div>
              </div>

              <CategoryModelGrid cat={selectedCat} />

              <div className="mt-10">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-ink transition-colors"
                >
                  ← 전체 제품보기
                </Link>
              </div>
            </>
          ) : (
            /* ── No filter: show 6 main category cards ── */
            <>
              <ProductCatalogGrid />

              <div className="mt-12 border border-[#e0dbd4] bg-[#f9f8f6] px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-muted uppercase mb-1">CONTACT</p>
                  <p className="text-base font-bold text-ink">원하는 제품을 찾지 못하셨나요?</p>
                  <p className="text-[12px] text-body mt-1">맞춤 견적 및 제품 상담을 도와드립니다.</p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-ink text-white text-[12px] font-semibold tracking-widest uppercase hover:bg-ink-soft transition-colors"
                >
                  견적 문의
                  <ArrowRight size={13} />
                </Link>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
