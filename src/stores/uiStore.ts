import { create } from 'zustand';

interface UIState {
  // 검색 상태
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // 필터 상태
  recruitStatus: string;
  setRecruitStatus: (status: string) => void;
  showOnlyQualified: boolean;
  setShowOnlyQualified: (show: boolean) => void;

  // 페이지네이션 상태
  currentPage: number;
  setCurrentPage: (page: number) => void;
  resetPage: () => void;

  // 반응형 상태
  isTablet: boolean;
  setIsTablet: (isTablet: boolean) => void;

  // 모든 상태 초기화
  resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // 초기 상태
  searchTerm: '',
  recruitStatus: '전체',
  showOnlyQualified: false,
  currentPage: 1,
  isTablet: false,

  // 검색 액션
  setSearchTerm: (term) => set({ searchTerm: term }),

  // 필터 액션
  setRecruitStatus: (status) => set({ recruitStatus: status }),
  setShowOnlyQualified: (show) => set({ showOnlyQualified: show }),

  // 페이지네이션 액션
  setCurrentPage: (page) => set({ currentPage: page }),
  resetPage: () => set({ currentPage: 1 }),

  // 반응형 액션
  setIsTablet: (isTablet) => set({ isTablet }),

  // 전체 초기화
  resetFilters: () =>
    set({
      searchTerm: '',
      recruitStatus: '전체',
      showOnlyQualified: false,
      currentPage: 1,
    }),
}));
