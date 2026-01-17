import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enquries: null,
  error: [],
  isAuthenticated: true,
};

export const enquriesReducer = createSlice({
  name: "enquries",
  initialState,
  reducers: {
    fetchEnquries: (state, action) => {
      state.expense = action.payload;
      state.isAuthenticated = true;
    },
    fetchEnquriesbyID: (state, action) => {
      state.expense = action.payload;
      state.isAuthenticated = true;
    },
    createnewEnquries: (state, action) => {
      state.expense = action.payload;
    },
    editExistingEnquries: (state, action) => {
      state.expense = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchEnquries,
  fetchEnquriesbyID,
  createnewEnquries,
  editExistingEnquries,
  iserror,
} = enquriesReducer.actions;

export default enquriesReducer.reducer;
