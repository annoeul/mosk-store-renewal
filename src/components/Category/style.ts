import { Box, Button, Container } from "@mui/material"
import { styled } from "styled-components"

export const CategoryWrapper = styled.div`
  width: 15%;
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
    /* cursor: pointer; */
    /* font-family: "Noto Sans", sans-serif; Google Fonts 이름을 여기에 추가 */
  }
`

export const CategoryNameWrapper = styled.div`
  cursor: pointer;
  /* width: 100%; */
  /* text-align: center; */
  border-bottom: 0.1px solid black;
  /* font-family: "Noto Sans", sans-serif; Google Fonts 이름을 여기에 추가 */
`

export const CategoryName = styled.p`
  font-family: "Noto Sans", sans-serif;
  align-items: center;
  text-align: center;
`
