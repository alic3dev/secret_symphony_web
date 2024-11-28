import type { UUID } from 'crypto'

import type { ThreadData } from '@/components/thread/types'

import React from 'react'

import { ThreadLabel } from '@/components/ThreadLabel'

import styles from '@/components/layout/Sidebar.module.scss'

export interface SidebarProps {
  threads: ThreadData[]
  selectThread: (newThreadId: UUID) => void
  selectedThread: UUID
}

export function Sidebar({
  threads,
  selectThread,
  selectedThread,
}: SidebarProps): React.ReactElement {
  return (
    <div className={styles['side-bar']}>
      <h1 className={styles.header}>Threads</h1>

      {threads.map(
        (thread: ThreadData): React.ReactElement => (
          <ThreadLabel
            image={thread.from.image}
            title={thread.from.name}
            selected={selectedThread === thread.id}
            onClick={(): void => selectThread(thread.id)}
            key={thread.id}
          />
        ),
      )}
    </div>
  )
}
