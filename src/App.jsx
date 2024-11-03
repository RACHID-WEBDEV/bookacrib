import Home from "./pages/Home";

import { Navigate, Route, Routes } from "react-router-dom";
import MainDashboardLayout from "./layout/MainDashboardLayout";

// import Dashboard from "src/layout/Dashboard";
import Login from "./pages/Login";
import Public from "./Routes/Public";
import Private from "./Routes/Private";
import Register from "./pages/Register";
// import Inventory from "./pages/Admin/Products/Inventory";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import ResendVerification from "./pages/ResendVerification";
import VerifyUser from "./pages/VerifyUser";
import Property from "./pages/Admin/Property/Property";

import CreateProperty from "./pages/Admin/Property/CreateProperty";
import PropertyLayout from "./pages/Admin/Property/PropertyLayout";
import RoomFeatures from "./pages/Admin/Property/RoomFeatures/RoomFeatures";
import RoomTypes from "./pages/Admin/Property/RoomType/RoomType";
import CreateCompany from "./pages/Company/CreateCompany";
import Categories from "./pages/Admin/Property/Categories/Categories";
import Roles from "./pages/Admin/AdminSettings/Roles/Roles";
import AdminSettingsLayout from "./pages/Admin/AdminSettings/AdminSettingsLayout";
import Permission from "./pages/Admin/AdminSettings/Permissions/Permission";
import RoleType from "./pages/Admin/AdminSettings/Roles/RoleType";
import PropertyDetails from "./pages/Admin/Property/PropertyDetails";
import EditProperty from "./pages/Admin/Property/EditProperty";

function App() {
  return (
    <>
      <Routes>
        {/* Routes for the public pages */}

        <Route element={<Public />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/user/reset-password" element={<ResetPassword />} />
          <Route path="/user/account/verify" element={<VerifyUser />} />
          <Route
            path="/resend-verification-link"
            element={<ResendVerification />}
          />

          {/* <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/set-new-password" element={<ResetPassword />} />
            
            */}
        </Route>

        <Route element={<Private />}>
          <Route path="admin" element={<MainDashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />}>
              {/* <Route index element={<Navigate replace to="dashboard" />} /> */}
              {/* <Route path="/dashboard/home-admin" element={<Dashboard />} />
              <Route path="/dashboard/order-home" element={<Dashboard />} /> */}
            </Route>
            <Route path="create-company" element={<CreateCompany />} />
            <Route path="property" element={<PropertyLayout />}>
              <Route index element={<Navigate replace to="all-property" />} />
              <Route path="all-property" element={<Property />} />
              <Route
                path="property-detail/:uuid"
                element={<PropertyDetails />}
              />

              <Route path="create-property" element={<CreateProperty />} />
              <Route path="property-edit/:uuid" element={<EditProperty />} />

              <Route path="features" element={<RoomFeatures />} />
              <Route path="room-types" element={<RoomTypes />} />
              <Route path="categories" element={<Categories />} />
            </Route>
            {/* <Route path="product" element={<Inventory />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="product/inventory" element={<Inventory />} />
              <Route path="/dashboard/order-home" element={<Dashboard />} />
            </Route> */}

            <Route path="settings" element={<AdminSettingsLayout />}>
              <Route index element={<Navigate replace to="roles" />} />
              <Route path="roles" element={<Roles />} />
              <Route path="role-types" element={<RoleType />} />
              <Route path="permissions" element={<Permission />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
