'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #408CFF 0%, #2B7FFF 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const Title = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #5C5E66;
  margin: 0;
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #A0A0A0;
  margin: 0 0 32px 0;
  letter-spacing: -0.01em;
`;

const ContentArea = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E6EC;
  border-radius: 8px;
  padding: 32px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyMessage = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: #A0A0A0;
  text-align: center;
`;

export default function WorkshopPage() {
  return (
    <Container>
      <div>
        <Header>
          <Icon>📚</Icon>
          <Title>워크샵/특강</Title>
        </Header>
        <Description>
          다양한 워크샵과 특강 정보를 확인하세요.
        </Description>
      </div>
      
      <ContentArea>
        <EmptyMessage>곧 다양한 워크샵과 특강 정보가 제공될 예정입니다.</EmptyMessage>
      </ContentArea>
    </Container>
  );
}

