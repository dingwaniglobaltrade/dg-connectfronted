import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendance: null,
  error: [],
  isAuthenticated: false,
};

export const AttendanceReducer = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    fetchAttendance: (state, action) => {
      state.attendance = action.payload;
      state.isAuthenticated = true;
    },
    salesmanwiseattendance:(state, action) =>{
      state.attendance = action.payload;
      state.isAuthenticated = true;
    },
    addAttendance: (state, action) => {
      state.attendance = action.payload;
      state.isAuthenticated = true;
    },
    editAttendance: (state, action) => {
      state.attendance = action.payload;
      state.isAuthenticated = true;
    },
    deleteAttendance: (state, action) => {
      state.attendance = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});
0
// Action creators are generated for each case reducer function
export const { fetchAttendance,salesmanwiseattendance, addAttendance, editAttendance, deleteAttendance, iserror } = AttendanceReducer.actions;

export default AttendanceReducer.reducer;
