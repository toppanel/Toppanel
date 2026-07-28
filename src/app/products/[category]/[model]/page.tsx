import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Info, ArrowRight } from "lucide-react";
import { getCategoryBySlug, getModelBySlug, getModelImage, PRODUCT_CATEGORIES } from "@/lib/products";
import Sidebar from "@/components/layout/Sidebar";

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.flatMap((cat) =>
    cat.models.map((model) => ({ category: cat.slug, model: model.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; model: string }>;
}) {
  const { category, model } = await params;
  const m = getModelBySlug(category, model);
  return { title: m ? `${m.nameKo} | TOPPANEL` : "제품 상세 | TOPPANEL" };
}

const CATEGORY_ACCENT: Record<string, { bg: string; text: string; border: string }> = {
  cubicle:         { bg: "#eef3f0", text: "#3d7a55", border: "#b5d4c1" },
  accessible:      { bg: "#edf2f8", text: "#2d5f8a", border: "#adc6de" },
  glass:           { bg: "#edf3f5", text: "#2a6878", border: "#a8cdd8" },
  "changing-room": { bg: "#f5eef8", text: "#7a4a8a", border: "#d0aade" },
  "lower-cabinet": { bg: "#f8f1e8", text: "#8a5a28", border: "#ddc49a" },
  "wall-panel":    { bg: "#f8eeee", text: "#8a3a3a", border: "#d8aaaa" },
};

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ category: string; model: string }>;
}) {
  const { category, model: modelSlug } = await params;
  const cat = getCategoryBySlug(category);
  const model = getModelBySlug(category, modelSlug);
  if (!cat || !model) notFound();

  const accent = CATEGORY_ACCENT[cat.slug] ?? { bg: "#f0ece6", text: "#555555", border: "#d4cfc9" };
  const currentIndex = cat.models.findIndex((m) => m.slug === modelSlug);
  const prevModel = currentIndex > 0 ? cat.models[currentIndex - 1] : null;
  const nextModel = currentIndex < cat.models.length - 1 ? cat.models[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white">

      {/* Full-width page header */}
      <div className="border-b border-[#e8e4e0] px-6 lg:px-12 py-6 flex items-center gap-4">
        <Link
          href={`/products/${cat.slug}`}
          className="flex items-center gap-1.5 text-[13px] text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} />
          {cat.label}
        </Link>
        <span className="text-[#d0d0d0]">/</span>
        <span className="text-[13px] text-ink font-semibold">{model.nameKo}</span>
      </div>

      {/* Sidebar + content */}
      <div className="max-w-360 mx-auto w-full lg:grid lg:grid-cols-[260px_1fr] min-h-screen">
        <Sidebar />

        <main className="border-l border-[#e8e4e0] pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[600px]">

            {/* ── Left: image ── */}
            <div className="relative min-h-80 border-b lg:border-b-0 lg:border-r border-[#e0dbd4]">
              <Image
                src={getModelImage(model)}
                alt={model.nameKo}
                fill
                preload
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* ── Right: details ── */}
            <div className="p-6 sm:p-8 lg:p-16 flex flex-col">

              {/* Breadcrumb */}
              <p className="text-[12px] text-muted mb-7 tracking-wide">
                홈 &gt; 제품보기 &gt; {cat.label} &gt; {model.nameKo}
              </p>

              {/* Title + category badge */}
              <div className="flex items-baseline gap-4 mb-3">
                <h1 className="text-[30px] font-bold text-ink tracking-tight leading-tight">
                  {model.nameKo}
                </h1>
                <span className="text-[13px] text-muted border-l border-[#d0d0d0] pl-4">
                  {cat.labelSub}
                </span>
              </div>

              {/* Description */}
              <p className="text-[14px] text-body leading-relaxed mb-10 border-b border-[#eeeeee] pb-10">
                {cat.description}
              </p>

              {/* Sibling model navigation */}
              {cat.models.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  {cat.models.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/products/${cat.slug}/${m.slug}`}
                      className={`px-5 py-2.5 text-[14px] font-medium border transition-colors ${
                        m.slug === modelSlug
                          ? "border-ink text-ink font-semibold bg-white"
                          : "border-[#ddd] text-muted hover:border-[#aaa] hover:text-ink-soft"
                      }`}
                    >
                      {m.nameKo}
                    </Link>
                  ))}
                </div>
              )}

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
              <div className="flex items-start gap-2.5 text-[13px] text-muted mb-10">
                <Info size={15} className="shrink-0 mt-0.5 text-[#aaaaaa]" />
                <span>도어와 포스트의 컬러 및 옵션 변경이 가능합니다.</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-ink text-white text-[14px] font-semibold hover:bg-ink-soft transition-colors"
                >
                  견적 문의하기
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href={`/products/${cat.slug}/${model.slug}/gallery`}
                  className="px-8 py-4 border border-[#e0dbd4] text-[14px] font-semibold text-body hover:border-ink hover:text-ink transition-colors whitespace-nowrap text-center"
                >
                  갤러리 보기
                </Link>
                <Link
                  href={`/products/${cat.slug}`}
                  className="px-8 py-4 border border-[#e0dbd4] text-[14px] font-semibold text-body hover:border-ink hover:text-ink transition-colors text-center"
                >
                  목록으로
                </Link>
              </div>

              {/* Prev / Next model */}
              {(prevModel || nextModel) && (
                <div className="flex justify-between mt-8 pt-8 border-t border-[#eeeeee] text-[13px]">
                  {prevModel ? (
                    <Link
                      href={`/products/${cat.slug}/${prevModel.slug}`}
                      className="flex items-center gap-2 text-muted hover:text-ink transition-colors"
                    >
                      <ArrowLeft size={14} /> {prevModel.nameKo}
                    </Link>
                  ) : <span />}
                  {nextModel && (
                    <Link
                      href={`/products/${cat.slug}/${nextModel.slug}`}
                      className="flex items-center gap-2 text-muted hover:text-ink transition-colors"
                    >
                      {nextModel.nameKo} <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
