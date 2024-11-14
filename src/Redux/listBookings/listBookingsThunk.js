/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

// const ListBooking_URL = "/bookacrib-api-routes/v1/ListBookings";

const fetchListBookings = createAsyncThunk(
  "admin/fetchListBookings",
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

const addNewListBooking = createAsyncThunk(
  "addNewListBooking",

  async (ListBookingData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "bookacrib-api-routes/v1/ListBookings/create-ListBooking",
        ListBookingData
      );

      if (
        (response?.status >= 200 && response?.status < 300) ||
        (response?.status_code >= 200 && response?.status_code < 300)
      ) {
        dispatch(
          fetchListBookings("/bookacrib-api-routes/v1/ListBookings/list-ListBookings")
        );
      }
      // console.log("ListBooking create response:", response);

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

// Async thunk action creator for fetching a single ListBooking
const fetchListBooking = createAsyncThunk(
  "getListBooking",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(
        `/bookacrib-api-routes/v1/ListBookings/view-single-ListBooking?id=${id}`
      );
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateListBooking = createAsyncThunk(
  "updateListBooking",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(
        `bookacrib-api-routes/v1/ListBookings/update-ListBooking?id=${id}`,
        formData
      );
      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(fetchListBookings());
      //   toast.success("ListBooking updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "ListBooking updated successfully",
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

const deleteListBooking = createAsyncThunk(
  "deleteListBooking",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(
        `/bookacrib-api-routes/v1/ListBookings/delete-ListBooking?id=${id}`
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
  fetchListBookings,
  addNewListBooking,
  fetchListBooking,
  updateListBooking,
  deleteListBooking,
};
