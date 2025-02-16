export type LoadDataInitialStatus =
  | 'initializing'
  | 'loading'
  | 'error'
  | 'done'

export type LoadDataInitialOnResultResultData<LoadDataInitialResultingData> = {
  data: LoadDataInitialResultingData
  error?: undefined
}

export type LoadDataInitialOnResultResultError = {
  data?: undefined
  error: unknown
}

export type LoadDataInitialOnResultResult<LoadDataInitialResultingData> =
  | LoadDataInitialOnResultResultData<LoadDataInitialResultingData>
  | LoadDataInitialOnResultResultError

export type LoadDataInitialOnResult<LoadDataInitialResultingData = unknown> = (
  parameters: LoadDataInitialOnResultResult<LoadDataInitialResultingData>,
) => void

export interface LoadDataInitialStatusReference<LoadDataInitialResultingData> {
  status: LoadDataInitialStatus
  on_result: LoadDataInitialOnResult<LoadDataInitialResultingData>
}
