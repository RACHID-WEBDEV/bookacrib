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
const ProfileSettings = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log("first path: ", currentPath);

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
      {loadingUserData ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : errorUserData ? (
        <ErrorStatus
          message={JSON.stringify(errorUserData?.message)}
          statusCode={errorUserData?.status_code || errorUserData?.status}
          link="/"
          reload
        />
      ) : (
        <div className="relative">
          <div className=" py-2 pl-2 z-40">
            <h1 className="text-lg font-semibold text-gray-900 ">
              Profile Settings
            </h1>
            <p className="text-slate-500 text-xs md:text-sm font-normal">
              Manage and update your personal information, such as name, email,
              password, profile picture, and other account preferences.
            </p>
          </div>
          <div className="px-0 mt-0">
            <div className="container">
              <div className="grid grid-cols-12 gap-y-10 gap-x-6">
                <div className="col-span-12">
                  <div className="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">
                    <div className="relative col-span-12 xl:col-span-3">
                      <div className="sticky top-[104px]">
                        <div className="flex flex-col px-5 pt-5 pb-6 box box--stacked">
                          <Link
                            className={classNames(
                              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
                              {
                                "text-primary-900":
                                  "/user/settings/profile-settings" ===
                                  currentPath,
                              }
                            )}
                            to="/user/settings"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-app-window stroke-[1.3] w-4 h-4 mr-3"
                            >
                              <rect x={2} y={4} width={20} height={16} rx={2} />
                              <path d="M10 4v4" />
                              <path d="M2 8h20" />
                              <path d="M6 4v4" />
                            </svg>{" "}
                            Profile Info
                          </Link>

                          <Link
                            className={classNames(
                              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
                              {
                                "text-primary-900":
                                  "/user/settings/update-password" ===
                                  currentPath,
                              }
                            )}
                            to="/user/settings/update-password"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-key-round stroke-[1.3] w-4 h-4 mr-3"
                            >
                              <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                              <circle cx="16.5" cy="7.5" r=".5" />
                            </svg>{" "}
                            Change Password
                          </Link>
                          <Link
                            className={classNames(
                              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
                              {
                                "text-primary-900":
                                  "/user/settings/update-profile" ===
                                  currentPath,
                              }
                            )}
                            to="/user/settings/update-profile"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-package-check stroke-[1.3] w-4 h-4 mr-3"
                            >
                              <path d="m16 16 2 2 4-4" />
                              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                              <path d="m7.5 4.27 9 5.15" />
                              <polyline points="3.29 7 12 12 20.71 7" />
                              <line x1={12} x2={12} y1={22} y2={12} />
                            </svg>{" "}
                            Update Profile
                          </Link>

                          <Link
                            className={classNames(
                              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
                              {
                                "text-primary-900":
                                  "/user/settings/account-deactivation" ===
                                  currentPath,
                              }
                            )}
                            to="/user/settings/account-deactivation"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-trash2 stroke-[1.3] w-4 h-4 mr-3"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1={10} x2={10} y1={11} y2={17} />
                              <line x1={14} x2={14} y1={11} y2={17} />
                            </svg>{" "}
                            Account Deactivation
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col col-span-12 xl:col-span-9 gap-y-7">
                      <div className="p-1.5 box flex flex-col box--stacked">
                        <div className="h-60 relative w-full rounded-[0.6rem] bg-gradient-to-b from-primary-800/95 to-primary-600/95">
                          <div className="w-full h-full relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem] after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]" />
                          <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-36">
                            <div className="w-full h-full overflow-hidden border-[6px] boxx border-white rounded-full image-fit">
                              <img alt="profile image" src={profilavatar} />
                            </div>
                            <div className="absolute bottom-0 right-0 w-5 h-5 mb-2.5 mr-2.5 border-2 border-white rounded-full bg-success-600 boxx" />
                          </div>
                        </div>
                        <div className="p-5 flex flex-col sm:flex-row gap-y-3 sm:items-end rounded-[0.6rem] bg-slate-50 pt-12 dark:bg-darkmode-500">
                          <div>
                            <label
                              htmlFor="regular-form-1"
                              className="mb-2 flex items-center text-slate-500 text-sm"
                            >
                              Who can see your profile photo?
                              <div className="cursor-pointer ml-1.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-info w-3.5 h-3.5 text-slate-500 stroke-[1.3]"
                                >
                                  <circle cx={12} cy={12} r={10} />
                                  <path d="M12 16v-4" />
                                  <path d="M12 8h.01" />
                                </svg>
                              </div>
                            </label>
                            <div className="relative mt-2.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-globe absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
                              >
                                <circle cx={12} cy={12} r={10} />
                                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                <path d="M2 12h20" />
                              </svg>
                              <select className="bg-[length:20px_auto] disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-700/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-700/50 bg-chevron-black transition duration-200 ease-in-out w-full text-sm border-slate-300/60 shadow-sm py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:!bg-darkmode-700 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:bg-chevron-white sm:w-44 mr-3 rounded-[0.5rem] pl-9">
                                <option value="custom-date">Anyone</option>
                                <option value="daily">Only you</option>
                              </select>
                            </div>
                          </div>
                          <button className=" text-sm transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-primary-600 dark:border-primary [&:hover:not(:disabled)]:bg-primary-600/10 sm:ml-auto border-primary/50">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-image stroke-[1.3] w-4 h-4 mr-2.5"
                            >
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <circle cx={9} cy={9} r={2} />
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>{" "}
                            Upload Cover
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col p-5 box box--stacked">
                        <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                          Profile Info
                        </div>
                        <div>
                          <HookForm
                            defaultValues={defaultFormValue}
                            onSubmit={onSubmit}
                            schema={EmptySchema}
                          >
                            <div className="grid lg:grid-cols-2  lg:gap-4 w-full ">
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
                            </div>
                            <div>
                              <Input
                                disabled
                                name="phone"
                                label="Phone Number"
                                placeholder="Enter your phone number"
                              />
                            </div>
                            <div>
                              <Input
                                disabled
                                name="email"
                                label="Email Address"
                                placeholder="Enter your email address"
                              />
                            </div>

                            {/* <Input
                              name="status"
                              label="Bio"
                              placeholder="Write a brief description about yourself"
                            /> */}

                            {/* <div className=" float-start text-sm mb-4">
                  <Link to="/forget-password">
                    <p className=" text-primary-700 font-medium">
                      Forgot Password?
                    </p>
                  </Link>
                </div> */}

                            {/* <Button
                              type="submit"
                              size="md"
                              disabled={loadingUserData}
                              className="w-full justify-center"
                            >
                              {loadingUserData ? (
                                <div className="inline-flex items-center gap-3">
                                  <LoadingSpinner />
                                  <span>Loading...</span>
                                </div>
                              ) : (
                                "Update profile"
                              )}
                            </Button> */}
                          </HookForm>
                        </div>
                        <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
                          <Link to="/user/settings/update-profile">
                            <Button
                              type="submit"
                              size="md"
                              //   disabled={loading}
                              // className="w-full justify-center"
                              leftIcon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width={24}
                                  height={24}
                                  fill="currentColor"
                                  className=" h-4 w-4 stroke-[1.3]"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                                </svg>
                              }
                            >
                              {/* {loadingUserData ? (
                              <div className="inline-flex items-center gap-3">
                                <LoadingSpinner />
                                <span>Loading...</span>
                              </div>
                            ) : (
                              ""
                            )} */}
                              Update profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSettings;
