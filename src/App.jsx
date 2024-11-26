import Home from "./pages/Home";

import { Navigate, Route, Routes } from "react-router-dom";
// import MainDashboardLayout from "./layout/MainDashboardLayout";
import AdminDashboardLayout from "./LayoutAdmin/AdminDashboardLayout";

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
import PropertyOverview from "./pages/PropertyOverview";
import PropertyDetailsLayout from "./pages/PropertyDetailsLayout";
import PropertyCheckout from "./pages/PropertyCheckout";
import PaymentCallBack from "./pages/PaymentCallback";
import ListBookings from "./pages/Admin/Property/ListBookings/ListBookings";
import TransactionLayout from "./pages/Admin/Property/ListBookings/TransactionLayout";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import VerifyAdmin from "./pages/Admin/VerifyAdmin";
import AdminForgetPassword from "./pages/Admin/AdminForgetPassword";
import AdminResendVerification from "./pages/Admin/AdminResendVerification";
import AdminForgetPasswordSent from "./pages/Admin/AdminForgetPasswordSent";
import AdminResetPassword from "./pages/Admin/AdminResetPassword";
import AdminRegisterSent from "./pages/Admin/AdminRegisterSent";
import RegisterSent from "./pages/RegisterSent";
import ForgetPasswordSent from "./pages/ForgetPasswordSent";

function App() {
  return (
    <>
      <Routes>
        {/* Routes for the public pages */}

        <Route element={<Public />}>
          <Route path="/" element={<Home />} />
          <Route path="view-property" element={<PropertyDetailsLayout />}>
            <Route path="details/:uuid" element={<PropertyOverview />} />
          </Route>
          <Route path="property/checkout" element={<PropertyCheckout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/user/sign-up-success" element={<RegisterSent />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/forget-password-sent"
            element={<ForgetPasswordSent />}
          />
          <Route path="/user/reset-password" element={<ResetPassword />} />
          <Route path="/user/account/verify" element={<VerifyUser />} />
          <Route
            path="/resend-verification-link"
            element={<ResendVerification />}
          />

          <Route path="payment/confirmation" element={<PaymentCallBack />} />

          {/* <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/set-new-password" element={<ResetPassword />} />
            
            */}
          {/* ADMIN ROUTE PUBLIC */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/sign-up" element={<AdminRegister />} />
          <Route
            path="/admin/sign-up-success"
            element={<AdminRegisterSent />}
          />

          <Route path="/admin/account/verify" element={<VerifyAdmin />} />
          <Route
            path="/admin/forget-password"
            element={<AdminForgetPassword />}
          />
          <Route
            path="/admin/forget-password-sent"
            element={<AdminForgetPasswordSent />}
          />
          <Route
            path="/admin/resend-verification-link"
            element={<AdminResendVerification />}
          />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />
        </Route>

        <Route element={<Private />}>
          <Route
            path="admin"
            element={
              <AdminDashboardLayout />
              // <MainDashboardLayout />
            }
          >
            <Route path="dashboard" element={<AdminDashboard />}></Route>
            <Route path="create-company" element={<CreateCompany />} />
            <Route path="transactions" element={<TransactionLayout />}>
              <Route index element={<Navigate replace to="list-bookings" />} />
              <Route path="list-bookings" element={<ListBookings />} />
              {/* <Route
                path="property-detail/:uuid"
                element={<PropertyDetails />}
              />

              <Route path="create-property" element={<CreateProperty />} />
              <Route path="property-edit/:uuid" element={<EditProperty />} />

              <Route path="features" element={<RoomFeatures />} />
              <Route path="room-types" element={<RoomTypes />} />
              <Route path="categories" element={<Categories />} /> */}
            </Route>
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
