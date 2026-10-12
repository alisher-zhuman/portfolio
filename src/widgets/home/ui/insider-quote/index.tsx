// "Here we go?" set as a speech bubble quoted from an insider rather than as an accent inside the
// headline — it is a quote in the transfer-news genre, so it gets a quote's structure.
export const InsiderQuote = () => (
  <figure className="mt-3.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
    <blockquote className="bg-on-pitch text-pitch font-display rounded-2xl rounded-bl-sm px-3.5 py-1.5 text-xl font-bold">
      <p lang="en">Here we go?</p>
    </blockquote>

    <figcaption className="text-on-pitch-muted text-sm">— источник, близкий к игроку</figcaption>
  </figure>
)
