// Keys of Projects.items in messages/*.json, where each project's context and description live.
export type ProjectId = 'kcaPublic' | 'kcaAdmin' | 'weather' | 'portfolio'

export interface Project {
  id: ProjectId
  // Shirt number printed in the corner. Decorative only.
  number: number
  // Product names stay as they are in every language.
  title: string
  isWork: boolean
  stack: string[]
  // A backend repository touched alongside the frontend work, highlighted in the stack list.
  backendRepo?: string
  // Public source code. Without one the card says the code is closed.
  codeUrl?: string
}
