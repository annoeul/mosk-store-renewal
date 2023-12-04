import { Cookies } from "react-cookie"

const cookies = new Cookies() // 쿠키 객체를 생성하고,

export const getCookie = (name) => {
  try {
    return cookies.get(name) // get 을 하면 name 을 기준으로 쿠키 값을 가져옵니다.
  } catch (error) {
    console.error(error)
  }
}

export const setCookie = (name, value, option) => {
  try {
    cookies.set(name, value, { ...option }) // set 을 하면 name = value 형태로 쿠키를 설정할 수 있습니다.
  } catch (error) {
    console.error(error)
  }
}

export const removeCookie = (name, option) => {
  try {
    cookies.remove(name, { ...option }) // remove 하면 해당 name 쿠키를 삭제합니다.
  } catch (error) {
    console.error(error)
  }
}
