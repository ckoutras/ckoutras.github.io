# ckoutras.github.io

Source for [ckoutras.github.io](https://ckoutras.github.io) — Christos Koutras' personal academic site. Built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in ./dist
```

## Adding content

**New publication** → `src/content/publications/2026-conf-shortname.md`:

```markdown
---
title: "My new paper"
authors: "**Christos Koutras**, Coauthor"
venue: "ACM SIGMOD 2026, Bangalore, India"
venueShort: "SIGMOD 2026"
year: 2026
location: "Bangalore, India"
url: "https://..."        # optional
note: "To appear"         # optional
---
```

Sorted into the correct year on the Publications page automatically.

**New news item** → `src/content/news/2026-06-thing.json`. Sorted newest-first by `date`.

**New project card** → `src/content/projects/whatever.md`. Set `era: "delft" | "vida"` and an `order` number.

**Update identifier links** (Email, Scholar, GitHub, ORCID, LinkedIn, CV) → edit `src/components/IdStrip.astro`.

**Change nav** → edit `src/layouts/Base.astro`.

## Deploy

Pushes to `master` trigger `.github/workflows/deploy.yml`, which builds the site and publishes it via GitHub Pages. No need to commit `dist/` — the workflow handles it.

**One-time setup** (already done if the site is live):

1. Repo → Settings → Pages → Source: **GitHub Actions**
2. Push to `master`; Pages will serve whatever the workflow uploads.

## Layout

- `src/layouts/Base.astro` — HTML shell, `<head>`, OG/Twitter meta, header, nav, footer
- `src/components/IdStrip.astro` — Email · Scholar · GitHub · ORCID · LinkedIn · CV row
- `src/components/ProjectCard.astro` — project grid card
- `src/pages/index.astro` — homepage (hero, projects, news, service, contact)
- `src/pages/publications.astro` — publications grouped by year
- `src/content/config.ts` — schema for content collections (validated at build)
- `src/content/{projects,publications,news}/` — per-item content files
- `src/styles/style.css` — all styling
- `public/` — static assets served at site root
  - `public/avatar.jpg` — profile photo
  - `public/assets/pdf/Curriculum_Vitae.pdf` — CV (URL preserved from the old site so external links still work)
