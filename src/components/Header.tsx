"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

const HeaderContainer = styled.header`
  width: auto;
  max-width: 70%;
  background: ${({ theme }) => theme.colors.background.content};
  height: ${({ theme }) => theme.layout.headerHeight};
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${({ theme }) => theme.padding.md};
  box-sizing: border-box;
  border-radius: 8px 8px 8px 8px;
  margin-bottom: ${({ theme }) => theme.padding.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 90%;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  height: 37px;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0px 2px 8px 0px rgba(64, 140, 255, 0.25);
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5em;
  letter-spacing: -0.04em;
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

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 4px 0;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 6px;
  padding: 4px 0;
  flex: 1;
  max-height: 60px; /* 최대 2줄 정도만 보이도록 제한 */
  overflow: hidden;
  margin: ${({ theme }) => theme.padding.sm};
`;

const CategoryTag = styled.span<{
  variant?: "primary" | "secondary";
  kind?: "major" | "double" | "interest";
}>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 5px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
  flex-shrink: 0;

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
    background: transparent;
    color: ${theme.colors.primary.main};
    border: 1px solid ${theme.colors.primary.main};
  `
      : `
    background: ${theme.colors.white};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.main};
  `}

  /* 반응형: 작은 화면에서는 학과/복수전공만 표시하고 관심사는 숨김 */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${({ kind }) => (kind === "interest" ? `display: none;` : "")}
  }
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
  const profile = useUserStore((state) => state.profile);
  const [isMounted, setIsMounted] = useState(false);
  const [categories, setCategories] = useState<Array<{
    label: string;
    variant: "primary" | "secondary";
    kind: "major" | "double" | "interest";
  }> | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // profile 변경 시 카테고리 다시 계산
  useEffect(() => {
    if (!profile) {
      setCategories(null);
      return;
    }

    const newCategories = [];

    // 학과 추가 (빈 문자열이 아닌 경우만)
    if (profile.department && profile.department.trim() !== "") {
      newCategories.push({
        label: profile.department,
        variant: "primary" as const,
        kind: "major" as const,
      });
    }

    // 복수전공 학과 추가 (복수전공 대학과 학과 모두 선택된 경우만)
    if (
      profile.doubleCollege &&
      profile.doubleCollege.trim() !== "" &&
      profile.doubleDepartment &&
      profile.doubleDepartment.trim() !== ""
    ) {
      newCategories.push({
        label: profile.doubleDepartment,
        variant: "primary" as const,
        kind: "double" as const,
      });
    }

    // 관심사 추가
    if (profile.interests && profile.interests.length > 0) {
      profile.interests.forEach((interest) => {
        if (interest && interest.trim() !== "") {
          newCategories.push({
            label: interest,
            variant: "secondary" as const,
            kind: "interest" as const,
          });
        }
      });
    }

    setCategories(newCategories.length > 0 ? newCategories : null);
  }, [profile]);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  // 서버/클라이언트 일치를 위해 마운트 전에는 로딩 상태 표시
  if (!isMounted) {
    return (
      <HeaderContainer>
        <ActionsContainer>
          <ActionButton onClick={handleProfileClick}>
            <UserIcon>
              <Image
                src="/images/header/profile-circle.svg"
                alt="User"
                width={22}
                height={22}
              />
            </UserIcon>
            <span>내 정보 수정</span>
          </ActionButton>
        </ActionsContainer>
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <ActionsContainer>
        {categories && (
          <CategoryWrapper>
            {categories.map((category, index) => (
              <CategoryTag
                key={index}
                variant={category.variant}
                kind={category.kind}
              >
                {category.label}
              </CategoryTag>
            ))}
          </CategoryWrapper>
        )}
        <ActionButton onClick={handleProfileClick}>
          <UserIcon>
            <Image
              src="/images/header/profile-circle.svg"
              alt="User"
              width={22}
              height={22}
            />
          </UserIcon>
          <span>내 정보 수정</span>
        </ActionButton>
      </ActionsContainer>
    </HeaderContainer>
  );
}
