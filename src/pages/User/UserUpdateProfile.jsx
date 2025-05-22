// import banner from "src/assets/images/profile-banner.png";
// import profilavatar from "src/assets/images/user-profile-avatar.png";
import HookForm from "../../components/forms/Form";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
// import { UpdateUserSchema } from "../../schema/authSchema";
// import { useSelector } from "react-redux";
import { getData, patchData } from "../../utils/api";
import toast from "react-hot-toast";
import { EmptySchema } from "../../schema/authSchema";
import { useEffect, useState } from "react";
import ErrorStatus from "../../components/forms/ErrorStatus";
import CustomSelect from "../../components/forms/Select/CustomSelect";

import { TextArea } from "../../components/forms/TextArea";
// import classNames from "classnames";
import UserSettingSideBar from "./UserSettingSideBar";
const UserUpdateProfile = () => {
  // const location = useLocation();
  // const currentPath = location.pathname;
  const maritalData = [
    { name: "Single", status: "Single" },
    { name: "Married", status: "Married" },
    { name: "Divorced", status: "Divorced" },
    { name: "Widowed", status: "Widowed" },
    { name: "Separated", status: "Separated" },
    { name: "Engaged", status: "Engaged" },
  ];
  const [selectedAction, setSelectedAction] = useState(null);

  const titleData = [
    { name: "Mr", status: "Mr" },
    { name: "Mrs", status: "Mrs" },
    { name: "Miss", status: "Miss" },
    { name: "Dr.", status: "Dr." },
    { name: "Prof.", status: "Prof." },
    { name: "Engr.", status: "Engr." },
  ];

  const [selectedTitle, setSelectedTitle] = useState(null);

  const [loadingUserData, setLoadingUserData] = useState(false);
  const [errorUserData, setErrorUserData] = useState(null);
  const [viewUserData, setViewUserData] = useState(null);

  const [loading, setLoading] = useState(false);

  // const [selectedOriginCountry, setSelectedOriginCountry] = useState(null);

  const currentUser = viewUserData?.data;
  // console.log("viewUserData:", viewUserData);
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

    next_of_kin_name:
      currentUser?.next_of_kin_name ||
      currentUser?.data?.user?.next_of_kin_name,
    address: currentUser?.address || currentUser?.data?.user?.address,
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("user data:", data);

    const formatFormData = {
      marital_status: selectedAction?.status,
      title: selectedTitle?.status,
      ...data,
    };

    try {
      const result = await patchData(
        `/v1/users/update-user-profile?with[]=company&with[]=country&with[]=state&with[]=role`,
        formatFormData
      );

      if (
        (result?.status >= 200 && result?.status <= 300) ||
        (result?.status_code >= 200 && result?.status_code <= 300)
      ) {
        toast.success(result.message);
        // navigate("user/shipments/local-shipment/summary");
      }
    } catch (error) {
      console.error("User prodile Update Error:", error);

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
              Update Profile
            </h1>
            <p className="text-slate-500 text-xs md:text-sm font-normal">
              Update your personal information, such as name, email, password
              and other account preferences.
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
                        schema={EmptySchema}
                      >
                        <div className="flex flex-col p-5 box box--stacked">
                          <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                            Update Profile
                          </div>
                          <div>
                            <div className="grid lg:grid-cols-2  lg:gap-x-4 w-full ">
                              <div className="">
                                <Input
                                  name="first_name"
                                  label="First Name"
                                  placeholder="Enter first name"
                                />
                              </div>
                              <div className="">
                                <Input
                                  name="last_name"
                                  label="Last Name"
                                  placeholder="Enter last name"
                                />
                              </div>
                              <div className="pb-4">
                                <CustomSelect
                                  label="Marital Status"
                                  selected={selectedAction}
                                  setSelected={setSelectedAction}
                                  data={maritalData}
                                  withImage={false}
                                  placeholder={
                                    currentUser?.marital_status
                                      ? currentUser?.marital_status
                                      : "Select your marital status"
                                  }
                                />
                              </div>
                              <div className="pb-4">
                                <CustomSelect
                                  label="Title"
                                  selected={selectedTitle}
                                  setSelected={setSelectedTitle}
                                  data={titleData}
                                  withImage={false}
                                  placeholder={
                                    currentUser?.title
                                      ? currentUser?.title
                                      : "Select a title"
                                  }
                                />
                              </div>
                            </div>
                            <Input
                              name="next_of_kin_name"
                              label="Next of Kin Name"
                              // type="password"
                              placeholder="Enter next of kin name"
                            />
                            <TextArea
                              name="address"
                              label="Address"
                              // type="password"
                              placholder="Enter your address"
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
                                  <LoadingSpinner />
                                  <span>Loading...</span>
                                </div>
                              ) : (
                                "Update Profile"
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
      )}
    </>
  );
};

export default UserUpdateProfile;
