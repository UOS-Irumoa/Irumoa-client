"use client";

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/provider/Providers";
import styled from "@emotion/styled";
import Sidebar from "@/components/Sidebar";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom, #eff6ff, #dbeafe);
`;

const ContentArea = styled.main`
  flex: 1;
  background-color: #ffffff;
  min-height: 100vh;
  overflow-y: auto;
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
            <Sidebar />
            <ContentArea>{children}</ContentArea>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
