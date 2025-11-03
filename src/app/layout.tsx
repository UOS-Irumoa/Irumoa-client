"use client";

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/provider/Providers";
import styled from "@emotion/styled";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  background: ${({ theme }) => theme.colors.background.main};
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 0 ${({ theme }) => theme.padding.container} 0;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.padding.xl}
      ${({ theme }) => theme.padding.xxl} 0;
  }
`;

const MainContentArea = styled.main`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 0 ${({ theme }) => theme.padding.container}
    ${({ theme }) => theme.padding.section};
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.padding.xxl}
      ${({ theme }) => theme.padding.xxl};
  }
`;

const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.content};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.header};
  padding: ${({ theme }) => theme.padding.xl};
  min-height: calc(100vh - 200px);
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <AppContainer>
            <Sidebar />
            <HeaderWrapper>
              <Header />
            </HeaderWrapper>
            <MainContentArea>
              <ContentWrapper>{children}</ContentWrapper>
            </MainContentArea>
          </AppContainer>
        </Providers>
      </body>
    </html>
  );
}
