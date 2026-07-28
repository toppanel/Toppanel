"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATEGORIES, getCategoryImage } from "@/lib/products";

export default function ProductCatalogGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUCT_CATEGORIES.map((cat) => (
        <div key={cat.slug} className="flex flex-col items-center gap-3">
          <Link
            href={`/products?cat=${cat.slug}`}
            className="group relative block overflow-hidden rounded-sm aspect-4/5 cursor-pointer w-full"
          >
            <Image
              src={getCategoryImage(cat)}
              alt={cat.label}
              fill
              preload={getCategoryImage(cat) === getCategoryImage(PRODUCT_CATEGORIES[0])}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover tint */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Label — outside card, centered below */}
          <div className="text-center">
            <p className="text-[10px] text-muted tracking-[0.22em] uppercase mb-1">
              {cat.labelSub}
            </p>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-base font-bold text-ink leading-tight">{cat.label}</h2>
              <span className="text-[11px] text-muted">{cat.models.length}종</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
