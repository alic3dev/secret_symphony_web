import React from 'react'

import { wire } from '@/utils'

import styles from '@/components/forms/create_or_login_form.module.scss'

export function Create_account_form(): React.ReactElement {
  const [error, set_error] = React.useState<string | null>(null)

  const on_submit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      event.stopPropagation()

      set_error(null)

      const form_data: FormData = new FormData(event.currentTarget)

      const email: FormDataEntryValue | null = form_data.get('email')
      const password: FormDataEntryValue | null = form_data.get('password')
      const re_entered_password: FormDataEntryValue | null =
        form_data.get('re_enter_password')
      const invite_code: FormDataEntryValue | null =
        form_data.get('invite_code')

      if (!email) {
        return set_error('missing:email')
      } else if (!password) {
        return set_error('missing:password')
      } else if (!re_entered_password) {
        return set_error('missing:re_entered_password')
      } else if (!invite_code) {
        return set_error('missing:invite_code')
      } else if (password !== re_entered_password) {
        return set_error('mismatch:passwords')
      }

      const response: Response = await wire.transmit('/users/create', {
        email,
        password,
        invite_code,
      })

      const { created, error }: { created?: boolean; error?: string } =
        await response.json()

      if (error) {
        set_error(error)
        return
      } else if (!created) {
        set_error('account_creation:failed')
        return
      }

      const referral: string | null =
        window.localStorage.getItem('ss_login_referral')

      window.localStorage.removeItem('ss_login_referral')

      window.location.pathname = referral ?? '/login'
    },
    [],
  )

  return (
    <form className={styles['create_or_login_form']} onSubmit={on_submit}>
      {error && <p>{error}</p>}

      <input type="email" placeholder="email" name="email" required />
      <input type="password" placeholder="password" name="password" required />
      <input
        type="password"
        placeholder="re-enter password"
        name="re_enter_password"
        required
      />
      <input
        type="text"
        placeholder="invite code"
        name="invite_code"
        required
      />

      <button type="submit">create</button>
    </form>
  )
}
