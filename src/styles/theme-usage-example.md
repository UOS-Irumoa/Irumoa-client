# Theme 사용 가이드

## 개요
이 프로젝트는 재사용 가능한 디자인 시스템을 위한 테마를 제공합니다.

## 사용 방법

### 1. 기본 Import
```typescript
import { useTheme } from '@/components/provider/ThemeProvider';
import styled from '@emotion/styled';
```

### 2. 컴포넌트에서 Theme 사용

```typescript
const StyledComponent = styled.div`
  /* Colors */
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  
  /* Spacing */
  padding: ${({ theme }) => theme.padding.lg};
  margin: ${({ theme }) => theme.margin.md};
  gap: ${({ theme }) => theme.spacing.md};
  
  /* Typography */
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  
  /* Border Radius */
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  
  /* Shadows */
  box-shadow: ${({ theme }) => theme.shadows.card};
  
  /* Breakpoints */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.padding.md};
  }
`;
```

## Theme 구조

### Colors
```typescript
// Primary Colors
theme.colors.primary.main      // #408CFF
theme.colors.primary.light     // #98BFFA
theme.colors.primary.dark      // #2563EB
theme.colors.primary.gradient  // linear-gradient(...)

// Secondary Colors
theme.colors.secondary.main    // #74D4FF
theme.colors.secondary.light   // #8EC5FF
theme.colors.secondary.dark    // #51A2FF

// Background Colors
theme.colors.background.main    // #E3F2FD
theme.colors.background.paper   // #FFFFFF
theme.colors.background.content // #F0F7FF

// Text Colors
theme.colors.text.primary      // #5C5E66
theme.colors.text.secondary    // #A0A0A0
theme.colors.text.disabled     // #C0C0C0
theme.colors.text.white        // #FFFFFF

// Border Colors
theme.colors.border.main       // #E5E6EC
theme.colors.border.light      // #F0F1F5

// Status Colors
theme.colors.status.error      // #EF4444
theme.colors.status.success    // #00BC7D
theme.colors.status.warning    // #F59E0B
theme.colors.status.info       // #408CFF
```

### Spacing
```typescript
theme.spacing.xs    // 4px
theme.spacing.sm    // 8px
theme.spacing.md    // 12px
theme.spacing.lg    // 16px
theme.spacing.xl    // 24px
theme.spacing.xxl   // 32px
theme.spacing['2xl'] // 40px
theme.spacing['3xl'] // 48px
theme.spacing['4xl'] // 64px
```

### Padding
```typescript
theme.padding.xs         // 4px
theme.padding.sm         // 8px
theme.padding.md         // 16px
theme.padding.lg         // 24px
theme.padding.xl         // 32px
theme.padding.xxl        // 40px
theme.padding.section    // 48px
theme.padding.container  // 116px
```

### Margin
```typescript
theme.margin.xs       // 4px
theme.margin.sm       // 8px
theme.margin.md       // 16px
theme.margin.lg       // 24px
theme.margin.xl       // 32px
theme.margin.xxl      // 40px
theme.margin.section  // 64px
```

### Border Radius
```typescript
theme.borderRadius.xs   // 4px
theme.borderRadius.sm   // 6px
theme.borderRadius.md   // 8px
theme.borderRadius.lg   // 12px
theme.borderRadius.xl   // 16px
theme.borderRadius.full // 9999px
```

### Shadows
```typescript
theme.shadows.xs           // 0px 1px 2px 0px rgba(0, 0, 0, 0.05)
theme.shadows.sm           // 0px 2px 4px 0px rgba(0, 0, 0, 0.06)
theme.shadows.md           // 0px 2px 8px 0px rgba(0, 0, 0, 0.08)
theme.shadows.lg           // 0px 4px 16px 0px rgba(0, 0, 0, 0.1)
theme.shadows.xl           // 0px 8px 32px 0px rgba(0, 0, 0, 0.12)
theme.shadows.button       // 0px 2px 8px 0px rgba(0, 0, 0, 0.08)
theme.shadows.buttonActive // 0px 4px 12px 0px rgba(64, 140, 255, 0.3)
theme.shadows.card         // 0px 2px 8px 0px rgba(0, 0, 0, 0.08)
theme.shadows.header       // 0px 4px 32px 0px rgba(0, 0, 0, 0.05)
```

### Typography
```typescript
// Font Family
theme.typography.fontFamily.primary   // 'Noto Sans KR', ...
theme.typography.fontFamily.secondary // 'Inter', ...
theme.typography.fontFamily.mono      // 'Courier New', ...

// Font Size
theme.typography.fontSize.xs    // 10px
theme.typography.fontSize.sm    // 11px
theme.typography.fontSize.base  // 14px
theme.typography.fontSize.md    // 16px
theme.typography.fontSize.lg    // 18px
theme.typography.fontSize.xl    // 20px
theme.typography.fontSize['2xl'] // 24px
theme.typography.fontSize['3xl'] // 28px
theme.typography.fontSize['4xl'] // 32px
theme.typography.fontSize['5xl'] // 40px

// Font Weight
theme.typography.fontWeight.light     // 300
theme.typography.fontWeight.normal    // 400
theme.typography.fontWeight.medium    // 500
theme.typography.fontWeight.semibold  // 600
theme.typography.fontWeight.bold      // 700
theme.typography.fontWeight.extrabold // 800

// Line Height
theme.typography.lineHeight.tight   // 1.25
theme.typography.lineHeight.normal  // 1.5
theme.typography.lineHeight.relaxed // 1.75

// Letter Spacing
theme.typography.letterSpacing.tight  // -0.04em
theme.typography.letterSpacing.normal // 0
theme.typography.letterSpacing.wide   // 0.02em
```

### Breakpoints
```typescript
theme.breakpoints.mobile  // 640px
theme.breakpoints.tablet  // 768px
theme.breakpoints.desktop // 1024px
theme.breakpoints.wide    // 1440px
```

### Layout
```typescript
theme.layout.sidebarWidth       // 100px
theme.layout.sidebarWidthMobile // 80px
theme.layout.headerHeight       // 64px
theme.layout.contentMaxWidth    // 1200px
```

## 실제 사용 예제

### 버튼 컴포넌트
```typescript
const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => `${theme.padding.sm} ${theme.padding.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background: ${({ theme, variant }) => 
    variant === 'primary' 
      ? theme.colors.primary.gradient 
      : theme.colors.background.paper};
  
  color: ${({ theme, variant }) => 
    variant === 'primary' 
      ? theme.colors.text.white 
      : theme.colors.text.primary};
  
  box-shadow: ${({ theme }) => theme.shadows.button};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.buttonActive};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
```

### 카드 컴포넌트
```typescript
const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.padding.xl};
  box-shadow: ${({ theme }) => theme.shadows.card};
  
  h3 {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.margin.md};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  }
`;
```

### 레이아웃 컴포넌트
```typescript
const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.padding.container};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.padding.lg};
  }
`;
```

## 다크 모드
테마는 자동으로 라이트/다크 모드를 지원합니다. ThemeProvider를 통해 모드를 전환할 수 있습니다.

```typescript
const { mode, toggleTheme } = useTheme();

// 테마 토글
<button onClick={toggleTheme}>
  {mode === 'light' ? '🌙' : '☀️'}
</button>
```

