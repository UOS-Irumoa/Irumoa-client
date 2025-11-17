import {
  NoticeSearchParams,
  NoticeSearchResponse,
} from "@/types/notice";

const BASE_URL = "https://uoscholar-server.store/irumoa-api";

export async function searchNotices(
  params: NoticeSearchParams = {}
): Promise<NoticeSearchResponse> {
  const searchParams = new URLSearchParams();

  // 페이지네이션 파라미터
  searchParams.append("page", (params.page ?? 0).toString());
  searchParams.append("size", (params.size ?? 10).toString());

  // 학과 필터링 (배열로 여러 개 추가 가능)
  if (params.department && params.department.length > 0) {
    params.department.forEach((dept) => {
      searchParams.append("department", dept);
    });
  }

  // 학년 필터링
  if (params.grade !== undefined) {
    searchParams.append("grade", params.grade.toString());
    searchParams.append("filter", "true");
  }

  // filter 파라미터
  if (params.filter !== undefined) {
    searchParams.append("filter", params.filter.toString());
  }

  // 키워드 검색 (전체 검색)
  if (params.keyword) {
    searchParams.append("keyword", params.keyword);
  }

  // 제목 검색
  if (params.title) {
    searchParams.append("title", params.title);
  }

  // 모집 상태 필터링
  if (params.state) {
    searchParams.append("state", params.state);
  }

  // 카테고리 필터링
  if (params.category) {
    searchParams.append("category", params.category);
  }

  const url = `${BASE_URL}/notices/search?${searchParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // 에러를 던지지 않고 빈 응답 반환
      return {
        content: [],
        page: 0,
        size: params.size ?? 10,
        totalElements: 0,
        totalPages: 0,
      };
    }

    const data: NoticeSearchResponse = await response.json();
    return data;
  } catch (error) {
    // 에러 발생 시에도 빈 응답 반환
    return {
      content: [],
      page: 0,
      size: params.size ?? 10,
      totalElements: 0,
      totalPages: 0,
    };
  }
}

/**
 * 전체 공지사항에서 고유한 카테고리 목록 추출
 */
export async function getCategories(): Promise<string[]> {
  try {
    // 충분히 많은 데이터를 가져와서 모든 카테고리 파악
    const response = await searchNotices({ page: 0, size: 1000 });

    const categoriesSet = new Set<string>();

    response.content.forEach((notice) => {
      notice.categories.forEach((category) => {
        categoriesSet.add(category);
      });
    });

    return Array.from(categoriesSet).sort();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
