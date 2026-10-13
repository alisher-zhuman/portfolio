# football-portfolio

Personal portfolio of Alisher Zhuman (Middle Frontend Developer at «Түндүк», moving to backend),
styled as a football matchday: the page is a pitch, the hero is transfer news, the career is a match
timeline. Russian-language site. Ported from a plain HTML/CSS/JS prototype to Next.js; the prototype
is no longer in the repo.

For Next.js specifics read @AGENTS.md first: it points to `node_modules/next/dist/docs/`, the docs
for the exact installed version. Don't answer Next.js questions from memory. The conventions below
deliberately mirror `~/Desktop/kca-frontend-public` (the user's reference project) — when in doubt,
look at how kca does it.

## Documentation tools (installed plugins — use them)

- **context7** (`context7@claude-plugins-official`, MCP): current docs for any library — React,
  Tailwind, zod, zustand, Next.js. Use it before relying on memory for an API. Needs auth: if its
  tools are missing in a session, it is disconnected — authorise via `/mcp`, and meanwhile fall back
  to `node_modules/next/dist/docs/` (Next), the official sites, and the npm registry for versions.
- **claude-md-management** (`claude-md-management@claude-plugins-official`):
  - `/claude-md-management:revise-claude-md` — at the end of a working session, to fold that
    session's learnings into this file.
  - `/claude-md-management:claude-md-improver` — periodic audit of this file against the codebase.
    Last run 2026-10-12: 86/100; its three suggestions (Setup, Verifying changes, stale README)
    are applied.

## Working with the user

- **Ask decisions in small stages**, a few questions at a time, only what the next step needs.
  Format: 2–3 options → pros/cons/tech-debt risk → a clear recommendation → wait.
- Agree **before** implementing: stack/versions, any new dependency, folder structure, approach to
  animation/theme/sound, SEO, deploy, anything backend.
- Content: ask per stage; the answer is either «мокай» or real data.
- After each stage: what was done, what to check, problems found. Report bugs and risks immediately.
- Work **only on `main`** (remote: github.com/alisher-zhuman/portfolio) — no branches or PRs.
- Conventional Commits, small steps. **Never** add `Co-Authored-By` or any AI mention to commits.
- Verify claims in the built output or a real browser, not by reasoning (see Gotchas).

## Commands

Setup: Node 24.17.0 (`.nvmrc`), pnpm 11. `pnpm install`, then `cp .env.example .env.local` and set
`NEXT_PUBLIC_SITE_URL` only to override the production domain (the fallback).

| Command                                  | Does                                                        |
| ---------------------------------------- | ----------------------------------------------------------- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Dev server (Turbopack) / production build / serve the build |
| `pnpm lint` / `pnpm lint:fix`            | ESLint (flat config, `eslint.config.mjs`)                   |
| `pnpm typecheck`                         | `tsc --noEmit`                                              |
| `pnpm format` / `pnpm format:check`      | Prettier write / check                                      |
| `pnpm steiger`                           | FSD architecture lint over `src/`                           |

lefthook runs typecheck, lint, steiger and format:check on **pre-push**. `pnpm next typegen`
regenerates route types (`LayoutProps` etc.) if typecheck complains about missing globals.

## Stack and why these versions

Pinned to exact versions; `pnpm-lock.yaml` is committed. pnpm only.

- **Next 16.3.8** (App Router, Turbopack, `cacheComponents` + `partialPrefetching` on). 16.3.8 is a
  security-only patch (SSRF in Image Optimization, metadata image route disclosure, cache poisoning);
  approved as an exception to the 14-day rule. `eslint-config-next` must always match `next`.
- **React 19.3.0**, **TypeScript 6.0.3** — not 7: `typescript-eslint` requires `<6.1`.
- **Tailwind 4.3.3 via `@tailwindcss/postcss`** (per Tailwind's docs). The create-next-app 16.4
  template used `@tailwindcss/turbopack`, which only has insiders builds — don't reintroduce it.
- **ESLint 9.39.5** — v9 is EOL, but `eslint-plugin-react`/`-import`/`-jsx-a11y` inside
  eslint-config-next only declare support up to 9. Same as kca. Move to 10 when they do.
- `@vercel/analytics` 2.0.1 — `<Analytics />` at the end of `<body>` in `app/layout.tsx` (added
  2026-10-13 at the user's request; no deps, no install scripts). Its script
  `/_vercel/insights/script.js` exists only on Vercel, so a local `next start` logs a 404 for it —
  expected, ignore it in console/Lighthouse checks.
- Prettier 3.9.9 (+ `eslint-config-prettier`), zustand 5.0.15, clsx + tailwind-merge (`cn()`),
  zod 4.6.5, steiger 0.7.0 + `@feature-sliced/steiger-plugin` 0.8.0,
  eslint-plugin-simple-import-sort 14.0.0, lefthook 2.1.14.

## Dependency posture

- `pnpm-workspace.yaml` sets `minimumReleaseAge: 20160` (14 days) for **all** packages, transitive
  included. Exceptions are listed in `minimumReleaseAgeExclude` (only the Next 16.3.8 patch today).
- Install scripts are blocked unless listed in `allowBuilds`. Allowed: `lefthook` (postinstall only
  runs `lefthook install`). Blocked: `sharp`, `unrs-resolver`.
- Every new dependency: justify it (why, can we do without, alternative), check the exact name,
  ≥14 days old, no surprise install scripts, then run `pnpm audit` and report.
- `pnpm audit` as of 2026-10-12: **2 high, both build-time DoS**, not shipped to the browser:
  - `source-map-js <1.2.2` (via postcss). Fix 1.2.2 was released 2026-09-30 → add an `overrides`
    entry once it is 14 days old (from 2026-10-14).
  - `braces <=3.0.3` — no patched version is published yet. Nothing to do but wait.
    Re-run the command before quoting these numbers; they drift.

## Architecture: Feature-Sliced Design

`src/` with layers `app → widgets → features → entities → shared`; a layer imports only from layers
below it, and only through a slice's/segment's `index.ts` (steiger enforces this). Aliases: `@app`,
`@widgets`, `@features`, `@entities`, `@shared` (`@/*` → `src/*`).

- **shared** — `audio/` (Web Audio, see below), `constants/` (`SITE_URL`, theme key), `effects/`
  (confetti), `helpers/` (`cn`, `pluralRu`, theme init script), `hooks/` (`useInView`, `useMounted`,
  `useReducedMotion`, `useResolvedTheme`), `stores/` (theme, sound, toast), `types/`, `ui/`
  (`Crest`, `InlineScript`, `JsonLd`, `LiveDot`, `OffscreenPause`, `SectionHeading`, `SkipLink`,
  `TagList`, `ThemeSync`, `Toaster`). Segment names follow kca, not FSD's official set
  (`fsd/segments-by-purpose` is off on purpose).
- **entities** — typed data and its basic UI: `profile` (all personal data, contacts, stats, bio,
  brand name variants), `career` (match events, commentary, `getFinalScore`), `project`, `rating`
  (`api/` with `getRating`/`submitRating`, `model/` zod schemas). Slice names are singular
  (steiger's `inconsistent-naming`).
- **features** — `kick-ball` (physics ball), `cheat-code` (konami → gold «легенда» card),
  `rate-player` (rating form), `penalty-shootout` (404 game).
- **widgets** — `layout` (header with nav, theme switcher, sound toggle; footer; touchline) and
  `home` (all homepage sections, the match store, scroll clock, section whistle).
- **app** — routing files plus `helpers/` (SEO description, Person JSON-LD) and `styles/`.

**To change texts, contacts or projects, edit `src/entities/*/model/data.ts` only.** Contacts,
resume (`public/resume.pdf`) and most texts are still placeholders.

**Real data about Alisher lives in `docs/private/` (gitignored — the repo is public):**
`dossier.md` (career, every project with stack/URL/commit counts, metrics, contacts, site ideas,
and a list of conflicting facts to confirm before publishing) and `linkedin-raw.md` (verbatim
LinkedIn/Instagram input; append new batches there). Read it before writing any content. Metrics
tagged [CV] are his own claims; never publish anything from the "Conflicts" list unconfirmed.
If the folder is missing (another machine), ask the user — don't invent data.

## Coding conventions (kca rules)

- Comments in **English** everywhere (Cyrillic quoted as data is fine). UI copy is Russian.
- Arrow functions only, no `function` declarations — route files included.
- **One component per file, one per folder**: `ui/<kebab-name>/index.tsx`.
- Colours only through CSS variables mapped in `@theme inline` (`src/app/styles/theme.css`); a value
  identical in both themes goes in `:root` only. No raw palette colours, no arbitrary values
  (`w-[55px]`) — use the spacing scale. In SVG use presentation attributes (`strokeWidth`,
  `fontSize`) rather than arbitrary classes. `group-data-[x=true]:` variants are fine.
- Repeated class combos → `@utility` in `styles/utilities.css` (`container-page`, `section-shell`,
  `btn`, `btn-primary`, `tag`, `pill-segment`, `card-notched`, `card-front-surface`,
  `card-front-legend`, `sun-rays`, `goal-net`).
- Keyframes live in `styles/animations.css`, each with its own `prefers-reduced-motion` answer next
  to it.
- Interfaces for object shapes, `type` for unions. Type-only imports (`import { type X }`).
- Export only what something imports.
- Every text pair in both themes passes WCAG AA (measured 4.99–14.58); re-measure new colours.

## Verifying changes

There are no automated tests yet. Verify against a production build in a real browser:
`pnpm build && pnpm start -p 3456`, then headless Chrome driven over CDP
(`--remote-debugging-port`): check the console for errors and hydration warnings, emulate mobile
(`Emulation.setDeviceMetricsOverride`) and `prefers-reduced-motion`, take screenshots of both themes.
Lighthouse as described below.

## How the interactive parts work

**Server first.** Every section renders on the server in its final state (scoreboard 2:0 at 78′,
all events played), so crawlers and no-JS visitors get full content. Client components are the
smallest possible islands layered on top.

- **Theme** (kca pattern): inline script in `<head>` (`getThemeInitScript` + `InlineScript`) sets
  `.dark` before hydration; zustand store holds `light | dark | system`; `ThemeSync` keeps `<html>`
  in sync incl. live OS changes. Labels: День / Авто / Вечер.
- **Per-frame work never goes through React state.** The scroll clock (`MatchTimeline`) writes
  `data-passed`/`data-live` directly onto the server-rendered `<li>`s; only minute and score go
  through `useMatchStore`, and only when they change. The touchline writes one `--progress` var.
  The player's eyes write `--eye-x/--eye-y/--tilt` on the wrapper.
- The 67′ goal celebrates once and only if it is still on screen 400 ms later (anchor jumps and
  flings don't trigger it).
- **Sound**: off on every visit. `shared/audio/index.ts` is a thin API; the synthesiser
  (`engine.ts`, ~300 lines) is a dynamic `import()` on the first switch-on, so it isn't in the
  first-load bundle. Module singleton outside React (StrictMode/HMR safe); released on `pagehide`.
- **Heavy parts load lazily**: ball and penalty game via `next/dynamic({ ssr: false })` (allowed only
  inside a Client Component); ball isn't loaded at all under reduced motion. Confetti is a dynamic
  `import()`. The rating API (and zod) is imported when the rate section is within 600px.
- `OffscreenPause` sets `data-paused` → CSS pauses all animations inside while off screen.
- `useInView(ref, rootMargin, initial)`: `initial` defaults to `true` (for pausing); pass `false`
  for deferred loading, or the work starts immediately.

## SEO

- Brand **Alisher Zhuman**; variants (Алишер Жуманов, Алишер Жуманов Бакирович, Alizher Zhuman) go
  to description, keywords and JSON-LD `alternateName`. All from `entities/profile`.
- Metadata in `app/layout.tsx`; **canonical only in `app/page.tsx`** — a layout canonical would be
  stamped onto the 404. `not-found.tsx` exports its own title; Next adds `noindex` itself
  (verified in built HTML).
- `opengraph-image.tsx` (next/og, built statically). Satori can't use next/font's WOFF2, so static
  TTFs live in `assets/fonts/` with their OFL licences.
- `sitemap.ts`, `robots.ts`, Person JSON-LD via `JsonLd` (escapes `<` per Next's guide).
- Origin from `NEXT_PUBLIC_SITE_URL` (`.env.example`), fallback `https://alisher-zhuman.vercel.app` (the production domain).
- `birthPlace: Талас` is an interpretation of «родом из Таласа» — not confirmed by the user.

## Lighthouse (2026-10-12, Lighthouse 13.5.0, production build)

| Page                 | Perf     | A11y | BP  | SEO |
| -------------------- | -------- | ---- | --- | --- |
| Home mobile          | 92       | 100  | 100 | 100 |
| Home desktop         | 100      | 100  | 100 | 100 |
| 404 mobile / desktop | 92 / 100 | 100  | 96  | 54  |

404's SEO/BP losses are by design (status 404, noindex, the 404 console line). Measure 404 with
`--ignore-status-code`. Run: `pnpm dlx lighthouse@13.5.0 <url> --chrome-flags=--headless=new`
(not a project dependency). First-load JS is ~164 KB gzip, almost all React + Next router.

## Gotchas (each one cost time)

- **Stale server**: killing `next start` can leave `next-server` alive, serving the previous build.
  Use `lsof -ti:3456 | xargs kill` (or the port you use) before restarting.
- **steiger config must stay `steiger.config.ts`** — a `.mts` is silently ignored. The
  `MODULE_TYPELESS_PACKAGE_JSON` warning it prints is harmless.
- **Cache Components**: `new Date()` in a route (e.g. sitemap `lastModified`) makes it dynamic.
- **Lantern vs reality**: mobile LCP was "3.9 s" while the real LCP was the first paint (58 ms) —
  the simulation counts every early script. Cut first-load JS, not fonts: trimming font preloads
  made FCP worse and was reverted.
- `next/font` emits `@font-face` for every subset; `subsets` only controls preloads (verified).
- `react-hooks/purity` flags `Math.random()` in handlers defined in the component body — move it
  to a module-level helper.
- Focusing an element that is still `disabled` until React re-renders silently fails — focus in
  `requestAnimationFrame`.
- WCAG 2.5.3 Label in Name: a button's accessible name must contain its visible text (incl. text
  inside SVG, like the shirt number).
- Headless Chrome has a ~500px minimum window width; emulate mobile via CDP
  `Emulation.setDeviceMetricsOverride` or an iframe.

## Deferred — decide later

- **Deploy: Vercel** — the repo is connected (2026-10-13), push to `main` deploys to
  https://alisher-zhuman.vercel.app (also the `SITE_URL` fallback, so no env var is needed there).
  On a custom domain, change the fallback or set `NEXT_PUBLIC_SITE_URL` in the project settings.
- Rating backend: replace the bodies of `getRating`/`submitRating` in
  `entities/rating/api/rating.ts` (the fetch version is in the comment there). Not via Next route
  handlers without agreement.
- `source-map-js` override after 2026-10-14; watch for a `braces` fix.
- Real contacts, resume PDF, texts; confirm or drop `birthPlace`.
- ESLint 10 once eslint-config-next's plugins support it.
- `README.md` is still the create-next-app template — rewrite it (setup, scripts, structure).
