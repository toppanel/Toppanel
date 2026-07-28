"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MENUS = [
  {
    key: "about", label: "회사소개", href: "/about",
    items: [
      { label: "회사소개", href: "/about" },
      { label: "회사 연혁", href: "/about" },
      { label: "특허 / 인증", href: "/about" },
      { label: "공장 및 설비", href: "/about" },
      { label: "오시는길", href: "/contact" },
    ],
  },
  {
    key: "products", label: "제품소개", href: "/products",
    items: [
      { label: "화장실칸막이", href: "/products/cubicle" },
      { label: "장애인칸막이", href: "/products/accessible" },
      { label: "유리칸막이",   href: "/products/glass" },
      { label: "탈의실",       href: "/products/changing-room" },
      { label: "하부장",       href: "/products/lower-cabinet" },
      { label: "월패널",       href: "/products/wall-panel" },
      { label: "전체 제품보기", href: "/products" },
    ],
  },
  {
    key: "colors", label: "컬러차트", href: "/download",
    items: [
      { label: "솔리드", href: "/download" },
      { label: "우드", href: "/download" },
      { label: "메탈", href: "/download" },
      { label: "대리석", href: "/download" },
    ],
  },
  {
    key: "universe", label: "Cubicle Universe", sublabel: "BY TOPPANEL", href: "/story",
    items: [
      { label: "자재이야기", href: "/story" },
      { label: "시공이야기", href: "/story" },
      { label: "실패와 개선", href: "/story" },
      { label: "가격이야기", href: "/story" },
      { label: "METROCORE 사례", href: "/story" },
      { label: "자동문사례", href: "/story" },
      { label: "유지관리/AS", href: "/story" },
      { label: "현장에세이", href: "/story" },
      { label: "Universe Project", href: "/story" },
      { label: "Universe Story", href: "/story" },
      { label: "Universe Insight", href: "/story" },
      { label: "Universe Lab", href: "/story" },
    ],
  },
  {
    key: "downloads", label: "자료실", href: "/download",
    items: [
      { label: "도면", href: "/download" },
      { label: "시방서", href: "/download" },
      { label: "카탈로그", href: "/download" },
      { label: "시험성적서", href: "/download" },
      { label: "설치메뉴얼", href: "/download" },
      { label: "색상", href: "/download" },
    ],
  },
  {
    key: "contact", label: "문의하기", href: "/contact",
    items: [
      { label: "전화 문의", href: "/contact" },
      { label: "견적상담", href: "/contact" },
      { label: "콜백서비스", href: "/contact" },
      { label: "카카오톡 문의", href: "/contact" },
      { label: "대리점 문의", href: "/contact" },
      { label: "오시는길", href: "/contact" },
    ],
  },
];

