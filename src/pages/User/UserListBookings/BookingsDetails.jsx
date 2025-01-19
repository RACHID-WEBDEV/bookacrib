/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
// import { Button } from "../components/forms/Button";
// import DatePicker from "../components/forms/DatePicker";
import { getData, postData } from "../../../utils/api";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorStatus from "../../../components/forms/ErrorStatus";
// import { fetchBooking } from "../../../../../../../../../Redux/Booking/BookingThunk";
import Slider from "react-slick";
import {
  formatDateOnly,
  formatDateTime,
  formatNumber,
} from "../../../lib/constants";
import CustomSelect from "../../../components/forms/Select/CustomSelect";
import Cookies from "js-cookie";
// import LoadingSpinner from "../../../../../../../../../components/Loading/LoadingSpinner";
// import ErrorStatus from "../../../../../../../../../components/forms/ErrorStatus";

import CustomCheckboxGroup from "../../../components/forms/Checkbox/CustomCheckboxGroup";
import toast from "react-hot-toast";
import SmallSpinner from "../../../components/Loading/SmallSpinner";
import { formateCheckDate } from "../../../utils/constant";
import { ThumbsCarousel } from "../../../components/ui/thumb-carousel";
import { MobileThumbsCarousel } from "../../../components/ui/thumb-carousel-mobile";
import DatePicker from "../../../components/forms/DatePicker";
import {
  InvoiceIcon,
  PropertyForRentIcon,
  ActivateUserIcon,
} from "../../../assets/SvgIcons";
import { Badge } from "../../../components/forms/Badge";

// import BookingApproval from "./BookingApproval";

