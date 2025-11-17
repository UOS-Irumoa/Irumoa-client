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
  // 현재 날짜 (시간 제거, 날짜만 비교)
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // 시작일 (00:00:00으로 설정)
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  // 종료일 (23:59:59으로 설정)
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  let status: "upcoming" | "open" | "closed";

  // 날짜 비교
  if (now < start) {
    // 현재 날짜가 시작일보다 이전 -> 모집 예정
    status = "upcoming";
  } else if (now <= end) {
    // 현재 날짜가 시작일과 종료일 사이 -> 모집 중
    status = "open";
  } else {
    // 현재 날짜가 종료일 이후 -> 모집 완료
    status = "closed";
  }

  // 디버깅용 로그 (개발 중에만 사용)
  if (process.env.NODE_ENV === "development") {
    console.log(
      `날짜 판단: ${startDate} ~ ${endDate} => ${status} (현재: ${now.toISOString().split("T")[0]})`
    );
  }

  return status;
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
