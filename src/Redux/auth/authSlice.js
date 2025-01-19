import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  signupThunk,
  forgetPasswordThunk,
  resendVerificationThunk,
  accountVerificationThunk,
  resetPasswordThunk,
  switchCompany,
  fetchuserStatistics,
  fetchCribStatistics,
} from "./authThunk";

import Cookies from "js-cookie";
// Token validation function (implement according to your token structure)
// const isValidToken = (token) => {
//   // Example validation: check expiration
//   const decoded = JSON.parse(atob(token.split(".")[1]));
//   return decoded.exp > Date.now() / 1000;
// };
// const newAuth = Cookies.get("bookacrib_user_token");
//    &&
//   isValidToken(Cookies.get("bookacrib_user_token")
// );

// console.log("newAuth:", newAuth);

// console.log("show token:", !!Cookies.get("bookacrib_user_token"));

// const currentUser = Cookies.get("bookacrib_currentUser")
//   ? JSON.parse(Cookies.get("bookacrib_currentUser"))
//   : null;

// console.log("Bookacrib_ user", currentUser);

const initialState = {
  currentUser: Cookies.get("bookacrib_currentUser")
    ? JSON.parse(Cookies.get("bookacrib_currentUser"))
    : null,
  isAuthenticated: !!Cookies.get("bookacrib_user_token"),
  hasCompany: null,
  // hasCompany: Cookies.get("bookacrib_current_company_id")
  //   ? JSON.parse(Cookies.get("bookacrib_current_company_id"))
  //   : null,
  loading: false,
  error: null,
  registerUser: [],
  forgetpassword: [],
  resendverification: [],
  accountverification: [],
  passwordreset: [],
  // switch company to user viceversa
  companyId: null,
  switchToCompany: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
  userstatistics: [],
  loadingUserStatistics: false,
  errorUserStatistics: null,
  cribstatistics: [],
  loadingCribStatistics: false,
  errorCribStatistics: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserStatistics.pending, (state) => {
        state.loadingUserStatistics = true;
        state.errorUserStatistics = null;
      })
      .addCase(fetchuserStatistics.fulfilled, (state, action) => {
        state.loadingUserStatistics = false;
        state.userstatistics = action.payload;
      })

      .addCase(fetchuserStatistics.rejected, (state, action) => {
        state.loadingUserStatistics = false;
        state.errorUserStatistics =
          action.payload ?? "Failed to fetch user statistics";
      })
      .addCase(fetchCribStatistics.pending, (state) => {
        state.loadingCribStatistics = true;
        state.errorCribStatistics = null;
      })
      .addCase(fetchCribStatistics.fulfilled, (state, action) => {
        state.loadingCribStatistics = false;
        state.cribstatistics = action.payload;
      })

      .addCase(fetchCribStatistics.rejected, (state, action) => {
        state.loadingCribStatistics = false;
        state.errorCribStatistics =
          action.payload ?? "Failed to fetch user statistics";
      })
      .addCase(switchCompany.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(switchCompany.fulfilled, (state, action) => {
        state.companyId = action.payload.companyId;
        state.switchToCompany = action.payload.switchToCompany;
        state.isLoading = false;
      })
      .addCase(switchCompany.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to switch company";
      })

      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null; // Reset error state on success
        state.companyId = null;
        state.switchToCompany = false;
        state.hasCompany = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed";
        // state.error = action.payload; // Set error state from rejection value
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
        state.companyId = null;
        state.switchToCompany = false;
        state.error = null;
        state.hasCompany = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
