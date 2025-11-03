'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.padding.xl} 0;
  overflow-y: auto;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
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
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 30px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 0.6em;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1.11em;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 462px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.lg};
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.background.content};
  }

  &:last-of-type::after {
    display: none;
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
  padding: 0 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 17px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1.18em;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.content};
  border: 0.5px solid #E5E6EC;
  border-radius: 6px;
  appearance: none;
  cursor: pointer;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
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
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background: #A0A0A0;
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
  gap: ${({ theme }) => theme.spacing.md};
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Badge = styled.button<{ selected: boolean }>`
  width: 140px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ selected }) => (selected ? '18px' : '17px')};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ selected }) => (selected ? '0.89em' : '0.94em')};
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${({ selected }) => (selected ? '1px solid transparent' : '0.5px solid #E5E6EC')};
  background: ${({ theme, selected }) =>
    selected ? theme.colors.primary.gradient : theme.colors.background.content};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.text.white : theme.colors.text.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CloseIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  width: 180px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 23px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 0.87em;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ theme, variant }) =>
    variant === 'primary'
      ? `
    background: ${theme.colors.primary.gradient};
    border: none;
    color: ${theme.colors.text.white};
  `
      : `
    background: ${theme.colors.background.content};
    border: 1px solid #E5E6EC;
    color: ${theme.colors.text.primary};
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }
`;

const interests = ['공모전', '멘토링', '봉사', '취업', '탐방', '특강'];

export default function ProfilePage() {
  const router = useRouter();
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [grade, setGrade] = useState('');
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
    router.push('/');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Container>
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
              <option value="전자전기컴퓨터공학부">전자전기컴퓨터공학부</option>
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
                  <CloseIcon>
                    <Image
                      src="/images/close-icon.svg"
                      alt="Remove"
                      width={10}
                      height={10}
                    />
                  </CloseIcon>
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
    </Container>
  );
}

