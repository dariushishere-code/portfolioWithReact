/* ============================================================
   ALL PERSONAL CONTENT LIVES HERE — edit freely.
   ============================================================ */

export const identity = {
  name: "Alireza Ebrahimi",
  firstName: "ALIREZA",
  lastName: "EBRAHIMI",
  role: "Front-End Developer",
  tagline: "Building interfaces where type does the talking.",
  taglineRest: "Precision, contrast, and deliberate space.",
  status: "Available for work · 2026",
  email: "contact@alirezaebrahimi.tech",
  site: "alirezaebrahimi.tech",
  resumeUrl: "https://alirezaebrahimi.tech/resume/AlirezaEbrahimi-Resume.pdf",
  location: "Remote · Worldwide",
  katakana: "アリレザ・エブラヒミ",
  katakanaRole: "フロントエンド開発者",
};

export const socials = [
  { label: "X / Twitter", handle: "@alirezaebdev", url: "https://x.com/alirezaebdev", kind: "x" as const },
  {
    label: "LinkedIn",
    handle: "in/alirezaebrahimi-dev",
    url: "https://www.linkedin.com/in/alirezaebrahimi-dev/",
    kind: "linkedin" as const,
  },
  {
    label: "GitHub",
    handle: "dariushishere-code",
    url: "https://github.com/dariushishere-code",
    kind: "github" as const,
  },
];

export const navLinks = [
  { id: "about", num: "01", label: "About" },
  { id: "work", num: "02", label: "Work" },
  { id: "gallery", num: "03", label: "Gallery" },
  { id: "resume", num: "04", label: "Resume" },
  { id: "contact", num: "05", label: "Contact" },
];

export const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "WebGL",
  "Three.js",
  "Tailwind CSS",
  "Framer Motion",
  "Design Systems",
  "Responsive Design",
  "Web Performance",
];

export const about = {
  headingA: "Making digital",
  headingB: "feel intentional",
  paragraphs: [
    "Dynamic front-end developer with a passion for creating seamless and engaging user experiences. Proficient in HTML, CSS, JavaScript, and modern frameworks like React — I leverage strong problem-solving skills to transform complex design concepts into responsive, interactive web applications.",
    "I believe that continuous learning, strong teamwork, and professional dedication are essential for building successful software products. Lately that means pushing further into WebGL, shader-driven motion and interfaces that feel engineered, not decorated.",
    "Let's build the future together.",
  ],
  stats: [
    { value: 1, pad: "01", label: "Years experience" },
    { value: 2, pad: "02", label: "Shipped projects" },
    { value: 5, pad: "05", label: "Design systems" },
  ],
  focus: ["HTML", "CSS", "JavaScript", "React / Next.js", "Responsive Design", "Performance"],
  nowLine: "Currently exploring — WebGL scenes, creative shaders & motion systems.",
};

/* ---------- projects ---------- */

export type ProjectArt = "aureum" | "portfolio" | "service" | "spotify";

export interface Project {
  index: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  art: ProjectArt;
}

export const projects: Project[] = [
  {
    index: "01",
    year: "2025",
    title: "Aureum — Gold Marketplace",
    description:
      "A Next.js + Tailwind CSS storefront concept for a gold marketplace — bars, coins, jewelry, antique pieces — wrapped in a black / gold / ivory theme.",
    tags: ["Next.js", "Tailwind CSS", "Design System"],
    url: "https://github.com/dariushishere-code/Goldmarketplace",
    art: "aureum",
  },
  {
    index: "02",
    year: "2025",
    title: "Simple Portfolio",
    description:
      "A statically-generated Next.js site: fast, SEO-friendly, deployable to Netlify with zero server config — plus a working blog you publish to from a browser-based admin panel, no code editor required.",
    tags: ["Next.js", "React", "Browser-based CMS"],
    url: "https://github.com/dariushishere-code/simpleportfolio",
    art: "portfolio",
  },
  {
    index: "03",
    year: "2026",
    title: "Service UI",
    description:
      "A pixel-close recreation of a light-themed salon / barbershop Services + Order interface, built with nothing but HTML and CSS.",
    tags: ["HTML", "CSS", "Service Design"],
    url: "https://github.com/dariushishere-code/services-ui",
    art: "service",
  },
  {
    index: "04",
    year: "2025",
    title: "Spotify Search App",
    description:
      "A full-stack Spotify search application — query the catalogue, browse tracks and artists through a clean, fast interface backed by the Spotify Web API.",
    tags: ["JavaScript", "Node.js", "Express", "Spotify Web API"],
    url: "https://github.com/dariushishere-code/spotify-search-app",
    art: "spotify",
  },
];

