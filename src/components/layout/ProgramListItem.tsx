"use client";

import styled from "@emotion/styled";

const ListItem = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: stretch;
  gap: 16px;
  min-height: 0;

  &:hover {
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
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
        return "rgba(64, 140, 255, 0.1)";
      case "open":
        return theme.colors.primary.main;
      case "closed":
        return theme.colors.background.content;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "upcoming":
        return theme.colors.primary.main;
      case "open":
        return theme.colors.white;
      case "closed":
        return theme.colors.text.secondary;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px 16px;
  }
`;

const ProgramTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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
  flex-wrap: wrap;
  gap: 6px;
  align-items: flex-start;
  padding: 14px 16px 14px 0;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0 16px 14px 16px;
  }
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
`;

interface ProgramListItemProps {
  id: number;
  title: string;
  description?: string;
  category: string;
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
  gradeRestricted: boolean;
}

export default function ProgramListItem({
  title,
  description,
  category,
  status,
  departmentRestricted,
  gradeRestricted,
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

  return (
    <ListItem>
      <LeftSection>
        <StatusBadge status={status}>{getStatusText(status)}</StatusBadge>
        <ProgramTitle>{title}</ProgramTitle>
        {description && (
          <ContentWrapper>
            <ProgramDescription>{description}</ProgramDescription>
          </ContentWrapper>
        )}
      </LeftSection>
      <BadgeContainer>
        <CategoryBadge>{category}</CategoryBadge>
        <QualificationBadge restricted={departmentRestricted}>
          {departmentRestricted ? "학과 제한" : "학과 무관"}
        </QualificationBadge>
        <QualificationBadge restricted={gradeRestricted}>
          {gradeRestricted ? "학년 제한" : "학년 무관"}
        </QualificationBadge>
      </BadgeContainer>
    </ListItem>
  );
}
