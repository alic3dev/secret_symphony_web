import type { StoredId } from '@/types'

declare global {
  interface Window {
    loggedIn: boolean
    identity: StoredId
  }
}
