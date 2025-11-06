"use client";

import styled from "@emotion/styled";
import Image from "next/image";

const SearchWrapper = styled.div`
  position: relative;
  width: 40%;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 50px 0 16px;
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
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
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
          width={18}
          height={18}
        />
      </SearchIconButton>
    </SearchWrapper>
  );
}

