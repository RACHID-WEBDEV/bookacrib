import { createSlice } from "@reduxjs/toolkit";
import {
  fetchadminRoles,
  addNewadminRole,
  fetchadminRole,
  updateadminRole,
  deleteadminRole,
} from "./adminrolesThunk";
// / Import the new thunk action creators

const initialState = {
  roles: [],
  role: [],
  addrole: [],
  loading: false,
  error: null,
};

// Create the orgaization slice
const adminrolesSlice = createSlice({
  name: "adminroles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchadminRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchadminRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })

      .addCase(fetchadminRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch role";
      })

      // addNewRole
      .addCase(addNewadminRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewadminRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = [...state.addrole, action.payload];
      })
      .addCase(addNewadminRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new role";
      })

      // fetchRole
      .addCase(fetchadminRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchadminRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(fetchadminRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch role";
      })

      // updateRole
      .addCase(updateadminRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateadminRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(updateadminRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update role";
      })

      // deleteCategory
      .addCase(deleteadminRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteadminRole.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.roles)) {
          state.roles = state.roles.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteadminRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete Role";
      });
  },
});

// Export the reducer
export default adminrolesSlice.reducer;