/* ---------- gallery ----------
   To use your own photographs:
   1. drop the files into  /public/photos/  (e.g. /public/photos/my-frame.jpg)
   2. replace the `src` below with "/photos/my-frame.jpg"
   Anything with a valid image URL works — local or hosted.
---------------------------------- */

export type GalleryCategory = "street" | "nature" | "structure" | "people" | "still";

export interface Photo {
  src: string;
  title: string;
  meta: string;
  category: GalleryCategory;
  ratio: string; // tailwind aspect class
}

export const galleryFilters: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "street", label: "Street" },
  { id: "nature", label: "Nature" },
  { id: "structure", label: "Structure" },
  { id: "people", label: "People" },
  { id: "still", label: "Still" },
];

export const photos: Photo[] = [
  {
    src: "https://image.qwenlm.ai/generated-images/da7a9e4e-ad39-4b07-9b84-4211daa7fe99/_result.png",
    title: "Sodium Rain",
    meta: "Night alley · Portra 800",
    category: "street",
    ratio: "aspect-[3/4]",
  },
  {
    src: "https://image.qwenlm.ai/generated-images/f88176f4-cff2-471b-adbd-409ff03f4eb1/_result.png",
    title: "Quiet Pines",
    meta: "Morning fog · Pro 400H",
    category: "nature",
    ratio: "aspect-[4/3]",
  },
  {
    src: "https://image.qwenlm.ai/generated-images/a9817c98-8a61-490f-991d-a43b1e91cffd/_result.png",
    title: "Concrete / Shadow",
    meta: "Facade study · Tri-X",
    category: "structure",
    ratio: "aspect-[3/4]",
  },
  {
    src: "https://image.qwenlm.ai/generated-images/7091317d-127e-41bb-80b9-661452d7c327/_result.png",
    title: "North Light",
    meta: "Portrait · Cinestill 800T",
    category: "people",
    ratio: "aspect-[3/4]",
  },
  {
    src: "https://image.qwenlm.ai/generated-images/e22cb533-5237-4e7a-ab2e-0dda23495b1a/_result.png",
    title: "The Long Pier",
    meta: "Dusk · long exposure",
    category: "nature",
    ratio: "aspect-[4/3]",
  },
  {
    src: "https://image.qwenlm.ai/generated-images/53ebbbef-dfa3-4bdc-abdc-2d62f9e2b3a7/_result.png",
    title: "Analog Afternoon",
    meta: "Still life · HP5+",
    category: "still",
    ratio: "aspect-square",
  },
];

/* ---------- resume ---------- */

export const resume = {
  intro:
    "Front-end developer focused on the intersection of typography, motion and engineering. I ship accessible, fast interfaces and treat every pixel as a decision.",
  experience: [
    {
      period: "2025 — Present",
      role: "Front-End Developer",
      org: "Freelance · Remote",
      points: [
        "Design and ship responsive marketing sites, storefronts and interactive interfaces end-to-end.",
        "Translate design systems into reusable, documented component libraries with React & Next.js.",
        "Chase performance budgets: static generation, image pipelines and Core Web Vitals in the green.",
      ],
    },
    {
      period: "2024 — 2025",
      role: "UI Engineer",
      org: "Contract projects",
      points: [
        "Built pixel-close interfaces from Figma specs across salon booking, e-commerce and music tooling.",
        "Integrated REST APIs (incl. Spotify Web API) with Node.js / Express backends.",
        "Introduced browser-based admin tooling so non-technical owners can publish without code.",
      ],
    },
  ],
  education: [
    {
      period: "Ongoing",
      title: "Self-directed front-end engineering",
      detail: "React ecosystem, design systems, WebGL & creative code — continuous, project-driven learning.",
    },
  ],
  coreSkills: [
    { name: "HTML / Semantic markup", level: 95 },
    { name: "CSS / Modern layout", level: 92 },
    { name: "JavaScript (ES2023)", level: 88 },
    { name: "React / Next.js", level: 85 },
    { name: "TypeScript", level: 78 },
  ],
  toolbox: [
    "Tailwind CSS",
    "Three.js / WebGL",
    "Framer Motion",
    "Node.js / Express",
    "REST APIs",
    "Git / GitHub",
    "Figma",
    "Netlify",
    "SEO / A11y",
  ],
  languages: [
    { name: "Persian", level: "Native" },
    { name: "English", level: "Professional" },
  ],
};
