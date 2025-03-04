import type { UUID } from 'crypto'

import type { UserFull } from './user'

export interface MessageData {
  content: string
  sent_from_id: UUID
  time: number
}

export interface ReplyMessageData {
  content: string
  time: number
}

export interface ConversationData {
  from: UserFull
  messages: MessageData[]
}
