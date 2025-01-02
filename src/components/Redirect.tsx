import React from 'react'

export type RedirectProps = {
  to: string
  withMessage?: boolean
}

export function Redirect({
  to,
  withMessage = true,
}: RedirectProps): React.ReactElement {
  React.useEffect((): void => {
    window.location.href = to
  }, [to])

  return withMessage ? (
    <div>
      <h3>Redirecting...</h3>

      <p>
        If you are not automatically redirected, please{' '}
        <a href={to}>click here</a>.
      </p>
    </div>
  ) : (
    <></>
  )
}
