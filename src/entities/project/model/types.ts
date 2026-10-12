export interface Project {
  // Shirt number printed in the corner. Decorative only.
  number: number
  title: string
  // Plain-language context, e.g. "Рабочий проект в «Түндүк»".
  context: string
  isWork: boolean
  description: string
  stack: string[]
  // A backend repository touched alongside the frontend work, highlighted in the stack list.
  backendRepo?: string
  link?: {
    href: string
    label: string
  }
  // Shown instead of a link when the code can't be published.
  linkNote?: string
}
