import { createSlice } from "@reduxjs/toolkit";
import {
  fetchadminCategoriess,
  addNewadminCategories,
  fetchadminCategories,
  updateadminCategories,
  deleteadminCategories,
} from "./admincategoriesThunk";
// / Import the new thunk action creators

const initialState = {
  categories: [],
  category: [],
  addcategory: [],
  loading: false,
  error: null,
};

// Create the slice
const categoriessSlice = createSlice({
  name: "admincategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchadminCategoriess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchadminCategoriess.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchadminCategoriess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      })

      // addNewCategories
      .addCase(addNewadminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewadminCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = [...state.addcategory, action.payload];
      })
      .addCase(addNewadminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new categoriess";
      })

      // fetchCategories
      .addCase(fetchadminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchadminCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchadminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      })

      // updateCategories
      .addCase(updateadminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateadminCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(updateadminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update categories";
      })

      // deleteCategory
      .addCase(deleteadminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteadminCategories.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.categories)) {
          state.categories = state.categories.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteadminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete categories";
      });
  },
});

// Export the reducer
export default categoriessSlice.reducer;
