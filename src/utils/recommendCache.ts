import { Notice } from "@/types/notice";

interface RecommendCache {
  data: Notice[];
  lastFetchedAt: string; // ISO 8601 형식
  userProfileHash: string; // 프로필 변경 감지용
}

const CACHE_KEY = "recommend-cache";

/**
 * 사용자 프로필의 해시 생성 (변경 감지용)
 */
export function generateProfileHash(profile: {
  departments: string[];
  grade: number;
  interests: string[];
  interest_fields?: string[];
}): string {
  return JSON.stringify({
    departments: profile.departments.sort(),
    grade: profile.grade,
    interests: profile.interests.sort(),
    interest_fields: (profile.interest_fields || []).sort(),
  });
}

/**
 * 자정인지 확인하는 함수
 */
export function isMidnightPassed(lastFetchedAt: string): boolean {
  const lastFetched = new Date(lastFetchedAt);
  const now = new Date();

  // 마지막 불러온 날짜와 현재 날짜를 비교 (시간 제외)
  const lastDate = new Date(
    lastFetched.getFullYear(),
    lastFetched.getMonth(),
    lastFetched.getDate()
  );
  const currentDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  return currentDate > lastDate;
}

/**
 * 캐시된 추천 데이터 가져오기
 */
export function getCachedRecommendations(): RecommendCache | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: RecommendCache = JSON.parse(cached);
    return data;
  } catch (error) {
    console.error("Failed to get cached recommendations:", error);
    return null;
  }
}

/**
 * 추천 데이터 캐시에 저장
 */
export function setCachedRecommendations(
  data: Notice[],
  userProfileHash: string
): void {
  try {
    const cache: RecommendCache = {
      data,
      lastFetchedAt: new Date().toISOString(),
      userProfileHash,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("Failed to cache recommendations:", error);
  }
}

/**
 * 캐시 무효화 (삭제)
 */
export function clearRecommendCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error("Failed to clear recommend cache:", error);
  }
}

/**
 * 캐시를 새로 불러와야 하는지 확인
 * @returns true면 새로 불러와야 함, false면 캐시 사용 가능
 */
export function shouldRefetchRecommendations(
  currentProfileHash: string
): boolean {
  const cached = getCachedRecommendations();

  // 캐시가 없으면 새로 불러오기
  if (!cached) return true;

  // 프로필이 변경되었으면 새로 불러오기
  if (cached.userProfileHash !== currentProfileHash) return true;

  // 자정이 지났으면 새로 불러오기
  if (isMidnightPassed(cached.lastFetchedAt)) return true;

  // 모든 조건을 통과하면 캐시 사용
  return false;
}
