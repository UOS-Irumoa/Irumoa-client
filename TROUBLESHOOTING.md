# 문제 해결 가이드

## 429 Error (Too Many Requests)

### 증상
콘솔에 다음과 같은 에러가 반복적으로 나타남:
```
Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

### 원인
1. **API Rate Limiting**: 서버가 짧은 시간 내에 너무 많은 요청을 받음
2. **무한 렌더링 루프**: React 컴포넌트가 무한히 리렌더링되면서 API를 반복 호출
3. **의존성 배열 문제**: useEffect의 의존성이 매번 새로운 참조를 생성

### 해결 방법

#### 1. Zustand 스토어 사용 시 주의사항

**❌ 잘못된 방법** - 매번 새로운 배열 생성
```typescript
const profile = useUserStore((state) => state.profile);
const userDepartments = getUserDepartments(); // 매번 새 배열!

useEffect(() => {
  fetchData();
}, [userDepartments]); // 무한 루프!
```

**✅ 올바른 방법** - 안정적인 참조 사용
```typescript
// 방법 1: 개별 필드 선택
const department = useUserStore((state) => state.profile?.department);
const doubleDepartment = useUserStore((state) => state.profile?.doubleDepartment);

const userDepartments = useMemo(() => {
  const deps = [];
  if (department) deps.push(department);
  if (doubleDepartment) deps.push(doubleDepartment);
  return deps;
}, [department, doubleDepartment]);

useEffect(() => {
  fetchData();
}, [department, doubleDepartment]); // 프리미티브 값 사용
```

```typescript
// 방법 2: JSON.stringify로 안정화
const userDepartments = useUserStore((state) => state.getUserDepartments());
const depsKey = JSON.stringify(userDepartments);

useEffect(() => {
  fetchData();
}, [depsKey]); // 안정적인 문자열 비교
```

#### 2. 디바운싱 적용

검색어나 필터 같이 자주 변경되는 값은 디바운싱 적용:

```typescript
const [searchTerm, setSearchTerm] = useState("");
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500); // 500ms 대기

  return () => clearTimeout(timer);
}, [searchTerm]);

// API 호출 시 debouncedSearchTerm 사용
useEffect(() => {
  fetchData(debouncedSearchTerm);
}, [debouncedSearchTerm]);
```

#### 3. API 호출 최적화

**캐싱 추가**:
```typescript
const cache = new Map();

async function fetchWithCache(url: string) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const data = await fetch(url).then(r => r.json());
  cache.set(url, data);
  return data;
}
```

**Abort Controller 사용**:
```typescript
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const response = await fetch(url, {
        signal: controller.signal
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        // 이전 요청이 취소됨 (정상)
        return;
      }
      console.error(error);
    }
  }

  fetchData();

  return () => controller.abort(); // 컴포넌트 언마운트 시 취소
}, [url]);
```

## localStorage 관련 문제

### SSR 에러

#### 증상
```
ReferenceError: localStorage is not defined
```

#### 해결
컴포넌트를 클라이언트 전용으로 표시:
```typescript
'use client';

export default function MyComponent() {
  // ...
}
```

Zustand persist는 자동으로 SSR을 처리하지만, 초기 렌더링 시 hydration mismatch를 방지하려면:

```typescript
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);
}, []);

if (!isHydrated) {
  return <Loading />;
}

return <div>{data}</div>;
```

### 데이터가 저장되지 않음

#### 확인 사항
1. **브라우저 개발자 도구** > Application > Local Storage 확인
2. **시크릿 모드**에서는 localStorage가 제한될 수 있음
3. **용량 제한**: localStorage는 약 5-10MB 제한

#### 디버깅
```typescript
// 스토어 상태 확인
console.log('Current state:', useUserStore.getState());

// localStorage 확인
console.log('Stored data:', localStorage.getItem('user-storage'));

// 수동 저장 테스트
useUserStore.getState().setProfile({
  department: 'test',
  grade: '3',
  // ...
});
```

## React 성능 문제

### 불필요한 리렌더링

**React DevTools Profiler** 사용:
1. React DevTools 설치
2. Profiler 탭 열기
3. 기록 시작 → 작업 수행 → 기록 중지
4. 어떤 컴포넌트가 자주 렌더링되는지 확인

**Zustand 선택적 구독**:
```typescript
// ❌ 전체 상태 구독 (profile의 모든 변경에 리렌더링)
const profile = useUserStore((state) => state.profile);

// ✅ 필요한 필드만 구독
const department = useUserStore((state) => state.profile?.department);
```

**React.memo 사용**:
```typescript
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
}, (prevProps, nextProps) => {
  // true를 반환하면 리렌더링 스킵
  return prevProps.data === nextProps.data;
});
```

## 개발 환경 설정

### 로깅 활성화

**Zustand DevTools**:
```typescript
import { devtools } from 'zustand/middleware';

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        // ...
      }),
      { name: 'user-storage' }
    ),
    { name: 'UserStore' } // DevTools에 표시될 이름
  )
);
```

**API 호출 로깅**:
```typescript
const originalFetch = window.fetch;
window.fetch = (...args) => {
  console.log('Fetch:', args[0]);
  return originalFetch(...args);
};
```

### 환경 변수 설정

`.env.local` 파일 생성:
```bash
# API Base URL
NEXT_PUBLIC_API_BASE_URL=https://uoscholar-server.store/irumoa-api

# 개발 모드 설정
NEXT_PUBLIC_DEBUG=true

# Rate Limit 설정 (ms)
NEXT_PUBLIC_API_DEBOUNCE=500
```

코드에서 사용:
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true';

if (DEBUG) {
  console.log('API Call:', url);
}
```

## 유용한 도구

### 1. React DevTools
- 컴포넌트 트리 확인
- Props/State 검사
- 성능 프로파일링

### 2. Redux DevTools (Zustand 지원)
```bash
npm install @redux-devtools/extension
```

브라우저 확장 프로그램 설치:
- Chrome: Redux DevTools
- Firefox: Redux DevTools

### 3. Network Throttling
개발자 도구 > Network 탭 > Throttling 옵션
- Slow 3G로 테스트
- API 호출 빈도 확인

### 4. Console 필터링
브라우저 콘솔에서:
```javascript
// 특정 에러만 보기
console.error = (function(originalError) {
  return function(...args) {
    if (args[0]?.includes('429')) {
      // 429 에러만 특별 처리
      console.trace('429 Error detected:', ...args);
    }
    originalError.apply(console, args);
  };
})(console.error);
```

## 추가 리소스

- [Zustand 공식 문서](https://github.com/pmndrs/zustand)
- [React 성능 최적화](https://react.dev/learn/render-and-commit)
- [Next.js 디버깅](https://nextjs.org/docs/app/building-your-application/configuring/debugging)
