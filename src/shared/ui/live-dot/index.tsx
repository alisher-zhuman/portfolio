// Pulsing red dot for something still in progress. Purely visual: the text beside it says so.
export const LiveDot = () => (
  <span
    aria-hidden="true"
    className="bg-kit animate-live-pulse mr-2 inline-block size-2.5 rounded-full align-middle"
  />
)
