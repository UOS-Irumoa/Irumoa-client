"use client";

import styled from "@emotion/styled";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TopSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProfileCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.padding.lg};
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.margin.md};
`;

const ProfileIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProfileTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const ProfileSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const InterestTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const InterestTag = styled.span`
  padding: ${({ theme }) => theme.padding.xs} ${({ theme }) => theme.padding.sm};
  background: ${({ theme }) => theme.colors.primary.light}20;
  color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const StatsCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.padding.lg};
`;

const StatsTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.margin.md} 0;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.padding.sm};
  background: ${({ theme }) => theme.colors.background.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const RecommendedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProgramCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.padding.lg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ProgramHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${({ theme }) => theme.margin.md};
`;

const ProgramCategory = styled.span`
  padding: ${({ theme }) => theme.padding.xs} ${({ theme }) => theme.padding.sm};
  background: ${({ theme }) => theme.colors.primary.gradient};
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
`;

const ProgramStatus = styled.span<{ status: "open" | "closed" | "upcoming" }>`
  padding: ${({ theme }) => theme.padding.xs} ${({ theme }) => theme.padding.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background: ${({ theme, status }) => {
    switch (status) {
      case "open":
        return theme.colors.status.success + "20";
      case "closed":
        return theme.colors.status.error + "20";
      case "upcoming":
        return theme.colors.status.warning + "20";
    }
  }};
  color: ${({ theme, status }) => {
    switch (status) {
      case "open":
        return theme.colors.status.success;
      case "closed":
        return theme.colors.status.error;
      case "upcoming":
        return theme.colors.status.warning;
    }
  }};
`;

const ProgramTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.margin.sm} 0;
`;

const ProgramDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0 0 ${({ theme }) => theme.margin.md} 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProgramFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.padding.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ProgramDate = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.disabled};
`;

const ProgramParticipants = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: ${({ theme }) => theme.padding.sm} ${({ theme }) => theme.padding.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: ${({ theme, active }) =>
    active ? theme.colors.primary.gradient : theme.colors.background.paper};
  color: ${({ theme, active }) =>
    active ? theme.colors.text.white : theme.colors.text.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const QuickStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.padding.md};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
`;

const QuickStatItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const QuickStatValue = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const QuickStatLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  white-space: nowrap;
`;

export default function MainPage() {
  const mockPrograms = [
    {
      id: 1,
      category: "공모전",
      title: "2024 SW 창업 아이디어 공모전",
      description:
        "혁신적인 소프트웨어 아이디어로 미래를 만들어가는 창업 공모전입니다.",
      status: "open" as const,
      date: "2024.03.15 - 2024.04.30",
      participants: 156,
    },
    {
      id: 2,
      category: "멘토링",
      title: "시니어 개발자와 함께하는 코드 리뷰",
      description: "실무 경험이 풍부한 시니어 개발자의 1:1 멘토링 프로그램",
      status: "open" as const,
      date: "2024.03.20 - 2024.05.20",
      participants: 42,
    },
    {
      id: 3,
      category: "취업",
      title: "IT 기업 취업 준비 특강",
      description: "대기업 인사담당자가 알려주는 취업 성공 전략",
      status: "upcoming" as const,
      date: "2024.04.01 - 2024.04.15",
      participants: 89,
    },
    {
      id: 4,
      category: "봉사",
      title: "코딩 교육 봉사 활동",
      description: "초중등학생 대상 코딩 교육 봉사 프로그램",
      status: "open" as const,
      date: "2024.03.10 - 2024.12.20",
      participants: 67,
    },
    {
      id: 5,
      category: "특강",
      title: "AI와 미래 기술 트렌드",
      description: "최신 AI 기술 동향과 실무 적용 사례 특강",
      status: "closed" as const,
      date: "2024.02.15 - 2024.03.01",
      participants: 234,
    },
    {
      id: 6,
      category: "탐방",
      title: "스타트업 캠퍼스 탐방",
      description: "성공한 스타트업 기업의 사무실 방문 및 인터뷰",
      status: "upcoming" as const,
      date: "2024.04.10",
      participants: 28,
    },
  ];

  return (
    <MainContent>
      <TopSection>
        <ProfileCard>
          <ProfileHeader>
            <ProfileIcon>👤</ProfileIcon>
            <ProfileInfo>
              <ProfileTitle>홍길동 님</ProfileTitle>
              <ProfileSubtitle>컴퓨터과학부 3학년</ProfileSubtitle>
            </ProfileInfo>
          </ProfileHeader>
          <InterestTags>
            <InterestTag>공모전</InterestTag>
            <InterestTag>취업</InterestTag>
            <InterestTag>멘토링</InterestTag>
          </InterestTags>
        </ProfileCard>

        <StatsCard>
          <StatsTitle>나의 활동</StatsTitle>
          <StatsList>
            <StatItem>
              <StatLabel>참여 중인 프로그램</StatLabel>
              <StatValue>3</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>완료한 프로그램</StatLabel>
              <StatValue>12</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>획득 포인트</StatLabel>
              <StatValue>850</StatValue>
            </StatItem>
          </StatsList>
        </StatsCard>
      </TopSection>

      <QuickStats>
        <QuickStatItem>
          <QuickStatValue>42</QuickStatValue>
          <QuickStatLabel>진행 중인 프로그램</QuickStatLabel>
        </QuickStatItem>
        <QuickStatItem>
          <QuickStatValue>128</QuickStatValue>
          <QuickStatLabel>이번 달 신규</QuickStatLabel>
        </QuickStatItem>
        <QuickStatItem>
          <QuickStatValue>1,234</QuickStatValue>
          <QuickStatLabel>총 참여자</QuickStatLabel>
        </QuickStatItem>
      </QuickStats>

      <RecommendedSection>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SectionTitle>추천 프로그램</SectionTitle>
          <FilterSection>
            <FilterButton active>전체</FilterButton>
            <FilterButton>공모전</FilterButton>
            <FilterButton>멘토링</FilterButton>
            <FilterButton>취업</FilterButton>
          </FilterSection>
        </div>

        <ProgramGrid>
          {mockPrograms.map((program) => (
            <ProgramCard key={program.id}>
              <ProgramHeader>
                <ProgramCategory>{program.category}</ProgramCategory>
                <ProgramStatus status={program.status}>
                  {program.status === "open"
                    ? "모집중"
                    : program.status === "closed"
                    ? "마감"
                    : "예정"}
                </ProgramStatus>
              </ProgramHeader>
              <ProgramTitle>{program.title}</ProgramTitle>
              <ProgramDescription>{program.description}</ProgramDescription>
              <ProgramFooter>
                <ProgramDate>{program.date}</ProgramDate>
                <ProgramParticipants>
                  참여자 {program.participants}명
                </ProgramParticipants>
              </ProgramFooter>
            </ProgramCard>
          ))}
        </ProgramGrid>
      </RecommendedSection>
    </MainContent>
  );
}
