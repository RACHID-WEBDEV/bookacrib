import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Button } from "../../../components/forms/Button";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import {
  DeleteIcon,
  // EditIcon,
  // EyeIconBold,
  PlusIcon,
  SearchIcon,
  XIconSmall,
} from "../../../assets/SvgIcons";
import ErrorStatus from "../../../components/forms/ErrorStatus";
// import EditRolesModal from "./EditRolesModal";
import AddCribUserModal from "./AddCribUsersModal";
// import { getLastSegmentFromUrl } from "../../../utils/segmentSpliter";
import Pagination from "../../../components/forms/Pagination";
import { Badge } from "../../../components/forms/Badge";
import ViewRolesModal from "./ViewRolesModal";
// import { formatNumber } from "../../../lib/constants";
import Notification from "../../../components/shared/notification/Notification";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { patchData } from "../../../utils/api";
import { Tooltip } from "flowbite-react";
// import EditPermisssionModal from "../Permissions/EditPermisssionModal";
import {
  deletecribUser,
  fetchcribUsers,
} from "../../../Redux/cribusers/cribusersThunk";

const CribUsers = () => {
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
        navigate("/user/dashboard");
        toast.error("Switch to company to access this page");
      }
      // setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate, companyId]);

  const { cribusers, cribuser, loading, error } = useSelector(
    (state) => state.cribusers
  );

  const [searchQuery, setSearchQuery] = useState("");

  const fetchCribUserHandler = (url, search) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    }
    dispatch(fetchcribUsers(fetchUrl));
  };

  useEffect(() => {
    fetchCribUserHandler(
      "/v1/customers/company/users/list-users-by-company-id"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchCribUserHandler(
          "/v1/customers/company/users/list-users-by-company-id",
          searchQuery
        );
      }
    };
    fetchSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handlePaginate = (url) => {
    if (url) {
      fetchCribUserHandler(url);
    }
  };
  // console.log("roles", roles);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [viewRoleModal, setViewRoleModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [getuserId, setgetuserId] = useState(null);

  // const fetchEditPermission = (role_id) => {
  //   dispatch(fetchRole(role_id));
  //   setEditPermissionModal(true);
  // };

  // const fetchViewRole = (role_id) => {
  //   dispatch(fetchRole(role_id));
  //   setViewRoleModal(true);
  // };
  // console.log("first delete user", getuserId);

  const deleteUserData = (user_id) => {
    setgetuserId(user_id);
    // dispatch(fetchRole(role_id));
    setShowDeletePopup(true);
  };

  const handleUserDelete = async (USERID) => {
    // console.log("USERID is here", USERID);
    if (USERID) {
      // Handle delete USERID logic here
      try {
        // setLoading(true);
        const result = await dispatch(deletecribUser(USERID)).unwrap();
        console.log("delete role:", result);
        if (
          (result?.status >= 200 && result?.status < 300) ||
          (result?.status_code >= 200 && result?.status_code)
        ) {
          //   navigate("/admin/property/features");
          toast.success(result?.message);
          dispatch(
            fetchcribUsers(
              "/v1/customers/company/users/list-users-by-company-id"
            )
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
          `/v1/customers/company/users/toggle-user-status-by-company-id?id=${role_id}`
          // ,
          // {
          //   id: role_id,
          // }
        );
        if (
          (response?.status >= 200 && response?.status < 300) ||
          (response?.status_code >= 200 && response?.status_code < 300)
        ) {
          fetchCribUserHandler(
            "/v1/customers/company/users/list-users-by-company-id"
          );
          toast.success(response?.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("ERROR:", error);
    }
  };
  const Headings = {
    tableHeadings: [
      "S/N",
      "Name",
      "Email",
      "Phone Number",
      "User Type",
      "Status",
      "Toggle Status",
      "Action",
    ],
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between pt-6">
          <div className=" py-2 pl-2">
            <h1 className="text-lg font-semibold text-gray-900 ">Users</h1>
            <p className="text-gray-600 text-sm font-normal">
              Manage list of the users available user under your company
              account.
            </p>
          </div>
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
                    placeholder="Search user..."
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
                        fetchCribUserHandler(
                          "/v1/customers/company/users/list-users-by-company-id"
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
                  Create User
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

              {cribusers?.data?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={100} className="">
                      <div className="flex gap-5 flex-col items-center justify-center py-40">
                        {/* <img src={AssignEmpty} alt="" /> */}

                        <p className="text-2xl font-medium font-gray-600">
                          No User Found
                        </p>
                        <Button
                          className="w-48 justify-center"
                          onClick={() => {
                            setSearchQuery("");
                            fetchCribUserHandler(
                              "/v1/customers/company/users/list-users-by-company-id"
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
                  {cribusers?.data?.map((item, rowIndex) => (
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
                          {item?.first_name} {item?.last_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* ₦{formatNumber(item?.price)} */}
                        {item?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.phone_number || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {item?.user_type?.replace("-", " ") || "N/A"}
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
                              item?.is_active === true ? "success" : "warning"
                            }
                            text={
                              item?.is_active === true ? "Active" : "Not-Active"
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
                              defaultChecked={item?.is_active === true}
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
                          {/* <div
                            className="cursor-pointer "
                            onClick={() => fetchViewRole(item?.uuid)}
                          >
                            <Tooltip
                              content="View Role"
                              animation="duration-150"
                            >
                              <EyeIconBold />
                            </Tooltip>
                          </div> */}
                          {/* <div
                            className="cursor-pointer"
                            // onClick={() => fetchEditPermission(item?.uuid)}
                          >
                            <Tooltip
                              content="Detash Permissions"
                              animation="duration-150"
                            >
                            
                              <EditIcon />
                            </Tooltip>
                          </div> */}
                          <div
                            className="cursor-pointer "
                            onClick={() => deleteUserData(item?.uuid)}
                          >
                            <Tooltip
                              content="Delete User"
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
          {cribusers.length !== 0 && (
            <Pagination meta={cribusers.meta} handlePaginate={handlePaginate} />
          )}
        </div>
      </>
      {openRoleModal && <AddCribUserModal setOpenModal={setOpenRoleModal} />}

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
              roleData={cribuser?.data}
            />
          )}
        </div>
      )}

      {/* {editPermissionModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
               <Spinner /> 
              ...
            </div>
          ) : (
            <EditPermisssionModal
              setOpenModal={setEditPermissionModal}
              permissionData={role?.data}
            />
          )}
        </div>
      )} */}

      {showDeletePopup && (
        <>
          <Notification
            message="Are you sure you want to delete this user?"
            type="warning"
            onCancel={() => setShowDeletePopup(false)}
            onApprove={() => {
              handleUserDelete(getuserId);
              setShowDeletePopup(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default CribUsers;
