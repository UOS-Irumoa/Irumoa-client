"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import SearchBar from "@/components/main/SearchBar";
import FilterBar from "@/components/main/FilterBar";
import ProgramCard from "@/components/main/ProgramCard";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContentWrapper = styled.div`
  padding: 24px;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding-bottom: 16px;
  }
`;

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #f0f0f0;
  margin: 12px 0;
`;

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recruitStatus, setRecruitStatus] = useState("전체");
  const [showOnlyQualified, setShowOnlyQualified] = useState(false);

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
      <ContentWrapper>
        <SearchSection>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <FilterBar
            recruitStatus={recruitStatus}
            onRecruitStatusChange={setRecruitStatus}
            showOnlyQualified={showOnlyQualified}
            onShowOnlyQualifiedChange={setShowOnlyQualified}
          />
        </SearchSection>

        <Divider />

        <ProgramGrid>
          {mockPrograms.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </ProgramGrid>
      </ContentWrapper>
    </MainContent>
  );
}
