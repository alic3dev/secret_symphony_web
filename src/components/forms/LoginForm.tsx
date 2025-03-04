import { StoredId } from '@/types'

import React from 'react'

import { wire, identity } from '@/utils'

import styles from '@/components/forms/create_or_login_form.module.scss'

type LoginState = 'waiting' | 'submitting' | 'error'

export function LoginForm(): React.ReactElement {
  const [state, setState] = React.useState<LoginState>('waiting')
  const [error, setError] = React.useState<string>('')

  const onFormSubmit = React.useCallback<React.FormEventHandler>(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      event.stopPropagation()

      setState('submitting')

      const formData = new FormData(event.currentTarget)

      const email: FormDataEntryValue | null = formData.get('email')
      const password: FormDataEntryValue | null = formData.get('password')

      if (!email || !email.toString() || !password || !password.toString()) {
        setError('Fill out the form')
        return
      }

      try {
        const res: Response = await wire.transmit('/auth/login', {
          email,
          password,
        })

        const data: StoredId | { error: string } = await res.json()

        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          setState('error')
          setError((data as { error: string }).error)
        } else if (Object.prototype.hasOwnProperty.call(data, 'token')) {
          identity.storeId(data as StoredId)

          window.location.reload()
        } else {
          throw new Error('Unknown')
        }
      } catch {
        setState('error')
        setError('An unknown error has occured')
      }
    },
    [],
  )

  return (
    <form className={styles['create_or_login_form']} onSubmit={onFormSubmit}>
      {error ? <p>{error}</p> : <></>}

      <input
        disabled={state === 'submitting'}
        type="email"
        name="email"
        placeholder="EMAIL"
        required
      />
      <input type="password" name="password" placeholder="PASSWORD" required />

      <button disabled={state === 'submitting'} type="submit">
        &gt;&gt;&gt;
      </button>
    </form>
  )
}
