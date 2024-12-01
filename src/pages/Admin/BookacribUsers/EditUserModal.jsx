/* eslint-disable react/prop-types */
import { ScrollArea } from "../../../components/forms/scroll-area";
import HookForm from "../../../components/forms/Form";
import { Button } from "../../../components/forms/Button";
import { Input } from "../../../components/forms/Input";

// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { EmptySchema } from "../../../schema/authSchema";
import toast from "react-hot-toast";
import SmallSpinner from "../../../components/Loading/SmallSpinner";
import CustomSelect from "../../../components/forms/Select/CustomSelect";
import { useState } from "react";
import DatePicker from "../../../components/forms/DatePicker";
import { formateCheckDate } from "../../../utils/constant";
import { fetchUsers, updateUser } from "../../../Redux/users/usersThunk";
// import { TextArea } from "../../../components/forms/TextArea";

const EditUserModal = ({ setOpenModal, userData }) => {
  const genderdata = [
    { name: "Male", gender: "male" },
    { name: "Female", gender: "female" },
  ];
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.features);
  const defaultgender = genderdata?.find(
    (item) => item?.gender === userData?.gender
  );
  console.log("defaultgender:", defaultgender);
  const [selectedGender, setSelectedGender] = useState(defaultgender);

  const date = new Date();
  console.log("date:", date);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);

  const dob = formateCheckDate(selectedCheckInDate);
  console.log("userdata", userData);
  console.log(dob);
  const defaultFormValue = {
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    email: userData?.email,
    phone_number: userData?.phone_number,
    address: userData?.address,
  };
  const onSubmit = async (data) => {
    const filteredFormData = {
      ...data,
      gender: selectedGender?.gender,
      date_of_birth: dob === "1970-01-01" ? "" : dob,
    };

    console.log("filtered data", filteredFormData);

    // alert(JSON.stringify(filteredFormData));

    try {
      const result = await dispatch(
        updateUser({
          id: userData?.uuid,
          formData: filteredFormData,
        })
      ).unwrap();
      // console.log("Add result", result);

      if (result.status >= 200 && result.status <= 300) {
        dispatch(
          fetchUsers(
            "/v1/admin/users/list-all-users?with[]=company&with[]=country&with[]=state&with[]=role"
          )
        );
        toast.success(result.message, { duration: 6000 });
        // navigate("/admin/property/features");
      }
    } catch (error) {
      // console.log("addNew Feature error", error);
      if (error?.status >= 400 && error?.status <= 499) {
        dispatch(
          fetchUsers(
            "/v1/admin/users/list-all-users?with[]=company&with[]=country&with[]=state&with[]=role"
          )
        );
        const errorMessage = Object.values(error?.errors).flat().join(", ");
        if (error?.errors) {
          toast.error(errorMessage, { duration: 6000 });
        } else {
          toast.error(error.message, { duration: 6000 });
        }
      }
    }
    setOpenModal(false);
  };

  return (
    <div className="w-full h-full fixed inset-0 bg-black/70 z-50 bg-opacity-50 backdrop-blur">
      <div
        aria-hidden="true"
        className=" overflow-y-hidden overflow-x-hidden z-50 flex justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full "
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <HookForm
            defaultValues={defaultFormValue}
            onSubmit={onSubmit}
            schema={EmptySchema}
          >
            <div className="relative bg-white rounded-2xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Update User Info
                  </h1>
                  <p className="text-gray-600 text-sm font-light">
                    Update important user info for this platform
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
                <ScrollArea className="">
                  <div className="p-5 min-h-[500px]">
                    <div className=" grid gap-x-4 lg:grid-cols-2 ">
                      {/* <Input
                        name="first_name"
                        label="First name"
                        placeholder="Enter a first name"
                      />
                      <Input
                        name="last_name"
                        label="Last name"
                        placeholder="Enter a last name"
                      /> */}

                      <Input
                        name="email"
                        label="Email address"
                        placeholder="Enter email address"
                      />
                      <Input
                        name="phone_number"
                        label="Phone Number"
                        placeholder="Enter phone number"
                        type="number"
                      />
                      <div className="px-2  bg-white rounded-md">
                        <CustomSelect
                          label="Gender"
                          selected={selectedGender}
                          setSelected={setSelectedGender}
                          data={genderdata}
                          withImage={false}
                          placeholder={defaultgender?.name || "Select a Gender"}
                        />
                      </div>
                      <DatePicker
                        label="Date of Birth"
                        setSelectedDate={setSelectedCheckInDate}
                      />
                      {/* <TextArea
                        name="address"
                        label="Address"
                        placholder="Enter a address"
                      /> */}
                    </div>
                    <hr />
                  </div>
                </ScrollArea>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2 justify-end">
                  <Button disabled={loading} type="submit" size="xs">
                    {loading ? (
                      <div className="inline-flex items-center gap-3">
                        <SmallSpinner />
                        <span>Updating...</span>
                      </div>
                    ) : (
                      "Update User Profile"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </HookForm>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
