import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "./authThunk";
import Cookies from "js-cookie";

const initialState = {
  currentUser: Cookies.get("currentUser")
    ? JSON.parse(Cookies.get("currentUser"))
    : null,
  isAuthenticated: !!Cookies.get("admin_token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null; // Reset error state on success
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload; // Set error state from rejection value
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
