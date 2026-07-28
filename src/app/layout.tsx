import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "TOPPANEL — 공간을 완성하는 화장실칸막이 솔루션",
  description: "탑판넬은 화장실 칸막이 자재 생산·시공·A/S 전문기업입니다. 불연시스템·자동문·큐비클 솔루션을 원스톱으로 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="pt-18">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
