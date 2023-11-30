import React, { useEffect } from "react"
import * as S from "./style"
import { useGetDatasQuery } from "../../apis/getData"
import { useDispatch, useSelector } from "react-redux"
import { setCategory } from "../../store/slices/selectItem"

function Category() {
  const { data, isLoading, isError } = useGetDatasQuery(1)
  const dispatch = useDispatch()

  const handleCategoryClick = (categoryId) => {
    dispatch(setCategory(categoryId))
  }
  // console.log(selectedCategory)
  // if (data) {
  //   console.log(data.data)
  // }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <S.CategoryWrapper>
      Category
      {data.data &&
        data.data.map((item) => (
          <S.CategoryBtnWrapper key={item.id}>
            <S.CategoryBtn onClick={() => handleCategoryClick(item.id)}>{item.name}</S.CategoryBtn>
          </S.CategoryBtnWrapper>
        ))}
    </S.CategoryWrapper>
  )
}

export default Category
