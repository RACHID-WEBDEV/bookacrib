/* eslint-disable no-unused-vars */
// import banner from "src/assets/images/profile-banner.png";
import profilavatar from "src/assets/images/user-profile-avatar.png";
import HookForm from "../../components/forms/Form";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
// import { UpdateUserSchema } from "../../schema/authSchema";
// import { useSelector } from "react-redux";
import { getData, putData } from "../../utils/api";
import toast from "react-hot-toast";
import { EmptySchema } from "../../schema/authSchema";
import { useEffect, useState } from "react";
import ErrorStatus from "../../components/forms/ErrorStatus";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import UserSettingSideBar from "./UserSettingSideBar";
const AccountDelete = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [loadingUserData, setLoadingUserData] = useState(false);
  const [errorUserData, setErrorUserData] = useState(null);
  const [viewUserData, setViewUserData] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const [selectedOriginCountry, setSelectedOriginCountry] = useState(null);

  const currentUser = viewUserData?.data;
  console.log("viewUserData:", viewUserData);
  console.log(loadingUserData, errorUserData);

  // const bookData = viewUserData?.data?.cached_UserData_data;
  // console.log("bookData:", bookData);

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
    console.log("user data:", data);

    try {
      const result = await putData(`user/update-user`, data);

      if (
        (result?.status >= 200 && result?.status <= 300) ||
        (result?.status_code >= 200 && result?.status_code <= 300)
      ) {
        toast.success("User profile update successfully ");
        // navigate("user/shipments/local-shipment/summary");
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
  };
  return (
    <>
      <div className="relative">
        <div className=" py-2 pl-2 z-40">
          <h1 className="text-lg font-semibold text-gray-900 ">
            Delete Account
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-normal">
            Delete your account if you suspect any suspicious activity or
            unauthorized access.
          </p>
        </div>
        <div className="px-0 mt-0">
          <div className="container">
            <div className="grid grid-cols-12 gap-y-10 gap-x-6">
              <div className="col-span-12">
                <div className="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">
                  <UserSettingSideBar />
                  <div className="flex relative flex-col col-span-12 xl:col-span-9 gap-y-7">
                    <div className="sticky top-[104px]">
                      <div className="p-1.5  flex flex-col  pb-6 box box--stacked">
                        <div className=" md:px-3  mt-6 md:mt-0 mb-10">
                          <div className="p-6  bg-white dark:bg-slate-900 mt-6">
                            <h5 className="text-lg font-bold mb-0 text-red-700">
                              Delete Account:
                            </h5>
                            <p className="text-slate-500 mb-4">
                              Are you sure you want to delete your account? Once
                              deleted, you will no longer have access to it.
                              <br />
                              Please press the{" "}
                              <span className=" font-semibold">
                                &quot;Delete&quot;
                              </span>{" "}
                              button below to proceed.
                              {/* Do you want to delete your account once Delete you
                              wouldn&apos;t have Access to your Account again?
                              Please press below &quot;Delete&quot; button */}
                            </p>
                            <div className="">
                              <Button size="sm">Delete</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AccountDelete;
