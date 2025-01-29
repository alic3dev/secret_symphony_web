import React from 'react'
import { Link } from 'react-router'

import styles from '@/components/ImageBubble.module.scss'

export interface ImageBubbleProps {
  src?: string
  href?: string
  title?: string
  large?: boolean
}

export function ImageBubble(parameters: ImageBubbleProps): React.ReactElement {
  const image: React.ReactElement = React.useMemo(() => {
    return <img src={parameters.src} alt={parameters.title} />
  }, [parameters.src, parameters.title])

  if (parameters.href) {
    return (
      <Link
        to={parameters.href}
        className={`${styles['image-wrapper']}  ${
          parameters.large ? styles.large : ''
        }`}
      >
        {image}
      </Link>
    )
  }

  return (
    <div
      className={`${styles['image-wrapper']} ${
        parameters.large ? styles.large : ''
      }`}
    >
      {image}
    </div>
  )
}
