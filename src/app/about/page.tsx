import Image from "next/image";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import AboutSidebar from "@/components/about/AboutSidebar";
import aboutContent from "@/content/about.json";

export const metadata = { title: "회사소개 | TOPPANEL" };

const { header, philosophy, solution, certifications: CERTS, equipment: EQUIPMENT } = aboutContent;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ee]">

      {/* Page header — full width with background image */}
      <div className="relative border-b border-[#e0dbd4] min-h-80 lg:min-h-100 flex flex-col justify-center px-6 lg:px-12 py-16 overflow-hidden">
        <Image
          src={header.image}
          alt="About TOPPANEL"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Content */}
        <div className="relative z-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase mb-3">
            ABOUT TOPPANEL
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {header.title}
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-xl">
            {header.subtitle}
          </p>
        </div>
      </div>

      {/* Sidebar + content */}
      <div className="max-w-360 mx-auto w-full lg:grid lg:grid-cols-[260px_1fr] min-h-screen">
        <AboutSidebar />

        <main className="lg:border-l lg:border-[#e0dbd4] min-w-0">

      {/* ── Brand philosophy ── */}
      <section id="philosophy" className="scroll-mt-32 bg-white border-b border-[#e0dbd4] py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
            BRAND PHILOSOPHY
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-ink tracking-tight mb-2 leading-snug whitespace-pre-line">
            {philosophy.heading}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {philosophy.items.map((item) => (
              <div key={item.num} className="border-t-2 border-ink pt-5">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#888880] mb-2">{item.num}</p>
                <h3 className="text-base font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-sm text-body leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Space solution direction ── */}
      <section id="solution" className="scroll-mt-32 border-b border-[#e0dbd4] py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
            SPACE SOLUTION
          </p>
          <h2 className="text-2xl font-bold text-ink tracking-tight mb-8">
            {solution.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {solution.items.map((item) => (
              <div key={item.label} className="bg-white border border-[#e0dbd4] p-6">
                <h3 className="text-sm font-bold text-ink tracking-wide mb-3">{item.label}</h3>
                <p className="text-sm text-body leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── History ── */}
      <section id="history" className="scroll-mt-32 bg-white border-b border-[#e0dbd4] py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
            HISTORY
          </p>
          <h2 className="text-2xl font-bold text-ink tracking-tight mb-10">
            회사 연혁
          </h2>
          <HistoryTimeline />
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" className="scroll-mt-32 border-b border-[#e0dbd4] py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
            CERTIFICATIONS &amp; PATENTS
          </p>
          <h2 className="text-2xl font-bold text-ink tracking-tight mb-10">
            인증 / 특허 / 시험성적
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTS.map((cert, i) => (
              <div key={i} className="bg-white border border-[#e0dbd4] p-6 flex flex-col gap-3">
                <div className="w-12 h-14 bg-[#f0ece6] border border-[#e0dbd4] flex items-center justify-center">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="#a09990" strokeWidth="1.5">
                    <path d="M4 2h8l4 4v16a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
                    <path d="M12 2v4h4" />
                    <line x1="6" y1="10" x2="14" y2="10" />
                    <line x1="6" y1="18" x2="10" y2="18" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-white bg-ink px-2 py-0.5 inline-block mb-2">
                    {cert.badge}
                  </span>
                  <p className="text-sm font-bold text-ink">{cert.label}</p>
                  <p className="text-xs text-[#888880] mt-0.5">{cert.sub}</p>
                </div>
                <p className="text-[11px] text-[#b0afa9] mt-auto">이미지 준비 중</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manufacturing equipment ── */}
      <section id="manufacturing" className="scroll-mt-32 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
            MANUFACTURING
          </p>
          <h2 className="text-2xl font-bold text-ink tracking-tight mb-10">
            제조 및 생산 설비
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EQUIPMENT.map((eq, i) => (
              <div key={i} className="bg-white border border-[#e0dbd4] overflow-hidden">
                <div className="aspect-video bg-[#f0ece6] flex items-center justify-center border-b border-[#e0dbd4]">
                  <p className="text-[10px] text-[#b0afa9] tracking-wide">이미지 준비 중</p>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-ink mb-2">{eq.title}</h3>
                  <p className="text-xs text-body leading-relaxed">{eq.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        </main>
      </div>

    </div>
  );
}
