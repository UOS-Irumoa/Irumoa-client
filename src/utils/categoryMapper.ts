/**
 * 카테고리 이름과 URL slug 간 매핑 정보
 */

interface CategoryMapping {
  name: string;
  slug: string;
  icon: string;
}

// 카테고리 매핑 테이블
const categoryMappings: CategoryMapping[] = [
  { name: "공모전", slug: "contest", icon: "/images/sidebar/icon-contest.svg" },
  {
    name: "멘토링",
    slug: "mentoring",
    icon: "/images/sidebar/icon-mentoring.svg",
  },
  {
    name: "봉사",
    slug: "volunteer",
    icon: "/images/sidebar/icon-volunteer.svg",
  },
  {
    name: "취업",
    slug: "employment",
    icon: "/images/sidebar/icon-employment.svg",
  },
  { name: "탐방", slug: "visit", icon: "/images/sidebar/icon-visit.svg" },
  { name: "방문", slug: "exploration", icon: "/images/sidebar/icon-visit.svg" }, // API에서 "방문"으로 올 수 있음
  { name: "특강", slug: "lecture", icon: "/images/sidebar/icon-lecture.svg" },
  {
    name: "비교과",
    slug: "extracurricular",
    icon: "/images/sidebar/icon-lecture.svg",
  },
];

/**
 * 카테고리 이름을 URL slug로 변환
 */
export function getCategorySlug(categoryName: string): string {
  const mapping = categoryMappings.find((m) => m.name === categoryName);
  return mapping?.slug || categoryName.toLowerCase();
}

/**
 * URL slug를 카테고리 이름으로 변환
 */
export function getCategoryNameFromSlug(slug: string): string {
  const mapping = categoryMappings.find((m) => m.slug === slug);
  return mapping?.name || slug;
}

/**
 * 카테고리 이름에 해당하는 아이콘 경로 반환
 */
export function getCategoryIcon(categoryName: string): string {
  const mapping = categoryMappings.find((m) => m.name === categoryName);
  return mapping?.icon || "/images/sidebar/icon-all.svg";
}

/**
 * API에서 받은 카테고리 목록을 메뉴 아이템으로 변환
 */
export function categoriesToMenuItems(categories: string[]) {
  return categories.map((category) => ({
    href: `/${getCategorySlug(category)}`,
    icon: getCategoryIcon(category),
    label: category,
  }));
}
