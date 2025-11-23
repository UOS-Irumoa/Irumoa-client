/**
 * @deprecated 이 파일은 더 이상 사용되지 않습니다.
 * 대신 @/stores/userStore를 사용하세요.
 *
 * 마이그레이션 가이드:
 * - getUserInfo() → useUserStore.getState().getUserInfo()
 * - setUserInfo(info) → useUserStore.getState().setProfile(profile)
 * - clearUserInfo() → useUserStore.getState().clearProfile()
 */

import { useUserStore } from "@/stores/userStore";
import type { UserInfo } from "@/types/notice";

/**
 * @deprecated Zustand 스토어를 사용하세요: useUserStore.getState().getUserInfo()
 */
export function getUserInfo(): UserInfo | null {
  return useUserStore.getState().getUserInfo();
}

/**
 * @deprecated Zustand 스토어를 사용하세요: useUserStore.getState().setProfile()
 */
export function setUserInfo(userInfo: UserInfo): void {
  const currentProfile = useUserStore.getState().profile;

  useUserStore.getState().setProfile({
    college: currentProfile?.college || '',
    department: userInfo.departments[0] || '', // 첫 번째 학과를 메인 학과로
    doubleCollege: currentProfile?.doubleCollege || '',
    doubleDepartment: userInfo.departments[1] || '', // 두 번째 학과를 복수전공으로
    grade: String(userInfo.grade),
    interests: userInfo.interests,
    interest_fields: userInfo.interest_fields || [],
  });
}

/**
 * @deprecated Zustand 스토어를 사용하세요: useUserStore.getState().clearProfile()
 */
export function clearUserInfo(): void {
  useUserStore.getState().clearProfile();
}
