/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getData,
  patchData,
  postData,
  putData,
  removeData,
} from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

// const User_URL = "/bookacrib-api-routes/v1/Users";

const fetchcribUsers = createAsyncThunk(
  "admin/fetchcribUsers",
  async (url, { rejectWithValue }) => {
    try {
      const response = await getData(url);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const addNewcribUser = createAsyncThunk(
  "addNewcribUser",

  async (UserData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "/v1/customers/company/users/create-user",
        UserData
      );

      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(
      //     fetchcribUsers("/v1/customers/company/users/list-users-by-company-id")
      //   );
      // }
      // console.log("User create response:", response);

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    // } catch (error) {
    //   const errorMessage = error;
    //   console.log(errorMessage);
    //   return rejectWithValue(errorMessage?.response?.data);
    // }
  }
);

const resendcribUser = createAsyncThunk(
  "resendcribUser",

  async (UserEmail, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "/v1/customers/company/users/resend-verification-link",
        UserEmail
      );

      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(
      //     fetchcribUsers("/v1/customers/company/users/list-users-by-company-id")
      //   );
      // }
      // console.log("User create response:", response);

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    // } catch (error) {
    //   const errorMessage = error;
    //   console.log(errorMessage);
    //   return rejectWithValue(errorMessage?.response?.data);
    // }
  }
);

// Async thunk action creator for fetching a single User
const fetchcribUser = createAsyncThunk(
  "getcribUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(
        `/v1/admin/users/get-single-user?id=${id}&with[]=company&with[]=country&with[]=state&with[]=role`
      );
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updatecribUser = createAsyncThunk(
  "updatecribUser",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await patchData(
        `/v1/admin/users/update-user-important-info?id=${id}&with[]=company&with[]=country&with[]=state&with[]=role`,
        formData
      );
      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(fetchUsers());
      //   toast.success("User updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "User updated successfully",
      //   //   })
      //   // );
      // }
      // console.log("editing Response", response);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const deletecribUser = createAsyncThunk(
  "deletecribUser",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(
        `/v1/customers/company/users/delete-user-by-company-id?id=${id}`
      );

      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

export {
  fetchcribUsers,
  addNewcribUser,
  fetchcribUser,
  updatecribUser,
  deletecribUser,
  resendcribUser,
};
