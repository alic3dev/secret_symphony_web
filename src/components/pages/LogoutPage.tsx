import React from 'react'

import { clearStoredId } from '@/utils/identity'

export function LogoutPage(): React.ReactElement {
  const onLogoutClick = React.useCallback((): void => {
    clearStoredId()

    if (window.location.pathname === '/logout') {
      window.location.href = '/'
    } else {
      window.location.reload()
    }
  }, [])

  return (
    <div className="surface">
      <div className="button-group">
        <a className="button" href="/">
          No
        </a>
        <button onClick={onLogoutClick}>Yes - Logout</button>
      </div>
    </div>
  )
}
