/**
 * Technology → its home on the web, keyed on the exact label used in
 * `lib/stack.ts`, `lib/experience.ts` and `lib/projects.ts`.
 *
 * Kept apart from `components/brand-icon.tsx` on purpose: that file is the marks,
 * this one is where they point. A label missing here still renders, just without
 * the link, so adding a technology never breaks the page.
 */
export const TECH_LINKS: Record<string, string> = {
  // Languages and runtimes
  TypeScript: "https://www.typescriptlang.org",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  Python: "https://www.python.org",
  Gleam: "https://gleam.run",
  "Java Spring Boot": "https://spring.io/projects/spring-boot",
  "Node.js": "https://nodejs.org",

  // Web frameworks and UI
  React: "https://react.dev",
  "React 19": "https://react.dev",
  "Next.js": "https://nextjs.org",
  Vue: "https://vuejs.org",
  "Vue 3": "https://vuejs.org",
  Nuxt: "https://nuxt.com",
  Remix: "https://remix.run",
  Inertia: "https://inertiajs.com",
  Laravel: "https://laravel.com",
  "Reka UI": "https://reka-ui.com",
  "React Aria": "https://react-aria.adobe.com",
  "Material UI": "https://mui.com",
  Tailwind: "https://tailwindcss.com",
  "Tailwind CSS": "https://tailwindcss.com",
  "vanilla-extract": "https://vanilla-extract.style",
  "Redux Toolkit": "https://redux-toolkit.js.org",
  Zustand: "https://zustand.docs.pmnd.rs",
  "TanStack Query": "https://tanstack.com/query",
  Motion: "https://motion.dev",
  "Framer Motion": "https://motion.dev",

  // Mobile
  "React Native": "https://reactnative.dev",
  Expo: "https://expo.dev",
  "Expo Router": "https://docs.expo.dev/router/introduction/",
  NativeWind: "https://www.nativewind.dev",

  // Editors
  Tiptap: "https://tiptap.dev",
  ProseMirror: "https://prosemirror.net",
  "prosemirror-collab": "https://prosemirror.net/docs/ref/#collab",
  CodeMirror: "https://codemirror.net",
  Redraw: "https://redraw.hexdocs.pm",

  // Data and backend services
  PostgreSQL: "https://www.postgresql.org",
  MySQL: "https://www.mysql.com",
  Prisma: "https://www.prisma.io",
  Drizzle: "https://orm.drizzle.team",
  "Drizzle ORM": "https://orm.drizzle.team",
  "Neon Postgres": "https://neon.com",
  Supabase: "https://supabase.com",
  Appwrite: "https://appwrite.io",
  DynamoDB: "https://aws.amazon.com/dynamodb/",
  tRPC: "https://trpc.io",
  Resend: "https://resend.com",
  Stripe: "https://stripe.com",
  Pusher: "https://pusher.com",
  "Socket.io": "https://socket.io",
  WebSockets: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  "Instantly API": "https://instantly.ai",

  // AI
  Claude: "https://claude.com",
  "Vercel AI SDK": "https://ai-sdk.dev",
  Mastra: "https://mastra.ai",
  Inngest: "https://www.inngest.com",

  // Build, infra and tooling
  Vite: "https://vite.dev",
  Docker: "https://www.docker.com",
  Vercel: "https://vercel.com",
  AWS: "https://aws.amazon.com",
  "AWS CDK": "https://aws.amazon.com/cdk/",
  "Cloudflare Workers": "https://workers.cloudflare.com",
  Bazel: "https://bazel.build",
  Jenkins: "https://www.jenkins.io",
  Git: "https://git-scm.com",
  GitLab: "https://about.gitlab.com",
  "GitHub Actions": "https://github.com/features/actions",
  Playwright: "https://playwright.dev",
  Figma: "https://www.figma.com",
  FFmpeg: "https://ffmpeg.org",
};
