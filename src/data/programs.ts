export interface Program {
  id: number;
  title: string;
  category: string | string[];
  status: "upcoming" | "open" | "closed";
  departmentRestricted: boolean;
  gradeRestricted: boolean;
  link: string;
  departments: string[];
  grades: number[];
}

