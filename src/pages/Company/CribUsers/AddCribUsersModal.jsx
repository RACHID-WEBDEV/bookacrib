import { ScrollArea } from "../../../components/forms/scroll-area";
import HookForm from "../../../components/forms/Form";
import { Button } from "../../../components/forms/Button";
import { Input } from "../../../components/forms/Input";

// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CreateUserSchema, ResendUserSchema } from "../../../schema/authSchema";
import toast from "react-hot-toast";
import SmallSpinner from "../../../components/Loading/SmallSpinner";

import {
  addNewcribUser,
  fetchcribUsers,
  // resendcribUser,
} from "../../../Redux/cribusers/cribusersThunk";
import { useState } from "react";
import { postData } from "../../../utils/api";

// eslint-disable-next-line react/prop-types
const AddCribUsersModal = ({ setOpenModal }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showResendModal, setShowResendModal] = useState(false);

  const [loadingshipment, setLoadingshipment] = useState(false);
  // const [shipmentsData, setShipmentsData] = useState([]);
  // const [error, setError] = useState(null);

  // console.log("resend data :,", shipmentsData);
  // console.log("error:,", error);

  const { loading, loadingresend } = useSelector((state) => state.cribusers);

  console.log("loadingresend:", loadingresend, "loading:", loading);

  const defaultFormValue = {};
  const onSubmit = async (data) => {
    const filteredFormData = {
      ...data,
    };

    console.log("filtered data", filteredFormData);

    try {
      const result = await dispatch(addNewcribUser(filteredFormData)).unwrap();
      // console.log("Add result", result);

      if (result.status >= 200 && result.status <= 300) {
        dispatch(
          fetchcribUsers("/v1/customers/company/users/list-users-by-company-id")
        );
        toast.success(result.message, { duration: 6000 });
      }
    } catch (error) {
      // console.log("addNew Feature error", error);
      if (error?.status >= 400 && error?.status <= 499) {
        dispatch(
          fetchcribUsers("/v1/customers/company/users/list-users-by-company-id")
        );
        // const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(error.message, { duration: 6000 });
      }
    }
    // alert(JSON.stringify(filteredFormData));

    setOpenModal(false);
  };

  const onSubmitResend = async (data) => {
    const filteredFormData = {
      email: data.email,
    };

    console.log("filtered data", filteredFormData);
    setLoadingshipment(true);
    try {
      const response = await postData(
        "/v1/customers/company/users/resend-verification-link",
        filteredFormData
      );
      console.log("resend response", response);
      if (response?.status >= 200 && response?.status <= 299) {
        //  const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.success(response.message, { duration: 6000 });
      }
      // setShipmentsData(response);
    } catch (error) {
      // console.log("resend error", error);
      toast.error(error.response.data.message, { duration: 6000 });
      // if (error?.status >= 400 && error?.status <= 499) {

      //    const errorMessages = Object.values(error?.errors).flat().join(", ");
      //   toast.error(error.message, { duration: 6000 });
      // }
      // setError(error.response.data.message);
    } finally {
      setLoadingshipment(false);
    }

    // try {
    //   const result = await dispatch(resendcribUser(filteredFormData)).unwrap();
    //   console.log("resend result", result);

    //   if (result.status >= 200 && result.status <= 300) {
    //     // dispatch(
    //     //   fetchcribUsers("/v1/customers/company/users/list-users-by-company-id")
    //     // );
    //     toast.success(result.message, { duration: 6000 });
    //   }
    // } catch (error) {
    //   // console.log("addNew Feature error", error);
    //   if (error?.status >= 400 && error?.status <= 499) {
    //     // dispatch(
    //     //   fetchcribUsers("/v1/customers/company/users/list-users-by-company-id")
    //     // );
    //     // const errorMessages = Object.values(error?.errors).flat().join(", ");
    //     toast.error(error.message, { duration: 6000 });
    //   }
    // }
    // alert(JSON.stringify(filteredFormData));

    setOpenModal(false);
  };
  return (
    <div className="w-full h-full fixed inset-0 bg-black/70 z-50 bg-opacity-50 backdrop-blur">
      <div
        aria-hidden="true"
        className=" overflow-y-hidden overflow-x-hidden z-50 flex justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full "
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {showResendModal ? (
            <HookForm
              defaultValues={defaultFormValue}
              onSubmit={onSubmitResend}
              schema={ResendUserSchema}
            >
              <div className="relative bg-white rounded-2xl shadow ">
                <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 ">
                      Resend User verification
                    </h1>
                    <p className="text-gray-600 text-sm font-light">
                      Send user new verification link to your account
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    onClick={() => setOpenModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* contents below */}
                <div className=" max-h-[560px] overflow-y-scroll">
                  <ScrollArea className="h-full">
                    <div className="p-5">
                      <Input
                        name="email"
                        label="Email Address"
                        placeholder="Enter user email address"
                        type="email"
                      />
                    </div>
                  </ScrollArea>
                </div>

                <div className="p-4 border-t">
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      onClick={() => setShowResendModal(false)}
                      outline
                      color="primaryAlt"
                      size="xs"
                    >
                      Create New User
                    </Button>
                    <Button disabled={loadingshipment} type="submit" size="xs">
                      {loadingshipment ? (
                        <div className="inline-flex items-center gap-3">
                          <SmallSpinner />
                          <span>Resending...</span>
                        </div>
                      ) : (
                        "Resend"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </HookForm>
          ) : (
            <HookForm
              defaultValues={defaultFormValue}
              onSubmit={onSubmit}
              schema={CreateUserSchema}
            >
              <div className="relative bg-white rounded-2xl shadow ">
                <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 ">
                      Create User
                    </h1>
                    <p className="text-gray-600 text-sm font-light">
                      Add a user under your compnay to perform different action
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    onClick={() => setOpenModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* contents below */}
                <div className=" max-h-[560px] overflow-y-scroll">
                  <ScrollArea className="h-full">
                    <div className="p-5">
                      <div className=" grid lg:grid-cols-2 gap-4">
                        <div className="">
                          <Input
                            name="first_name"
                            label="First Name"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="">
                          <Input
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      <Input
                        name="email"
                        label="Email Address"
                        placeholder="Enter your email address"
                        type="email"
                      />
                      <Input
                        name="phone_number"
                        label="Phone Number"
                        placeholder="Enter your number"
                        type="number"
                      />
                    </div>
                  </ScrollArea>
                </div>

                <div className="p-4 border-t">
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      onClick={() => setShowResendModal(true)}
                      outline
                      color="primaryAlt"
                      size="xs"
                    >
                      Resend verification
                    </Button>
                    <Button disabled={loading} type="submit" size="xs">
                      {loading ? (
                        <div className="inline-flex items-center gap-3">
                          <SmallSpinner />
                          <span>Creating...</span>
                        </div>
                      ) : (
                        "Create User "
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </HookForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCribUsersModal;
