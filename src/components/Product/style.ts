// style.ts
import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
  height: 100vh;
`

export const ProductContainer = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
`

export const ProductCard = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 0 0 auto;

  transition: box-shadow 0.3s; /* 효과를 부드럽게 만들기 위한 transition 속성 추가 */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 마우스 호버시 새로운 그림자 효과 */
  }
`

export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  /* border-bottom: 0.1px solid black; */
`

export const ProductContent = styled.div`
  padding: 16px;
`

export const ProductName = styled.h5`
  font-size: 1.2rem;
  text-align: center;
`

export const ProductDescription = styled.p`
  margin-top: 8px;
  color: #666;
`

export const ProductPrice = styled.p`
  margin-top: 8px;
  font-weight: bold;
`
