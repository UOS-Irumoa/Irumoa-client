"use client";

import styled from "@emotion/styled";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-shrink: 0;
  width: calc((100% - 40px) / 5); /* 5개 카드, gap 10px × 4 = 40px */
  min-width: 180px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: calc((100% - 30px) / 4); /* 4개 카드 */
    min-width: 160px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc((100% - 20px) / 3); /* 3개 카드 */
    min-width: 140px;
  }

  @media (max-width: 640px) {
    width: calc((100% - 10px) / 2); /* 2개 카드 */
    min-width: 120px;
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
  gap: 3px;
  white-space: nowrap;
`;

const StatusDot = styled.div<{ status: "upcoming" | "open" | "closed" }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
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
  box-shadow: ${({ status }) => {
    switch (status) {
      case "upcoming":
        return "0px 0px 4px 0px rgba(135, 206, 235, 0.5)";
      case "open":
        return "0px 0px 4px 0px rgba(64, 140, 255, 0.5)";
      case "closed":
        return "none";
    }
  }};
`;

const StatusText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`;

const BadgeContainer = styled.div`
  display: flex;
  overflow: hidden;
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
  color: ${({ theme }) => theme.colors.primary.main};
  white-space: nowrap;
  flex: 1;
`;

const QualificationBadge = styled.span<{ restricted?: boolean }>`
  padding: 4px 10px;
  background: ${({ restricted, theme }) =>
    restricted ? "transparent" : theme.colors.white};
  border: 1px solid
    ${({ restricted, theme }) =>
      restricted ? theme.colors.status.errorLight : theme.colors.primary.main};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 12px;
  font-weight: 500;
  color: ${({ restricted, theme }) =>
    restricted ? theme.colors.status.errorLight : theme.colors.primary.main};
  white-space: nowrap;
  flex: 1;
`;

const ProgramTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface RecommendCardProps {
  id: number;
  title: string;
  category: string;
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
  link: string;
}

export default function RecommendCard({
  title,
  category,
  status,
  departmentRestricted,
  link,
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

  const handleClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <Card onClick={handleClick}>
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
