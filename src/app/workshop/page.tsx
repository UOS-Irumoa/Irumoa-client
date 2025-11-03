'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

export default function WorkshopPage() {
  return (
    <Container>
      <Title>워크샵/특강</Title>
      <Description>
        다양한 워크샵과 특강 정보를 확인하세요.
      </Description>
      {/* 추후 컨텐츠 추가 */}
    </Container>
  );
}

