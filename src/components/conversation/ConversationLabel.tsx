import React from 'react'

import { ImageBubble } from '@/components/ImageBubble'

import styles from '@/components/conversation/ConversationLabel.module.scss'

export interface ConversationLabelProps {
  image?: string
  href?: string
  title: string
  selected?: boolean

  onClick?: () => void
}

export function ConversationLabel({
  image,
  href,
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
      <ImageBubble src={image} href={href} />
      <div className={styles.title}>{title}</div>
    </div>
  )
}
