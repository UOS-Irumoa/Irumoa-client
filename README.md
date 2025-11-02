# Irumoa-client

FE repository for Irumoa project

This is a [Next.js](https://nextjs.org) project with Emotion CSS for styling and a custom theme system.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Emotion CSS
- **Package Manager**: pnpm

## Features

- ⚡ Next.js 16 with App Router
- 🎨 Emotion CSS for styled components
- 🌓 Dark mode support with theme persistence
- 📱 Fully responsive design
- 🔒 Type-safe with TypeScript

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

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── src/
│   ├── components/
│   │   └── provider/    # Context providers
│   │       ├── Providers.tsx
│   │       └── ThemeProvider.tsx
│   └── styles/
│       └── theme.ts     # Theme configuration
└── public/              # Static assets
```

## Theme System

The project includes a custom theme system with light and dark modes. Use the `useTheme` hook to access theme values and toggle between modes:

```tsx
import { useTheme } from '@/src/components/provider/ThemeProvider';

const { theme, mode, toggleTheme } = useTheme();
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Emotion Documentation](https://emotion.sh/docs/introduction)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
