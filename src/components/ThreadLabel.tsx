import React from 'react'

import styles from '@/components/ThreadLabel.module.scss'
import { ImageBubble } from './ImageBubble'

export interface ThreadLabelProps {
  image?: string
  title: string
  selected?: boolean

  onClick?: () => void
}

export function ThreadLabel({
  image,
  title,
  selected = false,
  onClick = () => {},
}: ThreadLabelProps): React.ReactElement {
  return (
    <div
      className={`${styles['thread-label']} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <ImageBubble src={image} />
      <div className={styles.title}>{title}</div>
    </div>
  )
}
