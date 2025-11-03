'use client';

import styled from '@emotion/styled';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const SidebarContainer = styled.aside`
  width: 100px;
  min-height: 100vh;
  background: #E3F2FD;
  padding: 104px 0 40px 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 50;

  @media (max-width: 768px) {
    width: 80px;
    padding: 80px 0 32px 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0 0;
  align-items: center;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  width: 106px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  border-radius: 12px;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #408CFF 0%, #2563EB 100%)' 
    : '#FFFFFF'};
  box-shadow: ${props => props.isActive 
    ? '0px 4px 12px 0px rgba(64, 140, 255, 0.3)' 
    : '0px 2px 8px 0px rgba(0, 0, 0, 0.08)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.isActive 
      ? '0px 6px 16px 0px rgba(64, 140, 255, 0.4)' 
      : '0px 4px 12px 0px rgba(0, 0, 0, 0.12)'};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 64px;
    height: 44px;
  }
`;

const NavIconWrapper = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${props => props.isActive ? 1 : 0.6};
  
  svg {
    width: 100%;
    height: 100%;
  }
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

const NavLabel = styled.span<{ isActive: boolean }>`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 11px;
  font-weight: ${props => props.isActive ? 700 : 500};
  color: ${props => props.isActive ? '#FFFFFF' : '#5C5E66'};
  letter-spacing: -0.04em;
  line-height: 1.25em;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const menuItems = [
  { href: '/', icon: '/images/icon-home.svg', label: '전체' },
  { href: '/contests', icon: '/images/icon-contest.svg', label: '대회/공모전' },
  { href: '/employment', icon: '/images/icon-employment.svg', label: '취업 프로그램' },
  { href: '/volunteer', icon: '/images/icon-volunteer.svg', label: '봉사활동/멘토링' },
  { href: '/workshop', icon: '/images/icon-workshop.svg', label: '워크샵/특강' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <SidebarContainer>
      <Nav>
        {menuItems.map((item) => (
          <NavButton
            key={item.href}
            isActive={pathname === item.href}
            onClick={() => handleNavigation(item.href)}
          >
            <NavIconWrapper isActive={pathname === item.href}>
              <Image 
                src={item.icon} 
                alt={item.label}
                width={20}
                height={20}
                style={{ 
                  filter: pathname === item.href ? 'brightness(0) invert(1)' : 'none'
                }}
              />
            </NavIconWrapper>
            <NavLabel isActive={pathname === item.href}>{item.label}</NavLabel>
          </NavButton>
        ))}
      </Nav>
    </SidebarContainer>
  );
}

