import type { UUID } from 'crypto'

import type { ConversationData } from '@/types'

import React from 'react'

import { ConversationLabel } from '@/components/conversation/ConversationLabel'

import { wire } from '@/utils/wire'

import styles from '@/components/layout/Sidebar.module.scss'

export interface SidebarProps {
  conversations: ConversationData[]
  selectConversation: (newConversationId: UUID) => void
  selectedConversation: UUID | null
}

export function Sidebar({
  conversations,
  selectConversation,
  selectedConversation,
}: SidebarProps): React.ReactElement {
  const [inviteCodeError, setInviteCodeError] = React.useState<string | null>(
    null,
  )

  const useInviteCode = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      event.stopPropagation()

      const formData = new FormData(event.currentTarget)

      wire
        .transmit('conversation/use_invite_code', {
          inviteCode: formData.get('invite-code'),
        })
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            setInviteCodeError('Something went wrong')
            return
          }

          if (data.error) {
            setInviteCodeError(data.error)
            return
          }

          if (!data.success) {
            setInviteCodeError('Something went wrong')
            return
          }

          window.location.reload()
        })
        .catch((): void => {
          setInviteCodeError('Something went wrong')
        })
    },
    [],
  )

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

      <form onSubmit={useInviteCode} className={styles['invite-form']}>
        {inviteCodeError ? <p>{inviteCodeError}</p> : <></>}
        <input
          name="invite-code"
          type="text"
          placeholder="Invite Code"
          className={styles['invite-input']}
        />
        <button type="submit" className={styles['invite-button']}>
          +
        </button>
      </form>
    </div>
  )
}
