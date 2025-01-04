import type { UUID } from 'crypto'

import type { MessageData, ReplyMessageData, ConversationData } from '@/types'

import React from 'react'

import { Header, Sidebar } from '@/components/layout'
import { Conversation } from '@/components/conversation'

import { transmit } from '@/utils/wire/transmit'

import styles from '@/components/pages/DashboardPage.module.scss'

// const ws = new WebSocket("ws:\\\localhost:8888");
// ws.addEventListener("message", (data) => console.log(data))

export interface DashboardProps {
  conversations: ConversationData[]
}

export function Dashboard({
  conversations,
}: DashboardProps): React.ReactElement {
  const [refreshKey, setRefreshKey] = React.useState<number>(0)
  const refresh = React.useCallback((): void => {
    setRefreshKey(
      (previousRefreshKey: number): number => previousRefreshKey + 1,
    )
  }, [])

  const [selectedConversation, setSelectedConversation] = React.useState<UUID>(
    conversations[0].from.id,
  )

  const conversationData = React.useMemo<ConversationData | undefined>(
    (): ConversationData | undefined =>
      conversations.find(
        (conversation: ConversationData): boolean =>
          conversation.from.id === selectedConversation,
      ),
    [conversations, selectedConversation],
  )

  const [newMessages, setNewMessages] = React.useState<MessageData[]>([])

  React.useEffect((): undefined | (() => void) => {
    if (!conversationData) return

    let aborted: boolean = false

    transmit('/conversation/get_conversation', {
      id: conversationData.from.id,
    })
      .then(
        (
          res: Response,
        ): Promise<{ data: { messages: MessageData[] } }> | undefined => {
          if (aborted) return

          return res.json() as Promise<{ data: { messages: MessageData[] } }>
        },
      )
      .then((data: undefined | { data: { messages: MessageData[] } }): void => {
        if (aborted || !data) return

        setNewMessages((prevNewMessages) => [
          ...prevNewMessages,
          ...data.data.messages,
        ])
      })

    return (): void => {
      aborted = true
    }
  }, [conversationData, refresh])

  const messages = React.useMemo<MessageData[]>(
    (): MessageData[] => [
      ...(conversationData?.messages ?? []),
      ...newMessages,
    ],
    [conversationData, newMessages],
  )

  const selectConversation = React.useCallback(
    (selectedConversationId: UUID): void => {
      setSelectedConversation(selectedConversationId)
      setNewMessages([])
    },
    [],
  )

  const sendMessage = React.useCallback(
    (replyMessageData: ReplyMessageData): void => {
      if (conversationData) {
        transmit('/conversation/speak_in_conversation', {
          id: conversationData.from.id,
          ...replyMessageData,
        })

        setNewMessages((prevNewMessages: MessageData[]): MessageData[] => [
          ...prevNewMessages,
          { direction: 'to', ...replyMessageData },
        ])
      }
    },
    [conversationData],
  )

  return (
    <React.Fragment key={refreshKey}>
      <Header />

      <div className={styles.content}>
        <Sidebar
          conversations={conversations}
          selectConversation={selectConversation}
          selectedConversation={selectedConversation}
        />

        <Conversation
          images={{
            from: `/images/people/${conversationData?.from.image}`,
            to: `/images/people/${window.identity.image}`,
          }}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    </React.Fragment>
  )
}

export function DashboardPage(): React.ReactElement {
  const [conversations, setConversations] = React.useState<
    ConversationData[] | null
  >(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect((): (() => void) => {
    let aborted: boolean = false

    transmit('/dashboard/load_dashboard', {})
      .then(
        (
          res: Response,
        ): Promise<{ conversations: ConversationData[] }> | undefined => {
          if (aborted) return

          return res.json()
        },
      )
      .then((data: { conversations: ConversationData[] } | undefined): void => {
        if (aborted) return

        if (
          !data ||
          typeof data !== 'object' ||
          Array.isArray(data) ||
          !Array.isArray(data.conversations)
        ) {
          setError('Invalid data returned from server')
          return
        }

        setConversations(data.conversations)
      })

    return (): void => {
      aborted = true
    }
  }, [])

  if (error !== null) {
    return <p>{error}</p>
  } else if (conversations === null) {
    return <p>Loading...</p>
  } else {
    return <Dashboard conversations={conversations} />
  }
}
