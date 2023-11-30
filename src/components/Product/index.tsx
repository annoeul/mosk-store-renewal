import React from "react"
import { useSelector } from "react-redux"
import { useGetDatasQuery } from "../../apis/getData"

function Product() {
  // 선택된 카테고리를 Redux 스토어에서 가져오기
  const selectedCategory = useSelector((state) => state.category.selectCategory)
  const { data, isLoading, isError } = useGetDatasQuery(1)

  if (isLoading) {
    return <>로딩중</>
  }

  // 선택된 카테고리를 기반으로 데이터 필터링
  const filteredData = data && data.data.filter((item) => item.id === selectedCategory)

  return (
    <div>
      {filteredData &&
        filteredData.map((item) => (
          // 필터링된 데이터를 여기에서 렌더링
          <div key={item.id}>
            <p>{item.name}</p>
            <ul>
              {item.products.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}

export default Product
