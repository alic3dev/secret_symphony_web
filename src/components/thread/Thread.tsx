import type { MessageData } from '@/components/thread/types'

import React from 'react'

import { ThreadMessage } from '@/components/thread/ThreadMessage'

import styles from '@/components/thread/Thread.module.scss'

interface ThreadProps {
  images: {
    from?: string
    to?: string
  }
  messages: MessageData[]
}

export function Thread({ messages, images }: ThreadProps): React.ReactElement {
  const messagesContainerRef = React.useRef<HTMLDivElement>(null)
  const previousScrollRef = React.useRef<{
    scrollTop: number
    scrollHeight: number
    clientHeight: number
  }>({
    scrollHeight: 0,
    scrollTop: 0,
    clientHeight: 0,
  })

  const setMessagesScroll: (offset?: number) => void = React.useCallback(
    (offset: number = 0): void => {
      if (!messagesContainerRef.current) {
        return
      }

      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      }: { scrollTop: number; scrollHeight: number; clientHeight: number } =
        messagesContainerRef.current

      if (
        scrollTop + clientHeight >=
        previousScrollRef.current.scrollHeight - offset
      ) {
        messagesContainerRef.current.scrollTop = scrollHeight
      }

      previousScrollRef.current.scrollHeight = scrollHeight
      previousScrollRef.current.scrollTop = scrollTop
      previousScrollRef.current.clientHeight = clientHeight
    },
    [],
  )

  React.useEffect((): void => {
    setMessagesScroll(Infinity)
  }, [setMessagesScroll])

  React.useEffect((): void => {
    setTimeout((): void => {
      setMessagesScroll(100)
    }, 0)
  }, [messages, setMessagesScroll])

  return (
    <div className={styles.thread}>
      <div ref={messagesContainerRef} className={styles['messages-container']}>
        <div className={styles.messages}>
          {messages.map(
            (message: MessageData, index: number): React.ReactElement => (
              <div key={index}>
                <ThreadMessage
                  content={message.content}
                  direction={message.direction}
                  image={images[message.direction]}
                />
              </div>
            ),
          )}
        </div>
      </div>

      <div className={styles.reply}>
        <input
          className={styles['reply-input']}
          type="text"
          placeholder="Type your message"
        />
        <button className={styles['reply-submit']} type="submit" />
      </div>
    </div>
  )
}
