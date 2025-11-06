"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const HeaderContainer = styled.header`
  width: 50%;
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
  gap: 16px;
`;

const UserInfoLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const UserName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1;
`;

const UserDetails = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1;
`;

const UserIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

interface UserProfile {
  college: string;
  department: string;
  doubleCollege: string;
  doubleDepartment: string;
  grade: string;
  interests: string[];
}

export default function Header() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const loadUserProfile = () => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          setUserProfile(profile);
        } catch (error) {
          console.error("Failed to parse user profile:", error);
        }
      }
    }
  };

  useEffect(() => {
    // 초기 로드
    loadUserProfile();

    // profileUpdated 이벤트 리스너 추가
    const handleProfileUpdate = () => {
      loadUserProfile();
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const getUserDisplayText = () => {
    if (!userProfile || !userProfile.department || !userProfile.grade) {
      return null;
    }

    return {
      department: userProfile.department,
      grade: `${userProfile.grade}학년`,
    };
  };

  const displayInfo = getUserDisplayText();

  return (
    <HeaderContainer>
      <ActionsContainer>
        {displayInfo && (
          <UserInfoLabel>
            <UserName>{displayInfo.department}</UserName>
            <UserDetails>{displayInfo.grade}</UserDetails>
          </UserInfoLabel>
        )}
        <ActionButton onClick={handleProfileClick}>
          <UserIcon>
            <Image
              src="/images/header/user-icon-1.svg"
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
