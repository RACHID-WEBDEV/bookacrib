/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "./Button/ButtonPrimary";
import ButtonThird from "./Button/ButtonThird";
import ButtonClose from "./ButtonClose/ButtonClose";
import Checkbox from "./Checkbox/Checkbox";
// import Slider from "rc-slider";
// import Radio from "./Radio/Radio";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import MySwitch from "./MySwitch";
import DatePicker from "../forms/DatePicker";
import { formatDateStringYearStart } from "../../utils/constant";

// DEMO DATA
// const DATA_categories = [
//   {
//     name: "New Arrivals",
//   },
//   {
//     name: "On Sale",
//   },
//   {
//     name: "Backpacks",
//   },
//   {
//     name: "Black Friday",
//   },
//   {
//     name: "Monthly Promo",
//   },
//   {
//     name: "Discount Sales",
//   },
//   {
//     name: "Accessories",
//   },
// ];

// const DATA_colors = [
//   { name: "White" },
//   { name: "Beige" },
//   { name: "Blue" },
//   { name: "Black" },
//   { name: "Brown" },
//   { name: "Green" },
//   { name: "Navy" },
// ];

const DATA_payment_status = [
  { name: "completed" },
  { name: "successful" },
  { name: "pending" },
];

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "Most-Popular" },
  { name: "Best Rating", id: "Best-Rating" },
  { name: "Newest", id: "Newest" },
  { name: " Low Price - High Price", id: "Price-low-high" },
  { name: " High Price - Low Price", id: "Price-high-low" },
];

// const PRICE_RANGE = [100, 5000];

