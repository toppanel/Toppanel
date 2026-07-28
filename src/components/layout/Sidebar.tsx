"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/products";

interface SidebarProps {
  activeCat?: string;
  activeModel?: string;
}

export default function Sidebar({ activeCat, activeModel }: SidebarProps = {}) {
  const pathname = usePathname() ?? "/";
  const isOnProductsHome = pathname === "/products";

  /* Determine which category should start expanded */
  const getInitialExpanded = (): string | null => {
    if (activeCat) return activeCat;
    const matched = PRODUCT_CATEGORIES.find((c) =>
      pathname.startsWith(`/products/${c.slug}`)
    );
    return matched?.slug ?? null;
  };

  const [expandedSlug, setExpandedSlug] = useState<string | null>(getInitialExpanded);

  /* Sync when activeCat prop changes (search-param navigation) */
  useEffect(() => {
    if (activeCat) setExpandedSlug(activeCat);
  }, [activeCat]);

  /* Sync when pathname changes (direct URL navigation) */
  useEffect(() => {
    if (!isOnProductsHome) {
      const matched = PRODUCT_CATEGORIES.find((c) =>
        pathname.startsWith(`/products/${c.slug}`)
      );
      if (matched) setExpandedSlug(matched.slug);
    }
  }, [pathname, isOnProductsHome]);

  const isActive = (slug: string) => {
    if (isOnProductsHome) return activeCat === slug;
    return (
      pathname === `/products/${slug}` ||
      pathname.startsWith(`/products/${slug}/`)
    );
  };

  const getHref = (slug: string) =>
    isOnProductsHome ? `/products?cat=${slug}` : `/products/${slug}`;

  const allActive = isOnProductsHome && !activeCat;

  return (
    <aside className="hidden lg:block">
      {/* pt-14 matches the main content's top padding (py-14) so the sidebar
          frame's top edge lines up with the content's top edge. */}
      <div className="pt-14 pb-8 px-3">

        {/* Framed panel — fixed height sized for the largest category (8 models),
            so the frame never resizes as the user opens different accordions. */}
        <div className="h-185 border border-[#e0dbd4] rounded-xl shadow-sm bg-white">

          {/* "All products" link */}
          <div className="px-7 pt-8 pb-5">
            <Link
              href="/products"
              onClick={() => setExpandedSlug(null)}
              className={`text-[15px] transition-colors ${
                allActive ? "font-bold text-ink" : "text-muted hover:text-ink"
              }`}
            >
              전체 제품보기
            </Link>
          </div>

          {/* Category list with accordion */}
          <nav aria-label="제품 카테고리" className="pb-4">
            <ul>
              {PRODUCT_CATEGORIES.map((cat) => {
                const active = isActive(cat.slug);
                const expanded = expandedSlug === cat.slug;

                return (
                  <li key={cat.slug}>
                    {/* Category row */}
                    <div className="relative flex items-center">
                      {active && (
                        <span className="absolute left-0 inset-y-0 w-0.75 bg-ink z-10" />
                      )}

                      {/* Label — navigates on click */}
                      <Link
                        href={getHref(cat.slug)}
                        onClick={() => setExpandedSlug(expanded ? null : cat.slug)}
                        className={`flex-1 flex items-center justify-between px-7 py-3.5 text-[15px] transition-colors ${
                          active ? "font-bold text-ink" : "text-body hover:text-ink"
                        }`}
                      >
                        <span>{cat.label}</span>
                        <ChevronDown
                          size={14}
                          className={`shrink-0 text-muted transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </Link>
                    </div>

                    {/* Accordion sub-items */}
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden bg-[#f7f5f2]"
                        >
                          {cat.models.map((model) => {
                            const modelActive = isOnProductsHome
                              ? activeModel === model.slug
                              : pathname === `/products/${cat.slug}/${model.slug}` ||
                                pathname.startsWith(`/products/${cat.slug}/${model.slug}/`);
                            const modelHref = isOnProductsHome
                              ? `/products?cat=${cat.slug}&model=${model.slug}`
                              : `/products/${cat.slug}/${model.slug}/gallery`;
                            return (
                              <li key={model.slug}>
                                <Link
                                  href={modelHref}
                                  className={`flex items-center pl-10 pr-7 py-2.5 text-[14px] transition-colors border-l-2 ${
                                    modelActive
                                      ? "font-semibold text-ink border-ink bg-white"
                                      : "text-muted hover:text-ink border-transparent hover:bg-white/60"
                                  }`}
                                >
                                  {model.nameKo}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

        </div>
      </div>
    </aside>
  );
}
