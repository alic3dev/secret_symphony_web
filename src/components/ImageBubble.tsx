import React from 'react'

import styles from '@/components/ImageBubble.module.scss'

export interface ImageBubbleProps {
  src?: string
}

export function ImageBubble({ src }: ImageBubbleProps): React.ReactElement {
  return (
    <div className={styles['image-wrapper']}>
      <img src={src} />
    </div>
  )
}
