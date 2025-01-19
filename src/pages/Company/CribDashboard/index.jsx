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

import { fetchCribStatistics } from "../../../Redux/auth/authThunk";
import classNames from "classnames";
import { formatNumber } from "../../../lib/constants";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import { Link } from "react-router-dom";
import UserStatsTabFilters from "../../../components/shared/UserStatsTabFilters";

const CribDashboard = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { cribstatistics, loadingCribStatistics } = useSelector(
    (state) => state.auth
  );
  const [activeBookingReport, setActiveBookingReport] = useState(
    "total_booking_income_in_ngn"
  );
  // console.log("cribstatistics:", cribstatistics);

  const fetchUserStatsHandler = (url, search, params) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    } else if (params) {
      fetchUrl += `${params}`;
    }
    dispatch(fetchCribStatistics(fetchUrl));
  };

  useEffect(() => {
    fetchUserStatsHandler(
      "/v1/customers/company/dashboards/company-dashboard-statistics?start_date=2025-01-01&end_date=2025-12-31"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchUserStatsHandler(
          "/v1/customers/company/dashboards/company-dashboard-statistics",
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
        "/v1/customers/company/dashboards/company-dashboard-statistics",
        "",
        params
      );
    }
  };

  const data = cribstatistics?.data;
  return (
    <div className="p-4 ">
      <div className=" flex items-center justify-between ">
        <div className="pb-4 pt-1">
          <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
            Crib Owner
          </h1>
          <h5 className="text-gray-500 text-sm font-normal">
            Crib Owner/Property Owner Overview of the sales stats, Recent
            bookings, Customer activities etc
          </h5>
        </div>
        <div className="flex items-center gap-3"></div>
      </div>
      {loadingCribStatistics ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="">
          <div className="flex flex-col gap-3 p-3 xl:flex-row box box--stacked md:mb-6">
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
                    {activeBookingReport === "total_booking_income_in_ngn" &&
                      "Total Bookings Income"}

                    {activeBookingReport ===
                      "total_booking_income_this_month_ngn" &&
                      "Total Bookings Income This Month"}
                    {activeBookingReport ===
                      "total_booking_income_last_month_ngn" &&
                      "Total Bookings Income Last Month"}
                  </div>
                  <div className="flex items-center justify-center mt-2 lg:justify-start">
                    <div className="text-2xl font-medium text-white">
                      ₦
                      {activeBookingReport ===
                        "total_booking_income_in_ngn" && (
                        <>
                          {formatNumber(
                            Number(
                              data?.payments?.total_booking_income_in_ngn
                                ?.total_amount
                            )
                          )}
                          {Number(
                            data?.payments?.total_booking_income_in_ngn
                              ?.total_amount
                          ) === 0 && ".00"}
                        </>
                      )}
                      {activeBookingReport ===
                        "total_booking_income_this_month_ngn" && (
                        <>
                          {formatNumber(
                            Number(
                              data?.payments
                                ?.total_booking_income_this_month_ngn
                                ?.total_amount
                            )
                          )}
                          {Number(
                            data?.payments?.total_booking_income_this_month_ngn
                              ?.total_amount
                          ) === 0 && ".00"}
                        </>
                      )}
                      {activeBookingReport ===
                        "total_booking_income_last_month_ngn" && (
                        <>
                          {formatNumber(
                            Number(
                              data?.payments
                                ?.total_booking_income_last_month_ngn
                                ?.total_amount
                            )
                          )}
                          {Number(
                            data?.payments?.total_booking_income_last_month_ngn
                              ?.total_amount
                          ) === 0 && ".00"}
                        </>
                      )}
                    </div>
                    <div className="flex items-center ml-2.5 border border-success/50 bg-success/50 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-white/90 dark:bg-white/10">
                      +
                      {activeBookingReport === "total_booking_income_in_ngn" &&
                        Number(
                          data?.payments?.total_booking_income_in_ngn
                            ?.payment_count
                        )}
                      {activeBookingReport ===
                        "total_booking_income_this_month_ngn" &&
                        Number(
                          data?.payments?.total_booking_income_this_month_ngn
                            ?.payment_count
                        )}
                      {activeBookingReport ===
                        "total_booking_income_last_month_ngn" &&
                        Number(
                          data?.payments?.total_booking_income_last_month_ngn
                            ?.payment_count
                        )}
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
                    The total payment made{" "}
                    {activeBookingReport ===
                      "total_booking_income_this_month_ngn" && " this month"}
                    {activeBookingReport ===
                      "total_booking_income_last_month_ngn" &&
                      "last month"}{" "}
                    from booking of your our services.
                  </div>
                </div>
                <div className="lg:ml-auto w-52 xl:ml-0 xl:w-full">
                  {/* <Link
                    className="transition duration-200 border shadow-sm inline-flex items-center font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed rounded-full relative justify-start w-full px-4 border-white/20 py-2.5 bg-white/10 text-white hover:bg-white/[0.15] dark:bg-darkmode-900/30 dark:border-darkmode-900/30"
                    to="/user/transactions/list-bookings"
                  >
                    Switch Reports
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
                  </Link> */}

                  <Dropdown
                    dismissOnClick={true}
                    inline
                    arrowIcon={false}
                    placement="bottom"
                    label={
                      <div
                        className="transition  duration-200 border shadow-sm inline-flex items-center font-medium cursor-pointer  focus-visible:outline-none [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed rounded-full relative justify-start w-[218px] px-4 border-white/20 py-2.5 bg-white/10 text-white hover:bg-white/[0.15] "
                        // to="/user/transactions/list-bookings"
                      >
                        Switch Reports
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
                      </div>
                    }
                  >
                    <DropdownItem
                      onClick={() =>
                        setActiveBookingReport("total_booking_income_in_ngn")
                      }
                    >
                      <p
                        id="total_booking_income_in_ngn"
                        className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
                      >
                        Total Bookings Income
                      </p>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        setActiveBookingReport(
                          "total_booking_income_this_month_ngn"
                        )
                      }
                    >
                      <p
                        id="total_booking_income_this_month_ngn"
                        className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
                      >
                        Total Bookings Income This Month
                      </p>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        setActiveBookingReport(
                          "total_booking_income_last_month_ngn"
                        )
                      }
                    >
                      <p
                        id="total_booking_income_last_month_ngn"
                        className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
                      >
                        Total Bookings Income Last Month
                      </p>
                    </DropdownItem>
                    {/* <DropdownItem
                      onClick={() => setActiveBookingReport("total_pending")}
                    >
                      <p
                        id="total_pending"
                        className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
                      >
                        Pending Crib Owners
                      </p>
                    </DropdownItem> */}
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full p-5 sm:py-7 sm:px-8 border rounded-[0.6rem] border-slate-300/80 border-dashed bg-gray-50">
              <div className="flex flex-col sm:items-end sm:justify-end sm:flex-row gap-x-3 gap-y-2">
                {/* <div className=" flex items-center justify-end"> */}
                <UserStatsTabFilters
                  handleFilters={handleFilters}
                  cancelFilter={fetchUserStatsHandler}
                />
                {/* </div> */}
              </div>
              <div className="pt-4">
                <TopFeatures data={cribstatistics?.data} />
              </div>
            </div>
          </div>
          {/* <TopFeatures data={cribstatistics?.data} /> */}
          <div className=" grid grid-cols-3 gap-5">
            <div className=" col-span-2">
              <StatisticsChart />
            </div>
            <div className="w-full space-y-6 ">
              {/* <div className="">
            <div className="border border-gray-200 rounded-xl  ">
              <div className="flex items-center justify-between p-4 py-5 rounded-t-xl border-b bg-white">
                <div className=" flex items-center gap-2">
                  <div className="font-medium text-gray-900 font-lg">
                    Total Sales
                  </div>
                </div>
                <Dropdown
                  dismissOnClick={true}
                  inline
                  arrowIcon={false}
                  placement="bottom"
                  label={
                    <div
                      className="flex items-center gap-1  bg-white border border-gray-200 text-gray-700 font-semibold font-Inter text-sm rounded-lg 
                    p-2.5 pl-3"
                    >
                      <span>Past 30 Days</span>
                      <span>
                        <ArrowDownIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Week
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      2 Weeks
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      3 Weeks
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      4 Weeks
                    </span>
                  </DropdownItem>
                </Dropdown>
              </div>
              <div className="  px-6 py-4  text-sm flex items-center justify-between w-full">
                <div className=" flex items-center gap-2">
                  <div className="w-4 h-4 bg-cyan-600  text-gray-500 "></div>
                  <div className="font-medium  text-gray-500 ">Order Sales</div>
                </div>
                <p className="text-gray-900 font-medium ">₦0.00</p>
              </div>
              <div className=" px-6 py-4  text-sm flex items-center justify-between w-full">
                <div className=" flex items-center gap-2">
                  <div className="w-4 h-4 bg-lime-600  text-gray-500 "></div>
                  <div className="font-medium  text-gray-500 ">
                    Sales Earnings
                  </div>
                </div>
                <p className="text-gray-900 font-medium ">₦0.00</p>
              </div>
              <div className=" px-6 py-4  text-sm flex items-center justify-between w-full">
                <div className=" flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600  text-gray-500 "></div>
                  <div className="font-medium  text-gray-500 ">New Users</div>
                </div>
                <p className="text-gray-900 font-medium ">₦0.00</p>
              </div>
              <div className=" px-6 py-4  text-sm flex items-center justify-between w-full">
                <div className=" flex items-center gap-2">
                  <div className="w-4 h-4 bg-lime-600  text-gray-500 "></div>
                  <div className="font-medium  text-gray-500 ">Order Sales</div>
                </div>
                <p className="text-gray-900 font-medium ">₦0.00</p>
              </div>
            </div>
          </div> */}

              <div className="">
                <div className="border border-gray-200 rounded-xl  ">
                  <div className="flex items-center justify-between p-4 py-5 rounded-t-xl border-b bg-white">
                    <div className=" flex items-center gap-2">
                      <div className="font-medium text-gray-900 text-lg">
                        Statistics
                      </div>
                    </div>
                    {/* <Dropdown
                  dismissOnClick={true}
                  inline
                  arrowIcon={false}
                  placement="bottom"
                  label={
                    <div
                      className="flex items-center gap-1  bg-white border border-gray-200 text-gray-700 font-semibold font-Inter text-sm rounded-lg 
                    p-2.5 pl-3"
                    >
                      <span>Past 30 Days</span>
                      <span>
                        <ArrowDownIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Week
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      2 Weeks
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      3 Weeks
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      4 Weeks
                    </span>
                  </DropdownItem>
                </Dropdown> */}
                  </div>

                  <div className="py-8">
                    <UserDeviceReport />
                  </div>
                </div>
              </div>

              {/* <div className="">
            <div className="border border-gray-200 rounded-xl  ">
              <div className="flex items-center justify-between p-4 py-5 rounded-t-xl border-b bg-white">
                <div className=" flex items-center gap-2">
                  <div className="font-medium text-gray-900 font-lg">
                    Visitors By Country
                  </div>
                </div>
                <Dropdown
                  dismissOnClick={true}
                  inline
                  arrowIcon={false}
                  placement="bottom"
                  label={
                    <div
                      className="flex items-center gap-1  bg-white border border-gray-200 text-gray-700 font-semibold font-Inter text-sm rounded-lg 
                    p-2.5 pl-3"
                    >
                      <span>Past 30 Days</span>
                      <span>
                        <ArrowDownIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Week
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      2 Weeks
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      3 Weeks
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      4 Weeks
                    </span>
                  </DropdownItem>
                </Dropdown>
              </div>
              <div className=" space-y-2">
                <div className="  px-6 pt-4 last:pb-4  text-sm flex items-center justify-between w-full">
                  <div className=" flex-col items-start gap-2">
                    <div className="  text-gray-500 text-xs">Nigeria</div>
                    <div className="font-medium text-lg text-gray-900 ">
                      44.8%
                    </div>
                  </div>
                  <div className=" flex-col items-start gap-2">
                    <div className="  text-gray-500 text-xs">United States</div>
                    <div className="font-medium text-lg text-gray-900 ">
                      43.0%
                    </div>
                  </div>
                </div>

                <div className="  px-6 pt-4 last:pb-4  text-sm flex items-center justify-between w-full">
                  <div className=" flex-col items-start gap-2">
                    <div className="  text-gray-500 text-xs">
                      United Kingdom
                    </div>
                    <div className="font-medium text-lg text-gray-900 ">
                      44.8%
                    </div>
                  </div>
                  <div className=" flex-col items-start gap-2">
                    <div className="  text-gray-500 text-xs">Germany</div>
                    <div className="font-medium text-lg text-gray-900 ">
                      66.0%
                    </div>
                  </div>
                </div>
                <div className="  px-6 pt-4 last:pb-4  text-sm flex items-center justify-between w-full">
                  <div className=" flex-col items-start gap-2">
                    <div className="  text-gray-500 text-xs">China</div>
                    <div className="font-medium text-lg text-gray-900 ">
                      23.8%
                    </div>
                  </div>
                  <div className=" flex-col items-start gap-2">
                    <div className="  text-gray-500 text-xs">Indonesia</div>
                    <div className="font-medium text-lg text-gray-900 ">
                      16.9%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CribDashboard;
