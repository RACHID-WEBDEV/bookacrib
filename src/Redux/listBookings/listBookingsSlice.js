import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListBookings,
  addNewListBooking,
  fetchListBooking,
  updateListBooking,
  deleteListBooking,
  fetchCribListBookings,
  fetchCribListBooking,
  fetchAdminListBookings,
  fetchAdminListBooking,
} from "./listBookingsThunk";
// / Import the new thunk action creators

const initialState = {
  listbookings: [],
  listbooking: [],
  addlistbooking: [],
  loading: false,
  error: null,
  listcribbookings: [],
  listcribbooking: [],
  loadingcribbooking: false,
  errorcribbooking: null,

  listadminbookings: [],
  listadminbooking: [],
  loadingadminbooking: false,
  erroradminbooking: null,
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
        state.error = action.payload ?? "Failed to fetch list bookings";
      })

      .addCase(fetchCribListBookings.pending, (state) => {
        state.loadingcribbooking = true;
        state.errorcribbooking = null;
      })
      .addCase(fetchCribListBookings.fulfilled, (state, action) => {
        state.loadingcribbooking = false;
        state.listcribbookings = action.payload;
      })

      .addCase(fetchCribListBookings.rejected, (state, action) => {
        state.loadingcribbooking = false;
        state.errorcribbooking =
          action.payload ?? "Failed to fetch crib list bookings";
      })

      .addCase(fetchAdminListBookings.pending, (state) => {
        state.loadingadminbooking = true;
        state.erroradminbooking = null;
      })
      .addCase(fetchAdminListBookings.fulfilled, (state, action) => {
        state.loadingadminbooking = false;
        state.listadminbookings = action.payload;
      })

      .addCase(fetchAdminListBookings.rejected, (state, action) => {
        state.loadingadminbooking = false;
        state.erroradminbooking =
          action.payload ?? "Failed to fetch admin list bookings";
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
      .addCase(fetchCribListBooking.pending, (state) => {
        state.loadingcribbooking = true;
        state.errorcribbooking = null;
      })
      .addCase(fetchCribListBooking.fulfilled, (state, action) => {
        state.loadingcribbooking = false;
        state.listcribbooking = action.payload;
      })

      .addCase(fetchCribListBooking.rejected, (state, action) => {
        state.loadingcribbooking = false;
        state.errorcribbooking =
          action.payload ?? "Failed to fetch crib list booking";
      })

      .addCase(fetchAdminListBooking.pending, (state) => {
        state.loadingadminbooking = true;
        state.erroradminbooking = null;
      })
      .addCase(fetchAdminListBooking.fulfilled, (state, action) => {
        state.loadingadminbooking = false;
        state.listadminbooking = action.payload;
      })

      .addCase(fetchAdminListBooking.rejected, (state, action) => {
        state.loadingadminbooking = false;
        state.erroradminbooking =
          action.payload ?? "Failed to fetch admin list booking";
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
