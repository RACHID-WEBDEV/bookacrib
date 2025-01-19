import { createSlice } from "@reduxjs/toolkit";
import {
  fetchcribUsers,
  addNewcribUser,
  fetchcribUser,
  updatecribUser,
  deletecribUser,
  resendcribUser,
} from "./cribusersThunk";
// / Import the new thunk action creators

const initialState = {
  cribusers: [],
  cribuser: [],
  addcribuser: [],
  loading: false,
  error: null,
  resendcribuser: [],
  loadingresend: false,
  errorresend: null,
};

// Create the orgaization slice
const cribusersSlice = createSlice({
  name: "bookacrib_cribusers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchcribUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcribUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.cribusers = action.payload;
      })

      .addCase(fetchcribUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch crib user";
      })

      // addNewcribUser
      .addCase(addNewcribUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewcribUser.fulfilled, (state, action) => {
        state.loading = false;
        state.cribusers = [...state.addcribuser, action.payload];
      })
      .addCase(addNewcribUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new crib user";
      })

      // resendcribUser
      // .addCase(resendcribUser.pending, (state) => {
      //   state.loadingresend = true;
      //   state.errorresend = null;
      // })
      // .addCase(resendcribUser.fulfilled, (state, action) => {
      //   state.loadingresend = false;
      //   state.cribusers = [...state.resendcribuser, action.payload];
      // })
      // .addCase(resendcribUser.rejected, (state, action) => {
      //   state.loadingresend = false;
      //   state.errorresend =
      //     action.payload ?? "Failed to resend crib user  verification link.";
      // })

      .addCase(resendcribUser.pending, (state) => {
        state.loadingresend = true;
        state.errorresend = null;
      })
      .addCase(resendcribUser.fulfilled, (state, action) => {
        state.loadingresend = false;
        state.resendcribuser = [...state.resendcribuser, action.payload];
      })
      .addCase(resendcribUser.rejected, (state, action) => {
        state.loadingresend = false;
        state.errorresend =
          action.payload ?? "Failed to resend verification token";
      })

      // fetchcribUser
      .addCase(fetchcribUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcribUser.fulfilled, (state, action) => {
        state.loading = false;
        state.cribuser = action.payload;
      })
      .addCase(fetchcribUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch crib user";
      })

      // updatecribUser
      .addCase(updatecribUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatecribUser.fulfilled, (state, action) => {
        state.loading = false;
        state.cribuser = action.payload;
      })
      .addCase(updatecribUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update crib user";
      })

      // deleteCategory
      .addCase(deletecribUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletecribUser.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.cribusers)) {
          state.cribusers = state.cribusers.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deletecribUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete crib user";
      });
  },
});

// Export the reducer
export default cribusersSlice.reducer;
