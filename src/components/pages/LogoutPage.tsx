import React from 'react'

import { identity } from '@/utils'

export function LogoutPage(): React.ReactElement {
  const onLogoutClick = React.useCallback((): void => {
    identity.clearStoredId()

    if (window.location.pathname === '/logout') {
      window.location.href = '/'
    } else {
      window.location.reload()
    }
  }, [])

  return (
    <div className="surface">
      <h4>Are you sure you want to logout?</h4>

      <br />

      <div className="button-group">
        <a className="button" href="/">
          No
        </a>
        <button onClick={onLogoutClick}>Yes - Logout</button>
      </div>
    </div>
  )
}
