import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FeedbackPriorityFilter = 'all' | 'high-priority'

interface FeedbackFiltersState {
  priorityFilter: FeedbackPriorityFilter
}

const initialState: FeedbackFiltersState = {
  priorityFilter: 'all',
}

const feedbackFiltersSlice = createSlice({
  name: 'feedbackFilters',
  initialState,
  reducers: {
    setPriorityFilter: (
      state,
      action: PayloadAction<FeedbackPriorityFilter>,
    ) => {
      state.priorityFilter = action.payload
    },
  },
})

export const { setPriorityFilter } = feedbackFiltersSlice.actions
export const feedbackFiltersReducer = feedbackFiltersSlice.reducer
