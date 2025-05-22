import axios from "axios";
import Cookies from "js-cookie";

// Define base URL
// const OldbaseURL = "https://phplaravel-1332551-4877980.cloudwaysapps.com/api";
const baseURL = "https://phplaravel-1431813-5346483.cloudwaysapps.com/api";
// Create an Axios instance with default configurations

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const adminToken = Cookies.get("bookacrib_admin_token");
    const userToken = Cookies.get("bookacrib_user_token");
    const companyId = localStorage.getItem("bookacrib_current_company_id");

    // Cookies.get("bookacrib_current_company_id");

    // console.log("COMPanyID: ", companyId);
    // Add company ID to headers
    if (adminToken || userToken) {
      config.headers.Authorization = `Bearer ${adminToken || userToken}`;
    }
    // Add company ID to headers with correct key
    if (companyId) {
      config.headers["company-id"] = companyId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Utility function for GET requests
export const getData = async (url, params) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    // Your error handling logic
    console.log(error.message);
    throw error;
  }
};

// Utility function for POST requests
export const postData = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// Utility function for PATCH requests
export const patchData = async (url, data) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error) {
    // Your error handling logic
    console.log(error.message);
    throw error;
  }
};

// Utility function for PUT requests
export const putData = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    // Your error handling logic
    console.log(error.message);
    throw error;
  }
};

// Utility function for DELETE requests
export const removeData = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    // Your error handling logic
    console.log(error.message);
    throw error;
  }
};

export const deleteData = async (url, data) => {
  try {
    const response = await axiosInstance.delete(url, { data });
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
