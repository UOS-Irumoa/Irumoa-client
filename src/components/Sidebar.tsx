'use client';

import styled from '@emotion/styled';
import { usePathname, useRouter } from 'next/navigation';

const SidebarContainer = styled.aside`
  width: 280px;
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-right: 1px solid #e5e7eb;
  padding: 2rem 0;
  position: sticky;
  top: 0;
  left: 0;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    width: 240px;
    padding: 1.5rem 0;
  }
`;

const Logo = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 2rem;
`;

const LogoTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #5b7fff 0%, #4a6fee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
`;

const LogoSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: none;
  border-radius: 0.75rem;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #5b7fff 0%, #4a6fee 100%)' 
    : 'transparent'};
  color: ${props => props.isActive ? '#ffffff' : '#374151'};
  font-size: 0.9375rem;
  font-weight: ${props => props.isActive ? 600 : 500};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, #5b7fff 0%, #4a6fee 100%)' 
      : '#f3f4f6'};
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px);
  }
`;

const NavIcon = styled.span`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const NavLabel = styled.span`
  flex: 1;
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 1rem 1.5rem;
`;

const menuItems = [
  { href: '/', icon: '🏠', label: '홈' },
  { href: '/contests', icon: '🏆', label: '대회/공모전' },
  { href: '/employment', icon: '🎓', label: '취업 프로그램' },
  { href: '/volunteer', icon: '📘', label: '봉사활동/멘토링' },
  { href: '/workshop', icon: '📚', label: '워크샵/특강' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <SidebarContainer>
      <Logo>
        <LogoTitle>이루모아</LogoTitle>
        <LogoSubtitle>대학생 활동 정보</LogoSubtitle>
      </Logo>
      
      <Divider />
      
      <Nav>
        {menuItems.map((item) => (
          <NavButton
            key={item.href}
            isActive={pathname === item.href}
            onClick={() => handleNavigation(item.href)}
          >
            <NavIcon>{item.icon}</NavIcon>
            <NavLabel>{item.label}</NavLabel>
          </NavButton>
        ))}
      </Nav>
    </SidebarContainer>
  );
}

