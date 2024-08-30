import { createSlice } from "@reduxjs/toolkit";
import { userLoginThunk, userLogoutThunk } from "./userAuthThunk";
import Cookies from "js-cookie";

const initialState = {
  currentauthUser: Cookies.get("currentuserAuth")
    ? JSON.parse(Cookies.get("currentuserAuth"))
    : null,
  userIsAuthenticated: !!Cookies.get("user_token"),
  loading: false,
  error: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.currentauthUser = action.payload;
        state.userIsAuthenticated = true;
        state.loading = false;
        state.error = null; // Reset error state on success
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.userIsAuthenticated = false;
        state.error = action.payload; // Set error state from rejection value
      })

      .addCase(userLogoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogoutThunk.fulfilled, (state) => {
        state.currentauthUser = null;
        state.userIsAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userAuthSlice.reducer;
