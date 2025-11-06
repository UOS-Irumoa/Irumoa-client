"use client";

import styled from "@emotion/styled";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 12px 0;
  flex-shrink: 0;
`;

const PageButton = styled.button<{ active?: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 50%;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active, theme }) =>
    active ? "rgba(64, 140, 255, 0.15)" : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.primary.main : theme.colors.text.secondary};

  &:hover:not(:disabled) {
    background: ${({ active, theme }) =>
      active ? "rgba(64, 140, 255, 0.2)" : "rgba(0, 0, 0, 0.05)"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const NavButton = styled.button`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 10;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <PaginationWrapper>
      {getPageNumbers().map((page) => (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        &gt;
      </NavButton>
      <NavButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage >= totalPages}
      >
        &gt;&gt;
      </NavButton>
    </PaginationWrapper>
  );
}
