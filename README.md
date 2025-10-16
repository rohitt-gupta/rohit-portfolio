# Rohit's Portfolio

A modern, performant portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 15.0.1
- **Language**: TypeScript 5.6.3
- **Styling**: Tailwind CSS 3.4.14
- **Animations**: Framer Motion 11.11.10
- **Email**: Resend API
- **Analytics**: Vercel Analytics
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## 📦 Getting Started

### Prerequisites

- Node.js 24.x
- pnpm 10.x

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🛠️ Available Scripts

| Script              | Description                                       |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | Start development server on http://localhost:3000 |
| `pnpm build`        | Create optimized production build                 |
| `pnpm start`        | Start production server                           |
| `pnpm lint`         | Run ESLint checks                                 |
| `pnpm lint:fix`     | Auto-fix ESLint issues                            |
| `pnpm typecheck`    | Run TypeScript type checking                      |
| `pnpm format`       | Format all files with Prettier                    |
| `pnpm format:check` | Check formatting without modifying files          |

## 🔧 Code Quality & Tooling

This project uses a comprehensive setup for maintaining code quality:

### ESLint

- **Config**: Extends `next/core-web-vitals`, `@typescript-eslint/recommended`, and `prettier`
- **Plugins**:
  - `eslint-plugin-simple-import-sort` - Automatic import organization
  - `eslint-plugin-prettier` - Prettier integration
- **Custom Rules**: TypeScript-aware unused vars detection with `_` prefix pattern

### Prettier

- **Semi**: true
- **Single Quote**: false
- **Trailing Comma**: all
- **Print Width**: 100
- **Tab Width**: 2 spaces
- **Arrow Parens**: always
- **End of Line**: lf

### TypeScript Configuration

Strict type checking enabled with additional safety flags:

- ✅ `strict: true`
- ✅ `noFallthroughCasesInSwitch: true` - Prevents accidental switch fallthrough
- ✅ `noImplicitOverride: true` - Requires explicit `override` keyword
- ✅ `noUncheckedIndexedAccess: true` - Safer array/object access

### Pre-commit Hooks (Husky + lint-staged)

Automatically runs on every commit:

- **TypeScript files** (`.ts`, `.tsx`):
  - ESLint auto-fix
  - Prettier formatting
  - Import organization
- **Other files** (`.json`, `.md`, `.css`):
  - Prettier formatting

### Continuous Integration

GitHub Actions workflow runs on every push and PR:

- ✅ Format checking
- ✅ ESLint validation
- ✅ TypeScript type checking
- ✅ Production build verification

## 📝 Code Style Guidelines

- **Imports**: Automatically organized by `simple-import-sort`
  - External packages first
  - Internal imports with `@/` alias
  - Sorted alphabetically within groups
- **Formatting**: Handled by Prettier (runs automatically on commit)
- **Type Safety**: All code must pass strict TypeScript checks
- **No Unused Code**: ESLint enforces no unused variables/imports

## 🏗️ Project Structure

```
├── app/                    # Next.js 15 app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── context/              # React context providers
├── lib/                  # Utilities and data
├── actions/              # Server actions
├── public/               # Static assets
├── .github/
│   └── workflows/        # CI/CD workflows
├── .husky/               # Git hooks
└── .prettierrc           # Prettier config
```

## 🚢 Deployment

The easiest way to deploy is via [Vercel Platform](https://vercel.com/new):

```bash
# Build command
pnpm build

# Output directory
.next
```

## 📄 License

This project is private and proprietary.
