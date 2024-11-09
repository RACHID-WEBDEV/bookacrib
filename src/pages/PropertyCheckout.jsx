/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/forms/Button";
import DatePicker from "../components/forms/DatePicker";
import { getData, postData, removeData } from "../utils/api";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import ErrorStatus from "../components/forms/ErrorStatus";
// import { fetchProperty } from "../../../Redux/property/propertyThunk";
import Slider from "react-slick";
import { formatDateOnly, formatNumber } from "../lib/constants";
import CustomSelect from "../components/forms/Select/CustomSelect";
import Cookies from "js-cookie";
// import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
// import ErrorStatus from "../../../components/forms/ErrorStatus";

import CustomCheckboxGroup from "../components/forms/Checkbox/CustomCheckboxGroup";
import toast from "react-hot-toast";
import SmallSpinner from "../components/Loading/SmallSpinner";
import { formateCheckDate } from "../utils/constant";
import {
  PayStackSvg,
  QuestionMarkIcon,
  SuccessCheckIcon,
} from "../assets/SvgIcons";
import HookForm from "../components/forms/Form";
import { Input } from "../components/forms/Input";
import { EmptySchema } from "../schema/authSchema";
import Modal from "../components/Modal/Modal";

// import PropertyApproval from "./PropertyApproval";

