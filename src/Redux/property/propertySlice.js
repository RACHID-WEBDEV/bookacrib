import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPropertys,
  addNewProperty,
  fetchProperty,
  updateProperty,
  updatePropertyFeature,
  deleteProperty,
} from "./propertyThunk";
// / Import the new thunk action creators

const initialState = {
  propertys: [],
  property: [],
  addProperty: [],
  loading: false,
  error: null,
};

// Create the orgaization slice
const propertysSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategorys
      .addCase(fetchPropertys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertys.fulfilled, (state, action) => {
        state.loading = false;
        state.propertys = action.payload;
      })

      .addCase(fetchPropertys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch property";
      })

      // addNewProperty
      .addCase(addNewProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.propertys = [...state.addProperty, action.payload];
      })
      .addCase(addNewProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new property";
      })

      // fetchProperty
      .addCase(fetchProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch property";
      })

      // updateProperty
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update property";
      })

      // update Property features
      .addCase(updatePropertyFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePropertyFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(updatePropertyFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update property";
      })

      // deleteCategory
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.propertys)) {
          state.propertys = state.propertys.filter(
            (org) => org.id !== action.payload.id
          );
        }
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete property";
      });
  },
});

// Export the reducer
export default propertysSlice.reducer;
