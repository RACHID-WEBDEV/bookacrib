/* eslint-disable no-unused-vars */
// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Checkbox from "src/components/forms/Checkbox/Checkbox.jsx";
import {
  ArrowDownIcon,
  SearchIcon,
  FilterIcon,
  XIconSmall,
} from "../../assets/SvgIcons";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Button } from "../forms/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriess } from "../../Redux/categories/categoriesThunk";
import { fetchRoomTypes } from "../../Redux/roomtypes/roomtypesThunk";
import { capitalizeFirstLetter } from "../../utils/constant";
import SingleCustomCheckboxGroup from "../forms/Checkbox/SingleCustomCheckboxGroup";
import SelectCustomCheckboxGroup from "../forms/Checkbox/SelectCustomCheckboxGroup";
import { getData } from "../../utils/api";

const Hero = () => {
  // const [checked, setChecked] = useState(false);
  // const [checkedResturant, setCheckedResturant] = useState(false);
  // const [checkedCar, setCheckedCar] = useState(false);
  // const [checkedTaxi, setCheckedTaxi] = useState(false);
  // const [checkedWifi, setCheckedWifi] = useState(false);
  // const [checkedAirCondition, setCheckedAirCondition] = useState(false);
  // const [checkedMealPlus, setCheckedMealPlus] = useState(false);
  // const [checkedRoomServices, setCheckedRoomServices] = useState(false);
  // const [checkedParking, setCheckedParking] = useState(false);
  // const [checkedFreeCancellation, setCheckedFreeCancellation] = useState(false);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  console.log("price", selectedPriceRange);
  const { categories } = useSelector((state) => state.category);
  const fetchCategoryHandler = (url) => {
    dispatch(fetchCategoriess(url));
  };

  const categoryFilter = categories?.data?.map((category) => ({
    id: `${category?.uuid}`,
    name: category.name,
    label: `${capitalizeFirstLetter(category.name)}`,
  }));

  // console.log("categories", selectedCategory);
  const { roomtypes } = useSelector((state) => state.roomtype);

  console.log(roomtypes);
  const fetchRoomTypeHandler = (url) => {
    dispatch(fetchRoomTypes(url));
  };

  const roomTypeFilter = roomtypes?.data?.map((roomType) => ({
    id: `${roomType?.uuid}`,
    name: roomType.name,
    label: `${capitalizeFirstLetter(roomType.name)}`,
  }));
  console.log("roomType", selectedRoomType);

  useEffect(() => {
    fetchRoomTypeHandler(
      "bookacrib-api-routes/v1/room-types/list-room-types?status=yes&limit=50"
    );

    fetchCategoryHandler(
      "v1/public/categories/list-all-categories?status=yes&limit=50"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const priceRangeData = [
    {
      id: 100020000,
      name: "Less than - 20k",
      label: "Less than - 20k",
      min_price: 1000,
      max_price: 20000,
    },
    {
      id: 2100050000,
      name: "21k - 50k",
      label: "21k - 50k",
      min_price: 21000,
      max_price: 50000,
    },
    {
      id: 51000100000,
      name: "51k - 100k",
      label: "51k - 100k",
      min_price: 51000,
      max_price: 100000,
    },
    {
      id: 101000200000,
      name: "101k - 200k",
      label: "101k - 200k",
      min_price: 101000,
      max_price: 200000,
    },
    {
      id: 201000300000,
      name: "201k - 300k",
      label: "201k - 300k",
      min_price: 201000,
      max_price: 300000,
    },
    {
      id: 301000400000,
      name: "301k - 400k",
      label: "301k - 400k",
      min_price: 301000,
      max_price: 400000,
    },
    {
      id: 401000500000,
      name: "401k - 499k",
      label: "401k - 499k",
      min_price: 401000,
      max_price: 499000,
    },
    {
      id: 5000001000000,
      name: "500k Above - 1 Million",
      label: "500k Above - 1 Million",
      min_price: 500000,
      max_price: 1000000,
    },
    {
      id: 10000002000000,
      name: "1 Million - 2 Million",
      label: "1 Million - 2 Million",
      min_price: 1000000,
      max_price: 2000000,
    },
    {
      id: 20000005000000,
      name: "2 Million - 5 Million",
      label: "2 Million - 5 Million",
      min_price: 2000000,
      max_price: 5000000,
    },
    {
      id: 500000010000000,
      name: "5 Million - 10 Million",
      label: "5 Million - 10 Million",
      min_price: 5000000,
      max_price: 10000000,
    },

    {
      id: 1000000020000000,
      name: "10 Million and Above",
      label: "10 Million and Above",
      min_price: 10000000,
      max_price: 1000000000,
    },
  ];

  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [invoicesData, setInvoicesData] = useState([]);
  const [errorInvoice, setErrorInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // console.log("search query: ", searchQuery);

  console.log("error query Invoice: ", errorInvoice);
  // console.log("invoices tracking:", invoicesData);

  console.log(
    "first invoice: ",
    invoicesData?.length
    // "data:",
    // Array.isArray(invoicesData?.data),
    // "first invoice: ",
    // Array.isArray(invoicesData)
  );

  const fetchPropertySearchHandler = async (
    url,
    search,
    room_type,
    category_id,
    min_price,
    max_price,
    state_id
  ) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `&q=${search}`;
    } else if (room_type) {
      fetchUrl += `&room_type_id=${room_type}`;
    } else if (category_id) {
      fetchUrl += `&category_id=${category_id}`;
    } else if (min_price) {
      fetchUrl += `&min_price=${min_price}`;
    } else if (max_price) {
      fetchUrl += `&max_price=${max_price}`;
    } else if (state_id) {
      fetchUrl += `&state_id=${state_id}`;
    }

    setLoadingInvoice(true);
    try {
      const response = await getData(fetchUrl);
      setInvoicesData(response?.data?.progress);
    } catch (error) {
      setErrorInvoice(error.response.data.message);
    }
  };

  // console.log("first: ", priceRangeData);
  return (
    <div className=" bg-[#E8EDF6]">
      <div className="relative">
        {/* <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div> */}
        <div className="relative container m-auto px-0 md:px-12 lg:px-7">
          <div className="pt-40 pb-10 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto px-4 md:px-0">
              <h1 className="text-stone-800 dark:text-white font-bold text-4xl md:text-6xl xl:text-7xl">
                Get a Cheap place to relax with
                <span className="text-primary-800"> premium services.</span>
              </h1>
              <p className="mt-8 text-gray-700 dark:text-gray-300">
                Search low prices on hotels, homes and much more...
              </p>
            </div>
            <div className="mt-16 max-w-6xl mx-auto p-4 py-6 lg:p-0  bg-white lg:bg-transparent">
              <div className="">
                <div className="flex items-start pb-2">
                  <p className="text-base hidden lg:flex font-medium text-gray-600">
                    Search and Filter
                  </p>
                </div>

                <div className=" flex flex-wrap justify-start rounded-lg gap-y-4 gap-x-2 lg:gap-x-6 lg:p-4 bg-white">
                  <SingleCustomCheckboxGroup
                    items={categoryFilter}
                    selectedItems={selectedCategory}
                    setSelectedItems={setSelectedCategory}
                    containerClassName="gap-x-4 flex-wrap"
                  />

                  {/* <div className="border border-gray-400 rounded-md px-4 py-2.5 lg:min-w-36">
                    <Checkbox
                      id="room"
                      name="room"
                      checked={checked}
                      setChecked={setChecked}
                      label="Room"
                    />
                  </div>

                  <div className="border border-gray-400 rounded-md px-4 py-2.5 lg:min-w-36">
                    <Checkbox
                      id="Resturant"
                      name="Resturant"
                      checked={checkedResturant}
                      setChecked={setCheckedResturant}
                      label="Resturant"
                    />
                  </div>
                  <div className="border border-gray-400 rounded-md px-4 py-2.5 lg:min-w-36">
                    <Checkbox
                      id="car"
                      name="car"
                      checked={checkedCar}
                      setChecked={setCheckedCar}
                      label="Car Rental"
                    />
                  </div>

                  <div className="border border-gray-400 rounded-md px-4 py-2.5 min-w-36">
                    <Checkbox
                      id="taxi"
                      name="taxi"
                      checked={checkedTaxi}
                      setChecked={setCheckedTaxi}
                      label="Airport Taxi"
                    />
                  </div> */}
                </div>
              </div>
              <h2 className="text-sm mt-6 text-gray-500 font-medium lg:hidden ">
                Sort:
              </h2>
              <div className="pt-2 lg:pt-8 flex items-center w-full gap-2.5 flex-wrap ">
                <div className=" flex-1 min-w-[300px]">
                  <form className="lllmax-w-[580px]">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only "
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <SearchIcon className="text-slate-500" />
                      </div>

                      <input
                        type="text"
                        id="default-search"
                        // className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 font-Inter border border-gray-300 rounded-md bg-white outline-none"
                        className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border font-Inter border-gray-300 rounded-md bg-white outline-none"
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
                            fetchPropertySearchHandler(
                              "/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=100&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=b36557cb-a672-4422-8d92-3b0fcbaa8143",
                              "",
                              ""
                            );
                          }}
                          className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
                        >
                          <XIconSmall />
                        </div>
                      )}
                    </div>
                    {/* <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500">
                        <SearchIcon />
                      </div>
                      <input
                        type="search"
                        className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border font-Inter border-gray-300 rounded-md bg-white outline-none  "
                        placeholder="Enter location or Search"
                        required
                      />
                    </div> */}
                  </form>
                </div>
                <br className="lg:hidden" />
                <h2 className="text-sm text-gray-500 font-medium hidden lg:flex">
                  Sort:
                </h2>

                {/* <Dropdown
                  dismissOnClick={false}
                  inline
                  arrowIcon={false}
                  placement="bottom"
                  label={
                    <div className="flex items-center gap-10 lg:gap-20 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-2 pl-2.5">
                      <span>Features</span>
                      <span>
                        <ArrowDownIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Free Wifi
                      </p>
                      <Checkbox
                        id="free-wifi"
                        name="free-wifi"
                        checked={checkedWifi}
                        setChecked={setCheckedWifi}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Air Condition
                      </p>
                      <Checkbox
                        id="air-condition"
                        name="air-condition"
                        checked={checkedAirCondition}
                        setChecked={setCheckedAirCondition}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Meal Plus
                      </p>
                      <Checkbox
                        id="mealPlus"
                        name="mealPlus"
                        checked={checkedMealPlus}
                        setChecked={setCheckedMealPlus}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Room service
                      </p>
                      <Checkbox
                        id="room-service"
                        name="room-service"
                        checked={checkedRoomServices}
                        setChecked={setCheckedRoomServices}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Parking
                      </p>
                      <Checkbox
                        id="parking"
                        name="parking"
                        checked={checkedParking}
                        setChecked={setCheckedParking}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Free Cancellation
                      </p>
                      <Checkbox
                        id="free-cancellation"
                        name="free-cancellation"
                        checked={checkedFreeCancellation}
                        setChecked={setCheckedFreeCancellation}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                </Dropdown> */}

                <Dropdown
                  dismissOnClick={false}
                  inline
                  arrowIcon={false}
                  placement="bottom"
                  label={
                    <div className="flex items-center gap-x-4 lg:gap-x-8 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-2.5 pr-3">
                      <span>Room Type</span>
                      <span>
                        <FilterIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <SelectCustomCheckboxGroup
                    items={roomTypeFilter}
                    selectedItems={selectedRoomType}
                    setSelectedItems={setSelectedRoomType}
                    containerClassName=" flex-col"
                  />
                </Dropdown>

                <Dropdown
                  dismissOnClick={false}
                  inline
                  arrowIcon={false}
                  placement="bottom"
                  label={
                    <div className="flex items-center gap-x-4 lg:gap-x-8 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-3">
                      <span>Price range (NGN)</span>
                      <span>
                        <ArrowDownIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <SelectCustomCheckboxGroup
                    items={priceRangeData}
                    selectedItems={selectedPriceRange}
                    setSelectedItems={setSelectedPriceRange}
                    containerClassName=" flex-col"
                  />

                  {/* <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        300k and Above
                      </p>
                      <Checkbox
                        id="free-cancellation"
                        name="free-cancellation"
                        checked={checkedFreeCancellation}
                        setChecked={setCheckedFreeCancellation}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem> */}
                </Dropdown>

                {/* <Dropdown
                  dismissOnClick={false}
                  inline
                  arrowIcon={false}
                  placement="bottom"
                  label={
                    <div className="flex items-center gap-10 lg:gap-20 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-2 pl-2.5">
                      <span>Events</span>
                      <span>
                        <ArrowDownIcon className="text-gray-800" />
                      </span>
                    </div>
                  }
                >
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Live Sport
                      </p>
                      <Checkbox
                        id="free-wifi"
                        name="free-wifi"
                        checked={checkedWifi}
                        setChecked={setCheckedWifi}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">Spa</p>
                      <Checkbox
                        id="air-condition"
                        name="air-condition"
                        checked={checkedAirCondition}
                        setChecked={setCheckedAirCondition}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Night Club
                      </p>
                      <Checkbox
                        id="mealPlus"
                        name="mealPlus"
                        checked={checkedMealPlus}
                        setChecked={setCheckedMealPlus}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Cybercafé
                      </p>
                      <Checkbox
                        id="room-service"
                        name="room-service"
                        checked={checkedRoomServices}
                        setChecked={setCheckedRoomServices}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Pool
                      </p>
                      <Checkbox
                        id="parking"
                        name="parking"
                        checked={checkedParking}
                        setChecked={setCheckedParking}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex items-center w-full gap-4 justify-between">
                      <p className="!text-sm !text-gray-600 font-normal">
                        Game Center
                      </p>
                      <Checkbox
                        id="free-cancellation"
                        name="free-cancellation"
                        checked={checkedFreeCancellation}
                        setChecked={setCheckedFreeCancellation}
                        // label="Resturant"
                      />
                    </div>
                  </DropdownItem>
                </Dropdown> */}
              </div>
              <div className="flex items-center justify-center gap-2 pt-6">
                <Button
                  onClick={() =>
                    fetchPropertySearchHandler(
                      "/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=100&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=b36557cb-a672-4422-8d92-3b0fcbaa8143",
                      "",
                      ""
                    )
                  }
                >
                  Search Rooms
                </Button>
                <Button outline>Explore</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   <header>
    //     <nav className="fixed z-10 w-full dark:bg-gray-900 bg-white md:absolute md:bg-transparent">
    //       <div className="container m-auto px-2 md:px-12 lg:px-7">
    //         <div className="flex flex-wrap items-center justify-between py-4 gap-6 md:py-4 md:gap-0 relative">
    //           <input
    //             type="checkbox"
    //             name="toggle_nav"
    //             id="toggle_nav"
    //             className="hidden peer"
    //           />
    //           <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
    //             <a
    //               href="#"
    //               aria-label="logo"
    //               className="flex space-x-2 items-center"
    //             >
    //               <div aria-hidden="true" className="flex space-x-1">
    //                 <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white" />
    //                 <div className="h-6 w-2 bg-teal-500" />
    //               </div>
    //               <span className="text-2xl font-bold text-gray-900 dark:text-white">
    //                 Arceelus
    //               </span>
    //             </a>
    //             <div className="flex items-center lg:hidden max-h-10">
    //               <label
    //                 role="button"
    //                 htmlFor="toggle_nav"
    //                 aria-label="humburger"
    //                 id="hamburger"
    //                 className="relative  p-6 -mr-6"
    //               >
    //                 <div
    //                   aria-hidden="true"
    //                   id="line"
    //                   className="m-auto h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
    //                 />
    //                 <div
    //                   aria-hidden="true"
    //                   id="line2"
    //                   className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
    //                 />
    //               </label>
    //             </div>
    //           </div>
    //           <div
    //             className="hidden absolute top-full transition translate-y-1 lg:peer-checked:translate-y-0 lg:translate-y-0 left-0
    //           lg:top-0 lg:relative peer-checked:flex w-full
    //           lg:flex lg:flex-row flex-col
    //           flex-wrap justify-end items-center
    //           gap-6 p-6 rounded-xl
    //           bg-white dark:bg-gray-900 lg:gap-0
    //           lg:p-0
    //           lg:bg-transparent lg:w-7/12"
    //           >
    //             <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
    //               <ul
    //                 className="
    //                   tracking-wide
    //                   font-medium
    //                   text-sm flex-col flex
    //                   lg:flex-row
    //                   gap-6 lg:gap-0"
    //               >
    //                 <li>
    //                   <a
    //                     href="#"
    //                     className="block md:px-4 transition hover:text-teal-700"
    //                   >
    //                     <span>Home</span>
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a
    //                     href="#"
    //                     className="block md:px-4 transition hover:text-teal-700"
    //                   >
    //                     <span>Portfolio</span>
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a
    //                     href="#"
    //                     className="block md:px-4 transition hover:text-teal-700"
    //                   >
    //                     <span>Services</span>
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //             <div className="w-full lg:pl-2 space-y-2 border-teal-200 lg:w-auto lg:space-y-0 sm:w-max lg:border-l">
    //               <button
    //                 type="button"
    //                 title="Start buying"
    //                 className="w-full py-3 px-6 text-center rounded-full transition dark:active:bg-teal-900 dark:focus:bg-gray-800 active:bg-teal-200 focus:bg-teal-100 sm:w-max"
    //               >
    //                 <span className="block text-teal-800 dark:text-teal-300 font-semibold text-sm">
    //                   Sign up
    //                 </span>
    //               </button>
    //               <button
    //                 type="button"
    //                 title="Start buying"
    //                 className="w-full py-3 px-6 text-center rounded-full transition bg-teal-300 hover:bg-teal-100 active:bg-teal-400 focus:bg-teal-300 sm:w-max"
    //               >
    //                 <span className="block text-teal-900 font-semibold text-sm">
    //                   Contact Us
    //                 </span>
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </nav>
    //   </header>
    //   <div>
    //     <img
    //       className="absolute w-full object-cover object-left-top h-screen inset-0 top-0 hidden dark:block"
    //       src="images/bg.webp"
    //       alt="image"
    //       loading="lazy"
    //     />
    //     <img
    //       className="absolute w-full object-cover object-top h-screen inset-0 top-0 dark:hidden"
    //       src="images/bg2.webp"
    //       alt="image"
    //       loading="lazy"
    //     />
    //     <div className="relative container m-auto px-6 md:px-12 lg:px-7">
    //       <div className="py-40 lg:py-56 md:w-9/12 lg:w-7/12 dark:lg:w-6/12 ml-auto">
    //         <h1 className="text-gray-900 dark:text-white font-bold text-4xl md:text-6xl lg:text-4xl xl:text-6xl">
    //           Shaping a world with{" "}
    //           <span className="text-teal-600 dark:text-teal-500">
    //             reimagination.
    //           </span>
    //         </h1>
    //         <p className="mt-8 text-gray-700 dark:text-gray-300">
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
    //           incidunt nam itaque sed eius modi error totam sit illum. Voluptas
    //           doloribus asperiores quaerat aperiam. Quidem harum omnis beatae
    //           ipsum soluta!
    //         </p>
    //         <div className="mt-16 space-y-2 lg:space-y-0 md:w-max sm:space-x-6">
    //           <button
    //             type="button"
    //             title="Start buying"
    //             className="w-full py-3 px-6 text-center rounded-full transition bg-teal-300 hover:bg-teal-100 active:bg-teal-400 focus:bg-teal-300 sm:w-max"
    //           >
    //             <span className="block text-teal-900 font-semibold text-sm">
    //               Contact Us
    //             </span>
    //           </button>
    //           <button
    //             type="button"
    //             title="Start buying"
    //             className="w-full py-3 px-6 text-center rounded-full transition border border-gray-200 dark:active:bg-teal-900 dark:focus:bg-gray-800 active:bg-teal-200 focus:bg-teal-100 sm:w-max"
    //           >
    //             <span className="block text-teal-800 dark:text-teal-100 font-semibold text-sm">
    //               About us
    //             </span>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default Hero;
