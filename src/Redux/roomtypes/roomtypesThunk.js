/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

// const RoomType_URL = "/bookacrib-api-routes/v1/RoomTypes";

const fetchRoomTypes = createAsyncThunk(
  "admin/fetchRoomTypes",
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

const addNewRoomType = createAsyncThunk(
  "addNewRoomType",

  async (RoomTypeData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        "/bookacrib-api-routes/v1/admin/room-types/create-room-type",
        RoomTypeData
      );

      if (
        (response?.status >= 200 && response?.status < 300) ||
        (response?.status_code >= 200 && response?.status_code < 300)
      ) {
        dispatch(
          fetchRoomTypes("bookacrib-api-routes/v1/room-types/list-room-types")
        );
      }
      // console.log("RoomType create response:", response);

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

// Async thunk action creator for fetching a single RoomType
const fetchRoomType = createAsyncThunk(
  "getRoomType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(
        `/bookacrib-api-routes/v1/room-types/view-single-room-type?id=${id}`
      );
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateRoomType = createAsyncThunk(
  "updateRoomType",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(
        `/bookacrib-api-routes/v1/admin/room-types/update-room-type?id=${id}`,
        formData
      );
      // if (
      //   (response?.status >= 200 && response?.status < 300) ||
      //   (response?.status_code >= 200 && response?.status_code < 300)
      // ) {
      //   dispatch(fetchRoomTypes());
      //   toast.success("RoomType updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "RoomType updated successfully",
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

const deleteRoomType = createAsyncThunk(
  "deleteRoomType",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(
        `/bookacrib-api-routes/v1/admin/room-types/delete-room-type?id=${id}`
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
  fetchRoomTypes,
  addNewRoomType,
  fetchRoomType,
  updateRoomType,
  deleteRoomType,
};
