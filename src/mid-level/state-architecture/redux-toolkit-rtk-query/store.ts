import { configureStore } from '@reduxjs/toolkit'

import { feedbackApi } from './feedbackApi'
import { feedbackFiltersReducer } from './feedbackFiltersSlice'

export const createFeedbackStore = () =>
  configureStore({
    reducer: {
      feedbackFilters: feedbackFiltersReducer,
      [feedbackApi.reducerPath]: feedbackApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(feedbackApi.middleware),
  })

export type FeedbackStore = ReturnType<typeof createFeedbackStore>
export type RootState = ReturnType<FeedbackStore['getState']>
export type AppDispatch = FeedbackStore['dispatch']
