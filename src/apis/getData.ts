import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie } from "../utils/cookies"

export const getData = createApi({
  reducerPath: "getData",
  tagTypes: ["datas"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: async (headers) => {
      const token = await getCookie("accessToken")
      headers.set("Authorization", `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getDatas: builder.query({
      query: (storeId) => `/public/categories/all/${storeId}`,
      providesTags: ["datas"],
    }),
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/categories",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }),
      invalidatesTags: ["datas"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["datas"],
    }),
  }),
})

export const {
  useGetDatasQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = getData
