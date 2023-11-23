import React, { useEffect } from "react"
import * as S from "./style"
import { useGetDatasQuery } from "../../apis/getData"

function Category() {
  const { data, isLoading, isError } = useGetDatasQuery(1)

  const onClick = (id) => {
    console.log(id)
  }
  if (isLoading) {
    return <>로딩중</>
  }
  return (
    <S.CategoryWrapper>
      Category
      {data.data &&
        data.data.map((item) => (
          <div key={item.id}>
            <S.CategoryBtn onClick={() => onClick(item.id)}>{item.name}</S.CategoryBtn>
          </div>
        ))}
    </S.CategoryWrapper>
  )
}

export default Category
