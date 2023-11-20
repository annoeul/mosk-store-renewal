import React, { ChangeEvent, useState } from "react"

function useInput<T>(initialState: T) {
  const [userInput, setUserInput] = useState<T>(initialState)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }

  return { userInput, onChange }
}

export default useInput
