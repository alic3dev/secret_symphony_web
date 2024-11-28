import React from 'react'

import { ThreadLabel } from '@/components/ThreadLabel'

import styles from '@/components/layout/Sidebar.module.scss'

interface ThreadData {
  image?: string
  title: string
}

const threads: ThreadData[] = [
  {
    image: 'https://vite.dev/viteconf.svg',
    title: 'Some Person',
  },
  {
    title: 'Another Person',
  },
  {
    title: 'This other person',
  },
]

export function Sidebar(): React.ReactElement {
  const [selectedThread, setSelectedThread] = React.useState<number>(0)

  return (
    <div className={styles['side-bar']}>
      <h1 className={styles.header}>Threads</h1>

      {threads.map(
        (thread: ThreadData, index: number): React.ReactElement => (
          <ThreadLabel
            image={thread.image}
            title={thread.title}
            selected={selectedThread === index}
            onClick={(): void => setSelectedThread(index)}
            key={index}
          />
        ),
      )}
    </div>
  )
}
