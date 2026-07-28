"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package, HardHat, RefreshCw, Tag, Wrench, PenLine,
  DoorOpen, Building2, Rocket, BookOpen, Lightbulb, FlaskConical,
  type LucideIcon,
} from "lucide-react";
import homepageContent from "@/content/homepage.json";

const SLIDES = homepageContent.heroSlides;

type OrbitNode = { label: string; href: string; angle: number; Icon: LucideIcon };

// Inner ring — core Cubicle Universe story series (spoked directly off the hub).
// Labels carry an invisible zero-width space (​) at their natural syllable
// break so a wrap (forced by the small circle + fixed 15px font) lands cleanly
// instead of splitting mid-word — the visible text is unchanged either way.
const INNER_NODES: OrbitNode[] = [
  { label: "자재​이야기",   href: "/story", angle: -60,  Icon: Package   },
  { label: "시공​이야기",   href: "/story", angle: 0,    Icon: HardHat   },
  { label: "실패와 개선",   href: "/story", angle: 60,   Icon: RefreshCw },
  { label: "가격​이야기",   href: "/story", angle: 120,  Icon: Tag       },
  { label: "유지관리/​AS",  href: "/story", angle: 180,  Icon: Wrench    },
  { label: "현장​에세이",   href: "/story", angle: 240,  Icon: PenLine   },
];

// Outer ring — extended case studies & feature series, offset 30° from the
// inner ring so the two hexagons interleave into a flower pattern.
const OUTER_NODES: OrbitNode[] = [
  { label: "자동문 사례",      href: "/story", angle: -90,  Icon: DoorOpen     },
  { label: "METROCORE 사례",   href: "/story", angle: -30,  Icon: Building2    },
  { label: "Universe Project", href: "/story", angle: 30,   Icon: Rocket       },
  { label: "Universe Story",   href: "/story", angle: 90,   Icon: BookOpen     },
  { label: "Universe Insight", href: "/story", angle: 150,  Icon: Lightbulb    },
  { label: "Universe Lab",     href: "/story", angle: 210,  Icon: FlaskConical },
];

