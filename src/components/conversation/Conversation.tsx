import type { MessageData, ReplyMessageData, UserFull } from '@/types'

import React from 'react'

import { ConversationMessage } from '@/components/conversation/ConversationMessage'

import styles from '@/components/conversation/Conversation.module.scss'

interface ConversationProps {
  user?: UserFull
  images: {
    from?: string
    to?: string
  }
  messages: MessageData[]
  sendMessage: (replyMessageData: ReplyMessageData) => void
}

export function Conversation({
  user,
  messages,
  images,
  sendMessage,
}: ConversationProps): React.ReactElement {
  const [replyText, setReplyText] = React.useState<string>('')

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

  const onSendSubmit = React.useCallback<
    React.FormEventHandler<HTMLFormElement>
  >(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      event.stopPropagation()

      if (!replyText.length) {
        return
      }

      sendMessage({
        content: replyText,
        time: Date.now(), // FIXME: This should be set by the server, should reflect states of "unsent" | "sending" | "error", etc...
      })

      setReplyText('')
    },
    [replyText, sendMessage],
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
    <div className={styles.conversation}>
      <div ref={messagesContainerRef} className={styles['messages-container']}>
        <div className={styles.messages}>
          {messages.map(
            (message: MessageData, index: number): React.ReactElement => (
              <div key={index}>
                <ConversationMessage
                  title={
                    message.sent_from_id === window.identity.id
                      ? window.identity.name
                      : user?.name
                  }
                  time={message.time}
                  content={message.content}
                  direction={
                    message.sent_from_id === window.identity.id ? 'to' : 'from'
                  }
                  image={
                    images[
                      message.sent_from_id === window.identity.id
                        ? 'to'
                        : 'from'
                    ]
                  }
                />
              </div>
            ),
          )}
        </div>
      </div>

      <form className={styles.reply} onSubmit={onSendSubmit}>
        <input
          className={styles['reply-input']}
          type="text"
          placeholder="Type your message"
          value={replyText}
          onChange={(event): void => setReplyText(event.currentTarget.value)}
        />
        <button className={styles['reply-submit']} type="submit" />
      </form>
    </div>
  )
}
