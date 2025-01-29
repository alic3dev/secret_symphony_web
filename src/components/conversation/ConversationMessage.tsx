import type { MessageDirection } from '@/types'

import React from 'react'

import { ImageBubble } from '@/components/ImageBubble'

import { format_date } from '@/utils/format_date'

import styles from '@/components/conversation/ConversationMessage.module.scss'

interface ConversationMessageProps {
  title?: string
  image?: string
  time: number
  content: string
  direction: MessageDirection
}

export function ConversationMessage({
  title,
  image,
  time,
  content,
  direction,
}: ConversationMessageProps): React.ReactElement {
  const image_bubble = React.useMemo<React.ReactElement>(
    (): React.ReactElement => (
      <div className={styles['bubble-wrapper']}>
        <ImageBubble
          title={title}
          src={image}
          href={direction === 'to' ? '/account' : undefined}
        />
      </div>
    ),
    [title, image, direction],
  )

  const time_display = React.useMemo<string>(
    (): string => format_date({ date: new Date(time) }),
    [time],
  )

  return (
    <div
      className={`${styles.message} ${
        direction === 'from' ? styles.from : styles.to
      }`}
    >
      {direction === 'from' ? image_bubble : <></>}

      <div className={styles['content-wrapper']}>
        <p className={styles.content}>{content}</p>
        <div className={styles['content-time']}>{time_display}</div>
      </div>

      {direction === 'to' ? image_bubble : <></>}
    </div>
  )
}
