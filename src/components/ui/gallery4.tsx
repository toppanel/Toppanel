"use client";

import { ArrowRight } from "lucide-react";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

interface Gallery4Props {
  items: Gallery4Item[];
}

const Gallery4 = ({ items = [] }: Gallery4Props) => {
  return (
    <div className="h-full w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="h-full flex items-stretch gap-3 px-6 py-4 w-fit mx-auto">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="group relative flex h-full w-[200px] sm:w-[230px] lg:w-[260px] shrink-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Full-bleed image */}
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Gradient: bg color on left → transparent */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, #f5f2ee 0%, #f5f2ee 38%, rgba(245,242,238,0.7) 52%, rgba(245,242,238,0) 72%)",
              }}
            />

            {/* Left text */}
            <div className="relative z-20 flex flex-col justify-center px-5 py-3 w-[48%] shrink-0">
              <p className="text-[8px] font-bold tracking-[0.35em] uppercase text-[#888880] mb-1.5">
                {item.description}
              </p>
              <p className="text-[12px] font-semibold text-[#111111] leading-snug line-clamp-2">
                {item.title}
              </p>
              <ArrowRight
                size={11}
                className="mt-2 text-[#b0afa9] group-hover:text-[#111111] group-hover:translate-x-0.5 transition-all duration-200"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export { Gallery4 };
