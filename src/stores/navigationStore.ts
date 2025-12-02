import { create } from 'zustand';

interface MenuItem {
  href: string;
  icon: string;
  label: string;
}

interface NavigationState {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  isSidebarMounted: boolean;
  setIsSidebarMounted: (mounted: boolean) => void;
}

const defaultMenuItems: MenuItem[] = [
  { href: '/', icon: '/images/sidebar/icon-all.svg', label: '전체' },
  { href: '/contest', icon: '/images/sidebar/icon-contest.svg', label: '공모전' },
  { href: '/mentoring', icon: '/images/sidebar/icon-mentoring.svg', label: '멘토링' },
  { href: '/volunteer', icon: '/images/sidebar/icon-volunteer.svg', label: '봉사' },
  { href: '/employment', icon: '/images/sidebar/icon-employment.svg', label: '취업' },
  { href: '/lecture', icon: '/images/sidebar/icon-lecture.svg', label: '특강' },
  { href: '/visit', icon: '/images/sidebar/icon-visit.svg', label: '탐방' },
  { href: '/extracurricular', icon: '/images/sidebar/icon-extracurricular.svg', label: '기타' },
];

export const useNavigationStore = create<NavigationState>((set) => ({
  menuItems: defaultMenuItems,
  setMenuItems: (items) => set({ menuItems: items }),
  isSidebarMounted: false,
  setIsSidebarMounted: (mounted) => set({ isSidebarMounted: mounted }),
}));
