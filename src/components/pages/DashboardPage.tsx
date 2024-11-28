import type { UUID } from 'crypto'

import type {
  MessageData,
  ReplyMessageData,
  ThreadData,
} from '@/components/thread/types'

import React from 'react'

import { Header, Sidebar } from '@/components/layout'
import { Thread } from '@/components/thread'

import styles from '@/components/pages/DashboardPage.module.scss'

const mockThreads: ThreadData[] = [
  {
    id: crypto.randomUUID(),
    from: {
      image: 'https://vite.dev/viteconf.svg',
      name: 'Some Person',
    },
    messages: [
      {
        content: 'This is the starting message',
        direction: 'to',
      },
      {
        content: 'Well hello',
        direction: 'from',
      },
      {
        content: '...who is this?',
        direction: 'from',
      },
      {
        content: 'Alice lol',
        direction: 'to',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    from: {
      name: 'Another Person',
    },
    messages: [],
  },
  {
    id: crypto.randomUUID(),
    from: {
      name: 'The third Person',
    },
    messages: [],
  },
]

import _wordList from '@/data/wordlists/english.json'
const wordList: string[] = _wordList as string[]

const DEV_SEND_RANDOM_MESSAGES: boolean = true

function generateRandomMessage(): MessageData {
  let content: string = ''
  const contentWords: number = Math.floor(Math.random() * 100)

  for (let i: number = 0; i < contentWords; i++) {
    content += ` ${wordList[Math.floor(Math.random() * wordList.length)]}`
  }

  return {
    content,
    direction: Math.random() > 0.6 ? 'to' : 'from',
  }
}

export function DashboardPage(): React.ReactElement {
  const [selectedThread, setSelectedThread] = React.useState<UUID>(
    mockThreads[0].id,
  )

  const threadData = React.useMemo<ThreadData | undefined>(
    (): ThreadData | undefined =>
      mockThreads.find(
        (thread: ThreadData): boolean => thread.id === selectedThread,
      ),
    [selectedThread],
  )

  const [newMessages, setNewMessages] = React.useState<MessageData[]>([])

  const messages = React.useMemo<MessageData[]>(
    (): MessageData[] => [...(threadData?.messages ?? []), ...newMessages],
    [threadData, newMessages],
  )

  React.useEffect((): (() => void) => {
    let timeoutId: number

    const sendRandomMessage = (): void => {
      timeoutId = window.setTimeout((): void => {
        if (DEV_SEND_RANDOM_MESSAGES) {
          setNewMessages((prevNewMessages: MessageData[]): MessageData[] => {
            return [...prevNewMessages, generateRandomMessage()]
          })
        }

        sendRandomMessage()
      }, Math.random() * 10000 + 1000)
    }

    sendRandomMessage()

    return (): void => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  const selectThread = React.useCallback((newThreadId: UUID): void => {
    setSelectedThread(newThreadId)
    setNewMessages([])
  }, [])

  const sendMessage = React.useCallback(
    (replyMessageData: ReplyMessageData): void => {
      setNewMessages((prevNewMessages: MessageData[]): MessageData[] => [
        ...prevNewMessages,
        { direction: 'to', ...replyMessageData },
      ])
    },
    [],
  )

  return (
    <>
      <Header />

      <div className={styles.content}>
        <Sidebar
          threads={mockThreads}
          selectThread={selectThread}
          selectedThread={selectedThread}
        />

        <Thread
          images={{ from: threadData?.from.image, to: '/thread-image.jpeg' }}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    </>
  )
}
