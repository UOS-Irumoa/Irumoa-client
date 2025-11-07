export interface CategoryInfo {
  slug: string;
  name: string;
  description?: string;
}

export const categories: CategoryInfo[] = [
  { slug: "contest", name: "공모전" },
  { slug: "employment", name: "취업" },
  { slug: "lecture", name: "특강" },
  { slug: "mentoring", name: "멘토링" },
  { slug: "visit", name: "방문" },
  { slug: "volunteer", name: "봉사" },
];

export const categoryMap: Record<string, string> = {
  contest: "공모전",
  employment: "취업",
  lecture: "특강",
  mentoring: "멘토링",
  visit: "방문",
  volunteer: "봉사",
};

export function getCategoryName(slug: string): string | undefined {
  return categoryMap[slug];
}

