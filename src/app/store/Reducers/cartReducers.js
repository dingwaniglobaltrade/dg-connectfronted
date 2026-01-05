import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    cartItems: [],
  },
  error: [],
  isAuthenticated: true,
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartProducts: (state, action) => {
      state.cart = action.payload;
      state.isAuthenticated = true;
    },
    createCart: (state, action) => {
      state.cart = action.payload;
      state.isAuthenticated = true;
    },
    editCart: (state, action) => {
      state.cart = action.payload;
      state.isAuthenticated = true;
    },
    removeCartItems: (state, action) => {
      state.cart = action.payload;
      state.isAuthenticated = true;
    },
    setCheckoutCart: (state, action) => {
      state.checkoutCart = action.payload;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchCartProducts,
  createCart,
  editCart,
  removeCartItems,
  setCheckoutCart,
  iserror,
} = cartReducer.actions;

export default cartReducer.reducer;
