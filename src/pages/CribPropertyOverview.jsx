/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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

import CustomCheckboxGroup from "../components/forms/Checkbox/CustomCheckboxGroup";
import toast from "react-hot-toast";
import SmallSpinner from "../components/Loading/SmallSpinner";
import {
  capitalizeFirstLetter,
  formatDateTime,
  formateCheckDate,
  getBadgeColor,
} from "../utils/constant";
import { ThumbsCarousel } from "../components/ui/thumb-carousel";
import { MobileThumbsCarousel } from "../components/ui/thumb-carousel-mobile";
import Checkbox from "../components/shared/Checkbox/Checkbox";
import { Badge } from "../components/forms/Badge";

// import PropertyApproval from "./PropertyApproval";

const CribPropertyOverview = () => {
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

  const handleViewPropery = async () => {
    setLoadingProperty(true);
    try {
      const response = await getData(
        // `/bookacrib-api-routes/v1/properties/view-single-property-public?with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category&id=${uuid}`
        `/bookacrib-api-routes/v1/properties/view-single-property?id=${uuid}&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=city&with[]=category&with[]=roomType`
      );
      setViewPropery(response);
      // console.log(response);
    } catch (error) {
      setErrorProperty(error.response.data.message);
    } finally {
      setLoadingProperty(false);
    }
  };

  useEffect(() => {
    handleViewPropery();
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

  console.log("currentUser:", currentUser?.uuid);
  console.log("uniqueId:", uniqueId);

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
  return (
    <>
      {loadingProperty ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : errorProperty ? (
        <ErrorStatus
          message={JSON.stringify(errorProperty?.message)}
          statusCode={errorProperty?.status_code || errorProperty?.status}
          link="/"
          reload
        />
      ) : (
        <section className="bg- xl:pb-[100px] pb-[70px] ">
          <div className=" flex items-center justify-between flex-wrap gap-4 pb-4">
            <p className=" lg:text-2xl font-bold text-gray-900">
              Property Details
            </p>
            <div className=" flex items-center gap-2">
              <Link to={"/crib-owner/property/all-property"}>
                <Button color="primaryAlt">Back to Property</Button>
              </Link>
              <div className="">
                <Button
                  onClick={() =>
                    navigate(`/crib-owner/property/property-edit/${uuid}`)
                  }
                >
                  Edit Property
                </Button>
              </div>
            </div>
          </div>
          <div className=" p-4 bg-gray-100 mb-4 rounded">
            <p className=" text font-medium text-gray-900">
              Property ID: {viewPropery?.data?.uuid}
            </p>
          </div>
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
          {/* <div className=" p-4 bg-gray-100 mb-4 rounded">
            <p className=" text font-medium text-gray-900">
              Book Property Details
              
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
                      {viewPropery?.data?.images?.map((image, imagesIndex) => (
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
                        Property Images
                      </p>
                    </div>
                    <Slider {...settingsNav} ref={sliderNavHomeRef}>
                      {viewPropery?.data?.images?.map(
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
                      {viewPropery?.data?.name}
                    </h4>
                    <p className=" text-gray-600 text-sm ">
                      {viewPropery?.data?.address}
                    </p>
                  </div>
                  <div className="lh-room-details-contain pt-0">
                    <div className=" mt-[24px] bg-gray-100 p-4 rounded">
                      <h4 className="text- text-gray-800 font-medium border-b  border-[#e3e1e1] pb-[10px]">
                        Amenities
                      </h4>
                      <div className="flex flex-wrap">
                        <div className=" w-full pt-[15px] lg:pr-[12px] pr-[0]">
                          <ul className=" grid lg:grid-cols-3 gap-2">
                            {viewPropery?.data?.features?.map(
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
                          {viewPropery?.data?.description}
                        </p>
                      </div>
                    </div>

                    {/* <div className="lh-room-details-review pt-[24px]">
                      <div className="lh-room-review">
                        <h4 className="text-[18px] text-[#000] font-bold border-b border-solid border-[#e3e1e1] pb-[10px]">
                          Add A Review
                        </h4>
                        <p className="pb-[20px] pt-[15px]">
                          This is the dolor, sit amet consectetur adipisicing
                          elit. Accusamus sapiente consectetur debitis
                          blanditiis saepe commodi iste deleniti nisi nam
                          tenetur?
                        </p>
                      </div>
                      <form action="#">
                        <div className="lh-room-review-form pb-[15px]">
                          <label
                            htmlFor="firstname"
                            className="text-[16px] font-Cardo text-[#000] pb-[10px]"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            className="outline-0 h-[50px] pl-[20px] m-0 border border-solid border-[#e3e1e1] w-full rounded-[15px] bg-[#f7f5f1]"
                            required=""
                          />
                        </div>
                        <div className="lh-room-review-form pb-[15px]">
                          <label
                            htmlFor="email"
                            className="text-[16px] font-Cardo text-[#000] pb-[10px]"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="outline-0 h-[50px] pl-[20px] m-0 border border-solid border-[#e3e1e1] w-full rounded-[15px] bg-[#f7f5f1]"
                            required=""
                          />
                        </div>
                        <div className="lh-room-review-form pb-[15px]">
                          <label
                            htmlFor="textarea"
                            className="text-[16px] font-Cardo text-[#000] pb-[10px]"
                          >
                            Comment
                          </label>
                          <textarea
                            id="textarea"
                            className="outline-0 h-[120px] px-[20px] py-[10px] m-0 border border-solid border-[#e3e1e1] w-full rounded-[15px] bg-[#f7f5f1]"
                            defaultValue={""}
                          />
                        </div>
                        <div className="lh-room-review-form">
                          <label className="text-[16px] font-Cardo text-[#000] pb-[10px]">
                            Rating
                          </label>
                          <div className="lh-review-form-rating">
                            <i className="ri-star-fill text-[16px] text-primary-600" />
                            <i className="ri-star-fill text-[16px] text-primary-600" />
                            <i className="ri-star-fill text-[16px] text-primary-600" />
                            <i className="ri-star-fill text-[16px] text-primary-600" />
                            <i className="ri-star-fill text-[16px] text-primary-600" />
                          </div>
                        </div>
                        <div className="lh-room-review-buttons pt-[24px]">
                          <button
                            className="duration-[0.3s] ease-in-out border-[1px] border-solid border-PRIMARYtext-primary-600 px-[15px] py-[5px] leading-[28px] bg-PRIMARYtext-primary-600 text-[#fff] relative z-[2] text-[15px] font-medium tracking-[1px] rounded-[10px] hover:bg-inherit hover:text-primary-600"
                            type="submit"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="lg:w-[40%] w-full lg:px-[12px] mb-[24px] ">
                <div className="lh-side-room bg-gray-100 rounded-[15px] sticky top-[80px]">
                  <div className="flex items-center justify-end px-4 pt-6 gap-1.5 text-sm text-gray-500 ">
                    <span className=" capitalize">Price </span>
                    <span className="">|</span>
                    <span className="text-gray-800 font-semibold text-xl !leading-none">
                      NGN{formatNumber(Number(viewPropery?.data?.price))}
                    </span>
                  </div>
                  {/* <h4 className="lh-room-inner-heading p-[20px] text-[18px] text-[#000] font-bold border-b border-solid border-[#e3e1e1]">
                    Property Details
                  </h4> */}
                  <div className="lh-side-reservation pt-0 px-3 md:px-4 lg:px-6 pb-[24px]">
                    <form onSubmit={handleSubmit}>
                      <div className=" relative space-y-2">
                        <div className="">
                          <label className="py-2 block leading-[18px] text-[#777] ">
                            Property Details
                          </label>
                        </div>
                        <div className="space-y-3 pt-3">
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Category</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {viewPropery?.data?.category?.name}
                            </h4>
                          </div>
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Property Type</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {viewPropery?.data?.roomType?.name}
                            </h4>
                          </div>
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Status</p>
                            <Badge
                              rounded
                              className=" capitalize"
                              // leftIcon={<DotIcon />}
                              color={getBadgeColor(viewPropery?.data?.status)}
                              text={viewPropery?.data?.status}
                            ></Badge>
                          </div>
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Caution Fee</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {`₦${formatNumber(
                                Number(viewPropery?.data?.caution_fee || 0)
                              )}`}
                            </h4>
                          </div>

                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Discount</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {`${formatNumber(
                                Number(viewPropery?.data?.discount || 0)
                              )}% Discount`}
                            </h4>
                          </div>

                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>No. of Max Adult</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {viewPropery?.data?.adult_count} Adults
                            </h4>
                          </div>
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>No. of Max Minors</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {viewPropery?.data?.minor_count} Children
                            </h4>
                          </div>
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Availability</p>
                            <h4 className="text-gray-700 text-sm font-semibold capitalize ">
                              {viewPropery?.data?.availability}
                            </h4>
                          </div>
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>Country</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {viewPropery?.data?.country?.name}
                            </h4>
                          </div>
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>State</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {viewPropery?.data?.state?.name}
                            </h4>
                          </div>
                          <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                            <p>City</p>
                            <h4 className="text-gray-700 text-sm font-semibold ">
                              {viewPropery?.data?.city?.name}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="  relative pt-6">
                        <label className="py-2 block leading-[18px] text-[#777] ">
                          Initiator
                        </label>
                      </div>
                      <div className="space-y-3 pt-3">
                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Create By</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {viewPropery?.data?.initiator?.first_name}{" "}
                            {viewPropery?.data?.initiator?.last_name}
                          </h4>
                        </div>
                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Created Date</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {formatDateTime(viewPropery?.data?.created_at)}
                          </h4>
                        </div>
                        <div className=" relative flex items-center justify-between text-gray-500 text-sm bg-white p-4 rounded-md ">
                          <p>Updated Date</p>
                          <h4 className="text-gray-700 text-sm font-semibold ">
                            {formatDateTime(viewPropery?.data?.updated_at)}
                          </h4>
                        </div>

                        {/* <Button
                          size="lg"
                          type="submit"
                          leftIcon={loading && <SmallSpinner />}
                          className=" w-full justify-center"
                        >
                          Proceed to Payment
                        </Button> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* {showModal && (
        <PropertyApproval
          propertyId={property?.data?.uuid}
          setOpenModal={setShowModal}
        />
        
      )} */}
    </>
  );
};

export default CribPropertyOverview;
