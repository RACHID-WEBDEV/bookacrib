import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFeatures,
  addNewFeature,
  fetchFeature,
  updateFeature,
  deleteFeature,
} from "./featuresThunk";
// / Import the new thunk action creators

const initialState = {
  features: [],
  feature: [],
  addfeature: [],
  loading: false,
  error: null,
};

// Create the orgaization slice
const featuresSlice = createSlice({
  name: "room_features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload;
      })

      .addCase(fetchFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch feature";
      })

      // addNewFeature
      .addCase(addNewFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.features = [...state.addfeature, action.payload];
      })
      .addCase(addNewFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new feature";
      })

      // fetchFeature
      .addCase(fetchFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.feature = action.payload;
      })
      .addCase(fetchFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch feature";
      })

      // updateFeature
      .addCase(updateFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.feature = action.payload;
      })
      .addCase(updateFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update feature";
      })

      // deleteCategory
      .addCase(deleteFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeature.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.features)) {
          state.features = state.features.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete feature";
      });
  },
});

// Export the reducer
export default featuresSlice.reducer;
