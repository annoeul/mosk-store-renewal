import { configureStore } from "@reduxjs/toolkit"
import userInfoReducer from "./slices/userInfo"
import { getData } from "../apis/getData"
import { setupListeners } from "@reduxjs/toolkit/query"
import categoryReducer from "./slices/selectItem"

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    category: categoryReducer,
    [getData.reducerPath]: getData.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getData.middleware),
})

setupListeners(store.dispatch)
