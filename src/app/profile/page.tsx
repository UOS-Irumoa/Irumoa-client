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
  background-image: url("/images/profile-background.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  max-width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
    max-width: 100%;
  }
`;

const ProfileSection = styled.div`
  position: fixed;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: 101;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 20px;
    left: 20px;
    flex-direction: column;
    align-items: flex-start;
  }
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
  gap: ${({ theme }) => theme.spacing.md};
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
  background: ${({ theme }) => theme.colors.background.content};
  border-radius: 12px;
  padding: ${({ theme }) => theme.padding.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.padding.md};
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
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
  height: 38px;
  padding: 0 36px 0 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: 1.18em;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.main};
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
  gap: 8px;
`;

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
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
    selected ? theme.colors.primary.gradient : theme.colors.background.main};
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
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

      <ProfileSection>
        <ProfileIconWrapper>
          <Image
            src="/images/profile-icon.svg"
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
