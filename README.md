# Portfolio — Astro + GitHub Pages

A personal portfolio/knowledge-hub site built with [Astro](https://astro.build), styled with plain CSS
(no Tailwind, no UI framework), and content-driven via Markdown + JSON so it can grow for years without
a redesign.

**Design concept:** the palette is built around *patina* — the blue-green oxide layer that forms on
copper and bronze — paired with a raw brass secondary accent. Headings use a serif (Fraunces), body text
uses a humanist sans (IBM Plex Sans), and all metadata (dates, tags, status, categories) uses a monospace
(IBM Plex Mono) — so "data" and "prose" are always visually distinct. The faceted line used as a section
divider is a stand-in for a grain boundary under a micrograph.

---

## 1. Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build       # outputs static site to ./dist
npm run preview     # preview the production build locally
```

Requires Node 18.20+ or 20.3+.

---

## 2. Project structure

```
src/
  components/       Reusable UI: Nav, Footer, cards, timeline, skill bars, dividers…
  content/          Your actual content, as Markdown files
    projects/       One .md file per project
    research/       One .md file per publication/presentation/poster/report
    music/          One .md file per video/performance/collaboration
    blog/           One .md file per post
  content.config.ts Schemas for the four collections above (edit if you add new fields)
  data/             Site-wide JSON — NOT content collections, just structured config
    site.json       Name, tagline, bio, email, social links
    skills.json      Skills dashboard (grouped, with a 0–100 level per skill)
    timeline.json    About-page + homepage milestone timeline
    resume.json      Resume-only data: education, skill groups, leadership, achievements, certifications
    gallery.json     Gallery categories + items (captions + optional image path)
  layouts/          BaseLayout.astro — head, fonts, theme script, nav/footer wrapper
  pages/            One file per route (index.astro = Home, about.astro = About, etc.)
  styles/global.css All design tokens (colors, type, spacing) and shared component styles
public/             Static files served as-is: favicon, robots.txt, resume.pdf, images/
```

### Adding content — no page edits required

- **New project:** add a `.md` file to `src/content/projects/`. It appears on `/projects/` and gets its
  own `/projects/<filename>/` page automatically. Set `featured: true` on one project to have it show on
  the homepage.
- **New publication:** add a `.md` file to `src/content/research/`.
- **New music video:** add a `.md` file to `src/content/music/` with a `youtubeId` — it embeds
  automatically on `/music/`.
- **New blog post:** add a `.md` file to `src/content/blog/`.

Every field is defined (and validated) in `src/content.config.ts` — if you want a new field (e.g. a
`coverImage` for projects), add it to the schema there first, then use it in the relevant page/component.

---

## 3. Placeholders to replace before going live

Search the project for `[` bracketed placeholders and the following, all intentionally fake so nothing
false ever gets published by accident:

| What | Where |
|---|---|
| Full name, email, social links | `src/data/site.json` |
| Photo | Add `public/images/profile.jpg`, then swap `<AvatarPlaceholder />` for an `<img>` in `src/pages/index.astro` (instructions are in `src/components/AvatarPlaceholder.astro`) |
| Resume PDF | Add your file at `public/resume.pdf` — the Resume page already links to it |
| Timeline years | `src/data/timeline.json` |
| Education years/details, leadership, achievements, certifications | `src/data/resume.json` |
| Contact form endpoint | `src/pages/contact.astro` — create a free form at [Formspree](https://formspree.io) and replace `YOUR_FORM_ID` |
| GitHub Pages URL/repo name | `astro.config.mjs` (see below) |

---

## 4. Deploying to GitHub Pages

### Step 1 — Configure `astro.config.mjs`

Two scenarios, pick one:

**A. Repo is named `<your-username>.github.io`** (a "user site" — serves from the domain root):
```js
export default defineConfig({
  site: 'https://your-username.github.io',
  // no `base` line at all
});
```

**B. Any other repo name, e.g. `portfolio`** (a "project site" — serves from a sub-path):
```js
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/portfolio',
});
```
The current `astro.config.mjs` in this project is set up for scenario B with placeholder values —
update `your-username` and `your-repo-name` to match your actual GitHub username and repo.

### Step 2 — Push to GitHub and enable Pages

1. Create a new repo on GitHub and push this project to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push again (or re-run the workflow from the **Actions** tab) — `.github/workflows/deploy.yml` is
   already set up to build and deploy on every push to `main`.
5. Your site will be live at the `site` (+ `base`) URL from Step 1, usually within a minute or two.

### Step 3 (optional) — Custom domain later

When you're ready to move off `github.io`:
1. Buy a domain and add a `CNAME` file to `public/` containing just your domain (e.g. `amoghsomething.com`).
2. Point your domain's DNS at GitHub Pages (GitHub's docs: Settings → Pages → Custom domain will walk
   you through the exact A/CNAME records).
3. Update `astro.config.mjs`: set `site` to `https://yourdomain.com` and **delete the `base` line**.

No other structural changes are needed — this is exactly why `base` is centralized in one config file
instead of hardcoded into links throughout the site.

---

## 5. Troubleshooting

- **Blank page / CSS missing on GitHub Pages, but works locally:** almost always a `base` mismatch in
  `astro.config.mjs`. It must exactly match your repo name (with a leading `/`, no trailing `/`).
- **404s on internal links:** this project uses `trailingSlash: 'always'`, so all internal links end in
  `/`. If you hand-write a new link, make sure it does too.
- **GitHub Actions workflow fails on `withastro/action`:** check the Actions tab logs — it's almost
  always a build error (bad frontmatter in a new `.md` file is the most common cause). Run `npm run
  build` locally first; it will show the same error with a clearer stack trace.

---

## 6. Reasonable next upgrades (not included, to keep this lean)

- **SEO:** add `@astrojs/sitemap` for an auto-generated sitemap once the site has a real domain.
- **RSS feed** for the blog via `@astrojs/rss`.
- **Math notation** in blog posts: add `remark-math` + `rehype-katex` if you need LaTeX equations.
- **Site-wide search:** for a site this size, Pagefind (`astro build` + `pagefind --site dist`) is the
  standard low-effort option — it indexes the static output after build, no server required.
- **Comments:** [giscus](https://giscus.app) (GitHub Discussions-backed, free, no backend) drops into the
  blog post template with a few lines.
- **Analytics:** a single `<script>` tag for Plausible or Fathom (privacy-friendly, GH-Pages-compatible)
  in `BaseLayout.astro`.
