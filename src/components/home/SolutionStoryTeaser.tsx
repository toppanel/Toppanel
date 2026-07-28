import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4";

const GALLERY_ITEMS: Gallery4Item[] = [
  {
    id: "1",
    title: "TAKIRON HPL의 내구성과 미학적 완성도",
    description: "MATERIAL",
    image: "/images/DRC-S01.jpg",
    href: "/story/takiron-hpl",
  },
  {
    id: "2",
    title: "강남 오피스 빌딩 화장실 큐비클 시공 사례",
    description: "PROJECT",
    image: "/images/DRC-D20.jpg",
    href: "/story/gangnam-office",
  },
  {
    id: "3",
    title: "불연 시스템으로 화재 안전 기준 충족하기",
    description: "TECHNOLOGY",
    image: "/images/firefly-gemini.png",
    href: "/story/fire-safety",
  },
  {
    id: "4",
    title: "공간을 완성하는 컬러 & 소재 선택의 기술",
    description: "DESIGN",
    image: "/images/DRC-S01.jpg",
    href: "/story/color-material",
  },
  {
    id: "5",
    title: "자동문 시스템으로 공간 편의성 극대화",
    description: "AUTO DOOR",
    image: "/images/DRC-D20.jpg",
    href: "/products/auto-door",
  },
];

export default function SolutionStoryTeaser() {
  return (
    <section className="shrink-0 h-[220px] sm:h-[260px] lg:h-[300px] border-t border-[#e0dbd4] overflow-hidden">
      <Gallery4 items={GALLERY_ITEMS} />
    </section>
  );
}
