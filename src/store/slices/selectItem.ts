import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectCategory: null,
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectCategory = action.payload
    },
  },
})

export const { setCategory } = categorySlice.actions
export default categorySlice.reducer
