# Zustand Persist 미들웨어 완벽 가이드

## 목차
1. [기본 개념](#기본-개념)
2. [설치 및 설정](#설치-및-설정)
3. [기본 사용법](#기본-사용법)
4. [고급 기능](#고급-기능)
5. [실전 예제](#실전-예제)
6. [주의사항](#주의사항)

## 기본 개념

Persist 미들웨어는 Zustand 스토어의 상태를 **영구 저장소**에 자동으로 저장하고 복원합니다.

### 왜 사용하나요?

- ✅ 페이지 새로고침 시 상태 유지
- ✅ 브라우저 재시작 후에도 상태 복원
- ✅ 사용자 설정, 인증 정보 등 영구 저장
- ✅ 자동 동기화 (수동 저장/로드 불필요)

## 설치 및 설정

Zustand를 설치하면 persist 미들웨어가 포함됩니다:

```bash
npm install zustand
```

## 기본 사용법

### 1. 가장 간단한 예제

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CounterState {
  count: number;
  increment: () => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'counter-storage', // localStorage에 저장될 key 이름
    }
  )
);
```

**브라우저 개발자도구 > Application > Local Storage**에서 `counter-storage` 확인 가능

### 2. 컴포넌트에서 사용

```tsx
'use client';

import { useCounterStore } from '@/stores/counterStore';

export default function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

페이지를 새로고침해도 count 값이 유지됩니다!

## 고급 기능

### 1. 선택적 저장 (partialize)

모든 상태를 저장하지 않고 **일부만 저장**:

```typescript
persist(
  (set) => ({
    user: null,
    token: null,
    tempData: [], // 이건 저장하고 싶지 않음
    login: (user, token) => set({ user, token }),
  }),
  {
    name: 'auth',
    partialize: (state) => ({
      user: state.user,
      token: state.token,
      // tempData는 제외
    }),
  }
)
```

### 2. 다른 저장소 사용

#### sessionStorage 사용

```typescript
import { createJSONStorage } from 'zustand/middleware';

persist(
  (set) => ({ /* ... */ }),
  {
    name: 'session-data',
    storage: createJSONStorage(() => sessionStorage),
  }
)
```

#### AsyncStorage (React Native)

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

persist(
  (set) => ({ /* ... */ }),
  {
    name: 'app-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }
)
```

### 3. 버전 관리 및 마이그레이션

스토어 구조가 변경될 때 기존 데이터를 새 구조로 변환:

```typescript
interface UserStateV1 {
  name: string;
}

interface UserStateV2 {
  firstName: string;
  lastName: string;
}

persist(
  (set) => ({
    firstName: '',
    lastName: '',
    // ...
  }),
  {
    name: 'user-store',
    version: 2,
    migrate: (persistedState: any, version: number) => {
      if (version === 1) {
        // V1 -> V2 마이그레이션
        const [firstName, lastName] = persistedState.name.split(' ');
        return {
          firstName,
          lastName,
        };
      }
      return persistedState;
    },
  }
)
```

### 4. 커스텀 병합 전략

저장된 상태와 초기 상태를 병합하는 방식 커스터마이징:

```typescript
persist(
  (set) => ({
    settings: { theme: 'light' },
    cache: {}, // 항상 빈 객체로 시작하고 싶음
  }),
  {
    name: 'app-storage',
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState,
      cache: {}, // cache는 항상 초기값 사용
    }),
  }
)
```

### 5. 수동 제어

스토어 상태를 수동으로 재수화(rehydrate) 또는 초기화:

```typescript
const useStore = create<State>()(
  persist(
    (set) => ({ /* ... */ }),
    { name: 'my-store' }
  )
);

// 수동으로 재수화
useStore.persist.rehydrate();

// 저장된 데이터 초기화
useStore.persist.clearStorage();

// 수화 완료 여부 확인
const hasHydrated = useStore.persist.hasHydrated();
```

## 실전 예제

### 예제 1: 사용자 설정 저장

[userPreferencesStore.ts](./userPreferencesStore.ts) 참고

```tsx
// 사용 예제
function SettingsPage() {
  const { theme, setTheme, resetPreferences } = useUserPreferencesStore();

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
        <option value="light">라이트</option>
        <option value="dark">다크</option>
      </select>
      <button onClick={resetPreferences}>설정 초기화</button>
    </div>
  );
}
```

### 예제 2: 인증 상태 저장

[authStore.ts](./authStore.ts) 참고

```tsx
// 사용 예제
function LoginPage() {
  const { setAuth } = useAuthStore();

  const handleLogin = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const { token, user } = await response.json();

    // 자동으로 localStorage에 저장됨
    setAuth(token, user);
  };

  return <button onClick={handleLogin}>로그인</button>;
}

// 다른 컴포넌트에서 사용
function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) return <LoginButton />;

  return (
    <div>
      <span>{user?.name}</span>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
```

### 예제 3: 장바구니 저장

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'shopping-cart',
      version: 1,
    }
  )
);
```

## 주의사항

### 1. 보안

⚠️ **민감한 정보는 localStorage에 저장하지 마세요!**

```typescript
// ❌ 나쁜 예 - 비밀번호를 localStorage에 저장
persist(
  (set) => ({
    password: '', // 절대 안됨!
  }),
  { name: 'user-data' }
)

// ✅ 좋은 예 - 민감한 정보는 메모리에만 보관
create((set) => ({
  password: '', // persist 없이 사용
}))
```

**권장사항:**
- 토큰은 httpOnly 쿠키 사용 권장
- 필요시 sessionStorage 사용 (브라우저 종료 시 삭제)
- 민감한 데이터는 암호화 후 저장

### 2. 용량 제한

localStorage는 **약 5-10MB** 제한이 있습니다:

```typescript
// ❌ 큰 데이터는 localStorage에 부적합
persist(
  (set) => ({
    largeDataset: [], // 수천 개의 아이템
    images: [], // Base64 이미지들
  }),
  { name: 'data' }
)

// ✅ 큰 데이터는 IndexedDB 또는 서버 사용
```

### 3. SSR (Server-Side Rendering) 주의

Next.js 등에서 사용 시:

```typescript
// ❌ 서버에서 localStorage 접근 시도
export default function Page() {
  const data = useStore((state) => state.data); // 에러 발생 가능
  return <div>{data}</div>;
}

// ✅ 클라이언트 컴포넌트로 분리
'use client';

export default function ClientPage() {
  const data = useStore((state) => state.data);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return <div>Loading...</div>;

  return <div>{data}</div>;
}
```

### 4. 타입 안정성

```typescript
// ✅ 타입을 명시하여 안전하게 사용
interface State {
  count: number;
}

const useStore = create<State>()(
  persist(
    (set) => ({ count: 0 }),
    { name: 'counter' }
  )
);
```

## 베스트 프랙티스

1. **명확한 네이밍**: localStorage key는 의미있는 이름 사용
   - ✅ `user-preferences`, `auth-storage`
   - ❌ `data`, `store1`

2. **partialize 활용**: 필요한 것만 저장
   ```typescript
   partialize: (state) => ({
     // 저장할 필드만 명시
   })
   ```

3. **버전 관리**: 스토어 구조 변경 시 버전업
   ```typescript
   version: 2,
   migrate: (state, version) => { /* ... */ }
   ```

4. **에러 핸들링**: storage API 실패 대비
   ```typescript
   try {
     useStore.persist.rehydrate();
   } catch (error) {
     console.error('Failed to rehydrate:', error);
   }
   ```

5. **개발자 도구 활용**:
   - Chrome DevTools > Application > Local Storage
   - Redux DevTools (Zustand도 지원)

## 추가 리소스

- [Zustand 공식 문서](https://github.com/pmndrs/zustand)
- [Persist 미들웨어 문서](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md)
