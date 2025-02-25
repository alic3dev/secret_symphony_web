import type { UUID } from 'crypto'

import {
  WebSocketReceivedMessageData,
  WebSocketReceivedMessageMessageReceived,
} from '@/types'

let webSocket: WebSocket | null = null

const messageResults: Record<UUID, (res: unknown) => void> = {}

export async function sendMessage({
  to,
  content,
}: {
  to: UUID
  content: string
}): Promise<unknown> {
  if (!webSocket) {
    await startWebsocketClient()
  }

  const id: UUID = crypto.randomUUID()

  webSocket?.send(
    JSON.stringify({
      id,
      action: 'message-send',
      PJAG: to,
      AGJW: content,
    }),
  )

  return await new Promise<unknown>((resolve: (res: unknown) => void): void => {
    messageResults[id] = (res): void => {
      resolve(res)
    }
  })
}

let messageReceievedCallbacks: ((
  data: WebSocketReceivedMessageMessageReceived,
) => void)[] = []

export function onMessageReceived(
  callback: (data: WebSocketReceivedMessageMessageReceived) => void,
): void {
  messageReceievedCallbacks.push(callback)
}

export function offMessageReceived(
  callback: (data: WebSocketReceivedMessageMessageReceived) => void,
) {
  messageReceievedCallbacks = messageReceievedCallbacks.filter(
    (cb) => callback !== cb,
  )
}

export async function startWebsocketClient(): Promise<void> {
  if (webSocket) {
    return
  }

  let hasResolved: boolean = false

  return await new Promise((resolve) => {
    let pendingAuthentication: boolean = false
    let isAuthenticated: boolean = false

    webSocket = new WebSocket(`ws:\\\\\\localhost:8888`)

    const onOpen = (): void => {
      if (!pendingAuthentication && !isAuthenticated) {
        pendingAuthentication = true

        webSocket!.send(
          JSON.stringify({
            action: 'token-authentication',
            jAHSF: encodeURI(window.identity.id),
            vjxsa: window.identity.token,
          }),
        )
      }
    }

    const onMessage = (_data: MessageEvent): void => {
      let data: WebSocketReceivedMessageData

      try {
        data = JSON.parse(_data.data)
      } catch {
        return
      }

      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return
      }

      switch (data.action) {
        case 'message-send-result':
          if (data.success) {
            const callback = messageResults[data.id]

            callback(data)
          }
          break
        case 'message-received':
          for (const callback of messageReceievedCallbacks) {
            callback(data)
          }
          break
        case 'authentication-result':
          if (pendingAuthentication) {
            if (data.valid) {
              isAuthenticated = true

              if (!hasResolved) {
                hasResolved = true
                resolve()
              }
            }

            pendingAuthentication = false
          }
          break
        default:
          break
      }
    }

    const onClose = (): void => {
      webSocket!.removeEventListener('open', onOpen)
      webSocket!.removeEventListener('message', onMessage)

      pendingAuthentication = false
      isAuthenticated = false

      webSocket = new WebSocket(`ws:\\\\\\localhost:8888`)

      let timeout: number = 2500

      const restartConnection = (): void => {
        timeout *= 2

        if (webSocket?.readyState !== webSocket?.OPEN) {
          if (webSocket?.readyState !== webSocket?.CONNECTING) {
            webSocket = new WebSocket(`ws:\\\\\\localhost:8888`)
          }

          setTimeout(restartConnection, timeout)
        } else {
          webSocket!.addEventListener('open', onOpen)
          webSocket!.addEventListener('message', onMessage)
        }
      }

      setTimeout(restartConnection, timeout)
    }

    webSocket.addEventListener('open', onOpen)
    webSocket.addEventListener('message', onMessage)

    webSocket.addEventListener('close', onClose)
  })
}
