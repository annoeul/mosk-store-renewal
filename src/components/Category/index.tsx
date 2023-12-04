import React, { useEffect, useState } from "react"
import * as S from "./style"
import { useGetDatasQuery, useCreateCategoryMutation } from "../../apis/getData"
import { useDispatch } from "react-redux"
import { setCategory } from "../../store/slices/selectItem"
import { Container, TextField, Button } from "@mui/material"

function Category({ storeId }) {
  const { data, isLoading, isError } = useGetDatasQuery(storeId)
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [newCategory, setNewCategoryName] = useState("")
  const [createCategoryMutation] = useCreateCategoryMutation()

  const handleCategoryClick = (categoryId) => {
    dispatch(setCategory(categoryId))
    setSelectedCategory(categoryId)
  }

  const handleCreateCategoryClick = () => {
    setIsCreatingCategory(true)
  }

  const onChange = (e) => {
    setNewCategoryName(e.target.value)
    console.log(newCategory)
  }

  const handleCreateCategory = () => {
    createCategoryMutation({
      data: newCategory,
    })
  }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <S.CategoryWrapper>
      {isCreatingCategory ? (
        <>
          <TextField label="카테고리 이름" variant="standard" fullWidth value={newCategory} onChange={onChange} />
          <Button variant="contained" onClick={handleCreateCategory}>
            확인
          </Button>
        </>
      ) : (
        <S.CategoryBtn onClick={handleCreateCategoryClick}>카테고리 생성</S.CategoryBtn>
      )}

      {data.data &&
        data.data.map((item) => (
          <S.CategoryNameWrapper
            onClick={() => handleCategoryClick(item.id)}
            key={item.id}
            selected={selectedCategory === item.id}
          >
            <S.CategoryName>{item.name}</S.CategoryName>
          </S.CategoryNameWrapper>
        ))}
    </S.CategoryWrapper>
  )
}

export default Category
