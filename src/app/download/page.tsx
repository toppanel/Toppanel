"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import downloadsContent from "@/content/downloads.json";

type FileItem = {
  name: string;
  desc: string;
  size: string;
  updated: string;
  category: string;
};

const { header, files: FILES } = downloadsContent as { header: { title: string; subtitle: string }; files: FileItem[] };

const TABS = ["전체", "도면", "시방서", "카탈로그", "시험성적서", "설치매뉴얼"] as const;
type Tab = (typeof TABS)[number];

function DocIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
      <path d="M4 2h6l4 4v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
      <path d="M10 2v4h4" />
      <line x1="5" y1="10" x2="13" y2="10" />
      <line x1="5" y1="14" x2="13" y2="14" />
      <line x1="5" y1="18" x2="9" y2="18" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
      <path d="M7 2v7M4 6l3 3 3-3" />
      <path d="M2 11h10" />
    </svg>
  );
}

export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState<Tab>("전체");

  const filtered = activeTab === "전체" ? FILES : FILES.filter((f) => f.category === activeTab);

  return (
    <div className="min-h-screen bg-[#f5f2ee]">

      {/* Page header */}
      <div className="bg-white border-b border-[#e0dbd4] px-6 lg:px-16 py-10">
        <PageBreadcrumb />
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-2">
          RESOURCES
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight mb-3">
          {header.title}
        </h1>
        <p className="text-[#555555] text-sm leading-relaxed max-w-xl">
          {header.subtitle}
        </p>
      </div>

      {/* Tab filter */}
      <div className="bg-white border-b border-[#e0dbd4] px-6 lg:px-16">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3.5 text-[12px] font-semibold tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[#111111] text-[#111111]"
                  : "border-transparent text-[#888880] hover:text-[#333333]"
              }`}
            >
              {tab}
              {tab !== "전체" && (
                <span className="ml-1.5 text-[10px] text-[#b0afa9]">
                  ({FILES.filter((f) => f.category === tab).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* File list */}
      <div className="px-6 lg:px-16 py-10">
        <div className="flex flex-col gap-2">
          {filtered.map((file, i) => (
            <div
              key={i}
              className="bg-white border border-[#e0dbd4] px-5 py-4 flex items-center gap-4 hover:border-[#111111] transition-colors group"
            >
              <div className="text-[#888880] group-hover:text-[#111111] transition-colors">
                <DocIcon />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-white bg-[#888880] px-1.5 py-0.5">
                    {file.category}
                  </span>
                  <p className="text-sm font-semibold text-[#111111] truncate">{file.name}</p>
                </div>
                <p className="text-xs text-[#888880] truncate">{file.desc}</p>
              </div>
              <div className="hidden sm:flex items-center gap-6 shrink-0 text-xs text-[#b0afa9]">
                <span>{file.updated}</span>
                <span>{file.size}</span>
              </div>
              <button
                aria-label={`${file.name} 다운로드`}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 border border-[#e0dbd4] text-[11px] font-semibold text-[#333333] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors"
              >
                <DownloadIcon />
                다운로드
              </button>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-8 border border-[#e0dbd4] bg-[#faf9f7] px-5 py-4">
          <p className="text-[11px] text-[#888880] leading-relaxed">
            <span className="font-semibold text-[#111111]">※ 자료 이용 안내</span>
            &nbsp;— 본 자료는 TopPanel 제품 설계·시공 목적으로만 사용할 수 있습니다.
            상업적 재배포 및 타 제조사 제품 적용은 금지됩니다.
            최신 버전 여부 확인이 필요한 경우 고객 인터페이스 페이지를 통해 문의해 주세요.
          </p>
        </div>
      </div>

    </div>
  );
}
