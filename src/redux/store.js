import { configureStore, getDefaultMiddleware, combineReducers, } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import CartReducer from "./cart"

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"]
}

const reducers = combineReducers({cart: CartReducer})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware,
  serializableCheck: false,
})

export const persistor = persistStore(store);