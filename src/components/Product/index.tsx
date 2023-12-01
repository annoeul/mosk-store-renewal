import React from "react"
import { useSelector } from "react-redux"
import { useGetDatasQuery } from "../../apis/getData"

function Product({ storeId }) {
  const selectedCategory = useSelector((state) => state.category.selectCategory)
  const { data, isLoading, isError } = useGetDatasQuery(storeId)

  if (isLoading) {
    return <>로딩중</>
  }

  const filteredData = data && data.data.filter((item) => item.id === selectedCategory)

  return (
    <div>
      {filteredData &&
        filteredData.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            {item.products.map((product) => (
              <p key={product.id}>{product ? product.name : "상품이 없습니다."}</p>
            ))}
          </div>
        ))}
    </div>
  )
}

export default Product
