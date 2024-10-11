import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRoomTypes,
  addNewRoomType,
  fetchRoomType,
  updateRoomType,
  deleteRoomType,
} from "./roomtypesThunk";
// / Import the new thunk action creators

const initialState = {
  roomtypes: [],
  roomtype: [],
  addroomtype: [],
  loading: false,
  error: null,
};

// Create the slice
const roomtypesSlice = createSlice({
  name: "room_types",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchRoomTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.roomtypes = action.payload;
      })

      .addCase(fetchRoomTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch room type";
      })

      // addNewRoomType
      .addCase(addNewRoomType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewRoomType.fulfilled, (state, action) => {
        state.loading = false;
        state.roomtypes = [...state.addroomtype, action.payload];
      })
      .addCase(addNewRoomType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new room types";
      })

      // fetchRoomType
      .addCase(fetchRoomType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomType.fulfilled, (state, action) => {
        state.loading = false;
        state.roomtype = action.payload;
      })
      .addCase(fetchRoomType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch room type";
      })

      // updateRoomType
      .addCase(updateRoomType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoomType.fulfilled, (state, action) => {
        state.loading = false;
        state.roomtype = action.payload;
      })
      .addCase(updateRoomType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update room type";
      })

      // deleteCategory
      .addCase(deleteRoomType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoomType.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.roomtypes)) {
          state.roomtypes = state.roomtypes.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteRoomType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete room type";
      });
  },
});

// Export the reducer
export default roomtypesSlice.reducer;
