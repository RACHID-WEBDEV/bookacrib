import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategoriess,
  addNewCategories,
  fetchCategories,
  updateCategories,
  deleteCategories,
} from "./categoriesThunk";
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
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchCategoriess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriess.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategoriess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      })

      // addNewCategories
      .addCase(addNewCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = [...state.addcategory, action.payload];
      })
      .addCase(addNewCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new categoriess";
      })

      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      })

      // updateCategories
      .addCase(updateCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(updateCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update categories";
      })

      // deleteCategory
      .addCase(deleteCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.categories)) {
          state.categories = state.categories.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete categories";
      });
  },
});

// Export the reducer
export default categoriessSlice.reducer;
