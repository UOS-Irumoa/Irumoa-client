# Zustand Stores

이 디렉토리는 Zustand v5를 사용한 전역 상태 관리 스토어를 포함합니다.

## 사용 예제

### 기본 사용법

```tsx
import { useExampleStore } from '@/stores/exampleStore';

function Counter() {
  const count = useExampleStore((state) => state.count);
  const increase = useExampleStore((state) => state.increase);
  const decrease = useExampleStore((state) => state.decrease);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  );
}
```

### 여러 상태 선택하기

```tsx
// 방법 1: 개별 선택
const count = useExampleStore((state) => state.count);
const user = useExampleStore((state) => state.user);

// 방법 2: 객체로 선택
const { count, user } = useExampleStore((state) => ({
  count: state.count,
  user: state.user,
}));
```

### 액션 사용하기

```tsx
function UserProfile() {
  const user = useExampleStore((state) => state.user);
  const setUser = useExampleStore((state) => state.setUser);
  const clearUser = useExampleStore((state) => state.clearUser);

  const handleLogin = () => {
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };

  return (
    <div>
      {user ? (
        <>
          <p>{user.name} ({user.email})</p>
          <button onClick={clearUser}>로그아웃</button>
        </>
      ) : (
        <button onClick={handleLogin}>로그인</button>
      )}
    </div>
  );
}
```

## 스토어 생성 가이드

### 기본 구조

```typescript
import { create } from 'zustand';

interface YourState {
  // 상태 정의
  data: any;

  // 액션 정의
  setData: (data: any) => void;
}

export const useYourStore = create<YourState>((set) => ({
  // 초기 상태
  data: null,

  // 액션 구현
  setData: (data) => set({ data }),
}));
```

### Immer 미들웨어 사용 (복잡한 상태 업데이트)

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ComplexState {
  nested: {
    deep: {
      value: number;
    };
  };
  updateDeepValue: (value: number) => void;
}

export const useComplexStore = create<ComplexState>()(
  immer((set) => ({
    nested: {
      deep: {
        value: 0,
      },
    },
    updateDeepValue: (value) =>
      set((state) => {
        state.nested.deep.value = value;
      }),
  }))
);
```

### Persist 미들웨어 사용 (로컬 스토리지)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersistedState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<PersistedState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
```

## 베스트 프랙티스

1. **선택적 구독**: 필요한 상태만 선택하여 불필요한 리렌더링 방지
2. **타입 안정성**: TypeScript 인터페이스로 타입 정의
3. **액션 분리**: 상태와 액션을 명확히 구분
4. **작은 스토어**: 관련된 상태끼리 그룹화하되, 너무 크지 않게 유지
5. **미들웨어 활용**: persist, immer 등 필요한 미들웨어 사용

## Zustand v5 주요 변경사항

- TypeScript 타입 추론 개선
- 미들웨어 타입 안정성 향상
- 더 나은 성능 최적화
- API는 v4와 대부분 호환
