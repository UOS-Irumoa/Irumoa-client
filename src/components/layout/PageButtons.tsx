"use client";

import styled from "@emotion/styled";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
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

const NavButton = styled.button<{ invisible?: boolean }>`
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
  visibility: ${({ invisible }) => (invisible ? "hidden" : "visible")};

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

interface PageButtonsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PageButtons({
  currentPage,
  totalPages,
  onPageChange,
}: PageButtonsProps) {
  const PAGES_PER_GROUP = 10;

  // 현재 페이지가 속한 페이지 그룹 계산 (1-10, 11-20, 21-30, ...)
  const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
  const startPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
  const endPage = Math.min(currentGroup * PAGES_PER_GROUP, totalPages);

  // 표시할 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // 이전/다음 그룹이 있는지 확인
  const hasPrevGroup = startPage > 1;
  const hasNextGroup = endPage < totalPages;

  // 이전 페이지 그룹의 마지막 페이지로 이동
  const goToPrevGroup = () => {
    const prevGroupLastPage = startPage - 1;
    onPageChange(prevGroupLastPage);
  };

  // 다음 페이지 그룹의 첫 페이지로 이동
  const goToNextGroup = () => {
    const nextGroupFirstPage = endPage + 1;
    onPageChange(nextGroupFirstPage);
  };

  // 이전/다음 페이지 버튼 표시 여부
  const showPrevButton = currentPage > 1;
  const showNextButton = currentPage < totalPages;

  return (
    <PaginationWrapper>
      {/* 맨 처음으로 */}
      <NavButton onClick={() => onPageChange(1)} invisible={!showPrevButton}>
        &lt;&lt;
      </NavButton>

      {/* 이전 페이지 */}
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        invisible={!showPrevButton}
      >
        &lt;
      </NavButton>

      {/* 이전 그룹 (1-10 표시 중일 때는 숨김) */}
      {hasPrevGroup && (
        <NavButton onClick={goToPrevGroup}>
          ...
        </NavButton>
      )}

      {/* 페이지 번호들 */}
      {getPageNumbers().map((page) => (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      {/* 다음 그룹 */}
      {hasNextGroup && (
        <NavButton onClick={goToNextGroup}>
          ...
        </NavButton>
      )}

      {/* 다음 페이지 */}
      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        invisible={!showNextButton}
      >
        &gt;
      </NavButton>

      {/* 맨 마지막으로 */}
      <NavButton
        onClick={() => onPageChange(totalPages)}
        invisible={!showNextButton}
      >
        &gt;&gt;
      </NavButton>
    </PaginationWrapper>
  );
}
