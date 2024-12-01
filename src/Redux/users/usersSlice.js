import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  addNewUser,
  fetchUser,
  updateUser,
  deleteUser,
} from "./usersThunk";
// / Import the new thunk action creators

const initialState = {
  users: [],
  user: [],
  adduser: [],
  loading: false,
  error: null,
};

// Create the orgaization slice
const usersSlice = createSlice({
  name: "bookacrib_users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch user";
      })

      // addNewUser
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.adduser, action.payload];
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new user";
      })

      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch user";
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update user";
      })

      // deleteCategory
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.users)) {
          state.users = state.users.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete user";
      });
  },
});

// Export the reducer
export default usersSlice.reducer;
