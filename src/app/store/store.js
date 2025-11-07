import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Reducers/productReducer";
import loginReducer from "./Reducers/loginReducers";
import cartReducer from "./Reducers/cartReducers";
import notificationReducer from "./Reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    login: loginReducer,
    cart: cartReducer,
    notification:notificationReducer
  },
});
