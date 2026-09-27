# Indie Game Dev Club @ Pitt

An English-language, multipage club website with Chinese negative-space styling: paper white, charcoal ink, restrained vermilion, and spacious typography. Built with Vite, React, and TypeScript; every route is prerendered as a real HTML file.

## Run locally

Node.js 20.19+ is required; Node 22 is recommended.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Production validation:

```sh
npm run check
npm run build
npm run preview
```

## Independent pages

- `index.html` — **Home**. The exact browser title is **Building Our Game Dev Community @ Pitt | Indie Game Dev Club @ Pitt**. Three main scenes: one-line title and vertical terminal typing, asymmetric Untitled links, animated almanac/calendar.
- `projects.html` — project showcase, documentation, proposal entry, and a project-detail preview link.
- `project.html` — project detail: introduction/GitHub on the left, demonstration video on the right. “Spaceship” is the sketch's working title, visibly marked as tentative.
- `team.html` — **Team**, not People. Three main scenes: club introduction, community description/photo, join information. Member profiles live on Members & Events.
- `sponsorship.html` — five main scenes: introduction/index, supporters, why sponsor, sponsorship levels, contact.
- `docs.html` — an independent documentation page with an Untitled entry and contents navigation.
- `proposal.html` — continuous form: why this idea, the proposal, and people/time/budget; downloads a Markdown draft locally until the Microsoft Forms URL is supplied.
- `history.html` — continuous alternating timeline and mosaic Gallery.
- `members.html` — member directory and Events/calendar.
- `untitled.html` — complete temporary destination for Home’s undecided content, with introduction, details, and next-step scenes.
- `about.html` — retained purpose/history/gallery page for existing links.
- `events.html` — events and calendar.
- `join.html` — joining information and social destinations.

Paged routes also have a final footer scene. History and Proposal use continuous scrolling as shown in the fourth-edition sketches. The top navigation performs document navigation, not homepage anchor scrolling. Titles and descriptions are defined in `src/navigation/pages.ts`. All output pages are siblings and use relative links/assets, including when hosted under a GitHub repository path.

## Motion and interaction

**Opening scroll:** Home's first session visit shows a paper plan unrolling from left to right, with the roller and developer moving along its edge. It lasts 2.4 seconds, offers Skip/Escape, and can be replayed from Home's footer. Session storage is optional; blocked storage does not prevent rendering. Deep links skip the opening. `club.introEnabled = false` disables it.

**Taiji navigation:** `TaijiTransition.tsx` adapts the supplied `taiji-loading.html`: a fixed circular window, equal-scale sine wave moving left, and eyes locked to the wave. Ordinary same-tab clicks to another HTML page play it for approximately 850 ms before navigation. Same-page anchors, modifier clicks, downloads, and new-tab links retain their expected behavior. Escape cancels a pending transition; browser Back/Forward does not get trapped by an old overlay. The original reference is retained at `public/assets/taiji-loading-reference.html`.

**Sustained scrolling:** A page stays still while a gesture accumulates. A direction-consistent wheel gesture needs at least 3 samples, 240 ms, and 180 normalized pixels. Touch uses 72 pixels. Gaps longer than 190 ms or direction reversals reset the gesture. Once triggered, the entire scene track moves exactly one scene over 760 ms at constant speed. Input is ignored while moving, and wheel inertia must go quiet before another transition. Change these values in `src/navigation/scrollIntent.ts`.

The fixed bottom controls also support explicit previous/next turns; Page Up/Down, arrows, Space/Shift-Space, Home, and End work outside interactive controls. Inactive scenes are inert and hidden from assistive technology. Short screens and long records can expose **Read this scene**, an explicit opt-in to scroll within the current scene without changing the scene track; **Back to page turns** restores gesture paging.

Reduced-motion mode keeps the fixed page turns but removes travel animation, skips the opening, and uses a brief static taiji. Without JavaScript, all scenes appear in normal document order with working links; mobile navigation remains visible. No backend or email collection is included.

## Edit content

`src/data/club.ts` contains copy, project records, team member records (`people` internally), events, sponsors, sponsorship levels, destinations, history, gallery, the provisional project preview, and sponsorship packet.

