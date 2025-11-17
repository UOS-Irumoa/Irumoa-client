import { Notice } from "@/types/notice";
import { Program } from "@/data/programs";

/**
 * API에서 받은 Notice 데이터를 Program 형식으로 변환
 */
export function noticeToProgram(notice: Notice): Program {
  return {
    id: notice.id,
    title: notice.title,
    category: notice.categories[0] || "기타", // 첫 번째 카테고리 사용
    status: getNoticeStatus(notice.appStartDate, notice.appEndDate),
    departmentRestricted: isDepartmentRestricted(notice.departments),
    gradeRestricted: isGradeRestricted(notice.grades),
  };
}

/**
 * 공지사항 날짜를 기준으로 모집 상태 결정
 */
function getNoticeStatus(
  startDate: string,
  endDate: string
): "upcoming" | "open" | "closed" {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 종료일 23:59:59까지 모집 중으로 간주
  end.setHours(23, 59, 59, 999);

  if (now < start) {
    return "upcoming";
  } else if (now >= start && now <= end) {
    return "open";
  } else {
    return "closed";
  }
}

/**
 * 학과 제한 여부 확인
 */
function isDepartmentRestricted(departments: string[]): boolean {
  // "제한없음"이 포함되어 있으면 제한 없음
  return !departments.some(
    (dept) => dept === "제한없음" || dept.toLowerCase() === "all"
  );
}

/**
 * 학년 제한 여부 확인
 */
function isGradeRestricted(grades: number[]): boolean {
  // 0이 포함되어 있거나 1,2,3,4,7(대학원)이 모두 포함되어 있으면 제한 없음
  if (grades.includes(0)) {
    return false;
  }

  const allGrades = [1, 2, 3, 4, 7];
  const hasAllGrades = allGrades.every((grade) => grades.includes(grade));

  return !hasAllGrades;
}

/**
 * Notice 배열을 Program 배열로 변환
 */
export function noticesToPrograms(notices: Notice[]): Program[] {
  return notices.map(noticeToProgram);
}
