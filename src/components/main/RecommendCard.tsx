"use client";

import styled from "@emotion/styled";

const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatusDot = styled.div<{ status: "upcoming" | "open" | "closed" }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ status }) => {
    switch (status) {
      case "upcoming":
        return "#F59E0B";
      case "open":
        return "#00BC7D";
      case "closed":
        return "#A0A0A0";
    }
  }};
`;

const StatusText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const CategoryBadge = styled.span`
  padding: 4px 10px;
  background: rgba(64, 140, 255, 0.1);
  border: 1px solid rgba(64, 140, 255, 0.3);
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 12px;
  font-weight: 500;
  color: #408cff;
  white-space: nowrap;
`;

const QualificationBadge = styled.span<{ restricted?: boolean }>`
  padding: 4px 10px;
  background: ${({ restricted }) => (restricted ? "transparent" : "#ffffff")};
  border: 1px solid
    ${({ restricted }) => (restricted ? "#FF6B6B" : "#408cff")};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 12px;
  font-weight: 500;
  color: ${({ restricted }) => (restricted ? "#FF6B6B" : "#408cff")};
  white-space: nowrap;
`;

const ProgramTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface RecommendCardProps {
  id: number;
  title: string;
  category: string;
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
}

export default function RecommendCard({
  title,
  category,
  status,
  departmentRestricted,
}: RecommendCardProps) {
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
    <Card>
      <CardHeader>
        <StatusWrapper>
          <StatusDot status={status} />
          <StatusText>{getStatusText(status)}</StatusText>
        </StatusWrapper>
        <BadgeContainer>
          <CategoryBadge>{category}</CategoryBadge>
          <QualificationBadge restricted={departmentRestricted}>
            {departmentRestricted ? "학과 제한" : "학과 무관"}
          </QualificationBadge>
        </BadgeContainer>
      </CardHeader>
      <ProgramTitle>{title}</ProgramTitle>
    </Card>
  );
}

