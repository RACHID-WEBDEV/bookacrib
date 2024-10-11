import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userauthReducer from "./userAuth/userAuthSlice";
import productsReducer from "./products/productsSlice";
import featuresReducer from "./features/featuresSlice";
import roomTypeReducer from "./roomtypes/roomtypesSlice";

// Combine the slice reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  userauth: userauthReducer,
  products: productsReducer,
  features: featuresReducer,
  roomtype: roomTypeReducer,
});

// No need to define RootState type in JavaScript
export default rootReducer;
