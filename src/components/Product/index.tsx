import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useGetDatasQuery } from "../../apis/getData"
import { setCategory } from "../../store/slices/selectItem"

function Product({ storeId }) {
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

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {filteredData ? (
        <div>
          <h1>{filteredData.name}</h1>
          {filteredData.products.length > 0 ? (
            filteredData.products.map((product) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p key={product.id}>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            ))
          ) : (
            <p>상품이 없습니다.</p>
          )}
        </div>
      ) : (
        <p>카테고리가 없습니다.</p>
      )}
    </div>
  )
}

export default Product
