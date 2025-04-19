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
          <div className="mx-auto w-20 h-20 ">
            <svg
              width={72}
              height={72}
              viewBox="0 0 86 86"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.447917"
                y="0.447917"
                width="85.1042"
                height="85.1042"
                rx="13.8854"
                fill="white"
              />
              <rect
                x="0.447917"
                y="0.447917"
                width="85.1042"
                height="85.1042"
                rx="13.8854"
                stroke="#C6824B"
                strokeWidth="0.895833"
              />
              <path
                d="M36.2674 62.797H16.1814C11.301 62.797 10.4813 61.1629 10.4813 56.2826V38.4689C11.2956 36.2973 15.91 32.1753 18.0814 30.0038L24.0529 24.3546C25.953 22.7261 27.3508 20.6645 30.2959 22.726L45.4961 38.4689M36.2674 62.797C42.545 62.6822 41.7307 62.9536 36.2674 62.797Z"
                stroke="#C6824B"
                strokeWidth="3.80005"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.7889 57.1982V54.9048H16.6669C16.8326 54.9048 16.9703 54.9309 17.0801 54.9832C17.1906 55.0347 17.2731 55.1053 17.3276 55.1948C17.3828 55.2844 17.4104 55.386 17.4104 55.4994C17.4104 55.5927 17.3925 55.6726 17.3567 55.7391C17.3208 55.8048 17.2727 55.8581 17.2122 55.8992C17.1517 55.9403 17.0842 55.9697 17.0095 55.9877V56.0101C17.0909 56.0145 17.1689 56.0395 17.2436 56.0851C17.319 56.1299 17.3806 56.1933 17.4283 56.2755C17.4761 56.3576 17.5 56.4569 17.5 56.5733C17.5 56.692 17.4713 56.7988 17.4138 56.8936C17.3563 56.9876 17.2697 57.0619 17.154 57.1164C17.0383 57.1709 16.8927 57.1982 16.7173 57.1982H15.7889ZM16.2044 56.851H16.6512C16.802 56.851 16.9106 56.8223 16.9771 56.7648C17.0442 56.7066 17.0778 56.6319 17.0778 56.5408C17.0778 56.4729 17.061 56.4117 17.0274 56.3572C16.9939 56.302 16.9461 56.2587 16.8841 56.2273C16.8221 56.1952 16.7482 56.1791 16.6624 56.1791H16.2044V56.851ZM16.2044 55.8802H16.6154C16.687 55.8802 16.7516 55.8671 16.8091 55.841C16.8666 55.8141 16.9117 55.7764 16.9446 55.7279C16.9782 55.6786 16.995 55.6204 16.995 55.5532C16.995 55.4643 16.9636 55.3912 16.9009 55.3337C16.8389 55.2762 16.7467 55.2475 16.6243 55.2475H16.2044V55.8802Z"
                fill="#291B25"
              />
              <path
                d="M18.5938 57.2318C18.4258 57.2318 18.2802 57.1948 18.1571 57.1209C18.0339 57.047 17.9383 56.9436 17.8704 56.8107C17.8032 56.6778 17.7696 56.5226 17.7696 56.3449C17.7696 56.1672 17.8032 56.0115 17.8704 55.8779C17.9383 55.7443 18.0339 55.6405 18.1571 55.5666C18.2802 55.4927 18.4258 55.4558 18.5938 55.4558C18.7617 55.4558 18.9073 55.4927 19.0305 55.5666C19.1537 55.6405 19.2489 55.7443 19.3161 55.8779C19.384 56.0115 19.418 56.1672 19.418 56.3449C19.418 56.5226 19.384 56.6778 19.3161 56.8107C19.2489 56.9436 19.1537 57.047 19.0305 57.1209C18.9073 57.1948 18.7617 57.2318 18.5938 57.2318ZM18.596 56.907C18.6871 56.907 18.7632 56.882 18.8245 56.832C18.8857 56.7812 18.9312 56.7133 18.9611 56.6282C18.9917 56.5431 19.007 56.4483 19.007 56.3438C19.007 56.2385 18.9917 56.1433 18.9611 56.0582C18.9312 55.9724 18.8857 55.904 18.8245 55.8533C18.7632 55.8025 18.6871 55.7771 18.596 55.7771C18.5027 55.7771 18.4251 55.8025 18.3631 55.8533C18.3019 55.904 18.256 55.9724 18.2254 56.0582C18.1955 56.1433 18.1806 56.2385 18.1806 56.3438C18.1806 56.4483 18.1955 56.5431 18.2254 56.6282C18.256 56.7133 18.3019 56.7812 18.3631 56.832C18.4251 56.882 18.5027 56.907 18.596 56.907Z"
                fill="#291B25"
              />
              <path
                d="M20.5123 57.2318C20.3443 57.2318 20.1987 57.1948 20.0756 57.1209C19.9524 57.047 19.8568 56.9436 19.7889 56.8107C19.7217 56.6778 19.6881 56.5226 19.6881 56.3449C19.6881 56.1672 19.7217 56.0115 19.7889 55.8779C19.8568 55.7443 19.9524 55.6405 20.0756 55.5666C20.1987 55.4927 20.3443 55.4558 20.5123 55.4558C20.6803 55.4558 20.8258 55.4927 20.949 55.5666C21.0722 55.6405 21.1674 55.7443 21.2346 55.8779C21.3025 56.0115 21.3365 56.1672 21.3365 56.3449C21.3365 56.5226 21.3025 56.6778 21.2346 56.8107C21.1674 56.9436 21.0722 57.047 20.949 57.1209C20.8258 57.1948 20.6803 57.2318 20.5123 57.2318ZM20.5145 56.907C20.6056 56.907 20.6818 56.882 20.743 56.832C20.8042 56.7812 20.8497 56.7133 20.8796 56.6282C20.9102 56.5431 20.9255 56.4483 20.9255 56.3438C20.9255 56.2385 20.9102 56.1433 20.8796 56.0582C20.8497 55.9724 20.8042 55.904 20.743 55.8533C20.6818 55.8025 20.6056 55.7771 20.5145 55.7771C20.4212 55.7771 20.3436 55.8025 20.2816 55.8533C20.2204 55.904 20.1745 55.9724 20.1439 56.0582C20.114 56.1433 20.0991 56.2385 20.0991 56.3438C20.0991 56.4483 20.114 56.5431 20.1439 56.6282C20.1745 56.7133 20.2204 56.7812 20.2816 56.832C20.3436 56.882 20.4212 56.907 20.5145 56.907Z"
                fill="#291B25"
              />
              <path
                d="M22.0501 56.6584L22.0489 56.1691H22.1139L22.732 55.4781H23.2057L22.4454 56.3247H22.3614L22.0501 56.6584ZM21.6805 57.1982V54.9048H22.0859V57.1982H21.6805ZM22.76 57.1982L22.2001 56.4154L22.4734 56.1299L23.2449 57.1982H22.76Z"
                fill="#291B25"
              />
              <path
                d="M24.1192 54.9048H24.5884L25.1494 55.9194H25.1718L25.7328 54.9048H26.202L25.3678 56.3426V57.1982H24.9534V56.3426L24.1192 54.9048Z"
                fill="#291B25"
              />
              <path
                d="M26.9084 57.2318C26.7404 57.2318 26.5948 57.1948 26.4716 57.1209C26.3484 57.047 26.2529 56.9436 26.185 56.8107C26.1178 56.6778 26.0842 56.5226 26.0842 56.3449C26.0842 56.1672 26.1178 56.0115 26.185 55.8779C26.2529 55.7443 26.3484 55.6405 26.4716 55.5666C26.5948 55.4927 26.7404 55.4558 26.9084 55.4558C27.0763 55.4558 27.2219 55.4927 27.3451 55.5666C27.4683 55.6405 27.5634 55.7443 27.6306 55.8779C27.6986 56.0115 27.7325 56.1672 27.7325 56.3449C27.7325 56.5226 27.6986 56.6778 27.6306 56.8107C27.5634 56.9436 27.4683 57.047 27.3451 57.1209C27.2219 57.1948 27.0763 57.2318 26.9084 57.2318ZM26.9106 56.907C27.0017 56.907 27.0778 56.882 27.139 56.832C27.2002 56.7812 27.2458 56.7133 27.2756 56.6282C27.3063 56.5431 27.3216 56.4483 27.3216 56.3438C27.3216 56.2385 27.3063 56.1433 27.2756 56.0582C27.2458 55.9724 27.2002 55.904 27.139 55.8533C27.0778 55.8025 27.0017 55.7771 26.9106 55.7771C26.8173 55.7771 26.7396 55.8025 26.6777 55.8533C26.6165 55.904 26.5705 55.9724 26.5399 56.0582C26.5101 56.1433 26.4951 56.2385 26.4951 56.3438C26.4951 56.4483 26.5101 56.5431 26.5399 56.6282C26.5705 56.7133 26.6165 56.7812 26.6777 56.832C26.7396 56.882 26.8173 56.907 26.9106 56.907Z"
                fill="#291B25"
              />
              <path
                d="M29.1729 56.4748V55.4781H29.5783V57.1982H29.1852V56.8925H29.1673C29.1285 56.9888 29.0646 57.0675 28.9758 57.1287C28.8877 57.19 28.7791 57.2206 28.6499 57.2206C28.5372 57.2206 28.4375 57.1956 28.3509 57.1455C28.2651 57.0948 28.1979 57.0212 28.1494 56.9249C28.1009 56.8279 28.0766 56.7107 28.0766 56.5733V55.4781H28.482V56.5106C28.482 56.6196 28.5118 56.7062 28.5715 56.7704C28.6313 56.8346 28.7097 56.8667 28.8067 56.8667C28.8664 56.8667 28.9243 56.8522 28.9803 56.823C29.0363 56.7939 29.0822 56.7506 29.118 56.6931C29.1546 56.6349 29.1729 56.5621 29.1729 56.4748Z"
                fill="#291B25"
              />
              <path
                d="M29.9951 57.1982V55.4781H30.3882V55.7648H30.4061C30.4374 55.6655 30.4912 55.589 30.5673 55.5353C30.6442 55.4808 30.7319 55.4535 30.8305 55.4535C30.8529 55.4535 30.8779 55.4546 30.9055 55.4569C30.9339 55.4584 30.9574 55.461 30.9761 55.4647V55.8376C30.9589 55.8316 30.9316 55.8264 30.8943 55.8219C30.8577 55.8167 30.8223 55.8141 30.7879 55.8141C30.714 55.8141 30.6476 55.8301 30.5886 55.8622C30.5304 55.8936 30.4845 55.9373 30.4509 55.9933C30.4173 56.0492 30.4005 56.1138 30.4005 56.187V57.1982H29.9951Z"
                fill="#291B25"
              />
              <path
                d="M32.0455 57.1982V54.9048H32.9055C33.0817 54.9048 33.2295 54.9377 33.3489 55.0033C33.4691 55.069 33.5598 55.1594 33.621 55.2743C33.683 55.3886 33.714 55.5185 33.714 55.664C33.714 55.8111 33.683 55.9417 33.621 56.056C33.5591 56.1702 33.4676 56.2601 33.3467 56.3258C33.2257 56.3908 33.0768 56.4233 32.8999 56.4233H32.3299V56.0817H32.8439C32.9469 56.0817 33.0313 56.0638 33.097 56.028C33.1627 55.9921 33.2112 55.9429 33.2425 55.8802C33.2746 55.8174 33.2907 55.7454 33.2907 55.664C33.2907 55.5827 33.2746 55.511 33.2425 55.449C33.2112 55.3871 33.1623 55.3389 33.0958 55.3046C33.0302 55.2695 32.9454 55.2519 32.8417 55.2519H32.4609V57.1982H32.0455Z"
                fill="#291B25"
              />
              <path
                d="M34.7938 57.2318C34.6213 57.2318 34.4724 57.1959 34.347 57.1243C34.2223 57.0519 34.1264 56.9496 34.0592 56.8174C33.992 56.6846 33.9584 56.5282 33.9584 56.3482C33.9584 56.1713 33.992 56.016 34.0592 55.8824C34.1271 55.748 34.2219 55.6435 34.3436 55.5689C34.4653 55.4935 34.6082 55.4558 34.7725 55.4558C34.8785 55.4558 34.9785 55.4729 35.0726 55.5073C35.1674 55.5409 35.251 55.5931 35.3234 55.664C35.3966 55.735 35.4541 55.8253 35.4959 55.935C35.5377 56.044 35.5586 56.1739 35.5586 56.3247V56.449H34.1487V56.1758H35.17C35.1693 56.0981 35.1525 56.0291 35.1196 55.9686C35.0868 55.9074 35.0409 55.8593 34.9819 55.8242C34.9237 55.7891 34.8557 55.7715 34.7781 55.7715C34.6952 55.7715 34.6224 55.7917 34.5597 55.832C34.497 55.8716 34.4481 55.9238 34.413 55.9888C34.3787 56.053 34.3611 56.1235 34.3604 56.2004V56.4389C34.3604 56.539 34.3787 56.6248 34.4153 56.6965C34.4518 56.7674 34.503 56.8219 34.5687 56.86C34.6344 56.8973 34.7113 56.916 34.7994 56.916C34.8583 56.916 34.9117 56.9078 34.9595 56.8913C35.0073 56.8742 35.0487 56.8492 35.0838 56.8163C35.1189 56.7835 35.1454 56.7428 35.1633 56.6943L35.5418 56.7368C35.5179 56.8368 35.4724 56.9242 35.4052 56.9988C35.3387 57.0728 35.2536 57.1302 35.1499 57.1713C35.0461 57.2116 34.9274 57.2318 34.7938 57.2318Z"
                fill="#291B25"
              />
              <path
                d="M35.9015 57.1982V55.4781H36.2946V55.7648H36.3125C36.3439 55.6655 36.3976 55.589 36.4737 55.5353C36.5506 55.4808 36.6384 55.4535 36.7369 55.4535C36.7593 55.4535 36.7843 55.4546 36.8119 55.4569C36.8403 55.4584 36.8638 55.461 36.8825 55.4647V55.8376C36.8653 55.8316 36.8381 55.8264 36.8007 55.8219C36.7642 55.8167 36.7287 55.8141 36.6944 55.8141C36.6204 55.8141 36.554 55.8301 36.495 55.8622C36.4368 55.8936 36.3909 55.9373 36.3573 55.9933C36.3237 56.0492 36.3069 56.1138 36.3069 56.187V57.1982H35.9015Z"
                fill="#291B25"
              />
              <path
                d="M38.1154 55.4781V55.7917H37.0986V55.4781H38.1154ZM37.3528 57.1982V55.3158C37.3528 55.2001 37.3767 55.1038 37.4245 55.0269C37.473 54.95 37.5379 54.8925 37.6193 54.8544C37.7007 54.8163 37.791 54.7973 37.8903 54.7973C37.9605 54.7973 38.0228 54.8029 38.0773 54.8141C38.1318 54.8253 38.1721 54.8354 38.1983 54.8443L38.1176 55.1579C38.1005 55.1527 38.0788 55.1474 38.0527 55.1422C38.0265 55.1362 37.9974 55.1332 37.9653 55.1332C37.8899 55.1332 37.8366 55.1515 37.8052 55.1881C37.7746 55.224 37.7593 55.2755 37.7593 55.3427V57.1982H37.3528Z"
                fill="#291B25"
              />
              <path
                d="M39.1297 57.2318C38.9572 57.2318 38.8083 57.1959 38.6829 57.1243C38.5582 57.0519 38.4622 56.9496 38.3951 56.8174C38.3279 56.6846 38.2943 56.5282 38.2943 56.3482C38.2943 56.1713 38.3279 56.016 38.3951 55.8824C38.463 55.748 38.5578 55.6435 38.6795 55.5689C38.8012 55.4935 38.9441 55.4558 39.1084 55.4558C39.2144 55.4558 39.3144 55.4729 39.4085 55.5073C39.5033 55.5409 39.5869 55.5931 39.6593 55.664C39.7325 55.735 39.79 55.8253 39.8318 55.935C39.8736 56.044 39.8945 56.1739 39.8945 56.3247V56.449H38.4846V56.1758H39.5059C39.5052 56.0981 39.4884 56.0291 39.4555 55.9686C39.4227 55.9074 39.3768 55.8593 39.3178 55.8242C39.2596 55.7891 39.1916 55.7715 39.114 55.7715C39.0311 55.7715 38.9583 55.7917 38.8956 55.832C38.8329 55.8716 38.784 55.9238 38.7489 55.9888C38.7146 56.053 38.697 56.1235 38.6963 56.2004V56.4389C38.6963 56.539 38.7146 56.6248 38.7512 56.6965C38.7877 56.7674 38.8389 56.8219 38.9046 56.86C38.9703 56.8973 39.0472 56.916 39.1353 56.916C39.1942 56.916 39.2476 56.9078 39.2954 56.8913C39.3432 56.8742 39.3846 56.8492 39.4197 56.8163C39.4548 56.7835 39.4813 56.7428 39.4992 56.6943L39.8777 56.7368C39.8538 56.8368 39.8083 56.9242 39.7411 56.9988C39.6746 57.0728 39.5895 57.1302 39.4858 57.1713C39.382 57.2116 39.2633 57.2318 39.1297 57.2318Z"
                fill="#291B25"
              />
              <path
                d="M40.9877 57.2318C40.816 57.2318 40.6686 57.1941 40.5454 57.1187C40.4229 57.0433 40.3285 56.9391 40.2621 56.8062C40.1964 56.6726 40.1635 56.5188 40.1635 56.3449C40.1635 56.1702 40.1971 56.016 40.2643 55.8824C40.3315 55.748 40.4263 55.6435 40.5487 55.5689C40.6719 55.4935 40.8175 55.4558 40.9855 55.4558C41.1251 55.4558 41.2486 55.4815 41.3561 55.533C41.4644 55.5838 41.5506 55.6558 41.6148 55.7491C41.679 55.8417 41.7156 55.95 41.7245 56.0739H41.3371C41.3214 55.991 41.2841 55.922 41.2251 55.8667C41.1669 55.8107 41.0889 55.7827 40.9911 55.7827C40.9082 55.7827 40.8354 55.8051 40.7727 55.8499C40.71 55.894 40.6611 55.9574 40.626 56.0403C40.5917 56.1232 40.5745 56.2224 40.5745 56.3382C40.5745 56.4554 40.5917 56.5561 40.626 56.6405C40.6603 56.7241 40.7085 56.7887 40.7705 56.8342C40.8332 56.879 40.9067 56.9014 40.9911 56.9014C41.0508 56.9014 41.1042 56.8902 41.1512 56.8678C41.199 56.8447 41.2389 56.8115 41.271 56.7682C41.3031 56.7249 41.3251 56.6722 41.3371 56.6103H41.7245C41.7148 56.732 41.679 56.8398 41.617 56.9339C41.5551 57.0272 41.4707 57.1004 41.364 57.1534C41.2572 57.2056 41.1318 57.2318 40.9877 57.2318Z"
                fill="#291B25"
              />
              <path
                d="M42.9163 55.4781V55.7917H41.9275V55.4781H42.9163ZM42.1716 55.0661H42.577V56.6808C42.577 56.7353 42.5852 56.7771 42.6016 56.8062C42.6188 56.8346 42.6412 56.854 42.6688 56.8645C42.6964 56.8749 42.727 56.8801 42.7606 56.8801C42.786 56.8801 42.8092 56.8783 42.8301 56.8745C42.8517 56.8708 42.8681 56.8675 42.8793 56.8645L42.9476 57.1814C42.926 57.1888 42.895 57.1971 42.8547 57.206C42.8151 57.215 42.7666 57.2202 42.7091 57.2217C42.6076 57.2247 42.5161 57.2094 42.4348 57.1758C42.3534 57.1414 42.2888 57.0884 42.241 57.0168C42.194 56.9451 42.1709 56.8555 42.1716 56.748V55.0661Z"
                fill="#291B25"
              />
              <path
                d="M45.3018 55.5353C45.2913 55.4375 45.2473 55.3613 45.1696 55.3068C45.0927 55.2523 44.9927 55.2251 44.8695 55.2251C44.7829 55.2251 44.7086 55.2381 44.6467 55.2643C44.5847 55.2904 44.5373 55.3259 44.5045 55.3706C44.4716 55.4154 44.4548 55.4666 44.4541 55.5241C44.4541 55.5718 44.4649 55.6133 44.4865 55.6484C44.5089 55.6834 44.5392 55.7133 44.5772 55.7379C44.6153 55.7618 44.6575 55.782 44.7038 55.7984C44.7501 55.8148 44.7967 55.8286 44.8438 55.8398L45.0588 55.8936C45.1454 55.9138 45.2286 55.941 45.3085 55.9753C45.3891 56.0097 45.4611 56.053 45.5246 56.1052C45.5888 56.1575 45.6396 56.2206 45.6769 56.2945C45.7142 56.3684 45.7329 56.455 45.7329 56.5543C45.7329 56.6887 45.6985 56.807 45.6299 56.9093C45.5612 57.0108 45.4619 57.0903 45.332 57.1478C45.2028 57.2045 45.0464 57.2329 44.8628 57.2329C44.6844 57.2329 44.5295 57.2053 44.3981 57.15C44.2674 57.0948 44.1651 57.0142 44.0912 56.9081C44.0181 56.8021 43.9785 56.673 43.9725 56.5207H44.3813C44.3872 56.6006 44.4119 56.667 44.4552 56.72C44.4985 56.773 44.5548 56.8126 44.6243 56.8387C44.6944 56.8648 44.7728 56.8779 44.8594 56.8779C44.9498 56.8779 45.0289 56.8645 45.0968 56.8376C45.1655 56.81 45.2193 56.7719 45.2581 56.7234C45.2969 56.6741 45.3167 56.6166 45.3174 56.5509C45.3167 56.4912 45.2991 56.4419 45.2648 56.4031C45.2305 56.3635 45.1823 56.3307 45.1203 56.3046C45.0591 56.2777 44.9875 56.2538 44.9053 56.2329L44.6444 56.1657C44.4556 56.1172 44.3062 56.0437 44.1965 55.9451C44.0875 55.8458 44.033 55.7141 44.033 55.5498C44.033 55.4147 44.0696 55.2964 44.1428 55.1948C44.2167 55.0933 44.3171 55.0145 44.444 54.9586C44.5709 54.9018 44.7146 54.8735 44.8751 54.8735C45.0379 54.8735 45.1804 54.9018 45.3029 54.9586C45.4261 55.0145 45.5227 55.0926 45.5929 55.1926C45.6631 55.2919 45.6993 55.4061 45.7015 55.5353H45.3018Z"
                fill="#291B25"
              />
              <path
                d="M46.9442 55.4781V55.7917H45.9554V55.4781H46.9442ZM46.1996 55.0661H46.6049V56.6808C46.6049 56.7353 46.6131 56.7771 46.6296 56.8062C46.6467 56.8346 46.6691 56.854 46.6968 56.8645C46.7244 56.8749 46.755 56.8801 46.7886 56.8801C46.814 56.8801 46.8371 56.8783 46.858 56.8745C46.8797 56.8708 46.8961 56.8675 46.9073 56.8645L46.9756 57.1814C46.9539 57.1888 46.923 57.1971 46.8826 57.206C46.8431 57.215 46.7945 57.2202 46.7371 57.2217C46.6355 57.2247 46.5441 57.2094 46.4627 57.1758C46.3813 57.1414 46.3168 57.0884 46.269 57.0168C46.222 56.9451 46.1988 56.8555 46.1996 56.748V55.0661Z"
                fill="#291B25"
              />
              <path
                d="M47.7782 57.2329C47.6692 57.2329 47.571 57.2135 47.4837 57.1747C47.3971 57.1351 47.3284 57.0769 47.2777 57C47.2276 56.9231 47.2026 56.8283 47.2026 56.7155C47.2026 56.6185 47.2205 56.5382 47.2564 56.4748C47.2922 56.4113 47.3411 56.3606 47.4031 56.3225C47.465 56.2844 47.5348 56.2557 47.6125 56.2363C47.6909 56.2161 47.7719 56.2015 47.8555 56.1926C47.9563 56.1821 48.038 56.1728 48.1007 56.1646C48.1634 56.1556 48.209 56.1422 48.2373 56.1243C48.2664 56.1056 48.281 56.0769 48.281 56.0381V56.0313C48.281 55.947 48.256 55.8817 48.206 55.8354C48.156 55.7891 48.0839 55.7659 47.9899 55.7659C47.8906 55.7659 47.8118 55.7876 47.7536 55.8309C47.6961 55.8742 47.6573 55.9253 47.6371 55.9843L47.2586 55.9306C47.2885 55.826 47.3378 55.7387 47.4064 55.6685C47.4751 55.5976 47.5591 55.5446 47.6584 55.5095C47.7577 55.4737 47.8674 55.4558 47.9876 55.4558C48.0705 55.4558 48.153 55.4655 48.2351 55.4849C48.3172 55.5043 48.3922 55.5364 48.4602 55.5812C48.5281 55.6252 48.5826 55.6853 48.6237 55.7615C48.6655 55.8376 48.6864 55.9328 48.6864 56.047V57.1982H48.2967V56.9619H48.2832C48.2586 57.0097 48.2239 57.0545 48.1791 57.0963C48.1351 57.1373 48.0794 57.1706 48.0122 57.1959C47.9458 57.2206 47.8678 57.2329 47.7782 57.2329ZM47.8835 56.935C47.9648 56.935 48.0354 56.919 48.0951 56.8869C48.1548 56.854 48.2007 56.8107 48.2328 56.757C48.2657 56.7032 48.2821 56.6446 48.2821 56.5812V56.3785C48.2694 56.3889 48.2478 56.3986 48.2172 56.4076C48.1873 56.4165 48.1537 56.4244 48.1164 56.4311C48.0791 56.4378 48.0421 56.4438 48.0055 56.449C47.9689 56.4542 47.9372 56.4587 47.9103 56.4625C47.8499 56.4707 47.7958 56.4841 47.748 56.5028C47.7002 56.5214 47.6625 56.5476 47.6349 56.5812C47.6073 56.614 47.5934 56.6566 47.5934 56.7088C47.5934 56.7835 47.6207 56.8398 47.6752 56.8779C47.7297 56.916 47.7991 56.935 47.8835 56.935Z"
                fill="#291B25"
              />
              <path
                d="M49.2843 57.8432C49.2291 57.8432 49.178 57.8387 49.1309 57.8297C49.0847 57.8215 49.0477 57.8118 49.0201 57.8006L49.1141 57.4848C49.1731 57.502 49.2257 57.5102 49.272 57.5095C49.3183 57.5087 49.359 57.4942 49.3941 57.4658C49.4299 57.4382 49.4602 57.3919 49.4848 57.327L49.5195 57.234L48.8958 55.4781H49.3258L49.7222 56.7771H49.7401L50.1376 55.4781H50.5688L49.8801 57.4065C49.848 57.4975 49.8054 57.5755 49.7524 57.6405C49.6994 57.7062 49.6345 57.7562 49.5576 57.7906C49.4814 57.8256 49.3904 57.8432 49.2843 57.8432Z"
                fill="#291B25"
              />
              <path
                d="M51.2174 56.8846L51.2029 57.0078C51.1924 57.1019 51.1737 57.1974 51.1469 57.2945C51.1207 57.3923 51.0931 57.4822 51.064 57.5643C51.0349 57.6465 51.0114 57.711 50.9935 57.7581H50.7202C50.7307 57.7125 50.7449 57.6506 50.7628 57.5722C50.7814 57.4938 50.7994 57.4057 50.8165 57.3079C50.8337 57.2101 50.8453 57.1108 50.8512 57.01L50.8591 56.8846H51.2174Z"
                fill="#291B25"
              />
              <path
                d="M52.6953 57.1982H52.2518L53.0592 54.9048H53.5721L54.3806 57.1982H53.9371L53.3246 55.3751H53.3067L52.6953 57.1982ZM52.7098 56.299H53.9192V56.6327H52.7098V56.299Z"
                fill="#291B25"
              />
              <path
                d="M55.0701 56.1903V57.1982H54.6647V55.4781H55.0522V55.7704H55.0724C55.1119 55.6741 55.175 55.5976 55.2616 55.5409C55.3489 55.4841 55.4568 55.4558 55.5852 55.4558C55.7039 55.4558 55.8073 55.4811 55.8954 55.5319C55.9842 55.5827 56.0529 55.6562 56.1015 55.7525C56.1507 55.8488 56.175 55.9656 56.1742 56.103V57.1982H55.7689V56.1657C55.7689 56.0507 55.739 55.9608 55.6793 55.8958C55.6203 55.8309 55.5386 55.7984 55.434 55.7984C55.3631 55.7984 55.3 55.8141 55.2448 55.8454C55.1903 55.8761 55.1474 55.9205 55.116 55.9787C55.0854 56.0369 55.0701 56.1075 55.0701 56.1903Z"
                fill="#291B25"
              />
              <path
                d="M56.7767 57.8432C56.7215 57.8432 56.6703 57.8387 56.6233 57.8297C56.577 57.8215 56.54 57.8118 56.5124 57.8006L56.6065 57.4848C56.6655 57.502 56.7181 57.5102 56.7644 57.5095C56.8107 57.5087 56.8514 57.4942 56.8864 57.4658C56.9223 57.4382 56.9525 57.3919 56.9771 57.327L57.0119 57.234L56.3881 55.4781H56.8181L57.2145 56.7771H57.2325L57.63 55.4781H58.0611L57.3724 57.4065C57.3403 57.4975 57.2978 57.5755 57.2448 57.6405C57.1918 57.7062 57.1268 57.7562 57.0499 57.7906C56.9738 57.8256 56.8827 57.8432 56.7767 57.8432Z"
                fill="#291B25"
              />
              <path
                d="M59.2005 55.4781V55.7917H58.2117V55.4781H59.2005ZM58.4559 55.0661H58.8612V56.6808C58.8612 56.7353 58.8694 56.7771 58.8859 56.8062C58.903 56.8346 58.9254 56.854 58.9531 56.8645C58.9807 56.8749 59.0113 56.8801 59.0449 56.8801C59.0703 56.8801 59.0934 56.8783 59.1143 56.8745C59.136 56.8708 59.1524 56.8675 59.1636 56.8645L59.2319 57.1814C59.2102 57.1888 59.1793 57.1971 59.1389 57.206C59.0994 57.215 59.0508 57.2202 58.9934 57.2217C58.8918 57.2247 58.8004 57.2094 58.719 57.1758C58.6376 57.1414 58.5731 57.0884 58.5253 57.0168C58.4783 56.9451 58.4551 56.8555 58.4559 56.748V55.0661Z"
                fill="#291B25"
              />
              <path
                d="M59.5396 57.1982V55.4781H59.9449V57.1982H59.5396ZM59.7434 55.234C59.6792 55.234 59.6239 55.2128 59.5776 55.1702C59.5313 55.1269 59.5082 55.075 59.5082 55.0145C59.5082 54.9533 59.5313 54.9014 59.5776 54.8589C59.6239 54.8156 59.6792 54.7939 59.7434 54.7939C59.8083 54.7939 59.8635 54.8156 59.9091 54.8589C59.9554 54.9014 59.9785 54.9533 59.9785 55.0145C59.9785 55.075 59.9554 55.1269 59.9091 55.1702C59.8635 55.2128 59.8083 55.234 59.7434 55.234Z"
                fill="#291B25"
              />
              <path
                d="M60.3618 57.1982V55.4781H60.7492V55.7704H60.7694C60.8052 55.6719 60.8646 55.595 60.9474 55.5397C61.0303 55.4837 61.1292 55.4558 61.2442 55.4558C61.3606 55.4558 61.4588 55.4841 61.5387 55.5409C61.6193 55.5968 61.676 55.6734 61.7089 55.7704H61.7268C61.7649 55.6749 61.8291 55.5987 61.9194 55.542C62.0105 55.4845 62.1184 55.4558 62.243 55.4558C62.4013 55.4558 62.5305 55.5058 62.6305 55.6058C62.7305 55.7058 62.7805 55.8518 62.7805 56.0437V57.1982H62.3741V56.1064C62.3741 55.9996 62.3457 55.9216 62.289 55.8723C62.2322 55.8223 62.1628 55.7973 62.0807 55.7973C61.9829 55.7973 61.9064 55.8279 61.8511 55.8891C61.7966 55.9496 61.7694 56.0283 61.7694 56.1254V57.1982H61.3718V56.0896C61.3718 56.0007 61.345 55.9298 61.2912 55.8768C61.2382 55.8238 61.1688 55.7973 61.0829 55.7973C61.0247 55.7973 60.9717 55.8122 60.9239 55.8421C60.8761 55.8712 60.8381 55.9126 60.8097 55.9664C60.7813 56.0194 60.7671 56.0814 60.7671 56.1523V57.1982H60.3618Z"
                fill="#291B25"
              />
              <path
                d="M63.9533 57.2318C63.7808 57.2318 63.6319 57.1959 63.5065 57.1243C63.3818 57.0519 63.2859 56.9496 63.2187 56.8174C63.1515 56.6846 63.1179 56.5282 63.1179 56.3482C63.1179 56.1713 63.1515 56.016 63.2187 55.8824C63.2866 55.748 63.3814 55.6435 63.5031 55.5689C63.6248 55.4935 63.7678 55.4558 63.932 55.4558C64.038 55.4558 64.138 55.4729 64.2321 55.5073C64.3269 55.5409 64.4105 55.5931 64.4829 55.664C64.5561 55.735 64.6136 55.8253 64.6554 55.935C64.6972 56.044 64.7181 56.1739 64.7181 56.3247V56.449H63.3083V56.1758H64.3295C64.3288 56.0981 64.312 56.0291 64.2791 55.9686C64.2463 55.9074 64.2004 55.8593 64.1414 55.8242C64.0832 55.7891 64.0152 55.7715 63.9376 55.7715C63.8547 55.7715 63.7819 55.7917 63.7192 55.832C63.6565 55.8716 63.6076 55.9238 63.5725 55.9888C63.5382 56.053 63.5207 56.1235 63.5199 56.2004V56.4389C63.5199 56.539 63.5382 56.6248 63.5748 56.6965C63.6114 56.7674 63.6625 56.8219 63.7282 56.86C63.7939 56.8973 63.8708 56.916 63.9589 56.916C64.0178 56.916 64.0712 56.9078 64.119 56.8913C64.1668 56.8742 64.2082 56.8492 64.2433 56.8163C64.2784 56.7835 64.3049 56.7428 64.3228 56.6943L64.7013 56.7368C64.6774 56.8368 64.6319 56.9242 64.5647 56.9988C64.4982 57.0728 64.4131 57.1302 64.3094 57.1713C64.2056 57.2116 64.0869 57.2318 63.9533 57.2318Z"
                fill="#291B25"
              />
              <path
                d="M65.537 56.8846L65.5224 57.0078C65.5119 57.1019 65.4933 57.1974 65.4664 57.2945C65.4403 57.3923 65.4127 57.4822 65.3835 57.5643C65.3544 57.6465 65.3309 57.711 65.313 57.7581H65.0398C65.0502 57.7125 65.0644 57.6506 65.0823 57.5722C65.101 57.4938 65.1189 57.4057 65.1361 57.3079C65.1532 57.2101 65.1648 57.1108 65.1708 57.01L65.1786 56.8846H65.537Z"
                fill="#291B25"
              />
              <path
                d="M67.0148 57.1982H66.5714L67.3788 54.9048H67.8916L68.7001 57.1982H68.2567L67.6442 55.3751H67.6262L67.0148 57.1982ZM67.0294 56.299H68.2388V56.6327H67.0294V56.299Z"
                fill="#291B25"
              />
              <path
                d="M69.3897 56.1903V57.1982H68.9843V55.4781H69.3717V55.7704H69.3919C69.4315 55.6741 69.4946 55.5976 69.5811 55.5409C69.6685 55.4841 69.7764 55.4558 69.9048 55.4558C70.0235 55.4558 70.1269 55.4811 70.215 55.5319C70.3038 55.5827 70.3725 55.6562 70.421 55.7525C70.4703 55.8488 70.4945 55.9656 70.4938 56.103V57.1982H70.0884V56.1657C70.0884 56.0507 70.0586 55.9608 69.9988 55.8958C69.9399 55.8309 69.8581 55.7984 69.7536 55.7984C69.6827 55.7984 69.6196 55.8141 69.5643 55.8454C69.5099 55.8761 69.4669 55.9205 69.4356 55.9787C69.405 56.0369 69.3897 56.1075 69.3897 56.1903Z"
                fill="#291B25"
              />
              <path
                d="M71.0962 57.8432C71.041 57.8432 70.9899 57.8387 70.9428 57.8297C70.8965 57.8215 70.8596 57.8118 70.832 57.8006L70.926 57.4848C70.985 57.502 71.0376 57.5102 71.0839 57.5095C71.1302 57.5087 71.1709 57.4942 71.206 57.4658C71.2418 57.4382 71.2721 57.3919 71.2967 57.327L71.3314 57.234L70.7077 55.4781H71.1377L71.5341 56.7771H71.552L71.9495 55.4781H72.3807L71.692 57.4065C71.6599 57.4975 71.6173 57.5755 71.5643 57.6405C71.5113 57.7062 71.4464 57.7562 71.3695 57.7906C71.2933 57.8256 71.2023 57.8432 71.0962 57.8432Z"
                fill="#291B25"
              />
              <path
                d="M73.0162 57.1982L72.5302 55.4781H72.9434L73.2457 56.6875H73.2614L73.5705 55.4781H73.9792L74.2883 56.6808H74.3051L74.6029 55.4781H75.0173L74.5301 57.1982H74.108L73.7855 56.0358H73.7619L73.4394 57.1982H73.0162Z"
                fill="#291B25"
              />
              <path
                d="M75.7057 56.1903V57.1982H75.3003V54.9048H75.6967V55.7704H75.7169C75.7572 55.6734 75.8195 55.5968 75.9039 55.5409C75.989 55.4841 76.0972 55.4558 76.2286 55.4558C76.3481 55.4558 76.4522 55.4808 76.541 55.5308C76.6299 55.5808 76.6986 55.654 76.7471 55.7503C76.7963 55.8466 76.821 55.9641 76.821 56.103V57.1982H76.4156V56.1657C76.4156 56.05 76.3858 55.96 76.326 55.8958C76.2671 55.8309 76.1842 55.7984 76.0774 55.7984C76.0058 55.7984 75.9416 55.8141 75.8848 55.8454C75.8288 55.8761 75.7848 55.9205 75.7527 55.9787C75.7213 56.0369 75.7057 56.1075 75.7057 56.1903Z"
                fill="#291B25"
              />
              <path
                d="M77.9957 57.2318C77.8232 57.2318 77.6743 57.1959 77.5489 57.1243C77.4242 57.0519 77.3283 56.9496 77.2611 56.8174C77.1939 56.6846 77.1603 56.5282 77.1603 56.3482C77.1603 56.1713 77.1939 56.016 77.2611 55.8824C77.329 55.748 77.4238 55.6435 77.5455 55.5689C77.6672 55.4935 77.8101 55.4558 77.9744 55.4558C78.0804 55.4558 78.1804 55.4729 78.2745 55.5073C78.3693 55.5409 78.4529 55.5931 78.5253 55.664C78.5985 55.735 78.656 55.8253 78.6978 55.935C78.7396 56.044 78.7605 56.1739 78.7605 56.3247V56.449H77.3507V56.1758H78.3719C78.3712 56.0981 78.3544 56.0291 78.3215 55.9686C78.2887 55.9074 78.2428 55.8593 78.1838 55.8242C78.1256 55.7891 78.0576 55.7715 77.98 55.7715C77.8971 55.7715 77.8243 55.7917 77.7616 55.832C77.6989 55.8716 77.65 55.9238 77.6149 55.9888C77.5806 56.053 77.563 56.1235 77.5623 56.2004V56.4389C77.5623 56.539 77.5806 56.6248 77.6172 56.6965C77.6537 56.7674 77.7049 56.8219 77.7706 56.86C77.8363 56.8973 77.9132 56.916 78.0013 56.916C78.0602 56.916 78.1136 56.9078 78.1614 56.8913C78.2092 56.8742 78.2506 56.8492 78.2857 56.8163C78.3208 56.7835 78.3473 56.7428 78.3652 56.6943L78.7437 56.7368C78.7198 56.8368 78.6743 56.9242 78.6071 56.9988C78.5406 57.0728 78.4555 57.1302 78.3518 57.1713C78.248 57.2116 78.1293 57.2318 77.9957 57.2318Z"
                fill="#291B25"
              />
              <path
                d="M79.1034 57.1982V55.4781H79.4965V55.7648H79.5144C79.5458 55.6655 79.5995 55.589 79.6757 55.5353C79.7525 55.4808 79.8403 55.4535 79.9388 55.4535C79.9612 55.4535 79.9862 55.4546 80.0138 55.4569C80.0422 55.4584 80.0657 55.461 80.0844 55.4647V55.8376C80.0672 55.8316 80.04 55.8264 80.0026 55.8219C79.9661 55.8167 79.9306 55.8141 79.8963 55.8141C79.8223 55.8141 79.7559 55.8301 79.6969 55.8622C79.6387 55.8936 79.5928 55.9373 79.5592 55.9933C79.5256 56.0492 79.5088 56.1138 79.5088 56.187V57.1982H79.1034Z"
                fill="#291B25"
              />
              <path
                d="M81.0443 57.2318C80.8719 57.2318 80.723 57.1959 80.5975 57.1243C80.4729 57.0519 80.3769 56.9496 80.3097 56.8174C80.2426 56.6846 80.209 56.5282 80.209 56.3482C80.209 56.1713 80.2426 56.016 80.3097 55.8824C80.3777 55.748 80.4725 55.6435 80.5942 55.5689C80.7159 55.4935 80.8588 55.4558 81.0231 55.4558C81.1291 55.4558 81.2291 55.4729 81.3232 55.5073C81.418 55.5409 81.5016 55.5931 81.574 55.664C81.6472 55.735 81.7047 55.8253 81.7465 55.935C81.7883 56.044 81.8092 56.1739 81.8092 56.3247V56.449H80.3993V56.1758H81.4206C81.4199 56.0981 81.4031 56.0291 81.3702 55.9686C81.3374 55.9074 81.2914 55.8593 81.2325 55.8242C81.1742 55.7891 81.1063 55.7715 81.0287 55.7715C80.9458 55.7715 80.873 55.7917 80.8103 55.832C80.7476 55.8716 80.6987 55.9238 80.6636 55.9888C80.6293 56.053 80.6117 56.1235 80.611 56.2004V56.4389C80.611 56.539 80.6293 56.6248 80.6658 56.6965C80.7024 56.7674 80.7536 56.8219 80.8193 56.86C80.885 56.8973 80.9618 56.916 81.0499 56.916C81.1089 56.916 81.1623 56.9078 81.2101 56.8913C81.2579 56.8742 81.2993 56.8492 81.3344 56.8163C81.3695 56.7835 81.396 56.7428 81.4139 56.6943L81.7924 56.7368C81.7685 56.8368 81.7229 56.9242 81.6558 56.9988C81.5893 57.0728 81.5042 57.1302 81.4004 57.1713C81.2967 57.2116 81.178 57.2318 81.0443 57.2318Z"
                fill="#291B25"
              />
              <path
                d="M22.4484 45.0185C22.4484 45.8478 22.0895 46.4779 21.3717 46.9085C21.7625 47.0521 22.0895 47.2993 22.3527 47.6502C22.6158 48.0011 22.7474 48.4995 22.7474 49.1455C22.7474 49.7835 22.5082 50.2899 22.0297 50.6647C21.5592 51.0395 20.8813 51.2269 19.9961 51.2269H17.173C17.0374 51.2269 16.9257 51.1831 16.838 51.0953C16.7503 50.9996 16.7064 50.876 16.7064 50.7245V43.0686C16.7064 42.9809 16.7184 42.925 16.7423 42.9011C16.7742 42.8692 16.834 42.8533 16.9217 42.8533H19.6492C21.5153 42.8533 22.4484 43.575 22.4484 45.0185ZM19.0032 44.7912V46.3582H19.063C19.8286 46.3582 20.2114 46.103 20.2114 45.5927C20.2114 45.3135 20.1356 45.1102 19.9841 44.9826C19.8406 44.855 19.5973 44.7912 19.2544 44.7912H19.0032ZM19.0032 47.7698V49.3249H19.2185C19.5614 49.3249 19.8127 49.2611 19.9722 49.1335C20.1316 49.0059 20.2114 48.8026 20.2114 48.5234C20.2114 48.2443 20.1356 48.0489 19.9841 47.9373C19.8406 47.8256 19.5973 47.7698 19.2544 47.7698H19.0032Z"
                fill="black"
              />
              <path
                d="M27.2303 51.3466C26.1138 51.3466 25.2007 50.9797 24.4909 50.246C23.7891 49.5123 23.4382 48.4437 23.4382 47.0401C23.4382 45.6285 23.7931 44.5599 24.5029 43.8342C25.2206 43.1085 26.1417 42.7456 27.2662 42.7456C28.3986 42.7456 29.3118 43.1045 30.0056 43.8222C30.6994 44.532 31.0463 45.6126 31.0463 47.064C31.0463 48.5075 30.6914 49.5841 29.9817 50.2939C29.2719 50.9957 28.3548 51.3466 27.2303 51.3466ZM27.2423 45.0424C26.8595 45.0424 26.5365 45.2178 26.2733 45.5687C26.0181 45.9196 25.8905 46.4141 25.8905 47.0521C25.8905 47.6821 26.0141 48.1686 26.2614 48.5115C26.5086 48.8464 26.8316 49.0139 27.2303 49.0139C27.637 49.0139 27.964 48.8424 28.2112 48.4995C28.4664 48.1566 28.594 47.6661 28.594 47.0281C28.594 46.3901 28.4624 45.8997 28.1993 45.5568C27.9441 45.2138 27.6251 45.0424 27.2423 45.0424Z"
                fill="black"
              />
              <path
                d="M35.5596 51.3466C34.4431 51.3466 33.53 50.9797 32.8202 50.246C32.1184 49.5123 31.7675 48.4437 31.7675 47.0401C31.7675 45.6285 32.1224 44.5599 32.8322 43.8342C33.5499 43.1085 34.471 42.7456 35.5955 42.7456C36.7279 42.7456 37.641 43.1045 38.3349 43.8222C39.0287 44.532 39.3756 45.6126 39.3756 47.064C39.3756 48.5075 39.0207 49.5841 38.3109 50.2939C37.6012 50.9957 36.6841 51.3466 35.5596 51.3466ZM35.5716 45.0424C35.1888 45.0424 34.8658 45.2178 34.6026 45.5687C34.3474 45.9196 34.2198 46.4141 34.2198 47.0521C34.2198 47.6821 34.3434 48.1686 34.5906 48.5115C34.8379 48.8464 35.1608 49.0139 35.5596 49.0139C35.9663 49.0139 36.2933 48.8424 36.5405 48.4995C36.7957 48.1566 36.9233 47.6661 36.9233 47.0281C36.9233 46.3901 36.7917 45.8997 36.5285 45.5568C36.2733 45.2138 35.9544 45.0424 35.5716 45.0424Z"
                fill="black"
              />
              <path
                d="M42.7285 51.0595C42.7285 51.1791 42.3537 51.2389 41.6041 51.2389L40.9342 51.203C40.5354 51.1711 40.336 51.1153 40.336 51.0355V43.0088C40.336 42.8732 40.7348 42.8054 41.5323 42.8054C42.3298 42.8054 42.7285 42.8732 42.7285 43.0088V46.0711L44.1879 43.0088C44.2438 42.8971 44.5627 42.8413 45.1449 42.8413C46.2056 42.8413 46.7638 42.933 46.8196 43.1164C46.8196 43.1324 46.8157 43.1483 46.8077 43.1643L44.7262 46.9205L47.1426 50.258C47.1426 50.2739 47.0669 50.3417 46.9154 50.4613C46.5485 50.7803 46.1179 51.0315 45.6234 51.215C45.4719 51.2708 45.3204 51.2987 45.1688 51.2987L44.8817 51.2748C44.6265 51.211 44.4272 51.0475 44.2836 50.7843L42.9199 48.1765H42.7285V51.0595Z"
                fill="black"
              />
              <path
                d="M53.3764 51.2509C52.6826 51.2509 52.3078 51.1392 52.252 50.9159L51.8572 49.3728H49.9552L49.6083 50.8561C49.5604 51.1033 49.1776 51.2269 48.4599 51.2269C48.0771 51.2269 47.794 51.207 47.6106 51.1671C47.4271 51.1193 47.3354 51.0834 47.3354 51.0595L49.4528 42.9609C49.4528 42.8971 49.9991 42.8652 51.0916 42.8652C52.1842 42.8652 52.7305 42.8971 52.7305 42.9609L54.8 51.0714C54.8 51.1272 54.6165 51.1711 54.2497 51.203C53.8828 51.2349 53.5918 51.2509 53.3764 51.2509ZM50.2543 47.8535H51.5103L50.972 45.3773H50.9002L50.2543 47.8535Z"
                fill="black"
              />
              <path
                d="M59.014 42.7456C59.5962 42.7456 60.1066 42.8293 60.5452 42.9968C60.9918 43.1563 61.2151 43.3756 61.2151 43.6547C61.2151 43.9339 61.1074 44.2808 60.8921 44.6955C60.6847 45.1022 60.5093 45.3056 60.3657 45.3056C60.3259 45.3056 60.278 45.2856 60.2222 45.2457C60.1743 45.1979 60.0547 45.15 59.8633 45.1022C59.6799 45.0464 59.5204 45.0185 59.3848 45.0185C58.9223 45.0185 58.5475 45.1819 58.2604 45.5089C57.9812 45.8359 57.8417 46.3383 57.8417 47.0162C57.8417 47.6861 57.9852 48.1845 58.2723 48.5115C58.5674 48.8384 58.9382 49.0019 59.3848 49.0019C59.5682 49.0019 59.7716 48.978 59.9949 48.9302C60.2262 48.8743 60.3897 48.7986 60.4854 48.7029C60.5013 48.6869 60.5332 48.6789 60.5811 48.6789C60.6289 48.6789 60.7166 48.7707 60.8442 48.9541C60.9798 49.1295 61.1034 49.3648 61.2151 49.6599C61.3267 49.947 61.3825 50.1703 61.3825 50.3298C61.3825 50.6408 61.1433 50.888 60.6648 51.0714C60.1863 51.2548 59.6201 51.3466 58.9661 51.3466C57.9134 51.3466 57.0482 50.9757 56.3703 50.2341C55.6924 49.4924 55.3535 48.4477 55.3535 47.0999C55.3535 45.7442 55.7004 44.6795 56.3942 43.906C57.096 43.1324 57.9693 42.7456 59.014 42.7456Z"
                fill="black"
              />
              <path
                d="M64.583 51.0595C64.583 51.1871 64.2042 51.2509 63.4466 51.2509C62.681 51.2509 62.2982 51.191 62.2982 51.0714V43.272C62.2982 42.9928 62.4458 42.8533 62.7408 42.8533H65.0256C67.123 42.8533 68.1717 43.6707 68.1717 45.3056C68.1717 45.8 68.076 46.2506 67.8846 46.6573C67.6933 47.056 67.4221 47.375 67.0712 47.6143L68.5785 50.1264C68.5147 50.3178 68.3073 50.5371 67.9564 50.7843C67.4779 51.1272 67.0832 51.2987 66.7721 51.2987C66.4611 51.2987 66.2299 51.1871 66.0783 50.9638L64.9539 48.344H64.583V51.0595ZM64.583 44.9706V46.765H64.6428C65.4005 46.765 65.7793 46.45 65.7793 45.8199C65.7793 45.5328 65.7035 45.3215 65.552 45.1859C65.4084 45.0424 65.1692 44.9706 64.8342 44.9706H64.583Z"
                fill="black"
              />
              <path
                d="M70.1437 49.1694V44.9108H69.2943C69.1588 44.9108 69.0631 44.7393 69.0072 44.3964C68.9833 44.2289 68.9714 44.0575 68.9714 43.882C68.9714 43.7066 68.9833 43.5351 69.0072 43.3676C69.0631 43.0247 69.1588 42.8533 69.2943 42.8533H73.3137C73.4493 42.8533 73.541 43.0247 73.5888 43.3676C73.6207 43.5351 73.6367 43.7066 73.6367 43.882C73.6367 44.0575 73.6207 44.2289 73.5888 44.3964C73.541 44.7393 73.4493 44.9108 73.3137 44.9108H72.5122V49.1694H73.3496C73.4852 49.1694 73.5809 49.3409 73.6367 49.6838C73.6686 49.8513 73.6845 50.0227 73.6845 50.1982C73.6845 50.3736 73.6686 50.5451 73.6367 50.7125C73.5809 51.0555 73.4852 51.2269 73.3496 51.2269H69.3183C69.1827 51.2269 69.091 51.0555 69.0431 50.7125C69.0112 50.5451 68.9953 50.3736 68.9953 50.1982C68.9953 50.0227 69.0112 49.8513 69.0431 49.6838C69.091 49.3409 69.1827 49.1694 69.3183 49.1694H70.1437Z"
                fill="black"
              />
              <path
                d="M80.3561 45.0185C80.3561 45.8478 79.9972 46.4779 79.2795 46.9085C79.6702 47.0521 79.9972 47.2993 80.2604 47.6502C80.5236 48.0011 80.6551 48.4995 80.6551 49.1455C80.6551 49.7835 80.4159 50.2899 79.9374 50.6647C79.4669 51.0395 78.789 51.2269 77.9038 51.2269H75.0807C74.9451 51.2269 74.8335 51.1831 74.7457 51.0953C74.658 50.9996 74.6141 50.876 74.6141 50.7245V43.0686C74.6141 42.9809 74.6261 42.925 74.65 42.9011C74.6819 42.8692 74.7417 42.8533 74.8295 42.8533H77.5569C79.423 42.8533 80.3561 43.575 80.3561 45.0185ZM76.9109 44.7912V46.3582H76.9707C77.7363 46.3582 78.1191 46.103 78.1191 45.5927C78.1191 45.3135 78.0434 45.1102 77.8918 44.9826C77.7483 44.855 77.505 44.7912 77.1621 44.7912H76.9109ZM76.9109 47.7698V49.3249H77.1262C77.4692 49.3249 77.7204 49.2611 77.8799 49.1335C78.0394 49.0059 78.1191 48.8026 78.1191 48.5234C78.1191 48.2443 78.0434 48.0489 77.8918 47.9373C77.7483 47.8256 77.505 47.7698 77.1621 47.7698H76.9109Z"
                fill="black"
              />
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
