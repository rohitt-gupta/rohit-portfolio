/** Companies and education. Shown on /work and /about. */

export type Position = {
  title: string;
  period: string;
  /** Opening line, before the bullets. */
  summary?: string;
  /** What actually got done. Kept to the specifics — numbers, systems, names. */
  highlights?: string[];
};

export type Company = {
  company: string;
  /** One line on what the company does. Worth setting for names a reader won't know. */
  blurb?: string;
  /** Full-time, Self-employed, Contract… */
  employment?: string;
  location?: string;
  /** Remote, Hybrid, On-site. */
  mode?: string;
  /**
   * Spanning period for the company header. Only set when a company holds more
   * than one position, where it's the total and each position carries its own.
   */
  period?: string;
  /** Newest first. Several entries means promotions within one company. */
  positions: Position[];
};

/**
 * Current roles first, then past ones by the date they ended. Two things run at
 * once on purpose — the studio has been alongside the day job since 2024.
 */
export const EXPERIENCE: Company[] = [
  {
    company: "fynk",
    employment: "Full-time",
    location: "Vienna, Austria",
    mode: "Hybrid",
    positions: [{ title: "Software Engineer (Editor)", period: "Jul 2026 — Present" }],
  },
  {
    company: "Launchbox Studio",
    employment: "Self-employed",
    mode: "Remote",
    positions: [{ title: "Founder", period: "Apr 2024 — Present" }],
  },
  {
    company: "Steerlab",
    blurb: "AI that automates RFP and vendor-questionnaire responses for PreSales teams.",
    employment: "Part-time",
    location: "Paris, France",
    mode: "Remote",
    positions: [{ title: "Product Engineer", period: "Jul 2025 — Jul 2026" }],
  },
  {
    company: "Frontier AI Lab",
    employment: "Full-time",
    mode: "Remote",
    positions: [{ title: "Senior Software Engineer", period: "Oct 2025 — Jun 2026" }],
  },
  {
    company: "AI Acquisition",
    blurb: "AI agents and automation systems for founders and service businesses.",
    employment: "Full-time",
    location: "Dubai, UAE",
    mode: "Remote",
    positions: [{ title: "Product Engineer", period: "Aug 2025 — Dec 2025" }],
  },
  {
    company: "Alpine",
    location: "New York, United States",
    mode: "Remote",
    positions: [{ title: "Product Engineer", period: "Nov 2024 — Jul 2025" }],
  },
  {
    company: "mroads",
    employment: "Full-time",
    location: "Hyderabad, India",
    mode: "Remote",
    period: "Apr 2022 — Nov 2024",
    positions: [
      {
        title: "Software Engineer",
        period: "Apr 2023 — Nov 2024",
        summary:
          "Worked with the Panna team on end-to-end candidate and employee management — React on the front, Java Spring Boot behind it.",
        highlights: [
          "Built a logging and monitoring microservice covering both frontend and backend, lifting development velocity 40%, with log access served off an EC2 instance.",
          "Shipped a unified authentication microservice that cut authentication endpoints by over 50%. Packaged it to npm for drop-in frontend integration, which made deployments 30% faster.",
          "Migrated the product from Angular to React.",
          "Built a suite of reusable components — promise-returning modals and custom react-hook-form pieces that handle forms without manual registration — worth a 25% gain in development speed.",
          "Cut application response times 30% by consolidating global components and stripping out dead code.",
          "Led the agile rebuild of the Dashboard module with backend, QA and UX/UI, improving delivery speed 20%.",
          "Set up a Jenkins CI/CD pipeline deploying Spring Boot and React apps to AWS Amplify.",
        ],
      },
      {
        title: "Associate Software Engineer",
        period: "Apr 2022 — Apr 2023",
        summary:
          "Built and unit-tested product features across Next.js, TypeScript, redux-toolkit and AWS, with Framer Motion, Material UI and Tailwind CSS on the surface.",
        highlights: [
          "Led the team migrating four products from legacy Angular to modular React.",
          "Engineered and deployed the unified authentication microservice on Turbopack and React, halving authentication endpoints and raising deployment rate 30%.",
          "Built the reusable React component suite and custom react-hook-form handling — a 25% improvement in development efficiency.",
          "Drove the agile redevelopment of the Dashboard module with backend, QA and UX/UI, improving delivery speed 20%.",
          "Resolved UI discrepancies against Figma in Tailwind CSS, holding the interfaces to the design spec exactly.",
          "Handled a dataset of over a million entries, adding an edit-form flow so users could correct previously submitted information.",
        ],
      },
    ],
  },
];

export type Education = {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string;
};

export const EDUCATION: Education[] = [
  {
    title: "B.Tech, Electronics Engineering",
    company: "CTAE",
    location: "Udaipur",
    period: "2018 — 2022",
    description:
      "Studied electronics, wrote a lot of code on the side, and picked up several off-campus software offers before graduating.",
  },
];
