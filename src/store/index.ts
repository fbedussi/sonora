import { configureStore as configureStoreRTK, PreloadedState } from '@reduxjs/toolkit'

import { RootState } from '../model/model'
import { postsApi } from '../services/posts'
import notifications from './notifications/slice'
import user from './user/slice'

export function configureStore(preloadedState?: PreloadedState<RootState>) {
  const store = configureStoreRTK({
    reducer: {
      user,
      notifications,
      [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(postsApi.middleware),
    preloadedState,
  })

  return store
}
