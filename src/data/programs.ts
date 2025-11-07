export interface Program {
  id: number;
  title: string;
  category: string;
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
  gradeRestricted: boolean;
}

export const programs: Program[] = [
  {
    id: 1,
    title: "2024 캡스톤 디자인 경진대회",
    category: "공모전",
    status: "open",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 2,
    title: "(4회차) DX 실무 워크플로우 마스터 교육",
    category: "특강",
    status: "open",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 3,
    title: "1차 BizTalk English 취업준비&커뮤니케이션 트레이닝",
    category: "특강",
    status: "closed",
    departmentRestricted: true,
    gradeRestricted: false,
  },
  {
    id: 4,
    title: "안심캠퍼스 순찰대 봉사활동(11.28.)",
    category: "봉사",
    status: "closed",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 5,
    title: "안심캠퍼스 순찰대 봉사활동(11.27.)",
    category: "봉사",
    status: "closed",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 6,
    title: "안심캠퍼스 순찰대 봉사활동(11.26.)",
    category: "봉사",
    status: "closed",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 7,
    title: "2024 SW 융합 해커톤",
    category: "공모전",
    status: "open",
    departmentRestricted: true,
    gradeRestricted: false,
  },
  {
    id: 8,
    title: "글로벌 기업 탐방 프로그램",
    category: "취업",
    status: "upcoming",
    departmentRestricted: false,
    gradeRestricted: true,
  },
  {
    id: 9,
    title: "AI 개발자 양성 특강",
    category: "특강",
    status: "open",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 10,
    title: "창업 아이디어 경진대회",
    category: "공모전",
    status: "upcoming",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 11,
    title: "코딩 테스트 대비 특강",
    category: "특강",
    status: "open",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 12,
    title: "지역사회 봉사활동",
    category: "봉사",
    status: "open",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 13,
    title: "스타트업 인턴십 프로그램",
    category: "취업",
    status: "closed",
    departmentRestricted: true,
    gradeRestricted: true,
  },
  {
    id: 14,
    title: "UX/UI 디자인 워크샵",
    category: "특강",
    status: "upcoming",
    departmentRestricted: false,
    gradeRestricted: false,
  },
  {
    id: 15,
    title: "데이터 분석 경진대회",
    category: "공모전",
    status: "open",
    departmentRestricted: true,
    gradeRestricted: false,
  },
];

