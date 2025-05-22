// import banner from "src/assets/images/profile-banner.png";
// import profilavatar from "src/assets/images/user-profile-avatar.png";
import HookForm from "../../components/forms/Form";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";

// import { UpdateUserSchema } from "../../schema/authSchema";
// import { useSelector } from "react-redux";
import { getData, patchData } from "../../utils/api";
import toast from "react-hot-toast";
import { ResetPasswordSchema } from "../../schema/authSchema";
import { useEffect, useState } from "react";
// import ErrorStatus from "../../components/forms/ErrorStatus";
import { useNavigate } from "react-router-dom";

import SmallSpinner from "../../components/Loading/SmallSpinner";
// import { useDispatch } from "react-redux";
// import { logoutThunk } from "../../Redux/auth/authThunk";
// import { persistor } from "../../Redux/store";
import Cookies from "js-cookie";
import UserSettingSideBar from "./UserSettingSideBar";
const UserUpdatePassword = () => {
  // const location = useLocation();
  // const currentPath = location.pathname;
  const navigate = useNavigate();

  const [loadingUserData, setLoadingUserData] = useState(false);
  const [errorUserData, setErrorUserData] = useState(null);
  const [viewUserData, setViewUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [selectedOriginCountry, setSelectedOriginCountry] = useState(null);

  const currentUser = viewUserData?.data;
  console.log("viewUserData:", viewUserData);
  console.log(loadingUserData, errorUserData);

  // const dispatch = useDispatch();
  // const bookData = viewUserData?.data?.cached_UserData_data;
  // console.log("bookData:", bookData);

  // const handleLogout = () => {
  //   dispatch(logoutThunk());
  //   persistor.purge();
  // };
  const handleViewUserDatas = async () => {
    setLoadingUserData(true);
    try {
      const response = await getData(
        `/v1/users/view-user-profile?with[]=company&with[]=country&with[]=state&with[]=role`
      );
      setViewUserData(response);
      // console.log(response);
    } catch (error) {
      setErrorUserData(error.response.data.message);
    } finally {
      setLoadingUserData(false);
    }
  };

  useEffect(() => {
    handleViewUserDatas();
  }, []);

  const defaultFormValue = {
    first_name: currentUser?.first_name || currentUser?.data?.user?.first_name,

    last_name: currentUser?.last_name || currentUser?.data?.user?.last_name,

    phone: currentUser?.phone_number || currentUser?.data?.user?.phone_number,
    email: currentUser?.email || currentUser?.data?.user?.email,
  };
  const onSubmit = async (data) => {
    setLoading(true);
    console.log("user data:", data);

    try {
      const result = await patchData(`/v1/users/change-user-password`, data);

      if (
        (result?.status >= 200 && result?.status <= 300) ||
        (result?.status_code >= 200 && result?.status_code <= 300)
      ) {
        // handleLogout();
        // clear local storage
        localStorage.clear();
        // localStorage.removeItem("persist:root");
        // Remove cookies related to auth
        Cookies.remove("bookacrib_user_token");
        Cookies.remove("bookacrib_currentUser");
        Cookies.remove("bookacrib_current_company_id");
        Cookies.remove("bookacrib_uniqueId");

        console.log("change password:", result.message);
        toast.success(
          "Password changed Successfully , Logging out in 3 seconds",
          6000
        );
        setTimeout(() => {
          navigate(0); // Reload the page
        }, 3000); // 3000 milliseconds = 3 seconds
      }
    } catch (error) {
      console.error("User Update Error:", error);

      if (
        (error?.response?.data?.status >= 400 &&
          error?.response?.data?.status <= 499 &&
          error?.response?.data?.errors) ||
        (error?.response?.data?.status_code >= 400 &&
          error?.response?.data?.status_code <= 499 &&
          error?.response?.data?.errors)
      ) {
        const errorMessages = Object.values(error?.response?.data?.message)
          .flat()
          .join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.response?.data?.message, { duration: 6000 });
      }
    }
    setLoading(false);
  };
  return (
    <>
      <div className="relative">
        <div className=" py-2 pl-2 z-40">
          <h1 className="text-lg font-semibold text-gray-900 ">
            Update Password
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-normal">
            Manage and update your personal password.
          </p>
        </div>
        <div className="px-0 mt-0">
          <div className="container">
            <div className="grid grid-cols-12 gap-y-10 gap-x-6">
              <div className="col-span-12">
                <div className="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">
                  <UserSettingSideBar />
                  <div className="flex flex-col col-span-12 xl:col-span-9 gap-y-7">
                    <HookForm
                      defaultValues={defaultFormValue}
                      onSubmit={onSubmit}
                      schema={ResetPasswordSchema}
                      resetAfterSubmit={true}
                    >
                      <div className="flex flex-col p-5 box box--stacked">
                        <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                          Update Password
                        </div>
                        <div>
                          {/* <div className="grid lg:grid-cols-2  lg:gap-4 w-full ">
                              <div className="">
                                <Input
                                  disabled
                                  name="first_name"
                                  label="First Name"
                                  placeholder="Enter first name"
                                />
                              </div>
                              <div className="">
                                <Input
                                  disabled
                                  name="last_name"
                                  label="Last Name"
                                  placeholder="Enter last name"
                                />
                              </div>
                            </div> */}
                          <Input
                            name="old_password"
                            // label="Password"
                            type="password"
                            placeholder="Old Password"
                          />
                          <Input
                            name="password"
                            // label="Password"
                            type="password"
                            placeholder="New Password"
                          />
                          <Input
                            name="password_confirmation"
                            // label="Password"
                            type="password"
                            placeholder="Confirm Password"
                          />

                          {/* </HookForm> */}
                        </div>
                        <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
                          <Button
                            type="submit"
                            size="md"
                            //   disabled={loading}
                            // className="w-full justify-center"
                            // leftIcon={
                            //   <svg
                            //     xmlns="http://www.w3.org/2000/svg"
                            //     viewBox="0 0 24 24"
                            //     width={24}
                            //     height={24}
                            //     fill="currentColor"
                            //     className=" h-4 w-4 stroke-[1.3]"
                            //   >
                            //     <path fill="none" d="M0 0h24v24H0z" />
                            //     <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                            //   </svg>
                            // }
                          >
                            {loading ? (
                              <div className="inline-flex items-center gap-3">
                                <SmallSpinner />
                                <span>Loading...</span>
                              </div>
                            ) : (
                              " Update Password"
                            )}
                          </Button>
                        </div>
                      </div>
                    </HookForm>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserUpdatePassword;
