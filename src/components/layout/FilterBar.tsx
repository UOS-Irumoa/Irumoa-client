"use client";

import styled from "@emotion/styled";

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  flex-wrap: nowrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 4px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-left: 1px solid ${({ theme }) => theme.colors.border.main};
  padding-left: 12px;
`;

const FilterLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 140px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100px;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 35px;
  padding: 0 30px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 0.5px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 6px;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }

  option {
    color: ${({ theme }) => theme.colors.text.primary};
    text-align: center;
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: 10px;
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: 4px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  cursor: pointer;

  &:checked {
    accent-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const CheckboxLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  user-select: none;
  flex-shrink: 10;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CheckboxLabelDesktop = styled(CheckboxLabel)`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const CheckboxLabelTablet = styled(CheckboxLabel)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

interface FilterBarProps {
  recruitStatus: string;
  onRecruitStatusChange: (value: string) => void;
  showOnlyQualified: boolean;
  onShowOnlyQualifiedChange: (checked: boolean) => void;
}

export default function FilterBar({
  recruitStatus,
  onRecruitStatusChange,
  showOnlyQualified,
  onShowOnlyQualifiedChange,
}: FilterBarProps) {
  return (
    <FilterSection>
      <CheckboxWrapper>
        <CheckboxLabelDesktop htmlFor="qualified-only">
          지원 자격 해당 항목만 표시
        </CheckboxLabelDesktop>
        <CheckboxLabelTablet htmlFor="qualified-only">
          지원 가능
        </CheckboxLabelTablet>
        <Checkbox
          type="checkbox"
          id="qualified-only"
          checked={showOnlyQualified}
          onChange={(e) => onShowOnlyQualifiedChange(e.target.checked)}
        />
      </CheckboxWrapper>

      <FilterGroup>
        <FilterLabel>모집 상태</FilterLabel>
        <SelectWrapper>
          <Select
            value={recruitStatus}
            onChange={(e) => onRecruitStatusChange(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="모집 예정">모집 예정</option>
            <option value="모집 중">모집 중</option>
            <option value="모집 완료">모집 완료</option>
          </Select>
          <SelectIcon />
        </SelectWrapper>
      </FilterGroup>
    </FilterSection>
  );
}
