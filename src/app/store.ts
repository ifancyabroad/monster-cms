import { configureStore } from '@reduxjs/toolkit'
import loginModalReducer from '../features/loginModal/loginModalSlice'
import sidedrawerReducer from '../features/sidedrawer/sidedrawerSlice'

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    sidedrawer: sidedrawerReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch