// Product.js

import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container } from "@mui/material"
import * as S from "./style"
import MoreIconBtn from "../MoreIconBtn"
import EditModal from "../EditModal"

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    price: string
  }
}

function Product({ product }: ProductProps): JSX.Element {
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const onClick = (item) => {
    console.log(item)
  }

  const onEdit = () => {
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }

  const onSaveEdit = (editedItem) => {
    // 여기에서 수정된 정보를 서버에 저장하거나 다른 작업을 수행할 수 있습니다.
    console.log("수정된 상품 정보:", editedItem)
    // 서버에 수정된 정보 저장 요청 등을 추가할 수 있습니다.
  }

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/public/products/img/${product.id}`)
        const imageData = response.data.data

        if (imageData.encodedImg && imageData.imgType) {
          const dataURL = `data:image/${imageData.imgType};base64,${imageData.encodedImg}`
          setImageURL(dataURL)
        }
      } catch (error) {
        console.error("Error fetching image data:", error)
      }
    }

    fetchImageData()
  }, [product.id])

  return (
    <>
      <S.ProductContainer>
        <S.ProductCard>
          <MoreIconBtn right={"-90%"} onDelete={() => onClick(product)} onEdit={onEdit} />
          <S.ProductImage src={imageURL || "placeholder_image_url"} alt="Product" />
          <S.ProductContent>
            <S.ProductName>{product.name}</S.ProductName>
            <S.ProductDescription>{product.description}</S.ProductDescription>
            <S.ProductPrice>{product.price}원</S.ProductPrice>
          </S.ProductContent>
        </S.ProductCard>
      </S.ProductContainer>

      <EditModal open={isEditModalOpen} close={() => setIsEditModalOpen(false)} isEditMode={true} />
    </>
  )
}

export default Product
