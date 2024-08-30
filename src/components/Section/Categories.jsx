/* eslint-disable no-unused-vars */
import Ball from "src/assets/images/product/ball.webp";
import BeautyProduct from "src/assets/images/product/beauty-product.png";
import Electronices from "src/assets/images/product/electronics.png";
import Shoe from "src/assets/images/product/shoe&bag.png";
import Chair from "src/assets/images/product/chair.png";
import sport from "src/assets/images/product/sport-w.png";
import Lappy from "src/assets/images/product/lappi-1.png";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 4,
  spaceBetween: 24,
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    1400: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 1,
    },
    0: {
      slidesPerView: 1,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".tpplatiarrow__nxt",
    prevEl: ".tpplatiarrow__prv",
  },
};

const cateData = [
  {
    headline: "Explore new arrival",
    title: "Beauty Products",
    bgColor: "bg-blue-50",
    image: BeautyProduct,
  },
  {
    headline: "Find the best 🔥",
    title: "Electronics",
    bgColor: "bg-green-50",
    image: Electronices,
  },
  {
    headline: "Functional and Stylish ",
    title: "Bags & Shoes",
    bgColor: "bg-red-50",
    image: Shoe,
  },
  {
    headline: "Best Deals Discounts",
    title: "Computer, Office & Security",
    bgColor: "bg-yellow-50",
    image: Chair,
  },
  {
    headline: "Premium Quality 🔥",
    title: " Sports items",
    bgColor: "bg-lime-50",
    image: sport,
  },
  {
    headline: "Best Affordable ",
    title: "Phones and Tablets",
    bgColor: "bg-purple-50",
    image: Lappy,
  },
];
const Categories = () => {
  return (
    <div className="mt-10 lg:mt-32 overflow-hidden">
      <div className="pb-20 px-4  lg:px-10">
        <div className=" relative flex flex-col sm:flex-row sm:items-end justify-between mb-4 lg:mb-8 text-neutral-900 dark:text-neutral-50 nc-p-r-container ">
          <div className="">
            <h2 className=" text-2xl md:text-4xl font-semibold">
              Top Categories
            </h2>
          </div>
          <div className="mt-4 flex justify-end sm:ms-2 sm:mt-0 flex-shrink-0">
            <div
              className="nc-NextPrev relative flex items-center text-slate-500 dark:text-slate-400 "
              data-nc-id="NextPrev"
              data-glide-el="controls"
            >
              <button
                className="w-10 h-10 me-2 border-slate-200  rounded-full flex items-center justify-center border-2 tpplatiarrow__prv disabled:opacity-40"
                title="Prev"
              >
                <svg
                  className="w-5 h-5 rtl:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 12H3.67004"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="w-10 h-10  border-slate-200 rounded-full flex items-center tpplatiarrow__nxt justify-center border-2 disabled:opacity-40"
                title="Next"
              >
                <svg
                  className="w-5 h-5 rtl:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 12H20.33"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Swiper {...swiperOptions}>
          {cateData?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={classNames(
                  "relative w-full  h-60  rounded-2xl overflow-hidden group ",
                  item.bgColor
                )}
              >
                <div>
                  <div className="absolute inset-5 sm:inset-8">
                    <img
                      alt=""
                      width={362}
                      height={396}
                      className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                      src={item.image}
                    />
                  </div>
                </div>
                <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity" />
                <div>
                  <div className="absolute inset-5 sm:inset-11 flex flex-col">
                    <div className="max-w-[200px]">
                      <span className="block mb-2 text-sm text-slate-700">
                        {item.headline}
                      </span>
                      <h2 className="text-xl md:text-2xl text-slate-900 font-semibold">
                        {item.title}
                      </h2>
                    </div>
                    <div className="mt-auto">
                      <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                        View Category
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
                <div className="relative w-full  h-60  rounded-2xl overflow-hidden group bg-yellow-50">
                  <div>
                    <div className="absolute inset-5 sm:inset-8">
                      <img
                        alt=""
                        width={362}
                        height={396}
                        className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                        src={Ball}
                      />
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity" />
                  <div>
                    <div className="absolute inset-5 sm:inset-8 flex flex-col">
                      <div className="max-w-xs">
                        <span className="block mb-2 text-sm text-slate-700">
                          Explore new arrivals
                        </span>
                        <h2 className="text-xl md:text-2xl text-slate-900 font-semibold">
                          Shop the latest <br /> from top brands
                        </h2>
                      </div>
                      <div className="mt-auto">
                        <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                          Show me all
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full  h-60  rounded-2xl overflow-hidden group bg-yellow-50">
                  <div>
                    <div className="absolute inset-5 sm:inset-8">
                      <img
                        alt=""
                        width={362}
                        height={396}
                        className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                        src={Ball}
                      />
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity" />
                  <div>
                    <div className="absolute inset-5 sm:inset-8 flex flex-col">
                      <div className="max-w-xs">
                        <span className="block mb-2 text-sm text-slate-700">
                          Explore new arrivals
                        </span>
                        <h2 className="text-xl md:text-2xl text-slate-900 font-semibold">
                          Shop the latest <br /> from top brands
                        </h2>
                      </div>
                      <div className="mt-auto">
                        <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                          Show me all
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full  h-60  rounded-2xl overflow-hidden group bg-yellow-50">
                  <div>
                    <div className="absolute inset-5 sm:inset-8">
                      <img
                        alt=""
                        width={362}
                        height={396}
                        className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                        src={Ball}
                      />
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity" />
                  <div>
                    <div className="absolute inset-5 sm:inset-8 flex flex-col">
                      <div className="max-w-xs">
                        <span className="block mb-2 text-sm text-slate-700">
                          Explore new arrivals
                        </span>
                        <h2 className="text-xl md:text-2xl text-slate-900 font-semibold">
                          Shop the latest <br /> from top brands
                        </h2>
                      </div>
                      <div className="mt-auto">
                        <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 nc-shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                          Show me all
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
