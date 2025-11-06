"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background.main};
  background-image: url("/images/profile/profile-background.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
`;

const ProfileSection = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  right: 0;
  width: 80vw;
  height: 12vh;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.paper};
  gap: ${({ theme }) => theme.spacing.md};
  padding-left: 30px;
  z-index: 101;
  border-radius: 10px;
  opacity: 0.8;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
`;

const ProfileIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1.2em;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: 1.4em;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background: transparent;
  border-radius: 12px;
  padding: ${({ theme }) => theme.padding.lg};
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  padding-bottom: 10px;

  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.border.main};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  position: relative;

  &.full-width {
    flex: 1;
  }
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2em;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const RequiredBadge = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2em;
  color: rgba(255, 0, 0, 0.6);
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  height: 38px;
  padding: 0 36px 0 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: 1.18em;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 6px;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }

  option {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  option[value=""] {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
  height: 13px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 2px;
    background: #a0a0a0;
  }

  &::before {
    transform: rotate(45deg);
    left: 0;
  }

  &::after {
    transform: rotate(-45deg);
    right: 0;
  }
`;

const InterestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    gap: 8px;
  }
`;

const Badge = styled.button<{ selected: boolean }>`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1em;
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${({ selected, theme }) =>
    selected ? "none" : `1px solid ${theme.colors.border.main}`};
  background: ${({ theme, selected }) =>
    selected ? theme.colors.primary.gradient : "#FFFFFF"};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.text.white : theme.colors.text.primary};
  box-shadow: ${({ theme, selected }) =>
    selected ? theme.shadows.buttonActive : "none"};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme, selected }) =>
      selected ? theme.shadows.buttonActive : theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

const BadgeCloseIcon = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 2px;
    background: ${({ theme }) => theme.colors.white};
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 12px;
  z-index: 101;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 20px;
    right: 20px;
    flex-direction: row;
  }
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  min-width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 20px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1em;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ theme, variant }) =>
    variant === "primary"
      ? `
    background: ${theme.colors.primary.gradient};
    border: none;
    color: ${theme.colors.text.white};
    box-shadow: ${theme.shadows.button};
  `
      : `
    background: #FFFFFF;
    border: 1px solid ${theme.colors.border.main};
    color: ${theme.colors.text.primary};
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme, variant }) =>
      variant === "primary" ? theme.shadows.buttonActive : theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const interests = ["공모전", "멘토링", "봉사", "취업", "탐방", "특강"];

