"use client";

import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { useNavigationStore } from "@/stores/navigationStore";

const Nav = styled.nav`
  position: fixed;
  top: calc(
    ${({ theme }) => theme.layout.headerHeight} +
      ${({ theme }) => theme.padding.xxl}
  );
  left: ${({ theme }) => theme.padding.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: 50;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: calc(
      ${({ theme }) => theme.layout.headerHeight} +
        ${({ theme }) => theme.padding.xl}
    );
    left: calc((${({ theme }) => theme.padding.xxl} - 64px) / 2);
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const NavButton = styled.button<{ isActive: boolean }>`
  width: 106px;
  height: 63.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary.gradient : theme.colors.background.paper};
  box-shadow: ${({ theme, isActive }) =>
    isActive ? theme.shadows.buttonActive : theme.shadows.button};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme, isActive }) =>
      isActive ? "0px 6px 16px 0px rgba(64, 140, 255, 0.4)" : theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 62px;
    height: 54px;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const NavIconWrapper = styled.div<{ isActive: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${(props) => (props.isActive ? 1 : 0.6)};

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 26px;
    height: 26px;
  }
`;

const NavLabel = styled.span<{ isActive: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.text.white : theme.colors.text.primary};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

interface MenuItem {
  href: string;
  icon: string;
  label: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = useNavigationStore((state) => state.menuItems);
  const isMounted = useNavigationStore((state) => state.isSidebarMounted);
  const setIsSidebarMounted = useNavigationStore(
    (state) => state.setIsSidebarMounted
  );

  useEffect(() => {
    setIsSidebarMounted(true);
  }, [setIsSidebarMounted]);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  // 서버/클라이언트 일치를 위해 마운트 전에는 기본 상태로 렌더링
  const currentPath = isMounted ? pathname : "/";

  return (
    <Nav>
      {menuItems.map((item) => (
        <NavButton
          key={item.href}
          isActive={currentPath === item.href}
          onClick={() => handleNavigation(item.href)}
        >
          <NavIconWrapper isActive={currentPath === item.href}>
            <Image
              src={item.icon}
              alt={item.label}
              width={32}
              height={32}
              style={{
                filter:
                  currentPath === item.href
                    ? "brightness(0) invert(1)"
                    : "none",
              }}
            />
          </NavIconWrapper>
          <NavLabel isActive={currentPath === item.href}>{item.label}</NavLabel>
        </NavButton>
      ))}
    </Nav>
  );
}
