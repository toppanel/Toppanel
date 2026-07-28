"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

export interface Slide {
  src: string;
  name: string;
}

interface CircularTestimonialsProps {
  testimonials: Slide[];
  autoplay?: boolean;
}

function calculateGap(width: number) {
  const minWidth = 300;
  const maxWidth = 720;
  const minGap = 36;
  const maxGap = 68;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials = [],
  autoplay = true,
}: CircularTestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(500);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = useMemo(() => testimonials.length, [testimonials]);

  useEffect(() => {
    function onResize() {
      if (imageContainerRef.current)
        setContainerWidth(imageContainerRef.current.offsetWidth);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 12000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [autoplay, total]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft  = (activeIndex - 1 + total) % total === index;
    const isRight = (activeIndex + 1) % total === index;

    const center = "translate(-50%, -50%)";

    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: "auto",
      transform: `${center} scale(1) rotateY(0deg)`,
      transition: "all 1.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };
    if (isLeft) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto",
      transform: `${center} translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
      transition: "all 1.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };
    if (isRight) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto",
      transform: `${center} translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
      transition: "all 1.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };
    return {
      zIndex: 1, opacity: 0, pointerEvents: "none",
      transform: center,
      transition: "all 1.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  }

  return (
    <div
      ref={imageContainerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {testimonials.map((item, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={item.src}
          src={item.src}
          alt={item.name}
          className="absolute object-cover rounded-xl shadow-lg"
          style={{
            width: "65%",
            aspectRatio: "3/4",
            top: "50%",
            left: "50%",
            ...getImageStyle(index),
          }}
        />
      ))}
    </div>
  );
};

export default CircularTestimonials;
