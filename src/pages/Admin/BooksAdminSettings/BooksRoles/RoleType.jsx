import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Button } from "../../../../components/forms/Button";
import LoadingSpinner from "../../../../components/Loading/LoadingSpinner";
import // DeleteIcon,
// EditIcon,
// EyeIconBold,
// PlusIcon,
"../../../../assets/SvgIcons";
import ErrorStatus from "../../../../components/forms/ErrorStatus";

import Pagination from "../../../../components/forms/Pagination";
import { Badge } from "../../../../components/forms/Badge";
import ViewRolesModal from "./ViewRolesModal";

import toast from "react-hot-toast";

import { fetchRoles } from "../../../../Redux/roles/rolesThunk";
import { Link, useNavigate } from "react-router-dom";
import { formatDateTime } from "../../../../lib/constants";

const RoleType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, companyId } = useSelector((state) => state.auth);

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

  const fetchRoleTypesHandler = (url, search) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    }
    dispatch(fetchRoles(fetchUrl));
  };

  useEffect(() => {
    fetchRoleTypesHandler(
      "v1/customers/company/users/role/list-user-role-types"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handlePaginate = (url) => {
    if (url) {
      fetchRoleTypesHandler(url);
    }
  };

  const [viewSupportModal, setViewSupportModal] = useState(false);

  const Headings = {
    tableHeadings: [
      "S/N",
      "Name",
      "Type",
      "Status",
      "Unique ID",
      "Updated Date",
    ],
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className=" py-2 pl-2">
            <h1 className="text-lg font-semibold text-gray-900 ">Role Types</h1>
            <p className="text-gray-600 text-sm font-normal">
              List of the roles types available for access on this platform
            </p>
          </div>
          <Link to="/admin/settings/roles">
            <Button size="sm">Go Back Roles</Button>
          </Link>
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
                          No Role Type Found
                        </p>

                        <Link to="/admin/settings/roles">
                          <Button
                            className="w-48 justify-center"
                            // onClick={() => setOpenRoleModal(true)}
                            size="sm"
                          >
                            Go Back Roles
                          </Button>
                        </Link>
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
                          {item?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {/* ₦{formatNumber(item?.price)} */}
                        {item?.type}
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
                        {item?.uuid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDateTime(item?.updated_at)}
                        {/* {item?.uuid} */}
                      </td>
                      {/* <td
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
                          <div
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
                          </div>
                        </div>
                      </td> */}
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

      {viewSupportModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              {/* <Spinner /> */}
              ...
            </div>
          ) : (
            <ViewRolesModal
              setOpenModal={setViewSupportModal}
              roleData={role?.data}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RoleType;
