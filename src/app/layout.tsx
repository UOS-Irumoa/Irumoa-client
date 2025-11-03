"use client";

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/provider/Providers";
import styled from "@emotion/styled";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.main};
`;

const MainContentArea = styled.main`
  flex: 1;
  margin-left: ${({ theme }) => theme.layout.sidebarWidth};
  margin-top: ${({ theme }) => theme.layout.headerHeight};
  padding: ${({ theme }) => theme.padding.xxl}
    ${({ theme }) => theme.padding.container}
    ${({ theme }) => theme.padding.section}
    ${({ theme }) => theme.padding.container};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: ${({ theme }) => theme.layout.sidebarWidthMobile};
    margin-top: ${({ theme }) => theme.layout.headerHeight};
    padding: ${({ theme }) => theme.padding.xl}
      ${({ theme }) => theme.padding.xxl} ${({ theme }) => theme.padding.xxl}
      ${({ theme }) => theme.padding.xxl};
  }
`;

const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.content};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.header};
  padding: ${({ theme }) => theme.padding.xl};
  min-height: calc(100vh - 152px);
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
            <Header />
            <MainContentArea>
              <ContentWrapper>{children}</ContentWrapper>
            </MainContentArea>
          </AppContainer>
        </Providers>
      </body>
    </html>
  );
}
