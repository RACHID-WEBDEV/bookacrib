/* eslint-disable react/prop-types */
import { ScrollArea } from "../../../../components/forms/scroll-area";
import HookForm from "../../../../components/forms/Form";
import { Button } from "../../../../components/forms/Button";
// import { Input } from "../../../../components/forms/Input";
import { TextArea } from "../../../../components/forms/TextArea";

// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { EmptySchema } from "../../../../schema/authSchema";
import toast from "react-hot-toast";
import SmallSpinner from "../../../../components/Loading/SmallSpinner";
import { useState } from "react";
import { fetchRoles } from "../../../../Redux/roles/rolesThunk";
// import CustomSelect from "../../../../components/forms/Select/CustomSelect";
import { getData, postData } from "../../../../utils/api";
import AsyncReactSelect from "../../../../components/forms/Select/AsyncReactSelect";

const EditPermisssionModal = ({ setOpenModal, permissionData }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [selectedRole, setSelectedRole] = useState(null);
  const { loading } = useSelector((state) => state.features);
  //  console.log("permissions", permissions);
  const [selectedValue, setSelectedValue] = useState(
    permissionData?.permissions
  );

  const TAGS_URL = "/v1/users/permission/list-all-permissions?limit=100";

  console.log("permissionData:", permissionData);
  const fetchAllPermisssions = async () => {
    try {
      const response = await getData(TAGS_URL);
      return response?.data;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      // return rejectWithValue(errorMessage?.response?.data);
    }
  };

  const getpermissionsId = selectedValue?.map((data) => data?.uuid);

  const defaultFormValue = {
    role_id: "",
    permission_ids: "",
  };
  const onSubmit = async () => {
    const filteredFormData = {
      role_id: permissionData?.uuid,
      permission_ids: getpermissionsId,
    };

    console.log("filtered data", filteredFormData);

    try {
      const result = await postData(
        "v1/users/permission/detach-permissions-from-role?with[]=permissions",
        filteredFormData
      );
      console.log("Add result", result);

      if (result.status >= 200 && result.status <= 300) {
        dispatch(
          fetchRoles("/v1/users/role/list-all-user-roles?with[]=permissions")
        );
        toast.success(result.message, { duration: 6000 });
      }
    } catch (error) {
      if (
        (error?.response?.data?.status >= 400 &&
          error?.response?.data?.status <= 499 &&
          error?.response?.data?.errors) ||
        (error?.response?.data?.status_code >= 400 &&
          error?.response?.data?.status_code <= 499 &&
          error?.response?.data?.errors)
      ) {
        const errorMessages = Object.values(error?.response?.data?.errors)
          .flat()
          .join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.response?.data?.message, { duration: 6000 });
      }
    }
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
                    Detash/Remove Permission
                  </h1>
                  <p className="text-gray-600 text-sm font-light">
                    Detash a permisssion already give to user role to limit
                    their actions
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
                <ScrollArea className="h-full ">
                  <div className="p-5 min-h-[420px]">
                    <div className="">
                      <div className="lg:w-full">
                        {/* <Input
                          name="name"
                          label="Role Name"
                          placeholder="Enter a name for role"
                        /> */}
                        {/* <div className="pb-4">
                          <CustomSelect
                            label="Select Role "
                            selected={selectedRole}
                            setSelected={setSelectedRole}
                            data={roles.data}
                            withImage={false}
                            placeholder="Select a user role"
                          />
                        </div> */}
                        <div className="pb-6">
                          <AsyncReactSelect
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            fetchData={fetchAllPermisssions}
                            placeholder="Select a permissions"
                            label="Permissions"
                            isMulti
                          />
                        </div>
                        <TextArea
                          name="description"
                          label="Description"
                          placholder="Enter a description"
                        />
                      </div>
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
                      "Update Permissions"
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

export default EditPermisssionModal;
