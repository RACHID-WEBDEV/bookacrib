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

// const Categories_URL = "/bookacrib-api-routes/v1/Categoriess";

const fetchadminCategoriess = createAsyncThunk(
  "admin/fetchadminCategoriess",
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

const addNewadminCategories = createAsyncThunk(
  "addNewadminCategories",

  async (CategoriesData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "/v1/admin/categories/create-category",
        CategoriesData
      );

      if (
        (response?.status >= 200 && response?.status < 300) ||
        (response?.status_code >= 200 && response?.status_code < 300)
      ) {
        dispatch(
          fetchadminCategoriess("/v1/public/categories/list-all-categories")
        );
      }

      // console.log("Categories create response:", response);
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

// Async thunk action creator for fetching a single Categories
const fetchadminCategories = createAsyncThunk(
  "getadminCategories",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(
        `/v1/public/categories/get-single-category?id=${id}`
      );
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateadminCategories = createAsyncThunk(
  "updateadminCategories",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await patchData(
        `/v1/admin/categories/update-category?id=${id}`,
        formData
      );
      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(fetchCategoriess());
      //   toast.success("Categories updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "Categories updated successfully",
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

const deleteadminCategories = createAsyncThunk(
  "deleteadminCategories",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(
        `/v1/admin/categories/delete-category?id=${id}`
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
  fetchadminCategoriess,
  addNewadminCategories,
  fetchadminCategories,
  updateadminCategories,
  deleteadminCategories,
};
