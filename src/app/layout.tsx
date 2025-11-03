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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100vw;
  padding: 0 ${({ theme }) => theme.padding.container} 0;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.background.main};
  z-index: 40;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.padding.xxl} 0;
  }
`;

const MainContentArea = styled.main`
  position: fixed;
  top: calc(
    ${({ theme }) => theme.layout.headerHeight} +
      ${({ theme }) => theme.padding.md}
  );
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: ${({ theme }) => theme.padding.container};
  padding-right: ${({ theme }) => theme.padding.container};
  padding-bottom: ${({ theme }) => theme.padding.md};
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: calc(
      ${({ theme }) => theme.layout.headerHeight} +
        ${({ theme }) => theme.padding.xl}
    );
    padding-left: ${({ theme }) => theme.padding.xxl};
    padding-right: ${({ theme }) => theme.padding.xxl};
    padding-bottom: ${({ theme }) => theme.padding.xxl};
  }
`;

const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.content};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.header};
  padding: ${({ theme }) => theme.padding.xl};
  height: 100%;
  max-width: 100%;
  overflow-y: auto;
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
