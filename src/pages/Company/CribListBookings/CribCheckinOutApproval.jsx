/* eslint-disable react/prop-types */
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { patchData } from "../../../utils/api";
import toast from "react-hot-toast";
import HookForm from "../../../components/forms/Form";
import { ScrollArea } from "../../../components/forms/scroll-area";
import CustomSelect from "../../../components/forms/Select/CustomSelect";
// import { TextArea } from "../../../components/forms/TextArea";
import { Button } from "../../../components/forms/Button";
import { EmptySchema } from "../../../schema/authSchema";
import { useDispatch } from "react-redux";
import SmallSpinner from "../../../components/Loading/SmallSpinner";
import classNames from "classnames";
import { fetchCribListBooking } from "../../../Redux/listBookings/listBookingsThunk";

const CribCheckinOutApproval = ({ setOpenModal, propertyId }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("property id: ", propertyId);
  const [loading, setLoading] = useState(false);
  const actionData = [
    { name: "Checked-In", action: "checked in" },
    { name: "Checked-Out", action: "checked out" },
  ];
  const [selectedAction, setSelectedAction] = useState(null);

  // console.log("selectedAction?.action:", selectedAction?.action);

  const defaultFormValue = {
    arrival_status: "",
    comment: "",
  };
  const onSubmit = async () => {
    const filteredFormData = {
      arrival_status: selectedAction?.action,
      // comment: selectedAction?.action === "approved" ? "" : data?.comment,
    };

    console.log("filtered data", filteredFormData);

    try {
      setLoading(true);
      // console.log("feature_id clicked ", feature_id);
      if (propertyId) {
        const response = await patchData(
          `/bookacrib-api-routes/v1/bookings/update-booking-arrival-status?id=${propertyId}`,
          filteredFormData
        );
        if (
          (response?.status >= 200 && response?.status < 300) ||
          (response?.status_code >= 200 && response?.status_code < 300)
        ) {
          console.log("Guest Approved:", response);
          toast.success(response?.message);
          dispatch(fetchCribListBooking(propertyId));
          // navigate("/database/users/awaiting-kyc");
          // fetchManualKyc("admin/feature-toggles", "");
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("ERROR:", error);
      toast.error(error?.response?.data?.message);
      // navigate("/admin/property/all-property");
    }
    // dispatch(addNewRole(filteredFormData));
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
          <HookForm
            defaultValues={defaultFormValue}
            onSubmit={onSubmit}
            schema={EmptySchema}
          >
            <div className="relative bg-white rounded-2xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Guest Checked IN/OUT
                  </h1>
                  <p className="text-gray-600 text-sm font-light">
                    Checked-In, or Checked-Out Guest that booked this property
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
                    <div className="">
                      <div
                        className={classNames("lg:w-full pb-16 ", {
                          "pb-24": selectedAction?.action === "checked in",
                        })}
                      >
                        {/* <Input
                          name="name"
                          label="Role name"
                          placeholder="Enter a name for the role"
                        /> */}
                        {selectedAction?.action === "checked in" && (
                          <div className="mb-8 text-center ">
                            <h1 className="text-3xl text-gray-900 font-semibold pb-4">
                              Warning
                            </h1>
                            <div className="text-gray-500 font-normal max-w-lg mx-auto">
                              It is recommended to verify the guest booking
                              details and confirm payment before proceeding with
                              check-in.
                            </div>
                          </div>
                        )}
                        {selectedAction?.action === "checked out" && (
                          <div className="mb-8 text-center ">
                            <h1 className="text-3xl text-gray-900 font-semibold pb-4">
                              Warning
                            </h1>
                            <div className="text-gray-500 font-normal max-w-lg mx-auto">
                              Before a guest checks out, it is important to
                              inspect the property to ensure there are no
                              damages.
                            </div>
                          </div>
                        )}
                        <div className="pb-4">
                          <CustomSelect
                            label="Change Guest Booking Status"
                            selected={selectedAction}
                            setSelected={setSelectedAction}
                            data={actionData}
                            withImage={false}
                            placeholder="Select a booking action"
                          />
                        </div>

                        {/* {selectedAction?.action !== "approved" && (
                          <TextArea
                            name="comment"
                            label="Comment"
                            placholder="Enter a comment for your action"
                          />
                        )} */}
                      </div>
                    </div>
                    <hr />
                  </div>
                </ScrollArea>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    onClick={() => setOpenModal(false)}
                    size="xs"
                    outline
                    color="primaryAlt"
                  >
                    Cancel
                  </Button>
                  {/* <Button
                    size="xs"
                   
                    outline
                    color="error"
                  >
                    Cancel
                  </Button> */}
                  <Button
                    disabled={loading}
                    leftIcon={loading && <SmallSpinner />}
                    type="submit"
                    size="sm"
                  >
                    Submit
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

export default CribCheckinOutApproval;
