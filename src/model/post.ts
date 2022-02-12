import { Id, IsoDate } from './model'

// import { UserId } from './user'

export type Post = {
  audioSrc?: string
  imageSrc?: string
  // date: IsoDate
  // sharedWith: UserId[]
  // gallery: Id
  id: Id
}

export type Gallery = {
  id: Id
  name: string
  date: IsoDate
  postsIds: Id[]
}