// Geometry as fractions of the stage's half-width — keeps the two rings,
// the hub, and every node clear of each other at any panel size.
const F_CENTER = 0.324;
const F_R_INNER = 0.518;
const F_NR_INNER = 0.119;
const F_R_OUTER = 0.843;
const F_NR_OUTER = 0.173;

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [half, setHalf] = useState(220);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const { clientWidth: w, clientHeight: h } = el;
      setHalf(Math.max(120, Math.min(w, h) / 2 - 6));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 8400);
    return () => clearInterval(t);
  }, []);

  // Rounded to 2dp: trig-based layout math can land on a different last bit
  // between the server's Node/V8 build and the browser's V8 build, which
  // otherwise trips a hydration mismatch warning for no visible difference.
  const rnd = (n: number) => Math.round(n * 100) / 100;

  const centerR = rnd(half * F_CENTER);
  const rInner = rnd(half * F_R_INNER);
  const nrInner = rnd(half * F_NR_INNER);
  const rOuter = rnd(half * F_R_OUTER);
  const nrOuter = rnd(half * F_NR_OUTER);
  const size = rnd(half * 2);

  return (
    <section className="relative w-full bg-white h-auto lg:h-screen -mt-18 overflow-visible lg:overflow-hidden flex flex-col">
      <div className="pt-18 flex-1 flex flex-col min-h-0">
        <div className="flex-1 w-full max-w-400 mx-auto px-6 lg:px-10 py-3 lg:py-4 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 min-h-0">

          {/* LEFT — image slider */}
          <div className="relative h-[70vh] md:h-[46vh] lg:h-full min-h-80 overflow-hidden group">
            <Link href="/products" className="absolute inset-0 z-10" aria-label="제품 갤러리 보기" />

            {SLIDES.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                fill
                preload={i === 0}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={`object-cover transition-opacity duration-2000 ${i === slide ? "opacity-100" : "opacity-0"}`}
              />
            ))}

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

            <div className="absolute top-4 right-4 z-20 flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setSlide(i); }}
                  aria-label={`슬라이드 ${i + 1}`}
                  className={`h-0.75 w-5 rounded-full transition-colors ${i === slide ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute left-4 bottom-4 z-20 flex items-center gap-2.5 bg-white/90 backdrop-blur px-3.5 py-2 rounded-sm">
              <div className="relative w-8 h-8 rounded-sm overflow-hidden shrink-0">
                {/* Plain img: a 32px decorative swatch that reuses the same file as the
                    large slide — keeping it out of next/image avoids it being mistaken
                    for the same optimized asset as the (eager) full-size slide. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={SLIDES[slide].src} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-semibold text-ink">{SLIDES[slide].title}</p>
                <p className="text-[9px] text-muted tracking-wide">{SLIDES[slide].sub}</p>
              </div>
            </div>

            <div className="pointer-events-none absolute right-4 bottom-4 z-20 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white bg-black/50 group-hover:bg-navy px-3.5 py-2 rounded-full transition-colors">
              제품 갤러리 보기 →
            </div>
          </div>

          {/* RIGHT — Cubicle Universe orbit: two interleaved rings of story
              topics around a "Cubicle Universe by TOPPANEL" hub.
              Hidden on phones — the diagram needs real width to read, so it
              only appears from tablet width up. */}
          <div className="hidden md:block relative h-[46vh] lg:h-full min-h-80">
            <div ref={stageRef} className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{ width: size, height: size }}>
                <svg
                  viewBox={`${-half} ${-half} ${size} ${size}`}
                  className="absolute inset-0 w-full h-full overflow-visible"
                  style={{ animation: "orbit-fade 0.9s ease-out both" }}
                >
                  <circle r={rInner} fill="none" stroke="#9A9A9A" strokeWidth={1} />
                  <circle r={rOuter} fill="none" stroke="#9A9A9A" strokeWidth={1} />
                  {/* hub → inner node spokes */}
                  {INNER_NODES.map((n) => {
                    const rad = (n.angle * Math.PI) / 180;
                    const x = rnd(rInner * Math.cos(rad));
                    const y = rnd(rInner * Math.sin(rad));
                    return (
                      <line key={n.label} x1={0} y1={0} x2={x} y2={y} stroke="#E0E0E0" strokeWidth={1} />
                    );
                  })}
                  {/* inner ring → outer node spokes, same treatment as the hub spokes above */}
                  {OUTER_NODES.map((n) => {
                    const rad = (n.angle * Math.PI) / 180;
                    const x1 = rnd(rInner * Math.cos(rad));
                    const y1 = rnd(rInner * Math.sin(rad));
                    const x2 = rnd(rOuter * Math.cos(rad));
                    const y2 = rnd(rOuter * Math.sin(rad));
                    return (
                      <line key={n.label} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E0E0E0" strokeWidth={1} />
                    );
                  })}
                </svg>

                {/* decorative orbiting dots — continuous, purely ambient motion.
                    Each sits in its own rotating full-size layer so its position
                    sweeps around the ring; the dot itself has no orientation so
                    it never needs counter-rotating like the node labels would. */}
                <div
                  className="absolute inset-0 animate-spin pointer-events-none"
                  style={{ animationDuration: "34s", animationTimingFunction: "linear" }}
                >
                  <span
                    className="absolute left-1/2 top-1/2 block h-1.75 w-1.75 rounded-full bg-navy shadow-[0_0_8px_2px_rgba(29,53,87,0.45)]"
                    style={{ transform: `translate(-50%, calc(-50% - ${rInner}px))` }}
                  />
                </div>
                <div
                  className="absolute inset-0 animate-spin pointer-events-none"
                  style={{ animationDuration: "48s", animationDirection: "reverse", animationTimingFunction: "linear" }}
                >
                  <span
                    className="absolute left-1/2 top-1/2 block h-1.75 w-1.75 rounded-full bg-navy shadow-[0_0_8px_2px_rgba(29,53,87,0.45)]"
                    style={{ transform: `translate(-50%, calc(-50% - ${rOuter}px))` }}
                  />
                </div>

                {/* center hub */}
                <Link
                  href="/story"
                  className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-ink shadow-[0_12px_30px_-10px_rgba(17,17,17,0.15)] flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-navy hover:shadow-[0_16px_36px_-10px_rgba(29,53,87,0.35)]"
                  style={{
                    width: centerR * 2,
                    height: centerR * 2,
                    animation: "orbit-pop 0.65s cubic-bezier(0.34,1.56,0.64,1) 100ms both",
                  }}
                >
                  <p
                    className="font-bold text-ink group-hover:text-navy leading-tight transition-colors"
                    style={{ fontSize: 22 }}
                  >
                    Cubicle<br />Universe
                  </p>
                  <p
                    className="text-muted tracking-[0.15em] uppercase mt-1"
                    style={{ fontSize: 12 }}
                  >
                    by TOPPANEL
                  </p>
                </Link>

                {/* inner ring — core story series */}
                {INNER_NODES.map((n, i) => {
                  const rad = (n.angle * Math.PI) / 180;
                  const xPct = rnd(50 + ((rInner * Math.cos(rad)) / size) * 100);
                  const yPct = rnd(50 + ((rInner * Math.sin(rad)) / size) * 100);
                  return (
                    <Link
                      key={n.label}
                      href={n.href}
                      className="group absolute flex flex-col items-center justify-center gap-1.5 text-center rounded-full bg-white border border-[#9A9A9A] transition-all duration-200 hover:border-navy hover:shadow-[0_10px_24px_-8px_rgba(29,53,87,0.35)] hover:scale-110"
                      style={{
                        left: `${xPct}%`,
                        top: `${yPct}%`,
                        width: nrInner * 2,
                        height: nrInner * 2,
                        marginLeft: -nrInner,
                        marginTop: -nrInner,
                        padding: rnd(Math.max(6, nrInner * 0.18)),
                        animation: `orbit-fade 0.5s ease-out ${250 + i * 70}ms both`,
                      }}
                    >
                      <n.Icon size={18} strokeWidth={1.7} className="text-ink group-hover:text-navy transition-colors shrink-0" />
                      <span
                        className="font-semibold tracking-wide text-[#9A9A9A] group-hover:text-navy transition-colors leading-tight"
                        style={{ fontSize: 15, wordBreak: "keep-all" }}
                      >
                        {n.label}
                      </span>
                    </Link>
                  );
                })}

                {/* outer ring — extended case studies & feature series */}
                {OUTER_NODES.map((n, i) => {
                  const rad = (n.angle * Math.PI) / 180;
                  const xPct = rnd(50 + ((rOuter * Math.cos(rad)) / size) * 100);
                  const yPct = rnd(50 + ((rOuter * Math.sin(rad)) / size) * 100);
                  return (
                    <Link
                      key={n.label}
                      href={n.href}
                      className="group absolute flex flex-col items-center justify-center gap-1.5 text-center rounded-full bg-white border border-[#9A9A9A] transition-all duration-200 hover:border-navy hover:shadow-[0_10px_24px_-8px_rgba(29,53,87,0.35)] hover:scale-110"
                      style={{
                        left: `${xPct}%`,
                        top: `${yPct}%`,
                        width: nrOuter * 2,
                        height: nrOuter * 2,
                        marginLeft: -nrOuter,
                        marginTop: -nrOuter,
                        padding: rnd(Math.max(8, nrOuter * 0.16)),
                        animation: `orbit-fade 0.5s ease-out ${550 + i * 70}ms both`,
                      }}
                    >
                      <n.Icon size={18} strokeWidth={1.7} className="text-ink group-hover:text-navy transition-colors shrink-0" />
                      <span
                        className="font-semibold tracking-wide text-[#9A9A9A] group-hover:text-navy transition-colors leading-tight"
                        style={{ fontSize: 15, wordBreak: "keep-all" }}
                      >
                        {n.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
