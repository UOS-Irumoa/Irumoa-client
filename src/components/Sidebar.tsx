"use client";

import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Nav = styled.nav`
  position: fixed;
  top: calc(
    ${({ theme }) => theme.layout.headerHeight} +
      ${({ theme }) => theme.padding.xxl}
  );
  left: calc((${({ theme }) => theme.padding.container} - 106px) / 2);
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
  height: 50px;
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
  opacity: ${(props) => (props.isActive ? 1 : 0.6)};

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
  font-weight: ${({ theme, isActive }) =>
    isActive
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.text.white : theme.colors.text.primary};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const menuItems = [
  { href: "/", icon: "/images/sidebar/icon-all.svg", label: "전체" },
  {
    href: "/contest",
    icon: "/images/sidebar/icon-contest.svg",
    label: "공모전",
  },
  {
    href: "/mentoring",
    icon: "/images/sidebar/icon-mentoring.svg",
    label: "멘토링",
  },
  {
    href: "/volunteer",
    icon: "/images/sidebar/icon-volunteer.svg",
    label: "봉사",
  },
  {
    href: "/employment",
    icon: "/images/sidebar/icon-employment.svg",
    label: "취업",
  },
  { href: "/visit", icon: "/images/sidebar/icon-visit.svg", label: "탐방" },
  { href: "/lecture", icon: "/images/sidebar/icon-lecture.svg", label: "특강" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
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
                filter:
                  pathname === item.href ? "brightness(0) invert(1)" : "none",
              }}
            />
          </NavIconWrapper>
          <NavLabel isActive={pathname === item.href}>{item.label}</NavLabel>
        </NavButton>
      ))}
    </Nav>
  );
}
