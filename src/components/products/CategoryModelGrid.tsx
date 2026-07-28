"use client";

import Image from "next/image";
import Link from "next/link";
import { type ProductCategory, getModelImage } from "@/lib/products";

export default function CategoryModelGrid({ cat }: { cat: ProductCategory }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cat.models.map((model) => (
        <div key={model.slug} className="flex flex-col items-center gap-3">
          <Link
            href={`/products?cat=${cat.slug}&model=${model.slug}`}
            className="group relative block overflow-hidden rounded-sm aspect-4/5 cursor-pointer w-full"
          >
            <Image
              src={getModelImage(model)}
              alt={model.nameKo}
              fill
              preload={getModelImage(model) === getModelImage(cat.models[0])}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover tint */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Label — outside card, centered below */}
          <div className="text-center">
            <p className="text-[10px] text-muted tracking-[0.2em] uppercase mb-1">{model.code}</p>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-base font-bold text-ink leading-tight">{model.nameKo}</h2>
              {model.codeS && (
                <span className="text-[9px] border border-current text-muted px-1.5 py-0.5 shrink-0">
                  안심스크린
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
