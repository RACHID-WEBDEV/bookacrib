import { Link } from "react-router-dom";
// import HeroSlider from "src/assets/images/product/Banners.png";
import titleShape from "src/assets/images/product/title-shape-02.jpg";
import Banner1 from "src/assets/images/product/banner-11.jpg";
import Banner2 from "src/assets/images/product/banner-22.jpg";
import Banner3 from "src/assets/images/product/banner-33.jpg";
import CartIllus from "src/assets/images/product/cart-illus.svg";
// import Adsbanner1 from "src/assets/images/product/ads-banner.png";
import Adsbanner2 from "src/assets/images/product/ads-banner-2.png";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../forms/Button";
import { RightLongArrowIcon } from "../../assets/SvgIcons";

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
const Hero = () => {
  return (
    <div className=" pt-20 lg:pt-28 px-4 lg:px-10 xl:px-16 3xl:container  mx-auto">
      <div className="flex flex-col lg:flex-row items-start gap-x-4 w-full">
        <div className=" w-full lg:w-[70%] pb-5 lg:pb-0">
          <div className="tp-slider-area relative">
            <div className="swiper-container slider-active">
              <Swiper {...swiperOptions}>
                <SwiperSlide>
                  <div className="tp-slide-item relative rounded">
                    <div className="tp-slide-item__content absolute left-5 bottom-10 md:bottom-24 md:left-12 lg:bottom-20  lg:left-14 xl:bottom-32 2xl:bottom-36  3xl:bottom-44 3xl:left-20 ">
                      <h4 className="tp-slide-item__sub-title  text-primary-800  lg:text-lg ">
                        Accessories
                      </h4>
                      <h3 className="tp-slide-item__title text-3xl  md:text-5xl 2xl:text-6xl 3xl:text-7xl  font-bold max-w-[290px] md:max-w-[450px] 2xl:max-w-xl 3xl:max-w-2xl 2xl:leading-[70px] 3xl:leading-[86px] md:leading-[56px] mb-25">
                        Up To{" "}
                        <i className=" text-primary-800 relative">
                          40% Off
                          <img
                            src={titleShape}
                            alt=""
                            className=" absolute -bottom-1 right-0"
                          />
                        </i>
                        latest Creations
                      </h3>
                      <Link
                        className="tp-slide-item__slide-btn tp-btn block pt-4"
                        to="/shop"
                      >
                        <Button
                          rounded
                          size="md"
                          rightIcon={<RightLongArrowIcon />}
                        >
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                    <div className="tp-slide-item__img rounded-lg">
                      <img
                        src={Banner1}
                        className=" rounded-lg min-h-[250px] w-auto "
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {/* <div className="tp-slide-item relative rounded">
                    <div className="tp-slide-item__content absolute bottom-32 left-14">
                      <h4 className="tp-slide-item__sub-title  text-primary-800 text-lg ">
                        Starting from N300
                      </h4>
                      <h3 className="tp-slide-item__title text-5xl font-bold max-w-[450px] leading-[56px] mb-25">
                        Upgrade your{" "}
                        <i className=" text-primary-800 relative">
                          Kitchen
                          <img
                            src={titleShape}
                            alt=""
                            className=" absolute -bottom-1 right-0"
                          />
                        </i>{" "}
                        Utils
                      </h3>
                      <Link
                        className="tp-slide-item__slide-btn tp-btn block pt-2"
                        to="/shop"
                      >
                        <Button
                          title="Shop Now"
                          rightIcon={<RightLongArrowIcon />}
                        />
                      </Link>
                    </div>
                    <div className="tp-slide-item__img rounded-lg">
                      <img src={Banner2} className=" rounded-lg" alt="" />
                    </div>
                  </div> */}

                  <div className="tp-slide-item relative rounded">
                    <div className="tp-slide-item__content absolute left-5 bottom-10 md:bottom-24 md:left-12 lg:bottom-20  lg:left-14 xl:bottom-32 2xl:bottom-36  3xl:bottom-44 3xl:left-20 ">
                      <h4 className="tp-slide-item__sub-title  text-primary-800  lg:text-lg ">
                        Starting from N300
                      </h4>
                      <h3 className="tp-slide-item__title text-3xl  md:text-5xl 2xl:text-6xl 3xl:text-7xl  font-bold max-w-[290px] md:max-w-[450px] 2xl:max-w-xl 3xl:max-w-2xl 2xl:leading-[70px] 3xl:leading-[86px] md:leading-[56px] mb-25">
                        Upgrade your{" "}
                        <i className=" text-primary-800 relative">
                          Kitchen
                          <img
                            src={titleShape}
                            alt=""
                            className=" absolute -bottom-1 right-0"
                          />
                        </i>{" "}
                        Utils
                      </h3>
                      <Link
                        className="tp-slide-item__slide-btn tp-btn block pt-4"
                        to="/shop"
                      >
                        <Button
                          rounded
                          size="md"
                          rightIcon={<RightLongArrowIcon />}
                        >
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                    <div className="tp-slide-item__img rounded-lg">
                      <img
                        src={Banner2}
                        className=" rounded-lg min-h-[250px] w-auto "
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {/* <div className="tp-slide-item relative rounded">
                    <div className="tp-slide-item__content absolute bottom-32 left-14">
                      <h4 className="tp-slide-item__sub-title  text-primary-800 text-lg ">
                        Accessories
                      </h4>
                      <h3 className="tp-slide-item__title text-5xl font-bold max-w-[450px] leading-[56px] mb-25">
                        Up To{" "}
                        <i className=" text-primary-800 relative">
                          45% Off
                          <img
                            src={titleShape}
                            alt=""
                            className=" absolute -bottom-1 right-0"
                          />
                        </i>
                        latest Creations
                      </h3>
                      <Link
                        className="tp-slide-item__slide-btn tp-btn block pt-2"
                        to="/shop"
                      >
                        <Button
                          title="Shop Now"
                          rightIcon={<RightLongArrowIcon />}
                        />
                      </Link>
                    </div>
                    <div className="tp-slide-item__img rounded-lg">
                      <img src={Banner3} alt="" className=" rounded-lg" />
                    </div>
                  </div> */}

                  <div className="tp-slide-item relative rounded">
                    <div className="tp-slide-item__content absolute left-5 bottom-10 md:bottom-24 md:left-12 lg:bottom-20  lg:left-14 xl:bottom-32 2xl:bottom-36  3xl:bottom-44 3xl:left-20 ">
                      <h4 className="tp-slide-item__sub-title  text-primary-800  lg:text-lg ">
                        Accessories
                      </h4>
                      <h3 className="tp-slide-item__title text-3xl  md:text-5xl 2xl:text-6xl 3xl:text-7xl  font-bold max-w-[290px] md:max-w-[450px] 2xl:max-w-xl 3xl:max-w-2xl 2xl:leading-[70px] 3xl:leading-[86px] md:leading-[56px] mb-25">
                        Up To{" "}
                        <i className=" text-primary-800 relative">
                          45% Off
                          <img
                            src={titleShape}
                            alt=""
                            className=" absolute -bottom-1 right-0"
                          />
                        </i>
                        latest Creations
                      </h3>
                      <Link
                        className="tp-slide-item__slide-btn tp-btn block pt-4"
                        to="/shop"
                      >
                        <Button
                          rounded
                          size="md"
                          rightIcon={<RightLongArrowIcon />}
                        >
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                    <div className="tp-slide-item__img rounded-lg">
                      <img
                        src={Banner3}
                        className=" rounded-lg min-h-[250px] w-auto "
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="slider-pagination" />
          </div>
        </div>
        <div className=" w-full lg:w-[30%] space-y-4">
          <div className="relative overflow-hidden bg-white rounded-lg shadow w-full">
            <img
              src={CartIllus}
              alt="cart Illustration logo"
              className="absolute w-24 h-24 rounded-full opacity-50 -top-6 -right-6 md:-right-4"
            />
            <div className="px-4 py-5 sm:p-6 mt-6">
              <dl>
                <dt className="text-sm font-medium leading-5 text-gray-500 truncate">
                  Join Our Community
                </dt>
                <dd className="mt-1 text-2xl font-semibold leading-9 text-gray-900">
                  Become a Drop Shipper
                </dd>
                <p className="font-normal text-base text-gray-600 ">
                  <span>
                    Become a drop shipper and start selling goods without a
                    store
                  </span>
                </p>
              </dl>
              <div className="p-4 pb-2">
                <Button rounded>Start Selling</Button>
              </div>
            </div>
          </div>

          {/* <img src={Adsbanner1} alt="slider" /> */}
          <img src={Adsbanner2} alt="slider" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
