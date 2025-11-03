'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TabButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const StyledLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  background-color: ${props => props.$isActive ? '#5B7FFF' : '#ffffff'};
  color: ${props => props.$isActive ? '#ffffff' : '#6B7280'};
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$isActive ? '0 4px 12px rgba(91, 127, 255, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.08)'};
  min-width: 140px;

  &:hover {
    background-color: ${props => props.$isActive ? '#4A6FEE' : '#F3F4F6'};
    transform: translateY(-2px);
    box-shadow: ${props => props.$isActive ? '0 6px 16px rgba(91, 127, 255, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.12)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
`;

export default function TabButton({ href, icon, label }: TabButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <StyledLink href={href} $isActive={isActive}>
      <IconWrapper>{icon}</IconWrapper>
      <span>{label}</span>
    </StyledLink>
  );
}

