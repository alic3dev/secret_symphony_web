import type { MessageDirection } from '@/types'

import React from 'react'

import styles from '@/components/conversation/ConversationMessage.module.scss'
import { ImageBubble } from '../ImageBubble'

interface ConversationMessageProps {
  image?: string
  content: string
  direction: MessageDirection
}

export function ConversationMessage({
  image,
  content,
  direction,
}: ConversationMessageProps): React.ReactElement {
  return (
    <div
      className={`${styles.message} ${
        direction === 'from' ? styles.from : styles.to
      }`}
    >
      <div className={styles['bubble-wrapper']}>
        {direction === 'from' ? <ImageBubble src={image} /> : <></>}
      </div>

      <p className={styles.content}>{content}</p>

      <div className={styles['bubble-wrapper']}>
        {direction === 'to' ? <ImageBubble src={image} /> : <></>}
      </div>
    </div>
  )
}
