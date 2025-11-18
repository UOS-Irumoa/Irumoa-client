import { UserInfo } from "@/types/notice";

const USER_INFO_KEY = "userInfo";

// localStorage에서 사용자 정보 가져오기
export function getUserInfo(): UserInfo | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const userInfoString = localStorage.getItem(USER_INFO_KEY);
    if (!userInfoString) {
      return null;
    }

    const userInfo = JSON.parse(userInfoString) as UserInfo;

    // 필수 필드 검증
    if (
      !userInfo.department ||
      !userInfo.grade ||
      !userInfo.interests ||
      !Array.isArray(userInfo.interests)
    ) {
      return null;
    }

    // interest_fields가 없으면 빈 배열로 설정
    if (!userInfo.interest_fields) {
      userInfo.interest_fields = [];
    }

    return userInfo;
  } catch (error) {
    console.error("Failed to parse user info from localStorage:", error);
    return null;
  }
}

// localStorage에 사용자 정보 저장하기
export function setUserInfo(userInfo: UserInfo): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    // interest_fields가 없으면 빈 배열로 설정
    if (!userInfo.interest_fields) {
      userInfo.interest_fields = [];
    }

    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  } catch (error) {
    console.error("Failed to save user info to localStorage:", error);
  }
}

// localStorage에서 사용자 정보 삭제하기
export function clearUserInfo(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(USER_INFO_KEY);
  } catch (error) {
    console.error("Failed to clear user info from localStorage:", error);
  }
}
