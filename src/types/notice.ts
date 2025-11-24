export interface Notice {
  id: number;
  title: string;
  link: string;
  content: string;
  appStartDate: string;
  appEndDate: string;
  categories: string[];
  departments: string[];
  grades: number[];
}

export interface NoticeSearchResponse {
  content: Notice[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface NoticeSearchParams {
  page?: number;
  size?: number;
  department?: string[];
  grade?: number;
  filter?: boolean;
  keyword?: string;
  title?: string;
  state?: string;
  category?: string;
}

// 사용자 정보 타입 (API 요청용)
export interface UserInfo {
  departments: string[]; // required - 배열로 변경 (전공 + 복수전공)
  grade: number; // required (1-5: 학년, 6: 졸업생, 7: 대학원생)
  interests: string[]; // required
  interest_fields?: string[]; // optional (기본값: [])
}

// 추천 프로그램 요청 타입
export interface RecommendRequest {
  user: UserInfo;
}

// 추천 프로그램 응답 타입
export interface RecommendResponse {
  content: Notice[];
}

// 공지사항 클릭 로그 요청 타입
export interface NoticeClickRequest {
  id: number;
  department: string[];
  grade: number;
  interests: string[];
}
