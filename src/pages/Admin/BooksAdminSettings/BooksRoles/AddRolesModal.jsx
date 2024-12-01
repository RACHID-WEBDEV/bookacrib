import { ScrollArea } from "../../../../components/forms/scroll-area";
import HookForm from "../../../../components/forms/Form";
import { Button } from "../../../../components/forms/Button";
import { Input } from "../../../../components/forms/Input";
import { TextArea } from "../../../../components/forms/TextArea";

// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RoleSchema } from "../../../../schema/authSchema";
import toast from "react-hot-toast";
import SmallSpinner from "../../../../components/Loading/SmallSpinner";
import { useEffect, useState } from "react";
// import { addNewRole, fetchRoles } from "../../../../Redux/roles/rolesThunk";
import CustomSelect from "../../../../components/forms/Select/CustomSelect";
import {
  addNewadminRole,
  fetchadminRoles,
} from "../../../../Redux/adminroles/adminrolesThunk";

// eslint-disable-next-line react/prop-types
const AddRolesModal = ({ setOpenModal }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);
  // const {  } = useSelector((state) => state.features);
  //  console.log("permissions", permissions);

  const { roles, loading } = useSelector((state) => state.adminroles);
  console.log("selectedRole:", selectedRole);

  const fetchRoleTypesHandler = (url, search) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    }
    dispatch(fetchadminRoles(fetchUrl));
  };

  useEffect(() => {
    fetchRoleTypesHandler(
      "/v1/admin/roles/list-all-admin-roles?with[]=permissions&is_default=yes&status=yes&limit=10"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const defaultFormValue = {
    name: "",
    role_type_id: "",
  };
  const onSubmit = async (data) => {
    const filteredFormData = {
      name: data?.name,
      role_type_id: selectedRole?.uuid,
      description: data?.description,
    };

    console.log("filtered data", filteredFormData);

    try {
      const result = await dispatch(addNewadminRole(filteredFormData)).unwrap();
      // console.log("Add result", result);

      if (result.status >= 200 && result.status <= 300) {
        dispatch(
          fetchadminRoles(
            "/v1/admin/roles/list-all-admin-roles?with[]=permissions&is_default=yes&status=yes&limit=10"
          )
        );
        toast.success(result.message, { duration: 6000 });
      }
    } catch (error) {
      // console.log("addNew Feature error", error);
      if (error?.status >= 400 && error?.status <= 499) {
        dispatch(
          fetchadminRoles(
            "/v1/admin/roles/list-all-admin-roles?with[]=permissions&is_default=yes&status=yes&limit=10"
          )
        );
        // const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(error.message, { duration: 6000 });
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
            schema={RoleSchema}
          >
            <div className="relative bg-white rounded-2xl shadow ">
              <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 ">
                    Create User Role
                  </h1>
                  <p className="text-gray-600 text-sm font-light">
                    Add a role for users to perform different action on this
                    platform
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
                      <div className="lg:w-full">
                        <Input
                          name="name"
                          label="Role Name"
                          placeholder="Enter a name for role"
                        />
                        <div className="pb-4">
                          <CustomSelect
                            label="Select Role Type"
                            selected={selectedRole}
                            setSelected={setSelectedRole}
                            data={roles.data}
                            withImage={false}
                            placeholder="Select a role type..."
                          />
                        </div>

                        <TextArea
                          name="description"
                          label="Description"
                          placholder="Enter role description"
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
                        <span>Creating...</span>
                      </div>
                    ) : (
                      "Create User Role"
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

export default AddRolesModal;
