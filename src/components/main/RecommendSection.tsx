"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import RecommendCard from "./RecommendCard";
import { Notice } from "@/types/notice";
import { getRecommendedNotices } from "@/services/noticeService";
import { useUserStore } from "@/stores/userStore";
import {
  generateProfileHash,
  shouldRefetchRecommendations,
  getCachedRecommendations,
  setCachedRecommendations,
} from "@/utils/recommendCache";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  padding-bottom: 8px;
  flex-shrink: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 4px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 24px;
`;

const RefreshButton = styled.button<{ isRefreshing?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.gradient};
    border-color: transparent;
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.sm};
    filter: brightness(0.95);

    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: ${({ theme }) => theme.colors.text.secondary};
    transition: all 0.2s ease;
    animation: ${({ isRefreshing }) =>
      isRefreshing ? "spin 1s linear infinite" : "none"};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const CardContainer = styled.div`
  margin-top: 4px;
  padding: 4px 0 8px 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  overflow-y: visible;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface Program {
  id: number;
  title: string;
  category: string;
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
  link: string;
}

const LoadingText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  padding: 20px;
  margin: 0;
`;

const EmptyText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  padding: 20px;
  margin: 0;
`;

export default function RecommendSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  const profile = useUserStore((state) => state.profile);

  // Notice를 Program으로 변환하는 함수 (클라이언트에서만 실행)
  const convertNoticeToProgram = (notice: Notice): Program => {
    // 모집 상태 계산 (end date가 현재 날짜보다 뒤에 있으면 모집 중)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(notice.appStartDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(notice.appEndDate);
    endDate.setHours(0, 0, 0, 0);

    let status: "upcoming" | "open" | "closed";
    if (today < startDate) {
      status = "upcoming";
    } else if (today <= endDate) {
      // 현재 날짜가 종료일 이하 (종료일이 현재 날짜보다 뒤 또는 같음) -> 모집 중
      status = "open";
    } else {
      status = "closed";
    }

    // 학과 제한 여부 확인
    const hasDepartmentRestriction =
      notice.departments.length > 0 &&
      !notice.departments.includes("제한없음") &&
      !notice.departments.includes("전체");

    return {
      id: notice.id,
      title: notice.title,
      category: notice.categories[0] || "기타",
      status,
      departmentRestricted: hasDepartmentRestriction,
      link: notice.link,
    };
  };

  const fetchRecommendations = async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);

    // localStorage에서 사용자 정보 가져오기
    const userInfo = getUserInfo();

    if (!userInfo) {
      // 사용자 정보가 없으면 프로필 설정 페이지로 자동 리다이렉트
      window.location.href = "/profile";
      return;
    }

    try {
      // 프로필 해시 생성
      const profileHash = generateProfileHash(userInfo);

      // 강제 새로고침이 아니면 캐시 확인
      if (!forceRefresh && !shouldRefetchRecommendations(profileHash)) {
        // 캐시된 데이터 사용
        const cached = getCachedRecommendations();
        if (cached) {
          console.log("Using cached recommendations");
          const convertedPrograms = cached.data.map((notice) =>
            convertNoticeToProgram(notice)
          );
          setPrograms(convertedPrograms);
          setIsLoading(false);
          return;
        }
      }

      // 캐시를 사용할 수 없으면 API 호출
      console.log("Fetching fresh recommendations from API");
      const response = await getRecommendedNotices({ user: userInfo });

      // 응답 데이터를 캐시에 저장
      setCachedRecommendations(response.content, profileHash);

      // Notice를 Program으로 변환
      const convertedPrograms = response.content.map((notice) =>
        convertNoticeToProgram(notice)
      );

      setPrograms(convertedPrograms);
    } catch (err) {
      setError("추천 프로그램을 불러오는 중 오류가 발생했습니다.");
      console.error("Failed to fetch recommendations:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchRecommendations(true); // 강제 새로고침
  };

  useEffect(() => {
    fetchRecommendations();
  }, [profile]); // profile 변경 시 추천 프로그램 다시 불러오기

  return (
    <Section>
      <SectionHeader>
        <TitleWrapper>
          <SectionTitle>당신을 위한 추천 프로그램</SectionTitle>
        </TitleWrapper>
        <RefreshButton
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
          isRefreshing={isRefreshing}
          aria-label="추천 프로그램 새로고침"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </RefreshButton>
      </SectionHeader>
      <CardContainer>
        {isLoading ? (
          <LoadingText>추천 프로그램을 불러오는 중...</LoadingText>
        ) : error ? (
          <EmptyText>{error}</EmptyText>
        ) : programs.length === 0 ? (
          <EmptyText>추천할 프로그램이 없습니다.</EmptyText>
        ) : (
          programs.map((program) => (
            <RecommendCard key={program.id} {...program} />
          ))
        )}
      </CardContainer>
    </Section>
  );
}
