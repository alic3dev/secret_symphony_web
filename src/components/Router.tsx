import type { StoredId } from '@/utils/identity'

import React from 'react'
import * as ReactRouter from 'react-router'

import {
  DashboardPage,
  LoginPage,
  LogoutPage,
  RootPage,
} from '@/components/pages'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Redirect } from '@/components/Redirect'

import { getStoredId, clearStoredId } from '@/utils/identity'
import { transmit } from '@/utils/wire/transmit'
import { startWebsocketClient } from '@/utils/websocketClient'

export function Router(): React.ReactElement {
  const [identity, setIdentity] = React.useState<Partial<StoredId>>({})

  const loggedIn = React.useMemo<boolean>(
    (): boolean => !!(identity.id && identity.token),
    [identity],
  )

  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect((): (() => void) | undefined => {
    if (!isLoading) {
      return
    }

    let aborted: boolean = false
    const storedId: StoredId | undefined = getStoredId()

    if (!storedId) {
      setIsLoading(false)
      return
    }

    transmit('/auth/validate_token', {
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
          setIdentity({
            id: storedId.id,
            token: storedId.token,
          })

          window.loggedIn = true

          startWebsocketClient()
        } else {
          setIdentity({})
          clearStoredId()

          window.loggedIn = false
        }

        window.identity = storedId

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
                <ReactRouter.Route path="/logout" element={<LogoutPage />} />
                <ReactRouter.Route path="*" element={<Redirect to="/" />} />
              </>
            ) : (
              <ReactRouter.Route path="*" element={<LoginPage />} />
            )}
          </ReactRouter.Routes>
        </ReactRouter.BrowserRouter>
      ) : (
        <></>
      )}
    </>
  )
}
