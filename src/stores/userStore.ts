import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 사용자 프로필 타입 (확장된 버전)
export interface UserProfile {
  college: string;
  department: string;
  doubleCollege: string;
  doubleDepartment: string;
  grade: string;
  interests: string[];
  interest_fields?: string[];
}

// 사용자 정보 타입 (API 요청용 - 간소화된 버전)
export interface UserInfo {
  department: string;
  grade: number;
  interests: string[];
  interest_fields?: string[];
}

interface UserState {
  // 프로필 상태
  profile: UserProfile | null;

  // 프로필 액션
  setProfile: (profile: UserProfile) => void;
  updateProfile: (partialProfile: Partial<UserProfile>) => void;
  clearProfile: () => void;

  // 유틸리티 메서드
  getUserInfo: () => UserInfo | null;
  getUserDepartments: () => string[];
  getUserGrade: () => number | undefined;
  hasValidProfile: () => boolean;
  isProfileComplete: () => boolean;
}

const defaultProfile: UserProfile = {
  college: '',
  department: '',
  doubleCollege: '',
  doubleDepartment: '',
  grade: '',
  interests: [],
  interest_fields: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,

      setProfile: (profile) => {
        // interest_fields가 없으면 빈 배열로 설정
        const normalizedProfile = {
          ...profile,
          interest_fields: profile.interest_fields || [],
        };
        set({ profile: normalizedProfile });

        // 커스텀 이벤트 발생 (기존 코드와의 호환성)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('profileUpdated'));
        }
      },

      updateProfile: (partialProfile) => {
        const currentProfile = get().profile;
        if (currentProfile) {
          const updatedProfile = {
            ...currentProfile,
            ...partialProfile,
          };
          get().setProfile(updatedProfile);
        }
      },

      clearProfile: () => {
        set({ profile: null });
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('profileUpdated'));
        }
      },

      // UserInfo 형식으로 변환 (API 요청용)
      getUserInfo: () => {
        const { profile } = get();
        if (!profile || !profile.department || !profile.grade || !profile.interests) {
          return null;
        }

        // 필수 필드 검증
        if (
          !profile.department.trim() ||
          !profile.grade.trim() ||
          !Array.isArray(profile.interests) ||
          profile.interests.length === 0
        ) {
          return null;
        }

        return {
          department: profile.department,
          grade: Number(profile.grade),
          interests: profile.interests,
          interest_fields: profile.interest_fields || [],
        };
      },

      // 사용자의 모든 학과 반환 (전공 + 복수전공)
      getUserDepartments: () => {
        const { profile } = get();
        if (!profile) return [];

        const departments: string[] = [];

        if (profile.department && profile.department.trim() !== '') {
          departments.push(profile.department);
        }

        if (profile.doubleDepartment && profile.doubleDepartment.trim() !== '') {
          departments.push(profile.doubleDepartment);
        }

        return departments;
      },

      // 사용자 학년 반환
      getUserGrade: () => {
        const { profile } = get();
        if (!profile || !profile.grade || profile.grade.trim() === '') {
          return undefined;
        }
        return Number(profile.grade);
      },

      // 프로필이 유효한지 확인 (필수 필드만)
      hasValidProfile: () => {
        const { profile } = get();
        if (!profile) return false;

        return Boolean(
          profile.department &&
          profile.grade &&
          profile.department.trim() !== '' &&
          profile.grade.trim() !== ''
        );
      },

      // 프로필이 완전히 입력되었는지 확인 (모든 필수 필드)
      isProfileComplete: () => {
        const { profile } = get();
        if (!profile) return false;

        return Boolean(
          profile.college &&
          profile.college.trim() !== '' &&
          profile.department &&
          profile.department.trim() !== '' &&
          profile.grade &&
          profile.grade.trim() !== '' &&
          profile.interests &&
          profile.interests.length > 0 &&
          profile.interest_fields &&
          profile.interest_fields.length > 0
        );
      },
    }),
    {
      name: 'user-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      version: 1,
      // profile만 저장 (함수들은 자동으로 제외)
      partialize: (state) => ({
        profile: state.profile,
      }),
    }
  )
);

// 편의 함수들 (기존 userStorage.ts와 호환)
export const getUserInfo = (): UserInfo | null => {
  return useUserStore.getState().getUserInfo();
};

export const setUserInfo = (userInfo: UserInfo): void => {
  const currentProfile = useUserStore.getState().profile || defaultProfile;

  useUserStore.getState().setProfile({
    ...currentProfile,
    department: userInfo.department,
    grade: String(userInfo.grade),
    interests: userInfo.interests,
    interest_fields: userInfo.interest_fields || [],
  });
};

export const clearUserInfo = (): void => {
  useUserStore.getState().clearProfile();
};
