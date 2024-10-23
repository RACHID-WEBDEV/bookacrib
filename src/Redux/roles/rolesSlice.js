import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRoles,
  addNewRole,
  fetchRole,
  updateRole,
  deleteRole,
} from "./rolesThunk";
// / Import the new thunk action creators

const initialState = {
  roles: [],
  role: [],
  addrole: [],
  loading: false,
  error: null,
};

// Create the orgaization slice
const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })

      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch role";
      })

      // addNewRole
      .addCase(addNewRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = [...state.addrole, action.payload];
      })
      .addCase(addNewRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new role";
      })

      // fetchRole
      .addCase(fetchRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch role";
      })

      // updateRole
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update role";
      })

      // deleteCategory
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.roles)) {
          state.roles = state.roles.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete Role";
      });
  },
});

// Export the reducer
export default rolesSlice.reducer;
