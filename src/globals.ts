import type { StoredId } from '@/utils/identity'

declare global {
  interface Window {
    loggedIn: boolean
    identity: StoredId
  }
}