export default function ProfilePage() {
  const router = useRouter();
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [doubleCollege, setDoubleCollege] = useState("");
  const [doubleDepartment, setDoubleDepartment] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // localStorage에서 저장된 정보 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          setCollege(profile.college || "");
          setDepartment(profile.department || "");
          setDoubleCollege(profile.doubleCollege || "");
          setDoubleDepartment(profile.doubleDepartment || "");
          setGrade(profile.grade || "");
          setSelectedInterests(profile.interests || []);
        } catch (error) {
          console.error("Failed to parse user profile:", error);
        }
      }
    }
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    const userProfile = {
      college,
      department,
      doubleCollege,
      doubleDepartment,
      grade,
      interests: selectedInterests,
    };

    // localStorage에 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      
      // 커스텀 이벤트 발생시켜서 Header에서 즉시 업데이트되도록
      window.dispatchEvent(new Event("profileUpdated"));
    }

    console.log("User profile saved:", userProfile);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <FullScreenContainer>
      <ProfileSection>
        <ProfileIconWrapper>
          <Image
            src="/images/profile/profile-icon.svg"
            alt="Profile"
            width={18}
            height={22}
          />
        </ProfileIconWrapper>
        <ProfileInfo>
          <Title>내 정보 입력</Title>
          <Description>
            입력한 정보를 통해 맞춤형 비교과 프로그램을 추천받을 수 있습니다.
          </Description>
        </ProfileInfo>
      </ProfileSection>

      <ContentContainer>
        <FormContainer>
          {/* 단과대학, 학과 */}
          <FormRow>
          <FormGroup>
              <LabelRow>
            <Label>단과대학</Label>
                <RequiredBadge>*필수</RequiredBadge>
              </LabelRow>
            <SelectWrapper>
              <Select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              >
                <option value="">단과대학을 선택하세요</option>
                <option value="인문대학">인문대학</option>
                <option value="자연과학대학">자연과학대학</option>
                <option value="공과대학">공과대학</option>
                <option value="사회과학대학">사회과학대학</option>
                <option value="경영대학">경영대학</option>
                <option value="예술체육대학">예술체육대학</option>
              </Select>
              <SelectIcon />
            </SelectWrapper>
          </FormGroup>

          <FormGroup>
              <LabelRow>
            <Label>학과</Label>
                <RequiredBadge>*필수</RequiredBadge>
              </LabelRow>
            <SelectWrapper>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">학과를 선택하세요</option>
                <option value="컴퓨터과학부">컴퓨터과학부</option>
                <option value="전자전기컴퓨터공학부">
                  전자전기컴퓨터공학부
                </option>
                <option value="기계공학부">기계공학부</option>
                <option value="경영학부">경영학부</option>
                <option value="경제학부">경제학부</option>
              </Select>
              <SelectIcon />
            </SelectWrapper>
          </FormGroup>
          </FormRow>

          {/* 복수전공 단과대학, 복수전공 학과 */}
          <FormRow>
            <FormGroup>
              <Label>복수전공 단과대학</Label>
              <SelectWrapper>
                <Select
                  value={doubleCollege}
                  onChange={(e) => setDoubleCollege(e.target.value)}
                >
                  <option value="">단과대학을 선택하세요</option>
                  <option value="인문대학">인문대학</option>
                  <option value="자연과학대학">자연과학대학</option>
                  <option value="공과대학">공과대학</option>
                  <option value="사회과학대학">사회과학대학</option>
                  <option value="경영대학">경영대학</option>
                  <option value="예술체육대학">예술체육대학</option>
                </Select>
                <SelectIcon />
              </SelectWrapper>
            </FormGroup>

          <FormGroup>
              <Label>복수전공 학과</Label>
              <SelectWrapper>
                <Select
                  value={doubleDepartment}
                  onChange={(e) => setDoubleDepartment(e.target.value)}
                >
                  <option value="">학과를 선택하세요</option>
                  <option value="컴퓨터과학부">컴퓨터과학부</option>
                  <option value="전자전기컴퓨터공학부">
                    전자전기컴퓨터공학부
                  </option>
                  <option value="기계공학부">기계공학부</option>
                  <option value="경영학부">경영학부</option>
                  <option value="경제학부">경제학부</option>
                </Select>
                <SelectIcon />
              </SelectWrapper>
            </FormGroup>
          </FormRow>

          {/* 학년 */}
          <FormRow>
            <FormGroup>
              <LabelRow>
            <Label>학년</Label>
                <RequiredBadge>*필수</RequiredBadge>
              </LabelRow>
            <SelectWrapper>
                <Select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                <option value="">학년을 선택하세요</option>
                <option value="1">1학년</option>
                <option value="2">2학년</option>
                <option value="3">3학년</option>
                <option value="4">4학년</option>
              </Select>
              <SelectIcon />
            </SelectWrapper>
          </FormGroup>
          </FormRow>

          {/* 관심사 */}
          <InterestSection>
            <LabelRow>
            <Label>관심사</Label>
              <RequiredBadge>*필수</RequiredBadge>
            </LabelRow>
            <BadgeContainer>
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  selected={selectedInterests.includes(interest)}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                  {selectedInterests.includes(interest) && <BadgeCloseIcon />}
                </Badge>
              ))}
            </BadgeContainer>
          </InterestSection>
        </FormContainer>
      </ContentContainer>

      <ButtonContainer>
        <Button variant="secondary" onClick={handleCancel}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSave}>
          저장
        </Button>
      </ButtonContainer>
    </FullScreenContainer>
  );
}
