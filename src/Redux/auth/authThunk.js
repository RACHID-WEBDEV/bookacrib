import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { postData } from "../../utils/api";

// Async thunk action creator for login
const loginThunk = createAsyncThunk(
  "admin/auth",
  async (userData, { rejectWithValue }) => {
    try {
      // Make an HTTP POST request to the login endpoint with user data
      const response = await postData("admin/auth", userData);

      // Assert the type of 'response' to 'LoginResponse'
      const loginResponse = response;
      console.log("loginResponse", loginResponse);

      if (loginResponse?.status === 202) {
        toast.success(loginResponse?.message);
      }

      // Extract user data and access token from the response
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { user, token } = loginResponse?.data;

      // console.log(user);
      // console.log(access_token);

      // Store the access token in a cookie with expiry, sameSite, and secure options
      Cookies.set("admin_token", token, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Store user information in a cookie
      const userInfo = JSON.stringify(user);
      Cookies.set("currentUser", userInfo, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Return the user data
      return user;
    } catch (error) {
      // Handle errors
      const errorMessage = error.response.data.message;

      console.log("ererer", error);
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
    const response = await postData("auth/logout", "");

    // Remove access token and user cookies
    Cookies.remove("admin_token");
    Cookies.remove("currentUser");

    // Return success message
    // return "Logged out successfully";
    console.log("Logged out successfully");

    if (
      response?.status === 202 ||
      response?.status === 200 ||
      response?.status === 201 ||
      response?.status_code === 202 ||
      response?.status_code === 200 ||
      response?.status_code === 201
    ) {
      toast.success("Logged out successfully");
    }
    return response;
  } catch (error) {
    // Handle errors
    const errorMessage = error.response.data.message;
    // Reject the promise with the error message
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export { loginThunk, logoutThunk };
