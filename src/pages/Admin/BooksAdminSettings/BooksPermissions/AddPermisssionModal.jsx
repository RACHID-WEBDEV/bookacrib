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
import { useEffect, useState } from "react";
import { fetchRoles } from "../../../../Redux/roles/rolesThunk";
import CustomSelect from "../../../../components/forms/Select/CustomSelect";
import { getData, postData } from "../../../../utils/api";
import AsyncReactSelect from "../../../../components/forms/Select/AsyncReactSelect";
import { Label } from "../../../../components/forms/Label";

// eslint-disable-next-line react/prop-types
const AddPermisssionModal = ({ setOpenModal }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roles);
  const [selectedRole, setSelectedRole] = useState(null);
  // const { loading } = useSelector((state) => state.features);
  const [loadingPermission, setLoadingPermission] = useState(false);
  //  console.log("permissions", permissions);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueD, setSelectedValueD] = useState(null);
  console.log("selectedValueD", selectedValueD);

  const getDefaultPermissions = Array.isArray(selectedRole?.permissions)
    ? selectedRole?.permissions
    : [];

  // const [selectedValue, setSelectedValue] = useState(getDefaultPermissions);

  useEffect(() => {
    setSelectedValueD(getDefaultPermissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole?.permissions]);

  // console.log("getDefaultPermissions:", getDefaultPermissions);
  const PERMISSIONS_URL =
    "/v1/admin/permissions/list-all-permissions?with[]=roles&limit=10";

  const fetchAllPermisssions = async () => {
    try {
      const response = await getData(PERMISSIONS_URL);
      return response?.data;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      // return rejectWithValue(errorMessage?.response?.data);
    }
  };

  console.log("selectedRole:", selectedRole);
  console.log("roles:", roles);

  const fetchRoleHandler = (url, search) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    }
    dispatch(fetchRoles(fetchUrl));
  };

  useEffect(() => {
    // fetchRoleTypesHandler("v1/users/role/list-user-role-types");
    fetchRoleHandler(
      "/v1/admin/roles/list-all-admin-roles?with[]=permissions&limit=10&type=admin"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const getpermissionsId = selectedValue?.map((data) => data?.uuid);
  // console.log("selectedValue: ", selectedValue);
  console.log("ids: ", getpermissionsId);
  const defaultFormValue = {
    role_id: "",
    permission_ids: "",
  };
  const onSubmit = async () => {
    const filteredFormData = {
      role_id: selectedRole?.uuid,
      permission_ids: getpermissionsId,
    };

    console.log("filtered data", filteredFormData);
    setLoadingPermission(true);
    try {
      const result = await postData(
        "/v1/admin/permissions/attach-permissions-to-role?with[]=permissions",
        filteredFormData
      );
      console.log("Add result", result);

      if (result.status >= 200 && result.status <= 300) {
        dispatch(
          fetchRoles(
            "/v1/admin/roles/list-all-admin-roles?with[]=permissions&limit=10&type=admin"
          )
        );
        toast.success(result.message, { duration: 6000 });
      }
    } catch (error) {
      // console.log("addNew Feature error", error);
      // if (error?.status >= 400 && error?.status <= 499) {
      //   dispatch(
      //     fetchRoles("/v1/users/role/list-all-user-roles?with[]=permissions")
      //   );
      //   // const errorMessages = Object.values(error?.errors).flat().join(", ");
      //   toast.error(error.message, { duration: 6000 });
      // }
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
    setLoadingPermission(false);

    setOpenModal(false);
  };

  return (
    <div className="w-full h-full fixed inset-0 bg-black/70 z-50 bg-opacity-50 backdrop-blur">
      <div
        aria-hidden="true"
        className=" overflow-y-hidden overflow-x-hidden z-50 flex justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full "
      >
        <div className="relative p-4 w-full max-w-3xl max-h-full">
          <HookForm
            defaultValues={defaultFormValue}
            onSubmit={onSubmit}
            schema={EmptySchema}
          >
            <div className="relative bg-white rounded-2xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Attach Permission to Role
                  </h1>
                  <p className="text-gray-600 text-sm font-light">
                    Add a permisssion to admin role to enable them perform
                    certain actions
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
                  <div className="p-5 min-h-[510px]">
                    <div className="">
                      <div className="lg:w-full">
                        {/* <Input
                          name="name"
                          label="Role Name"
                          placeholder="Enter a name for role"
                        /> */}
                        <div className="pb-4">
                          <CustomSelect
                            label="Select Role "
                            selected={selectedRole}
                            setSelected={setSelectedRole}
                            data={roles.data}
                            withImage={false}
                            placeholder="Select a role to add permissions"
                          />
                        </div>
                        {getDefaultPermissions.length !== 0 && (
                          <>
                            <div>
                              <Label
                                text="The listed permissions can't be attached again to the Role Selected"
                                className="pb-2"
                              />
                            </div>
                            <div className=" flex  items-center gap-2 flex-wrap mb-4">
                              {getDefaultPermissions?.map((role, roleIndex) => (
                                <p
                                  className="text-xs p-1 bg-gray-100 text-gray-600 rounded"
                                  key={roleIndex}
                                >
                                  {" "}
                                  {role?.display_name}
                                </p>
                              ))}
                            </div>
                          </>
                        )}
                        <div className="pb-6">
                          <AsyncReactSelect
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            fetchData={fetchAllPermisssions}
                            placeholder="Select a permissions to attach to the role selected"
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
                  <Button disabled={loadingPermission} type="submit" size="xs">
                    {loadingPermission ? (
                      <div className="inline-flex items-center gap-3">
                        <SmallSpinner />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      "Attach Permissions"
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

export default AddPermisssionModal;
