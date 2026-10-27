interface Props {
  // Translated by the caller: shared stays free of next-intl.
  label: string
}

// Must be the first focusable element in the document. Every page's <main> carries id="main".
export const SkipLink = ({ label }: Props) => (
  <a
    href="#main"
    className="bg-sun text-sun-foreground fixed top-2 left-4 z-50 -translate-y-24 rounded-md px-4 py-2 font-semibold focus:translate-y-0 motion-safe:transition-transform"
  >
    {label}
  </a>
)