const PropertyCheckout = () => {
  const [checked, setChecked] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams(); // Type assertion for id

  const [loadingProperty, setLoadingProperty] = useState(false);
  const [errorProperty, setErrorProperty] = useState(null);
  const [viewPropery, setViewPropery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCancelBooking, setLoadingCancelBooking] = useState(false);
  const [loadingPayStack, setLoadingPayStack] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const [selectedOriginCountry, setSelectedOriginCountry] = useState(null);

  console.log("Cache Property:", viewPropery);

  const { currentUser, companyId, switchToCompany } = useSelector(
    (state) => state.auth
  );

  const uniqueId = Cookies.get("bookacrib_uniqueId");

  //   console.log("currentUser:", currentUser?.uuid);
  //   console.log("uniqueId:", uniqueId);

  const handleCachePropery = async () => {
    setLoadingProperty(true);
    try {
      const response = await getData(
        `/bookacrib-api-routes/v1/properties/get-booking-from-storage?unique_id=${
          currentUser?.uuid || uniqueId
        }`
      );
      setViewPropery(response);
      // console.log(response);
    } catch (error) {
      setErrorProperty(error);
    } finally {
      setLoadingProperty(false);
    }
  };

  useEffect(() => {
    handleCachePropery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const date = new Date();
  // console.log("date:", date);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(date);
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(date);

  //   const sliderForHomeRef = useRef(null);
  //   const sliderNavHomeRef = useRef(null);

  //   const settingsFor = {
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     arrows: false,
  //     fade: true,
  //     asNavFor: sliderNavHomeRef.current,
  //   };

  //   const settingsNav = {
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     asNavFor: sliderForHomeRef.current,
  //     dots: false,
  //     centerMode: true,
  //     focusOnSelect: true,
  //   };

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

  //   const featureFilter = viewPropery?.data?.features?.map(
  //     (feature, featureIndex) => ({
  //       id: `feature${featureIndex * 2}`,
  //       name: feature.name,
  //       price: feature.price,
  //       label: `${capitalizeFirstLetter(feature.name)}`,
  //     })
  //   );

  //   const features = selectedItems?.map((feature) => ({
  //     name: feature?.name,
  //     price: feature?.price,
  //   }));

  //   const totalFeaturePrice = features?.reduce(
  //     (acc, current) => acc + current?.price,
  //     0
  //   );

  //   const totalPrice = viewPropery?.data?.price + totalFeaturePrice;

  //   let discount = viewPropery?.data?.discount; // 5% discount

  //   let tax_amount = viewPropery?.data?.tax_amount;
  //   // Calculate the discount amount as a percentage of totalPrice
  //   const calcDiscount = (discount / 100) * totalPrice;

  //   const priceAfterDiscount = totalPrice - calcDiscount;

  //   const calcTaxAmount = (tax_amount / 100) * priceAfterDiscount;

  //   // console.log("Discount Amount:", calcDiscount);

  //   // Calculate the final price after applying the discount
  //   const finalPrice = priceAfterDiscount + calcTaxAmount;

  // console.log("Final Price after Discount:", finalPrice);

  // console.log("Check date:", selectedCheckInDate);

  const checkIn = formateCheckDate(selectedCheckInDate);
  const checkOut = formateCheckDate(selectedCheckOutDate);

  // console.log("selectedMinor :", selectedMinor?.minor_count);
  // console.log("checkOut :", checkOut);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Step 2: Submit Form Data
    const filteredFormData = {
      unique_id: currentUser?.uuid ? currentUser?.uuid : uniqueId,
      //   property_id: uuid,
      //   features: features,
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

      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        // navigate("/admin/property/all-property");
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

  const handleCancelBooking = async () => {
    setLoadingCancelBooking(true);
    try {
      const result = await removeData(
        `bookacrib-api-routes/v1/properties/remove-booking-from-storage?unique_id=${
          currentUser?.uuid || uniqueId
        }`
      );

      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        navigate("/");
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
      setLoadingCancelBooking(false);
      setShowModal(false);
    }
  };

  //   const handleInitatePayment = async () => {
  //     try {
  //       const result = await postData(
  //         `/bookacrib-api-routes/v1/properties/checkout-booking`
  //       );

  //       if (result.status >= 200 && result.status <= 300) {
  //         toast.success(result?.message);
  //         // navigate("/");
  //       }
  //     } catch (error) {
  //       console.error("Create Error:", error);
  //       if (
  //         (error?.response?.data?.status >= 400 &&
  //           error?.response?.data?.status <= 499 &&
  //           error?.response?.data?.errors) ||
  //         (error?.response?.data?.status_code >= 400 &&
  //           error?.response?.data?.status_code <= 499 &&
  //           error?.response?.data?.errors)
  //       ) {
  //         const errorMessages = Object.values(error?.response?.data?.errors)
  //           .flat()
  //           .join(", ");
  //         toast.error(errorMessages, { duration: 6000 });
  //       } else {
  //         toast.error(error?.response?.data?.message, { duration: 6000 });
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleInitiatePaystackGateway = async () => {
    const uniqueIdData = {
      unique_id: currentUser?.uuid ? currentUser?.uuid : uniqueId,
    };
    setLoadingPayStack(true);

    try {
      const result = await postData(
        `bookacrib-api-routes/v1/properties/checkout-booking`,
        uniqueIdData
      );

      // console.log("success:", result);
      if (
        (result?.status >= 200 && result?.status <= 300) ||
        (result?.status_code >= 200 && result?.status_code <= 300)
      ) {
        toast.success(result.message);
        window.open(
          result?.data?.initialize_payment?.payment_authorization_url
        );
        // window.open(result?.data?.payment_url, "_blank");
        // navigate(result?.data?.payment_url);
      }
    } catch (error) {
      console.error("Paystack Error:", error);

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
    }
    setLoadingPayStack(false);
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    //  dispatch(loginThunk(data));
    // navigate("/dashboard");
  };
  return (
    <>
      {loadingProperty ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : errorProperty ? (
        <ErrorStatus
          message={JSON.stringify(errorProperty?.response?.data?.message)}
          statusCode={errorProperty?.status_code || errorProperty?.status}
          link="/"
          //   reload
        />
      ) : (
        <section className="bg- xl:pb-[100px] pb-[70px] pt-24">
          {/* <div className=" flex items-center justify-between flex-wrap gap-4 pb-4">
            <p className=" lg:text-2xl font-bold text-gray-900">
              Book Property
            </p>
            <div className="">
              <Button
              // onClick={() => setShowModal(true)}
              >
                Approved Property
              </Button>
            </div>
          </div> */}
          <div className=" p-4 bg-gray-100 mb-4 rounded">
            <p className=" text font-medium text-gray-900">
              Book Property Details
              {/* {property?.data?.uuid} */}
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center mx-auto 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px]">
            <div className="flex flex-wrap w-full mb-[-24px]">
              <div className="order-last lg:order-first lg:w-[60%] w-full  mb-[24px] ">
                <div className="lh-room-details px-4">
                  <div className=" flex items-center  gap-4 justify-between flex-wrap pb-6">
                    <div className="">
                      <h4 className=" text-gray-700 pt-[10px] font-bold lg:text-lg">
                        {viewPropery?.data?.reference_code}
                      </h4>
                      <p className=" text-gray-600 text-sm ">
                        Booking Ticket Number
                      </p>
                    </div>
                    <div className=" lg:text-right">
                      <h4 className=" text-gray-700 pt-[10px] font-bold lg:text-lg">
                        NGN{" "}
                        {viewPropery?.data?.sub_total_after_discount_and_tax}
                      </h4>
                      <p className=" text-gray-600 text-sm ">
                        Total Amount to Pay
                      </p>
                    </div>
                  </div>

                  <div id="PaymentMethod" className="scroll-mt-24">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                      <div className="p-6 flex flex-col sm:flex-row items-start">
                        <span className="hidden sm:block">
                          <svg
                            className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.92969 15.8792L15.8797 3.9292"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.1013 18.2791L12.3013 17.0791"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.793 15.5887L16.183 13.1987"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 21.9985H22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <div className="sm:ml-8">
                          <h3 className=" text-slate-700 dark:text-slate-400 flex ">
                            <span className="uppercase tracking-tight">
                              PAYMENT METHOD
                            </span>
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2.5"
                              stroke="currentColor"
                              className="w-5 h-5 ml-3 text-slate-900"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </h3>
                          <div className="font-semibold mt-1 text-base text-gray-600">
                            <span className="">Online Payment</span>
                            {/* <span className="ml-3">xxx-xxx-xx55</span> */}
                          </div>
                        </div>
                        <button
                          disabled
                          className=" cursor-not-allowed py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
                        >
                          Change
                        </button>
                      </div>

                      {/* <HookForm onSubmit={onSubmit} schema={EmptySchema}>
                        <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-6 ">
                          <div>
                            <div className="flex items-start space-x-4 sm:space-x-6">
                              <div className="flex items-center text-sm sm:text-base pt-3.5">
                                <input
                                  id="Credit-Card"
                                  className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                                  type="radio"
                                  defaultValue="Credit-Card"
                                  defaultChecked=""
                                  name="payment-method"
                                />
                              </div>
                              <div className="flex-1">
                                <label
                                  htmlFor="Credit-Card"
                                  className="flex items-center space-x-4 sm:space-x-6"
                                >
                                  <div className="p-2.5 rounded-xl border border-slate-600 dark:border-slate-300">
                                    <svg
                                      className="w-6 h-6 sm:w-7 sm:h-7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M2 12.6101H19"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeMiterlimit={10}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M19 10.28V17.43C18.97 20.28 18.19 21 15.22 21H5.78003C2.76003 21 2 20.2501 2 17.2701V10.28C2 7.58005 2.63 6.71005 5 6.57005C5.24 6.56005 5.50003 6.55005 5.78003 6.55005H15.22C18.24 6.55005 19 7.30005 19 10.28Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M22 6.73V13.72C22 16.42 21.37 17.29 19 17.43V10.28C19 7.3 18.24 6.55 15.22 6.55H5.78003C5.50003 6.55 5.24 6.56 5 6.57C5.03 3.72 5.81003 3 8.78003 3H18.22C21.24 3 22 3.75 22 6.73Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M5.25 17.8101H6.96997"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeMiterlimit={10}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M9.10986 17.8101H12.5499"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeMiterlimit={10}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <p className="font-medium">
                                    Debit / Credit Card
                                  </p>
                                </label>
                                <div className="mt-6 mb-4 space-y-3 sm:space-y-5 block">
                                  <div className="max-w-lg">
                                    <Input
                                      name="card_number"
                                      label="Card number"
                                      //   placeholder="|"
                                    />
                                  </div>
                                  <div className="max-w-lg">
                                    <Input
                                      label="Name on Card"
                                      name="name_on_card"
                                      //   placeholder="|"
                                    />
                                  </div>
                                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                    <div className="sm:w-2/3">
                                      <Input
                                        name="card_number"
                                        label="Expiration date (MM/YY)"
                                        placeholder="MM/YY"
                                        autoComplete="off"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <Input
                                        name="cvc"
                                        label="CVC"
                                        autoComplete="off"
                                        placeholder="CVC"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start space-x-4 sm:space-x-6">
                              <div className="flex items-center text-sm sm:text-base pt-3.5">
                                <input
                                  id="Internet-banking"
                                  className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                                  type="radio"
                                  defaultValue="Internet-banking"
                                  name="payment-method"
                                />
                              </div>
                              <div className="flex-1">
                                <label
                                  htmlFor="Internet-banking"
                                  className="flex items-center space-x-4 sm:space-x-6"
                                >
                                  <div className="p-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-600">
                                    <svg
                                      className="w-6 h-6 sm:w-7 sm:h-7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M15 3C16.95 8.84 16.95 15.16 15 21"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <p className="font-medium">
                                    Internet banking
                                  </p>
                                </label>
                                <div className="mt-6 mb-4 ">
                                  <p className="text-sm dark:text-slate-300">
                                    Your Booking will be delivered to you after
                                    you transfer to:
                                  </p>
                                  <ul className="mt-3.5 text-sm text-slate-500 dark:text-slate-400 space-y-2">
                                    <li>
                                      <h3 className="text-base text-slate-800 dark:text-slate-200 font-semibold mb-1">
                                        Bookacrib Limited
                                      </h3>
                                    </li>
                                    <li>
                                      {" "}
                                      Bank name:{" "}
                                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                                        Example Bank Name
                                      </span>
                                    </li>
                                    <li>
                                      {" "}
                                      Account number:{" "}
                                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                                        555 888 777 39
                                      </span>
                                    </li>
                                    <li>
                                      {" "}
                                      Sort code:{" "}
                                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                                        999
                                      </span>
                                    </li>
                                    
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start space-x-4 sm:space-x-6">
                              <div className="flex items-center text-sm sm:text-base pt-3.5">
                                <input
                                  id="Wallet"
                                  className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                                  type="radio"
                                  defaultValue="Wallet"
                                  name="payment-method"
                                />
                              </div>
                              <div className="flex-1">
                                <label
                                  htmlFor="Wallet"
                                  className="flex items-center space-x-4 sm:space-x-6 "
                                >
                                  <div className="p-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-600">
                                    <svg
                                      className="w-6 h-6 sm:w-7 sm:h-7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M7 12H14"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <p className="font-medium">Wallet Payment</p>
                                </label>
                                <div className="mt-6 mb-4 space-y-6 ">
                                  <div className="text-sm prose dark:prose-invert">
                                    <p>
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Itaque dolore quod quas
                                      fugit perspiciatis architecto, temporibus
                                      quos ducimus libero explicabo?
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </HookForm> */}
                    </div>
                  </div>
                  <div className=" space-y-0 p-6 border border-gray-200 rounded-lg my-6">
                    <div className="pb-5">
                      <p className="text-lg font-semibold text-gray-900 capitalize">
                        Deposit Channels
                      </p>
                      <p className="text-sm text-gray-600 ">
                        How Would you like to make your payment?
                      </p>
                    </div>
                    <div
                      //   onClick={handlePaystackGateway}
                      className=" flex items-center gap-2 cursor-pointer border-b last:border-none pb-3.5"
                    >
                      <PayStackSvg />
                      <p className="  font-medium text-gray-600">Paystack</p>
                      {/* <div className="ms-4">
                        {loadingPayStack && <SmallSpinner />}
                      </div> */}
                    </div>
                  </div>
                  <div className=" pt-0">
                    <div className=" space-y-4">
                      <Button
                        size="lg"
                        type="submit"
                        onClick={() => handleInitiatePaystackGateway()}
                        leftIcon={loadingPayStack && <SmallSpinner />}
                        className=" w-full justify-center"
                      >
                        Initiate Payment Gateway
                      </Button>
                      <Button
                        onClick={() => setShowModal(true)}
                        outline={true}
                        size="lg"
                        color="primaryAlt"
                        type="submit"
                        className=" w-full justify-center"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-[40%] w-full lg:px-[12px] mb-[24px] ">
                <div className="lh-side-room bg-gray-100 rounded-[15px] sticky top-[80px]">
                  {/* <div className="flex items-center justify-end px-4 pt-6 gap-1.5 text-sm text-gray-500 ">
                    <span className=" capitalize">Price </span>
                    <span className="">|</span>
                    <span className="text-gray-800 font-semibold text-xl !leading-none">
                     
                      NHGF
                    </span>
                  </div> */}
                  {/* <h4 className="lh-room-inner-heading p-[20px] text-[18px] text-[#000] font-bold border-b border-solid border-[#e3e1e1]">
                    Property Details
                  </h4> */}
                  <div className="lh-side-reservation pt-4 px-3 md:px-4 lg:px-6 pb-[24px]">
                    <form onSubmit={handleSubmit}>
                      <div className=" relative space-y-2">
                        <div className="">
                          <label className="py-2 block leading-[18px] text-[#777] ">
                            Booking Details
                          </label>
                          <div className="pt-2">
                            <img
                              src={viewPropery?.data?.property?.images[0]}
                              alt="propery Image"
                              className="w-full object-cover h-64 lg:h-80 rounded-t-xl"
                            />
                            <div className="p-4  shadow-sm bg-white ">
                              <p className=" text-xl font-medium text-gray-900">
                                {viewPropery?.data?.property?.name}
                              </p>
                              <label className="py-2 block leading-[18px] text-[#777] capitalize ">
                                {viewPropery?.data?.property?.room_type?.name}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="  relative pt-6">
                        <label className="py-2 block leading-[18px] text-[#777] ">
                          Booking Summary
                        </label>
                      </div>
                      <div className="space-y-3 pt-3">
                        <div className=" grid grid-cols-2 gap-4">
                          <div className=" relative flex flex-col justify-between gap-px text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Check-In</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {formatDateOnly(
                                viewPropery?.data?.checkin_period
                              )}
                            </h4>
                          </div>

                          <div className=" relative flex flex-col justify-between gap-px text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Check-Out</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {formatDateOnly(
                                viewPropery?.data?.checkout_period
                              )}
                            </h4>
                          </div>
                        </div>
                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Total Persons</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {viewPropery?.data?.adult_count +
                              viewPropery?.data?.minor_count}
                          </h4>
                        </div>
                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Price</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {formatNumber(
                              Number(viewPropery?.data?.property?.price)
                            )}
                          </h4>
                        </div>
                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Total Features Price</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {`₦${formatNumber(
                              Number(viewPropery?.data?.feature_total_price)
                            )}`}
                          </h4>
                        </div>

                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Sub Total Before Discount</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {` ₦${formatNumber(
                              Number(
                                viewPropery?.data?.sub_total_before_discount.toFixed(
                                  2
                                )
                              )
                            )}`}
                          </h4>
                        </div>
                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Discount Amount</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {`- ₦${formatNumber(
                              Number(
                                viewPropery?.data?.discount_amount.toFixed(2)
                              )
                            )}`}
                          </h4>
                        </div>

                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Sub Total After Discount</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {` ₦${formatNumber(
                              Number(
                                viewPropery?.data?.sub_total_after_discount.toFixed(
                                  2
                                )
                              )
                            )}`}
                          </h4>
                        </div>
                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Tax Amount</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {`₦${formatNumber(
                              Number(
                                viewPropery?.data?.taxable_amount.toFixed(2)
                              )
                            )}`}
                          </h4>
                        </div>
                        {/* <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Discount Amount</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {`- ₦${formatNumber(
                              Number(
                                viewPropery?.data?.discount_amount.toFixed(2)
                              )
                            )}`}
                          </h4>
                        </div> */}
                        <div className=" relative flex items-center justify-between text-gray-900 text-lg font-semibold px-4 py-1 rounded-md ">
                          <p> Total Amount</p>
                          <h4 className="  ">{`₦${viewPropery?.data?.sub_total_after_discount_and_tax}`}</h4>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {showModal && (
        <Modal
          //   handleModal={handleCancelBooking}
          setShowModal={setShowModal}
          title="Cancel Booking?"
          loading={loadingCancelBooking}
          description="Are you sure you want to cancel the booking you are about to complete?"
          icon={<QuestionMarkIcon />}
          buttons={
            <div className=" flex items-center justify-center flex-wrap gap-4">
              <Button
                onClick={() => handleCancelBooking()}
                leftIcon={loading && <SmallSpinner />}
              >
                Yes, I&apos;m sure
              </Button>

              <Button
                color="primaryAlt"
                outline
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          }
        />
      )}
    </>
  );
};

export default PropertyCheckout;
