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

// const Property_URL = "/bookacrib-api-routes/v1/Propertys";

const fetchPropertys = createAsyncThunk(
  "admin/fetchPropertys",
  async (url, { rejectWithValue }) => {
    try {
      const response = await getData(url);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);

      if (
        (error?.response?.data?.status >= 400 &&
          error?.response?.data?.status <= 499 &&
          error?.response?.data?.errors) ||
        (error?.response?.data?.status_code >= 400 &&
          error?.response?.data?.status_code <= 499 &&
          error?.response?.data?.errors)
      ) {
        const errorMessages = Object.values(error?.response?.data?.errors)
          .flat()
          .join(", ");
        // toast.error(errorMessages, { duration: 6000 });
        return rejectWithValue(errorMessages);
      } else {
        // toast.error(error?.message, { duration: 6000 });
        return rejectWithValue(errorMessage?.response?.data?.message);
      }
    }
  }
);

const fetchProperties = createAsyncThunk(
  "admin/fetchProperties",
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
const addNewProperty = createAsyncThunk(
  "addNewProperty",

  async (PropertyData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "bookacrib-api-routes/v1/properties/create-property",
        PropertyData
      );

      if (
        (response?.status >= 200 && response?.status < 300) ||
        (response?.status_code >= 200 && response?.status_code < 300)
      ) {
        dispatch(
          fetchPropertys(
            "bookacrib-api-routes/v1/properties/list-properties?limit=10&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category"
          )
        );
      }
      // console.log("Property create response:", response);

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

// Async thunk action creator for fetching a single Property
const fetchProperty = createAsyncThunk(
  "getProperty",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(
        `/bookacrib-api-routes/v1/admin/properties/view-single-property?id=${id}&with[]=company&with[]=initiator&with[]=country&with[]=state`
        // `/bookacrib-api-routes/v1/properties/view-single-property?id=${id}&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&with[]=roomType`
      );
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateProperty = createAsyncThunk(
  "updateProperty",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(
        `bookacrib-api-routes/v1/properties/update-property?id=${id}`,
        formData
      );
      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(fetchPropertys());
      //   toast.success("Property updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "Property updated successfully",
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

const updatePropertyFeature = createAsyncThunk(
  "updatePropertyfeature",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await patchData(
        `/bookacrib-api-routes/v1/properties/update-property-features-images-by-action?id=${id}`,
        formData
      );

      // console.log("editing Response", response);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const deleteProperty = createAsyncThunk(
  "deleteProperty",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(
        `/bookacrib-api-routes/v1/properties/delete-property?id=${id}`
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
  fetchPropertys,
  addNewProperty,
  fetchProperty,
  updateProperty,
  updatePropertyFeature,
  deleteProperty,
  fetchProperties,
};
