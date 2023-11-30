import React, { useEffect, useState } from "react"
import * as S from "./style"
import { useGetDatasQuery } from "../../apis/getData"
import { useDispatch } from "react-redux"
import { setCategory } from "../../store/slices/selectItem"
import { SpeedDial, SpeedDialIcon } from "@mui/material"

function Category() {
  const { data, isLoading, isError } = useGetDatasQuery(1)
  const dispatch = useDispatch()

  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategoryClick = (categoryId: number) => {
    dispatch(setCategory(categoryId))
    setSelectedCategory(categoryId)
  }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <S.CategoryWrapper>
      {/* <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      /> */}

      <S.CategoryBtn>카테고리 생성</S.CategoryBtn>
      {data.data &&
        data.data.map((item) => (
          <S.CategoryNameWrapper
            onClick={() => handleCategoryClick(item.id)}
            key={item.id}
            style={{ backgroundColor: selectedCategory === item.id ? "#ddd" : "transparent" }}
          >
            <S.CategoryName>{item.name}</S.CategoryName>
          </S.CategoryNameWrapper>
        ))}
    </S.CategoryWrapper>
  )
}

export default Category
