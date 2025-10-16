### You are preparing a safe, comprehensive codebase cleanup and modernization for this repository.

### Objectives

- Modernize tooling (linting, formatting, typechecking) and enforce consistent conventions
- Remove dead code, unused exports/dependencies, and normalize imports/paths
- Improve TypeScript strictness where safe, without breaking runtime behavior
- Align Tailwind/Vite/TS settings to current best practices for this codebase
- Produce a concise, auditable diff with clear follow-ups

### Constraints

- Use pnpm (not npm/yarn)
- Do not push; do not publish; no interactive prompts
- Prefer minimally invasive, iterative changes that keep the app building and running
- Avoid breaking runtime behavior; if a change is risky, propose it as a follow-up instead
- Maintain repository conventions and file structure unless a clear benefit is demonstrated

### Preparation

1. Detect environment

- Print Node version: node -v
- Print pnpm version: pnpm -v

2. Install deps (no lockfile re-generation beyond needed)

- Run: pnpm install --frozen-lockfile

3. Baseline checks

- Run: pnpm build
- If build fails, run: pnpm lint && pnpm -s tsc -p tsconfig.json --noEmit
- Record failures to guide targeted fixes

### Audit Phase (report only; no changes yet)

1. Dependency health

- Run: pnpm dlx depcheck --skip-missing
- Run: pnpm dlx knip --report || true
- Run: pnpm dlx ts-prune || true
- Output: list unused deps/devDeps, potentially unused files/exports

2. TypeScript strictness delta (dry-run)

- Inspect tsconfig.json; note potential safe flags to enable: strict, noUncheckedIndexedAccess, noFallthroughCasesInSwitch, noImplicitOverride
- Do not change tsconfig yet; propose changes with rationale

3. Tailwind/Vite alignment

- Detect Tailwind version and plugins in package.json
- Note mismatch if @tailwindcss/vite (v4 plugin) is installed while tailwindcss is v3.x
- Propose either: (A) keep Tailwind v3 and remove @tailwindcss/vite, or (B) upgrade to Tailwind v4 with appropriate config changes

4. Linting/Formatting inventory

- Check for ESLint config and Prettier presence
- Propose adding Prettier if missing and aligning ESLint rules (TypeScript + React + import sorting)

### Plan Phase (produce plan section in output)

- Summarize the minimally invasive set of changes to implement now
- Summarize riskier changes as follow-ups

### Implementation (safe set)

0. Scripts

- Ensure scripts exist (add if missing, do not remove existing):
  - "typecheck": "tsc -p tsconfig.json --noEmit"
  - "lint": "eslint \"src/\*_/_.{ts,tsx,js}\""
  - "lint:fix": "eslint --fix \"src/\*_/_.{ts,tsx,js}\""
  - "format": "prettier --write ."
  - "format:check": "prettier --check ."

1. ESLint + Prettier setup

- If Prettier not present, add: prettier, eslint-config-prettier, eslint-plugin-prettier
- Add import sorting: eslint-plugin-simple-import-sort
- Configure ESLint to:
  - Use @typescript-eslint recommended
  - Enable simple-import-sort for imports/exports
  - Turn on no-unused-vars (ts-aware) with ignoreRestSiblings and argsIgnorePattern
  - Defer opinionated style to Prettier (eslint-config-prettier)
- Add a root .prettierrc with sane defaults (2-space tabs, semi: true, singleQuote: false, trailingComma: all, printWidth: 100)

2. Automated fixes (non-breaking)

- Run: pnpm lint:fix || true
- Run: pnpm format
- Organize imports repo-wide using ESLint simple-import-sort

3. Dependency hygiene (conservative)

- Run: pnpm dedupe
- If depcheck/knip/ts-prune confidently mark a dependency as unused and no code references exist, remove it
- Do not perform major upgrades; allow patch/minor updates only if build remains green

4. TS improvements (minimal-risk)

- If build is green, enable a subset of stricter flags that historically do not cause widespread breakage:
  - noFallthroughCasesInSwitch: true
  - noImplicitOverride: true
- If flags introduce errors > 10 locations, revert this step and add as follow-up instead

5. Tailwind/Vite alignment (choose safest path)

- If tailwindcss is v3 and @tailwindcss/vite is installed, remove @tailwindcss/vite from deps and Vite config references
- Verify: pnpm build
- If build fails, revert and defer to follow-ups

6. Repo-wide consistency

- Ensure all imports use path alias `@/*` where configured in tsconfig
- Normalize file extensions: .tsx for React components, .ts for non-React modules
- Ensure CSS imports point to `src/style/*` per current structure; remove stale paths

### Verification

- Run: pnpm typecheck
- Run: pnpm lint
- Run: pnpm build
- If any fail, perform minimal corrective edits. Stop if non-trivial refactor required and document follow-ups.

### Deliverables (output)

- A concise summary containing:
  - What was changed (tooling, configs, scripts)
  - Deps removed/added with versions
  - Notable code edits (imports sorted, files renamed)
  - Strict flags enabled (if any) and why
  - Tailwind/Vite alignment decision
  - Remaining follow-ups with clear next steps

### Follow-ups (propose, do not implement now)

- Adopt stricter TS flags (strict, noUncheckedIndexedAccess) with a staged fix plan
- Consider upgrading Tailwind to v4 end-to-end or standardizing on v3 and removing v4-only plugins
- Introduce CI tasks for pnpm typecheck, lint, and build
- Add commit hooks (lint-staged + husky) for formatting/lint pre-commit

### Constraints Recap

- Use pnpm only
- No pushes, no publishing, no interactive prompts
- Keep runtime behavior stable; defer risky changes

### Final Note

If an operation would require non-trivial refactors or introduces breaking behavior, stop and document precisely what is needed and why, including file paths and example diffs to guide a future change.
