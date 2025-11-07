import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  error: [],
  isAuthenticated: false,
};

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginuser: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    logoutuser: (state, action) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
    currentuser: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    editUser: (state, action) => {
      state.admin = action.payload;
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
export const { loginuser, logoutuser, iserror, removeerror, currentuser , editUser} =
  loginReducer.actions;

export default loginReducer.reducer;
