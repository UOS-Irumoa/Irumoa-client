"use client";

import styled from "@emotion/styled";
import { universities } from "@/data/universities";

const ListItem = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: stretch;
  min-height: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background: rgba(0, 0, 0, 0.04);
    transform: translateY(0);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StatusBadge = styled.div<{ status: "upcoming" | "open" | "closed" }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  align-self: flex-start;
  background: ${({ status, theme }) => {
    switch (status) {
      case "upcoming":
        return "linear-gradient(135deg, #87CEEB 0%, #4A9FE8 100%)";
      case "open":
        return theme.colors.primary.gradient;
      case "closed":
        return "linear-gradient(135deg, #E0E0E0 0%, #B0B0B0 100%)";
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "upcoming":
        return theme.colors.white;
      case "open":
        return theme.colors.white;
      case "closed":
        return theme.colors.white;
    }
  }};
  box-shadow: ${({ status }) => {
    switch (status) {
      case "upcoming":
        return "0px 2px 8px 0px rgba(135, 206, 235, 0.3)";
      case "open":
        return "0px 2px 8px 0px rgba(64, 140, 255, 0.3)";
      case "closed":
        return "0px 2px 8px 0px rgba(0, 0, 0, 0.1)";
    }
  }};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 14px 12px;
  flex: 1;
`;

const ProgramTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.3;
  margin: auto 0 auto 20px;
  padding: 0 10px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProgramDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.3;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  align-items: flex-start;
  padding: 14px 16px 14px 0;
  flex-shrink: 0;
`;

const CategoryBadge = styled.span`
  padding: 4px 8px;
  background: rgba(64, 140, 255, 0.1);
  border: 1px solid rgba(64, 140, 255, 0.3);
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.main};
  white-space: nowrap;
`;

const QualificationBadge = styled.span<{ restricted?: boolean }>`
  padding: 4px 8px;
  background: ${({ restricted }) =>
    restricted ? "rgba(255, 82, 82, 0.1)" : "rgba(160, 160, 160, 0.1)"};
  border: 1px solid
    ${({ restricted }) =>
      restricted ? "rgba(255, 82, 82, 0.3)" : "rgba(160, 160, 160, 0.3)"};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 12px;
  font-weight: 500;
  color: ${({ restricted, theme }) =>
    restricted ? theme.colors.status.errorLight : theme.colors.text.secondary};
  white-space: nowrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

interface ProgramListItemProps {
  id: number;
  title: string;
  description?: string;
  category: string | string[];
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
  gradeRestricted: boolean;
  link: string;
  departments: string[];
  grades: number[];
}

export default function ProgramListItem({
  title,
  description,
  category,
  status,
  departmentRestricted,
  gradeRestricted,
  link,
  departments,
  grades,
}: ProgramListItemProps) {
  const getStatusText = (status: "upcoming" | "open" | "closed") => {
    switch (status) {
      case "upcoming":
        return "모집 예정";
      case "open":
        return "모집 중";
      case "closed":
        return "모집 완료";
    }
  };

  const getGradeText = (gradeNumbers: number[]): string => {
    if (gradeNumbers.includes(0)) {
      return "학년 무관";
    }

    // 1~5학년과 대학원생(7)이 모두 포함되어 있으면 학년 무관
    const hasAllUndergrad = [1, 2, 3, 4].every((g) => gradeNumbers.includes(g));
    if (hasAllUndergrad) {
      return "학년 무관";
    }

    const gradeMap: Record<number, string> = {
      1: "1학년",
      2: "2학년",
      3: "3학년",
      4: "4학년",
      5: "5학년",
      6: "졸업생",
      7: "대학원",
    };

    return gradeNumbers.map((g) => gradeMap[g] || g.toString()).join(", ");
  };

  const getDepartmentText = (depts: string[]): string => {
    if (depts.some((d) => d === "제한없음" || d.toLowerCase() === "all")) {
      return "학과 무관";
    }

    // 단과대학별로 그룹화
    const collegeGroups: string[] = [];
    const remainingDepts = [...depts];

    // 각 단과대학을 순회하며 모든 학과가 포함되어 있는지 확인
    for (const college of universities) {
      const collegeDepts = college.departments;
      const hasAllDepts = collegeDepts.every((dept) =>
        remainingDepts.includes(dept)
      );

      if (hasAllDepts) {
        // 해당 단과대학의 모든 학과가 포함되어 있으면 단과대학 이름 추가
        collegeGroups.push(college.university);
        // 처리된 학과들을 remainingDepts에서 제거
        collegeDepts.forEach((dept) => {
          const index = remainingDepts.indexOf(dept);
          if (index > -1) {
            remainingDepts.splice(index, 1);
          }
        });
      }
    }

    // 단과대학으로 묶인 것들과 나머지 학과들을 합쳐서 반환
    const result = [...collegeGroups, ...remainingDepts];
    return result.join(", ");
  };

  const handleClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // 카테고리 텍스트 변환 (비교과 -> 기타)
  const getCategoryText = (cat: string): string => {
    return cat === "비교과" ? "기타" : cat;
  };

  // 타이틀 truncate 처리 (70자 이상)
  const getTruncatedTitle = (text: string): string => {
    if (text.length > 80) {
      return text.substring(0, 80) + "...";
    }
    return text;
  };

  return (
    <ListItem onClick={handleClick}>
      <LeftSection>
        <StatusBadge status={status}>{getStatusText(status)}</StatusBadge>
        <ProgramTitle>{getTruncatedTitle(title)}</ProgramTitle>
        {description && (
          <ContentWrapper>
            <ProgramDescription>{description}</ProgramDescription>
          </ContentWrapper>
        )}
      </LeftSection>
      <BadgeContainer>
        {Array.isArray(category) ? (
          category.map((cat, index) => (
            <CategoryBadge key={index}>{getCategoryText(cat)}</CategoryBadge>
          ))
        ) : (
          <CategoryBadge>{getCategoryText(category)}</CategoryBadge>
        )}
        <QualificationBadge restricted={departmentRestricted}>
          {getDepartmentText(departments)}
        </QualificationBadge>
        <QualificationBadge restricted={gradeRestricted}>
          {getGradeText(grades)}
        </QualificationBadge>
      </BadgeContainer>
    </ListItem>
  );
}
