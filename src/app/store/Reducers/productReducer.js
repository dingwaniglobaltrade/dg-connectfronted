import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  error: [],
  isAuthenticated: false,
};

export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.product = action.payload;
      // state.isAuthenticated = true;
    },
    createnewProduct:(state, action)=>{
      state.product = action.payload;
      state.isAuthenticated = true;
    },
    editproduct:(state, action) =>{
     state.product = action.payload;
     state.isAuthenticated = true;
    },
    deleteproduct:(state, action) =>{
     state.product = action.payload;
     state.isAuthenticated = true;
    },
    updateproductstock:(state, action)=>{
     state.product = action.payload;
     state.isAuthenticated = true
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
    removeerror: (state, action) => {
      state.error = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchProducts, createnewProduct,updateproductstock, editproduct,deleteproduct, iserror, removeerror } = productReducer.actions;

export default productReducer.reducer;
