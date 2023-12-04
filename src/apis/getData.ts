import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie } from "../utils/cookies"

export const getData = createApi({
  reducerPath: "getData",
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
    }),
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/categories",
        method: "POST",
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환
        headers: {
          "Content-Type": "application/json; charset=utf-8", // Content-Type 설정
        },
      }),
    }),
  }),
})

export const { useGetDatasQuery, useCreateCategoryMutation } = getData
