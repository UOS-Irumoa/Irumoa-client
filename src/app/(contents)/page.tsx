"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import SearchBar from "@/components/main/SearchBar";
import FilterBar from "@/components/main/FilterBar";
import ProgramListItem from "@/components/main/ProgramListItem";
import RecommendSection from "@/components/main/RecommendSection";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 24px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding-bottom: 16px;
  }
`;

const ProgramList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.main};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.text.secondary};
  }
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
  ];

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

      <ProgramList>
        {mockPrograms.map((program) => (
          <ProgramListItem key={program.id} {...program} />
        ))}
      </ProgramList>
    </MainContent>
  );
}
