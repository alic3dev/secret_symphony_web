import type { UUID } from 'crypto'

export interface Person {
  id: UUID
  name: string
  description: string
}
