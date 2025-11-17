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
  state?: string;
}
