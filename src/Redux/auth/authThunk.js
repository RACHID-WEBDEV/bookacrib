import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { patchData, postData } from "../../utils/api";

// Async thunk action creator for login
const loginThunk = createAsyncThunk(
  "admin/auth",
  async (userData, { rejectWithValue }) => {
    try {
      // Make an HTTP POST request to the login endpoint with user data
      const response = await postData(
        "/v1/users/login?with[]=companies",
        userData
      );

      // Assert the type of 'response' to 'LoginResponse'
      const loginResponse = response;
      console.log("loginResponse", loginResponse);

      if (loginResponse?.status === 200) {
        toast.success(loginResponse?.message);
      }

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
      Cookies.set("bookacrib_currentUser", userInfo, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // console.log("company id:", loginResponse?.data?.companies[0].uuid);

      const company_id = JSON.stringify(loginResponse?.data?.companies[0].uuid);

      Cookies.set("bookacrib_current_company_id", company_id, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Return the user data
      return loginResponse?.data;
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

// Create a logout thunk
const logoutThunk = createAsyncThunk("auth/logout", async (data, thunkAPI) => {
  try {
    // Make an HTTP POST request to the logout endpoint
    const response = await postData("/v1/users/logout", "");

    // Remove access token and user cookies
    Cookies.remove("bookacrib_admin_token");
    Cookies.remove("bookacrib_currentUser");
    Cookies.remove("bookacrib_current_company_id");

    // Return success message
    // return "Logged out successfully";
    console.log("Logged out successfully");

    const { status, message } = response;
    if (status >= 200 && status < 300) {
      toast.success(message);
    }
    return response;
  } catch (error) {
    // Handle errors
    const errorMessage = error.response.data.message;
    // Reject the promise with the error message
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const signupThunk = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await postData("/v1/users/registration", userData);
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

const forgetPasswordThunk = createAsyncThunk(
  "auth/forgetPassword",
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await postData("/v1/users/forgot-password", userEmail);
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

const resendVerificationThunk = createAsyncThunk(
  "auth/resendVerification",
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await postData(
        "/v1/users/resend-verification-link",
        userEmail
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
const accountVerificationThunk = createAsyncThunk(
  "auth/accountVerification",
  async (userEmail_Token, { rejectWithValue }) => {
    try {
      const response = await patchData(
        "/v1/users/account-verification",
        userEmail_Token
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

const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (userPassword_Token, { rejectWithValue }) => {
    try {
      const response = await patchData(
        "/v1/users/reset-password",
        userPassword_Token
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

export {
  loginThunk,
  logoutThunk,
  signupThunk,
  forgetPasswordThunk,
  resendVerificationThunk,
  accountVerificationThunk,
  resetPasswordThunk,
};
