"use client";

import type { Metadata } from "next";
import "../globals.css";
import Providers from "@/components/provider/Providers";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SearchBar from "@/components/layout/SearchBar";
import FilterBar from "@/components/layout/FilterBar";
import ProgramListItem from "@/components/layout/ProgramListItem";
import PageButtons from "@/components/layout/PageButtons";
import { programs } from "@/data/programs";
import { getCategoryName } from "@/data/categories";

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.main};
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.padding.md};
  left: ${({ theme }) => theme.padding.xl};
  display: flex;
  align-items: center;
  height: 64px;
  width: 170px;
  z-index: 41;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: ${({ theme }) => theme.padding.xxl};
  }
`;

const Logo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => theme.padding.md} ${({ theme }) => theme.padding.xl};
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.background.main};
  z-index: 40;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.padding.md}
      ${({ theme }) => theme.padding.xl};
  }
`;

const MainContentArea = styled.main`
  flex: 1;
  width: 100%;
  padding-left: ${({ theme }) => theme.padding.container};
  padding-right: ${({ theme }) => theme.padding.xl};
  padding-bottom: ${({ theme }) => theme.padding.xl};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => theme.padding.xxl};
  }
`;

const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.content};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.header};
  padding: ${({ theme }) => theme.padding.md};
  max-width: 100%;
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding-bottom: 16px;
  }
`;

const ProgramListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 18px;
  margin-top: 8px;
  overflow: hidden;
`;

const ProgramList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: 8px;
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [recruitStatus, setRecruitStatus] = useState("전체");
  const [showOnlyQualified, setShowOnlyQualified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  // 현재 경로에서 카테고리 추출
  const currentCategory = useMemo(() => {
    const segments = pathname?.split("/").filter(Boolean) || [];
    if (segments.length > 0 && segments[0] !== "contents") {
      return getCategoryName(segments[0]);
    }
    return null;
  }, [pathname]);

  // 카테고리별 필터링된 프로그램
  const filteredPrograms = useMemo(() => {
    if (!currentCategory) return programs;
    return programs.filter((program) => program.category === currentCategory);
  }, [currentCategory]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPrograms = filteredPrograms.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 카테고리 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory]);

  return (
    <html lang="ko">
      <body>
        <Providers>
          <AppContainer>
            <Sidebar />
            <LogoWrapper>
              <Logo>
                <Image
                  src="/images/header/logo.svg"
                  alt="이루모아"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Logo>
            </LogoWrapper>
            <HeaderWrapper>
              <Header />
            </HeaderWrapper>
            <MainContentArea>
              <ContentWrapper>
                <MainContent>
                  <SearchSection>
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    <FilterBar
                      recruitStatus={recruitStatus}
                      onRecruitStatusChange={setRecruitStatus}
                      showOnlyQualified={showOnlyQualified}
                      onShowOnlyQualifiedChange={setShowOnlyQualified}
                    />
                  </SearchSection>

                  {children}

                  <ProgramListWrapper>
                    <ProgramList>
                      {currentPrograms.map((program) => (
                        <ProgramListItem key={program.id} {...program} />
                      ))}
                    </ProgramList>
                    <PageButtons
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </ProgramListWrapper>
                </MainContent>
              </ContentWrapper>
            </MainContentArea>
          </AppContainer>
        </Providers>
      </body>
    </html>
  );
}
