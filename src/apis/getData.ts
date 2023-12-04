import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie } from "../utils/cookies"

export const getData = createApi({
  reducerPath: "getData",
  tagTypes: ["getDatas"], // 전체 api 에 대해서 Posts 라는 태그 타입을 설정
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("accessToken")
      headers.set("Authorization", `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getDatas: builder.query({
      query: (storeId) => `/public/categories/all/${storeId}`,
      providesTags: [{ type: "getDatas", id: "LIST" }],
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
      invalidatesTags: [{ type: "getDatas", id: "LIST" }],
    }),
  }),
})

export const { useGetDatasQuery, useCreateCategoryMutation } = getData
