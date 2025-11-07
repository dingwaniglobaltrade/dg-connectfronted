import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Salesperson: null,
  error: [],
  isAuthenticated: false,
};

export const SalesperonReducer = createSlice({
  name: "Salesperson",
  initialState,
  reducers: {
    fetchSalesperons: (state, action) => {
      state.attendance = action.payload;
      state.isAuthenticated = true;
    },
    fetchSalepseronsbyID: (state, action) => {
      state.attendance = action.payload;
      state.isAuthenticated = true;
    },
    editSalesperson: (state, action) => {
      state.attendance = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});
0;
// Action creators are generated for each case reducer function
export const { fetchSalesperons, iserror, fetchSalepseronsbyID , editSalesperson} =
  SalesperonReducer.actions;

export default SalesperonReducer.reducer;
