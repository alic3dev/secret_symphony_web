import React from 'react'
import { Link } from 'react-router'

import { Logo } from '@/components/decorative/Logo'

import { clearStoredId } from '@/utils/identity'

import styles from '@/components/layout/Header.module.scss'

function HeaderBase({ children }: React.PropsWithChildren): React.ReactElement {
  return (
    <div className={styles.header}>
      <Logo />

      <div>{children}</div>
    </div>
  )
}

function HeaderLoggedIn(): React.ReactElement {
  const logout = React.useCallback<() => void>((): void => {
    clearStoredId()
    window.location.href = '/'
  }, [])

  return (
    <HeaderBase>
      {window.location.pathname !== '/dashboard' ? (
        <Link className="button" to="/dashboard">
          D
        </Link>
      ) : (
        <></>
      )}
      {window.location.pathname !== '/account' ? (
        <Link className="button" to="/account">
          A
        </Link>
      ) : (
        <></>
      )}
      <button onClick={logout}>X</button>
    </HeaderBase>
  )
}

function HeaderLoggedout(): React.ReactElement {
  return (
    <Link className="button" to="/login">
      &gt;
    </Link>
  )
}

export function Header(): React.ReactElement {
  return window.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedout />
}
