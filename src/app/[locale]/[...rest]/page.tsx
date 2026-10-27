import { notFound } from 'next/navigation'

// Any path under a locale that no other route matches (/ky/abc) renders the localized 404 —
// [locale]/not-found.tsx only catches notFound() calls, not unmatched URLs.
// Known limit under Cache Components: an unlisted path has no prerendered shell, so the server
// answers with status 404 and an empty document that the client fills in. The page works with
// JavaScript only; global-not-found would fix it but is still experimental.
const CatchAllPage = () => notFound()

export default CatchAllPage
