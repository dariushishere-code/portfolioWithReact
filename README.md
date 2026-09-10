# Alireza Ebrahimi — Portfolio Site

A modern, high-performance portfolio website built with React, TypeScript, and WebGL. Features interactive 3D elements, motion design, and a photography gallery.

![Status](https://img.shields.io/badge/status-available-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Vite](https://img.shields.io/badge/Vite-6.3-purple)

## ✦ Features

- **WebGL Background** — Interactive Three.js scene with hexagonal geometry
- **Motion Design** — Framer Motion animations throughout
- **Photography Gallery** — Categorized photo grid with filters (Street, Nature, Structure, People, Still)
- **Responsive Design** — Mobile-first layout with Tailwind CSS
- **Custom Cursor & Noise Overlay** — Polished UI chrome effects
- **Tech Marquee** — Animated skill showcase
- **Dark Theme** — Black / gold / ivory color palette

## ✦ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, Vite 6 |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS 4, class-variance-authority |
| **3D / WebGL** | Three.js, @react-three/fiber, @react-three/drei |
| **Animation** | Framer Motion, canvas-confetti |
| **UI Components** | Base UI, shadcn, Lucide icons |
| **Routing** | React Router v6 |
| **Deployment** | Netlify (SPA config) |

## ✦ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
git clone <your-repo-url>
cd <project-directory>
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` (Vite default)

### Build for Production

```bash
npm run build
```

Output lands in `dist/` — ready to deploy.

### Type Check

```bash
npm run typecheck
```

## ✦ Project Structure

```
├── public/                 # Static assets (photos, favicon)
├── src/
│   ├── components/         # React components
│   │   ├── ui/             # Reusable UI primitives
│   │   ├── Chrome.tsx      # Custom cursor, noise overlay
│   │   ├── Scene.tsx       # Three.js background
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Marquee.tsx     # Animated tech marquee
│   │   ├── About.tsx       # About section
│   │   ├── Projects.tsx    # Project showcase
│   │   ├── Gallery.tsx     # Photo gallery
│   │   ├── Resume.tsx      # Resume/CV section
│   │   └── Contact.tsx     # Contact section
│   ├── data/
│   │   └── content.ts      # All personal content (edit here)
│   ├── lib/
│   │   ├── hooks.ts        # Custom React hooks
│   │   └── utils.ts        # Utility functions (cn, etc.)
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config
└── netlify.toml            # Netlify deployment settings
```

## ✦ Editing Content

All personal information lives in `src/data/content.ts`. Edit freely:

| Section | Export |
|---------|--------|
| Name, email, socials, resume PDF | `identity`, `socials` |
| Navigation links | `navLinks` |
| Tech marquee items | `marqueeItems` |
| About text & stats | `about` |
| Projects (title, tags, GitHub links) | `projects` |
| Resume entries, skills, toolbox | `resume` |
| Photography gallery | `photos` |

### Adding Your Photos

1. Drop image files into `public/photos/`
2. Update `photos` array in `src/data/content.ts`:

```ts
{
  src: "/photos/my-image.jpg",
  title: "My Photo",
  meta: "Location · Film stock",
  category: "street", // street | nature | structure | people | still
  ratio: "aspect-[3/4]"
}
```

## ✦ Deployment

### Netlify (Recommended)

Git-based deploy:

1. Push to GitHub/GitLab
2. In Netlify: **Add new site → Import an existing project**
3. Select repo — build settings auto-fill from `netlify.toml`
4. Deploy

Manual deploy:

```bash
npm run build
# Drag dist/ folder to https://app.netlify.com/drop
```

### Custom Domain

Site settings → Domain management → add your domain. HTTPS is automatic.

## ✦ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run typecheck` | Run TypeScript type checking |

## ✦ Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0b0e14` | Background |
| `--bone` | `#e9e4d6` | Primary text |
| `--gold-500` | `#e4ac52` | Accent, highlights |
| `--stroke` | Outline text effect |

## ✦ License

MIT — feel free to use this as a starting point for your own portfolio.

---

**Built by Alireza Ebrahimi** · [alirezaebrahimi.tech](https://alirezaebrahimi.tech)
