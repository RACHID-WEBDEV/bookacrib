/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const CityCard = ({ image, title, category, city }) => {
  return (
    <div className=" relative flex flex-col bg-transparent  border border-gray-100 rounded-lg ">
      {/* <a className="absolute inset-0" /> */}
      <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-t-xl overflow-hidden z-1 group">
        <Link className="block relative" to={`city/category/${city?.uuid}`}>
          <div className="flex overflow-hidden w-full h-64 lg:h-[330px]">
            <img
              alt="product"
              className="object-cover w-full h-full drop-shadow-xl transition-transform duration-[1600ms]  group-hover:scale-110 scale-100"
              src={image}
            />
          </div>
          <div className=" absolute w-full h-full inset-0  bg-black/20"></div>
        </Link>

        <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full  text-xs py-2 px-4  text-slate-700 dark:bg-slate-900 dark:text-slate-300  ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
            <span className="ms-1">View City</span>
          </button>
        </div>
      </div>
      <div className="space-y-4 px-2.5 pt-5 pb-6">
        <div>
          <div className=" flex items-center w-full justify-between gap-2">
            <Link to="">
              <h2 className="text-base font-semibold transition-colors w-full">
                {title}
              </h2>
            </Link>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 ">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
