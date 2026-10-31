# Alisher Zhuman — portfolio

Personal site of Alisher Zhuman, a frontend developer moving into backend, styled as a football
matchday: the page is a pitch, the hero is a tactics board, the bio is a collectible player card
and the career is a match timeline. In Kyrgyz (default), Russian and English.

Live: [alisher-zhuman.vercel.app](https://alisher-zhuman.vercel.app)

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack, Cache Components) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [next-intl](https://next-intl.dev) — `ky`, `ru`, `en`
- [Zustand](https://zustand.docs.pmnd.rs) — client state (theme, sound, toasts)
- Feature-Sliced Design — `src/` architecture
- pnpm, ESLint, Prettier, [Steiger](https://github.com/feature-sliced/steiger) (FSD linter),
  [Lefthook](https://github.com/evilmartians/lefthook) (git hooks)
- Deployed on [Vercel](https://vercel.com); every push to `main` goes to production

No animation, sound or confetti libraries: the synthesiser is Web Audio, page transitions are
React's `<ViewTransition>`, scroll reveals are CSS view timelines.

## Getting started

Requires the Node version from `.nvmrc` (`nvm use`) and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). `.env.example` lists the only variable,
`NEXT_PUBLIC_SITE_URL`; it is optional and falls back to the production domain.

## Commands

| Command          | What it does                         |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | Dev server                           |
| `pnpm build`     | Production build                     |
| `pnpm start`     | Serve the production build           |
| `pnpm typecheck` | `tsc --noEmit`                       |
| `pnpm lint`      | ESLint (`lint:fix` to fix)           |
| `pnpm format`    | Prettier `--write` (`format:check`)  |
| `pnpm steiger`   | FSD architecture check               |
| `pnpm test`      | Vitest (`test:run` for a single run) |

The `pre-push` hook runs `typecheck`, `lint`, `steiger`, `format:check` and `test:run` in parallel.

## Structure

Feature-Sliced Design, layers bottom to top: `shared` → `entities` → `features` → `widgets` →
`app`. A layer imports only from layers below it, through each slice's `index.ts`.

```
messages/          ky.json, ru.json (the typed source), en.json — all UI copy
src/
  app/             routes: [locale]/ pages, OG image, sitemap, robots, llms.txt
  i18n/            next-intl routing, request config, navigation
  widgets/         layout (header, footer), home sections, projects catalog
  features/        cheat-code, penalty-shootout (the 404 game)
  entities/        profile, career, project — typed data and their basic UI
  shared/          ui kit, hooks, stores, audio, helpers
assets/fonts/      static TTFs for the OG image, with their OFL licences
```

Texts live in `messages/`; structure (ids, dates, links, stack) lives in
`src/entities/*/model/data.ts`.

## Working with AI assistants

`CLAUDE.md` and `AGENTS.md` at the root hold the full project context for Claude Code and similar
tools: conventions, decisions and the gotchas that cost time.

## Credits

- Player icon on the card: «Soccer kick» by
  [Delapouite](https://game-icons.net/1x1/delapouite/soccer-kick.html), game-icons.net, CC BY 3.0
- Fonts: [Science Gothic](https://fonts.google.com/specimen/Science+Gothic) and
  [Golos Text](https://fonts.google.com/specimen/Golos+Text), SIL Open Font License
