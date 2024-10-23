import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Button } from "../../../../components/forms/Button";
import LoadingSpinner from "../../../../components/Loading/LoadingSpinner";
import {
  DeleteIcon,
  EditIcon,
  EyeIconBold,
  PlusIcon,
  SearchIcon,
  XIconSmall,
} from "../../../../assets/SvgIcons";
import ErrorStatus from "../../../../components/forms/ErrorStatus";
// import EditRolesModal from "./EditRolesModal";
import AddRolesModal from "./AddRolesModal";
// import { getLastSegmentFromUrl } from "../../../../utils/segmentSpliter";
import Pagination from "../../../../components/forms/Pagination";
import { Badge } from "../../../../components/forms/Badge";
import ViewRolesModal from "./ViewRolesModal";
// import { formatNumber } from "../../../../lib/constants";
import Notification from "../../../../components/shared/notification/Notification";
import toast from "react-hot-toast";
import {
  deleteRole,
  fetchRole,
  fetchRoles,
} from "../../../../Redux/roles/rolesThunk";
import { Link, useNavigate } from "react-router-dom";
import { patchData } from "../../../../utils/api";
import { Tooltip } from "flowbite-react";
import EditPermisssionModal from "../Permissions/EditPermisssionModal";

const Roles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, companyId } = useSelector((state) => state.auth);
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("companyId: ", companyId);
  // console.log("switchToCompany: ", switchToCompany);
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuthenticated === null) {
        // setLoading(true);
        return;
      }

      if (isAuthenticated && companyId === null) {
        navigate("/admin/dashboard");
        toast.error("Switch to company to access this page");
      }
      // setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate, companyId]);

  const { roles, role, loading, error } = useSelector((state) => state.roles);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchRoleHandler = (url, search) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    }
    dispatch(fetchRoles(fetchUrl));
  };

  useEffect(() => {
    fetchRoleHandler("v1/users/role/list-all-user-roles?with[]=permissions");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchRoleHandler(
          "v1/users/role/list-all-user-roles?with[]=permissions",
          searchQuery
        );
      }
    };
    fetchSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handlePaginate = (url) => {
    if (url) {
      fetchRoleHandler(url);
    }
  };
  // console.log("roles", roles);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [editPermissionModal, setEditPermissionModal] = useState(false);
  const [viewRoleModal, setViewRoleModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const fetchEditPermission = (role_id) => {
    dispatch(fetchRole(role_id));
    setEditPermissionModal(true);
  };

  const fetchViewRole = (role_id) => {
    dispatch(fetchRole(role_id));
    setViewRoleModal(true);
  };

  const deleteFeatureData = (role_id) => {
    dispatch(fetchRole(role_id));
    setShowDeletePopup(true);
  };

  const handleFeatureDelete = async (role) => {
    // console.log("role is here", role);
    if (role) {
      // Handle delete role logic here
      try {
        // setLoading(true);
        const result = await dispatch(deleteRole(role?.uuid)).unwrap();
        console.log("delete role:", result);
        if (
          (result?.status >= 200 && result?.status < 300) ||
          (result?.status_code >= 200 && result?.status_code)
        ) {
          //   navigate("/admin/property/features");
          toast.success(result?.message);
          dispatch(
            fetchRoles("v1/users/role/list-all-user-roles?with[]=permissions")
          );
        }
      } catch (error) {
        console.log(error);
        // dispatch(
        //   openToast({
        //     type: "error",
        //     message: ` Error deleting Feature with error details: ${error.response.data.message}`,
        //   })
        // );
      } finally {
        setShowDeletePopup(false);
      }
    }
  };
  // console.log("getSingleRole", role);
  const handleRoleStatus = async (role_id) => {
    try {
      // console.log("role_id clicked ", role_id);
      if (role_id) {
        const response = await patchData(
          `v1/users/role/toggle-user-role-status?id=${role_id}`
          // ,
          // {
          //   id: role_id,
          // }
        );
        if (
          (response?.status >= 200 && response?.status < 300) ||
          (response?.status_code >= 200 && response?.status_code < 300)
        ) {
          toast.success(response?.message);
        }
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  const Headings = {
    tableHeadings: [
      "S/N",
      "Name",
      "Description",
      "Status",
      "Toggle Status",
      "Action",
    ],
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className=" py-2 pl-2">
            <h1 className="text-lg font-semibold text-gray-900 ">Roles</h1>
            <p className="text-gray-600 text-sm font-normal">
              Manage list of the roles available on this platform
            </p>
          </div>

          <Link to="/admin/settings/role-types">
            <Button
              // onClick={() => setOpenRoleModal(true)}
              size="sm"
              // leftIcon={<PlusIcon />}
            >
              View Role Types
            </Button>
          </Link>
        </div>

        <div className="p-3 border border-gray-300 rounded-md mt-2">
          <div className=" flex items-center justify-between gap-4 flex-wrap ">
            <div className=" lg:w-[65%]">
              <form className="">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only "
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon />
                  </div>

                  <input
                    type="text"
                    id="default-search"
                    className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 font-Inter rounded-md bg-gray-100 outline-none  "
                    placeholder="Search features..."
                    value={searchQuery}
                    onChange={(e) => {
                      const search = e.target.value;
                      setSearchQuery(search);
                    }}
                  />
                  {searchQuery.length >= 2 && (
                    <div
                      onClick={() => {
                        setSearchQuery("");
                        fetchRoleHandler(
                          "v1/users/role/list-all-user-roles?with[]=permissions"
                        );
                      }}
                      className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
                    >
                      <XIconSmall />
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <div className=" hidden lg:flex">
                <Button
                  onClick={() => setOpenRoleModal(true)}
                  size="sm"
                  leftIcon={<PlusIcon />}
                >
                  Create User Role
                </Button>
              </div>
              <div className="lg:hidden">
                <Button
                  onClick={() => setOpenRoleModal(true)}
                  size="sm"
                  leftIcon={<PlusIcon />}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        {loading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <ErrorStatus
            message={JSON.stringify(error?.message)}
            statusCode={error?.status_code || error?.status}
            link="/dashboard"
            reload
          />
        ) : (
          <div className="relative overflow-x-auto shadow sm:rounded-lg mt-6 ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
              <thead className="text-xs text-gray-700 bg-gray-100 ">
                <tr className="font-Inter">
                  {Headings.tableHeadings.map((heading, headingIndex) => (
                    <th
                      key={headingIndex}
                      scope="col"
                      className="px-6 py-4 whitespace-nowrap uppercase font-Inter"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              {roles?.data?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={100} className="">
                      <div className="flex gap-5 flex-col items-center justify-center py-40">
                        {/* <img src={AssignEmpty} alt="" /> */}

                        <p className="text-2xl font-medium font-gray-600">
                          No Role Found
                        </p>
                        <Button
                          className="w-48 justify-center"
                          onClick={() => {
                            setSearchQuery("");
                            fetchRoleHandler(
                              "v1/users/role/list-all-user-roles?with[]=permissions"
                            );
                          }}
                        >
                          Go Back
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {roles?.data?.map((item, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="bg-white border-b text-gray-400  hover:bg-gray-50 [&_tr:last-child]:border-0 font-Inter"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap "
                      >
                        {rowIndex + 1}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* {item?.name === "" ? "Not Available" : item?.name} */}
                        <div className="font-normal  text-gray-600 capitalize ">
                          {item?.display_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* ₦{formatNumber(item?.price)} */}
                        {item?.description}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* {formatDateTime(item?.account_type)} */}
                        {item.is_active === null ? (
                          "None"
                        ) : (
                          <Badge
                            rounded
                            className=" capitalize"
                            // leftIcon={<DotIcon />}
                            color={
                              item?.is_active === 1 ? "success" : "warning"
                            }
                            text={
                              item?.is_active === 1 ? "Active" : "Not-Active"
                            }
                          ></Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* {formatDateTime(item?.created)} */}
                        <div className="text-sm  text-gray-600 ">
                          <label className="inline-flex items-center cursor-pointer  ">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              value=""
                              defaultChecked={item?.is_active === 1}
                              onClick={() => handleRoleStatus(item.uuid)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-success-600"></div>
                          </label>
                        </div>
                      </td>

                      <td
                        // onClick={() => checkUserDetail(item)}
                        className="px-6 py-4 whitespace-nowrap "
                      >
                        <div className=" flex items-center gap-3">
                          <div
                            className="cursor-pointer "
                            onClick={() => fetchViewRole(item?.uuid)}
                          >
                            <Tooltip
                              content="View Role"
                              animation="duration-150"
                            >
                              <EyeIconBold />
                            </Tooltip>
                          </div>
                          <div
                            className="cursor-pointer "
                            onClick={() => fetchEditPermission(item?.uuid)}
                          >
                            <Tooltip
                              content="Detash Permissions"
                              animation="duration-150"
                            >
                              {/* <Button>Fast animation</Button> */}
                              <EditIcon />
                            </Tooltip>
                          </div>
                          <div
                            className="cursor-pointer "
                            onClick={() => deleteFeatureData(item?.uuid)}
                          >
                            <Tooltip
                              content="Delete Role"
                              animation="duration-150"
                            >
                              <DeleteIcon className="text-red-600 w-6 h-6" />
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        )}

        <div className="py-5">
          {roles.length !== 0 && (
            <Pagination meta={roles.meta} handlePaginate={handlePaginate} />
          )}
        </div>
      </>
      {openRoleModal && <AddRolesModal setOpenModal={setOpenRoleModal} />}

      {viewRoleModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              {/* <Spinner /> */}
              ...
            </div>
          ) : (
            <ViewRolesModal
              setOpenModal={setViewRoleModal}
              roleData={role?.data}
            />
          )}
        </div>
      )}

      {editPermissionModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              {/* <Spinner /> */}
              ...
            </div>
          ) : (
            <EditPermisssionModal
              setOpenModal={setEditPermissionModal}
              permissionData={role?.data}
            />
          )}
        </div>
      )}

      {showDeletePopup && (
        <>
          <p>Coming</p>
          <Notification
            message="Are you sure you want to delete this role?"
            type="warning"
            onCancel={() => setShowDeletePopup(false)}
            onApprove={() => {
              handleFeatureDelete(role?.data);
              setShowDeletePopup(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default Roles;
