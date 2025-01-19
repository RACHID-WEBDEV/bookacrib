/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import EmptyState from "src/components/ui/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { Dropdown, DropdownItem } from "flowbite-react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  Legend,
} from "recharts";
import { ArrowDownIcon } from "src/assets/SvgIcons";

const data = [
  {
    name: "Jan",
    total_revenue: 4000,
    project_cost: 2400,
  },
  {
    name: "Feb",
    total_revenue: 3000,
    project_cost: 1398,
  },
  {
    name: "Mar",
    total_revenue: 2000,
    project_cost: 9800,
  },
  {
    name: "Apr",
    total_revenue: 2780,
    project_cost: 3908,
  },
  {
    name: "May",
    total_revenue: 1890,
    project_cost: 4800,
  },
  {
    name: "Jun",
    total_revenue: 3490,
    project_cost: 4300,
  },
  {
    name: "Jul",
    total_revenue: 3490,
    project_cost: 4300,
  },
  {
    name: "Aug",
    total_revenue: 5300,
    project_cost: 2100,
  },
  {
    name: "Sep",
    total_revenue: 4000,
    project_cost: 2400,
  },
  {
    name: "Oct",
    total_revenue: 3500,
    project_cost: 2000,
  },
  {
    name: "Nov",
    total_revenue: 6000,
    project_cost: 4400,
  },
  {
    name: "Dec",
    total_revenue: 5500,
    project_cost: 3700,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div className="bg-white z-10 text-default-900 shadow-lg  space-y-2 rounded-md  pb-2">
        <div className="bg-default-50 rounded-t-md border-b border-default-200 py-1.5 px-2">
          {payload[0].payload.name}
        </div>
        {payload.map((item, index) => (
          <div
            key={`project-revenue-bar-tootltip-${index}`}
            className="flex items-center gap-2 font-medium text-default-600 px-2 hover:bg-default-50"
          >
            <span
              className="w-2.5 h-2.5 rounded-full bg-primary"
              style={{ backgroundColor: `${item.color}` }}
            ></span>
            <span>
              {item.name === "total_revenue" && "Total Revenue"}
              {item.name === "project_cost" && "Project Cost"}:
            </span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
const YAxisFormatter = (value) => {
  return `${value / 1000}k`;
};

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <>
      {/* <ul className="flex justify-center gap-2 mt-2">
        {payload.map((entry: any, index: any) => (
          <li
            key={`rechart-ligend-item-${index}`}
            className="flex items-center gap-1 text-xs font-medium text-gray-600"
          >
            <span
              className="h-2 w-2 rounded-[2px]  block"
              style={{ backgroundColor: `${entry.color}` }}
            ></span>

            {entry.value === "total_revenue" && "Total revenue"}
            {entry.value === "project_cost" && "Project Cost"}
          </li>
        ))}
      </ul> */}
      <p className=" text-center text-xs font-medium text-gray-600 pt-2">
        Months
      </p>
    </>
  );
};

const StatisticsChart = ({ height = 320 }) => {
  return (
    <div>
      <div className="rounded-xl  bg-white text-gray-600 shadow-shadow-xs py-10 relative">
        <h2 className="text-lg text-gray-900 font-semibold pl-4 pb-4">
          Bookings
        </h2>
        <hr className="text-gray-200" />
        <div className="pt-1">
          <Tabs defaultValue="24-hours" className=" w-full">
            <div className="flex items-center justify-between px-4">
              <div className=" flex items-center justify-between flex-wrap py-4">
                <TabsList className=" flex items-center flex-wrap rounded border border-gray-400">
                  <TabsTrigger value="24-hours">24 Hour</TabsTrigger>
                  <TabsTrigger value="7-days">7 Days</TabsTrigger>
                  <TabsTrigger value="30-days">30 days</TabsTrigger>
                  <TabsTrigger value="12-months">12 Months</TabsTrigger>
                </TabsList>
              </div>
              <div className=" flex items-center gap-3">
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
                      <span>Jan 6 – Jan 13</span>
                      <span>
                        <ArrowDownIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Week <span className=" opacity-0">2 Weeks</span>
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Month
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Year
                    </span>
                  </DropdownItem>
                </Dropdown>

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
                      <span>Revenue Earned (₦)</span>
                      <span>
                        <ArrowDownIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Week <span className=" opacity-0">2 Weeks</span>
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Month
                    </span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="!text-sm !text-gray-600 font-normal">
                      1 Year
                    </span>
                  </DropdownItem>
                </Dropdown>
                {/* <form className="w-44 relative">
                  <select className="hide-caret  bg-white border border-gray-200 text-gray-700 font-semibold font-Inter text-sm rounded-md outline-none focus:border-gray-400 block w-full p-2.5 pl-3 ">
                    <option selected></option>
                    <option value="US">1 Week</option>
                    <option value="CA">1 Month </option>
                    <option value="FR">1 Year</option>
                  </select>
                  <div className="absolute right-1 top-[10px] z-30">
                    <CaretDownIcon />
                  </div>
                </form> */}
              </div>
            </div>

            <TabsContent value="24-hours">
              <div className="pt-10">
                <ResponsiveContainer width="100%" height={height}>
                  <BarChart height={height} data={data}>
                    <CartesianGrid
                      stroke="#EAECF0"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      content={<CustomLegend />}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: `#0C0F5C`,
                        fontSize: "12px",
                      }}
                      tickLine={false}
                      stroke="#D0D5DD"
                      axisLine={false}
                    />
                    <YAxis
                      tick={{
                        fill: `#0C0F5C`,
                        fontSize: "12px",
                      }}
                      tickLine={false}
                      axisLine={false}
                      stroke="#D0D5DD"
                      tickFormatter={YAxisFormatter}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="total_revenue"
                      fill="#56CCF2"
                      className="rounded-xl"
                    />
                    {/* <Bar dataKey="project_cost" fill="#1D1DBA" fillOpacity={0.3} /> */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="7-days">
              <div className="h-[500px] w-full relative">
                <EmptyState text="No 7 Days revenue statistics" />
              </div>
            </TabsContent>
            <TabsContent value="30-days">
              <div className="h-[500px] w-full relative">
                <EmptyState text="No 30 Days revenue statistics" />
              </div>
            </TabsContent>
            <TabsContent value="12-months">
              <div className="h-[500px] w-full relative">
                <EmptyState text="No 12 Months revenue statistics" />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="absolute top-1/2 left-6 -translate-x-1/2  -translate-y-1/2 ">
          <p className=" text-center text-xs font-medium text-gray-600 -rotate-90 ">
            Revenue
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
