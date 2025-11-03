'use client';

import styled from '@emotion/styled';
import TabButton from './TabButton';

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  overflow-x: auto;
  background: linear-gradient(to bottom, #F8FAFC, #ffffff);
  border-bottom: 1px solid #E5E7EB;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.75rem;
  }
`;

const tabs = [
  { href: '/', icon: '📢', label: '전체' },
  { href: '/contests', icon: '🏆', label: '대회/공모전' },
  { href: '/employment', icon: '🎓', label: '취업 프로그램' },
  { href: '/volunteer', icon: '📘', label: '봉사활동/멘토링' },
  { href: '/workshop', icon: '📚', label: '워크샵/특강' },
];

export default function Navigation() {
  return (
    <Nav>
      {tabs.map((tab) => (
        <TabButton
          key={tab.href}
          href={tab.href}
          icon={tab.icon}
          label={tab.label}
        />
      ))}
    </Nav>
  );
}

