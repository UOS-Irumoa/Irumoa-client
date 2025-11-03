"use client";

import styled from "@emotion/styled";

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  background: linear-gradient(135deg, #5b7fff 0%, #4a6fee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(91, 127, 255, 0.15);
    border-color: #5b7fff;
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
`;

const categories = [
  {
    icon: "🏆",
    title: "대회/공모전",
    description: "다양한 분야의 대회와 공모전 정보를 한눈에 확인하세요.",
  },
  {
    icon: "🎓",
    title: "취업 프로그램",
    description: "취업 준비를 위한 실전 프로그램과 교육 과정을 제공합니다.",
  },
  {
    icon: "📘",
    title: "봉사활동/멘토링",
    description: "사회 공헌 활동과 멘토링을 통해 성장의 기회를 얻으세요.",
  },
  {
    icon: "📚",
    title: "워크샵/특강",
    description: "전문가와 함께하는 실무 중심의 워크샵과 특강에 참여하세요.",
  },
];

export default function MainPage() {
  return (
    <Container>
      <Header>
        <Title>이루모아</Title>
        <Subtitle>대학생을 위한 모든 활동 정보를 한 곳에서 확인하세요</Subtitle>
      </Header>

      <Grid>
        {categories.map((category) => (
          <Card key={category.title}>
            <CardIcon>{category.icon}</CardIcon>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

