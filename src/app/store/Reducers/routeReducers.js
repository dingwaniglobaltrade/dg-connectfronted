import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  route: null,
  error: [],
  isAuthenticated: false,
};

export const routeReducer = createSlice({
  name: "route",
  initialState,
  reducers: {
    fetchRoute: (state, action) => {
      state.route = action.payload;
      state.isAuthenticated = true;
    },
    createnewRoute: (state, action) => {
      state.route = action.payload;
      state.isAuthenticated = true;
    },
    editRoute: (state, action) => {
      state.route = action.payload;
      state.isAuthenticated = true;
    },
    deleteRoute: (state, action) => {
      state.route = action.payload;
      state.isAuthenticated = true;
    },
     assignroute: (state, action) => {
      state.route = action.payload;
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
  fetchRoute,
  createnewRoute,
  editRoute,
  deleteRoute,
  assignroute,
  iserror,
  removeerror,
} = routeReducer.actions;

export default routeReducer.reducer;
