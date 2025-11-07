import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  distributor: null,
  error: [],
  isAuthenticated: true,
};

export const distributorReducer = createSlice({
  name: "distributor",
  initialState,
  reducers: {
    fetchDistributors: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    createnewDistributor: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    editDistributor: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    removeDistributor: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    assignSalesperson: (state, action) => {
      state.staff = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchDistributors,
  createnewDistributor,
  editDistributor,
  assignSalesperson,
  removeDistributor,
  iserror,
} = distributorReducer.actions;

export default distributorReducer.reducer;
