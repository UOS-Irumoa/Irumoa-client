"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import RecommendCard from "./RecommendCard";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  padding-bottom: 8px;
  flex-shrink: 0;
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
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
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
            src="/images/main/recommend.svg"
            alt="추천"
            width={32}
            height={32}
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
