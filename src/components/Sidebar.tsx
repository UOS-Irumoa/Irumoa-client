'use client';

import styled from '@emotion/styled';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const SidebarContainer = styled.aside`
  width: ${({ theme }) => theme.layout.sidebarWidth};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.main};
  padding: 104px 0 ${({ theme }) => theme.padding.xxl} 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 50;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: ${({ theme }) => theme.layout.sidebarWidthMobile};
    padding: ${({ theme }) => theme.padding.xl} 0 ${({ theme }) => theme.padding.xl} 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
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
  gap: ${({ theme }) => theme.spacing.xs};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme, isActive }) => isActive 
    ? theme.colors.primary.gradient
    : theme.colors.background.paper};
  box-shadow: ${({ theme, isActive }) => isActive 
    ? theme.shadows.buttonActive
    : theme.shadows.button};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme, isActive }) => isActive 
      ? '0px 6px 16px 0px rgba(64, 140, 255, 0.4)' 
      : theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 18px;
    height: 18px;
  }
`;

const NavLabel = styled.span<{ isActive: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme, isActive }) => isActive 
    ? theme.typography.fontWeight.bold 
    : theme.typography.fontWeight.medium};
  color: ${({ theme, isActive }) => isActive 
    ? theme.colors.text.white 
    : theme.colors.text.primary};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
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

