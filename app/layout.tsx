import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/src/components/provider/Providers";

export const metadata: Metadata = {
  title: "Irumoa Client",
  description: "Modern web application built with Next.js and Emotion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
