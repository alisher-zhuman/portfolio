// The header menu pill's arrow; turns over while its <details> (a `group`) is open.
export const MenuChevron = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5 fill-none stroke-current transition-transform group-open:rotate-180 max-sm:hidden"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)
