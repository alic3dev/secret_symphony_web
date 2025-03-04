import type { StoredId } from '@/types'

import React from 'react'
import * as ReactRouter from 'react-router'

import {
  AccountPage,
  Create_account_page,
  DashboardPage,
  LoginPage,
  LogoutPage,
  RootPage,
} from '@/components/pages'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Redirect } from '@/components/Redirect'

import { identity, websocketClient, wire } from '@/utils'

export function Router(): React.ReactElement {
  const [storedIdentity, setStoredIdentity] = React.useState<Partial<StoredId>>(
    {},
  )

  const loggedIn = React.useMemo<boolean>(
    (): boolean => !!(storedIdentity.id && storedIdentity.token),
    [storedIdentity],
  )

  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect((): (() => void) | undefined => {
    if (!isLoading) {
      return
    }

    let aborted: boolean = false
    const storedId: StoredId | undefined = identity.getStoredId()

    if (!storedId) {
      setIsLoading(false)
      return
    }

    wire
      .transmit('/auth/validate_token', {
        id: storedId.id,
        token: storedId.token,
      })
      .then((res: Response): Promise<{ valid: boolean }> => res.json())
      .then((data: { valid: boolean }): void => {
        if (aborted) return

        let valid: boolean = false

        if (typeof data === 'object' && !Array.isArray(data)) {
          valid = data.valid
        }

        window.identity = storedId

        if (valid) {
          setStoredIdentity({
            id: storedId.id,
            token: storedId.token,
          })

          window.loggedIn = true

          websocketClient.startWebsocketClient()
        } else {
          setStoredIdentity({})
          identity.clearStoredId()

          window.loggedIn = false
        }

        setIsLoading(false)
      })

    return (): void => {
      aborted = true
    }
  }, [isLoading])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading ? (
        <ReactRouter.BrowserRouter>
          <ReactRouter.Routes>
            {loggedIn ? (
              <>
                <ReactRouter.Route path="/" element={<RootPage />} />
                <ReactRouter.Route
                  path="/dashboard"
                  element={<DashboardPage />}
                />
                <ReactRouter.Route path="/account" element={<AccountPage />} />
                <ReactRouter.Route path="/logout" element={<LogoutPage />} />
                <ReactRouter.Route path="*" element={<Redirect to="/" />} />
              </>
            ) : (
              <>
                <ReactRouter.Route
                  path="/create-account"
                  element={<Create_account_page />}
                />
                <ReactRouter.Route path="*" element={<LoginPage />} />
              </>
            )}
          </ReactRouter.Routes>
        </ReactRouter.BrowserRouter>
      ) : (
        <></>
      )}
    </>
  )
}
