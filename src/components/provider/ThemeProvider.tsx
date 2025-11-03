'use client';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme, Theme } from '@/styles/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 로컬 스토리지에서 테마 모드 불러오기
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // 시스템 다크모드 감지
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme-mode', mode);
      // body에 테마 클래스 추가
      document.body.setAttribute('data-theme', mode);
    }
  }, [mode, mounted]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      <EmotionThemeProvider theme={theme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
}

