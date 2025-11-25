"use client";

import "../globals.css";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { lightTheme } from "@/styles/theme";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <title>이루모아 - 프로필 설정</title>
        <meta
          name="description"
          content="서울시립대학교 학생들을 위한 맞춤형 비교과 프로그램 추천 플랫폼"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/header/logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <EmotionThemeProvider theme={lightTheme}>
          {children}
        </EmotionThemeProvider>
      </body>
    </html>
  );
}
