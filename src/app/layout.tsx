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
  background: #e3f2fd;
`;

const MainContentArea = styled.main`
  flex: 1;
  margin-left: 100px;
  margin-top: 64px;
  padding: 40px 116px 48px 116px;

  @media (max-width: 768px) {
    margin-left: 80px;
    margin-top: 64px;
    padding: 32px 40px 40px 40px;
  }
`;

const ContentWrapper = styled.div`
  background: #f0f7ff;
  border-radius: 8px;
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.05);
  padding: 32px;
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
