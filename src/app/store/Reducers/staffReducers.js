import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: null,
  error: [],
  isAuthenticated: false,
};

export const staffReducer = createSlice({
  name: "staff",
  initialState,
  reducers: {
    fetchstaff: (state, action) => {
      state.staff = action.payload;
      state.isAuthenticated = true;
    },
    addnewstaff: (state, action) => {
      state.staff = action.payload;
      state.isAuthenticated = true;
    },
    editstaffdetailes: (state, action) => {
      state.staff = action.payload;
      state.isAuthenticated = true;
    },
   deletestaff: (state, action) => {
      state.staff = action.payload;
      state.isAuthenticated = true;
    },
    assignroute: (state, action) => {
      state.staff = action.payload;
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
export const { fetchstaff, addnewstaff, editstaffdetailes, deletestaff,assignroute,  iserror, removeerror } =
 staffReducer.actions;

export default staffReducer.reducer;
