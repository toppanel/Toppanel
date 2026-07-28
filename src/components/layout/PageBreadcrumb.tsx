'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/flexnative-breadcrumb'

const ROUTE_LABELS: Record<string, string> = {
  about:            '회사소개',
  history:          '회사 연혁',
  patents:          '특허',
  factory:          '공장 및 설비',
  location:         '오시는길',

  products:         '제품소개',
  cubicle:          '화장실칸막이',
  'auto-door':      '자동문시스템',
  'fire-resistant': '불연화장실',
  accessible:       '장애인화장실',
  urinal:           '소변기칸막이',
  'changing-room':  '탈의실',
  glass:            '유리칸막이',
  'lower-cabinet':  '하부장',
  'wall-panel':     '월패널',
  hardware:         '하드웨어',

  colors:           '컬러차트',
  solid:            '솔리드',
  wood:             '우드',
  metal:            '메탈',
  marble:           '대리석',

  universe:         'Cubicle Universe',
  making:           '제작이야기',
  material:         '자재이야기',
  installation:     '시공이야기',
  metocore:         'METOCORE 사례',
  pricing:          '가격이야기',
  improvement:      '실패와 개선',
  troubleshoot:     '문제해결사례',
  maintenance:      '유지관리/AS',
  essay:            '현장에세이',
  project:          'Universe Project',
  story:            'Universe Story',
  insight:          'Universe Insight',
  lab:              'Universe Lab',

  download:         '자료실',
  drawings:         '도면',
  specs:            '시방서',
  catalog:          '카탈로그',
  certificates:     '시험성적서',
  manual:           '설치메뉴얼',

  contact:          '문의하기',
  quote:            '견적상담',
  callback:         '콜백서비스',
  kakao:            '카카오톡 문의',
  dealer:           '대리점 문의',

  technology:       '기술소개',
}

export default function PageBreadcrumb() {
  const pathname = usePathname()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, idx) => ({
    label: ROUTE_LABELS[seg] ?? seg,
    href:  '/' + segments.slice(0, idx + 1).join('/'),
  }))

  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList className="text-[12px]">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="text-[#b0afa9] hover:text-[#888880] transition-colors">
              홈
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbSeparator className="text-[#d0cfc9]" />
            <BreadcrumbItem>
              {idx === crumbs.length - 1 ? (
                <BreadcrumbPage className="text-body font-medium">
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href} className="text-[#b0afa9] hover:text-[#888880] transition-colors">
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
