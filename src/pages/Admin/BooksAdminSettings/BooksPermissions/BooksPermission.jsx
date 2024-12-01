import { useEffect, useState } from "react";
import { getData } from "../../../../utils/api";
import {
  // ArrowDownIcon,
  EyeIconBold,
  PlusIcon,
  SearchIcon,
  XIconSmall,
} from "../../../../assets/SvgIcons";
import { Button } from "../../../../components/forms/Button";
import LoadingSpinner from "../../../../components/Loading/LoadingSpinner";
import ErrorStatus from "../../../../components/forms/ErrorStatus";
import { Badge } from "../../../../components/forms/Badge";
import Pagination from "../../../../components/forms/Pagination";
import ViewPermissionModal from "./ViewPermissionModal";
import AddPermisssionModal from "./AddPermisssionModal";
import { Dropdown, DropdownItem } from "flowbite-react";
import DetachPermisssionModal from "./DetachPermisssionModal";

const BooksPermission = () => {
  const [permission, setPermission] = useState([]);
  const [permissionDetail, setPermissionDetail] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewPermissionModal, setViewPermissionModal] = useState(false);

  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [detachPermissionModal, setDetachPermissionModal] = useState(false);

  const fetchPermisssion = async (url, search) => {
    setLoading(true);
    try {
      let fetchUrl = url;
      if (search) {
        fetchUrl += `?q=${search}`;
      }
      const response = await getData(fetchUrl);

      // console.log("res:", response);
      setPermission(response);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermisssion(
      // "/v1/customers/company/users/permission/list-all-permissions?with[]=roles"
      "/v1/admin/permissions/list-all-permissions?with[]=roles&is_default=yes&status=yes&limit=10"
    );
  }, []);

  const fetchPermisssionDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getData(
        // `/v1/users/permission/get-single-permission?with[]=roles&id=${id}`,
        `/v1/admin/permissions/get-single-permission?with[]=roles&id=${id}`
      );
      // console.log("res:", response);
      setPermissionDetail(response);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     fetchPermisssionDetails();
  //   }, []);
  const fetchViewRole = (perm_id) => {
    // console.log(perm_id);
    // dispatch(fetchRole(role_id));
    fetchPermisssionDetails(perm_id);
    setViewPermissionModal(true);
  };
  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchPermisssion(
          "/v1/customers/company/users/permission/list-all-permissions?with[]=roles",
          searchQuery
        );
      }
    };
    fetchSearchUsers();
  }, [searchQuery]);

  const handlePaginate = (url) => {
    if (url) {
      fetchPermisssion(url);
    }
  };
  // console.log("first permission:", permission);
  const Headings = {
    tableHeadings: ["S/N", "Name", "Description", "Status", "Type", "Action"],
  };
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className=" py-2 pl-2">
            <h1 className="text-lg font-semibold text-gray-900 ">
              Permissions
            </h1>
            <p className="text-gray-600 text-sm font-normal">
              List of the permissions available on this platform
            </p>
          </div>

          {/* <Button
            onClick={() => setOpenRoleModal(true)}
            size="sm"
            leftIcon={<PlusIcon />}
          >
            Add New Feature
          </Button> */}
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
                        fetchPermisssion(
                          "/v1/customers/company/users/permission/list-all-permissions?with[]=roles"
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
              <Dropdown
                dismissOnClick={true}
                inline
                arrowIcon={false}
                placement="bottom"
                label={
                  <div className="flex items-center gap-1  bg-white border border-gray-300 text-gray-700 font-semibold font-Inter text-sm rounded-lg py-2.5 px-2 pl-2.5">
                    Permission
                    <span>
                      <PlusIcon />
                    </span>
                  </div>
                }
              >
                <DropdownItem onClick={() => setOpenPermissionModal(true)}>
                  <span
                    id="all"
                    className="!text-sm !text-gray-600 font-normal uppercase"
                  >
                    Attach Permission to Role
                  </span>
                </DropdownItem>
                <DropdownItem onClick={() => setDetachPermissionModal(true)}>
                  <span
                    id="all"
                    className="!text-sm !text-gray-600 font-normal uppercase"
                  >
                    Detach Permission From Role
                  </span>
                </DropdownItem>
              </Dropdown>
              {/* <div className=" hidden lg:flex">
                <Button
                  onClick={() => setOpenPermissionModal(true)}
                  size="sm"
                  leftIcon={<PlusIcon />}
                >
                  Add Permission
                </Button>
              </div>
              <div className="lg:hidden">
                <Button
                  onClick={() => setOpenPermissionModal(true)}
                  size="sm"
                  leftIcon={<PlusIcon />}
                >
                  Add
                </Button>
              </div> */}
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

              {permission?.data?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={100} className="">
                      <div className="flex gap-5 flex-col items-center justify-center py-40">
                        {/* <img src={AssignEmpty} alt="" /> */}

                        <p className="text-2xl font-medium font-gray-600">
                          No permission Found
                        </p>
                        <Button
                          className="w-48 justify-center"
                          onClick={() => {
                            setSearchQuery("");
                            fetchPermisssion(
                              "/v1/customers/company/users/permission/list-all-permissions?with[]=roles"
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
                  {permission?.data?.map((item, rowIndex) => (
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
                        <div className="font-normal  text-gray-600 capitalize ">
                          {item?.display_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.description}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
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
                        <div className="font-normal  text-gray-600 capitalize ">
                          {item?.type}
                        </div>
                      </td>

                      <td
                        // onClick={() => checkUserDetail(item)}
                        className="px-6 py-4 whitespace-nowrap "
                      >
                        <div className=" flex items-center gap-2">
                          <div
                            className="cursor-pointer "
                            onClick={() => fetchViewRole(item?.uuid)}
                          >
                            <EyeIconBold />
                          </div>
                          {/* <div
                            className="cursor-pointer "
                            onClick={() => fetchSingleRole(item?.uuid)}
                          >
                            <EditIcon />
                          </div>
                          <div
                            className="cursor-pointer "
                            onClick={() => deleteFeatureData(item?.uuid)}
                          >
                            <DeleteIcon className="text-red-600 w-6 h-6" />
                          </div> */}
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
          {permission.length !== 0 && (
            <Pagination
              meta={permission.meta}
              handlePaginate={handlePaginate}
            />
          )}
        </div>
      </>

      {viewPermissionModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              {/* <Spinner /> */}
              ...
            </div>
          ) : (
            <>
              {permissionDetail && (
                <ViewPermissionModal
                  setOpenModal={setViewPermissionModal}
                  permissionData={permissionDetail?.data}
                />
              )}
            </>
          )}
        </div>
      )}

      {openPermissionModal && (
        <AddPermisssionModal setOpenModal={setOpenPermissionModal} />
      )}
      {detachPermissionModal && (
        <DetachPermisssionModal setOpenModal={setDetachPermissionModal} />
      )}
    </div>
  );
};

export default BooksPermission;
