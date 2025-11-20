import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
}

interface UserPreferencesState extends UserPreferences {
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'ko' | 'en') => void;
  setFontSize: (fontSize: 'small' | 'medium' | 'large') => void;
  toggleNotifications: () => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'ko',
  fontSize: 'medium',
  notifications: true,
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleNotifications: () =>
        set((state) => ({ notifications: !state.notifications })),
      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: 'user-preferences', // localStorage key
      storage: createJSONStorage(() => localStorage), // 명시적으로 localStorage 사용
      version: 1, // 버전 관리
      // 필요한 경우 특정 필드만 저장
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        fontSize: state.fontSize,
        notifications: state.notifications,
        // 함수들은 자동으로 제외됨
      }),
    }
  )
);
