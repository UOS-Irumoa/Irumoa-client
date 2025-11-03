"use client";

import styled from "@emotion/styled";
import { useTheme } from "@/components/provider/ThemeProvider";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: ${({ theme }) => theme.layout.sidebarWidth};
  right: 0;
  height: ${({ theme }) => theme.layout.headerHeight};
  background: ${({ theme }) => theme.colors.background.content};
  box-shadow: ${({ theme }) => theme.shadows.header};
  border-radius: 0px 0px ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.padding.xl};
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: ${({ theme }) => theme.layout.sidebarWidthMobile};
    padding: 0 ${({ theme }) => theme.padding.lg};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LogoText = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ThemeToggleButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.button};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0px ${({ theme }) => theme.padding.lg};
  height: 37px;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.buttonActive};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.white};
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
  const { mode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Logo>
        <LogoText>이루모아</LogoText>
      </Logo>
      <ActionsContainer>
        <ThemeToggleButton onClick={toggleTheme} title="테마 변경">
          {mode === "light" ? "🌙" : "☀️"}
        </ThemeToggleButton>
        <ActionButton>
          <span>👤</span>
          <span>내 정보 수정</span>
        </ActionButton>
      </ActionsContainer>
    </HeaderContainer>
  );
}
