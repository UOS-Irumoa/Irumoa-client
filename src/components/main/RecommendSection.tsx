"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import RecommendCard from "./RecommendCard";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, #408cff 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

interface Program {
  id: number;
  title: string;
  category: string;
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
}

interface RecommendSectionProps {
  programs: Program[];
}

export default function RecommendSection({ programs }: RecommendSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <IconWrapper>
          <Image
            src="/images/main/star-icon.svg"
            alt="추천"
            width={20}
            height={20}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </IconWrapper>
        <SectionTitle>당신을 위한 추천 프로그램</SectionTitle>
      </SectionHeader>
      <CardContainer>
        {programs.map((program) => (
          <RecommendCard key={program.id} {...program} />
        ))}
      </CardContainer>
    </Section>
  );
}

