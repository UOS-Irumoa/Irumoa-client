"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

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
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 40%;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 50px 0 16px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 17px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  background: #ffffff;
  border: 0.5px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 6px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
`;

const SearchIconButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const Select = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 40px 0 13px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  background: #ffffff;
  border: 0.5px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 6px;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }

  option {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  width: 17px;
  height: 11px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 2px;
    background: #a0a0a0;
  }

  &::before {
    transform: rotate(45deg);
    left: 0;
  }

  &::after {
    transform: rotate(-45deg);
    right: 0;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 0;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  border: 0.5px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 3px;
  cursor: pointer;

  &:checked {
    accent-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const CheckboxLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  user-select: none;
`;

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ProgramCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
  }
`;

const StatusBadge = styled.div<{ status: "open" | "closed" }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 16px;
  border-radius: 8px 0px 8px 0px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background: ${({ status }) =>
    status === "open"
      ? "linear-gradient(180deg, #408CFF 0%, #2563EB 100%)"
      : "#A0A0A0"};
  box-shadow: ${({ status }) =>
    status === "open"
      ? "0px 2px 4px 0px rgba(64, 140, 255, 0.2)"
      : "0px 2px 4px 0px rgba(0, 0, 0, 0.1)"};
`;

const ProgramTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 24px 0 0 0;
  line-height: 1.4;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryBadge = styled.span`
  padding: 6px 12px;
  background: rgba(64, 140, 255, 0.1);
  border: 1px solid rgba(64, 140, 255, 0.3);
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: 500;
  color: #408cff;
`;

const QualificationBadge = styled.span<{ restricted?: boolean }>`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${({ restricted }) => (restricted ? "#FF6B6B" : "#E5E6EC")};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: 500;
  color: ${({ restricted, theme }) =>
    restricted ? "#FF6B6B" : theme.colors.text.secondary};
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
          <SearchWrapper>
            <SearchInput
              type="text"
              placeholder="프로그램 이름이나 내용 키워드로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIconButton>
              <Image
                src="/images/main/search-icon.svg"
                alt="Search"
                width={18}
                height={18}
              />
            </SearchIconButton>
          </SearchWrapper>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              id="qualified-only"
              checked={showOnlyQualified}
              onChange={(e) => setShowOnlyQualified(e.target.checked)}
            />
            <CheckboxLabel htmlFor="qualified-only">
              지원 자격 해당 항목만 표시
            </CheckboxLabel>
          </CheckboxWrapper>

          <FilterSection>
            <FilterGroup>
              <FilterLabel>모집 상태</FilterLabel>
              <SelectWrapper>
                <Select
                  value={recruitStatus}
                  onChange={(e) => setRecruitStatus(e.target.value)}
                >
                  <option value="전체">전체</option>
                  <option value="모집 중">모집 중</option>
                  <option value="모집 완료">모집 완료</option>
                </Select>
                <SelectIcon />
              </SelectWrapper>
            </FilterGroup>
          </FilterSection>
        </SearchSection>

        <Divider />

        <ProgramGrid>
          {mockPrograms.map((program) => (
            <ProgramCard key={program.id}>
              <StatusBadge status={program.status}>
                {program.status === "open" ? "모집 중" : "모집 완료"}
              </StatusBadge>
              <ProgramTitle>{program.title}</ProgramTitle>
              <BadgeContainer>
                <CategoryBadge>{program.category}</CategoryBadge>
                <QualificationBadge restricted={program.departmentRestricted}>
                  {program.departmentRestricted ? "학과 제한" : "학과 무관"}
                </QualificationBadge>
                <QualificationBadge restricted={program.gradeRestricted}>
                  {program.gradeRestricted ? "학년 제한" : "학년 무관"}
                </QualificationBadge>
              </BadgeContainer>
            </ProgramCard>
          ))}
        </ProgramGrid>
      </ContentWrapper>
    </MainContent>
  );
}
