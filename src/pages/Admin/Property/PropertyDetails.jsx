/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProperty } from "../../../Redux/property/propertyThunk";
import Slider from "react-slick";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorStatus from "../../../components/forms/ErrorStatus";
import { Button } from "../../../components/forms/Button";
import Checkbox from "src/components/forms/Checkbox/Checkbox.jsx";
import PropertyApproval from "./PropertyApproval";

const PropertyDetails = () => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const { uuid } = useParams(); // Type assertion for id
  const [showModal, setShowModal] = useState(false);

  const { propertys, property, loading, error } = useSelector(
    (state) => state.properties
  );
  useEffect(() => {
    dispatch(fetchProperty(uuid));
  }, [uuid, dispatch]);

  console.log("property: ", property);
  const sliderForRef = useRef(null);
  const sliderNavRef = useRef(null);

  const settingsFor = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: sliderNavRef.current,
  };

  const settingsNav = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: sliderForRef.current,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
  };

  return (
    <>
      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorStatus
          message={JSON.stringify(error?.message)}
          statusCode={error?.status_code || error?.status}
          link="/dashboard"
          reload
        />
      ) : (
        <section className="bg- xl:pb-[100px] pb-[70px]">
          <div className=" flex items-center justify-between flex-wrap gap-4 pb-4">
            <p className=" lg:text-2xl font-bold text-gray-900">
              Verify Property for approve
            </p>
            <div className="">
              <Button onClick={() => setShowModal(true)}>
                Approved Property
              </Button>
            </div>
          </div>
          <div className=" p-4 bg-gray-100 mb-4 rounded">
            <p className=" text font-medium text-gray-900">
              Request ID: {property?.data?.uuid}
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center mx-auto 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px]">
            <div className="flex flex-wrap w-full mb-[-24px]">
              <div
                className="lg:w-[60%] w-full  mb-[24px] aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration={2000}
              >
                <div className="lh-room-details">
                  <div className="lh-main-room w-full">
                    <Slider {...settingsFor} ref={sliderForRef}>
                      {property?.data?.images?.map((image, imagesIndex) => (
                        <div key={imagesIndex} className=" rounded-lg">
                          <img
                            src={image}
                            alt="Slide "
                            className=" rounded-lg lg:min-h-[500px] lg:w-full max-h-[500px]"
                          />
                        </div>
                      ))}
                    </Slider>
                    <div className=" w-full pt-4">
                      <p className=" text-gray-800 text-sm font-semibold pb-2">
                        Uploaded Images
                      </p>
                    </div>
                    <Slider {...settingsNav} ref={sliderNavRef}>
                      {property?.data?.images?.map(
                        (image, imagesSlideIndex) => (
                          <div
                            key={imagesSlideIndex}
                            className="pr-2 min-h-[76px] min-w-[76px]"
                          >
                            <img
                              src={image}
                              alt="Slide "
                              className=" rounded-lg min-h-[76px] min-w-[76px] lg:max-h-[150px] lg:w-full"
                            />
                          </div>
                        )
                      )}
                    </Slider>
                  </div>
                  <div className="lh-room-details-contain pt-0">
                    <h4 className="lh-room-details-contain-heading text-[#000] py-[10px] font-bold lg:text-[30px] md:text-[28px] sm:text-[26px] text-[24px]">
                      {property?.data?.name}
                    </h4>
                    <div className=" w-full pt-4">
                      <p className=" text-gray-800 text- font-semibold ">
                        Description
                      </p>
                    </div>
                    <p className="pt-2 text-sm">
                      {property?.data?.description}
                    </p>
                    <div className="lh-room-details-amenities pt-[24px]">
                      <h4 className="text-[18px] text-[#000] font-bold border-b border-solid border-[#e3e1e1] pb-[10px]">
                        Amenities
                      </h4>
                      <div className="flex flex-wrap">
                        <div className=" w-full pt-[15px] lg:pr-[12px] pr-[0]">
                          <ul className=" grid lg:grid-cols-3">
                            {property?.data?.features?.map(
                              (feature, indexFeature) => (
                                <li
                                  key={indexFeature}
                                  className="flex gap-1 items-center flex-wrap pb-[10px] capitalize"
                                >
                                  <code className="text-[17px] text-primary-600 ">
                                    *
                                  </code>
                                  {feature?.name}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="lh-room-details-rules pt-[24px]">
                      <div className="lh-room-rules">
                        <h4 className="text-[18px] text-[#000] font-bold border-b border-solid border-[#e3e1e1] pb-[10px]">
                          Company Details
                        </h4>
                        <div className="lh-cols-room pt-[15px]">
                          <ul className="">
                            <li className="flex gap-1 flex-wrap items-center pb-[10px]">
                              <code className="text-[17px] text-primary-600 ">
                                *
                              </code>
                              <b>Name:</b> {property?.data?.company?.name}
                            </li>
                            <li className="flex gap-1 flex-wrap items-center  pb-[10px]">
                              <code className="text-[17px] text-primary-600 ">
                                *
                              </code>
                              <b>Address:</b> {property?.data?.company?.address}
                            </li>
                            <li className="flex gap-1 flex-wrap items-center pb-[10px]">
                              <code className="text-[17px] text-primary-600 ">
                                *
                              </code>
                              <b>Phone Number:</b>{" "}
                              {property?.data?.company?.phone_number}
                            </li>
                            <li className="flex gap-1 flex-wrap items-center pb-[10px]">
                              <code className="text-[17px] text-primary-600 ">
                                *
                              </code>
                              <b>Email:</b> {property?.data?.company?.email}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="lh-room-details-review pt-[24px]">
                  <div className="lh-room-review">
                    <h4 className="text-[18px] text-[#000] font-bold border-b border-solid border-[#e3e1e1] pb-[10px]">
                      Add A Review
                    </h4>
                    <p className="pb-[20px] pt-[15px]">
                      This is the dolor, sit amet consectetur adipisicing elit.
                      Accusamus sapiente consectetur debitis blanditiis saepe
                      commodi iste deleniti nisi nam tenetur?
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
              <div
                className="lg:w-[40%] w-full lg:px-[12px] mb-[24px] "
                data-aos="fade-up"
                data-aos-duration={3000}
              >
                <div className="lh-side-room bg-gray-100 rounded-[15px] sticky top-[80px]">
                  <h4 className="lh-room-inner-heading p-[20px] text-[18px] text-[#000] font-bold border-b border-solid border-[#e3e1e1]">
                    Property Details
                  </h4>
                  <div className="lh-side-reservation pt-0 px-3 md:px-4 lg:px-6 pb-[24px]">
                    <form>
                      <div className=" relative space-y-2">
                        <div className="">
                          <label className="py-2 block leading-[18px] text-[#777] ">
                            Applicant
                          </label>
                          <h4 className="  text-base text-gray-900 font-medium px-3 py-3.5 rounded-md bg-white ">
                            {property?.data?.initiator?.first_name}{" "}
                            {property?.data?.initiator?.last_name}
                          </h4>
                        </div>

                        <div className="">
                          <label className="py-2 block leading-[18px] text-[#777] ">
                            Phone Number
                          </label>
                          <h4 className="  text-base text-gray-900 font-medium px-3 py-3.5 rounded-md bg-white ">
                            {property?.data?.initiator?.phone_number}
                          </h4>
                        </div>
                        <div className="">
                          <label className="py-2 block leading-[18px] text-[#777] ">
                            Email Address
                          </label>
                          <h4 className="  text-base text-gray-900 font-medium px-3 py-3.5 rounded-md bg-white ">
                            {property?.data?.initiator?.email}
                          </h4>
                        </div>
                        <div className="">
                          <label className="py-2 block leading-[18px] text-[#777] ">
                            Property Name
                          </label>
                          <h4 className="  text-base text-gray-900 font-medium px-3 py-3.5 rounded-md bg-white ">
                            {property?.data?.name}
                          </h4>
                        </div>
                        <div className="">
                          <label className="py-2 block leading-[18px] text-[#777] ">
                            Location
                          </label>
                          <h4 className="  text-base text-gray-900 font-medium px-3 py-3.5 rounded-md bg-white ">
                            {property?.data?.address}
                          </h4>
                        </div>

                        <div className="">
                          <label className="py-2 block leading-[18px] text-[#777] ">
                            Price
                          </label>
                          <h4 className="  text-base text-gray-900 font-medium px-3 py-3.5 rounded-md bg-white ">
                            {property?.data?.price}
                          </h4>
                        </div>
                        {/* <div className="calendar" id="date_1">
                      <div className="ui popup calendar">
                        <table className="ui celled center aligned unstackable table seven column day">
                          <thead>
                            <tr>
                              <th colSpan={7}>
                                <span className="link">October 2024</span>
                                <span className="prev link">
                                  <i className="ri-arrow-left-s-line icon" />
                                </span>
                                <span className="next link">
                                  <i className="ri-arrow-right-s-line icon" />
                                </span>
                              </th>
                            </tr>
                            <tr>
                              <th>S</th>
                              <th>M</th>
                              <th>T</th>
                              <th>W</th>
                              <th>T</th>
                              <th>F</th>
                              <th>S</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="link disabled">29</td>
                              <td className="link disabled">30</td>
                              <td className="link">1</td>
                              <td className="link">2</td>
                              <td className="link">3</td>
                              <td className="link">4</td>
                              <td className="link">5</td>
                            </tr>
                            <tr>
                              <td className="link">6</td>
                              <td className="link">7</td>
                              <td className="link">8</td>
                              <td className="link">9</td>
                              <td className="link">10</td>
                              <td className="link">11</td>
                              <td className="link">12</td>
                            </tr>
                            <tr>
                              <td className="link">13</td>
                              <td className="link">14</td>
                              <td className="link">15</td>
                              <td className="link">16</td>
                              <td className="link">17</td>
                              <td className="link">18</td>
                              <td className="link">19</td>
                            </tr>
                            <tr>
                              <td className="link">20</td>
                              <td className="link">21</td>
                              <td className="link">22</td>
                              <td className="link">23</td>
                              <td className="link">24</td>
                              <td className="link">25</td>
                              <td className="link">26</td>
                            </tr>
                            <tr>
                              <td className="link">27</td>
                              <td className="link">28</td>
                              <td className="link">29</td>
                              <td className="link">30</td>
                              <td className="link today focus">31</td>
                              <td className="link disabled">1</td>
                              <td className="link disabled">2</td>
                            </tr>
                            <tr>
                              <td className="link disabled">3</td>
                              <td className="link disabled">4</td>
                              <td className="link disabled">5</td>
                              <td className="link disabled">6</td>
                              <td className="link disabled">7</td>
                              <td className="link disabled">8</td>
                              <td className="link disabled">9</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <input
                        type="text"
                        className="border-0 outline-0 px-[12px] h-[50px] w-full bg-[#fff] m-0 rounded-[15px] dark-borderd"
                        placeholder="Sep 09,2023"
                      />
                      <i className="ri-calendar-line text-primary-600 absolute cursor-pointer text-[18px] right-0 p-[12px]" />
                    </div> */}
                      </div>

                      <div className="lh-side-reservation-from ex-service relative pt-6">
                        <h4 className="text-[#000] text-[18px] pb-[15px] font-bold leading-[16px]">
                          Features
                        </h4>
                        <div className="grid md:grid-cols-2 gap-x-2 gap-y-4 pb-[10px]">
                          {property?.data?.features?.map(
                            (feature, indexFeature) => (
                              <div
                                key={indexFeature}
                                className="border border-gray-400 rounded-md px-4 py-2.5 inline-flex items-center justify-between gap-2 "
                              >
                                <p className="text-sm text-gray-800 capitalize">
                                  {feature?.name}
                                </p>
                                <Checkbox
                                  id="room"
                                  name="room"
                                  checked={checked}
                                  setChecked={setChecked}
                                  // label="Room"
                                  disabled
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      {/* <div className="lh-side-reservation-from relative">
                        <h4 className="text-[#000] text-[18px] pb-[15px] font-bold leading-[16px]">
                          Your Price
                        </h4>
                        <span>$210 / per room</span>
                      </div>
                      <div className="lh-side-reservation-from relative">
                        <div className="lh-side-reservation-from-buttons d-flex pt-[24px]">
                          <a
                            className="duration-[0.3s] ease-in-out border-[1px] border-solid border-PRIMARYtext-primary-600 px-[15px] py-[5px] leading-[28px] bg-PRIMARYtext-primary-600 text-[#fff] relative z-[2] text-[15px] font-medium tracking-[1px] rounded-[10px] hover:bg-inherit hover:text-primary-600"
                            href="checkout.html"
                          >
                            Check Now
                          </a>
                        </div>
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {showModal && (
        <PropertyApproval
          propertyId={property?.data?.uuid}
          setOpenModal={setShowModal}
        />
        // <div>
        //   {loading ? (
        //     <div className="min-h-[400px] flex items-center justify-center">

        //       ...
        //     </div>
        //   ) : (
        //     <PropertyApproval
        //       propertyId={property?.data?.uuid}
        //       setOpenModal={setShowModal}
        //     />
        //   )}
        // </div>
      )}
    </>
  );
};

export default PropertyDetails;
