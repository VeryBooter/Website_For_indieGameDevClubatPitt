# Indie Game Dev Club at Pitt

A reviewable website foundation based on the supplied 18-page sketch and style atlas entry 16. The Chinese negative-space influence is visual: paper, ink, restrained vermilion, and an open editorial composition. The subject and language remain an English-language game development club at Pitt.

## Run locally

Requires Node.js 20.19+ (Node 22 recommended).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. For production verification:

```sh
npm run check
npm run build
npm run preview
```

The production build prerenders the complete page into HTML. Navigation, section content, and native disclosure controls remain usable without JavaScript. JavaScript adds the mobile menu, intro, and optional reveals. No backend or collection of email addresses is included.

## Edit content

`src/data/club.ts` is the source of truth for copy, projects, people, events, sponsors, sponsorship levels, joining destinations, history, gallery, and related organizations. Empty collections are intentional; no real projects, identities, dates, sponsor commitments, or club contact links were supplied.

- Replace draft copy, then set `club.copyStatus` to `approved` after club review. Until then, the relevant copy is labeled in the interface.
- Set a destination's `url` only when verified. `null` renders a descriptive pending state, never a dead button. Use HTTPS URLs (or an approved `mailto:` for contact).
- Project records support art, contributor names, status, technologies, details, documentation, and GitHub destinations. The first project is featured in the asymmetric showcase. Native detail disclosures work immediately; `detailUrl` supports future standalone pages.
- Add people with a group of `member`, `officer`, or `advisor`; photos are optional.
- Event dates use `YYYY-MM-DD`; provide human-readable time including the time zone and location. Calendar remains a destination rather than a simulated working integration.
- Only sponsorship levels with `approved: true` render. Do not add invented amounts or benefits.
- Store approved image assets in `public/assets/`. Use relative paths like `./assets/photo.jpg` for deployment under a GitHub project path.

The homepage illustration is generated concept art, explicitly labeled as such; it is not a real club project or evidence of club work. Its built-in imagegen provenance and exact prompt are in `public/assets/ARTWORK.md`.

## Code layout

- `src/components/`: header, footer, reusable labels, isolated opening animation.
- `src/sections/`: hero, About, Projects, People, Events, Sponsorship, Join.
- `src/data/club.ts`: typed editorial data and pending states.
- `src/styles.css`: responsive tokens, layout, and animation.
- `scripts/prerender.tsx`: static HTML generation after the Vite build.
- `scripts/check.tsx`: content and anchor integrity checks, including populated content fixtures.

The sections can be moved into routes later without replacing their data structures. Keep anchor targets or redirects when doing so.

## Animation and accessibility

The intro uses a developer figure with articulated arms and a folded game-development plan. The panels expand outwards and dissolve into the underlying hero over approximately 2.4 seconds. It does not intercept pointer input, lock scrolling, or trap focus. A skip control and Escape end it immediately. The intro records a session flag, skips repeat visits and deep links, and is disabled under reduced motion. Set `club.introEnabled = false` to disable it entirely.

Mobile uses a simpler expansion. Scroll reveals are progressive enhancements; content is visible by default and normal scrolling is preserved. Focus states and a skip-to-content link are included. The mobile navigation stays available in the static, no-JavaScript build.

## GitHub Pages

The `base: './'` Vite setting makes built assets relative, supporting this repository's GitHub Pages project path and custom domains. The site uses section anchors, so no SPA history fallback is needed.

1. Push this source to the repository when ready.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. Run **Deploy to GitHub Pages** from the Actions tab. The workflow is intentionally manual (`workflow_dispatch`). It builds and uploads only `dist/`.

No deployment or push is performed by the local build. To enable automatic deployment later, add a `push` trigger for the repository's actual default branch. For another static host, publish `dist/` after `npm run build`.

## Source interpretation and next pass

The sketches inform hierarchy rather than exact rectangles: split hero; asymmetric project area; event almanac next to calendar; and sponsorship introduction, supporters, rationale, levels, and contact. The animation uses the hybrid game-development plan treatment, combining engineering folds with game-level routes, without military imagery.

Next content pass: approved mission/tagline; project records and actual artwork; member/advisor profiles; history and consented photos; meeting schedule/calendar; Discord and other club links; approved sponsor names, levels, benefits, and contact. This first pass deliberately leaves these facts empty.
