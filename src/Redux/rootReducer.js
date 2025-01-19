import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminauthReducer from "./adminAuth/adminAuthSlice";
import productsReducer from "./products/productsSlice";
import featuresReducer from "./features/featuresSlice";
import roomTypeReducer from "./roomtypes/roomtypesSlice";
import categoryReducer from "./categories/categoriesSlice";
import rolesReducer from "./roles/rolesSlice";
import propertyReducer from "./property/propertySlice";
import listBookingReducer from "./listBookings/listBookingsSlice";
import usersReducer from "./users/usersSlice";
import admincategoryReducer from "./admincategories/admincategoriesSlice";
import adminrolesReducer from "./adminroles/adminrolesSlice";
import cribusersReducer from "./cribusers/cribusersSlice";

// Combine the slice reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  adminauth: adminauthReducer,
  products: productsReducer,
  features: featuresReducer,
  roomtype: roomTypeReducer,
  category: categoryReducer,
  roles: rolesReducer,
  properties: propertyReducer,
  listbooking: listBookingReducer,
  users: usersReducer,
  admincategory: admincategoryReducer,
  adminroles: adminrolesReducer,
  cribusers: cribusersReducer,
});

// No need to define RootState type in JavaScript
export default rootReducer;
