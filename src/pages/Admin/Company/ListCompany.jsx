import { useEffect, useState } from "react";
import { getData } from "../../../utils/api";
import Pagination from "../../../components/forms/Pagination";
import { Button } from "../../../components/forms/Button";
import {
  //   DeleteIcon,
  EditIcon,
  EyeIconBold,
  //   PlusIcon,
  SearchIcon,
  XIconSmall,
} from "../../../assets/SvgIcons";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorStatus from "../../../components/forms/ErrorStatus";
import { Badge } from "../../../components/forms/Badge";
import CompanyApproval from "./CompanyApproval";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

const ListCompany = () => {
  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState(null);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  console.log("list company ", companies, loading, error);

  const fetchSingleCompany = (company_id) => {
    setCompanyId(company_id);
    setShowModal(true);
  };
  const fetchListCompanies = async (url, search) => {
    setLoading(true);
    let fetchUrl = url;
    if (search) {
      fetchUrl += `&q=${search}`;
    }
    try {
      const response = await getData(fetchUrl);

      setCompanies(response);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListCompanies(
      "/v1/admin/companies/list-companies?with[]=users&with[]=country&with[]=state&with[]=timezone&with[]=modules"
    );
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  //    const fetchUsersHandler = (url, search) => {
  //      let fetchUrl = url;
  //      if (search) {
  //        fetchUrl += `&q=${search}`;
  //      }
  //      dispatch(fetchUsers(fetchUrl));
  //    };

  //    useEffect(() => {
  //      fetchUsersHandler(
  //        "/v1/admin/users/list-all-users?with[]=company&with[]=country&with[]=state&with[]=role"
  //      );
  //      // eslint-disable-next-line react-hooks/exhaustive-deps
  //    }, [dispatch]);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchListCompanies(
          "/v1/admin/companies/list-companies?with[]=users&with[]=country&with[]=state&with[]=timezone&with[]=modules",
          searchQuery
        );
      }
    };
    fetchSearchUsers();
  }, [searchQuery]);

  const handlePaginate = (url) => {
    if (url) {
      fetchListCompanies(url);
    }
  };

  const navigateCompanyDetail = async (record) => {
    try {
      navigate(`/admin/view-company/${record.uuid}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  const Headings = {
    tableHeadings: [
      "S/N",
      "Company Name",
      "Contacts",
      "Address",
      "Status",
      "Active",
      "Verification",
      "Action",
    ],
  };
  const statusBadges = {
    pending: { color: "error" },
    approved: { color: "success" },
    suspended: { color: "gray" },
    declined: { color: "warning" },
  };

  const defaultBadge = { color: "primary" };
  const getBadgeColor = (status) => {
    return (statusBadges[status] || defaultBadge).color;
  };
  return (
    <>
      <div className="pt-6">
        <div className="flex items-center justify-between">
          <div className=" py-2 pl-2">
            <h1 className="text-lg font-semibold text-gray-900 ">
              List Companies
            </h1>
            <p className="text-gray-600 text-sm font-normal">
              Manage list of companies/property owner available on bookacrib
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
                    placeholder="Search company..."
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
                        fetchListCompanies(
                          "/v1/admin/companies/list-companies?with[]=users&with[]=country&with[]=state&with[]=timezone&with[]=modules"
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
            {/* <div className="flex items-center gap-4">
              <div className=" hidden lg:flex">
                <Button
                  // onClick={() => setOpenRoleModal(true)}
                  size="sm"
                  leftIcon={<PlusIcon />}
                >
                  Add New
                </Button>
              </div>
              <div className="lg:hidden">
                <Button
                  //    onClick={() => setOpenRoleModal(true)}
                  size="sm"
                  leftIcon={<PlusIcon />}
                >
                  Add
                </Button>
              </div>
            </div> */}
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

              {companies?.data?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={100} className="">
                      <div className="flex gap-5 flex-col items-center justify-center py-40">
                        {/* <img src={AssignEmpty} alt="" /> */}

                        <p className="text-2xl font-medium font-gray-600">
                          No Company Found
                        </p>
                        <Button
                          className="w-48 justify-center"
                          //    onClick={() => {
                          //      setSearchQuery("");
                          //      fetchUsersHandler(
                          //        "/v1/admin/users/list-all-users?with[]=company&with[]=country&with[]=state&with[]=role"
                          //      );
                          //    }}
                        >
                          Go Back
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {companies?.data?.map((item, rowIndex) => {
                    // console.log("uer:", item?.users[0]?.[0]);
                    return (
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

                        <td className="px-6 py-4 whitespace-nowrap inline-flex items-center gap-2">
                          {/* {item?.name === "" ? "Not Available" : item?.name} */}

                          <div>
                            <p className=" capitalize font-medium text-gray-900">
                              {item?.name}
                            </p>
                            <p className="  text-xs">{item?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-gray-900">
                            {" "}
                            {item?.users[0]?.[0]?.phone_number}
                          </p>
                          <p className=" text-xs">
                            {item?.users[0]?.[0]?.email}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize  max-w-[300px] truncate">
                          {item?.address === null ? "N/A" : item?.address}
                          {/* ₦{formatNumber(item?.price)} */}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* {formatDateTime(item?.account_type)} */}
                          {item.status === null ? (
                            "None"
                          ) : (
                            <Badge
                              rounded
                              className=" capitalize"
                              //  leftIcon={item?.is_active === true && <DotIcon />}
                              color={getBadgeColor(item?.status)}
                              text={item?.status}
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
                                //    onClick={() => handleUserStatus(item.uuid)}
                                disabled
                              />
                              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-success-600"></div>
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            rounded
                            className=" capitalize"
                            //  leftIcon={item?.is_active === true && <DotIcon />}
                            color={
                              item?.is_verified === true ? "success" : "error"
                            }
                            text={
                              item?.is_verified === true
                                ? "verified Crib"
                                : "Not verified"
                            }
                          ></Badge>
                        </td>
                        <td
                          // onClick={() => checkUserDetail(item)}
                          className="px-6 py-4 whitespace-nowrap "
                        >
                          <div className=" flex items-center gap-2">
                            <div
                              className="cursor-pointer "
                              onClick={() => navigateCompanyDetail(item)}
                            >
                              <EyeIconBold />
                            </div>
                            <div
                              className="cursor-pointer "
                              onClick={() => fetchSingleCompany(item?.uuid)}
                            >
                              <EditIcon />
                            </div>
                            {/* <div
                              className="cursor-pointer "
                              //  onClick={() => deleteUserData(item?.uuid)}
                            >
                              <DeleteIcon className="text-red-600 w-6 h-6" />
                            </div> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        )}

        <div className="py-5">
          {companies.length !== 0 && (
            <Pagination meta={companies.meta} handlePaginate={handlePaginate} />
          )}
        </div>
      </>
      {showModal && (
        <CompanyApproval
          companyId={companyId}
          setOpenModal={setShowModal}
          fetchListCompanies={fetchListCompanies}
        />
        // <div>
        //   {loading ? (
        //     <div className="min-h-[400px] flex items-center justify-center">

        //       ...
        //     </div>
        //   ) : (
        //     <PropertyApproval
        //       propertyId={property?.data?.uuid}
        //       setOpenModal={setShowModal}
        //     />
        //   )}
        // </div>
      )}
      {/* {openRoleModal && <AddNewFeatureModal setOpenModal={setOpenRoleModal} />} */}

      {/* {viewUserModal && (
         <div>
           {loading ? (
             <div className="min-h-[400px] flex items-center justify-center">
              
               ...
             </div>
           ) : (
             <ViewUserModal
               setOpenModal={setViewUserModal}
               userData={user?.data}
             />
           )}
         </div>
       )} */}

      {/* {editUserModal && (
         <div>
           {loading ? (
             <div className="min-h-[400px] flex items-center justify-center">
               
               ...
             </div>
           ) : (
             <EditUserModal
               setOpenModal={setEditUserModal}
               userData={user?.data}
             />
           )}
         </div>
       )} */}

      {/* {showDeletePopup && (
         <>
           <Notification
             message="Are you sure you want to delete this user?"
             type="warning"
             onCancel={() => setShowDeletePopup(false)}
             onApprove={() => {
               handleUsersDelete(user?.data);
               setShowDeletePopup(false);
             }}
           />
         </>
       )} */}
    </>
  );
};

export default ListCompany;
