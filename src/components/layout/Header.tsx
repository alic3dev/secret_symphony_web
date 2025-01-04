import React from 'react'

import { Logo } from '@/components/decorative/Logo'

import { clearStoredId } from '@/utils/identity'

import styles from '@/components/layout/Header.module.scss'

export function Header(): React.ReactElement {
  const logout = React.useCallback<() => void>((): void => {
    clearStoredId()
    window.location.href = '/'
  }, [])

  return (
    <div className={styles.header}>
      <Logo />

      {window.loggedIn ? (
        <button onClick={logout}>X</button>
      ) : (
        <a className="button" href="/login">
          &gt;
        </a>
      )}
    </div>
  )
}
