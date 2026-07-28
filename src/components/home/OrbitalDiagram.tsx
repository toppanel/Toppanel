"use client";

import { useRef, useState, useEffect } from "react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import {
  Package,
  DoorOpen,
  Cpu,
  BookOpen,
  Building2,
  Shield,
} from "lucide-react";

const ORBIT_DATA = [
  {
    id: 1,
    title: "PRODUCTS",
    korean: "제품소개",
    date: "프리미엄",
    content: "TAKIRON HPL 소재 기반의 다양한 프리미엄 큐비클 제품군을 만나보세요.",
    category: "Products",
    icon: Package,
    relatedIds: [2, 6],
    status: "completed" as const,
    energy: 100,
    href: "/products",
  },
  {
    id: 2,
    title: "AUTO DOOR",
    korean: "자동문 시스템",
    date: "자동화",
    content: "슬라이딩·접이·센서 자동문 시스템으로 편리하고 위생적인 공간을 완성합니다.",
    category: "Auto Door",
    icon: DoorOpen,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
    href: "/products/auto-door",
  },
  {
    id: 3,
    title: "TECHNOLOGY",
    korean: "기술력",
    date: "검증된",
    content: "자체 공장에서 검증된 제조 기술력으로 최고 품질의 제품을 생산합니다.",
    category: "Technology",
    icon: Cpu,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 95,
    href: "/technology",
  },
  {
    id: 4,
    title: "CUBICLE UNIVERSE",
    korean: "큐비클 유니버스",
    date: "탐색",
    content: "수십 가지 소재와 색상을 직접 탐색하며 최적의 공간 디자인을 찾아보세요.",
    category: "Universe",
    icon: BookOpen,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 75,
    href: "/story",
  },
  {
    id: 5,
    title: "PROJECT",
    korean: "프로젝트",
    date: "레퍼런스",
    content: "전국 주요 건물에 납품된 시공 레퍼런스 갤러리를 확인하세요.",
    category: "Project",
    icon: Building2,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 80,
    href: "/project",
  },
  {
    id: 6,
    title: "FIRE SYSTEM",
    korean: "불연 시스템",
    date: "안전",
    content: "화재 안전 기준을 충족하는 불연 칸막이 솔루션으로 안전한 공간을 만듭니다.",
    category: "Fire System",
    icon: Shield,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 85,
    href: "/products/non-combustible",
  },
];

// Reference: at 1400×1119 the right panel is 700×887 → min=700 → scale=1.0
const REFERENCE_SIZE = 700;

export default function OrbitalDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { offsetWidth: w, offsetHeight: h } = el;
      const fit = Math.min(w, h) / REFERENCE_SIZE;
      // Allow slight scale-up on larger screens (max 1.15), scale down freely
      setScale(Math.max(0.12, Math.min(1.15, fit)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Scale transform preserves the 1400px reference look at any container size */}
      <div
        className="w-full h-full"
        style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
      >
        <RadialOrbitalTimeline timelineData={ORBIT_DATA} />
      </div>
    </div>
  );
}
