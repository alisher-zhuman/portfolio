'use client'

interface Props {
  html: string
}

// React warns in dev when a <script> renders from a component, because scripts inserted by
// client-side DOM updates never execute — only the server HTML parsed by the browser does.
// type="text/plain" on the client makes React skip it; suppressHydrationWarning covers the type
// mismatch. Pattern from Next's preventing-flash-before-hydration guide.
export const InlineScript = ({ html }: Props) => (
  <script
    type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
    suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: html }}
  />
)
