# Irumoa-client

FE repository for Irumoa project

This is a [Next.js](https://nextjs.org) project with Emotion CSS for styling and a custom theme system.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Emotion CSS
- **Package Manager**: pnpm

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Theme System

The project includes a custom theme system with light and dark modes. Use the `useTheme` hook to access theme values and toggle between modes:

```tsx
import { useTheme } from "@/src/components/provider/ThemeProvider";

const { theme, mode, toggleTheme } = useTheme();
```
