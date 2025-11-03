'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.margin.sm};
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.margin.xl} 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
`;

const ContentArea = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.padding.xl};
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyMessage = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export default function ContestsPage() {
  return (
    <Container>
      <div>
        <Header>
          <Icon>🏆</Icon>
          <Title>대회/공모전</Title>
        </Header>
        <Description>
          다양한 대회와 공모전 정보를 확인하세요.
        </Description>
      </div>
      
      <ContentArea>
        <EmptyMessage>곧 다양한 대회와 공모전 정보가 제공될 예정입니다.</EmptyMessage>
      </ContentArea>
    </Container>
  );
}

