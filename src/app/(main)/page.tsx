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
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const Tag = styled.span<{ primary?: boolean }>`
  padding: ${({ theme }) => `${theme.padding.xs} ${theme.padding.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid
    ${({ theme, primary }) =>
      primary ? theme.colors.primary.main : theme.colors.border.main};
  color: ${({ theme, primary }) =>
    primary ? theme.colors.primary.main : theme.colors.text.primary};
`;

const RecommendText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;

  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const SearchFilterCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.padding.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SearchRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => `${theme.padding.xs} ${theme.padding.md}`};
  height: 36px;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.text.secondary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};

  &:hover {
    opacity: 0.9;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const FilterLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FilterSelect = styled.select`
  width: 180px;
  height: 36px;
  padding: 0px ${({ theme }) => theme.padding.md};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const RecommendSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #74d4ff 0%, #51a2ff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
`;

const SectionTitle = styled.h2`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5em;
  letter-spacing: -0.08em;
  background: linear-gradient(90deg, #00bcff 0%, #2b7fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const ProgramsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProgramCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const RecommendBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #74d4ff 0%, #8ec5ff 100%);
  border-radius: 8px 0px 8px 0px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0px 2px 8px 0px rgba(125, 211, 252, 0.4);
`;

const RecommendIcon = styled.span`
  color: white;
  font-size: 12px;
`;

const RecommendLabel = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5em;
  color: #ffffff;
`;

const ProgramContent = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProgramInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
`;

const ProgramMeta = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const CategoryBadge = styled.span`
  padding: 2px 8px;
  background: #dbeafe;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33em;
  color: #193cb8;
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  background: #00bc7d;
  border-radius: 50%;
`;

const StatusText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5em;
  color: #a0a0a0;
`;

const DepartmentTag = styled.span`
  padding: 2px 8px;
  border: 1px solid #408cff;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5em;
  color: #408cff;
`;

const ProgramTitle = styled.h3`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5em;
  letter-spacing: -0.08em;
  color: #5c5e66;
  margin: 0;
`;

const ProgramDescription = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  letter-spacing: -0.08em;
  color: #a0a0a0;
  margin: 0;
`;

const ProgramDetails = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailIcon = styled.span`
  color: #5c5e66;
  font-size: 14px;
`;

const DetailText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.5em;
  letter-spacing: 0.006em;
  color: #5c5e66;
`;

const ViewButton = styled.button`
  padding: 8px 15px;
  background: #408cff;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43em;
  letter-spacing: -0.01em;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

export default function MainPage() {
  return (
    <MainContent>
      <TopSection>
        <ProfileCard>
          <ProfileHeader>
            <ProfileIcon>👤</ProfileIcon>
            <ProfileInfo>
              <ProfileTitle>내 프로필</ProfileTitle>
              <TagsContainer>
                <Tag primary>컴퓨터과학부</Tag>
                <Tag>AI/머신러닝</Tag>
                <Tag>프로그래밍</Tag>
                <Tag>취업준비</Tag>
              </TagsContainer>
              <RecommendText>
                💡 총 <strong>2개</strong>의 맞춤 추천 프로그램이 있습니다
              </RecommendText>
            </ProfileInfo>
          </ProfileHeader>
        </ProfileCard>

        <SearchFilterCard>
          <SearchRow>
            <SearchInput placeholder="프로그램 이름이나 태그로 검색..." />
            <SearchButton>🔍</SearchButton>
          </SearchRow>
          <FilterRow>
            <FilterLabel>모집 상태</FilterLabel>
            <FilterSelect>
              <option>전체</option>
              <option>모집중</option>
              <option>모집마감</option>
            </FilterSelect>
          </FilterRow>
        </SearchFilterCard>
      </TopSection>

      <RecommendSection>
        <SectionHeader>
          <SectionIcon>✨</SectionIcon>
          <SectionTitle>당신을 위한 추천 프로그램</SectionTitle>
        </SectionHeader>

        <ProgramsGrid>
          <ProgramCard>
            <RecommendBadge>
              <RecommendIcon>⭐</RecommendIcon>
              <RecommendLabel>추천</RecommendLabel>
            </RecommendBadge>
            <ProgramContent>
              <ProgramInfo>
                <ProgramMeta>
                  <CategoryBadge>대회</CategoryBadge>
                  <StatusDot />
                  <StatusText>모집중</StatusText>
                  <DepartmentTag>컴퓨터공학과</DepartmentTag>
                </ProgramMeta>
                <ProgramTitle>2025 AI 해커톤 대회</ProgramTitle>
                <ProgramDescription>
                  인공지능 기술을 활용한 실생활 문제 해결 아이디어 경진대회
                </ProgramDescription>
                <ProgramDetails>
                  <DetailItem>
                    <DetailIcon>📅</DetailIcon>
                    <DetailText>2025년 10월 25일</DetailText>
                  </DetailItem>
                  <DetailItem>
                    <DetailIcon>📍</DetailIcon>
                    <DetailText>공과대학 5호관</DetailText>
                  </DetailItem>
                  <DetailItem>
                    <DetailIcon>👥</DetailIcon>
                    <DetailText>팀당 3-4명, 총 20팀</DetailText>
                  </DetailItem>
                </ProgramDetails>
              </ProgramInfo>
              <ViewButton>자세히 보기</ViewButton>
            </ProgramContent>
          </ProgramCard>

          <ProgramCard>
            <RecommendBadge>
              <RecommendIcon>⭐</RecommendIcon>
              <RecommendLabel>추천</RecommendLabel>
            </RecommendBadge>
            <ProgramContent>
              <ProgramInfo>
                <ProgramMeta>
                  <CategoryBadge>대회</CategoryBadge>
                  <StatusDot />
                  <StatusText>모집중</StatusText>
                  <DepartmentTag>경영학과</DepartmentTag>
                </ProgramMeta>
                <ProgramTitle>데이터 사이언스 경진대회</ProgramTitle>
                <ProgramDescription>
                  실제 기업 데이터를 활용한 데이터 분석 및 예측 모델링 대회
                </ProgramDescription>
                <ProgramDetails>
                  <DetailItem>
                    <DetailIcon>📅</DetailIcon>
                    <DetailText>2025년 11월 10일</DetailText>
                  </DetailItem>
                  <DetailItem>
                    <DetailIcon>📍</DetailIcon>
                    <DetailText>온라인 진행</DetailText>
                  </DetailItem>
                  <DetailItem>
                    <DetailIcon>👥</DetailIcon>
                    <DetailText>개인 또는 2인 팀</DetailText>
                  </DetailItem>
                </ProgramDetails>
              </ProgramInfo>
              <ViewButton>자세히 보기</ViewButton>
            </ProgramContent>
          </ProgramCard>
        </ProgramsGrid>
      </RecommendSection>
    </MainContent>
  );
}
