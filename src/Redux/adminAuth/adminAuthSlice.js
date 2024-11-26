import { createSlice } from "@reduxjs/toolkit";
import {
  adminLoginThunk,
  adminLogoutThunk,
  adminSignupThunk,
  adminForgetPasswordThunk,
  adminResendVerificationThunk,
  adminAccountVerificationThunk,
  adminResetPasswordThunk,
  adminSwitchCompany,
} from "./adminAuthThunk";

import Cookies from "js-cookie";
// Token validation function (implement according to your token structure)

const initialState = {
  bookacrib_admin_user: Cookies.get("bookacrib_admin_user")
    ? JSON.parse(Cookies.get("bookacrib_admin_user"))
    : null,
  isAdminAuthenticated: !!Cookies.get("bookacrib_admin_token"),
  hasCompany: null,
  // hasCompany: Cookies.get("bookacrib_current_company_id")
  //   ? JSON.parse(Cookies.get("bookacrib_current_company_id"))
  //   : null,
  loading: false,
  error: null,
  registerAdmin: [],
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
};

const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(adminSwitchCompany.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(adminSwitchCompany.fulfilled, (state, action) => {
        state.companyId = action.payload.companyId;
        state.switchToCompany = action.payload.switchToCompany;
        state.isLoading = false;
      })
      .addCase(adminSwitchCompany.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to switch company";
      })

      .addCase(adminLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        state.bookacrib_admin_user = action.payload;
        state.isAdminAuthenticated = true;
        state.loading = false;
        state.error = null; // Reset error state on success
        state.companyId = null;
        state.switchToCompany = false;
        state.hasCompany = action.payload;
      })
      .addCase(adminLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAdminAuthenticated = false;
        state.error = action.payload || "Login failed";
        // state.error = action.payload; // Set error state from rejection value
      })

      .addCase(adminSignupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminSignupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.registerAdmin = [...state.registerAdmin, action.payload];
      })
      .addCase(adminSignupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add register user";
      })
      .addCase(adminForgetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminForgetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.forgetpassword = [...state.forgetpassword, action.payload];
      })
      .addCase(adminForgetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to reset forget password";
      })

      .addCase(adminResendVerificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminResendVerificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.resendverification = [
          ...state.resendverification,
          action.payload,
        ];
      })
      .addCase(adminResendVerificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to resend verification token";
      })
      .addCase(adminAccountVerificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminAccountVerificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accountverification = [
          ...state.accountverification,
          action.payload,
        ];
      })
      .addCase(adminAccountVerificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to verification account";
      })

      .addCase(adminResetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminResetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordreset = [...state.passwordreset, action.payload];
      })
      .addCase(adminResetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to verification account";
      })
      .addCase(adminLogoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogoutThunk.fulfilled, (state) => {
        state.bookacrib_admin_user = null;
        state.isAdminAuthenticated = false;
        state.loading = false;
        state.companyId = null;
        state.switchToCompany = false;
        state.error = null;
        state.hasCompany = null;
      })
      .addCase(adminLogoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminAuthSlice.reducer;
