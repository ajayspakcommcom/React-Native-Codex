import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface RemoteFeedbackPost {
  userId: number
  id: number
  title: string
  body: string
}

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: builder => ({
    getFeedbackPosts: builder.query<RemoteFeedbackPost[], void>({
      query: () => '/posts?_limit=8',
    }),
  }),
})

export const { useGetFeedbackPostsQuery } = feedbackApi
