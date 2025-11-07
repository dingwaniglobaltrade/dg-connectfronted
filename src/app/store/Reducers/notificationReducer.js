import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // array of notifications
  loading: false,
  error: null,
  isAuthenticated: true,
};

export const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.list = action.payload; // store in list
      state.isAuthenticated = true;
    },
    allNotifications: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    markNotificationRead: (state, action) => {
      const ids = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.list = state.list.map((note) =>
        ids.includes(note.id) ? { ...note, is_read: 1 } : note
      );
    },
    addNotification: (state, action) => {
      state.list.unshift(action.payload); // real-time add
    },
  },
});

export const { setNotifications, setError, setLoading, addNotification, markNotificationRead, allNotifications } =
  notificationReducer.actions;

export default notificationReducer.reducer;
