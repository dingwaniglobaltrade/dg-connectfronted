import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  error: [],
  isAuthenticated: false,
};

export const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchAllOrders: (state, action) => {
    state.order = action.payload;
    state.isAuthenticated = true;
    },
    createnewOrders:(state, action)=>{
      state.order = action.payload;
      state.isAuthenticated = true;
    },
    fetchOrdersbyid:(state, action)=>{
      state.order = action.payload;
      state.isAuthenticated = true;
    },
    updateOrderStatus:(state, action) =>{
      state.order = action.payload;
      state.isAuthenticated = true;
    },
    deleteOrders:(state, action)=>{
      state.order = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
   
  },
});


// Action creators are generated for each case reducer function
export const { fetchAllOrders , createnewOrders, fetchOrdersbyid,updateOrderStatus,  iserror} = orderReducer.actions;

export default orderReducer.reducer;
