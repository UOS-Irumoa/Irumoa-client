"use client";

import "../globals.css";
import Providers from "@/components/provider/Providers";
import styled from "@emotion/styled";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import LayoutContent from "@/components/layout/LayoutContent";

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
  max-width: 100vw;
  min-width: 600px;
  overflow-x: auto;
  overflow-y: hidden;
  background: ${({ theme }) => theme.colors.background.main};
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.padding.md};
  left: ${({ theme }) => theme.padding.xl};
  display: flex;
  align-items: center;
  height: 64px;
  width: 170px;
  z-index: 41;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: ${({ theme }) => theme.padding.xxl};
  }
`;

const Logo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => theme.padding.md} ${({ theme }) => theme.padding.xl};
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.background.main};
  z-index: 40;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.padding.md}
      ${({ theme }) => theme.padding.xl};
  }
`;

const MainContentArea = styled.main`
  flex: 1;
  width: 100%;
  padding-left: ${({ theme }) => theme.padding.container};
  padding-right: ${({ theme }) => theme.padding.xl};
  padding-bottom: ${({ theme }) => theme.padding.xl};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => theme.padding.xxl};
  }
`;

const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.content};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.header};
  padding: ${({ theme }) => theme.padding.md};
  max-width: 100%;
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
            <LogoWrapper>
              <Logo>
                <Image
                  src="/images/header/logo.svg"
                  alt="이루모아"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Logo>
            </LogoWrapper>
            <HeaderWrapper>
              <Header />
            </HeaderWrapper>
            <MainContentArea>
              <ContentWrapper>
                <LayoutContent>{children}</LayoutContent>
              </ContentWrapper>
            </MainContentArea>
          </AppContainer>
        </Providers>
      </body>
    </html>
  );
}
