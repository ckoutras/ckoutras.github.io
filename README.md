# ckoutras.github.io

Source for [ckoutras.github.io](https://ckoutras.github.io) — Christos Koutras' personal academic site. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Branch model

- **`source`** — Astro source files (where you edit). Default working branch.
- **`master`** — built static HTML output, served by GitHub Pages from the branch root.

You don't touch `master` manually. The `npm run deploy` command builds the site and pushes the build into `master` for you.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321 (hot reload)
npm run build    # static output in ./dist
npm run preview  # serve ./dist locally to check the production build
```

## Deploy

```bash
npm run deploy
```

This runs `astro build` and then `gh-pages -d dist -b master` — it wipes `master`, copies `dist/*` to its root, commits with the message "Deploy site build", and pushes. ~30 seconds end-to-end. The live site updates within ~1 minute after the push (GitHub Pages cache).

Before the first deploy, commit your work on `source` and push it so the source history is preserved on the remote:

```bash
git add -A
git commit -m "..."
git push -u origin source
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

**New news item** → `src/content/news/2026-06-thing.json`.

**New project card** → `src/content/projects/whatever.md` with `era: "delft" | "vida"` and an `order` number.

**Update identifier links** → edit `src/components/IdStrip.astro`.

**Change nav** → edit `src/layouts/Base.astro`.

## Layout

- `src/layouts/Base.astro` — HTML shell, `<head>`, OG/Twitter meta, header, nav, footer
- `src/components/IdStrip.astro` — Scholar · GitHub · ORCID · LinkedIn · CV row
- `src/components/ProjectCard.astro` — project grid card
- `src/components/ThemeToggle.astro` — light/dark mode switch
- `src/pages/index.astro` — homepage
- `src/pages/publications.astro` — publications grouped by year
- `src/pages/teaching.astro` — courses, lectures, supervision
- `src/content/config.ts` — schema for content collections (validated at build)
- `src/content/{projects,publications,news}/` — per-item content files
- `src/styles/style.css` — all styling
- `public/` — static assets served at site root
  - `public/avatar.jpg` — profile photo
  - `public/assets/pdf/Curriculum_Vitae.pdf` — CV (URL preserved from the old site)
  - `public/.nojekyll` — empty file so GitHub Pages skips its Jekyll step
