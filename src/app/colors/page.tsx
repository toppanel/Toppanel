import Image from "next/image";

export const metadata = {
  title: "컬러차트 | TOPPANEL",
  description: "탑판넬 큐비클 제품에 적용 가능한 컬러차트를 확인하세요.",
};

export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ee]">

      {/* Page header */}
      <div className="relative border-b border-[#e0dbd4] min-h-75 flex flex-col justify-center px-6 lg:px-12 py-12 overflow-hidden">
        <Image
          src="/images/page-headers/color-chart.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "40% 40%", transform: "scale(1.15)" }}
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-white/60 uppercase mb-3">
            TOPPANEL · COLOR CHART
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            컬러차트
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
            탑판넬 큐비클 제품에 적용 가능한 컬러 및 마감 옵션입니다.
          </p>
        </div>
      </div>

      {/* Chart images */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 flex flex-col gap-8">
        <div className="bg-white border border-[#e0dbd4] p-4">
          <img src="/images/color-chart/color-chart-01.jpg" alt="컬러차트 1" className="block w-full h-auto" />
        </div>
        <div className="bg-white border border-[#e0dbd4] p-4">
          <img src="/images/color-chart/color-chart-02.jpg" alt="컬러차트 2" className="block w-full h-auto" />
        </div>
      </div>

    </div>
  );
}
