import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export const metadata = { title: "자재/시공 이야기 | TopPanel" };

const MATERIAL_STORIES = [
  {
    tag: "자재이야기",
    title: "LPM vs HPM — 어떤 소재를 선택해야 할까?",
    body: "저압 멜라민(LPM)과 고압 멜라민(HPM)의 차이는 단순히 가격이 아닙니다. 표면 경도, 수분 저항성, 시공 후 변형률까지 실제 데이터를 기반으로 비교합니다.",
    readTime: "5분",
  },
  {
    tag: "자재이야기",
    title: "스테인리스 안심스크린이 필요한 이유",
    body: "화장실 큐비클 하부 스크린은 가장 오염되기 쉽고 교체 비용이 높은 부위입니다. SUS 304 하부 안심스크린이 유지보수 비용을 어떻게 줄이는지 설명합니다.",
    readTime: "4분",
  },
  {
    tag: "자재이야기",
    title: "칼라강판의 내식성과 한계 — 올바른 사용 환경은?",
    body: "칼라강판은 경제적이지만 환경 선택이 잘못되면 녹 발생이 빠릅니다. 습도, 청소 빈도, 환기 조건별 적합 환경 가이드를 제공합니다.",
    readTime: "6분",
  },
  {
    tag: "자재이야기",
    title: "강화유리 소변기칸막이 — 파손 사고의 진실",
    body: "강화유리는 파손되면 작은 조각이 됩니다. 하지만 설치 방법에 따라 파손 확률을 크게 줄일 수 있습니다. 올바른 고정 방식과 두께 선택법을 공유합니다.",
    readTime: "4분",
  },
];

const CONSTRUCTION_STORIES = [
  {
    tag: "시공이야기",
    title: "학교 화장실 리모델링 — 방학 10일 안에 완성하기",
    body: "방학 기간만 활용 가능한 학교 화장실 공사. 20칸 이상 설치를 10일 이내에 마치는 공정 계획과 현장 운영 노하우를 공개합니다.",
    readTime: "7분",
  },
  {
    tag: "시공이야기",
    title: "지하철 역사 화장실 — METROCORE 스펙 맞추기",
    body: "서울교통공사 규격은 일반 큐비클과 다릅니다. 공인 시험 성적서 제출, 현장 검수 기준, 납기 관리까지 관급 공사의 A to Z를 정리했습니다.",
    readTime: "8분",
  },
  {
    tag: "시공이야기",
    title: "쇼핑몰 화장실 — 설계 단계부터 함께 하는 이유",
    body: "설계 단계에서 큐비클 레이아웃을 확정하지 않으면 나중에 비용이 3배 늘어납니다. 건축사와 협업하는 방식과 조기 개입의 이점을 설명합니다.",
    readTime: "5분",
  },
  {
    tag: "시공이야기",
    title: "OPENEASY 자동문 — 설치 후 6개월 점검 결과",
    body: "자동 슬라이딩 도어 50세트 설치 후 6개월 운영 데이터. 오작동 원인, 센서 조정 포인트, 예방 점검 항목을 공유합니다.",
    readTime: "6분",
  },
];

const FAILURE_CASES = [
  {
    title: "방수 테이프 생략 → 3개월 만에 패널 들뜸",
    lesson: "LPM 패널 설치 시 바닥 방수 테이프를 생략하면 청소 물기가 스며들어 3개월 내 패널 하부가 부풀어 오릅니다. 현재는 전 현장 필수 적용.",
  },
  {
    title: "힌지 토크 미조정 → 도어 자중 낙하 사고",
    lesson: "스테인리스 도어는 일반 LPM 도어보다 무겁습니다. 힌지 토크 값을 무게에 맞게 재조정하지 않으면 도어가 천천히 내려앉아 바닥 마찰 소음과 잠금 불량이 발생합니다.",
  },
  {
    title: "알칸막이 측벽 앵커 간격 → 진동 소음 민원",
    lesson: "측벽 앵커를 600mm 이상 간격으로 설치한 경우 화장실 내부 진동 소음이 심해집니다. 현재 기준은 400mm 이하.",
  },
];

