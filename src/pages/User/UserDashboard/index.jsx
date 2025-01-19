/* eslint-disable no-unused-vars */
import { Dropdown, DropdownItem, Tooltip } from "flowbite-react";
import StatisticsChart from "./StatisticsChart";
import {
  ArrowDownIcon,
  MoreInfoIcon,
  ProgressIcon,
} from "../../../assets/SvgIcons";
import UserDeviceReport from "./user-device-report";
import TopFeatures from "./TopFeatures";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchuserStatistics } from "../../../Redux/auth/authThunk";
import classNames from "classnames";
import { formatNumber } from "../../../lib/constants";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import { Link } from "react-router-dom";
import UserStatsTabFilters from "../../../components/shared/UserStatsTabFilters";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { userstatistics, loadingUserStatistics } = useSelector(
    (state) => state.auth
  );

  // console.log("userstatistics:", userstatistics);

  const fetchUserStatsHandler = (url, search, params) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    } else if (params) {
      fetchUrl += `${params}`;
    }
    dispatch(fetchuserStatistics(fetchUrl));
  };

  useEffect(() => {
    fetchUserStatsHandler(
      "/v1/dashboards/user-dashboard-statistics?start_date=2025-01-01&end_date=2025-12-31"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchUserStatsHandler(
          "/v1/dashboards/user-dashboard-statistics",
          searchQuery
        );
      }
    };
    fetchSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleFilters = (params) => {
    console.log("params is:", params);
    if (params) {
      fetchUserStatsHandler(
        "/v1/dashboards/user-dashboard-statistics",
        "",
        params
      );
    }
  };

  const data = userstatistics?.data;
  return (
    <div className="p-4 ">
      <div className=" flex items-center justify-between ">
        <div className="pb-4 pt-1 lg:pt-3">
          <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
            Overview
          </h1>
          <h5 className="text-gray-500 text-sm font-normal">
            User Overview of the payment stats, Recent bookings activities etc
          </h5>
        </div>
        <div className="flex items-center gap-3"></div>
      </div>
      {loadingUserStatistics ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-3 xl:flex-row box box--stacked md:mb-56">
          <div>
            <div className="z-10 gap-5 xl:gap-14 flex flex-col lg:flex-row xl:flex-col items-center xl:items-start xl:w-[300px] overflow-hidden flex-1 px-10 rounded-[0.6rem] bg-gradient-to-b from-primary-800/90 to-gray-900/[0.85] py-12 xl:py-9 relative before:content-[''] before:w-full before:h-[130%] before:bg-gradient-to-b before:from-black/[0.08] before:to-transparent before:absolute before:left-0 before:top-0 before:-rotate-[38deg] before:hidden before:xl:block before:-ml-[35%]">
              <div>
                <div className="flex items-center justify-center w-12 h-12 border rounded-full border-white/10 bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-credit-card stroke-[1] w-6 h-6 text-white fill-white/10"
                  >
                    <rect width={20} height={14} x={2} y={5} rx={2} />
                    <line x1={2} x2={22} y1={10} y2={10} />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-base text-center text-white lg:text-left">
                  Total Cribs Payments
                </div>
                <div className="flex items-center justify-center mt-2 lg:justify-start">
                  <div className="text-2xl font-medium text-white">
                    ₦
                    {formatNumber(
                      Number(data?.payment?.total_bookings_payment_ngn)
                    )}
                    {data?.payment?.total_bookings_payment_ngn === 0 && ".00"}
                  </div>
                  <div className="flex items-center ml-2.5 border border-success/50 bg-success/50 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-white/90 dark:bg-white/10">
                    100%
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-up w-4 h-4 ml-px stroke-[1.5]"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3 leading-normal text-center xl:text-left text-white/70">
                  The total payment made from booking any of our services.
                </div>
              </div>
              <div className="lg:ml-auto w-52 xl:ml-0 xl:w-full">
                <Link
                  className="transition duration-200 border shadow-sm inline-flex items-center font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed rounded-full relative justify-start w-full px-4 border-white/20 py-2.5 bg-white/10 text-white hover:bg-white/[0.15] dark:bg-darkmode-900/30 dark:border-darkmode-900/30"
                  to="/user/transactions/list-bookings"
                >
                  Show full reports
                  <div className="absolute right-0 w-9 h-9 mr-0.5 flex items-center justify-center border rounded-full bg-white/10 border-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right stroke-[1] w-4 h-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full p-5 sm:py-7 sm:px-8 border rounded-[0.6rem] border-slate-300/80 border-dashed bg-gray-50">
            <div className="flex flex-col sm:items-end sm:justify-end sm:flex-row gap-x-3 gap-y-2">
              {/* <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-check2 absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
                >
                  <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                  <line x1={16} x2={16} y1={2} y2={6} />
                  <line x1={8} x2={8} y1={2} y2={6} />
                  <line x1={3} x2={21} y1={10} y2={10} />
                  <path d="m16 20 2 2 4-4" />
                </svg>
                <select className="bg-[length:20px_auto] disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-700/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-700/50 bg-chevron-black transition duration-200 ease-in-out w-full text-sm border-slate-300/60 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:!bg-darkmode-700 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:bg-chevron-white sm:w-44 pl-9">
                  <option value="custom-date">Custom Date</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
                >
                  <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
                  <line x1={16} x2={16} y1={2} y2={6} />
                  <line x1={8} x2={8} y1={2} y2={6} />
                  <line x1={3} x2={21} y1={10} y2={10} />
                </svg>
                <input
                  type="text"
                  className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-700/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-700/50 transition duration-200 ease-in-out w-full text-sm border-slate-300/60 shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-700 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 pl-9 sm:w-64 rounded-[0.3rem]"
                  defaultValue="8 Jan, 2025 - 8 Feb, 2025"
                />
              </div> */}
              {/* <div className=" flex items-center justify-end"> */}
              <UserStatsTabFilters
                handleFilters={handleFilters}
                cancelFilter={fetchUserStatsHandler}
              />
              {/* </div> */}
            </div>
            <div className="pt-4">
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  pb-0">
                <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
                  <div className="space-y-3 ">
                    <p className="text-gray-700 font-medium text- pt-2">
                      Total Bookings
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-800">
                        {data?.bookings?.total_paid_bookings || 0}
                      </p>
                      <div className=" flex items-center gap-1">
                        <p
                          className={classNames(
                            " font-medium",
                            {
                              "text-green-700":
                                // activeId === "total_paid_today" &&

                                data?.bookings?.total_paid_bookings >= 1,
                            }
                            // {
                            //   "text-red-700":
                            //     data?.bookings?.total_paid_bookings <= 2,
                            // }
                          )}
                        >
                          {data?.bookings?.total_paid_bookings <= 0 ? "-" : "+"}

                          {data?.bookings?.total_paid_bookings}
                        </p>
                        <div
                          className={classNames({
                            "rotate-180":
                              data?.bookings?.total_paid_bookings <= 0,
                          })}
                        >
                          <ProgressIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-2">
                    <Tooltip
                      content={` ${
                        data?.bookings?.total_paid_bookings === 0
                          ? "There were no paid bookings recorded."
                          : `You had ${data?.bookings?.total_paid_bookings} paid booking(s).`
                      }`}
                      placement="left"
                      animation="duration-150"
                    >
                      <MoreInfoIcon />
                    </Tooltip>
                  </div>
                </div>
                <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
                  <div className="space-y-3 ">
                    <p className="text-gray-700 font-medium text- pt-2">
                      Properties Booked
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-800">
                        {formatNumber(
                          Number(data?.bookings?.total_paid_properties_booked)
                        ) || 0}
                      </p>
                      <div className=" flex items-center gap-1">
                        <p
                          className={classNames(
                            " font-medium",
                            {
                              "text-green-700":
                                // activeId === "total_paid_today" &&

                                data?.bookings?.total_paid_properties_booked >=
                                3,
                            },
                            {
                              "text-red-700":
                                data?.bookings?.total_paid_properties_booked <=
                                2,
                            }
                          )}
                        >
                          {data?.bookings?.total_paid_properties_booked <= 2
                            ? "-"
                            : "+"}
                          {/* {data?.bookings?.total_paid_properties_booked?.length} */}

                          {data?.bookings?.total_paid_properties_booked}
                        </p>
                        <div
                          className={classNames({
                            "rotate-180":
                              data?.bookings?.total_paid_properties_booked <= 0,
                          })}
                        >
                          <ProgressIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-2">
                    <Tooltip
                      content={` ${
                        data?.bookings?.total_paid_properties_booked === 0
                          ? " No properties booked recorded."
                          : `You had total of ${formatNumber(
                              Number(
                                data?.bookings?.total_paid_properties_booked
                              )
                            )} paid properties booked.`
                      }`}
                      placement="left"
                      animation="duration-150"
                    >
                      <MoreInfoIcon />
                    </Tooltip>
                  </div>
                </div>
                <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
                  <div className="space-y-3 ">
                    <p className="text-gray-700 font-medium text- pt-2">
                      Pending Bookings
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-800">
                        {data?.bookings?.total_pending_bookings || 0}
                      </p>
                      <div className=" flex items-center gap-1">
                        <p
                          className={classNames(
                            " font-medium text-red-700"
                            // {
                            //   "text-green-700":
                            //     // activeId === "total_paid_today" &&

                            //     data?.bookings?.total_pending_bookings >= 3,
                            // },
                            // {
                            //   "text-red-700":
                            //     data?.bookings?.total_pending_bookings <= 2,
                            // }
                          )}
                        >
                          {/* {data?.bookings?.total_pending_bookings <= 2
                            ? "-"
                            : "+"} */}
                          +{data?.bookings?.total_pending_bookings}
                        </p>
                        <div
                          className={classNames({
                            "rotate-180":
                              data?.bookings?.total_pending_bookings <= 0,
                          })}
                        >
                          <ProgressIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-2">
                    <Tooltip
                      content={` ${
                        data?.bookings?.total_pending_bookings === 0
                          ? "There were no pending bookings recorded."
                          : `You had total of ${data?.bookings?.total_pending_bookings} pending booking(s).`
                      }`}
                      placement="left"
                      animation="duration-150"
                    >
                      <MoreInfoIcon />
                    </Tooltip>
                  </div>
                </div>
                <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
                  <div className="space-y-3 ">
                    <p className="text-gray-700 font-medium text- pt-2">
                      Pending Booked Property
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-800">
                        {formatNumber(
                          Number(
                            data?.bookings?.total_pending_properties_booked
                          )
                        ) || 0}
                      </p>
                      <div className=" flex items-center gap-1">
                        <p
                          className={classNames(
                            " font-medium text-orange-700"
                            // {
                            //   "text-green-700":
                            //     // activeId === "total_paid_today" &&

                            //     data?.bookings
                            //       ?.total_pending_properties_booked >= 3,
                            // },
                            // {
                            //   "text-red-700":
                            //     data?.bookings
                            //       ?.total_pending_properties_booked <= 2,
                            // }
                          )}
                        >
                          {data?.bookings?.total_pending_properties_booked <= 0
                            ? "-"
                            : "+"}
                          {/* {data?.bookings?.total_pending_properties_booked?.length} */}

                          {data?.bookings?.total_pending_properties_booked}
                        </p>
                        <div
                          className={classNames({
                            "rotate-180":
                              data?.bookings?.total_pending_properties_booked <=
                              0,
                          })}
                        >
                          <ProgressIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-2">
                    <Tooltip
                      content={` ${
                        data?.bookings?.total_pending_properties_booked === 0
                          ? " No Pending booked properties recorded."
                          : `You had total of ${formatNumber(
                              Number(
                                data?.bookings?.total_pending_properties_booked
                              )
                            )} pending booked properties.`
                      }`}
                      placement="left"
                      animation="duration-150"
                    >
                      <MoreInfoIcon />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <TopFeatures data={userstatistics?.data} /> */}
      {/* <div className=" grid grid-cols-3 gap-5">
        <div className=" col-span-2">
          <StatisticsChart />
        </div>
        <div className="w-full space-y-6 ">
         

          <div className="">
            <div className="border border-gray-200 rounded-xl  ">
              <div className="flex items-center justify-between p-4 py-5 rounded-t-xl border-b bg-white">
                <div className=" flex items-center gap-2">
                  <div className="font-medium text-gray-900 text-lg">
                    Statistics
                  </div>
                </div>
               
              </div>

              <div className="py-8">
                <UserDeviceReport />
              </div>
            </div>
          </div>

         
        </div>
      </div> */}
    </div>
  );
};

export default UserDashboard;
