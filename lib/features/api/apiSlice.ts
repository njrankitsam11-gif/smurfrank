import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rankvaultApi = createApi({
  reducerPath: 'rankvaultApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Listing', 'User', 'Order'],
  endpoints: (builder) => ({
    getListings: builder.query({
      query: () => 'listings',
      providesTags: ['Listing'],
    }),
  }),
});

export const { useGetListingsQuery } = rankvaultApi;
