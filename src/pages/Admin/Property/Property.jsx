import { SearchIcon, EmptyImage } from "../../../assets/SvgIcons";
import { Button } from "../../../components/forms/Button";
import DashboardHeading from "../../../layout/DashboardHeading";
import PropsFeatures from "./PropsFeatures";

const Property = () => {
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
