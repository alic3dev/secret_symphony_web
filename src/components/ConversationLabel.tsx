import React from 'react'

import { ImageBubble } from '@/components/ImageBubble'

import styles from '@/components/ConversationLabel.module.scss'

export interface ConversationLabelProps {
  image?: string
  title: string
  selected?: boolean

  onClick?: () => void
}

export function ConversationLabel({
  image,
  title,
  selected = false,
  onClick = () => {},
}: ConversationLabelProps): React.ReactElement {
  return (
    <div
      className={`${styles['conversation-label']} ${
        selected ? styles.selected : ''
      }`}
      onClick={onClick}
    >
      <ImageBubble src={image} />
      <div className={styles.title}>{title}</div>
    </div>
  )
}
