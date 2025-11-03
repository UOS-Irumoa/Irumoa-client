"use client";

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/provider/Providers";
import styled from "@emotion/styled";
import Navigation from "@/components/Navigation";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #eff6ff, #dbeafe);
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: calc(100vh - 80px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
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
          <Container>
            <Navigation />
            <Content>{children}</Content>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
