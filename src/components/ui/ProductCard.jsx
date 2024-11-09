/* eslint-disable react/prop-types */
import classNames from "classnames";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../forms/Button";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { formatNumber } from "../../lib/constants";

const ProductCard = ({
  image,
  title,
  discount,
  category,
  price,
  cate,
  property_id,
}) => {
  const navigate = useNavigate();
  //   const [favorite, setFavorite] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    // if (favorite === 0) {
    //   setFavorite(1);
    // } else {
    //   setFavorite(0);
    // }
  };
  const uniqueId = uuidv4();

  const navigatePropertyDetail = async (record) => {
    const getUniqueId = Cookies.get("bookacrib_uniqueId");
    // console.log("getUniqueId:", getUniqueId);
    try {
      if (getUniqueId === undefined || null) {
        Cookies.set("bookacrib_uniqueId", uniqueId, {
          expires: 7,
          sameSite: "None",
          secure: true,
        });
      }
      navigate(`/view-property/details/${record.uuid}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  return (
    <div className=" relative flex lg:flex-col bg-transparent  border border-gray-100 rounded-lg ">
      {/* <a className="absolute inset-0" /> */}
      <div className="w-[35%] lg:w-full relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-l-xl lg:rounded-t-xl overflow-hidden z-1 group">
        <a
          className="block relative"
          onClick={() => navigatePropertyDetail(property_id)}
        >
          <div className="flex overflow-hidden lg:w-full w-32 h-[132px] lg:h-64">
            <img
              alt="product"
              className="object-cover w-full h-full drop-shadow-xl transition-transform duration-[1600ms]  group-hover:scale-110 scale-100"
              src={image}
            />
          </div>
          <div className=" absolute w-full h-full inset-0  bg-black/20"></div>
        </a>
        {discount !== 0 && (
          <div className="nc-shadow-lg hidden rounded-full lg:flex items-center justify-center absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-gray-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.9889 14.6604L2.46891 13.1404C1.84891 12.5204 1.84891 11.5004 2.46891 10.8804L3.9889 9.36039C4.2489 9.10039 4.4589 8.59038 4.4589 8.23038V6.08036C4.4589 5.20036 5.1789 4.48038 6.0589 4.48038H8.2089C8.5689 4.48038 9.0789 4.27041 9.3389 4.01041L10.8589 2.49039C11.4789 1.87039 12.4989 1.87039 13.1189 2.49039L14.6389 4.01041C14.8989 4.27041 15.4089 4.48038 15.7689 4.48038H17.9189C18.7989 4.48038 19.5189 5.20036 19.5189 6.08036V8.23038C19.5189 8.59038 19.7289 9.10039 19.9889 9.36039L21.5089 10.8804C22.1289 11.5004 22.1289 12.5204 21.5089 13.1404L19.9889 14.6604C19.7289 14.9204 19.5189 15.4304 19.5189 15.7904V17.9403C19.5189 18.8203 18.7989 19.5404 17.9189 19.5404H15.7689C15.4089 19.5404 14.8989 19.7504 14.6389 20.0104L13.1189 21.5304C12.4989 22.1504 11.4789 22.1504 10.8589 21.5304L9.3389 20.0104C9.0789 19.7504 8.5689 19.5404 8.2089 19.5404H6.0589C5.1789 19.5404 4.4589 18.8203 4.4589 17.9403V15.7904C4.4589 15.4204 4.2489 14.9104 3.9889 14.6604Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 15L15 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.4945 14.5H14.5035"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.49451 9.5H9.50349"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ms-1 leading-none capitalize">{`${discount}% Discount`}</span>
          </div>
        )}
        {/* <button
          onClick={toggleFavorite}
          className={classNames(
            "w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg absolute top-3 end-3 z-10",
            { "text-red-700": favorite === true },
            { "text-gray-600 ": favorite === false }
          )}
        >
          <svg className="w-5 h-5  fill-none" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
              stroke="currentColor"
              fill={favorite === false ? "none" : "currentColor"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}
        <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          {/* <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-xs py-2 px-4  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
            <svg className="w-3.5 h-3.5 mb-0.5" viewBox="0 0 9 9" fill="none">
              <path
                d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"
                fill="currentColor"
              />
            </svg>
            <span className="ms-1">Add to cart</span>
          </button> */}
          <button
            onClick={() => navigatePropertyDetail(property_id)}
            className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full  text-xs py-2 px-4  text-slate-700 dark:bg-slate-900 dark:text-slate-300  ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 "
          >
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
            <span className="ms-1">Quick view</span>
          </button>
        </div>
      </div>
      <div className="w-[65%] lg:w-full space-y-7 lg:space-y-4 px-2.5 py-2.5 lg:pt-5 lg:pb-6">
        <div>
          <div className=" flex items-center w-full justify-between gap-2">
            <div>
              <Link to={`/view-property/details/${property_id?.uuid}`}>
                <h2 className="text-base font-semibold transition-colors w-full">
                  {title}
                </h2>
              </Link>
              <p className="text-xs lg:hidden text-slate-500 dark:text-slate-400 lg:mt-1 ">
                {category}
              </p>
              {/* <p>Unique ID: {uniqueId}</p> */}
            </div>
            <div className="lg:w-[10%]">
              <button
                onClick={toggleFavorite}
                className={classNames(
                  "w-10 h-10 flex items-center justify-center  cursor-pointer rounded-full bg-gray-100  text-neutral-700 ",
                  { "text-red-700": favorite === true },
                  { "text-gray-600 ": favorite === false }
                )}
              >
                <svg
                  className="w-5 h-5  fill-none"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                    stroke="currentColor"
                    fill={favorite === false ? "none" : "currentColor"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="hidden lg:flex text-sm text-slate-500 dark:text-slate-400 lg:mt-1 ">
            {category}
          </p>
        </div>
        <div className="flex justify-between items-end ">
          <div className="">
            <div className="flex flex-col lg:flex-row lg:items-center gap-1.5 text-sm text-gray-500 ">
              <span className="text-gray-800 font-semibold text-base !leading-none">
                NGN{formatNumber(price)}
              </span>
              <span className="">|</span>
              <span className=" capitalize">{cate} </span>
            </div>
          </div>
          <div className="flex items-center">
            {/* <Link to={`/property-details/view/${}`}> */}
            <Button
              onClick={() => navigatePropertyDetail(property_id)}
              size="xs"
            >
              Book
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
