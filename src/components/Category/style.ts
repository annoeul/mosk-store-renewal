// style.ts
import { Button } from "@mui/material"
import { styled } from "styled-components"

export const CategoryWrapper = styled.div`
  min-width: 15%;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  padding: 20px;
`

export const CategoryBtn = styled(Button)`
  && {
    text-align: center;
    width: 100%;
    height: 3rem;
    margin: 10px 0;
    border-radius: 10px;
    background-color: #ddd;
    color: white;

    &:hover {
      background-color: #bbb; // 마우스 호버시 색상 변경
    }

    &:active {
      background-color: #888; // 클릭시 색상 변경
    }
  }
`

export const CategoryNameWrapper = styled.div`
  cursor: pointer;
  border-bottom: ${({ selected }) => (selected ? "1px solid black" : "0.1px solid #eae")};

  &:hover {
    border-bottom: ${({ selected }) => (selected ? "1px solid black" : "1px solid black")};
  }

  /* &:active {
    background-color: #e0e0e0;
  } */
`

export const CategoryName = styled.p`
  font-family: "Noto Sans", sans-serif;
  align-items: center;
  text-align: center;
`
