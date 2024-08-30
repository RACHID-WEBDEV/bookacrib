/* eslint-disable no-unused-vars */
import productData from "../../data/product";
import ProductCard from "../ui/ProductCard";
import Countdown from "./CountDown";

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
      slidesPerView: 4,
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
const FlashSales = () => {
  const currentTime = new Date();

  return (
    <div className="">
      <div className="px-4 mt-10 py-6 bg-primary-100">
        <div className=" relative flex flex-row items-center justify-between my-4 text-neutral-800 dark:text-neutral-50">
          <div className="">
            <h2 className="text-2xl lg:text-4xl font-semibold max-w-xs">
              Flash Sales
            </h2>
          </div>
          <div className=" hidden lg:flex items-center gap-2">
            <div className="">
              <Countdown
                endDateTime={currentTime.setDate(currentTime.getDate() + 2)}
              />
            </div>
            <i>
              Remains until the <br /> end of the offer
            </i>
          </div>
          <div className="mt-4 flex justify-end sm:ms-2 sm:mt-0 flex-shrink-0">
            <div className=" relative flex items-center text-slate-600 cursor-pointer dark:text-slate-400 ">
              <p>View more</p>
              <button
                className="w-10 h-10  border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center "
                title="Next"
                data-glide-dir=">"
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

        <div className="flex items-center  justify-center lg:hidden">
          <div className=" flex items-center flex-wrap gap-2">
            <div className="">
              <Countdown
                endDateTime={currentTime.setDate(currentTime.getDate() + 2)}
              />
            </div>
            <i>
              Remains until the <br /> end of the offer
            </i>
          </div>
        </div>
      </div>

      <div className="pb-20 px-4  lg:px-10">
        <div className=" relative flex flex-col sm:flex-row sm:items-end justify-end pt-5 mb-4 lg:mb-8 text-neutral-900 ">
          {/* <div className="">
            <h2 className=" text-2xl md:text-4xl font-semibold">
              Top Categories
            </h2>
          </div> */}
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
        <div className=" overflow-hidden">
          <Swiper {...swiperOptions}>
            {productData
              .slice(9, 16)
              .map(({ image, title, discount, category, price }, index) => (
                <SwiperSlide key={index}>
                  <ProductCard
                    image={image}
                    title={title}
                    discount={discount}
                    category={category}
                    price={price}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FlashSales;
