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

// const Role_URL = "/bookacrib-api-routes/v1/Roles";

// /v1/users/role/list-all-user-roles?with[]=permissions
const fetchadminRoles = createAsyncThunk(
  "admin/fetchadminRoles",
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

const addNewadminRole = createAsyncThunk(
  "addNewadminRole",

  async (RoleData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "/v1/admin/roles/create-admin-role",

        RoleData
      );

      // console.log("Role create response:", response);

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

// Async thunk action creator for fetching a single Role
const fetchadminRole = createAsyncThunk(
  "getadminRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(
        `/v1/admin/roles/get-single-admin-role?with[]=permissions&id=${id}`
      );
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateadminRole = createAsyncThunk(
  "updateadminRole",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await patchData(
        `/v1/admin/roles/update-admin-role?id=${id}`,
        formData
      );
      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(fetchRoles());
      //   toast.success("Role updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "Role updated successfully",
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

const deleteadminRole = createAsyncThunk(
  "deleteadminRole",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(
        `/v1/admin/roles/delete-admin-role?id=${id}`
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
  fetchadminRoles,
  addNewadminRole,
  fetchadminRole,
  updateadminRole,
  deleteadminRole,
};
