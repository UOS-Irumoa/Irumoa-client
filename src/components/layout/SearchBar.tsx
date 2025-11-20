"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect } from "react";
import { useUIStore } from "@/stores/uiStore";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 45%;
  flex-shrink: 0;
  flex-wrap: nowrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 55%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 6px;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
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

export default function SearchBar() {
  const searchTerm = useUIStore((state) => state.searchTerm);
  const setSearchTerm = useUIStore((state) => state.setSearchTerm);
  const isTablet = useUIStore((state) => state.isTablet);
  const setIsTablet = useUIStore((state) => state.setIsTablet);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => {
      setIsTablet(mediaQuery.matches);
    };

    // 초기값 설정
    handleResize();

    // 리스너 추가
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [setIsTablet]);

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder={
          isTablet
            ? "프로그램 검색..."
            : "프로그램 이름이나 내용 키워드로 검색..."
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
