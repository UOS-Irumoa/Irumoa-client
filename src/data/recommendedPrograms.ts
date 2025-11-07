export interface RecommendedProgram {
  id: number;
  title: string;
  category: string;
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
}

export const recommendedPrograms: RecommendedProgram[] = [
  {
    id: 1,
    title: "2025 제1회 SEOUL:ution 해커톤",
    category: "공모전",
    status: "upcoming",
    departmentRestricted: false,
  },
  {
    id: 2,
    title: "AI 융합 창업 아이디어 경진대회",
    category: "공모전",
    status: "open",
    departmentRestricted: false,
  },
  {
    id: 3,
    title: "캡스톤 디자인 발표회",
    category: "공모전",
    status: "upcoming",
    departmentRestricted: false,
  },
  {
    id: 4,
    title: "SW 마에스트로 멘토링",
    category: "멘토링",
    status: "open",
    departmentRestricted: true,
  },
  {
    id: 5,
    title: "스타트업 CEO 특강",
    category: "특강",
    status: "open",
    departmentRestricted: false,
  },
];

