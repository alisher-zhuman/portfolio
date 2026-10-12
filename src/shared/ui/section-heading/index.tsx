interface Props {
  // Lets the parent <section> point aria-labelledby at the heading.
  id: string
  title: string
  lead?: string
}

export const SectionHeading = ({ id, title, lead }: Props) => (
  <div className="mb-8 max-w-prose">
    <h2 id={id} className="font-display text-3xl font-bold text-balance sm:text-4xl">
      {title}
    </h2>

    {lead && <p className="text-on-pitch-muted mt-2.5">{lead}</p>}
  </div>
)