export default function Navbar() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accordionKey, setAccordionKey] = useState<string | null>(null);
  const [navRects, setNavRects] = useState<Array<{ left: number; width: number }>>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  /* measure each nav item's left + width so dropdown columns align exactly */
  const measureNav = useCallback(() => {
    if (!navRef.current) return;
    const items = navRef.current.querySelectorAll<HTMLElement>("[data-nav-item]");
    setNavRects(Array.from(items).map((el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left, width: r.width };
    }));
  }, []);

  useEffect(() => {
    measureNav();
    window.addEventListener("resize", measureNav);
    return () => window.removeEventListener("resize", measureNav);
  }, [measureNav]);

  const isOpen = activeKey !== null;

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveKey(key);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveKey(null), 150);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      {/* ── Fixed Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-18 bg-white border-b border-border">
        <div className="w-full h-full flex items-stretch px-6 lg:px-10">

          {/* Logo — far left */}
          <Link href="/" className="shrink-0 flex items-center pr-6 lg:pr-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/TopPanel logo.svg" alt="TOPPANEL" className="h-12 lg:h-14 w-auto object-contain" />
          </Link>

          {/* Desktop nav — centred group, items left-aligned within each cell */}
          <nav
            ref={navRef}
            className="hidden lg:flex flex-1 items-stretch justify-center"
            onMouseLeave={scheduleClose}
            aria-label="주 메뉴"
          >
            {MENUS.map((menu) => (
              <div
                key={menu.key}
                data-nav-item
                className="flex items-center px-12"
                onMouseEnter={() => openMenu(menu.key)}
              >
                <Link
                  href={menu.href}
                  onClick={() => setActiveKey(null)}
                  className={`flex flex-col transition-colors ${
                    isActive(menu.href)
                      ? "text-ink font-semibold"
                      : "text-body hover:text-ink font-medium"
                  }`}
                >
                  <span className="text-[17px] leading-snug tracking-wide whitespace-nowrap">
                    {menu.label}
                  </span>
                  {"sublabel" in menu && (
                    <span className="text-[10px] tracking-wider mt-0.5 text-muted">
                      {(menu as { sublabel: string }).sublabel}
                    </span>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right: 나라장터 + hamburger — far right */}
          <div className="shrink-0 flex items-center gap-3">
            <a
              href="https://www.g2b.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold tracking-[0.06em] transition-colors rounded-sm whitespace-nowrap bg-navy text-white hover:bg-navy-hover"
            >
              나라장터
              <ExternalLink size={12} />
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="메뉴 열기"
              className="p-2 rounded transition-colors lg:hidden hover:bg-off"
            >
              <Menu size={22} className="text-ink" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mega Dropdown Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="fixed top-18 left-0 right-0 z-40 bg-white border-b border-border shadow-[0_8px_32px_rgba(0,0,0,0.09)]"
          >
            {/* Each column left-aligned to its nav item's exact x-position */}
            <div
              className="flex items-start py-7"
              style={{ marginLeft: navRects[0]?.left ?? 0 }}
            >
              {MENUS.map((menu, i) => {
                const active = activeKey === menu.key;
                return (
                  <div
                    key={menu.key}
                    style={{ width: navRects[i]?.width ?? 0 }}
                    className={`shrink-0 transition-opacity duration-150 ${active ? "opacity-100" : "opacity-30"}`}
                    onMouseEnter={() => openMenu(menu.key)}
                  >
                    {/* pl-12 matches the nav item's px-12 left padding */}
                    <ul className="space-y-0.5 pl-12">
                      {menu.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveKey(null)}
                            className="block py-1.5 text-[14px] text-body hover:text-ink transition-colors leading-snug whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-18 z-30 bg-black/15"
            onClick={() => setActiveKey(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer overlay ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <motion.aside
        initial={false}
        animate={{ x: drawerOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.26, ease: "easeInOut" }}
        className="fixed top-0 right-0 z-50 h-full w-75 bg-white shadow-2xl flex flex-col lg:hidden"
        aria-modal="true"
        role="dialog"
        aria-label="사이트 메뉴"
      >
        <div className="flex items-center justify-between h-18 px-5 border-b border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/TopPanel logo.svg" alt="TOPPANEL" className="h-9 w-auto" />
          <button onClick={() => setDrawerOpen(false)} aria-label="닫기" className="p-2 hover:bg-off rounded">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {MENUS.map((menu) => (
            <div key={menu.key} className="border-b border-border">
              <button
                onClick={() => setAccordionKey(accordionKey === menu.key ? null : menu.key)}
                className="w-full flex items-center justify-between px-5 py-4 text-[16px] font-medium text-ink-soft hover:bg-off transition-colors"
              >
                <span>
                  {menu.label}
                  {"sublabel" in menu && (
                    <span className="ml-1.5 text-[10px] text-muted tracking-widest">
                      {(menu as { sublabel: string }).sublabel}
                    </span>
                  )}
                </span>
                <ChevronDown
                  size={15}
                  className={`transition-transform text-muted ${accordionKey === menu.key ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {accordionKey === menu.key && (
                  <motion.ul
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-off"
                  >
                    {menu.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className="block px-8 py-2.5 text-[15px] text-body hover:text-ink transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="p-5 border-t border-border">
          <a
            href="https://www.g2b.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-navy text-white text-[13px] font-semibold tracking-wider hover:bg-navy-hover transition-colors rounded-sm"
          >
            나라장터 바로가기
            <ExternalLink size={13} />
          </a>
        </div>
      </motion.aside>
    </>
  );
}
