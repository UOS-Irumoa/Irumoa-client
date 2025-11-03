"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
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
  overflow-y: auto;
  z-index: 100;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 40px;
  right: 40px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.content};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 101;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
`;

const CloseIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background: ${({ theme }) => theme.colors.text.primary};
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 20px;
    height: 20px;

    &::before,
    &::after {
      width: 16px;
    }
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 60px 24px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const ProfileIconWrapper = styled.div`
  width: 83px;
  height: 83px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 30px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1.2em;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: 1.4em;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: ${({ theme }) => theme.colors.background.content};
  border-radius: 20px;
  padding: 60px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 40px 24px;
    gap: 32px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;

  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2em;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 0 40px 0 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 17px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: 1.18em;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.main};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 10px;
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
  width: 17px;
  height: 11px;
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
  gap: ${({ theme }) => theme.spacing.lg};
`;

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Badge = styled.button<{ selected: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ selected }) => (selected ? "18px" : "17px")};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ selected }) => (selected ? "0.89em" : "0.94em")};
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${({ selected, theme }) =>
    selected ? "none" : `1px solid ${theme.colors.border.main}`};
  background: ${({ theme, selected }) =>
    selected ? theme.colors.primary.gradient : theme.colors.background.main};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.text.white : theme.colors.text.primary};
  box-shadow: ${({ theme, selected }) =>
    selected ? theme.shadows.buttonActive : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme, selected }) =>
      selected ? theme.shadows.buttonActive : theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

const BadgeCloseIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-top: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  min-width: 180px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 32px;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 23px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 0.87em;
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
    background: ${theme.colors.background.main};
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
  const [grade, setGrade] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    // TODO: 저장 로직 구현
    console.log({
      college,
      department,
      grade,
      interests: selectedInterests,
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <FullScreenContainer>
      <CloseButton onClick={handleClose} aria-label="닫기">
        <CloseIconWrapper />
      </CloseButton>

      <ContentContainer>
        <ProfileSection>
          <ProfileIconWrapper>
            <Image
              src="/images/profile-icon.svg"
              alt="Profile"
              width={28}
              height={35}
            />
          </ProfileIconWrapper>
          <ProfileInfo>
            <Title>내 정보 입력</Title>
            <Description>
              입력한 정보를 통해 맞춤형 비교과 프로그램을 추천받을 수 있습니다.
            </Description>
          </ProfileInfo>
        </ProfileSection>

        <FormContainer>
          <FormGroup>
            <Label>단과대학</Label>
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
            <Label>학과</Label>
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

          <FormGroup>
            <Label>학년</Label>
            <SelectWrapper>
              <Select value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="">학년을 선택하세요</option>
                <option value="1">1학년</option>
                <option value="2">2학년</option>
                <option value="3">3학년</option>
                <option value="4">4학년</option>
              </Select>
              <SelectIcon />
            </SelectWrapper>
          </FormGroup>

          <InterestSection>
            <Label>관심사</Label>
            <BadgeContainer>
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  selected={selectedInterests.includes(interest)}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                  {selectedInterests.includes(interest) && (
                    <BadgeCloseIcon>
                      <Image
                        src="/images/close-icon.svg"
                        alt="Remove"
                        width={10}
                        height={10}
                      />
                    </BadgeCloseIcon>
                  )}
                </Badge>
              ))}
            </BadgeContainer>
          </InterestSection>
        </FormContainer>

        <ButtonContainer>
          <Button variant="secondary" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave}>
            저장
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </FullScreenContainer>
  );
}
