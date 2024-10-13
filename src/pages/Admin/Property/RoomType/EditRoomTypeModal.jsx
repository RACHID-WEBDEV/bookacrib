/* eslint-disable react/prop-types */
import { ScrollArea } from "../../../../components/forms/scroll-area";
import HookForm from "../../../../components/forms/Form";
import { Button } from "../../../../components/forms/Button";
import { Input } from "../../../../components/forms/Input";
// import { TextArea } from "../../../../components/forms/TextArea";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { RoomSchema } from "../../../../schema/authSchema";
import toast from "react-hot-toast";
import {
  updateRoomType,
  fetchRoomTypes,
} from "../../../../Redux/roomtypes/roomtypesThunk";

const EditRoomTypeModal = ({ setOpenModal, featureData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  console.log("permissions", permissions);
  const defaultFormValue = {
    name: featureData?.name,
  };
  const onSubmit = async (data) => {
    const filteredFormData = {
      name: data?.name,
    };

    console.log("filtered data", filteredFormData);

    // alert(JSON.stringify(filteredFormData));

    try {
      const result = await dispatch(
        updateRoomType({
          id: featureData?.uuid,
          formData: filteredFormData,
        })
      ).unwrap();
      // console.log("Add result", result);

      if (result.status >= 200 && result.status <= 300) {
        dispatch(
          fetchRoomTypes("/bookacrib-api-routes/v1/room-types/list-room-types")
        );
        toast.success(result.message, { duration: 6000 });
        navigate("/admin/property/room-types");
      }
    } catch (error) {
      // console.log("addNew RoomType error", error);
      if (error?.status >= 400 && error?.status <= 499) {
        dispatch(
          fetchRoomTypes("/bookacrib-api-routes/v1/room-types/list-room-types")
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
            schema={RoomSchema}
          >
            <div className="relative bg-white rounded-2xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Update Room Type
                  </h1>
                  <p className="text-gray-600 text-sm font-light">
                    Update a room type for this platform
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
                    <div className="pr-6">
                      <div className="lg:w-full">
                        <Input
                          name="name"
                          label="Feature name"
                          placeholder="Enter a name for the feature"
                        />

                        {/* <Input
                          name="price"
                          label="Price"
                          placeholder="Enter a price for the feature"
                          type="number"
                        /> */}
                      </div>
                    </div>
                    <hr />
                  </div>
                </ScrollArea>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2 justify-end">
                  <Button type="submit" size="xs">
                    Update Room Type
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

export default EditRoomTypeModal;