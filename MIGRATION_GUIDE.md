# localStorage → Zustand Persist 마이그레이션 가이드

## 개요

프로젝트의 모든 localStorage 사용을 Zustand의 persist 미들웨어로 완전히 대체했습니다.

## 변경 사항

### ✅ 완료된 작업

1. **새로운 Zustand 스토어 생성**
   - [src/stores/userStore.ts](src/stores/userStore.ts) - 사용자 프로필 관리 스토어

2. **컴포넌트 업데이트**
   - [src/components/Header.tsx](src/components/Header.tsx) - localStorage → Zustand
   - [src/components/layout/FilterBar.tsx](src/components/layout/FilterBar.tsx) - localStorage → Zustand
   - [src/components/layout/LayoutContent.tsx](src/components/layout/LayoutContent.tsx) - localStorage → Zustand
   - [src/app/profile/page.tsx](src/app/profile/page.tsx) - localStorage → Zustand

3. **유틸리티 업데이트**
   - [src/utils/userStorage.ts](src/utils/userStorage.ts) - 레거시 호환성을 위해 유지하되 내부적으로 Zustand 사용

## 사용 방법

### 기본 사용법

```typescript
import { useUserStore } from '@/stores/userStore';

function MyComponent() {
  // 프로필 데이터 가져오기
  const profile = useUserStore((state) => state.profile);

  // 프로필 저장하기
  const setProfile = useUserStore((state) => state.setProfile);

  const handleSave = () => {
    setProfile({
      college: '공과대학',
      department: '컴퓨터공학과',
      doubleCollege: '',
      doubleDepartment: '',
      grade: '3',
      interests: ['공모전', '취업'],
      interest_fields: ['AI', '머신러닝'],
    });
  };

  return <div>{profile?.department}</div>;
}
```

### 유틸리티 메서드 사용

```typescript
import { useUserStore } from '@/stores/userStore';

function FilterComponent() {
  // 사용자의 모든 학과 가져오기 (전공 + 복수전공)
  const getUserDepartments = useUserStore((state) => state.getUserDepartments);
  const departments = getUserDepartments();

  // 사용자 학년 가져오기
  const getUserGrade = useUserStore((state) => state.getUserGrade);
  const grade = getUserGrade();

  // 프로필 유효성 검사
  const hasValidProfile = useUserStore((state) => state.hasValidProfile);
  const isValid = hasValidProfile();

  return <div>...</div>;
}
```

### API 요청용 UserInfo 가져오기

```typescript
import { useUserStore } from '@/stores/userStore';

function ApiComponent() {
  const getUserInfo = useUserStore((state) => state.getUserInfo);

  const handleApiCall = async () => {
    const userInfo = getUserInfo();

    if (!userInfo) {
      console.error('사용자 정보가 없습니다');
      return;
    }

    // API 요청
    const response = await fetch('/api/recommend', {
      method: 'POST',
      body: JSON.stringify({ user: userInfo }),
    });
  };
}
```

### 컴포넌트 외부에서 사용 (getState)

```typescript
import { useUserStore } from '@/stores/userStore';

// 컴포넌트 외부에서 직접 접근
const userInfo = useUserStore.getState().getUserInfo();
const profile = useUserStore.getState().profile;

// 프로필 업데이트
useUserStore.getState().setProfile({
  // ...
});
```

## 주요 기능

### 자동 localStorage 동기화

Zustand persist 미들웨어가 자동으로 localStorage에 저장하고 복원합니다.

- **localStorage key**: `user-storage`
- **저장 위치**: `localStorage.getItem('user-storage')`

### 타입 안정성

모든 상태와 액션이 TypeScript로 타입이 지정되어 있습니다.

```typescript
interface UserProfile {
  college: string;
  department: string;
  doubleCollege: string;
  doubleDepartment: string;
  grade: string;
  interests: string[];
  interest_fields?: string[];
}
```

### 커스텀 이벤트 호환성

기존 `profileUpdated` 이벤트를 계속 지원합니다.

