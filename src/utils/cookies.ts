import { Cookies } from "react-cookie"

const cookies = new Cookies()

export const getCookie = (name) => {
  try {
    return cookies.get(name)
  } catch (error) {
    console.error(error)
  }
}

export const setCookie = (name, value, option) => {
  try {
    cookies.set(name, value, { ...option })
  } catch (error) {
    console.error(error)
  }
}

export const removeCookie = (name, option) => {
  try {
    cookies.remove(name, { ...option })
  } catch (error) {
    console.error(error)
  }
}
