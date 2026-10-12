interface Props {
  data: Record<string, unknown>
}

// Structured data as a <script>, per Next's JSON-LD guide. JSON.stringify doesn't escape HTML, so
// every "<" becomes < — otherwise a "</script>" inside any string would end the tag early.
export const JsonLd = ({ data }: Props) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
)
