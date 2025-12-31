import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: null,
  error: [],
  isAuthenticated: false,
};

export const reportsReducer = createSlice({
  name: "reports",
  initialState,
  reducers: {
    salesperreport: (state, action) => {
      state.reports = action.payload;
      state.isAuthenticated = true;
    },
    attendancereport: (state, action) => {
      state.reports = action.payload;
      state.isAuthenticated = true;
    },
    productreport: (state, action) => {
      state.reports = action.payload;
      state.isAuthenticated = true;
    },
    expensereport: (state, action) => {
      state.reports = action.payload;
      state.isAuthenticated = true;
    },
    orderitemsreport: (state, action) => {
      state.reports = action.payload;
      state.isAuthenticated = true;
    },
    retailersreport: (state, action) => {
      state.reports = action.payload;
      state.isAuthenticated = true;
    },
    distributorreport: (state, action) => {
      state.reports = action.payload;
      state.isAuthenticated = true;
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
export const {
  productreport,
  attendancereport,
  salesperreport,
  distributorreport,
  retailersreport,
  expensereport,
  orderitemsreport,
  iserror,
  removeerror,
} = reportsReducer.actions;

export default reportsReducer.reducer;
