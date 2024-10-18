import axios from "axios";
import Cookies from "js-cookie";

// Define base URL
const baseURL = "https://phplaravel-1332551-4877980.cloudwaysapps.com/api";
// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL,
});

// Add request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const bookacrib_token = Cookies.get("bookacrib_admin_token");
    const bookacrib_userToken = Cookies.get("bookacrib_user_token");
    const bookacrib_companyId = Cookies.get("bookacrib_current_company_id");
    // console.log("token given", userToken);
    if (bookacrib_token || bookacrib_userToken) {
      config.headers.Authorization = `Bearer ${
        bookacrib_token || bookacrib_userToken
      }`;
    }
    // Add company ID to headers
    // if (bookacrib_companyId) {
    //   config.headers.company_id = bookacrib_companyId;
    // }
    // Add company ID to headers with correct key
    if (bookacrib_companyId) {
      config.headers["company-id"] = bookacrib_companyId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Your error handling logic
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
