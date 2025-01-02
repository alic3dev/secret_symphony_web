import type { UUID } from 'crypto'

export interface StoredId {
  id: UUID
  token: string
}

export function getStoredId(): StoredId | undefined {
  const id: UUID | null = window.localStorage.getItem(
    'QTJIEWUOIJ',
  ) as UUID | null
  const token: string | null = window.localStorage.getItem('ZVTJERKL')

  if (id && token) {
    return {
      id,
      token,
    }
  }
}

export function storeId({ id, token }: StoredId): void {
  window.localStorage.setItem('QTJIEWUOIJ', id)
  window.localStorage.setItem('ZVTJERKL', token)
}

export function clearStoredId(): void {
  window.localStorage.removeItem('QTJIEWUOIJ')
  window.localStorage.removeItem('ZVTJERKL')
}
