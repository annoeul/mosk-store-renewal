import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const getData = createApi({
  reducerPath: "getData",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  endpoints: (builder) => ({
    getDatas: builder.query({
      query: (storeId) => `/public/categories/all/${storeId}`,
    }),
  }),
})

export const { useGetDatasQuery } = getData
