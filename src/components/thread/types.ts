import type { UUID } from 'crypto'

/**
 * `from` | `to` is a confusing desingation
 *
 * Every message is both from and to
 *
 * For now `from` means from the OTHER party
 * and `to` means from YOURSELF.
 *
 * AKA `from`: incoming
 * and `to`: outgoing
 */
export type MessageDirection = 'from' | 'to'

export interface MessageData {
  content: string
  direction: MessageDirection
}

export interface ReplyMessageData {
  content: string
}

export interface ClientInfoData {
  name: string
  image?: string
}

export interface ThreadData {
  id: UUID
  from: ClientInfoData
  messages: MessageData[]
}
