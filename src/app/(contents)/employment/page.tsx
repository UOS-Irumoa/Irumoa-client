'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

export default function EmploymentPage() {
  return (
    <Container>
      <Title>취업</Title>
      <Description>
        취업 프로그램 정보를 확인하고 참여할 수 있습니다.
      </Description>
    </Container>
  );
}

