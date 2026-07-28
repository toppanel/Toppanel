import { notFound } from "next/navigation";
import { getCategoryBySlug, PRODUCT_CATEGORIES } from "@/lib/products";
import Sidebar from "@/components/layout/Sidebar";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  return { title: cat ? `${cat.label} | TOPPANEL` : "제품소개 | TOPPANEL" };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const isStandard = cat.slug === "cubicle";

  return (
    <div className="min-h-screen bg-white">

      {/* Full-width page header */}
      <div className="border-b border-[#e8e4e0] px-6 lg:px-12 py-10 lg:py-14 flex items-start justify-between gap-8">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-muted uppercase mb-2">
            제품소개 · {cat.labelSub}
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-3">
            {cat.label}
          </h1>
          <p className="text-body text-sm leading-relaxed max-w-xl">{cat.description}</p>
        </div>
        <div className="shrink-0 pt-1">
          <PageBreadcrumb />
        </div>
      </div>

      {/* Centered sidebar + content */}
      <div className="max-w-360 mx-auto w-full lg:grid lg:grid-cols-[260px_1fr] min-h-screen">
        <Sidebar />

        <main className="border-l border-[#e8e4e0]">
          {/* 안심스크린 note */}
          {isStandard && (
            <div className="px-8 py-3.5 bg-[#faf9f7] border-b border-[#e8e4e0]">
              <p className="text-[12px] text-muted">
                <span className="font-semibold text-ink">※ 안심스크린 옵션</span>
                &nbsp;— 모델 코드 뒤{" "}
                <span className="font-semibold text-ink">S</span>가 붙은 모델은
                하부 SUS(스테인리스) 안심스크린이 적용된 사양입니다.
              </p>
            </div>
          )}

          {/* Model grid */}
          <div className="px-5 sm:px-8 lg:px-12 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.models.map((model) => (
                <div
                  key={model.code}
                  className="bg-white border border-[#e0dbd4] rounded-sm overflow-hidden flex flex-col"
                >
                  {/* Image placeholder */}
                  <div className="aspect-4/3 bg-[#f5f3f0] flex items-center justify-center border-b border-[#e0dbd4]">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#e0dbd4] flex items-center justify-center mx-auto mb-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a09990" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                      <p className="text-[10px] text-muted tracking-wide">이미지 준비 중</p>
                    </div>
                  </div>

                  {/* Model info */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.18em] text-muted uppercase mb-1">
                        {model.nameKo}
                      </p>
                      <p className="text-lg font-bold text-ink tracking-tight">{model.code}</p>
                      {model.codeS && (
                        <p className="text-sm text-body mt-0.5">
                          {model.codeS}
                          <span className="ml-2 text-[10px] bg-ink text-white px-1.5 py-0.5 rounded-sm tracking-wide">
                            안심스크린
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="mt-auto pt-3 border-t border-[#f0ece6]">
                      <a
                        href="/contact"
                        className="inline-flex items-center text-[12px] font-semibold text-ink tracking-wide hover:underline underline-offset-4"
                      >
                        견적 문의 →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
