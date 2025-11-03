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

export default function VolunteerPage() {
  return (
    <Container>
      <Title>봉사활동/멘토링</Title>
      <Description>
        봉사활동과 멘토링 프로그램에 참여하세요.
      </Description>
      {/* 추후 컨텐츠 추가 */}
    </Container>
  );
}

