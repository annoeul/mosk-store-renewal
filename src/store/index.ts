import { configureStore } from "@reduxjs/toolkit"
import userInfoReducer from "./slices/userInfo"
import { getData } from "../apis/getData"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    [getData.reducerPath]: getData.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getData.middleware),
})

setupListeners(store.dispatch)
