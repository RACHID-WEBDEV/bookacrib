/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  SearchIcon,
  EmptyImage,
  DeleteIcon,
  EditIcon,
  EyeIconBold,
} from "../../../assets/SvgIcons";
import { Button } from "../../../components/forms/Button";
import DashboardHeading from "../../../layout/DashboardHeading";
import PropsFeatures from "./PropsFeatures";
import { useEffect, useState } from "react";
import {
  // fetchProperty,
  fetchPropertys,
} from "../../../Redux/property/propertyThunk";
import Pagination from "../../../components/forms/Pagination";
import { Badge } from "../../../components/forms/Badge";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorStatus from "../../../components/forms/ErrorStatus";
import { formatDateOnly, formatTimeOnly } from "../../../lib/constants";
// import PropertyApproval from "./PropertyApproval";
import { patchData } from "../../../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import TestImageApp from "./TestImages";

const Property = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showModal, setShowModal] = useState(false);

  const { propertys, property, loading, error } = useSelector(
    (state) => state.properties
  );
  //   const fetchFeatureHandler = (url) => {
  //     dispatch(fetchFeatures(url));
  //   };

  //   useEffect(() => {
  //     fetchFeatureHandler(
  //       "bookacrib-api-routes/v1/features/list-features?limit=10"
  //     );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchPropertyHandler = (url, search) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    }
    dispatch(fetchPropertys(fetchUrl));
  };

  useEffect(() => {
    fetchPropertyHandler(
      "/bookacrib-api-routes/v1/properties/list-properties?limit=10&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchPropertyHandler(
          "/bookacrib-api-routes/v1/properties/list-properties",
          searchQuery
        );
      }
    };
    fetchSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // const fetchPropertyApprovalModal = (property_id) => {
  //   dispatch(fetchProperty(property_id));
  //   setShowModal(true);
  // };

  const handlePaginate = (url) => {
    if (url) {
      fetchPropertyHandler(url);
    }
  };

  const IN_APP_PROPERTY = propertys?.data?.filter(
    (data) => data?.create_source !== "SEEDER"
  );
  console.log("propertys IN:", IN_APP_PROPERTY);

  const handlePropertyStatus = async (property_id) => {
    try {
      // console.log("property_id clicked ", property_id);
      if (property_id) {
        const response = await patchData(
          `bookacrib-api-routes/v1/admin/properties/toggle-property-status?id=${property_id}`
        );
        if (
          (response?.status >= 200 && response?.status < 300) ||
          (response?.status_code >= 200 && response?.status_code < 300)
        ) {
          toast.success(response?.message);
          // console.log("category status:", response);
          dispatch(
            fetchPropertyHandler(
              "/bookacrib-api-routes/v1/properties/list-properties?limit=10&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category"
            )
          );
        }
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  const Headings = {
    tableHeadings: [
      "S/No.",
      "Date",
      "Name",
      "Property Type",
      "Request ID",
      "Status",
      "Toggle",
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

  const navigatePropertyDetail = async (record) => {
    try {
      navigate(`/admin/property/property-detail/${record.uuid}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  const navigatePropertyEdit = async (record) => {
    try {
      navigate(`/admin/property/property-edit/${record.uuid}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  // console.log("bag status:", getBadgeColor("pending"));

  return (
    <div className=" ">
      {/* <div className=" flex items-center justify-between ">
        <div className="pb-4 pt-1">
          <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
            Property
          </h1>
          <h5 className="text-gray-500 text-sm font-normal">
            Overview of the properties bookings etc
          </h5>
        </div>
        <div className="flex items-center gap-3"></div>
      </div> */}
      <DashboardHeading
        fixed
        title="Property"
        description=" Overview of the properties bookings etc"
      />
      <div className=" space-y-6">
        <PropsFeatures />

        <div className="p-3 border border-gray-300 rounded-md">
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

                  {/* <input
                    type="text"
                    id="default-search"
                    className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 font-Inter border border-gray-300 rounded-md bg-white outline-none"
                    placeholder="Search"
                    required
                    value={searchQuery}
                    onChange={(e) => {
                      const search = e.target.value;
                      setSearchQuery(search);
                    }}
                  />
                  {searchQuery.length >= 3 && (
                    <div
                      onClick={() => {
                        setSearchQuery("");
                        fetchOrdersHandler("/admin/order"); // Fetch /admin/order again
                      }}
                      className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
                    >
                      <XIconSmall />
                    </div>
                  )} */}

                  <input
                    type="search"
                    id="default-search"
                    className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 font-Inter  rounded-md bg-gray-100 outline-none  "
                    placeholder="Enter location or Search"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <Button>Add Property</Button>
              <Button
                color="primaryAlt"
                rightIcon={
                  <span className="inline-flex items-center justify-center h-6 px-1.5 text-xs font-semibold text-gray-50 bg-dark-100 rounded-md">
                    12
                  </span>
                }
              >
                Draft
              </Button>
              <Button
                color="primaryAlt"
                rightIcon={
                  <span className="inline-flex items-center justify-center h-6 px-1.5 text-xs font-semibold text-gray-50 bg-dark-100 rounded-md">
                    10
                  </span>
                }
              >
                Properties
              </Button>
            </div>
          </div>
        </div>
        <div className="px-4 py-2.5 text-xl font-semibold text-dark-100 bg-gray-100 ">
          <p>Rooms</p>
        </div>

        <div>
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
              {/* <TestImageApp /> */}
              <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
                <thead className="text-xs text-gray-700 bg-gray-100 ">
                  <tr className="font-Inter">
                    {Headings.tableHeadings.map((heading, headingIndex) => (
                      <th
                        key={headingIndex}
                        scope="col"
                        className="px-6 py-4 whitespace-nowrap capitalize font-Inter"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                {propertys?.data?.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={100} className="">
                        <div className="flex gap-5 flex-col items-center justify-center py-40">
                          {/* <img src={AssignEmpty} alt="" /> */}

                          <p className="text-2xl font-medium font-gray-600">
                            No Property Found
                          </p>
                          <Button
                            className="w-48 justify-center"
                            // onClick={() => {
                            //   setSearchQuery("");
                            //   fetchFeatureHandler(
                            //     "bookacrib-api-routes/v1/features/list-features"
                            //   );
                            // }}
                          >
                            Go Back
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {IN_APP_PROPERTY?.map((item, rowIndex) => (
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
                          {/* ₦{formatNumber(item?.price)} */}
                          <div className=" flex flex-col gap-px">
                            <p className="text-xs text-gray-900 font-medium">
                              {formatDateOnly(item?.created_at)}
                            </p>
                            {formatTimeOnly(item?.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* {item?.name === "" ? "Not Available" : item?.name} */}
                          <div className="font-normal  text-gray-600 capitalize ">
                            <div className=" flex items-center gap-3">
                              {item?.images?.length === 0 ? (
                                <div
                                  role="status"
                                  className="space-y-8 animate-pulsee flex md:items-center"
                                >
                                  <div className="flex items-center justify-center size-16 bg-gray-300 rounded  dark:bg-gray-700">
                                    <svg
                                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 20 18"
                                    >
                                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                    </svg>
                                  </div>

                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                <div className=" ">
                                  <img
                                    className="min-w-[139px] min-h-auto  max-h-[140px] max-w-[140px] object-fill "
                                    src={item?.images[0]}
                                    alt="properties image"
                                  />
                                </div>
                              )}

                              <div className=" flex flex-col gap-px">
                                <p className="text-base text-gray-900 font-medium">
                                  {" "}
                                  {item?.name}
                                </p>
                                {item?.address}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className=" capitalize">{item?.category?.name}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* ₦{formatNumber(item?.price)} */}
                          {item?.uuid}
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
                              color={getBadgeColor(item?.status)}
                              text={item?.status}
                            ></Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* {formatDateTime(item?.created)} */}
                          <td className="px-1 py-4 whitespace-nowrap">
                            {/* {formatDateTime(item?.created)} */}
                            <div className="text-sm  text-gray-600 ">
                              <label className="inline-flex items-center cursor-pointer  ">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  value=""
                                  defaultChecked={item?.is_active === true}
                                  onClick={() =>
                                    handlePropertyStatus(item.uuid)
                                  }
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-success-600"></div>
                              </label>
                            </div>
                          </td>
                        </td>

                        <td
                          // onClick={() => checkUserDetail(item)}
                          className="px-6 py-4 whitespace-nowrap "
                        >
                          <div className=" flex items-center gap-2">
                            <div
                              className="cursor-pointer "
                              onClick={() => navigatePropertyDetail(item)}
                            >
                              <EyeIconBold />
                            </div>
                            <div
                              className="cursor-pointer "
                              onClick={() => navigatePropertyEdit(item)}
                            >
                              <EditIcon />
                            </div>
                            <div
                              className="cursor-pointer "
                              // onClick={() => deleteFeatureData(item?.uuid)}
                            >
                              <DeleteIcon className="text-red-600 w-6 h-6" />
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
            {propertys.length !== 0 && (
              <Pagination
                meta={propertys.meta}
                handlePaginate={handlePaginate}
              />
            )}
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center gap-24 pt-6 pb-20">
          <div className=" text-center">
            <p className="text-xl font-semibold text-dark-100">
              No Room Added yet
            </p>
            <p className="text- font-normal text-gray-500">
              Any property added would be saved here automatically{" "}
            </p>
          </div>
          <EmptyImage />
        </div>
      </div>
    </div>
  );
};

export default Property;
