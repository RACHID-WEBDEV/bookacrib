/* eslint-disable react/prop-types */
import { Dropdown, DropdownItem } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon2,
  PropertyIcon,
  MoreInfoIcon,
  CheckSquareIcon,
} from "../../../assets/SvgIcons";
import { Link } from "react-router-dom";

const PropsFeatures = ({ data }) => {
  // console.log("data", data);
  const navigate = useNavigate();

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
      <div className="relative w-full p-6 pr-10 h-36 rounded-2xl  group bg-gray-100">
        <div className=" flex items-center gap-6 pt-3">
          <HomeIcon2 className="text-[#373F41]" />
          <div className="space-y-3 ">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-800">
                {data?.restaurant || 0}
              </p>
            </div>
            <p className="text-gray-500 font-normal text-sm ">
              Total Restaurant
            </p>
          </div>
        </div>
        <div className="absolute top-14 right-4">
          <Dropdown
            dismissOnClick={true}
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
                <Link to="/admin/property/create-property">
                  <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                    New Restaurant
                  </p>
                </Link>
              </div>
            </DropdownItem>
            {/* <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  View All
                </p>
              </div>
            </DropdownItem> */}
            <DropdownItem onClick={() => navigate(0)}>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  Refresh
                </p>
              </div>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="relative w-full p-6 pr-10 h-36 rounded-2xl  group bg-gray-100">
        <div className=" flex items-center gap-6 pt-3">
          <PropertyIcon className="text-[#373F41] size-9" />
          <div className="space-y-3 ">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-800">
                {data?.room || 0}
              </p>
            </div>
            <p className="text-gray-500 font-normal text-sm ">Total Rooms</p>
          </div>
        </div>
        <div className="absolute top-14 right-4">
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
                <Link to="/admin/property/create-property">
                  <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                    New Rooms
                  </p>
                </Link>
              </div>
            </DropdownItem>
            {/* <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  View All
                </p>
              </div>
            </DropdownItem> */}
            <DropdownItem onClick={() => navigate(0)}>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  Reload
                </p>
              </div>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="relative w-full p-6 pr-10 h-36 rounded-2xl  group bg-gray-100">
        <div className=" flex items-center gap-6 pt-3">
          <CheckSquareIcon className="text-[#373F41]" />
          <div className="space-y-3 ">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-800">
                {data?.apartment || data?.Apartment || 0}
              </p>
            </div>
            <p className="text-gray-500 font-normal text-sm ">
              Total Apartment
            </p>
          </div>
        </div>
        <div className="absolute top-14 right-4">
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
                <Link to="/admin/property/create-property">
                  <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                    New Apartment
                  </p>
                </Link>
              </div>
            </DropdownItem>
            {/* <DropdownItem>
              <div className="flex items-center w-full gap-4 justify-between">
                <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                  View All
                </p>
              </div>
            </DropdownItem> */}
            <DropdownItem onClick={() => navigate(0)}>
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

export default PropsFeatures;
