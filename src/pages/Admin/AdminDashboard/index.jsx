/* eslint-disable no-unused-vars */
import { Dropdown, DropdownItem } from "flowbite-react";
import StatisticsChart from "./StatisticsChart";
import { ArrowDownIcon } from "../../../assets/SvgIcons";
import UserDeviceReport from "./user-device-report";
import TopFeatures from "./TopFeatures";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchadminStatistics } from "../../../Redux/adminAuth/adminAuthThunk";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { adminstatistics, loadingAdminStatistics } = useSelector(
    (state) => state.adminauth
  );

  // console.log("adminstatistics:", adminstatistics);

  const fetchAdminStatsHandler = (url, search) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    }
    dispatch(fetchadminStatistics(fetchUrl));
  };

  useEffect(() => {
    fetchAdminStatsHandler(
      "/v1/admin/dashboards/admin-dashboard-statistics?start_date=2025-01-01&end_date=2025-12-31"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchAdminStatsHandler(
          "/v1/admin/dashboards/admin-dashboard-statistics?start_date=2025-01-01&end_date=2025-12-31",
          searchQuery
        );
      }
    };
    fetchSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  return (
    <div className="p-4 ">
      <div className=" flex items-center justify-between ">
        <div className="pb-4 pt-1">
          <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
            Overview
          </h1>
          <h5 className="text-gray-500 text-sm font-normal">
            Admin Overview of the sales stats, analytics, Recent bookings,
            Customer activities etc
          </h5>
        </div>
        <div className="flex items-center gap-3"></div>
      </div>
      {loadingAdminStatistics ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="">
          <TopFeatures data={adminstatistics?.data} />
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

export default AdminDashboard;
