/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

// const FEATURE_URL = "/bookacrib-api-routes/v1/features";

const fetchFeatures = createAsyncThunk(
  "admin/fetchFeatures",
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

const addNewFeature = createAsyncThunk(
  "addNewFeature",

  async (FeatureData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "bookacrib-api-routes/v1/features/create-feature",
        FeatureData
      );

      if (
        (response?.status >= 200 && response?.status < 300) ||
        (response?.status_code >= 200 && response?.status_code < 300)
      ) {
        dispatch(
          fetchFeatures("/bookacrib-api-routes/v1/features/list-features")
        );
      }
      // console.log("Feature create response:", response);

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

// Async thunk action creator for fetching a single Feature
const fetchFeature = createAsyncThunk(
  "getFeature",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(
        `/bookacrib-api-routes/v1/features/view-single-feature?id=${id}`
      );
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateFeature = createAsyncThunk(
  "updateFeature",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(
        `bookacrib-api-routes/v1/features/update-feature?id=${id}`,
        formData
      );
      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(fetchFeatures());
      //   toast.success("Feature updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "Feature updated successfully",
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

const deleteFeature = createAsyncThunk(
  "deleteFeature",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(
        `/bookacrib-api-routes/v1/features/delete-feature?id=${id}`
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
  fetchFeatures,
  addNewFeature,
  fetchFeature,
  updateFeature,
  deleteFeature,
};
