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
import { FetchLocations } from "../../Hooks/useFetchLocation";
import SelectCustomCheckboxState from "../forms/Checkbox/SelectCustomCheckboxState";
import SmallSpinner from "../Loading/SmallSpinner";
import TopSelling from "./TopSelling";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import EmptyImage from "src/assets/images/EmptyRoom.svg";
import Slider1 from "src/assets/images/slider-1.png";
import Slider2 from "src/assets/images/slider-2.png";
import Slider3 from "src/assets/images/slider-3.png";
import Slider4 from "src/assets/images/slider-4.png";

const NewHero = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  // console.log("selectedPriceRange:", selectedPriceRange);

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

  // console.log(roomtypes);
  const fetchRoomTypeHandler = (url) => {
    dispatch(fetchRoomTypes(url));
  };

  const roomTypeFilter = roomtypes?.data?.map((roomType) => ({
    id: `${roomType?.uuid}`,
    name: roomType.name,
    label: `${capitalizeFirstLetter(roomType.name)}`,
  }));
  // console.log("roomType", selectedRoomType);

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
  const {
    countries,
    states,
    // cities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    // selectedCities,
    // setSelectedCities,
    // loading,
    // error,
  } = FetchLocations();

  // console.log("selectedState: ", selectedState[0]?.uuid);
  // console.log("selectedPriceRange: ", selectedPriceRange);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [errorInvoice, setErrorSearch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // console.log("search query: ", searchQuery);

  // console.log("error query Invoice: ", errorInvoice);
  // console.log("propertys:", searchData);

  const IN_APP_PROPERTY = searchData?.filter(
    (data) => data?.create_source !== "SEEDER"
  );
  // console.log(
  //   "first invoice: ",
  //   searchData?.length
  //   // "data:",
  //   // Array.isArray(searchData?.data),
  //   // "first invoice: ",
  //   // Array.isArray(searchData)
  // );

  // const fetchPropertySearchHandler = async (
  //   url,
  //   search,
  //   room_type,
  //   category_id,
  //   min_price,
  //   max_price,
  //   state_id
  // ) => {
  //   let fetchUrl = url;
  //   if (search) {
  //     fetchUrl += `&q=${search}`;
  //   } else if (room_type) {
  //     fetchUrl += `&room_type_id=${room_type}`;
  //   } else if (category_id) {
  //     fetchUrl += `&category_id=${category_id}`;
  //   } else if (min_price) {
  //     fetchUrl += `&min_price=${min_price}`;
  //   } else if (max_price) {
  //     fetchUrl += `&max_price=${max_price}`;
  //   } else if (state_id) {
  //     fetchUrl += `&state_id=${state_id}`;
  //   }

  //   setLoadingSearch(true);
  //   try {
  //     const response = await getData(fetchUrl);
  //     setSearchData(response?.data);
  //   } catch (error) {
  //     setErrorSearch(error.response.data.message);
  //   }
  //   setLoadingSearch(false);
  // };

  const fetchPropertySearchHandler = async (
    url,
    search,
    room_type,
    category_id,
    min_price,
    max_price,
    state_id
  ) => {
    // Create an object to store all parameters
    const params = {
      ...(search && { q: search }), // Include `q` only if `search` is provided
      ...(room_type && { room_type_id: room_type }),
      ...(category_id && { category_id }),
      ...(min_price && { min_price }),
      ...(max_price && { max_price }),
      ...(state_id && { state_id }),
    };

    // Construct the query string dynamically
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Encode each key-value pair
      .join("&"); // Join the pairs with "&"

    // Append the query string to the base URL
    const fetchUrl = queryString ? `${url}&${queryString}` : url;

    setLoadingSearch(true);
    try {
      const response = await getData(fetchUrl);
      if (response?.status >= 200 && response?.status <= 299) {
        setSearchData(response?.data);
        setSelectedRoomType([]);
        // setSelectedCategory([]);
        setSelectedPriceRange([]);
        // setSelectedState([]);
        // setSearchQuery("");
      }
    } catch (error) {
      setErrorSearch(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    fetchPropertySearchHandler(
      `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=20&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=${countries?.uuid}`,
      "",
      "",
      "",
      "",
      "",
      ""
    );
  }, [countries]);

  const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
    },

    // Navigation
    navigation: {
      nextEl: ".h1n",
      prevEl: ".h1p",
    },

    // Pagination
    pagination: {
      el: ".slider-pagination",
      clickable: true,
    },
  };
  // console.log("selectedState: ", selectedState);
  return (
    <>
      <div className="">
        <div className=" relative">
          <Swiper {...swiperOptions}>
            <SwiperSlide>
              <div className=" relativew">
                <img
                  src={Slider1}
                  className=" rounded-lg min-h-[720px] max-h-[800px] object-cover lg:object-cover  w-full "
                  alt=""
                />
                <div className=" bg-black/40 absolute inset-0"></div>
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-400  ">
                <div className="lg:w-full lg:min-w-[100%] text-center mx-autoo px-4 md:px-0">
                  <h1 className="text-white dark:text-gray-200 font-bold text-2xl md:text-4xl xl:text-4xl w-full">
                    Get a Cheap place to relax with
                    <span className="text-gray-100 text-primary-80000">
                      {" "}
                      premium services.
                    </span>
                  </h1>
                  <p className="mt-2 text-gray-300 text-sm md:text-base dark:text-gray-300">
                    Search low prices on hotels, homes and much more...
                  </p>
                  <div className=" p-4 lg:p-8 bg-white rounded-lg mt-6 lg:min-w-[900px]">
                    <div className=" flex-1 w-full min-w-[300px] pb-4">
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
                            placeholder="Enter Location or Search"
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
                                fetchPropertySearchHandler(
                                  `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=20&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=${countries?.uuid}`
                                );
                                setSearchQuery("");
                                // setSelectedRoomType([]);
                                // setSelectedCategory([]);
                                // setSelectedPriceRange([]);
                                // setSelectedState([]);
                              }}
                              className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
                            >
                              <XIconSmall />
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className=" flex items-center w-full gap-2.5 lg:flex-row lg:flex-wrap flex-col">
                      <Dropdown
                        dismissOnClick={true}
                        inline
                        arrowIcon={false}
                        placement="bottom"
                        label={
                          <div className="flex flex-1 w-full lg:w-1/3  justify-between items-center gap-10 lg:gap-20 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-2 pl-2.5">
                            <span>
                              {selectedState === null ||
                              selectedState?.length === 0
                                ? "Location"
                                : selectedState[0]?.name}
                            </span>
                            <span>
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
                                className="lucide lucide-map-pin stroke-[1] w-5 h-5 block text-gray-800"
                              >
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx={12} cy={10} r={3} />
                              </svg>
                            </span>
                          </div>
                        }
                      >
                        <SelectCustomCheckboxState
                          items={states?.data?.states}
                          selectedItems={selectedState}
                          setSelectedItems={setSelectedState}
                          containerClassName=" flex-col"
                        />
                      </Dropdown>

                      <Dropdown
                        dismissOnClick={true}
                        inline
                        arrowIcon={false}
                        placement="bottom"
                        label={
                          <div className="flex flex-1 w-full  justify-between items-center gap-x-4 lg:gap-x-8 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-2.5 pr-3">
                            <span className="capitalize">
                              {selectedRoomType?.length === 0
                                ? "Room Type"
                                : selectedRoomType[0]?.name}
                            </span>
                            <span>
                              <FilterIcon className="text-gray-600 w-4 h-4 " />
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
                        dismissOnClick={true}
                        inline
                        arrowIcon={false}
                        placement="bottom"
                        label={
                          <div className="flex  flex-1 w-full justify-between items-center gap-x-4 lg:gap-x-8 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-3">
                            <span className=" capitalize">
                              {selectedPriceRange?.length === 0
                                ? "Price range (NGN)"
                                : selectedPriceRange[0]?.name}
                            </span>
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
                      </Dropdown>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-6">
                      <Button
                        className="w-full justify-center lg:w-max"
                        leftIcon={
                          loadingSearch ? (
                            <SmallSpinner />
                          ) : (
                            <SearchIcon className="size-5" />
                          )
                        }
                        onClick={() =>
                          fetchPropertySearchHandler(
                            `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=20&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=${countries?.uuid}`,
                            searchQuery,
                            selectedRoomType[0]?.id,
                            selectedCategory[0]?.id,
                            selectedPriceRange[0]?.min_price,
                            selectedPriceRange[0]?.max_price,
                            selectedState === null ? "" : selectedState[0]?.uuid
                          )
                        }
                      >
                        Search Rooms
                      </Button>
                      <div className=" hidden lg:block">
                        <Button outline>Explore</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=" relativew">
                <img
                  src={Slider2}
                  className=" rounded-lg min-h-[720px] max-h-[800px] object-cover lg:object-cover  w-full "
                  alt=""
                />
                <div className=" bg-black/40 absolute inset-0"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=" relativew">
                <img
                  src={Slider4}
                  className=" rounded-lg min-h-[720px] max-h-[800px] object-cover lg:object-cover  w-full "
                  alt=""
                />
                <div className=" bg-black/40 absolute inset-0"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=" relativew">
                <img
                  src={Slider3}
                  className=" rounded-lg min-h-[720px] max-h-[800px] object-cover lg:object-cover  w-full "
                  alt=""
                />
                <div className=" bg-black/40 absolute inset-0"></div>
              </div>
            </SwiperSlide>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-400  z-30">
              <div className="lg:w-full lg:min-w-[100%] text-center mx-autoo px-4 md:px-0">
                <h1 className="text-white dark:text-gray-200 font-bold text-2xl md:text-4xl xl:text-4xl w-full">
                  Get a Cheap place to relax with
                  <span className="text-gray-100 text-primary-80000">
                    {" "}
                    premium services.
                  </span>
                </h1>
                <p className="mt-2 text-gray-300 text-sm md:text-base dark:text-gray-300">
                  Search low prices on hotels, homes and much more...
                </p>
                <div className=" p-4 lg:p-8 bg-white rounded-lg mt-6 lg:min-w-[900px]">
                  <div className=" flex-1 w-full min-w-[300px] pb-4">
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
                          placeholder="Enter Location or Search"
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
                              fetchPropertySearchHandler(
                                `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=20&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=${countries?.uuid}`
                              );
                              setSearchQuery("");
                              // setSelectedRoomType([]);
                              // setSelectedCategory([]);
                              // setSelectedPriceRange([]);
                              // setSelectedState([]);
                            }}
                            className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
                          >
                            <XIconSmall />
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className=" flex items-center w-full gap-2.5 lg:flex-row lg:flex-wrap flex-col">
                    <Dropdown
                      dismissOnClick={true}
                      inline
                      arrowIcon={false}
                      placement="bottom"
                      label={
                        <div className="flex flex-1 w-full lg:w-1/3  justify-between items-center gap-10 lg:gap-20 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-2 pl-2.5">
                          <span>
                            {selectedState === null ||
                            selectedState?.length === 0
                              ? "Location"
                              : selectedState[0]?.name}
                          </span>
                          <span>
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
                              className="lucide lucide-map-pin stroke-[1] w-5 h-5 block text-gray-800"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx={12} cy={10} r={3} />
                            </svg>
                          </span>
                        </div>
                      }
                    >
                      <SelectCustomCheckboxState
                        items={states?.data?.states}
                        selectedItems={selectedState}
                        setSelectedItems={setSelectedState}
                        containerClassName=" flex-col"
                      />
                    </Dropdown>

                    <Dropdown
                      dismissOnClick={true}
                      inline
                      arrowIcon={false}
                      placement="bottom"
                      label={
                        <div className="flex flex-1 w-full  justify-between items-center gap-x-4 lg:gap-x-8 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-2.5 pr-3">
                          <span className="capitalize">
                            {selectedRoomType?.length === 0
                              ? "Room Type"
                              : selectedRoomType[0]?.name}
                          </span>
                          <span>
                            <FilterIcon className="text-gray-600 w-4 h-4 " />
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
                      dismissOnClick={true}
                      inline
                      arrowIcon={false}
                      placement="bottom"
                      label={
                        <div className="flex  flex-1 w-full justify-between items-center gap-x-4 lg:gap-x-8 bg-white border border-gray-300 text-gray-700 font-medium font-Inter text-sm rounded-md py-3 px-3">
                          <span className=" capitalize">
                            {selectedPriceRange?.length === 0
                              ? "Price range (NGN)"
                              : selectedPriceRange[0]?.name}
                          </span>
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
                    </Dropdown>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-6">
                    <Button
                      className="w-full justify-center lg:w-max"
                      leftIcon={
                        loadingSearch ? (
                          <SmallSpinner />
                        ) : (
                          <SearchIcon className="size-5" />
                        )
                      }
                      onClick={() =>
                        fetchPropertySearchHandler(
                          `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=20&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=${countries?.uuid}`,
                          searchQuery,
                          selectedRoomType[0]?.id,
                          selectedCategory[0]?.id,
                          selectedPriceRange[0]?.min_price,
                          selectedPriceRange[0]?.max_price,
                          selectedState === null ? "" : selectedState[0]?.uuid
                        )
                      }
                    >
                      Search Rooms
                    </Button>
                    <div className=" hidden lg:block">
                      <Button outline>Explore</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <SwiperSlide>
            <div className="tp-slide-item relative rounded">
              <div className="tp-slide-item__content absolute left-5 bottom-10 md:bottom-24 md:left-12 lg:bottom-20  lg:left-14 xl:bottom-32 2xl:bottom-36  3xl:bottom-44 3xl:left-20 ">
                <h4 className="tp-slide-item__sub-title  text-primary-800  lg:text-lg ">
                  Starting from N300
                </h4>
                <h3 className="tp-slide-item__title text-3xl  md:text-5xl 2xl:text-6xl 3xl:text-7xl  font-bold max-w-[290px] md:max-w-[450px] 2xl:max-w-xl 3xl:max-w-2xl 2xl:leading-[70px] 3xl:leading-[86px] md:leading-[56px] mb-25">
                  Upgrade your{" "}
                  <i className=" text-primary-800 relative">Kitchen</i> Utils
                </h3>
                <Link
                  className="tp-slide-item__slide-btn tp-btn block pt-4"
                  to="/shop"
                >
                  <Button rounded size="md">
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="tp-slide-item__img rounded-lg">
                <img
                  src={Slider2}
                  className=" rounded-lg min-h-[250px] w-auto "
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tp-slide-item relative rounded">
              <div className="tp-slide-item__content absolute left-5 bottom-10 md:bottom-24 md:left-12 lg:bottom-20  lg:left-14 xl:bottom-32 2xl:bottom-36  3xl:bottom-44 3xl:left-20 ">
                <h4 className="tp-slide-item__sub-title  text-primary-800  lg:text-lg ">
                  Accessories
                </h4>
                <h3 className="tp-slide-item__title text-3xl  md:text-5xl 2xl:text-6xl 3xl:text-7xl  font-bold max-w-[290px] md:max-w-[450px] 2xl:max-w-xl 3xl:max-w-2xl 2xl:leading-[70px] 3xl:leading-[86px] md:leading-[56px] mb-25">
                  Up To{" "}
                  <i className=" text-primary-800 relative">45% Off &arr;</i>
                  latest Creations
                </h3>
                <Link
                  className="tp-slide-item__slide-btn tp-btn block pt-4"
                  to="/shop"
                >
                  <Button rounded size="md">
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="tp-slide-item__img rounded-lg">
                <img
                  src={Slider3}
                  className=" rounded-lg min-h-[250px] w-auto "
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide> */}
          </Swiper>
        </div>
      </div>

      <div>
        {loadingSearch ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pt-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                role="status"
                className="max-w-sm p-4 border border-gray-200 rounded shadow  md:p-6 dark:border-gray-700"
              >
                <div className="">
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                </div>

                <div className="h-2.5 fadeloader bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-2 fadeloader2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2  bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 fadeloader2 bg-gray-200 rounded-full dark:bg-gray-700" />
                <div className="flex items-center mt-4">
                  <svg
                    className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700 animate-pulse"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
                    <div className="w-48 h-2 fadeloader bg-gray-200 rounded-full dark:bg-gray-700" />
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
          </div>
        ) : (
          <>
            {IN_APP_PROPERTY?.length === 0 ? (
              // <div
              //   role="status"
              //   className="max-w-sm p-4 border border-gray-200 rounded shadow  md:p-6 dark:border-gray-700"
              // >
              //   <div className="">
              //     <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
              //       <svg
              //         className="w-10 h-10 text-gray-200 dark:text-gray-600"
              //         aria-hidden="true"
              //         xmlns="http://www.w3.org/2000/svg"
              //         fill="currentColor"
              //         viewBox="0 0 16 20"
              //       >
              //         <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              //         <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              //       </svg>
              //     </div>
              //   </div>

              //   <div className="h-2.5 fadeloader bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              //   <div className="h-2 fadeloader2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              //   <div className="h-2  bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              //   <div className="h-2 fadeloader2 bg-gray-200 rounded-full dark:bg-gray-700" />
              //   <div className="flex items-center mt-4">
              //     <svg
              //       className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700 animate-pulse"
              //       aria-hidden="true"
              //       xmlns="http://www.w3.org/2000/svg"
              //       fill="currentColor"
              //       viewBox="0 0 20 20"
              //     >
              //       <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              //     </svg>
              //     <div>
              //       <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
              //       <div className="w-48 h-2 fadeloader bg-gray-200 rounded-full dark:bg-gray-700" />
              //     </div>
              //   </div>
              //   <span className="sr-only">Loading...</span>
              // </div>
              <div className="  w-full h-full flex flex-col items-center justify-center space-y-6">
                <section className="bg-white dark:bg-gray-900">
                  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                      <img
                        src={EmptyImage}
                        alt="not found image"
                        className=" max-w-xs mx-auto"
                      />
                      {/* <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                        404
                      </h1> */}
                      <p className="mb-4 text-xl tracking-tight font-bold text-gray-900 md:text-3xl dark:text-white">
                        Property Not Found
                      </p>
                      <p className="mb-4 text-sm lg:text-lg font-light text-gray-500 dark:text-gray-400 max-w-xl">
                        Sorry, we couldn&apos;t find the property you were
                        looking for. We suggest returning to the homepage.
                      </p>

                      <Button
                        onClick={() => {
                          setSearchQuery("");
                          fetchPropertySearchHandler(
                            `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=20&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=${countries?.uuid}`,
                            "",
                            ""
                          );
                        }}
                      >
                        Back to Homepage
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <TopSelling data={IN_APP_PROPERTY} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NewHero;
