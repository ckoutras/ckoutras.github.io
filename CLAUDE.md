# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Source for `ckoutras.github.io` (Christos Koutras' academic site), built with **Astro** and deployed to GitHub Pages by a GitHub Actions workflow on every push to `master`. The deployed HTML is **not** committed — `master` contains the source files, and `.github/workflows/deploy.yml` builds and publishes via the official `actions/deploy-pages` artifact flow. (Repo Settings → Pages → Source must be **GitHub Actions**, set once.)

This replaced the previous al-folio Jekyll setup, where the rendered HTML was committed directly to `master` and edits meant hand-editing the rendered output. None of that workflow applies anymore. If you find `Gemfile`, `bin/deploy`, or pre-rendered `index.html` at the root, those are stale and should be removed.

## Common commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → ./dist
npm run preview    # serve ./dist locally
```

The site does not need Node at runtime — output is plain static HTML/CSS.

## High-level architecture

- **One layout**, [src/layouts/Base.astro](src/layouts/Base.astro): owns `<head>`, OG/Twitter meta tags, the site header (brand + nav), and the footer. Every page wraps its content here. Change nav or meta in one place.
- **Two shared components**: [src/components/IdStrip.astro](src/components/IdStrip.astro) (the identifier pill row — email, Scholar, GitHub, ORCID, LinkedIn, CV) and [src/components/ProjectCard.astro](src/components/ProjectCard.astro) (one card in the projects grid).
- **Two pages**: [src/pages/index.astro](src/pages/index.astro) is the research-lab landing (hero + projects + news + service + contact); [src/pages/publications.astro](src/pages/publications.astro) is the full publication list grouped by year.
- **Three content collections** under [src/content/](src/content/), declared in [src/content/config.ts](src/content/config.ts):
  - `projects/*.md` — one file per project card. `era: "delft" | "vida"` controls which section it renders under on the homepage; `order` controls within-section sort.
  - `publications/*.md` — one file per paper. Pages auto-group by `year` (desc).
  - `news/*.json` — one file per news entry. Sorted by `date` desc.
  Schemas are zod-validated at build time, so a typo in frontmatter fails CI rather than shipping broken.
- **All styling** lives in [src/styles/style.css](src/styles/style.css) — CSS custom properties for theming, `prefers-color-scheme: dark` for dark mode. No component-scoped styles, no Tailwind.

## Cross-cutting things to know

- **The CV URL `/assets/pdf/Curriculum_Vitae.pdf` is preserved deliberately** — it matches the path on the old al-folio site so external links (emails, social, prior shares) keep working. Don't relocate it.
- **The avatar lives at `/avatar.jpg`** (from `public/avatar.jpg`). The homepage hero references that path.
- **OG image** is referenced as `/og.png` in [Base.astro](src/layouts/Base.astro) but `public/og.png` does not exist yet. Add a 1200×630 image to fix social previews.
- **Deploy trigger** is `push: branches: [master]` in `.github/workflows/deploy.yml`. Build failures are reported in the Actions tab; if a push doesn't update the site, look there first.
