# Deploying to Netlify ✦

Everything is pre-configured. `netlify.toml` defines the build command (`npm run build`),
the publish directory (`dist`) and the SPA redirect.

## Option A — Git (recommended)

1. Push this project to GitHub / GitLab / Bitbucket.
2. In Netlify: **Add new site → Import an existing project**.
3. Pick the repo. Build settings auto-fill from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy site** — done. Every push redeploys automatically.

## Option B — drag & drop

```bash
npm install
npm run build
```

Then drag the generated `dist/` folder onto https://app.netlify.com/drop.

## Custom domain

Site settings → Domain management → add `alirezaebrahimi.tech` (or any domain)
and point your DNS at the Netlify load balancer it shows you. HTTPS is automatic.

---

## Editing your content

| What | Where |
| --- | --- |
| Name, tagline, email, socials, resume PDF link | `src/data/content.ts` → `identity` / `socials` |
| Projects (title, tags, GitHub links) | `src/data/content.ts` → `projects` |
| Resume entries, skills, toolbox | `src/data/content.ts` → `resume` |
| **Your photographs** | drop files into `public/photos/`, then list them in `src/data/content.ts` → `photos` (use `"/photos/your-file.jpg"` as `src`) |

Rebuild (`npm run build`) and redeploy after edits.
