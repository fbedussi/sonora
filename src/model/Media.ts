import { Id, IsoDate, UserId } from './model'

export type Card = {
  audioSrc?: string
  imageSrc?: string
  date: IsoDate
  sharedWith: UserId[]
  gallery: Id
  id: Id
}

export type Gallery = {
  id: Id
  name: string
  date: IsoDate
  cardsIds: Id[]
}
