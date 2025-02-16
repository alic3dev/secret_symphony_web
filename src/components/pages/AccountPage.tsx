import React from 'react'

import type { LoadDataInitialOnResultResult } from '@/types'

import { Header } from '@/components/layout'

import { wire } from '@/utils/wire'
import { storeId } from '@/utils/identity'

import styles from '@/components/pages/AccountPage.module.scss'
import { ImageBubble } from '../ImageBubble'
import { useLoad_data_initial } from '@/hooks/use_load_data_initial'

interface GetInviteCodesInitialDataResult {
  inviteCodes: string[]
}

export function AccountPage(): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [hasUpdatedPassword, setHasUpdatePassword] =
    React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  const [inviteCodes, setInviteCodes] = React.useState<string[]>([])

  const onFormSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      setHasUpdatePassword(false)
      setError(null)

      const formData: FormData = new FormData(event.currentTarget)

      const passwordCurrent: FormDataEntryValue | null =
        formData.get('password-current')
      const passwordNew: FormDataEntryValue | null =
        formData.get('password-new')
      const passwordRetypedNew: FormDataEntryValue | null = formData.get(
        'password-retyped-new',
      )

      if (
        !passwordCurrent ||
        !passwordNew ||
        passwordNew !== passwordRetypedNew ||
        typeof passwordNew !== 'string' ||
        passwordNew?.length <= 5
      ) {
        setError("Password doesn't match the requirements")
        return
      }

      setIsLoading(true)

      wire
        .transmit('/account/update_password', {
          passwordCurrent,
          passwordNew,
        })
        .then((res: Response): Promise<unknown> => res.json())
        .then((data) => {
          if (!data || typeof data !== 'object') {
            throw new Error('Server error')
          }

          if ((data as { error?: string }).error) {
            setError((data as { error: string }).error)
          } else if ((data as { token?: string }).token) {
            setHasUpdatePassword(true)

            storeId({
              ...window.identity,
              id: window.identity.id,
              token: (data as { token: string }).token,
            })
          }
        })
        .catch((err) => {
          setError(err)
        })
        .finally((): void => {
          setIsLoading(false)
        })
    },
    [],
  )

  const onGenerateInviteCodeClick = React.useCallback((): void => {
    wire
      .transmit('account/generate_invite_code', {})
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object' && data.inviteCode) {
          setInviteCodes((previousInviteCodes: string[]): string[] => [
            ...previousInviteCodes,
            data.inviteCode,
          ])
        }
      })
  }, [])

  useLoad_data_initial<GetInviteCodesInitialDataResult>(
    'account/get_invite_codes',
    {},
    (
      result: LoadDataInitialOnResultResult<GetInviteCodesInitialDataResult>,
    ): void => {
      if (result.data) {
        if (typeof result.data === 'object' && result.data.inviteCodes) {
          setInviteCodes(result.data.inviteCodes)
        } else {
          throw new Error('Unknown data returned from: account/get_invite_code')
        }
      } else if (result.error) {
        throw result.error
      }
    },
  )

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <h1 className={styles.heading}>Account</h1>

        <div className={styles.profile}>
          <ImageBubble
            large
            title={window.identity.name}
            src={`/images/people/${window.identity.image}`}
          />

          <div className={styles.info}>
            <h2 className={styles.name}>{window.identity.name}</h2>
            {window.identity.pronouns ? (
              <div className={styles.pronouns}>
                (
                <ul>
                  {window.identity.pronouns.map(
                    (pronoun: string, index: number): React.ReactElement => (
                      <li key={`${pronoun}:${index}`}>
                        {index > 0 ? '/' : ''}
                        {pronoun}
                      </li>
                    ),
                  )}
                </ul>
                )
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Invite codes</h2>

          <ul>
            {inviteCodes.map(
              (inviteCode: string): React.ReactElement => (
                <li key={inviteCode}>{inviteCode}</li>
              ),
            )}
          </ul>

          <button onClick={onGenerateInviteCodeClick}>
            Generate invite code
          </button>
        </div>

        <div className={styles.section}>
          <h2>Update password</h2>

          <form onSubmit={onFormSubmit} className={styles.form}>
            {error ? <p>{error}</p> : <></>}
            {hasUpdatedPassword ? <p>Password updated!</p> : <></>}
            <input
              type="password"
              name="password-current"
              placeholder="Current password"
              disabled={isLoading}
            />
            <input
              type="password"
              name="password-new"
              placeholder="New password"
              disabled={isLoading}
            />
            <input
              type="password"
              name="password-retyped-new"
              placeholder="Retype new password"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              Update password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
