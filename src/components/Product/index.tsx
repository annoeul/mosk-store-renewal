import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container } from "@mui/material"
import * as S from "./style"
import MoreIconBtn from "../MoreIconBtn"

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
    // <Container>
    <S.ProductContainer>
      <S.ProductCard>
        <MoreIconBtn right={"-90%"} />
        <S.ProductImage src={imageURL || "placeholder_image_url"} alt="Product" />
        <S.ProductContent>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductDescription>{product.description}</S.ProductDescription>
          <S.ProductPrice>{product.price}원</S.ProductPrice>
        </S.ProductContent>
      </S.ProductCard>
    </S.ProductContainer>
    // </Container>
  )
}

export default Product
