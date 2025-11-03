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
      <body>
        <EmotionThemeProvider theme={lightTheme}>
          {children}
        </EmotionThemeProvider>
      </body>
    </html>
  );
}
