import React from 'react'

import { wire } from '@/utils/wire'
import { storeId } from '@/utils/identity'

import styles from '@/components/pages/AccountPage.module.scss'

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

  React.useEffect((): void => {
    wire
      .transmit('account/get_invite_codes', {})
      .then((res: Response): Promise<{ inviteCodes: string[] }> => res.json())
      .then((data: { inviteCodes: string[] }) => {
        if (data && typeof data === 'object' && data.inviteCodes) {
          setInviteCodes(data.inviteCodes)
        }
      })
  }, [])

  return (
    <div className={styles.page}>
      <h1>Account</h1>
      <hr />

      <h2>Invite codes</h2>

      <ul>
        {inviteCodes.map(
          (inviteCode: string): React.ReactElement => (
            <li key={inviteCode}>{inviteCode}</li>
          ),
        )}
      </ul>

      <button onClick={onGenerateInviteCodeClick}>Generate invite code</button>

      <hr />

      <form onSubmit={onFormSubmit}>
        <h2>Update password</h2>
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
  )
}
