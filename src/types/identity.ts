import type { UUID } from 'crypto'

export interface StoredId {
  id: UUID
  token: string
  name?: string
  image?: string
  pronouns?: string[]
}
