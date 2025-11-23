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
  gap: 12px;
  padding: 4px 0;
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
  line-height: 1;
  padding-bottom: 4px;
`;

const CardContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
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

// Notice를 Program으로 변환하는 어댑터 함수
function noticeToProgram(notice: Notice): Program {
  // 모집 상태 계산
  const today = new Date();
  const startDate = new Date(notice.appStartDate);
  const endDate = new Date(notice.appEndDate);

  let status: "upcoming" | "open" | "closed";
  if (today < startDate) {
    status = "upcoming";
  } else if (today <= endDate) {
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
  const getUserInfo = useUserStore((state) => state.getUserInfo);

  useEffect(() => {
    async function fetchRecommendations() {
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

        // 캐시를 사용할 수 있는지 확인
        if (!shouldRefetchRecommendations(profileHash)) {
          // 캐시된 데이터 사용
          const cached = getCachedRecommendations();
          if (cached) {
            console.log("Using cached recommendations");
            const convertedPrograms = cached.data.map((notice) =>
              noticeToProgram(notice)
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
          noticeToProgram(notice)
        );

        setPrograms(convertedPrograms);
      } catch (err) {
        setError("추천 프로그램을 불러오는 중 오류가 발생했습니다.");
        console.error("Failed to fetch recommendations:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [getUserInfo]);

  return (
    <Section>
      <SectionHeader>
        <IconWrapper>
          <Image
            src="/images/main/recommend.svg"
            alt="추천"
            width={24}
            height={24}
          />
        </IconWrapper>
        <SectionTitle>당신을 위한 추천 프로그램</SectionTitle>
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
