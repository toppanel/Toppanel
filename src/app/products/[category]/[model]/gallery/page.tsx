import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoryBySlug, getModelBySlug, getModelGallery, PRODUCT_CATEGORIES } from "@/lib/products";
import Sidebar from "@/components/layout/Sidebar";
import ModelGallery from "@/components/products/ModelGallery";

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
  return { title: m ? `${m.nameKo} 갤러리 | TOPPANEL` : "갤러리 | TOPPANEL" };
}

export default async function ModelGalleryPage({
  params,
}: {
  params: Promise<{ category: string; model: string }>;
}) {
  const { category, model: modelSlug } = await params;
  const cat = getCategoryBySlug(category);
  const model = getModelBySlug(category, modelSlug);
  if (!cat || !model) notFound();

  const images = getModelGallery(model);

  return (
    <div className="min-h-screen bg-white">

      {/* Full-width page header */}
      <div className="border-b border-[#e8e4e0] px-6 lg:px-12 py-6 flex items-center gap-4">
        <Link
          href={`/products/${cat.slug}/${model.slug}`}
          className="flex items-center gap-1.5 text-[13px] text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} />
          {model.nameKo}
        </Link>
        <span className="text-[#d0d0d0]">/</span>
        <span className="text-[13px] text-ink font-semibold">갤러리</span>
      </div>

      {/* Sidebar + content */}
      <div className="max-w-360 mx-auto w-full lg:grid lg:grid-cols-[260px_1fr] min-h-screen">
        <Sidebar />

        <main className="border-l border-[#e8e4e0] px-5 sm:px-8 lg:px-12 py-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-muted uppercase mb-1">
            {cat.labelSub} · {model.code}
          </p>
          <h1 className="text-2xl font-bold text-ink tracking-tight mb-8">
            {model.nameKo} 갤러리
          </h1>

          <ModelGallery images={images} cat={cat} model={model} />
        </main>
      </div>
    </div>
  );
}
