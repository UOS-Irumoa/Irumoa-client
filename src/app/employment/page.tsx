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

export default function EmploymentPage() {
  return (
    <Container>
      <Title>취업 프로그램</Title>
      <Description>
        취업 준비를 위한 다양한 프로그램을 확인하세요.
      </Description>
      {/* 추후 컨텐츠 추가 */}
    </Container>
  );
}

