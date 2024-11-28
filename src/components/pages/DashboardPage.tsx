import type { MessageData } from '@/components/thread/types'

import React from 'react'

import { Header, Sidebar } from '@/components/layout'
import { Thread } from '@/components/thread'

import styles from '@/components/pages/DashboardPage.module.scss'

const mockMessages: MessageData[] = [
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
]

import _wordList from '@/data/wordlists/english.json'
const wordList: string[] = _wordList as string[]

function generateRandomMessage(): MessageData {
  let content: string = ''
  const contentWords: number = Math.floor(Math.random() * 100)

  for (let i: number = 0; i < contentWords; i++) {
    content += ` ${wordList[Math.floor(Math.random() * wordList.length)]}`
  }

  return {
    content,
    direction: Math.random() > 0.5 ? 'to' : 'from',
  }
}

export function DashboardPage(): React.ReactElement {
  const [messages, setMessages] = React.useState<MessageData[]>([
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
  ])

  React.useEffect((): (() => void) => {
    let timeoutId: number

    const sendRandomMessage = (): void => {
      timeoutId = window.setTimeout((): void => {
        setMessages((prevMessages: MessageData[]): MessageData[] => {
          return [...prevMessages, generateRandomMessage()]
        })

        sendRandomMessage()
      }, Math.random() * 500 + 100)
    }

    sendRandomMessage()

    return (): void => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <Header />

      <div className={styles.content}>
        <Sidebar />

        <Thread
          images={{ from: 'https://vite.dev/viteconf.svg', to: '' }}
          messages={messages}
        />
      </div>
    </>
  )
}
