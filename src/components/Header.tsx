"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/provider/ThemeProvider";

const HeaderContainer = styled.header`
  width: 100%;
  background: ${({ theme }) => theme.colors.background.content};
  height: ${({ theme }) => theme.layout.headerHeight};

  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.padding.xl};
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;
  margin-bottom: ${({ theme }) => theme.padding.sm};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  position: relative;
  width: 91.24px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  height: 37px;
  background: linear-gradient(180deg, #408cff 0%, #2563eb 100%);
  border: none;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(64, 140, 255, 0.25);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5em;
  letter-spacing: -0.04em;
  color: #ffffff;
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

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  height: 37px;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5em;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #408cff;
    transform: translateY(-1px);
    box-shadow: 0px 4px 12px 0px rgba(64, 140, 255, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export default function Header() {
  const router = useRouter();
  const { mode, toggleTheme } = useTheme();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <HeaderContainer>
      <Logo>
        <Image
          src="/images/logo.png"
          alt="이루모아"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </Logo>
      <ActionsContainer>
        <ThemeButton onClick={toggleTheme} title="테마 변경">
          <IconWrapper>{mode === "light" ? "🌙" : "☀️"}</IconWrapper>
          <span>{mode === "light" ? "다크 모드" : "라이트 모드"}</span>
        </ThemeButton>
        <ActionButton onClick={handleProfileClick}>
          <UserIcon>
            <Image
              src="/images/user-icon-1.svg"
              alt="User"
              width={16}
              height={16}
            />
          </UserIcon>
          <span>내 정보 수정</span>
        </ActionButton>
      </ActionsContainer>
    </HeaderContainer>
  );
}
