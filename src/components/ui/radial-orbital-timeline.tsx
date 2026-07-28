"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TimelineItem {
  id: number;
  title: string;
  korean: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  href?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const router = useRouter();
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 290;
    const radian = (angle * Math.PI) / 180;
    const x = Math.round(radius * Math.cos(radian) * 1000) / 1000;
    const y = Math.round(radius * Math.sin(radian) * 1000) / 1000;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.round(Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2))) * 1000) / 1000;
    return { x, y, zIndex, opacity };
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#f5f2ee] overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {/* Center: TOPPANEL brand circle */}
          <div className="absolute z-10 flex items-center justify-center">
            <div className="absolute w-48 h-48 rounded-full border border-[#d4cfc9] animate-ping opacity-30" />
            <div
              className="absolute w-56 h-56 rounded-full border border-[#d4cfc9] animate-ping opacity-20"
              style={{ animationDelay: "0.7s" }}
            />
            <div className="w-40 h-40 rounded-full bg-white border border-[#d4cfc9] flex items-center justify-center shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/TopPanel logo.svg"
                alt="TopPanel"
                className="w-28 object-contain"
              />
            </div>
          </div>

          {/* Orbit ring */}
          <div className="absolute w-[580px] h-[580px] rounded-full border border-[#d4cfc9] border-dashed opacity-60" />
          {/* Inner ring */}
          <div className="absolute w-[348px] h-[348px] rounded-full border border-[#d4cfc9] opacity-30" />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: pos.zIndex,
                  opacity: pos.opacity,
                }}
                onClick={() => item.href && router.push(item.href)}
              >
                {/* Node circle */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white text-[#555555] border-[#d4cfc9] hover:border-[#111111] hover:bg-[#f5f2ee] hover:text-[#111111] hover:scale-110">
                  <Icon size={30} />
                </div>

                {/* Label */}
                <div className="absolute top-[88px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-[0.12em] uppercase text-[#888880]">
                  {item.title}
                </div>
                <div className="absolute top-[102px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] text-[#b0afa9] text-center">
                  {item.korean}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
