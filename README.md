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
- `projects.html` — all project content in one continuous page: overview, project details/demo, Wiki resource entry, and the full proposal form. Section links jump within this page.
- `project.html` — compatibility redirect to `projects.html#project-preview`.
- `team.html` — **Team**, not People. Three main scenes: club introduction, community description/photo, join information. Member profiles live on Members & Events.
- `sponsorship.html` — five main scenes: introduction/index, supporters, why sponsor, sponsorship levels, contact.
- `wiki.html` — the temporary local Wiki, with an Untitled entry and contents navigation. Move the entry to the future Wiki domain once that domain is confirmed.
- `proposal.html` — compatibility redirect to `projects.html#propose`. The embedded proposal form downloads a Markdown draft locally until the Microsoft Forms URL is supplied.
- `history.html` — continuous alternating timeline and mosaic Gallery.
- `members.html` — member directory and Events/calendar.
- `untitled.html` — complete temporary destination for Home’s undecided content, with introduction, details, and next-step scenes.
- `about.html` — retained purpose/history/gallery page for existing links.
- `events.html` — events and calendar.
- `join.html` — “Join iGDC at Pitt”: three steps for Discord, email, and events, alongside the upcoming Game Jam.

All routes use native, continuous document scrolling and end with the shared footer. The top navigation performs document navigation, not homepage anchor scrolling. Titles and descriptions are defined in `src/navigation/pages.ts`. All output pages are siblings and use relative links/assets, including when hosted under a GitHub repository path.

## Motion and interaction

**Homepage entrance:** The map/scroll opening has been removed. Home appears after the shared loading screen, then the controller logo assembles. There is no opening replay button.

**Taiji navigation:** `TaijiTransition.tsx` adapts the supplied `taiji-loading.html`: a fixed circular window, equal-scale sine wave moving left, and eyes locked to the wave. Ordinary same-tab clicks to another HTTP(S) page show it immediately and begin navigation after 120 ms. On every local page, the early HTML loader stays visible until the document, fonts, and React app are ready; a delayed fallback button lets the visitor continue if something fails to load. Same-page anchors, modifier clicks, downloads, and new-tab links retain their expected behavior. Escape cancels a pending transition; browser Back/Forward does not get trapped by an old overlay. The original reference is retained at `public/assets/taiji-loading-reference.html`.

**Native scrolling:** Every route uses ordinary document scrolling. Wheel, trackpad, touch, and keyboard input retain browser behavior. There is no gesture accumulation, fixed scene turn, nested reading mode, or page-turn control. Existing section IDs and `#scene-…` links remain valid; direct-entry anchors are resolved after loading finishes.

Reduced-motion mode shows the complete logo and uses a static taiji. Without JavaScript, all sections appear in normal document order with working links; mobile navigation remains visible. No backend or email collection is included.

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

The hero now uses `ControllerAssembly.tsx`, an animated SVG built from the club mark. It welds the outline (0.25–2.65 s), drops in the D-pad and slides in the shoulder caps together (2.7–3.6 s), then lights purple, red, green, and blue clockwise (3.75–4.83 s). IGD lettering follows. The assembly starts after loading, with an explicit Replay button. Reduced-motion and static HTML show the complete mark. The previous concept artwork and its provenance remain in `public/assets/ARTWORK.md`.

## Source structure

- `src/navigation/pages.ts`: route metadata and portable relative destinations.
- `src/pages/PageScenes.tsx`: each page's scene composition, based on the supplied September 26 PDFs.
- `src/App.tsx`: continuous section layout on every route and initial anchor restoration after loading.
- `src/components/ScenePager.tsx` and `src/navigation/scrollIntent.ts`: legacy paging implementation, retained in source but no longer mounted or shipped in the app bundle.
- `src/components/TaijiTransition.tsx`: supplied sine-wave loading animation and cross-document navigation.
- `src/components/OpeningPlan.tsx`: retired scroll opening, no longer mounted or shipped in the app bundle.
- `src/sections/`: reusable content sections.
- `src/styles.css`: original shared design system; `src/pages.css`: multipage and scene layouts; `src/revision.css`: fourth-edition navigation, footer, typography, calendar, and page layouts.
- `scripts/prerender.tsx`: generates 11 content pages and 2 compatibility redirects after Vite builds.
- `scripts/check.tsx`: verifies every page's headings/IDs and all internal links, content approval behavior, intro policy, native scrolling on all routes, and legacy gesture utilities.

## GitHub Pages

1. Push the source when ready.
2. Set **Settings → Pages → Source** to **GitHub Actions**.
3. Run the manual **Deploy to GitHub Pages** workflow.

The workflow builds and uploads `dist/`. Every `.html` route exists on disk, so direct links and refresh work without SPA rewrites. No automatic push/deployment is performed by local builds.

## Design interpretation

The PDFs are layout references: the general site map and footer; a split project-details/video page; Team's four scenes; Sponsorship's five scenes; and Home's three scenes. The latest direct request restores native scrolling on every page; the map/scroll opening has been removed. Website titles and the Team label follow the explicit user wording. Sketch names, sponsor relationships, videos, and URLs remain unconfirmed until supplied as actual club content.

## Fourth edition

The header order is Home → Projects → Team → Wiki → Sponsorship → Game Jam, followed by a bright **Join us** button. Projects opens the unified project page; Team discloses History & Gallery and Members & Events. Footer categories link to every generated route. Escape closes disclosures and restores focus.

`public/assets/sealed-letter.svg` follows the envelope and round wax-seal motif drawn in the fourth-edition PDF. Join and footer email buttons use `yul424@pitt.edu` with a prefilled joining message. This opens the visitor’s mail client; it does not collect addresses or subscribe anyone automatically. `destinations` retains a pending mailing-list URL for a future subscription service. The Discord invitation is `https://discord.gg/kqns4AvEN`. The Follow Us bar contains YouTube, Instagram, X, and Facebook SVG marks. Unconfigured channels are visibly pending, not fake external links.

Home's Imagine·Make·Play rail reveals upright letters down the page with a horizontal block cursor. The almanac animates the hand-drawn wave and eyes sequentially through its cells, and replays when switching months. Dates appear as the wave reaches each cell; label text is typed by a terminal block cursor. Reduced-motion mode reveals everything immediately. Browser-local date determines the initial month after hydration; the published events remain the sole source for event markers. No calendar service integration is implied.

The PDFs supply layout sketches. The latest direct message determines the final labels and hierarchy where older sketches differ. Untitled is deliberate placeholder content, not a confirmed club claim. History's timeline remains undated until its source records are provided.

## Site seal

The original contemporary bird-worm-inspired 造境成遊 seal is featured on the initial loading screen (`#boot-loader` in `index.html`) at the lower-right corner. It is not displayed across general page layouts. The web asset is `public/assets/zaojing-chengyou-seal.svg`; editable artwork and research notes live in `output/seal/`.

## Game Jam

The Game Jam entry links to [Pitt’s Games 4 Social Impact 2026](https://itch.io/jam/pitt-games-4-social-impact-2026). Its published October 16–18 schedule is included in `events`, with links to the organizer’s page for details and registration. The top navigation, Join page, event section, and footer all expose the link.

## Website disclosure

The homepage and shared footer explicitly state: “This website is vibe coded with AI assistance.” This describes the website, not the development process of club games.