```typescript
// 프로필 업데이트 시 자동으로 이벤트 발생
setProfile(newProfile);
// → window.dispatchEvent(new Event('profileUpdated'))
```

## 레거시 코드 호환성

기존 `userStorage.ts` 함수들은 여전히 작동하지만 deprecated 되었습니다.

```typescript
// ❌ 구식 (여전히 작동하지만 권장하지 않음)
import { getUserInfo, setUserInfo } from '@/utils/userStorage';

// ✅ 새로운 방식 (권장)
import { useUserStore } from '@/stores/userStore';
const userInfo = useUserStore.getState().getUserInfo();
```

## 스토어 구조

```typescript
interface UserState {
  // 상태
  profile: UserProfile | null;

  // 액션
  setProfile: (profile: UserProfile) => void;
  updateProfile: (partialProfile: Partial<UserProfile>) => void;
  clearProfile: () => void;

  // 유틸리티
  getUserInfo: () => UserInfo | null;
  getUserDepartments: () => string[];
  getUserGrade: () => number | undefined;
  hasValidProfile: () => boolean;
  isProfileComplete: () => boolean;
}
```

## 데이터 마이그레이션

기존 localStorage 데이터가 있다면 자동으로 마이그레이션됩니다.

### 기존 데이터 구조
```
localStorage.getItem('userInfo')
localStorage.getItem('userProfile')
```

### 새로운 데이터 구조
```
localStorage.getItem('user-storage')
```

첫 로드 시 기존 `userInfo`와 `userProfile` 데이터를 자동으로 불러와서 새로운 스토어로 통합합니다.

## 장점

### 1. 자동 동기화
- 상태 변경 시 자동으로 localStorage에 저장
- 페이지 새로고침 시 자동으로 복원

### 2. 타입 안정성
- TypeScript 타입 추론 완벽 지원
- 컴파일 타임 에러 감지

### 3. DevTools 지원
- Redux DevTools로 디버깅 가능
- 상태 변화 추적

### 4. 성능 최적화
- 선택적 구독으로 불필요한 리렌더링 방지
- 메모이제이션 자동 지원

### 5. 코드 간소화
- useEffect, localStorage API 호출 제거
- 보일러플레이트 코드 대폭 감소

## 예제 비교

### Before (localStorage)

```typescript
const [userProfile, setUserProfile] = useState(null);

useEffect(() => {
  const loadProfile = () => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (error) {
        console.error(error);
      }
    }
  };

  loadProfile();
  window.addEventListener('profileUpdated', loadProfile);
  return () => window.removeEventListener('profileUpdated', loadProfile);
}, []);

const handleSave = (data) => {
  localStorage.setItem('userProfile', JSON.stringify(data));
  window.dispatchEvent(new Event('profileUpdated'));
};
```

### After (Zustand)

```typescript
const profile = useUserStore((state) => state.profile);
const setProfile = useUserStore((state) => state.setProfile);

const handleSave = (data) => {
  setProfile(data);
  // 자동으로 localStorage 저장 & 이벤트 발생
};
```

## 문제 해결

### Q: localStorage에 저장이 안 돼요
**A**: 브라우저 개발자 도구 > Application > Local Storage에서 `user-storage` 키를 확인하세요.

### Q: 기존 데이터가 사라졌어요
**A**: 기존 `userInfo` 키의 데이터를 새로운 구조로 수동 마이그레이션하세요:

```typescript
// 한 번만 실행
const oldData = JSON.parse(localStorage.getItem('userInfo') || '{}');
useUserStore.getState().setProfile(oldData);
```

### Q: SSR에서 에러가 나요
**A**: 컴포넌트를 `'use client'`로 표시하세요. Zustand persist는 클라이언트 사이드 전용입니다.

## 추가 리소스

- [Zustand 공식 문서](https://github.com/pmndrs/zustand)
- [Persist 미들웨어 가이드](stores/PERSIST_GUIDE.md)
- [Zustand 사용 예제](stores/README.md)
