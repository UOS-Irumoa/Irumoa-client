"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { universities, getDepartmentsByUniversity } from "@/data/universities";
import { useUserStore } from "@/stores/userStore";

const FullScreenContainer = styled.div<{ isExiting?: boolean }>`
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
  animation: ${({ isExiting }) =>
    isExiting ? "fadeOut 0.3s ease-in-out" : "fadeIn 0.3s ease-in-out"};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
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
  animation: slideUp 0.4s ease-out 0.1s both;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
  animation: slideDown 0.4s ease-out both;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 0.8;
      transform: translateX(-50%) translateY(0);
    }
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

  &:disabled {
    background: ${({ theme }) => theme.colors.background.paper};
    cursor: not-allowed;
    opacity: 0.6;
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

const Input = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: 1.18em;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 6px;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
`;

const ErrorMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  background: rgba(255, 82, 82, 0.95);
  color: white;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0px 4px 16px 0px rgba(255, 82, 82, 0.3);
  z-index: 102;
  animation: shake 0.4s ease-in-out;

  @keyframes shake {
    0%,
    100% {
      transform: translate(-50%, -50%);
    }
    5%,
    15%,
    25%,
    35%,
    45%,
    55%,
    65% {
      transform: translate(-50%, -50%) translateX(-10px);
    }
    10%,
    20%,
    30%,
    40%,
    50%,
    60%,
    70% {
      transform: translate(-50%, -50%) translateX(10px);
    }
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 12px;
  z-index: 101;
  animation: slideUp 0.4s ease-out 0.2s both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 20px;
    right: 20px;
    flex-direction: row;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);

  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [doubleCollege, setDoubleCollege] = useState("");
  const [doubleDepartment, setDoubleDepartment] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestFields, setInterestFields] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 선택된 단과대학에 따른 학과 목록
  const availableDepartments = useMemo(() => {
    return getDepartmentsByUniversity(college);
  }, [college]);

  const availableDoubleDepartments = useMemo(() => {
    const allDepts = getDepartmentsByUniversity(doubleCollege);
    // 전공 학과로 선택된 학과는 제외
    return allDepts.filter((dept) => dept !== department);
  }, [doubleCollege, department]);

  // 단과대학 변경 시 학과 초기화
  useEffect(() => {
    if (college) {
      const depts = getDepartmentsByUniversity(college);
      if (!depts.includes(department)) {
        setDepartment("");
      }
    }
  }, [college]);

  useEffect(() => {
    if (doubleCollege) {
      const depts = getDepartmentsByUniversity(doubleCollege);
      if (!depts.includes(doubleDepartment)) {
        setDoubleDepartment("");
      }
    }
  }, [doubleCollege]);

  // 전공 학과 변경 시 복수전공이 같은 학과면 초기화
  useEffect(() => {
    if (department && doubleDepartment && department === doubleDepartment) {
      setDoubleDepartment("");
    }
  }, [department]);

  // Zustand 스토어에서 저장된 정보 불러오기
  useEffect(() => {
    if (profile) {
      setCollege(profile.college || "");
      setDepartment(profile.department || "");
      setDoubleCollege(profile.doubleCollege || "");
      setDoubleDepartment(profile.doubleDepartment || "");
      setGrade(profile.grade ? String(profile.grade) : "");
      setSelectedInterests(profile.interests || []);
      setInterestFields(
        profile.interest_fields ? profile.interest_fields.join(", ") : ""
      );
    }
  }, [profile]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    // 필수 항목 검증
    if (!college || college.trim() === "") {
      setErrorMessage("단과대학을 선택해주세요");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (!department || department.trim() === "") {
      setErrorMessage("학과를 선택해주세요");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (!grade || grade.trim() === "") {
      setErrorMessage("학년을 선택해주세요");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (!selectedInterests || selectedInterests.length === 0) {
      setErrorMessage("관심사를 최소 1개 이상 선택해주세요");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (!interestFields || interestFields.trim() === "") {
      setErrorMessage("관심 키워드를 입력해주세요");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    // 관심 키워드 파싱 (쉼표로 구분)
    const parsedInterestFields = interestFields
      .split(",")
      .map((field) => field.trim())
      .filter((field) => field.length > 0);

    if (parsedInterestFields.length === 0) {
      setErrorMessage("관심 키워드를 입력해주세요");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    const userProfile = {
      college,
      department,
      doubleCollege,
      doubleDepartment,
      grade: String(grade),
      interests: selectedInterests,
      interest_fields: parsedInterestFields,
    };

    // Zustand 스토어에 저장
    setProfile(userProfile);

    // 애니메이션 후 나가기
    setIsExiting(true);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  const handleCancel = () => {
    // 초기 프로필로 복원
    if (profile) {
      setCollege(profile.college || "");
      setDepartment(profile.department || "");
      setDoubleCollege(profile.doubleCollege || "");
      setDoubleDepartment(profile.doubleDepartment || "");
      setGrade(profile.grade ? String(profile.grade) : "");
      setSelectedInterests(profile.interests || []);
      setInterestFields(
        profile.interest_fields
          ? profile.interest_fields.join(", ")
          : ""
      );
    } else {
      // 저장된 프로필이 없으면 모두 초기화
      setCollege("");
      setDepartment("");
      setDoubleCollege("");
      setDoubleDepartment("");
      setGrade("");
      setSelectedInterests([]);
      setInterestFields("");
    }

    // 애니메이션 후 나가기
    setIsExiting(true);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <FullScreenContainer isExiting={isExiting}>
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
                  {universities.map((uni) => (
                    <option key={uni.university} value={uni.university}>
                      {uni.university}
                    </option>
                  ))}
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
                  disabled={!college}
                >
                  <option value="">학과를 선택하세요</option>
                  {availableDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
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
                  {universities.map((uni) => (
                    <option key={uni.university} value={uni.university}>
                      {uni.university}
                    </option>
                  ))}
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
                  disabled={!doubleCollege}
                >
                  <option value="">학과를 선택하세요</option>
                  {availableDoubleDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
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
                  <option value="5">5학년</option>
                  <option value="6">졸업생</option>
                  <option value="7">대학원생</option>
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

          {/* 관심 키워드 */}
          <InterestSection>
            <LabelRow>
              <Label>관심 키워드</Label>
              <RequiredBadge>*필수</RequiredBadge>
            </LabelRow>
            <Input
              type="text"
              value={interestFields}
              onChange={(e) => setInterestFields(e.target.value)}
              placeholder="ex) AI, 머신러닝, 네트워크"
            />
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

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FullScreenContainer>
  );
}
