import Home from "./pages/Home";

import { Navigate, Route, Routes } from "react-router-dom";
import MainDashboardLayout from "./layout/MainDashboardLayout";
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
// import ListBookings from "./pages/Admin/Property/ListBookings/ListBookings";
// import TransactionLayout from "./pages/Admin/Property/ListBookings/TransactionLayout";
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
import UserPrivate from "./Routes/userPrivate";
import BookacribUsers from "./pages/Admin/BookacribUsers/BookacribUsers";
import ListCompany from "./pages/Admin/Company/ListCompany";
import ViewCompany from "./pages/Admin/Company/ViewCompany";
import AdminProperties from "./pages/Admin/Property/AdminProperties";
import AdminCategories from "./pages/Admin/Property/AdminCategories/AdminCategories";
import AdminRoomType from "./pages/Admin/Property/RoomType/AdminRoomType";
import AdminRoomFeatures from "./pages/Admin/Property/RoomFeatures/AdminRoomFeatures";
import BooksPermission from "./pages/Admin/BooksAdminSettings/BooksPermissions/BooksPermission";
import BooksRoles from "./pages/Admin/BooksAdminSettings/BooksRoles/BooksRoles";
import AdminRoleType from "./pages/Admin/BooksAdminSettings/BooksRoles/AdminRoleType";
import UserDashboard from "./pages/User/UserDashboard";
import UserListBookings from "./pages/User/UserListBookings/UserListBookings";
import UserTransactionLayout from "./pages/User/UserListBookings/UserTransactionLayout";
import BookingsDetails from "./pages/User/UserListBookings/BookingsDetails";
import ProfileSettings from "./pages/User/ProfileSettings";
import UserNotications from "./pages/User/UserNotifications";
import AccountDeactivation from "./pages/User/AccountDeactivation";
import UserUpdatePassword from "./pages/User/UserUpdatePassword";
import UserUpdateProfile from "./pages/User/UserUpdateProfile";
import CribPrivate from "./Routes/CribPrivate";
import CribDashboardLayout from "./layout/CribDashboardLayout";
import CribDashboard from "./pages/Company/CribDashboard";
import CribTransactionLayout from "./pages/Company/CribListBookings/CribTransactionLayout";
import CribListBookings from "./pages/Company/CribListBookings/CribListBookings";
import CribBookingsDetails from "./pages/Company/CribListBookings/CribBookingsDetails";
import AdminTransactionLayout from "./pages/Admin/AdminListBookings/AdminTransactionLayout";
import AdminListBookings from "./pages/Admin/AdminListBookings/AdminListBookings";
import AdminBookingsDetails from "./pages/Admin/AdminListBookings/AdminBookingsDetails";
import CribUsers from "./pages/Company/CribUsers/CribUsers";
import PropertyCrib from "./pages/Admin/Property/PropertyCrib";
import CribPropertyOverview from "./pages/CribPropertyOverview";
import AccountDelete from "./pages/User/AccountDelete";

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
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="customers" element={<BookacribUsers />} />
            <Route path="list-companies" element={<ListCompany />} />
            <Route path="create-company" element={<CreateCompany />} />
            <Route path="transactions" element={<AdminTransactionLayout />}>
              <Route index element={<Navigate replace to="list-bookings" />} />
              <Route path="list-bookings" element={<AdminListBookings />} />
              <Route
                path="booking-details/:uuid"
                element={<AdminBookingsDetails />}
              />

              {/* <Route
                path="property-detail/:uuid"
                element={<PropertyDetails />}
              />

             
              <Route path="property-edit/:uuid" element={<EditProperty />} />

              */}
            </Route>
            <Route path="view-company/:uuid" element={<ViewCompany />} />

            <Route path="property" element={<PropertyLayout />}>
              <Route index element={<Navigate replace to="all-properties" />} />
              <Route path="all-properties" element={<AdminProperties />} />
              <Route
                path="view-properties/:uuid"
                element={<PropertyDetails />}
              />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="room-types" element={<AdminRoomType />} />
              <Route path="features" element={<AdminRoomFeatures />} />

              <Route path="create-property" element={<CreateProperty />} />
              <Route path="property-edit/:uuid" element={<EditProperty />} />
            </Route>

            <Route path="settings" element={<AdminSettingsLayout />}>
              <Route index element={<Navigate replace to="roles" />} />
              <Route path="roles" element={<BooksRoles />} />
              <Route path="role-types" element={<AdminRoleType />} />
              <Route path="permissions" element={<BooksPermission />} />
            </Route>
            <Route path="notifications" element={<UserNotications />} />
          </Route>
        </Route>
        <Route element={<CribPrivate />}>
          <Route path="crib-owner" element={<CribDashboardLayout />}>
            <Route path="dashboard" element={<CribDashboard />} />

            <Route path="create-company" element={<CreateCompany />} />
            <Route path="transactions" element={<CribTransactionLayout />}>
              <Route index element={<Navigate replace to="list-bookings" />} />
              <Route path="list-bookings" element={<CribListBookings />} />
              <Route
                path="booking-details/:uuid"
                element={<CribBookingsDetails />}
              />
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
              <Route path="all-property" element={<PropertyCrib />} />
              <Route
                path="property-detail/:uuid"
                // element={<PropertyDetails />}
                element={<CribPropertyOverview />}
              />

              <Route path="create-property" element={<CreateProperty />} />
              <Route path="property-edit/:uuid" element={<EditProperty />} />

              <Route path="features" element={<RoomFeatures />} />
              <Route path="room-types" element={<RoomTypes />} />
              <Route path="categories" element={<Categories />} />
            </Route>
            <Route path="notifications" element={<UserNotications />} />
            <Route path="users" element={<CribUsers />} />
            <Route path="settings" element={<AdminSettingsLayout />}>
              <Route index element={<Navigate replace to="roles" />} />
              <Route path="roles" element={<Roles />} />
              <Route path="role-types" element={<RoleType />} />
              <Route path="permissions" element={<Permission />} />
            </Route>
            {/* <Route path="settings" element={<AdminSettingsLayout />}>
              <Route
                index
                element={<Navigate replace to="profile-settings" />}
              />
              <Route path="profile-settings" element={<ProfileSettings />} />
              <Route
                path="account-deactivation"
                element={<AccountDeactivation />}
              />
              <Route path="update-profile" element={<UserUpdateProfile />} />
              <Route path="update-password" element={<UserUpdatePassword />} />
            </Route> */}
          </Route>
        </Route>
        <Route element={<UserPrivate />}>
          <Route path="user" element={<MainDashboardLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />

            <Route path="create-company" element={<CreateCompany />} />
            <Route path="transactions" element={<UserTransactionLayout />}>
              <Route index element={<Navigate replace to="list-bookings" />} />
              <Route path="list-bookings" element={<UserListBookings />} />
              <Route
                path="booking-details/:uuid"
                element={<BookingsDetails />}
              />
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
            <Route path="notifications" element={<UserNotications />} />
            {/* <Route path="settings" element={<AdminSettingsLayout />}>
              <Route index element={<Navigate replace to="roles" />} />
              <Route path="roles" element={<Roles />} />
              <Route path="role-types" element={<RoleType />} />
              <Route path="permissions" element={<Permission />} />
            </Route> */}
            <Route path="settings" element={<AdminSettingsLayout />}>
              <Route
                index
                element={<Navigate replace to="profile-settings" />}
              />
              <Route path="profile-settings" element={<ProfileSettings />} />
              <Route
                path="account-deactivation"
                element={<AccountDeactivation />}
              />
              <Route path="delete-account" element={<AccountDelete />} />
              <Route path="update-profile" element={<UserUpdateProfile />} />
              <Route path="update-password" element={<UserUpdatePassword />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
