import type {
  LoadDataInitialOnResult,
  LoadDataInitialStatusReference,
} from '@/types'

import React from 'react'

import { wire } from '@/utils'

export function useLoad_data_initial<LoadDataInitialResultingData = unknown>(
  route: string,
  route_data?: unknown,
  on_result?: LoadDataInitialOnResult<LoadDataInitialResultingData>,
): void {
  const status_ref = React.useRef<
    LoadDataInitialStatusReference<LoadDataInitialResultingData>
  >({
    status: 'initializing',
    on_result: (): void => {},
  })

  status_ref.current.on_result = on_result ?? ((): void => {})

  React.useEffect((): undefined | (() => void) => {
    if (status_ref.current.status !== 'initializing') {
      return
    }

    status_ref.current.status = 'loading'

    wire
      .transmit(route, route_data ?? {})
      .then(
        (res: Response): Promise<LoadDataInitialResultingData> => res.json(),
      )
      .then((data: LoadDataInitialResultingData): void => {
        status_ref.current.status = 'done'

        status_ref.current.on_result({ data })
      })
      .catch((error: unknown): void => {
        status_ref.current.status = 'error'

        status_ref.current.on_result({
          error: error ?? new Error('An unknown error occured'),
        })
      })

    return (): void => {}
  })
}