- Replace draft copy and set `club.copyStatus = 'approved'` only after review.
- `null` destinations are pending text, never empty links. Add only verified URLs.
- Projects support art, contributors, status, technologies, detail URLs, documentation, and GitHub. The first approved project is featured.
- Team members support role/group, biography, optional photo, and optional `linkedinUrl`. Sketch names are not treated as confirmed profiles.
- Set `teamPhoto` to an approved image and alt text when available.
- `projectPreview.videoUrl` accepts an actual browser-playable video asset URL; no fake play button is shown while it is missing. `poster` is optional.
- Dates use `YYYY-MM-DD`; times should include a timezone. The local calendar displays these event records and supports month/day navigation; the optional external shared-calendar link is separate.
- Only sponsorship levels with `approved: true` appear. Unknown contribution amounts, benefits, identities, and affiliations are not invented.
- Store media in `public/assets/` and use paths like `./assets/photo.jpg`.

## Logo and artwork

`public/assets/club-logo-original.webp` is the supplied original. `public/assets/club-logo.svg` is an editable manual vector approximation of its controller, colored buttons, and IGD lettering; it is not a claim of a pixel-exact trace. The SVG is used in the header/footer and copied to `public/favicon.svg`. Replace both if the approved master changes.

The hero artwork is generated conceptual game art, not an existing club project. Its provenance and exact original generation prompt remain in `public/assets/ARTWORK.md`.

## Source structure

- `src/navigation/pages.ts`: route metadata and portable relative destinations.
- `src/pages/PageScenes.tsx`: each page's scene composition, based on the supplied September 26 PDFs.
- `src/components/ScenePager.tsx`: scene state, intent-driven wheel/touch/keyboard behavior, focus, deep links, overflow reading.
- `src/navigation/scrollIntent.ts`: pure, testable gesture thresholds.
- `src/components/TaijiTransition.tsx`: supplied sine-wave loading animation and cross-document navigation.
- `src/components/OpeningPlan.tsx`: one-sided scroll opening.
- `src/sections/`: reusable content sections.
- `src/styles.css`: original shared design system; `src/pages.css`: multipage and scene layouts; `src/revision.css`: fourth-edition navigation, footer, typography, calendar, and page layouts.
- `scripts/prerender.tsx`: generates all 13 HTML pages after Vite builds.
- `scripts/check.tsx`: verifies every page's headings/IDs and all internal links, content approval behavior, intro policy, and sustained-scroll intent.

## GitHub Pages

1. Push the source when ready.
2. Set **Settings → Pages → Source** to **GitHub Actions**.
3. Run the manual **Deploy to GitHub Pages** workflow.

The workflow builds and uploads `dist/`. Every `.html` route exists on disk, so direct links and refresh work without SPA rewrites. No automatic push/deployment is performed by local builds.

## Design interpretation

The PDFs are layout references: the general site map and footer; a split project-details/video page; Team's four scenes; Sponsorship's five scenes; and Home's three scenes. The latest direct request replaces the earlier free-scrolling behavior with sustained-gesture scene turns and replaces hinged blueprint unfolding with a one-sided roll. Website titles and the Team label follow the explicit user wording. Sketch names, sponsor relationships, videos, and URLs remain unconfirmed until supplied as actual club content.

## Fourth edition

The header order is Home → Projects → Team → Sponsorship, followed by a bright **Join us** button. Projects discloses Spaceship, Docs, and Propose a project; Team discloses History & Gallery and Members & Events. Footer categories link to every generated route. Escape closes disclosures and restores focus.

`public/assets/sealed-letter.svg` follows the envelope and round wax-seal motif drawn in the fourth-edition PDF. Footer email links point to joining information until verified `destinations` and `contactEmail` values are provided; no email is collected. The Follow Us bar contains YouTube, Instagram, X, and Facebook SVG marks. Unconfigured channels are visibly pending, not fake external links.

Home's Imagine·Make·Play rail reveals upright letters down the page with a horizontal block cursor. The almanac animates the hand-drawn wave and eyes sequentially through its cells, and turns the calendar sheet when switching months. Reduced-motion mode reveals everything immediately. Browser-local date determines the initial month after hydration; the published events remain the sole source for event markers. No calendar service integration is implied.

The PDFs supply layout sketches. The latest direct message determines the final labels and hierarchy where older sketches differ. Untitled is deliberate placeholder content, not a confirmed club claim. History's timeline remains undated until its source records are provided.

## Site seal

The original contemporary bird-worm-inspired 造境成遊 seal is shared by all routes via `SiteSeal`. It stays fixed at the lower-right corner, including the taiji navigation overlay. During that overlay it grows slightly and plays a brief stamping entrance; reduced motion keeps it static. The decoration does not intercept pointer input. The web asset is `public/assets/zaojing-chengyou-seal.svg`; editable artwork and research notes live in `output/seal/`.
