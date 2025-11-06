"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import SearchBar from "@/components/main/SearchBar";
import FilterBar from "@/components/main/FilterBar";
import ProgramListItem from "@/components/main/ProgramListItem";
import RecommendSection from "@/components/main/RecommendSection";
import Pagination from "@/components/main/Pagination";

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
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const ProgramListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  flex: 1;
  overflow: visible;
`;

const ProgramList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.border.divider};
  margin: 12px 0;
`;

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recruitStatus, setRecruitStatus] = useState("전체");
  const [showOnlyQualified, setShowOnlyQualified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  const recommendedPrograms = [
    {
      id: 1,
      title: "2025 제1회 SEOUL:ution 해커톤",
      category: "공모전",
      status: "upcoming" as const,
      departmentRestricted: false,
    },
    {
      id: 2,
      title: "AI 융합 창업 아이디어 경진대회",
      category: "공모전",
      status: "open" as const,
      departmentRestricted: false,
    },
    {
      id: 3,
      title: "캡스톤 디자인 발표회",
      category: "공모전",
      status: "upcoming" as const,
      departmentRestricted: false,
    },
    {
      id: 4,
      title: "SW 마에스트로 멘토링",
      category: "멘토링",
      status: "open" as const,
      departmentRestricted: true,
    },
    {
      id: 5,
      title: "스타트업 CEO 특강",
      category: "특강",
      status: "open" as const,
      departmentRestricted: false,
    },
  ];

  const mockPrograms = [
    {
      id: 1,
      title: "2024 캡스톤 디자인 경진대회",
      category: "공모전",
      status: "open" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 2,
      title: "(4회차) DX 실무 워크플로우 마스터 교육",
      category: "특강",
      status: "open" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 3,
      title: "1차 BizTalk English 취업준비&커뮤니케이션 트레이닝",
      category: "특강",
      status: "closed" as const,
      departmentRestricted: true,
      gradeRestricted: false,
    },
    {
      id: 4,
      title: "안심캠퍼스 순찰대 봉사활동(11.28.)",
      category: "봉사",
      status: "closed" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 5,
      title: "안심캠퍼스 순찰대 봉사활동(11.27.)",
      category: "봉사",
      status: "closed" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 6,
      title: "안심캠퍼스 순찰대 봉사활동(11.26.)",
      category: "봉사",
      status: "closed" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 7,
      title: "2024 SW 융합 해커톤",
      category: "공모전",
      status: "open" as const,
      departmentRestricted: true,
      gradeRestricted: false,
    },
    {
      id: 8,
      title: "글로벌 기업 탐방 프로그램",
      category: "취업",
      status: "upcoming" as const,
      departmentRestricted: false,
      gradeRestricted: true,
    },
    {
      id: 9,
      title: "AI 개발자 양성 특강",
      category: "특강",
      status: "open" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 10,
      title: "창업 아이디어 경진대회",
      category: "공모전",
      status: "upcoming" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 11,
      title: "코딩 테스트 대비 특강",
      category: "특강",
      status: "open" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 12,
      title: "지역사회 봉사활동",
      category: "봉사",
      status: "open" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 13,
      title: "스타트업 인턴십 프로그램",
      category: "취업",
      status: "closed" as const,
      departmentRestricted: true,
      gradeRestricted: true,
    },
    {
      id: 14,
      title: "UX/UI 디자인 워크샵",
      category: "특강",
      status: "upcoming" as const,
      departmentRestricted: false,
      gradeRestricted: false,
    },
    {
      id: 15,
      title: "데이터 분석 경진대회",
      category: "공모전",
      status: "open" as const,
      departmentRestricted: true,
      gradeRestricted: false,
    },
  ];

  // 페이지네이션 계산
  const totalPages = Math.ceil(mockPrograms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPrograms = mockPrograms.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

      <RecommendSection programs={recommendedPrograms} />

      <ProgramListWrapper>
        <ProgramListContainer>
          <ProgramList>
            {currentPrograms.map((program) => (
              <ProgramListItem key={program.id} {...program} />
            ))}
          </ProgramList>
        </ProgramListContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </ProgramListWrapper>
    </MainContent>
  );
}
