/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/forms/Button";
import DatePicker from "../components/forms/DatePicker";
import { getData, postData } from "../utils/api";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import ErrorStatus from "../components/forms/ErrorStatus";
// import { fetchProperty } from "../../../Redux/property/propertyThunk";
import Slider from "react-slick";
import { formatNumber } from "../lib/constants";
import CustomSelect from "../components/forms/Select/CustomSelect";
import Cookies from "js-cookie";
// import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
// import ErrorStatus from "../../../components/forms/ErrorStatus";
import EmptyImage from "src/assets/images/EmptyRoom.svg";

import CustomCheckboxGroup from "../components/forms/Checkbox/CustomCheckboxGroup";
import toast from "react-hot-toast";
import SmallSpinner from "../components/Loading/SmallSpinner";
import {
  capitalizeFirstLetter,
  formateCheckDate,
  getPageFromUrl,
} from "../utils/constant";
import { ThumbsCarousel } from "../components/ui/thumb-carousel";
import { MobileThumbsCarousel } from "../components/ui/thumb-carousel-mobile";
import ProductCard from "../components/ui/ProductCard";
import Pagination from "../components/forms/Pagination";
import classNames from "classnames";

// import PropertyApproval from "./PropertyApproval";

const CityOverview = () => {
  const [checked, setChecked] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams(); // Type assertion for id

  const [loadingProperty, setLoadingProperty] = useState(false);
  const [errorProperty, setErrorProperty] = useState(null);
  const [viewPropery, setViewPropery] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [selectedOriginCountry, setSelectedOriginCountry] = useState(null);

  console.log("viewPropery:", viewPropery);

  const fetchUrl = `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=15&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=bdf33d5a-667f-4041-abc1-cda3a6540b57&state_id=${uuid}`;

  const handleViewPropery = async (Url) => {
    setLoadingProperty(true);
    try {
      const response = await getData(Url);
      setViewPropery(response);
      // console.log(response);
    } catch (error) {
      setErrorProperty(error.response.data.message);
    } finally {
      setLoadingProperty(false);
    }
  };

  useEffect(() => {
    handleViewPropery(fetchUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const date = new Date();
  // console.log("date:", date);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(date);
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(date);

  const sliderForHomeRef = useRef(null);
  const sliderNavHomeRef = useRef(null);

  const settingsFor = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: sliderNavHomeRef.current,
  };

  const settingsNav = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: sliderForHomeRef.current,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
  };

  const adultData = [];

  for (let i = 1; i <= 15; i++) {
    adultData.push({
      name: `${i} ${i === 1 ? "Adult" : "Adults"}`,
      adult_count: i,
    });
  }
  const minorData = [];

  for (let i = 0; i <= 15; i++) {
    minorData.push({
      name: `${i} ${i === 0 || i === 1 ? "Minor" : "Minors"}`,
      minor_count: i,
    });
  }

  const [selectedAdult, setSelectedAdult] = useState(adultData[0]);

  const [selectedMinor, setSelectedMinor] = useState(minorData[0]);

  // console.log("uudid:", uuid);

  const [selectedItems, setSelectedItems] = useState([]);

  // function capitalizeFirstLetter(str) {
  //   return str.replace(/^./, (match) => match.toUpperCase());
  // }

  const featureFilter = viewPropery?.data?.features?.map(
    (feature, featureIndex) => ({
      id: `feature${featureIndex * 2}`,
      name: feature.name,
      price: feature.price,
      label: `${capitalizeFirstLetter(feature.name)}`,
    })
  );

  const features = selectedItems?.map((feature) => ({
    name: feature?.name,
    price: feature?.price,
  }));

  const totalFeaturePrice = features?.reduce(
    (acc, current) => acc + current?.price,
    0
  );

  const totalPrice = viewPropery?.data?.price + totalFeaturePrice;

  let discount = viewPropery?.data?.discount; // 5% discount

  let tax_amount = viewPropery?.data?.tax_amount;
  // Calculate the discount amount as a percentage of totalPrice
  const calcDiscount = (discount / 100) * totalPrice;

  const priceAfterDiscount = totalPrice - calcDiscount;

  const calcTaxAmount = (tax_amount / 100) * priceAfterDiscount;

  // console.log("Discount Amount:", calcDiscount);

  // Calculate the final price after applying the discount
  const finalPrice = priceAfterDiscount + calcTaxAmount;

  // console.log("Final Price after Discount:", finalPrice);

  // console.log("Check date:", selectedCheckInDate);

  const checkIn = formateCheckDate(selectedCheckInDate);
  const checkOut = formateCheckDate(selectedCheckOutDate);

  const { currentUser, companyId, switchToCompany } = useSelector(
    (state) => state.auth
  );

  const uniqueId = Cookies.get("bookacrib_uniqueId");

  // console.log("currentUser:", currentUser?.uuid);
  // console.log("uniqueId:", uniqueId);

  // console.log("selectedMinor :", selectedMinor?.minor_count);
  // console.log("checkOut :", checkOut);

  const imagesData = viewPropery?.data?.images?.map((img, index) => ({
    image: `${img}`,
    id: index + 1,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Step 2: Submit Form Data
    const filteredFormData = {
      unique_id: currentUser?.uuid ? currentUser?.uuid : uniqueId,
      property_id: uuid,
      features: features,
      checkin_period: checkIn,
      checkout_period: checkOut,
      adult_count: selectedAdult?.adult_count,
      minor_count: selectedMinor?.minor_count,
      currency_code: "ngn",
    };

    try {
      const result = await postData(
        `/bookacrib-api-routes/v1/properties/store-booking-to-storage`,
        filteredFormData
      );
      console.log("BOOK result: " + result);
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        navigate("/property/checkout");
      }
    } catch (error) {
      console.error("Create Error:", error);
      if (
        (error?.response?.data?.status >= 400 &&
          error?.response?.data?.status <= 499 &&
          error?.response?.data?.errors) ||
        (error?.response?.data?.status_code >= 400 &&
          error?.response?.data?.status_code <= 499 &&
          error?.response?.data?.errors)
      ) {
        const errorMessages = Object.values(error?.response?.data?.errors)
          .flat()
          .join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.response?.data?.message, { duration: 6000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePaginate = (url) => {
    if (url) {
      // fetchPermisssion(url);
      // console.log("URL::", getPageFromUrl(url));
      const newPageUrl = `${fetchUrl}&page=${getPageFromUrl(url)}`;
      handleViewPropery(newPageUrl);
    }
  };
  const IN_APP_PROPERTY = viewPropery?.data?.filter(
    (data) => data?.create_source !== "SEEDER"
  );
  // console.log("IN_APP_PROPERTY", IN_APP_PROPERTY[0]?.state?.name);
  return (
    <>
      <div className="pt-10 lg:pt-20 px-4 lg:px-20 2xl:px-40">
        {IN_APP_PROPERTY?.length !== 0 && (
          <h1
            className={classNames(
              "text-center font-display text-2xl lg:text-4xl font-bold text-gray-700 dark:text-white pb-10",
              { hidden: loadingProperty }
            )}
          >
            Properties In -{" "}
            {IN_APP_PROPERTY?.length !== 0
              ? IN_APP_PROPERTY?.[0]?.state?.name
              : ""}
          </h1>
        )}
        {loadingProperty ? (
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
                        Sorry, we couldn&apos;t find this city properties you
                        were looking for. We suggest returning to the homepage.
                      </p>

                      <Button
                        onClick={() => {
                          navigate("/");
                          // setSearchQuery("");
                          // fetchPropertySearchHandler(
                          //   `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&status=approved&limit=20&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&country_id=${countries?.uuid}`,
                          //   "",
                          //   ""
                          // );
                        }}
                      >
                        Back to Homepage
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              // <TopSelling data={IN_APP_PROPERTY} />
              <>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 ">
                  {IN_APP_PROPERTY?.map((item, index) => (
                    <ProductCard
                      key={index}
                      image={item?.images[0]}
                      title={item?.name}
                      discount={item?.discount}
                      category={item?.address}
                      price={item?.price}
                      cate={item?.category?.name}
                      property_id={item}
                    />
                  ))}
                </div>

                <div className="py-5">
                  {IN_APP_PROPERTY?.length !== 0 && (
                    <Pagination
                      meta={viewPropery?.meta}
                      handlePaginate={handlePaginate}
                    />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CityOverview;