const PROJECT_LINES = [
  {
    category: "Project",
    color: "#111111",
    items: [
      { name: "서울 A 초등학교 전관 리모델링", year: "2024" },
      { name: "인천 B 쇼핑몰 신규 입점 공사", year: "2024" },
      { name: "부산 C 공공청사 화장실 개선", year: "2023" },
      { name: "대전 D 종합병원 위생시설 교체", year: "2023" },
    ],
  },
  {
    category: "Story",
    color: "#444444",
    items: [
      { name: "20년 노하우를 담은 큐비클 선택 가이드", year: "2024" },
      { name: "현장 소장이 알려주는 하자 예방 10가지", year: "2024" },
      { name: "자재별 수명 비교 실험 결과 공개", year: "2023" },
    ],
  },
  {
    category: "Insight",
    color: "#666666",
    items: [
      { name: "2024 공중화장실 시설 기준 개정 요점", year: "2024" },
      { name: "장애인 편의시설 큐비클 설계 가이드", year: "2023" },
      { name: "어린이 화장실 안전 규정 변경 사항", year: "2023" },
    ],
  },
  {
    category: "Lab",
    color: "#888880",
    items: [
      { name: "SUS 316L vs 304 — 해안가 설치 내식성 비교", year: "2024" },
      { name: "HPM 10년 내구성 가속 시험 데이터", year: "2023" },
      { name: "도어 센서 오작동률 환경별 비교 실험", year: "2023" },
    ],
  },
];

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ee]">

      {/* Page header */}
      <div className="bg-white border-b border-[#e0dbd4] px-6 lg:px-16 py-10">
        <PageBreadcrumb />
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-2">
          CONTENT & CASES
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight mb-3">
          자재 / 시공 이야기
        </h1>
        <p className="text-[#555555] text-sm leading-relaxed max-w-xl">
          현장에서 쌓은 경험을 글로 남깁니다. 자재 선택부터 시공 실패 사례까지, 솔직하게 공유합니다.
        </p>
      </div>

      {/* Material stories */}
      <section className="px-6 lg:px-16 py-16 bg-white border-b border-[#e0dbd4]">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
          MATERIAL STORIES
        </p>
        <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-8">자재이야기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MATERIAL_STORIES.map((s, i) => (
            <article key={i} className="border border-[#e0dbd4] p-6 flex flex-col gap-3 hover:border-[#111111] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#888880] uppercase">{s.tag}</span>
                <span className="text-[10px] text-[#b0afa9]">읽기 {s.readTime}</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111] leading-snug">{s.title}</h3>
              <p className="text-xs text-[#555555] leading-relaxed flex-1">{s.body}</p>
              <p className="text-[11px] font-semibold text-[#111111] tracking-wide mt-auto">자세히 보기 →</p>
            </article>
          ))}
        </div>
      </section>

      {/* Construction stories */}
      <section className="px-6 lg:px-16 py-16 border-b border-[#e0dbd4]">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
          CONSTRUCTION STORIES
        </p>
        <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-8">시공이야기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CONSTRUCTION_STORIES.map((s, i) => (
            <article key={i} className="bg-white border border-[#e0dbd4] p-6 flex flex-col gap-3 hover:border-[#111111] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#888880] uppercase">{s.tag}</span>
                <span className="text-[10px] text-[#b0afa9]">읽기 {s.readTime}</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111] leading-snug">{s.title}</h3>
              <p className="text-xs text-[#555555] leading-relaxed flex-1">{s.body}</p>
              <p className="text-[11px] font-semibold text-[#111111] tracking-wide mt-auto">자세히 보기 →</p>
            </article>
          ))}
        </div>
      </section>

      {/* Failure & improvement */}
      <section className="px-6 lg:px-16 py-16 bg-white border-b border-[#e0dbd4]">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
          FAILURE &amp; IMPROVEMENT
        </p>
        <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-8">실패와 개선</h2>
        <div className="flex flex-col gap-4 max-w-3xl">
          {FAILURE_CASES.map((c, i) => (
            <div key={i} className="border border-[#e0dbd4] p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111111] mb-2">{c.title}</h3>
                  <p className="text-xs text-[#555555] leading-relaxed">{c.lesson}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project story line */}
      <section className="px-6 lg:px-16 py-16">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#888880] uppercase mb-4">
          PROJECT STORY LINE
        </p>
        <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-10">프로젝트 스토리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECT_LINES.map((line) => (
            <div key={line.category} className="bg-white border border-[#e0dbd4] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#e0dbd4]" style={{ backgroundColor: line.color }}>
                <p className="text-[11px] font-bold tracking-[0.2em] text-white uppercase">{line.category}</p>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {line.items.map((item, j) => (
                  <div key={j} className="border-b border-[#f0ece6] pb-3 last:border-0 last:pb-0">
                    <p className="text-[10px] text-[#b0afa9] mb-1">{item.year}</p>
                    <p className="text-xs text-[#333333] leading-snug font-medium">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
