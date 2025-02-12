import type { UUID } from 'crypto'

export interface StoredId {
  id: UUID
  token: string
  name?: string
  image?: string
  pronouns?: string[]
}

export function getStoredId(): StoredId | undefined {
  const id: UUID | null = window.localStorage.getItem(
    'QTJIEWUOIJ',
  ) as UUID | null
  const token: string | null = window.localStorage.getItem('ZVTJERKL')
  const name: string | undefined =
    window.localStorage.getItem('QNNVOL') || undefined
  const image: string | undefined =
    window.localStorage.getItem('ZCVOTWUT') || undefined
  let pronouns: string | string[] | undefined =
    window.localStorage.getItem('POAPNV') || undefined

  if (pronouns) {
    try {
      pronouns = JSON.parse(pronouns)

      if (!Array.isArray(pronouns)) {
        pronouns = undefined
      }
    } catch {}
  }

  if (id && token) {
    return {
      id,
      token,
      name,
      image,
      pronouns: pronouns as string[] | undefined,
    }
  }
}

export function storeId({ id, token, name, image, pronouns }: StoredId): void {
  window.localStorage.setItem('QTJIEWUOIJ', id)
  window.localStorage.setItem('ZVTJERKL', token)

  if (name) {
    window.localStorage.setItem('QNNVOL', name)
  }

  if (image) {
    window.localStorage.setItem('ZCVOTWUT', image)
  }

  if (pronouns) {
    window.localStorage.setItem('POAPNV', JSON.stringify(pronouns))
  }
}

export function clearStoredId(): void {
  window.localStorage.removeItem('QTJIEWUOIJ')
  window.localStorage.removeItem('ZVTJERKL')
  window.localStorage.removeItem('QNNVOL')
  window.localStorage.removeItem('ZCVOTWUT')
}
