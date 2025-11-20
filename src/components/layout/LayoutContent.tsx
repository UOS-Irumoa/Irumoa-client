"use client";

import styled from "@emotion/styled";
import { useState, useMemo, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/layout/SearchBar";
import FilterBar from "@/components/layout/FilterBar";
import ProgramListItem from "@/components/layout/ProgramListItem";
import PageButtons from "@/components/layout/PageButtons";
import { Program } from "@/data/programs";
import { getCategoryNameFromSlug } from "@/utils/categoryMapper";
import { searchNotices } from "@/services/noticeService";
import { noticesToPrograms } from "@/utils/noticeAdapter";
import { useUserStore } from "@/stores/userStore";
import { useUIStore } from "@/stores/uiStore";

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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 400px;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.border.main};
  border-top: 4px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();

  // Zustand UI 스토어에서 전역 상태 가져오기
  const searchTerm = useUIStore((state) => state.searchTerm);
  const recruitStatus = useUIStore((state) => state.recruitStatus);
  const showOnlyQualified = useUIStore((state) => state.showOnlyQualified);
  const currentPage = useUIStore((state) => state.currentPage);
  const setCurrentPage = useUIStore((state) => state.setCurrentPage);

  // 로컬 상태 (컴포넌트 전용)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Zustand 스토어에서 사용자 정보 가져오기 (안정적인 참조를 위해 개별 필드 선택)
  const department = useUserStore((state) => state.profile?.department);
  const doubleDepartment = useUserStore((state) => state.profile?.doubleDepartment);
  const grade = useUserStore((state) => state.profile?.grade);

  // 학과 목록과 학년 계산 (메모이제이션)
  const userDepartments = useMemo(() => {
    const departments: string[] = [];
    if (department?.trim()) departments.push(department);
    if (doubleDepartment?.trim()) departments.push(doubleDepartment);
    return departments;
  }, [department, doubleDepartment]);

  const userGrade = useMemo(() => {
    if (!grade?.trim()) return undefined;
    return Number(grade);
  }, [grade]);

  const ITEMS_PER_PAGE = 6;

  // 검색어 디바운싱 (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 현재 경로에서 카테고리 추출
  const currentCategory = useMemo(() => {
    if (!isMounted) return null;
    const segments = pathname?.split("/").filter(Boolean) || [];
    if (segments.length > 0 && segments[0] !== "contents") {
      return getCategoryNameFromSlug(segments[0]);
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

        // 검색어가 있을 때는 충분히 많은 데이터를 가져와서 클라이언트에서 필터링
        const searchKeyword = debouncedSearchTerm.trim();
        const shouldClientFilter = searchKeyword.length > 0;

        const response = await searchNotices({
          page: shouldClientFilter ? 0 : currentPage - 1,
          size: shouldClientFilter ? 1000 : ITEMS_PER_PAGE,
          state: recruitStatus !== "전체" ? statusMap[recruitStatus] : undefined,
          filter: showOnlyQualified || undefined,
          category: currentCategory || undefined,
          department: showOnlyQualified && userDepartments.length > 0 ? userDepartments : undefined,
          grade: showOnlyQualified && userGrade !== undefined ? userGrade : undefined,
        });

        let filteredContent = response.content;

        // 클라이언트 사이드 검색 필터링
        if (searchKeyword) {
          filteredContent = response.content.filter((notice) =>
            notice.title.toLowerCase().includes(searchKeyword.toLowerCase())
          );
        }

        // 페이지네이션 처리 (클라이언트 필터링 시)
        let paginatedContent = filteredContent;
        let calculatedTotalPages = 1;

        if (searchKeyword) {
          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
          const endIndex = startIndex + ITEMS_PER_PAGE;
          paginatedContent = filteredContent.slice(startIndex, endIndex);
          calculatedTotalPages = Math.ceil(filteredContent.length / ITEMS_PER_PAGE);
        } else {
          calculatedTotalPages = response.totalPages;
        }

        // API 데이터를 Program 형식으로 변환
        const programData = noticesToPrograms(paginatedContent);

        setPrograms(programData);
        setTotalPages(calculatedTotalPages);
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
    debouncedSearchTerm,
    recruitStatus,
    showOnlyQualified,
    currentCategory,
    department,
    doubleDepartment,
    grade,
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
  }, [currentCategory, debouncedSearchTerm, recruitStatus, showOnlyQualified, setCurrentPage]);

  return (
    <MainContent>
      <SearchSection>
        <SearchBar />
        <FilterBar />
      </SearchSection>

      <ChildrenWrapper key={isMounted ? pathname : "default"}>
        {children}
      </ChildrenWrapper>

      <ProgramListWrapper>
        {isLoading ? (
          <LoadingWrapper>
            <LoadingSpinner />
            <LoadingText>데이터를 불러오는 중...</LoadingText>
          </LoadingWrapper>
        ) : (
          <>
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
          </>
        )}
      </ProgramListWrapper>
    </MainContent>
  );
}
