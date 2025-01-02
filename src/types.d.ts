import type { UUID } from 'node:crypto'

declare global {
  interface Window {
    id: UUID | null
    token: string | null
  }
}
