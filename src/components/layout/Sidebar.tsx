import type { UUID } from 'crypto'

import type { ConversationData } from '@/types'

import React from 'react'

import { ConversationLabel } from '@/components/ConversationLabel'

import styles from '@/components/layout/Sidebar.module.scss'

export interface SidebarProps {
  conversations: ConversationData[]
  selectConversation: (newConversationId: UUID) => void
  selectedConversation: UUID
}

export function Sidebar({
  conversations,
  selectConversation,
  selectedConversation,
}: SidebarProps): React.ReactElement {
  return (
    <div className={styles['side-bar']}>
      <h1 className={styles.header}>Conversations</h1>

      {conversations.map(
        (conversation: ConversationData): React.ReactElement => (
          <ConversationLabel
            image={`/images/people/${conversation.from.image}`}
            title={conversation.from.name}
            selected={selectedConversation === conversation.from.id}
            onClick={(): void => selectConversation(conversation.from.id)}
            key={conversation.from.id}
          />
        ),
      )}
    </div>
  )
}
