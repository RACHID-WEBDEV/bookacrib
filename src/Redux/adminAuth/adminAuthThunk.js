import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getData, patchData, postData } from "../../utils/api";
// import { persistor } from "../store";

// Async thunk action creator for login
const adminLoginThunk = createAsyncThunk(
  "admin_auth/login",
  async (adminData, { rejectWithValue }) => {
    try {
      // Make an HTTP POST request to the login endpoint with user data
      const response = await postData(
        "/v1/admin/login?with[]=roles",
        adminData
      );

      // Assert the type of 'response' to 'LoginResponse'
      const loginResponse = response;
      // console.log("loginResponse", loginResponse);

      // if (loginResponse?.status === 200) {
      //   toast.success(loginResponse?.message);
      // }

      // Extract user data and access token from the response
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { access_token } = loginResponse?.data;

      // console.log(user);
      // console.log(access_token);

      // Store the access token in a cookie with expiry, sameSite, and secure options
      Cookies.set("bookacrib_admin_token", access_token, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Store user information in a cookie
      const userInfo = JSON.stringify(loginResponse?.data);
      Cookies.set("bookacrib_admin_user", userInfo, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Return the user data
      return loginResponse;
    } catch (error) {
      // Handle errors
      const errorMessage = error.response.data.message;

      console.log("error", error);
      if (
        error.status === 400 ||
        error.status === 401 ||
        error.status === 402 ||
        error.status === 403 ||
        error.status === 404
      ) {
        toast.error(errorMessage);
      }
      // Reject the promise with the error message
      return rejectWithValue(errorMessage);
    }
  }
);

const adminLogoutThunk = createAsyncThunk(
  "admin_auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await postData("/v1/admin/logout", "");

      // Remove cookies related to auth
      Cookies.remove("bookacrib_admin_token");
      Cookies.remove("bookacrib_admin_user");
      Cookies.remove("bookacrib_admin_company_id");

      // if (response.status >= 200 && response.status < 300) {
      //   toast.success(response.message);
      // }

      // await persistor.purge();
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const adminSignupThunk = createAsyncThunk(
  "admin_auth/signup",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await postData("/v1/admin/registration", adminData);
      const { status, message } = response;
      if (status >= 200 && status < 300) {
        toast.success(message);
      }

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const adminForgetPasswordThunk = createAsyncThunk(
  "admin_auth/forgetPassword",
  async (adminEmail, { rejectWithValue }) => {
    try {
      const response = await postData("/v1/admin/forgot-password", adminEmail);
      // const { status, message } = response;
      // if (status >= 200 && status < 300) {
      //   toast.success(message);
      // }

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const adminResendVerificationThunk = createAsyncThunk(
  "admin_auth/resendVerification",
  async (adminEmail, { rejectWithValue }) => {
    try {
      const response = await postData(
        "/v1/admin/resend-verification-link",
        adminEmail
      );
      const { status, message } = response;
      if (status >= 200 && status < 300) {
        toast.success(message);
      }

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
const adminAccountVerificationThunk = createAsyncThunk(
  "admin_auth/accountVerification",
  async (adminEmail_Token, { rejectWithValue }) => {
    try {
      const response = await patchData(
        "/v1/admin/account-verification",
        adminEmail_Token
      );
      const { status, message } = response;
      if (status >= 200 && status < 300) {
        toast.success(message);
      }

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const adminResetPasswordThunk = createAsyncThunk(
  "admin_auth/resetPassword",
  async (adminPassword_Token, { rejectWithValue }) => {
    try {
      const response = await patchData(
        "/v1/admin/reset-password",
        adminPassword_Token
      );
      const { status, message } = response;
      if (status >= 200 && status < 300) {
        toast.success(message);
      }

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const adminSwitchCompany = createAsyncThunk(
  "admin_company/switchCompany",
  async ({ companyId, switchToCompany }, { rejectWithValue }) => {
    try {
      if (switchToCompany) {
        Cookies.set("bookacrib_admin_company_id", companyId, {
          expires: 7,
          sameSite: "None",
          secure: true,
        });
      } else {
        Cookies.remove("bookacrib_admin_company_id");
      }
      return { companyId, switchToCompany };
    } catch (error) {
      // Handle errors and return a rejected value
      return rejectWithValue(error.message);
    }
  }
);

const fetchadminStatistics = createAsyncThunk(
  "getadminStatistics",
  async (url, { rejectWithValue }) => {
    try {
      const response = await getData(`${url}`);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

export {
  adminLoginThunk,
  adminLogoutThunk,
  adminSignupThunk,
  adminForgetPasswordThunk,
  adminResendVerificationThunk,
  adminAccountVerificationThunk,
  adminResetPasswordThunk,
  adminSwitchCompany,
  fetchadminStatistics,
};