//
// eslint-disable-next-line react/prop-types
const UserStatsTabFilters = ({ handleFilters, cancelFilter }) => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [sortOrderStates, setSortOrderStates] = useState("");

  const [paymentStatus, setPaymentStatus] = useState([]);

  // console.log("paymentStatus:", paymentStatus);

  const statusUrl = (paymentStatus) => {
    if (paymentStatus.length === 0) {
      return ""; // No statuses, return an empty string
    }

    // Map each status to `paymentStatus=value` and join with `&`
    const queryParams = paymentStatus
      .map((value) => `paymentStatus=${value}`)
      .join("&");

    return `?${queryParams}`;
  };

  const paymentStatusURL = statusUrl(paymentStatus);
  // console.log("url payment:", statusUrl(paymentStatus));
  // Output: "?paymentStatus=paid&paymentStatus=pending&paymentStatus=failed"

  //

  const today = new Date();
  const formattedDate = today.toString();
  const [selectedStartDate, setSelectedStartDate] = useState(formattedDate);
  const [selectedEndDate, setSelectedEndDate] = useState(formattedDate);

  const startDate = formatDateStringYearStart(selectedStartDate);
  const endDate = formatDateStringYearStart(selectedEndDate);

  // console.log("StartDate:", startDate, "EndDate:", endDate);

  const dateformatUrl = (startDate, endDate) => {
    // Map each status to `paymentStatus=value` and join with `&`
    return `?start_date=${startDate}&end_date=${endDate}`;
  };

  const dateURL = dateformatUrl(startDate, endDate);

  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  const handleChangePaymentstatus = (checked, name) => {
    checked
      ? setPaymentStatus([...paymentStatus, name])
      : setPaymentStatus(paymentStatus.filter((i) => i !== name));
  };

  //

  // OK
  const renderXClear = () => {
    return (
      <span
        onClick={() => cancelFilter("/v1/dashboards/user-dashboard-statistics")}
        className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-800 text-white flex items-center justify-center ml-3 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  // OK
  const renderTabsSortPaymentDate = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-3 text-sm border rounded-lg focus:outline-none select-none
              ${open ? "!border-primary-500 " : ""}
                ${
                  sortOrderStates.length
                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                <path
                  d="M11.5166 5.70834L14.0499 8.24168"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5166 14.2917V5.70834"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.48327 14.2917L5.94995 11.7583"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.48315 5.70834V14.2917"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2">
                {sortOrderStates
                  ? DATA_sortOrderRadios.filter(
                      (i) => i.id === sortOrderStates
                    )[0].name
                  : "Sort Date"}
              </span>
              {!sortOrderStates.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setSortOrderStates("")}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 right-0 sm:px-0 lg:max-w-[640px]">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="grid lg:grid-cols-2 gap-4 px-4">
                    <div className="">
                      <div className="pt-4 px-2">
                        <p className="text-sm text-gray-600 pb-3 font-medium">
                          Start Date
                        </p>
                        <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                      </div>

                      <div className="">
                        <DatePicker
                          inline
                          // label="Start Date"
                          setSelectedDate={setSelectedStartDate}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="pt-4 px-2">
                        <p className="text-sm text-gray-600 pb-3 font-medium">
                          End Date
                        </p>
                        <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                      </div>

                      <div className="">
                        <DatePicker
                          inline
                          // label="Start Date"
                          setSelectedDate={setSelectedEndDate}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {DATA_sortOrderRadios.map((item) => (
                      <Radio
                        id={item.id}
                        key={item.id}
                        name="radioNameSort"
                        label={item.name}
                        defaultChecked={sortOrderStates === item.id}
                        onChange={setSortOrderStates}
                      />
                    ))}
                  </div> */}
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        cancelFilter(
                          "/v1/dashboards/user-dashboard-statistics"
                        );
                        // setSortOrderStates("");
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      // onClick={close}
                      onClick={() => {
                        handleFilters(dateURL);
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderTabsPaymentStatus = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-3 text-sm rounded-lg border focus:outline-none select-none
              ${open ? "!border-primary-500 " : ""}
                ${
                  paymentStatus.length
                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
            >
              {/* <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 9V3H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 15V21H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 3L13.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 13.5L3 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.9889 14.6604L2.46891 13.1404C1.84891 12.5204 1.84891 11.5004 2.46891 10.8804L3.9889 9.36039C4.2489 9.10039 4.4589 8.59038 4.4589 8.23038V6.08036C4.4589 5.20036 5.1789 4.48038 6.0589 4.48038H8.2089C8.5689 4.48038 9.0789 4.27041 9.3389 4.01041L10.8589 2.49039C11.4789 1.87039 12.4989 1.87039 13.1189 2.49039L14.6389 4.01041C14.8989 4.27041 15.4089 4.48038 15.7689 4.48038H17.9189C18.7989 4.48038 19.5189 5.20036 19.5189 6.08036V8.23038C19.5189 8.59038 19.7289 9.10039 19.9889 9.36039L21.5089 10.8804C22.1289 11.5004 22.1289 12.5204 21.5089 13.1404L19.9889 14.6604C19.7289 14.9204 19.5189 15.4304 19.5189 15.7904V17.9403C19.5189 18.8203 18.7989 19.5404 17.9189 19.5404H15.7689C15.4089 19.5404 14.8989 19.7504 14.6389 20.0104L13.1189 21.5304C12.4989 22.1504 11.4789 22.1504 10.8589 21.5304L9.3389 20.0104C9.0789 19.7504 8.5689 19.5404 8.2089 19.5404H6.0589C5.1789 19.5404 4.4589 18.8203 4.4589 17.9403V15.7904C4.4589 15.4204 4.2489 14.9104 3.9889 14.6604Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 15L15 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.4945 14.5H14.5035"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.49451 9.5H9.50349"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2">Payment Status</span>
              {!paymentStatus.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span
                  onClick={() => {
                    cancelFilter("/v1/dashboards/user-dashboard-statistics");
                    setPaymentStatus([]);
                  }}
                >
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {DATA_payment_status.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={paymentStatus.includes(item.name)}
                          onChange={(checked) =>
                            handleChangePaymentstatus(checked, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setPaymentStatus([]);
                        cancelFilter(
                          "/v1/dashboards/user-dashboard-statistics"
                        );
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      // onClick={close}

                      onClick={() => {
                        handleFilters(paymentStatusURL);
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderMoreFilterItem = (data) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div className="flex-shrink-0">
        <div
          className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
          onClick={openModalMoreFilter}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 6.5H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6.5H2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 17.5H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 17.5H2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="ml-2">Bookings filters </span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Bookings filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* --------- */}
                      {/* ---- */}
                      {/* <div className="py-7">
                        <h3 className="text-xl font-medium">Categories</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(DATA_categories)}
                        </div>
                      </div> */}
                      {/* --------- */}
                      {/* ---- */}
                      {/* <div className="py-7">
                        <h3 className="text-xl font-medium">Colors</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(DATA_colors)}
                        </div>
                      </div> */}
                      {/* --------- */}
                      {/* ---- */}
                      {/* <div className="py-7">
                        <h3 className="text-base font-medium">
                          Payment Status
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(DATA_payment_status)}
                          <div className="grid grid-cols-2 gap-4 sm:gap-x-8">
                            {DATA_payment_status.map((item) => (
                              <div key={item.name} className="">
                                <Checkbox
                                  name={item.name}
                                  label={item.name}
                                  defaultChecked={paymentStatus.includes(
                                    item.name
                                  )}
                                  onChange={(checked) =>
                                    handleChangePaymentstatus(
                                      checked,
                                      item.name
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div> */}

                      {/* --------- */}
                      {/* ---- */}

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-sm font-medium">Sort Date</h3>
                        <div className="mt-6 relative ">
                          <div className="grid lg:grid-cols-2 gap-4 px-4">
                            <div className="">
                              <div className="pt-4 px-2">
                                <p className="text-sm text-gray-600 pb-3 font-medium">
                                  Start Date
                                </p>
                                <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                              </div>

                              <div className="">
                                <DatePicker
                                  inline
                                  // label="Start Date"
                                  setSelectedDate={setSelectedStartDate}
                                />
                              </div>
                            </div>
                            <div className="">
                              <div className="pt-4 px-2">
                                <p className="text-sm text-gray-600 pb-3 font-medium">
                                  End Date
                                </p>
                                <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                              </div>

                              <div className="">
                                <DatePicker
                                  inline
                                  // label="Start Date"
                                  setSelectedDate={setSelectedEndDate}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="relative flex flex-col space-y-5">
                            {DATA_sortOrderRadios.map((item) => (
                              <Radio
                                id={item.id}
                                key={item.id}
                                name="radioNameSort"
                                label={item.name}
                                defaultChecked={sortOrderStates === item.id}
                                onChange={setSortOrderStates}
                              />
                            ))}
                          </div> */}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      {/* <div className="py-7">
                        <h3 className="text-xl font-medium">On sale!</h3>
                        <div className="mt-6 relative ">
                          <MySwitch
                            label="On sale!"
                            desc="Products currently on sale"
                            enabled={isOnSale}
                            onChange={setIsIsOnSale}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        // setRangePrices(PRICE_RANGE);
                        // setCategoriesState([]);
                        // setColorsState([]);
                        // setSortOrderStates("");
                        setPaymentStatus([]);
                        cancelFilter(
                          "/v1/dashboards/user-dashboard-statistics"
                        );
                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        if (paymentStatus.length === 0) {
                          handleFilters(dateURL);
                        } else {
                          handleFilters(paymentStatusURL);
                        }
                        closeModalMoreFilter();
                      }}
                      // onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden lg:flex flex-1 space-x-4">
        {/* {renderTabsPriceRage()} */}
        {/* {renderTabsCategories()} */}
        {/* {renderTabsColor()} */}
        {/* {renderTabsPaymentStatus()} */}
        {/* {renderTabIsOnsale()} */}
        <div className="">{renderTabsSortPaymentDate()}</div>
      </div>

      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex overflow-x-auto lg:hidden space-x-4">
        {renderTabMobileFilter()}
      </div>
    </div>
  );
};

export default UserStatsTabFilters;
