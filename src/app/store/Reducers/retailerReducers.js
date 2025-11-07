import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  retailer: null,
  error: [],
  isAuthenticated: false,
};

export const retailerReducer = createSlice({
  name: "retailer",
  initialState,
  reducers: {
    fetchRetailer: (state, action) => {
      state.retailer = action.payload;
    state.isAuthenticated = true;
    },
    createnewRetailer:(state, action)=>{
      state.retailer = action.payload;
      state.isAuthenticated = true;
    },
    editRetailer:(state, action)=>{
      state.retailer = action.payload;
      state.isAuthenticated = true;
    },
    deleteRetailer:(state, action)=>{
      state.retailer = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { fetchRetailer ,createnewRetailer,editRetailer, deleteRetailer,  iserror} = retailerReducer.actions;

export default retailerReducer.reducer;
