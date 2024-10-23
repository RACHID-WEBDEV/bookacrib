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
const fetchRoles = createAsyncThunk(
  "admin/fetchRoles",
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

const addNewRole = createAsyncThunk(
  "addNewRole",

  async (RoleData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "/v1/users/role/create-user-role",

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
const fetchRole = createAsyncThunk(
  "getRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(
        `/v1/users/role/get-single-user-role?with[]=permissions&id=${id}`
      );
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateRole = createAsyncThunk(
  "updateRole",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await patchData(
        `v1/users/role/toggle-user-role-status?id=${id}`,
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

const deleteRole = createAsyncThunk(
  "deleteRole",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(
        `v1/users/role/delete-user-role?id=${id}`
      );

      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

export { fetchRoles, addNewRole, fetchRole, updateRole, deleteRole };
