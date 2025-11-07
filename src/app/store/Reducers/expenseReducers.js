import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expense: null,
  error: [],
  isAuthenticated: true,
};

export const expenseReducer = createSlice({
  name: "expense",
  initialState,
  reducers: {
    fetchExpenses: (state, action) => {
      state.expense = action.payload;
      state.isAuthenticated = true;
    },
    fetchExpensesbyID: (state, action) => {
      state.expense = action.payload;
      state.isAuthenticated = true;
    },
    createnewExpenses: (state, action) => {
      state.expense = action.payload;
      state.isAuthenticated = true;
    },
    editExistingExpenses: (state, action) => {
      state.expense = action.payload;
      state.isAuthenticated = true;
    },
    deleteExpenses: (state, action) => {
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
  fetchExpenses,
  fetchExpensesbyID,
  createnewExpenses,
  editExistingExpenses,
  deleteExpenses,
  iserror,
} = expenseReducer.actions;

export default expenseReducer.reducer;
