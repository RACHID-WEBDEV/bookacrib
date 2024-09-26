import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  signupThunk,
  forgetPasswordThunk,
  resendVerificationThunk,
  accountVerificationThunk,
  resetPasswordThunk,
} from "./authThunk";
import Cookies from "js-cookie";

const initialState = {
  currentUser: Cookies.get("bookacrib_currentUser")
    ? JSON.parse(Cookies.get("bookacrib_currentUser"))
    : null,
  isAuthenticated: !!Cookies.get("bookacrib_admin_token"),
  loading: false,
  error: null,
  registerUser: [],
  forgetpassword: [],
  resendverification: [],
  accountverification: [],
  passwordreset: [],
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

      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUser = [...state.registerUser, action.payload];
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add register user";
      })
      .addCase(forgetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.forgetpassword = [...state.forgetpassword, action.payload];
      })
      .addCase(forgetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to reset forget password";
      })

      .addCase(resendVerificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.resendverification = [
          ...state.resendverification,
          action.payload,
        ];
      })
      .addCase(resendVerificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to resend verification token";
      })
      .addCase(accountVerificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(accountVerificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accountverification = [
          ...state.accountverification,
          action.payload,
        ];
      })
      .addCase(accountVerificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to verification account";
      })

      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordreset = [...state.passwordreset, action.payload];
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to verification account";
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
