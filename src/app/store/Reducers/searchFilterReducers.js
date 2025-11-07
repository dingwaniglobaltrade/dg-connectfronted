import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: null,
  error: [],
  isAuthenticated: false,
};

export const searchFilterReducer = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    fetchdata: (state, action) => {
      state.data = action.payload.data || [];
      state.total = action.payload.totalOrders || 0;
      state.page = action.payload.currentPage || 1;
      state.pages = action.payload.totalPages || 0;
      state.error = null;
      state.loading = false;
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
export const { fetchdata, iserror, removeerror } = searchFilterReducer.actions;

export default searchFilterReducer.reducer;
