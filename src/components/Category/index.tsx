import React, { useEffect, useState } from "react"
import * as S from "./style"
import { useGetDatasQuery, useCreateCategoryMutation, useDeleteCategoryMutation } from "../../apis/getData"
import { useDispatch } from "react-redux"
import { setCategory } from "../../store/slices/selectItem"
import { Container, TextField, Button, ButtonGroup } from "@mui/material"
import MoreIconBtn from "../MoreIconBtn"

function Category({ storeId }) {
  const { data, isLoading, isError } = useGetDatasQuery(storeId)
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [newCategory, setNewCategoryName] = useState("")
  const [createCategoryMutation] = useCreateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleCategoryClick = (categoryId) => {
    dispatch(setCategory(categoryId))
    setSelectedCategory(categoryId)
  }

  const handleCreateCategoryClick = () => {
    setIsCreatingCategory(true)
  }

  const onChange = (e) => {
    setNewCategoryName(e.target.value)
  }

  const handleCreateCategory = () => {
    createCategoryMutation({
      data: newCategory,
    })
  }

  const handleDeleteCategory = (id: number, name: string) => {
    const checkCategory = window.confirm(`${name} 카테고리를 삭제하시겠습니까?`)
    if (checkCategory) {
      deleteCategory(id)
    } else {
      return
    }
  }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <S.CategoryWrapper>
      {isCreatingCategory ? (
        <>
          <TextField label="카테고리 이름" variant="standard" fullWidth value={newCategory} onChange={onChange} />
          <Button onClick={handleCreateCategory}>One</Button>
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
            <MoreIconBtn onDelete={() => handleDeleteCategory(item.id, item.name)} />
          </S.CategoryNameWrapper>
        ))}
    </S.CategoryWrapper>
  )
}

export default Category
