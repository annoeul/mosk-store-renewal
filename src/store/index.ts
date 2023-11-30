import { configureStore } from "@reduxjs/toolkit"
import userInfoReducer from "./slices/userInfo"
import { getData } from "../apis/getData"
import { setupListeners } from "@reduxjs/toolkit/query"
import categoryReducer from "./slices/selectItem"

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    [getData.reducerPath]: getData.reducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getData.middleware),
})

setupListeners(store.dispatch)
