import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useGetDatasQuery } from "../apis/getData"
import { setCategory } from "../store/slices/selectItem"
import Product from "../components/Product"

function ProductListPage({ storeId }) {
  const dispatch = useDispatch()
  const selectedCategory = useSelector((state) => state.category.selectCategory)
  const { data, isLoading, isError } = useGetDatasQuery(storeId)

  useEffect(() => {
    if (!isLoading && data && data.data && data.data.length > 0) {
      const firstCategoryId = data.data[0].id
      dispatch(setCategory(firstCategoryId))
    }
  }, [data, isLoading, dispatch])

  if (isLoading) {
    return <>로딩중</>
  }

  const filteredData =
    data && data.data.filter((item) => item.id === (selectedCategory || (data.data[0] && data.data[0].id)))[0]

  return filteredData.products.map((product) => <Product product={product} key={product.id} />)
}

export default ProductListPage
