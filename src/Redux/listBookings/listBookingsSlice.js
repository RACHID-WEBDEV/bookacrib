import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListBookings,
  addNewListBooking,
  fetchListBooking,
  updateListBooking,
  deleteListBooking,
} from "./listBookingsThunk";
// / Import the new thunk action creators

const initialState = {
  listbookings: [],
  listbooking: [],
  addlistbooking: [],
  loading: false,
  error: null,
};

// Create the orgaization slice
const listBookingsSlice = createSlice({
  name: "list_Bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchListBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.listbookings = action.payload;
      })

      .addCase(fetchListBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch list booking";
      })

      // addNewListBooking
      .addCase(addNewListBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewListBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.listbookings = [...state.addlistbooking, action.payload];
      })
      .addCase(addNewListBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new list booking";
      })

      // fetchListBooking
      .addCase(fetchListBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.listbooking = action.payload;
      })
      .addCase(fetchListBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch list booking";
      })

      // updateListBooking
      .addCase(updateListBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateListBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.listbooking = action.payload;
      })
      .addCase(updateListBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update list booking";
      })

      // deleteCategory
      .addCase(deleteListBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListBooking.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.listbookings)) {
          state.listbookings = state.listbookings.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteListBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete list booking";
      });
  },
});

// Export the reducer
export default listBookingsSlice.reducer;
