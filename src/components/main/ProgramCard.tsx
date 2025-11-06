"use client";

import styled from "@emotion/styled";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
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
  color: ${({ theme }) => theme.colors.text.white};
  background: ${({ status, theme }) =>
    status === "open"
      ? theme.colors.primary.gradient
      : theme.colors.text.secondary};
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
  color: ${({ theme }) => theme.colors.primary.main};
`;

const QualificationBadge = styled.span<{ restricted?: boolean }>`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${({ restricted, theme }) =>
    restricted ? theme.colors.status.errorLight : theme.colors.border.main};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: 500;
  color: ${({ restricted, theme }) =>
    restricted ? theme.colors.status.errorLight : theme.colors.text.secondary};
`;

interface ProgramCardProps {
  id: number;
  title: string;
  category: string;
  status: "open" | "closed";
  departmentRestricted: boolean;
  gradeRestricted: boolean;
}

export default function ProgramCard({
  title,
  category,
  status,
  departmentRestricted,
  gradeRestricted,
}: ProgramCardProps) {
  return (
    <Card>
      <StatusBadge status={status}>
        {status === "open" ? "모집 중" : "모집 완료"}
      </StatusBadge>
      <ProgramTitle>{title}</ProgramTitle>
      <BadgeContainer>
        <CategoryBadge>{category}</CategoryBadge>
        <QualificationBadge restricted={departmentRestricted}>
          {departmentRestricted ? "학과 제한" : "학과 무관"}
        </QualificationBadge>
        <QualificationBadge restricted={gradeRestricted}>
          {gradeRestricted ? "학년 제한" : "학년 무관"}
        </QualificationBadge>
      </BadgeContainer>
    </Card>
  );
}

