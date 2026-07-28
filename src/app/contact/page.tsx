import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { COMPANY } from "@/data/data";
import contactContent from "@/content/contact.json";

export const metadata = { title: "문의하기 | TOPPANEL" };

const { header, hours, quoteEmail, dealerEmail, kakaoChannelUrl, kakaoHours, directions, faq } = contactContent;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ee]">

      {/* Page header */}
      <div className="bg-white border-b border-[#e0dbd4] px-6 lg:px-16 py-10">
        <PageBreadcrumb />
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-2">
          CONTACT
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight mb-3">
          {header.title}
        </h1>
        <p className="text-[#555555] text-sm leading-relaxed max-w-xl">
          {header.subtitle}
        </p>
      </div>

      {/* 6 contact method cards */}
      <section className="px-6 lg:px-16 py-12 border-b border-[#e0dbd4]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* 01 Phone */}
          <div className="bg-white border border-[#e0dbd4] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#888880]">01</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.59 9a19.79 19.79 0 01-3.07-8.67A2 2 0 012.48 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111111] mb-1">전화 상담</h3>
              <p className="text-xs text-[#888880] mb-3">{hours}</p>
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-xl font-bold text-[#111111] tracking-tight hover:underline underline-offset-4"
              >
                {COMPANY.phone}
              </a>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              제품 선택부터 현장 측량, 납기 일정까지 전화로 빠르게 안내받으세요.
            </p>
          </div>

          {/* 02 Quote inquiry */}
          <div className="bg-white border border-[#e0dbd4] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#888880]">02</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111111] mb-1">견적 상담</h3>
              <p className="text-xs text-[#888880] mb-3">도면·수량 첨부 가능 / 접수 후 24시간 이내 회신</p>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              현장 도면 또는 평면 스케치를 보내주시면 정확한 견적을 24시간 안에 회신드립니다.
            </p>
            <a
              href={`mailto:${quoteEmail}`}
              className="mt-auto inline-flex items-center justify-center py-2.5 bg-[#111111] text-white text-xs font-semibold tracking-wide hover:bg-[#333333] transition-colors"
            >
              견적 요청 이메일 →
            </a>
          </div>

          {/* 03 Callback */}
          <div className="bg-white border border-[#e0dbd4] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#888880]">03</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111111] mb-1">콜백 서비스</h3>
              <p className="text-xs text-[#888880] mb-3">연락처를 남기시면 담당자가 직접 연락드립니다</p>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              전화 연결이 어려우신 경우, 연락처와 희망 시간을 남겨주시면 담당자가 직접 전화드립니다.
            </p>
            <div className="mt-auto flex flex-col gap-2">
              <input
                type="tel"
                placeholder="연락처 (010-0000-0000)"
                className="w-full border border-[#e0dbd4] px-3 py-2.5 text-xs text-[#111111] placeholder:text-[#b0afa9] focus:outline-none focus:border-[#111111]"
              />
              <button className="w-full py-2.5 bg-[#111111] text-white text-xs font-semibold tracking-wide hover:bg-[#333333] transition-colors">
                콜백 요청
              </button>
            </div>
          </div>

          {/* 04 KakaoTalk */}
          <div className="bg-white border border-[#e0dbd4] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#888880]">04</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111111] mb-1">카카오톡 문의</h3>
              <p className="text-xs text-[#888880] mb-3">{kakaoHours}</p>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              카카오톡 채널 @TopPanel로 사진, 도면, 궁금한 점을 바로 전송하세요. 가장 빠르게 답변드립니다.
            </p>
            <a
              href={kakaoChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 py-2.5 bg-[#FEE500] text-[#111111] text-xs font-bold tracking-wide hover:bg-[#f0d800] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#111111">
                <path d="M12 3C6.477 3 2 6.804 2 11.5c0 2.894 1.576 5.449 4 7.1L4.5 21l3.394-1.694C9.179 19.756 10.57 20 12 20c5.523 0 10-3.804 10-8.5S17.523 3 12 3z" />
              </svg>
              카카오톡 채널 바로가기
            </a>
          </div>

          {/* 05 Dealer inquiry */}
          <div className="bg-white border border-[#e0dbd4] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#888880]">05</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111111] mb-1">대리점 문의</h3>
              <p className="text-xs text-[#888880] mb-3">지역 대리점 개설 및 도매 공급 문의</p>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              지역 대리점 개설, 도매 공급 계약, OEM 제조 문의는 이메일로 접수해 주세요.
              영업 담당자가 직접 연락드립니다.
            </p>
            <a
              href={`mailto:${dealerEmail}`}
              className="mt-auto inline-flex items-center justify-center py-2.5 border border-[#111111] text-[#111111] text-xs font-semibold tracking-wide hover:bg-[#111111] hover:text-white transition-colors"
            >
              대리점 문의 이메일 →
            </a>
          </div>

          {/* 06 Directions */}
          <div className="bg-white border border-[#e0dbd4] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#888880]">06</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111111] mb-1">오시는 길</h3>
              <p className="text-xs text-[#888880] mb-1">{directions.address}</p>
              <p className="text-xs text-[#888880]">{directions.note}</p>
            </div>
            <div className="aspect-[16/9] bg-[#f0ece6] border border-[#e0dbd4] flex items-center justify-center">
              <p className="text-[10px] text-[#b0afa9] tracking-wide">지도 준비 중</p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ quick links */}
      <section className="px-6 lg:px-16 py-12">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
          QUICK FAQ
        </p>
        <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-8">자주 묻는 질문</h2>
        <div className="flex flex-col gap-3 max-w-3xl">
          {faq.map((item, i) => (
            <details key={i} className="bg-white border border-[#e0dbd4] group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none">
                <span className="text-sm font-semibold text-[#111111]">{item.q}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="#888880"
                  strokeWidth="1.5"
                  className="shrink-0 transition-transform group-open:rotate-180"
                >
                  <path d="M2 5l5 5 5-5" />
                </svg>
              </summary>
              <div className="px-5 pb-4 pt-0 border-t border-[#f0ece6]">
                <p className="text-sm text-[#555555] leading-relaxed pt-3">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
