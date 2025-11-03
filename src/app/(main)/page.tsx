"use client";

import styled from "@emotion/styled";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TopSection = styled.div`
  display: flex;
  gap: 16px;
`;

const ProfileCard = styled.div`
  flex: 1;
  background: #FFFFFF;
  border: 1px solid #E5E6EC;
  border-radius: 8px;
  padding: 25px;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`;

const ProfileIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #408CFF 0%, #98BFFA 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5em;
  letter-spacing: -0.08em;
  color: #5C5E66;
  margin: 0;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ primary?: boolean }>`
  padding: 2px 8px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33em;
  background: ${props => props.primary ? '#FFFFFF' : '#FFFFFF'};
  border: 1px solid ${props => props.primary ? '#408CFF' : '#E5E6EC'};
  color: ${props => props.primary ? '#408CFF' : '#5C5E66'};
`;

const RecommendText = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  letter-spacing: -0.08em;
  color: #A0A0A0;
  margin: 0;
  
  strong {
    font-weight: 700;
    color: #408CFF;
  }
`;

const SearchFilterCard = styled.div`
  flex: 1;
  background: #FFFFFF;
  border: 1px solid #E5E6EC;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 4px 12px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #E5E6EC;
  border-radius: 6px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2em;
  color: #A0A0A0;
  
  &::placeholder {
    color: #A0A0A0;
  }
  
  &:focus {
    outline: none;
    border-color: #408CFF;
  }
`;

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #408CFF 0%, #98BFFA 100%);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 18px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const FilterLabel = styled.label`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  color: #5C5E66;
`;

const FilterSelect = styled.select`
  width: 180px;
  height: 36px;
  padding: 0px 12px;
  background: #FFFFFF;
  border: 1px solid #E5E6EC;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43em;
  letter-spacing: -0.01em;
  color: #5C5E66;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #408CFF;
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
  background: linear-gradient(135deg, #74D4FF 0%, #51A2FF 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
`;

const SectionTitle = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5em;
  letter-spacing: -0.08em;
  background: linear-gradient(90deg, #00BCFF 0%, #2B7FFF 100%);
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
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const RecommendBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #74D4FF 0%, #8EC5FF 100%);
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
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5em;
  color: #FFFFFF;
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
  background: #DBEAFE;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33em;
  color: #193CB8;
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  background: #00BC7D;
  border-radius: 50%;
`;

const StatusText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5em;
  color: #A0A0A0;
`;

const DepartmentTag = styled.span`
  padding: 2px 8px;
  border: 1px solid #408CFF;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5em;
  color: #408CFF;
`;

const ProgramTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5em;
  letter-spacing: -0.08em;
  color: #5C5E66;
  margin: 0;
`;

const ProgramDescription = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  letter-spacing: -0.08em;
  color: #A0A0A0;
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
  color: #5C5E66;
  font-size: 14px;
`;

const DetailText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.5em;
  letter-spacing: 0.006em;
  color: #5C5E66;
`;

const ViewButton = styled.button`
  padding: 8px 15px;
  background: #408CFF;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43em;
  letter-spacing: -0.01em;
  color: #FFFFFF;
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

