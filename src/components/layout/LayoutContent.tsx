"use client";

import styled from "@emotion/styled";
import { useState, useMemo, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/layout/SearchBar";
import FilterBar from "@/components/layout/FilterBar";
import ProgramListItem from "@/components/layout/ProgramListItem";
import PageButtons from "@/components/layout/PageButtons";
import { Program } from "@/data/programs";
import { getCategoryName } from "@/data/categories";
import { searchNotices } from "@/services/noticeService";
import { noticesToPrograms } from "@/utils/noticeAdapter";

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
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
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
  const [programs, setPrograms] = useState<Program[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  // API에서 데이터 가져오기
  useEffect(() => {
    if (!isMounted) return;

    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        // 모집 상태 매핑
        const statusMap: Record<string, string> = {
          "모집 예정": "모집예정",
          "모집 중": "모집중",
          "모집 완료": "모집완료",
        };

        const response = await searchNotices({
          page: currentPage - 1, // API는 0-based 페이지
          size: ITEMS_PER_PAGE,
          keyword: searchTerm.trim() || undefined,
          state: recruitStatus !== "전체" ? statusMap[recruitStatus] : undefined,
          filter: showOnlyQualified || undefined,
        });

        // API 데이터를 Program 형식으로 변환
        let programData = noticesToPrograms(response.content);

        // 카테고리 필터링 (클라이언트 측)
        if (currentCategory) {
          programData = programData.filter(
            (program: Program) => program.category === currentCategory
          );
        }

        setPrograms(programData);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        setPrograms([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, [
    isMounted,
    currentPage,
    searchTerm,
    recruitStatus,
    showOnlyQualified,
    currentCategory,
  ]);

  // 6개로 맞추기 위한 빈 아이템 추가
  const displayPrograms = useMemo(() => {
    const emptyCount = ITEMS_PER_PAGE - programs.length;
    if (emptyCount > 0) {
      const emptyItems = Array.from({ length: emptyCount }, (_, i) => ({
        id: `empty-${i}`,
        isEmpty: true,
      }));
      return [...programs, ...emptyItems];
    }
    return programs;
  }, [programs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 필터 조건 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, searchTerm, recruitStatus, showOnlyQualified]);

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
