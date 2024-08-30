import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

const PRODUCT_URL = "admin/product";

const fetchProducts = createAsyncThunk(
  "admin/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(PRODUCT_URL);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const addNewProduct = createAsyncThunk(
  "addNewProduct",
  async (ProductData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(PRODUCT_URL, ProductData);

      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        toast.success("Product created successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Product created successfully",
        //   })
        // );
      }
      console.log("Product create response", response);
      dispatch(fetchProducts());
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

// Async thunk action creator for fetching a single Product
const fetchProduct = createAsyncThunk(
  "getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`${PRODUCT_URL}/${id}`);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(`${PRODUCT_URL}/${id}`, formData);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        dispatch(fetchProducts());
        toast.success("Product updated successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Product account updated successfully",
        //   })
        // );
      }
      // console.log("editing Response", response);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(`${PRODUCT_URL}/${id}`);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        dispatch(fetchProducts());
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Product has been deleted successfully",
        //   })
        // );
      }
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

export {
  fetchProducts,
  addNewProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
};
