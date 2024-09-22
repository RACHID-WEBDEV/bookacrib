import { Dropdown, DropdownItem } from "flowbite-react";
import { ProgressIcon, MoreInfoIcon } from "../../../assets/SvgIcons";

const TopFeatures = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 pb-6">
      <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
        <div className="space-y-3 ">
          <p className="text-gray-700 font-medium text- pt-2">Today Bookings</p>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">600</p>
            <div className=" flex items-center gap-1">
              <p className="text-green-700 font-medium">+20</p>

              <ProgressIcon />
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-2">
          <Dropdown
            dismissOnClick={false}
            inline
            arrowIcon={false}
            placement="bottom"
            label={
              <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                <MoreInfoIcon />
                <span>{/* <ArrowDownIcon className="text-gray-800" /> */}</span>
              </div>
            }
          >
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between ">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  New Bookings
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  View All
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  Refresh
                </p>
              </div>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
        <div className="space-y-3 ">
          <p className="text-gray-700 font-medium text- pt-2">Total Rooms</p>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">6,247</p>
            <div className=" flex items-center gap-1">
              <p className="text-green-700 font-medium">+20</p>

              <ProgressIcon />
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-2">
          <Dropdown
            dismissOnClick={false}
            inline
            arrowIcon={false}
            placement="bottom"
            label={
              <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                <MoreInfoIcon />
                <span>{/* <ArrowDownIcon className="text-gray-800" /> */}</span>
              </div>
            }
          >
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between ">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  New Bookings
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  View All
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  Refresh
                </p>
              </div>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
        <div className="space-y-3 ">
          <p className="text-gray-700 font-medium text- pt-2">
            Total Apartments
          </p>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">104</p>
            <div className=" flex items-center gap-1">
              <p className="text-green-700 font-medium">+20</p>

              <ProgressIcon />
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-2">
          <Dropdown
            dismissOnClick={false}
            inline
            arrowIcon={false}
            placement="bottom"
            label={
              <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                <MoreInfoIcon />
                <span>{/* <ArrowDownIcon className="text-gray-800" /> */}</span>
              </div>
            }
          >
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between ">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  New Bookings
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  View All
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  Refresh
                </p>
              </div>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
        <div className="space-y-3 ">
          <p className="text-gray-700 font-medium text- pt-2">
            Total Customers
          </p>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">16,222</p>
            <div className=" flex items-center gap-1">
              <p className="text-green-700 font-medium">+20</p>

              <ProgressIcon />
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-2">
          <Dropdown
            dismissOnClick={false}
            inline
            arrowIcon={false}
            placement="bottom"
            label={
              <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                <MoreInfoIcon />
                <span>{/* <ArrowDownIcon className="text-gray-800" /> */}</span>
              </div>
            }
          >
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between ">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  New Bookings
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  View All
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  Refresh
                </p>
              </div>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TopFeatures;
