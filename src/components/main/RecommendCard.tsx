"use client";

import styled from "@emotion/styled";
import { logNoticeClick } from "@/services/noticeService";
import { useUserStore } from "@/stores/userStore";

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
  width: 100%;
  min-height: 80px;
  max-width: 100%;
  overflow: hidden;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background: rgba(0, 0, 0, 0.04);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-width: 0;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  flex-shrink: 0;
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
  flex-shrink: 1;
  min-width: 0;
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
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  min-width: 0;
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
  flex-shrink: 0;
`;

const ProgramTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
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
  id,
  title,
  category,
  status,
  departmentRestricted,
  link,
}: RecommendCardProps) {
  const getUserInfo = useUserStore((state) => state.getUserInfo);

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

  const handleClick = async () => {
    // 사용자 정보 가져오기
    const userInfo = getUserInfo();

    if (userInfo) {
      // 클릭 로그 전송 (비동기, 실패해도 링크는 열림)
      logNoticeClick({
        id,
        department: userInfo.departments,
        grade: userInfo.grade,
        interests: userInfo.interests,
      }).catch((error) => {
        console.error("Failed to log notice click:", error);
      });
    }

    // 링크 열기
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
