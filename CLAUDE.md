# football-portfolio

Personal portfolio of Alisher Zhuman (Middle Frontend Developer at «Түндүк», moving to backend),
styled as a football matchday: the page is a pitch, the hero is transfer news, the career is a match
timeline. Kyrgyz (default), Russian and English via next-intl. Ported from a plain HTML/CSS/JS prototype to Next.js; the prototype
is no longer in the repo.

For Next.js specifics read @AGENTS.md first: it points to `node_modules/next/dist/docs/`, the docs
for the exact installed version. Don't answer Next.js questions from memory. kca uses the older
`.next-docs/` copy made by `npx @next/codemod agents-md`; Next 16.3 bundles the docs in the package
and calls that block legacy (`next dev` strips it on upgrade), so don't copy it from kca.
`AGENTS.md` and this file stay **tracked** in git (unlike kca, which untracks them) — decided
2026-10-13 so the context survives a lost machine or chat. The conventions below
deliberately mirror `~/Desktop/kca-frontend-public` (the user's reference project) — when in doubt,
look at how kca does it.

## Documentation tools (installed plugins — use them)

- **context7** (`context7@claude-plugins-official`, MCP): current docs for any library — React,
  Tailwind, zustand, Next.js. Use it before relying on memory for an API. Needs auth: if its
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

- **Next 16.4.1** (App Router, Turbopack, `cacheComponents` + `partialPrefetching` on). 16.4.1 is
  the first release fixing two critical RCEs (Image Optimization with SVG, `use cache` with typed
  arrays) and a Server Actions DoS; the 16.3 line got no patch. Installed at 13 days old as an
  approved exception (2026-10-27). Move to 16.4.3 from 2026-11-06 (bug fixes only, incl. one for
  `proxy.ts`). `eslint-config-next` must always match `next`.
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
  steiger 0.7.0 + `@feature-sliced/steiger-plugin` 0.8.0,
  eslint-plugin-simple-import-sort 14.0.0, lefthook 2.1.14.
- **next-intl 4.14.9** (added 2026-10-27), set up like kca: `src/i18n/` (`routing`, `request`,
  `navigation`), `src/proxy.ts`, `messages/{ky,ru,en}.json`. Differences from kca: the locale comes
  from `next/root-params` (no `setRequestLocale`), and `src/i18n/global.d.ts` types every key
  against `ru.json`.

## Dependency posture

- `pnpm-workspace.yaml` sets `minimumReleaseAge: 20160` (14 days) for **all** packages, transitive
  included. Exceptions are listed in `minimumReleaseAgeExclude` (only Next 16.4.1 today).
- Install scripts are blocked unless listed in `allowBuilds`. Allowed: `lefthook` (postinstall only
  runs `lefthook install`). Blocked: `sharp`, `unrs-resolver`, and `@parcel/watcher` + `@swc/core`
  (they come with next-intl and only serve its unused message extractor).
- Every new dependency: justify it (why, can we do without, alternative), check the exact name,
  ≥14 days old, no surprise install scripts, then run `pnpm audit` and report.
- `overrides` in `pnpm-workspace.yaml`: `source-map-js ^1.2.2` (build-time DoS via postcss).
- `pnpm audit` as of 2026-10-27: **1 high**, dev tooling only — `zod <4.6.6` inside
  `eslint-plugin-react-hooks` (4.6.5) and `steiger` (3.25.76, no fix on the 3.x line). They only
  parse our own config, never untrusted input. Re-run the command before quoting numbers.

## Architecture: Feature-Sliced Design

`src/` with layers `app → widgets → features → entities → shared`; a layer imports only from layers
below it, and only through a slice's/segment's `index.ts` (steiger enforces this). Aliases: `@app`,
`@widgets`, `@features`, `@entities`, `@shared` (`@/*` → `src/*`).

- **shared** — `audio/` (Web Audio, see below), `constants/` (`SITE_URL`, theme key), `effects/`
  (confetti), `helpers/` (`cn`, theme init script), `hooks/` (`useInView`, `useMounted`,
  `useReducedMotion`, `useResolvedTheme`), `stores/` (theme, sound, toast), `types/`, `ui/`
  (`Crest` (tunduk badge on the card), `InlineScript`, `JsonLd`, `LiveDot`, `Logo` (header), `OffscreenPause`, `SectionHeading`, `SkipLink`,
  `TagList`, `ThemeSync`, `Toaster`). Segment names follow kca, not FSD's official set
  (`fsd/segments-by-purpose` is off on purpose).
- **entities** — typed data and its basic UI: `profile` (contacts, stats, stack, brand name variants,
  `transferWindow`), `career` (match events by id, `getFinalScore`), `project`. Slice names are singular
  (steiger's `inconsistent-naming`).
- **features** — `kick-ball` (physics ball), `cheat-code` (konami → gold «легенда» card),
  `penalty-shootout` (404 game). The «Оцени игрока» rating block was removed on 2026-10-28 at
  Alisher's request, together with `entities/rating`, `features/rate-player` and zod.
- **widgets** — `layout` (header with nav, theme/language menus, sound toggle; footer; touchline),
  `home` (all homepage sections incl. `coach-quotes` — his LinkedIn recommendations, quoted
  verbatim in ru and translated in ky/en with a note —, the match store, scroll clock, section whistle; projects show the
  newest 6) and `projects` (the /projects page: every project with the club filter).
- **app** — everything routable is under `[locale]/` (layout, page, `projects/page`, not-found,
  `[...rest]`, OG image); `sitemap.ts`, `robots.ts`, `icon.svg` + `apple-icon.png` stay at the root. The logo (2026-10-29)
  is «AZ» + a yellow 7 on a red rounded square, letters as paths from Science Gothic with a 12%
  margin; `shared/ui/Logo` and `icon.svg` are the same drawing, `apple-icon.png` is it full-bleed
  at 180px. Theme: Kyrgyzstan national team colours, number 7 as a nod to Ronaldo. Plus `helpers/` (Person JSON-LD)
  and `styles/`. `src/i18n/` sits beside the layers, as in kca, imported as `@/i18n/*`.

**Texts live in `messages/{ky,ru,en}.json`; structure (ids, numbers, links, stack) in
`src/entities/*/model/data.ts`.** Add a key to all three files — `ru.json` is the typed source, so
a key missing there fails typecheck, but nothing checks ky/en for completeness. Lists use
`t.raw()`; plurals use ICU in the messages. Kyrgyz is drafted by Claude and proofread by Alisher.
Contacts are real (LinkedIn, Telegram, GitHub, email, phone); the resume is `public/resume-{ru,en}.pdf` (his CVs from
`~/Desktop/resources`, July 2026 — outdated, no «Түндүк»; ky gets the RU one). The hero and the card front follow the 2026-10-27 decisions; bio, scout report, career,
projects and footer still carry the old backend-transfer copy until each is reworked.

**Real data about Alisher lives in `docs/private/` (gitignored — the repo is public):**
`dossier.md` (career, every project with stack/URL/commit counts, metrics, contacts, site ideas,
and a list of conflicting facts to confirm before publishing), `linkedin-raw.md` (verbatim
LinkedIn/Instagram input; append new batches there) and `chat-history.md` (what earlier sessions
did and the open items — read it when picking the work back up). Read it before writing any content. Metrics
tagged [CV] are his own claims; never publish anything from the "Conflicts" list unconfirmed.
If the folder is missing (another machine), ask the user — don't invent data.

## Coding conventions (kca rules)

- Comments in **English** everywhere (Cyrillic quoted as data is fine). UI copy goes in `messages/`, never in components (`shared/` takes translated strings as props, so
  it stays free of next-intl).
- Arrow functions only, no `function` declarations — route files included.
- **One component per file, one per folder**: `ui/<kebab-name>/index.tsx`.
- Colours only through CSS variables mapped in `@theme inline` (`src/app/styles/theme.css`); a value
  identical in both themes goes in `:root` only. No raw palette colours, no arbitrary values
  (`w-[55px]`) — use the spacing scale. In SVG use presentation attributes (`strokeWidth`,
  `fontSize`) rather than arbitrary classes. `group-data-[x=true]:` variants are fine.
- Repeated class combos → `@utility` in `styles/utilities.css` (`container-page`, `section-shell`,
  `btn`, `btn-primary`, `tag`, `menu-trigger`/`-panel`/`-item`/`-badge`/`-check` (header
  dropdowns), `card-shape`, `card-front-surface`,
  `card-front-legend`, `sun-rays`, `goal-net`).
- Keyframes live in `styles/animations.css`, each with its own `prefers-reduced-motion` answer next
  to it.
- Interfaces for object shapes, `type` for unions. Type-only imports (`import { type X }`).
- Export only what something imports.
- Every text pair in both themes passes WCAG AA (measured 4.99–14.58); re-measure new colours.

## Verifying changes

There are no automated tests yet — the kca-style Vitest + Testing Library (later Playwright)
setup is a separate stage after the real content is in (decided 2026-10-13). Verify against a production build in a real browser:
`pnpm build && pnpm start -p 3456`, then headless Chrome driven over CDP
(`--remote-debugging-port`): check the console for errors and hydration warnings, emulate mobile
(`Emulation.setDeviceMetricsOverride`) and `prefers-reduced-motion`, take screenshots of both themes.
Lighthouse as described below.

## How the interactive parts work

**Server first.** Every section renders on the server in its final state (scoreboard 5:0 at 78′,
all events played), so crawlers and no-JS visitors get full content. Client components are the
smallest possible islands layered on top.

- **Theme** (kca pattern): inline script in `<head>` (`getThemeInitScript` + `InlineScript`) sets
  `.dark` before hydration; zustand store holds `light | dark | system`; `ThemeSync` keeps `<html>`
  in sync incl. live OS changes. Labels: День / Авто / Вечер.
- **Per-frame work never goes through React state.** The scroll clock (`MatchTimeline`) writes
  `data-passed`/`data-live` directly onto the server-rendered `<li>`s; only minute and score go
  through `useMatchStore`, and only when they change. The touchline writes one `--progress` var.
- The 67′ goal celebrates once and only if it is still on screen 400 ms later (anchor jumps and
  flings don't trigger it).
- **Sound**: off on every visit. `shared/audio/index.ts` is a thin API; the synthesiser
  (`engine.ts`, ~300 lines) is a dynamic `import()` on the first switch-on, so it isn't in the
  first-load bundle. Module singleton outside React (StrictMode/HMR safe); released on `pagehide`.
- **Heavy parts load lazily**: ball and penalty game via `next/dynamic({ ssr: false })` (allowed only
  inside a Client Component); ball isn't loaded at all under reduced motion. Confetti is a dynamic
  `import()`.
- **Page transitions**: React's `<ViewTransition>` via `shared/ui/PageTransition`, wrapped around
  each page's `<main>` (not the layout, where enter/exit never fire). Links set the direction with
  `transitionTypes={['nav-forward' | 'nav-back']}`; untagged navigations (browser back) swap
  instantly. The header has `view-transition-name: site-header` and stays still. No library.
- **Scroll reveal**: the `.reveal` class (animations.css) is a CSS view timeline (`animation-timeline:
view()`), no JS; browsers without it and reduced motion just show the content. Don't put it on
  elements that animate `opacity`/`translate` themselves (the career events have their own clock).
- **Player card flips on hover** (CSS `group-hover`; Tailwind's hover only applies on devices that
  can hover), a tap on touch (`pointerType !== 'mouse'`), and a visually hidden «Перевернуть
  карточку» button for the keyboard. **Project cards are one-sided** — a flip with «Что делал»
  (his LinkedIn bullets) was tried on 2026-10-28 and dropped at his request; the translated bullets
  are kept in `docs/private/project-did.json`.
- Project dates are month ranges as on his LinkedIn (`from`/`to` 'YYYY-MM' | 'present', formatted
  per language); KCA = his «Түндүк» job dates, KuttukTime = first commit (neither is in LinkedIn's
  Projects).
- **Hero = a tactics board** (`widgets/home/ui/tactics-board`, 2026-10-29): 4-3-3, #7 as the holding
  midfielder; the ball loops through #7 in CSS (`.tactics-board__ball`, view-box units), a click on
  `PlayerStage` (data-celebrating) shoots at goal. It replaced a drawn juggling player — Alisher
  found hand-drawn figures crooked; don't bring a drawn character back. The card-front portrait
  (`PlayerPortrait`) is game-icons.net's «Soccer kick» by Delapouite (CC BY 3.0 — the footer credit
  line is required, keep it) after a cartoon face, a flat bust, a faceless silhouette and a
  bare number were each rejected (2026-10-29).
- `OffscreenPause` sets `data-paused` → CSS pauses all animations inside while off screen.
- `useInView(ref, rootMargin, initial)`: `initial` defaults to `true` (for pausing); pass `false`
  for deferred loading, or the work starts immediately.

## SEO

- Brand **Alisher Zhuman**; variants (Алишер Жуманов, Алишер Жуманов Бакирович, Alizher Zhuman) go
  to description, keywords and JSON-LD `alternateName`. All from `entities/profile`.
- Metadata in `[locale]/layout.tsx` (description and `og:locale` per language); **canonical and
  hreflang (`alternates.languages`, x-default → /ky) only in each page's `generateMetadata`** — a layout
  canonical would be stamped onto the 404. next-intl's hreflang `Link` header is off
  (`alternateLinks: false`) so there is one source. Next adds `noindex` to the 404 itself.
- `[locale]/opengraph-image.tsx` (next/og), one static PNG per locale — needs its own
  `generateStaticParams`, or the `[locale]` param makes it render on demand. Satori can't use next/font's WOFF2, so static
  TTFs live in `assets/fonts/` with their OFL licences.
- `sitemap.ts` lists every page (`PAGES`: home, /projects) in all three languages, each with its
  alternates. Add new pages there. The language menu links to the current path (`usePathname`). `robots.ts`, Person JSON-LD via `JsonLd` (escapes `<` per Next's guide).
- `app/llms.txt/route.ts` — llmstxt.org summary for AI assistants, built from `entities/*` data and the
  English messages (prerendered, like the sitemap). New pages go into its «Pages» list too.
- Origin from `NEXT_PUBLIC_SITE_URL` (`.env.example`), fallback `https://alisher-zhuman.vercel.app` (the production domain).
- `birthPlace: Талас` is an interpretation of «родом из Таласа» — not confirmed by the user.

## Lighthouse (2026-10-29, Lighthouse 13.5.0, production build)

| Page              | Perf | A11y | BP  | SEO |
| ----------------- | ---- | ---- | --- | --- |
| Home (ky) mobile  | 86   | 100  | 96  | 100 |
| Home (ky) desktop | 100  | 100  | 96  | 100 |
| /projects mobile  | 88   | 96   | 96  | 100 |
| 404 mobile        | 86   | 100  | 96  | 54  |

BP 96 everywhere locally is only the `_vercel/insights` 404 in the console (see Stack). /projects
A11y 96 is axe catching `.reveal` cards mid-fade (partial opacity at the viewport edge), not the
palette. Mobile Perf is the Lantern LCP estimate (see Gotchas).
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
- **404 under Cache Components is JS-only.** Unknown paths reach `[locale]/[...rest]`, whose
  `notFound()` leaves no prerendered shell: the server sends status 404 with an empty document and
  the client renders the localized page. Tried and rejected: awaiting `params` (status becomes 200),
  `NextResponse.rewrite(…, { status: 404 })` in the proxy (status ignored), no catch-all (Next's
  bare English 404), `global-not-found` (experimental). `generateMetadata` in `[locale]/not-found`
  is ignored, so the 404 has the site's default title.
- **Fonts must have the Kyrgyz letters Ң Ө Ү** (U+04A2/04E8/04AE + lowercase). A `cyrillic-ext`
  subset doesn't guarantee them: Unbounded has it and still lacks them, so the browser silently
  mixed in a fallback. Check the font's cmap (fontTools) before adopting one. Headlines use Science
  Gothic (variable, `axes: ['wdth']`, width 110 via `--font-display--font-variation-settings`); the
  OG image uses a static instance cut with `fontTools.varLib.instancer`. The build warning «Failed
  to find font override values for font `Science Gothic`» is harmless (`adjustFontFallback: false`
  doesn't silence it).
- Header menus (language, theme) are `<details>` + `useDetailsDismiss` (outside click, a chosen
  link/button, Escape). The open pill is solid, so its hover must not apply while open.
- Kyrgyz strings run long: the theme switcher shows icons below `sm` because «Күндүз / Авто /
  Кечинде» pushed the header past 390px. Check new header/UI copy in ky on a phone width.

## Deferred — decide later

- **Deploy: Vercel** — the repo is connected (2026-10-13), push to `main` deploys to
  https://alisher-zhuman.vercel.app (also the `SITE_URL` fallback, so no env var is needed there).
  On a custom domain, change the fallback or set `NEXT_PUBLIC_SITE_URL` in the project settings.
- Next 16.4.3 from 2026-11-06.
- Real resume PDF; rework the other blocks one stage at a time (list in `docs/private/chat-history.md`);
  confirm or drop `birthPlace`.
- ESLint 10 once eslint-config-next's plugins support it.
- `README.md` is still the create-next-app template — rewrite it (setup, scripts, structure).
