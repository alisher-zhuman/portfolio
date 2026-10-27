import { defineRouting } from 'next-intl/routing'

// Kyrgyz first: it is the default and what `/` redirects to when the browser asks for nothing
// better. Every page lives under a locale prefix (/ky, /ru, /en), same as kca.
export const routing = defineRouting({
  locales: ['ky', 'ru', 'en'],
  defaultLocale: 'ky',
  // next-intl's default cookie has no Secure flag. Env-gated rather than `true`, because a browser
  // silently refuses to store a Secure cookie over plain-http dev, and the choice would stop sticking.
  localeCookie: { secure: process.env.NODE_ENV === 'production' },
  // hreflang lives in each page's metadata (alternates.languages), next to its canonical. The
  // proxy's `Link` header would be a second, separately maintained copy of the same set.
  alternateLinks: false,
})
