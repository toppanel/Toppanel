import Link from "next/link";
import { Package, DoorOpen, Cpu, BookOpen, Building2, Shield } from "lucide-react";

const NAV_ITEMS = [
  { icon: Package,   title: "PRODUCTS",    korean: "제품소개",       href: "/products"                 },
  { icon: DoorOpen,  title: "AUTO DOOR",   korean: "자동문 시스템",   href: "/products/auto-door"       },
  { icon: Cpu,       title: "TECHNOLOGY",  korean: "기술력",         href: "/technology"               },
  { icon: BookOpen,  title: "UNIVERSE",    korean: "큐비클 유니버스",  href: "/story"                   },
  { icon: Building2, title: "PROJECT",     korean: "프로젝트",       href: "/project"                  },
  { icon: Shield,    title: "FIRE SYSTEM", korean: "불연 시스템",    href: "/products/non-combustible" },
];

export default function MobileNavGrid() {
  return (
    <div className="h-full flex flex-col bg-[#f5f2ee]">
      {([NAV_ITEMS.slice(0, 3), NAV_ITEMS.slice(3)] as typeof NAV_ITEMS[]).map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex flex-1 min-h-0 ${rowIdx === 0 ? "border-b border-[#e0dbd4]" : ""}`}
        >
          {row.map((item, colIdx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center justify-center gap-2 hover:bg-white/60 active:bg-white transition-colors ${colIdx < 2 ? "border-r border-[#e0dbd4]" : ""}`}
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#d4cfc9] flex items-center justify-center shadow-sm">
                  <Icon size={20} className="text-[#444444]" strokeWidth={1.5} />
                </div>
                <div className="text-center px-1">
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#111111] leading-tight">{item.title}</p>
                  <p className="text-[9px] text-[#888880] mt-0.5 leading-tight">{item.korean}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
