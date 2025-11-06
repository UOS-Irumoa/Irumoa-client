"use client";

import styled from "@emotion/styled";
import Image from "next/image";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 33%;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 17px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  background: #ffffff;
  border: 0.5px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 6px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
`;

const SearchIconButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="프로그램 이름이나 내용 키워드로 검색..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <SearchIconButton>
        <Image
          src="/images/main/search-icon.svg"
          alt="Search"
          width={23}
          height={23}
        />
      </SearchIconButton>
    </SearchWrapper>
  );
}
