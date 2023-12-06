// CategoryList.js
import React from "react"

import { useGetDatasQuery } from "../apis/getData"
import Category from "../components/Category"

const CategoryList = ({ storeId }) => {
  const { data, isLoading } = useGetDatasQuery(storeId)

  if (isLoading) {
    return <>로딩중</>
  }

  return <Category categories={data?.data} />
}

export default CategoryList
