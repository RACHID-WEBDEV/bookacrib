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

const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
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

const addNewUser = createAsyncThunk(
  "addNewUser",

  async (UserData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "bookacrib-api-routes/v1/Users/create-User",
        UserData
      );

      if (
        (response?.status >= 200 && response?.status < 300) ||
        (response?.status_code >= 200 && response?.status_code < 300)
      ) {
        dispatch(fetchUsers("/bookacrib-api-routes/v1/Users/list-Users"));
      }
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
const fetchUser = createAsyncThunk(
  "getUser",
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

const updateUser = createAsyncThunk(
  "updateUser",
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

const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(`/v1/admin/users/delete-user?id=${id}`);

      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

export { fetchUsers, addNewUser, fetchUser, updateUser, deleteUser };
