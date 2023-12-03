import React, { useEffect, useState } from "react"
import * as S from "./style"
import { useGetDatasQuery } from "../../apis/getData"
import { useDispatch } from "react-redux"
import { setCategory } from "../../store/slices/selectItem"
import { Container } from "@mui/material"

function Category({ storeId }) {
  const { data, isLoading, isError } = useGetDatasQuery(storeId)
  const dispatch = useDispatch()

  const handleCategoryClick = (categoryId: number) => {
    dispatch(setCategory(categoryId))
  }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <S.CategoryWrapper>
      {/* <Container> */}
      <S.CategoryBtn>카테고리 생성</S.CategoryBtn>
      {data.data &&
        data.data.map((item) => (
          <S.CategoryNameWrapper onClick={() => handleCategoryClick(item.id)} key={item.id}>
            <S.CategoryName>{item.name}</S.CategoryName>
          </S.CategoryNameWrapper>
        ))}
      {/* </Container> */}
    </S.CategoryWrapper>
  )
}

export default Category
