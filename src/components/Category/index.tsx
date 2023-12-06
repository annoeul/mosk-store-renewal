// Category.js
import React, { useState } from "react"
import * as S from "./style"
import { useDispatch } from "react-redux"
import { setCategory } from "../../store/slices/selectItem"
import { TextField, Button } from "@mui/material"
import MoreIconBtn from "../MoreIconBtn"
import { useCreateCategoryMutation, useDeleteCategoryMutation } from "../../apis/getData"

const Category = ({ categories }) => {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [newCategory, setNewCategoryName] = useState("")
  const [deleteCategoryMutation] = useDeleteCategoryMutation()
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
  }

  const handleCreateCategory = () => {
    createCategoryMutation({
      data: newCategory,
    })
  }

  const handleDeleteCategory = (id, name) => {
    const checkCategory = window.confirm(`${name} 카테고리를 삭제하시겠습니까?`)
    if (checkCategory) {
      deleteCategoryMutation(id)
    }
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

      {categories &&
        categories.map((category) => (
          <S.CategoryNameWrapper
            onClick={() => handleCategoryClick(category.id)}
            key={category.id}
            selected={selectedCategory === category.id}
          >
            <S.CategoryName>{category.name}</S.CategoryName>
            <MoreIconBtn onDelete={() => handleDeleteCategory(category.id, category.name)} />
          </S.CategoryNameWrapper>
        ))}
    </S.CategoryWrapper>
  )
}

export default Category
