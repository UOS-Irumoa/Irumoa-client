'use client';

import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 100px;
  right: 0;
  height: 64px;
  background: #F0F7FF;
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 100;

  @media (max-width: 768px) {
    left: 80px;
    padding: 0 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoText = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #408CFF 0%, #2563EB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0px 20px;
  height: 37px;
  background: linear-gradient(135deg, #408CFF 0%, #2563EB 100%);
  border: none;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(64, 140, 255, 0.25);
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0px 4px 12px 0px rgba(64, 140, 255, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <LogoText>이루모아</LogoText>
      </Logo>
      <ActionButton>
        <span>👤</span>
        <span>내 프로필</span>
      </ActionButton>
    </HeaderContainer>
  );
}

