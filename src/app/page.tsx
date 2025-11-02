'use client';

import Image from "next/image";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;

  @media (prefers-color-scheme: dark) {
    background-color: #000;
  }
`;

const Main = styled.main`
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 48rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 8rem 4rem;
  background-color: #fff;

  @media (prefers-color-scheme: dark) {
    background-color: #000;
  }

  @media (min-width: 640px) {
    align-items: flex-start;
  }
`;

const Logo = styled(Image)`
  @media (prefers-color-scheme: dark) {
    filter: invert(1);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;

  @media (min-width: 640px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const Title = styled.h1`
  max-width: 20rem;
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 2.5rem;
  letter-spacing: -0.025em;
  color: #000;

  @media (prefers-color-scheme: dark) {
    color: #fafafa;
  }
`;

const Description = styled.p`
  max-width: 28rem;
  font-size: 1.125rem;
  line-height: 2rem;
  color: #52525b;

  @media (prefers-color-scheme: dark) {
    color: #a1a1aa;
  }
`;

const Link = styled.a`
  font-weight: 500;
  color: #18181b;

  @media (prefers-color-scheme: dark) {
    color: #fafafa;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 500;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled.a`
  display: flex;
  height: 3rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  background-color: var(--foreground);
  padding: 0 1.25rem;
  color: var(--background);
  transition: background-color 0.2s;

  &:hover {
    background-color: #383838;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: #ccc;
    }
  }

  @media (min-width: 768px) {
    width: 158px;
  }
`;

const SecondaryButton = styled.a`
  display: flex;
  height: 3rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0 1.25rem;
  transition: all 0.2s;

  &:hover {
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.04);
  }

  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.145);

    &:hover {
      background-color: #1a1a1a;
    }
  }

  @media (min-width: 768px) {
    width: 158px;
  }
`;

const VercelLogo = styled(Image)`
  @media (prefers-color-scheme: dark) {
    filter: invert(1);
  }
`;

export default function Home() {
  return (
    <Container>
      <Main>
        <Logo
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <ContentWrapper>
          <Title>
            To get started, edit the page.tsx file.
          </Title>
          <Description>
            Looking for a starting point or more instructions? Head over to{" "}
            <Link
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </Link>{" "}
            or the{" "}
            <Link
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </Link>{" "}
            center.
          </Description>
        </ContentWrapper>
        <ButtonGroup>
          <PrimaryButton
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <VercelLogo
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </PrimaryButton>
          <SecondaryButton
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </SecondaryButton>
        </ButtonGroup>
      </Main>
    </Container>
  );
}
