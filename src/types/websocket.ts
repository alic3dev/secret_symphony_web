import type { UUID } from 'crypto'

export type WebSocketReceivedMessageDataAction =
  | 'authentication-result'
  | 'message-received'
  | 'message-send-result'

interface WebSocketReceivedMessageDataBase {
  action: WebSocketReceivedMessageDataAction
}

export interface WebSocketReceivedMessageDataAuthenticationResult
  extends WebSocketReceivedMessageDataBase {
  action: 'authentication-result'
  valid: boolean
}

export interface WebSocketReceivedMessageMessageSendResult
  extends WebSocketReceivedMessageDataBase {
  action: 'message-send-result'
  id: UUID
  success: boolean
}

export interface WebSocketReceivedMessageMessageReceived
  extends WebSocketReceivedMessageDataBase {
  action: 'message-received'
  sent_from_id: UUID
  content: string
  time: number
}

export type WebSocketReceivedMessageData =
  | WebSocketReceivedMessageDataAuthenticationResult
  | WebSocketReceivedMessageMessageSendResult
  | WebSocketReceivedMessageMessageReceived
