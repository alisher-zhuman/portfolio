interface Props {
  // Lets the parent <section> point aria-labelledby at the heading.
  id: string
  title: string
  lead?: string
  // h1 on a page whose main heading this is; h2 for a homepage section.
  as?: 'h1' | 'h2'
}

export const SectionHeading = ({ id, title, lead, as: Heading = 'h2' }: Props) => (
  <div className="mb-8 max-w-prose">
    <Heading id={id} className="font-display text-3xl font-bold text-balance sm:text-4xl">
      {title}
    </Heading>

    {lead && <p className="text-on-pitch-muted mt-2.5">{lead}</p>}
  </div>
)