const BookingsDetails = () => {
  const [checked, setChecked] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams(); // Type assertion for id
  const [viewReceipt, setViewReceipt] = useState(false);
  const componentRef = useRef();

  const [loadingBooking, setLoadingBooking] = useState(false);
  const [errorBooking, setErrorBooking] = useState(null);
  const [viewBooking, setViewBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [selectedOriginCountry, setSelectedOriginCountry] = useState(null);

  // console.log("viewBooking:", viewBooking);

  const bookData = viewBooking?.data?.cached_booking_data;
  // console.log("bookData:", bookData);

  const handleViewBookings = async () => {
    setLoadingBooking(true);
    try {
      const response = await getData(
        `/bookacrib-api-routes/v1/properties/view-my-single-booking?id=${uuid}&with[]=Booking&with[]=property`
      );
      setViewBooking(response);
      // console.log(response);
    } catch (error) {
      setErrorBooking(error.response.data.message);
    } finally {
      setLoadingBooking(false);
    }
  };

  useEffect(() => {
    handleViewBookings();
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

  function capitalizeFirstLetter(str) {
    return str.replace(/^./, (match) => match.toUpperCase());
  }

  const featureFilter = viewBooking?.data?.features?.map(
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

  const totalPrice = viewBooking?.data?.price + totalFeaturePrice;

  let discount = viewBooking?.data?.discount; // 5% discount

  let tax_amount = viewBooking?.data?.tax_amount;
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

  console.log("currentUser:", currentUser?.uuid);
  console.log("uniqueId:", uniqueId);

  // console.log("selectedMinor :", selectedMinor?.minor_count);
  // console.log("checkOut :", checkOut);

  const imagesData = bookData?.property?.images?.map((img, index) => ({
    image: `${img}`,
    id: index + 1,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Step 2: Submit Form Data
    const filteredFormData = {
      unique_id: currentUser?.uuid ? currentUser?.uuid : uniqueId,
      Booking_id: uuid,
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
        navigate("/Booking/checkout");
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
  return (
    <>
      {loadingBooking ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : errorBooking ? (
        <ErrorStatus
          message={JSON.stringify(errorBooking?.message)}
          statusCode={errorBooking?.status_code || errorBooking?.status}
          link="/"
          reload
        />
      ) : (
        <section className="bg- xl:pb-[100px] pb-[70px] ">
          <div className=" flex flex-wrap items-center justify-between pb-3">
            <Link to="/user/transactions/list-bookings">
              <div className="text-sm font-medium group-[.mode--light]:text-gray-800 flex items-center pb-2">
                <div className=" rotate-180">
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
                    className="lucide lucide-arrow-right stroke-[1.3] w-3.5 h-3.5 sm:w-5 sm:h-5 mx-1 sm:mx-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
                Go Back
              </div>
            </Link>

            {/* {viewReceipt && ( */}
            <ReactToPrint
              trigger={() => (
                <button className="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary-600 focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary-600 border-primary-600 text-white dark:border-primary-600 text-xs">
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
                    className="lucide lucide-printer stroke-[1.3] w-4 h-4 mr-2"
                  >
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect width={12} height={8} x={6} y={14} />
                  </svg>{" "}
                  Print / Download Receipt
                </button>
              )}
              content={() => componentRef.current}
            />
            {/* )} */}
          </div>
          <div className=" flex flex-wrap items-center justify-between pb-3">
            <div className="text-lg font-bold group-[.mode--light]:text-gray-800 flex items-center pb-2">
              Booking
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
                className="lucide lucide-arrow-right stroke-[1.3] w-3.5 h-3.5 sm:w-5 sm:h-5 mx-1 sm:mx-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <div className="text-sm sm:text-lg">
                {bookData?.reference_code}
              </div>
            </div>
          </div>

          {/* <div className=" flex items-center justify-between flex-wrap gap-4 pb-4">
            <p className=" lg:text-2xl font-bold text-gray-900">
              Book Booking
            </p>
            <div className="">
              <Button
              // onClick={() => setShowModal(true)}
              >
                Approved Booking
              </Button>
            </div>
          </div> */}
          {/* <div className=" p-4 bg-gray-100 mb-4 rounded">
            <p className=" text font-medium text-gray-900">
              Book Booking Details
              
            </p>
          </div> */}
          <div className="flex flex-wrap justify-between items-center mx-auto 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px]">
            <div className="flex flex-wrap w-full mb-[-24px]">
              <div className="lg:w-[60%] w-full  mb-[24px] ">
                <div className="lh-room-details">
                  <div className="lg:block hidden">
                    <ThumbsCarousel
                      gallery={imagesData}
                      // video={video}
                      hideThumbs={
                        imagesData?.length <= 1
                        // previewImages.length && video?.length
                        //   ? false
                        //   : previewImages.length <= 1
                      }
                    />
                  </div>
                  <div className="lg:hidden">
                    <MobileThumbsCarousel
                      gallery={imagesData}
                      // video={video}
                      hideThumbs={
                        imagesData?.length <= 1
                        // previewImages.length && video?.length
                        //   ? false
                        //   : previewImages.length <= 1
                      }
                    />
                  </div>
                  {/* <div className="lh-main-room w-full">
                    <Slider {...settingsFor} ref={sliderForHomeRef}>
                      {viewBooking?.data?.images?.map((image, imagesIndex) => (
                        <div key={imagesIndex} className=" rounded-lg">
                          <img
                            src={image}
                            alt="Slide"
                            className=" rounded-lg lg:min-h-[500px] lg:w-full max-h-[500px]"
                          />
                        </div>
                      ))}
                    </Slider>
                    <div className=" w-full pt-4">
                      <p className=" text-gray-800 text-sm font-semibold pb-2">
                        Booking Images
                      </p>
                    </div>
                    <Slider {...settingsNav} ref={sliderNavHomeRef}>
                      {viewBooking?.data?.images?.map(
                        (imageslide, imagesSlideIndex) => (
                          <div
                            key={imagesSlideIndex}
                            className="pr-2 min-h-[76px] min-w-[76px]"
                          >
                            <img
                              src={imageslide}
                              alt="Slide "
                              className=" rounded-lg min-h-[76px] min-w-[76px] lg:max-h-[150px] lg:w-full"
                            />
                          </div>
                        )
                      )}
                    </Slider>
                  </div> */}
                  <div className=" px-4 pt-1 pb-4 shadow lg:w-[83%]">
                    <h4 className="lh-room-details-contain-heading text-gray-800 text-lg lg:text-xl pt-[10px] font-bold ">
                      {bookData?.property?.name}
                    </h4>
                    <p className=" text-gray-600 text-sm ">
                      {viewBooking?.data?.property?.address}
                    </p>
                  </div>
                  <div className="lh-room-details-contain pt-0">
                    <div className="flex flex-col p-5 box mt-6">
                      <div className="flex flex-col gap-5">
                        {bookData?.actual_features?.length > 0 && (
                          <div className="border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400 relative mt-3">
                            <div className="absolute left-0 px-3 ml-4 -mt-2 text-xs uppercase bg-white text-slate-500 dark:bg-darkmode-600">
                              <div className="-mt-px"> Booked Amenities</div>
                            </div>
                            <div className="p-5 mt-2.5 flex flex-col gap-5 text-sm text-gray-700">
                              <ul className=" grid lg:grid-cols-3 gap-2">
                                {bookData?.actual_features?.map(
                                  (feature, indexFeature) => (
                                    <li
                                      key={indexFeature}
                                      className="text-sm flex gap-1 text-gray-600 bg-white rounded  border border-dotted items-center justify-between px-2.5 py-3 capitalize"
                                    >
                                      <span className=" font-normal">
                                        {feature?.name}
                                      </span>
                                      <span className=" ">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={20}
                                          height={20}
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          className="lucide lucide-clipboard w-4 h-4 stroke-[1.3] text-slate-500"
                                        >
                                          <path
                                            d="M4.26 11.02v4.97c0 1.82 0 1.82 1.72 2.98l4.73 2.73c.71.41 1.87.41 2.58 0l4.73-2.73c1.72-1.16 1.72-1.16 1.72-2.98v-4.97c0-1.82 0-1.82-1.72-2.98l-4.73-2.73c-.71-.41-1.87-.41-2.58 0L5.98 8.04C4.26 9.2 4.26 9.2 4.26 11.02Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M17.5 7.63V5c0-2-1-3-3-3h-5c-2 0-3 1-3 3v2.56M12.63 10.99l.57.89c.09.14.29.28.44.32l1.02.26c.63.16.8.7.39 1.2l-.67.81c-.1.13-.18.36-.17.52l.06 1.05c.04.65-.42.98-1.02.74l-.98-.39a.863.863 0 0 0-.55 0l-.98.39c-.6.24-1.06-.1-1.02-.74l.06-1.05c.01-.16-.07-.4-.17-.52l-.67-.81c-.41-.5-.24-1.04.39-1.2l1.02-.26c.16-.04.36-.19.44-.32l.57-.89c.36-.54.92-.54 1.27 0Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}

                        <div className="border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400 relative mt-3">
                          <div className="absolute left-0 px-3 ml-4 -mt-2 text-xs uppercase bg-white text-slate-500 dark:bg-darkmode-600">
                            <div className="-mt-px">Description</div>
                          </div>
                          <div className="p-5 mt-2.5 flex flex-col gap-5 text-sm text-gray-700">
                            <div className="flex items-center">
                              <div className="w-6">
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
                                  className="lucide lucide-clock w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                                >
                                  <circle cx={12} cy={12} r={10} />
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                  <path d="M12 17h.01" />
                                </svg>
                              </div>

                              <div className="">
                                <div className="">
                                  {bookData?.property?.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className=" mt-[24px] bg-gray-100 p-4 rounded">
                      <h4 className="text- text-gray-800 font-medium border-b  border-[#e3e1e1] pb-[10px]">
                        Booked Amenities
                      </h4>
                      <div className="flex flex-wrap">
                        <div className=" w-full pt-[15px] lg:pr-[12px] pr-[0]">
                          <ul className=" grid lg:grid-cols-3 gap-2">
                            {bookData?.actual_features?.map(
                              (feature, indexFeature) => (
                                <li
                                  key={indexFeature}
                                  className="text-sm flex gap-1 text-gray-700 bg-white rounded  items-center justify-between px-2.5 py-3 capitalize"
                                >
                                  {feature?.name}
                                  <span className=" ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={20}
                                      height={20}
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M4.26 11.02v4.97c0 1.82 0 1.82 1.72 2.98l4.73 2.73c.71.41 1.87.41 2.58 0l4.73-2.73c1.72-1.16 1.72-1.16 1.72-2.98v-4.97c0-1.82 0-1.82-1.72-2.98l-4.73-2.73c-.71-.41-1.87-.41-2.58 0L5.98 8.04C4.26 9.2 4.26 9.2 4.26 11.02Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M17.5 7.63V5c0-2-1-3-3-3h-5c-2 0-3 1-3 3v2.56M12.63 10.99l.57.89c.09.14.29.28.44.32l1.02.26c.63.16.8.7.39 1.2l-.67.81c-.1.13-.18.36-.17.52l.06 1.05c.04.65-.42.98-1.02.74l-.98-.39a.863.863 0 0 0-.55 0l-.98.39c-.6.24-1.06-.1-1.02-.74l.06-1.05c.01-.16-.07-.4-.17-.52l-.67-.81c-.41-.5-.24-1.04.39-1.2l1.02-.26c.16-.04.36-.19.44-.32l.57-.89c.36-.54.92-.54 1.27 0Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className=" mt-[24px] bg-gray-100 p-4 rounded">
                      <h4 className="text- text-gray-800 font-medium border-b  border-[#e3e1e1] pb-[10px]">
                        Description
                      </h4>
                      <div className="flex flex-wrap">
                        <p className="pt-2 text-sm text-gray-600">
                          {bookData?.property?.description}
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="lg:w-[40%] w-full lg:px-[12px] mb-[24px] ">
                <div className=" sticky top-[80px]">
                  <div className="flex flex-col p-5 box box--stacked">
                    <div className="flex flex-col gap-5">
                      <div className="border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400 relative mt-3">
                        <div className="absolute left-0 px-3 ml-4 -mt-2 text-xs uppercase bg-white text-slate-500 dark:bg-darkmode-600">
                          <div className="-mt-px">Transaction Details</div>
                        </div>
                        <div className="p-5 mt-2.5 flex flex-col gap-5 text-sm text-gray-700">
                          <div className="flex items-center">
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
                              className="lucide lucide-clipboard w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                            >
                              <rect
                                width={8}
                                height={4}
                                x={8}
                                y={2}
                                rx={1}
                                ry={1}
                              />
                              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                            </svg>
                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">Created:</div>
                              {formatDateTime(viewBooking?.data?.created_at)}
                            </div>
                          </div>
                          <div className="flex items-center">
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
                              className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500 "
                            >
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={4}
                                rx={2}
                                ry={2}
                              />
                              <line x1={16} x2={16} y1={2} y2={6} />
                              <line x1={8} x2={8} y1={2} y2={6} />
                              <line x1={3} x2={21} y1={10} y2={10} />
                            </svg>
                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">Check In:</div>
                              {formatDateOnly(bookData?.checkin_period)}
                            </div>
                          </div>
                          <div className="flex items-center">
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
                              className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                            >
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={4}
                                rx={2}
                                ry={2}
                              />
                              <line x1={16} x2={16} y1={2} y2={6} />
                              <line x1={8} x2={8} y1={2} y2={6} />
                              <line x1={3} x2={21} y1={10} y2={10} />
                            </svg>

                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">Check Out:</div>
                              {formatDateOnly(bookData?.checkout_period)}
                            </div>
                          </div>
                          <div className="flex items-center">
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
                              className="l w-4 h-4 stroke-[1.3] text-slate-500 mr-2.5"
                            >
                              <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                              <line x1={16} x2={16} y1={2} y2={6} />
                              <line x1={8} x2={8} y1={2} y2={6} />
                              <line x1={3} x2={21} y1={10} y2={10} />
                              <path d="m16 20 2 2 4-4" />
                            </svg>

                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">
                                Booking Days:
                              </div>
                              {bookData?.booking_days} Day
                              {bookData?.booking_days > 1 && "s"}
                            </div>
                          </div>
                          <div className="flex items-center">
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
                              className="lucide lucide-clock w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1 ">
                              <div className="sm:mr-auto w-54">
                                Transaction Status:
                              </div>
                              <Badge
                                //   rounded
                                className=" capitalize"
                                //  leftIcon={item?.is_active === true && <DotIcon />}
                                color={
                                  viewBooking?.data?.payment_status === "paid"
                                    ? "success"
                                    : "warning"
                                }
                                text={viewBooking?.data?.payment_status}
                              ></Badge>
                              {/* <div className="flex items-center text-xs font-medium rounded-md text-success bg-success/10 border border-success/10 px-1.5 py-px mr-auto sm:mr-0">
                                  <span className="-mt-px">Failed</span>
                                </div> */}
                            </div>
                          </div>

                          <div className="flex items-center">
                            {/* <InvoiceIcon className="lucide lucide-clipboard w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500" /> */}
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
                              className="lucide lucide-clipboard w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1={16} x2={8} y1={13} y2={13} />
                              <line x1={16} x2={8} y1={17} y2={17} />
                              <line x1={10} x2={8} y1={9} y2={9} />
                            </svg>

                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">Receipt No:</div>
                              <span className=" text-xs">
                                {bookData?.reference_code}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
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
                              className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                            >
                              <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                              <path d="M7 7h.01" />
                            </svg>

                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">
                                Amount Paid:
                              </div>
                              ₦{formatNumber(Number(viewBooking?.data?.price))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400 relative mt-3">
                        <div className="absolute left-0 px-3 ml-4 -mt-2 text-xs uppercase bg-white text-slate-500 dark:bg-darkmode-600">
                          <div className="-mt-px">Booked Details</div>
                        </div>
                        <div className="p-5 mt-2.5 flex flex-col gap-5 text-sm text-gray-700">
                          <div className="flex items-center">
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
                              className="lucide lucide-clock w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>

                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">
                                Arrival status:
                              </div>
                              <a
                                href=""
                                className="underline decoration-dotted decoration-gray-800/30 underline-offset-[3px] capitalize"
                              >
                                {viewBooking?.data?.arrival_status}
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <ActivateUserIcon className="lucide lucide-calendar w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500" />

                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">
                                Adult Count:
                              </div>
                              {viewBooking?.data?.adult_count}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-mail w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500 "
                            >
                              <rect width={20} height={16} x={2} y={4} rx={2} />
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg> */}
                            <PropertyForRentIcon className="lucide lucide-mail w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500 " />

                            <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                              <div className="sm:mr-auto w-54">
                                minor count:
                              </div>
                              <a href="" className="flex items-center ">
                                {viewBooking?.data?.minor_count}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* {showModal && (
        <BookingApproval
          BookingId={Booking?.data?.uuid}
          setOpenModal={setShowModal}
        />
        
      )} */}

      {/* {viewReceipt && ( */}
      <div className=" hidden">
        <div
          ref={componentRef}
          className="w-80 mx-auto rounded bg-gray-50 px-6 pt-8 shadow-lg mt-4"
        >
          <div className="mx-auto w-14 h-14 ">
            <svg
              width={48}
              height={48}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g clipPath="url(#clip0_1217_8521)">
                <rect
                  width={48}
                  height={48}
                  rx={6}
                  fill="url(#pattern0_1217_8521)"
                />
              </g>
              <rect
                x="0.25"
                y="0.25"
                width="47.5"
                height="47.5"
                rx="5.75"
                stroke="#373F41"
                strokeWidth="0.5"
              />
              <defs>
                <pattern
                  id="pattern0_1217_8521"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use xlinkHref="#image0_1217_8521" transform="scale(0.002)" />
                </pattern>
                <clipPath id="clip0_1217_8521">
                  <rect width={48} height={48} rx={6} fill="white" />
                </clipPath>
                <image
                  id="image0_1217_8521"
                  width={500}
                  height={500}
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEcWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTEzPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjU8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+THV4dXJ5IFN0YXIgbG9nbyBkZXNpZ25zIHRlbXBsYXRlIC0gNTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAg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"
                />
              </defs>
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h4 className="font-bold text-sm uppercase">Bookacrib</h4>
            <p className="text-xs text-slate-500 text-center">
              Times Square Mall, 15 Jiuhua St, beside mega chicken, Lekki Lagos
              Nigeria
            </p>
          </div>
          <div className="py-2 justify-center items-center flex  gap-2 text-slate-500 ">
            <p className="flex items-center gap-x-1 text-xs">
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
                className="lucide lucide-mail w-4 h-4 stroke-[1.3] text-slate-500 "
              >
                <rect width={20} height={16} x={2} y={4} rx={2} />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              info@bookacrib.com
            </p>
            <p className="flex items-center gap-x-1 text-xs">
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
                className="lucide lucide-calendar w-4 h-4 stroke-[1.3] text-slate-500"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +234XXXXXXXX
            </p>
          </div>
          <div className="flex flex-col gap-3 border-b py-6 text-xs">
            <p className="flex justify-between">
              <span className="text-gray-400">Receipt No.:</span>
              <span>#{bookData?.reference_code}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Purchase Date:</span>
              <span>{formatDateTime(viewBooking?.data?.created_at)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Check In:</span>
              <span> {formatDateOnly(bookData?.checkin_period)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Check Out:</span>
              <span> {formatDateOnly(bookData?.checkout_period)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Booking Days:</span>
              <span>
                {" "}
                {bookData?.booking_days} Day
                {bookData?.booking_days > 1 && "s"}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="flex text-slate-700 uppercase">
                  <th className="w-full py-2">Booked Property</th>
                  {/* <th className="min-w-[50px] py-2">QTY</th> */}
                  <th className="min-w-[44px] text-right py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="flex text-slate-700 ">
                  <td className="flex-1 py-1">{bookData?.property?.name}</td>
                  {/* <td className="min-w-[44px]">{item?.quantity}</td>
                <td className="min-w-[44px]">
                  ₦{formatNumber(item?.price || 0)}
                </td> */}
                </tr>
                <tr>
                  <td>
                    <div className="flex text-slate-500 text-xs  w-full items-center justify-between  flex-row gap-y-1">
                      <div className="sm:mr-auto w-54">Arrival status:</div>
                      <div className="underline decoration-dotted decoration-gray-800/30 underline-offset-[3px] capitalize">
                        {viewBooking?.data?.arrival_status}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className=" border-b border border-dashed" />

            <div className="flex flex-col gap-2  text-right text-sm">
              {/* <div className="flex items-center justify-end">
            <div className="text-slate-500">Subtotal:</div>
            <div className="w-20 font-medium sm:w-52 text-slate-600 dark:text-slate-400">
              ₦1,591
            </div>
          </div> */}
              <div className="flex items-center justify-between">
                <div className="text-slate-500 whitespace-nowrap">
                  Amount paid:
                </div>
                <div className="font-medium text-slate-600 dark:text-slate-400">
                  ₦{formatNumber(viewBooking?.data?.price || 0)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-slate-500 whitespace-nowrap">
                  Transaction Status:
                </div>
                <div className="font-medium text-slate-600 dark:text-slate-400">
                  <Badge
                    //   rounded
                    className=" capitalize"
                    //  leftIcon={item?.is_active === true && <DotIcon />}
                    color={
                      viewBooking?.data?.payment_status === "paid"
                        ? "success"
                        : "warning"
                    }
                    text={viewBooking?.data?.payment_status}
                  ></Badge>
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
              <div className="text-slate-500 whitespace-nowrap">
                Due balance:
              </div>
              <div className="font-medium text-slate-600 dark:text-slate-400">
                ₦{formatNumber(viewBooking?.data?.balanceDue || 0)}
              </div>
            </div> */}
              {/* <div className="flex items-center justify-between">
              <div className="text-slate-500 whitespace-nowrap">
                Payment status:
              </div>
              <div className="font-medium text-slate-600 dark:text-slate-400 uppercase">
                {viewBooking?.data?.transaction?.payment_status}
              </div>
            </div> */}
            </div>
            <div className=" pt-3  border-t border-dashed border-slate-200/80">
              <div className="text-sm font-medium text-gray-800 text-center">
                <i> ...Thanks for your patronage</i>
              </div>
              <div className="mt-1 text-slate-500 text-center">
                Book Your Perfect Stay, Anytime, Anywhere
              </div>
              <div className="mt-3 text-slate-500 text-xs text-center">
                ©{new Date().getFullYear()} BOOKACRIB LIMITED.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default BookingsDetails;
