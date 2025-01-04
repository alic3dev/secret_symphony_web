import type { Person } from '@/types/person'
import type { PersonImage } from '@/types/personImage'

export interface UserMinimal {
  name: string
  image: string | undefined
}

export interface UserFull extends Person, Omit<PersonImage, 'image'> {
  image?: PersonImage['image']
}
