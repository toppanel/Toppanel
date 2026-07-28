"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { type ProductCategory, type Model } from "@/lib/products";
import ModelPopup from "@/components/products/ModelPopup";

export default function ModelGallery({
  images,
  cat,
  model,
}: {
  images: string[];
  cat: ProductCategory;
  model: Model;
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(src)}
            aria-label={`${model.nameKo} 이미지 ${i + 1} — 제품 상세 보기`}
            className="group relative aspect-4/5 overflow-hidden rounded-sm cursor-pointer"
          >
            <Image
              src={src}
              alt={`${model.nameKo} ${i + 1}`}
              fill
              preload={src === images[0]}
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      {/* Product-detail popup — opens on any gallery image click */}
      <AnimatePresence>
        {activeImage && (
          <ModelPopup
            key="popup"
            cat={cat}
            model={model}
            image={activeImage}
            onClose={() => setActiveImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
