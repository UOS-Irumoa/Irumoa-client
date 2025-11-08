"use client";

import styled from "@emotion/styled";
import { useState, useMemo, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/layout/SearchBar";
import FilterBar from "@/components/layout/FilterBar";
import ProgramListItem from "@/components/layout/ProgramListItem";
import PageButtons from "@/components/layout/PageButtons";
import { programs } from "@/data/programs";
import { getCategoryName } from "@/data/categories";

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

const ChildrenWrapper = styled.div`
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProgramList = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  flex: 1;
  min-height: 0;
  gap: 8px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [recruitStatus, setRecruitStatus] = useState("전체");
  const [showOnlyQualified, setShowOnlyQualified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 현재 경로에서 카테고리 추출
  const currentCategory = useMemo(() => {
    if (!isMounted) return null;
    const segments = pathname?.split("/").filter(Boolean) || [];
    if (segments.length > 0 && segments[0] !== "contents") {
      return getCategoryName(segments[0]);
    }
    return null;
  }, [pathname, isMounted]);

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

  // 6개로 맞추기 위한 빈 아이템 추가
  const displayPrograms = useMemo(() => {
    const emptyCount = ITEMS_PER_PAGE - currentPrograms.length;
    if (emptyCount > 0) {
      const emptyItems = Array.from({ length: emptyCount }, (_, i) => ({
        id: `empty-${i}`,
        isEmpty: true,
      }));
      return [...currentPrograms, ...emptyItems];
    }
    return currentPrograms;
  }, [currentPrograms]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 카테고리 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory]);

  return (
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

      <ChildrenWrapper key={isMounted ? pathname : "default"}>
        {children}
      </ChildrenWrapper>

      <ProgramListWrapper>
        <ProgramList
          key={isMounted ? `${currentCategory}-${currentPage}` : "default"}
        >
          {displayPrograms.map((program: any) => {
            if (program.isEmpty) {
              return <div key={program.id} style={{ visibility: "hidden" }} />;
            }
            return <ProgramListItem key={program.id} {...program} />;
          })}
        </ProgramList>
        <PageButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </ProgramListWrapper>
    </MainContent>
  );
}
