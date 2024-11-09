/* eslint-disable react/prop-types */
// import classNames from "classnames";
// import { useState } from "react";

// import productData from "../../data/product";
import ProductCard from "../ui/ProductCard";
const TopSelling = ({ data }) => {
  // const [favorite, setFavorite] = useState(0);

  // const toggleFavorite = () => {
  //   // setFavorite(!favorite);
  //   if (favorite === 0) {
  //     setFavorite(1);
  //   } else {
  //     setFavorite(0);
  //   }
  // };

  // console.log("show", data);
  return (
    <div className="px-4 max-w-7xl mx-auto pt-6">
      <div className=" relative flex items-center justify-between mb-4  text-neutral-800 dark:text-neutral-50">
        <div className="">
          <h2 className="text-lg lg:text-xl  font-semibold">Available Rooms</h2>
        </div>
        <div className="text-sm lg:text-base flex justify-end sm:ms-2 sm:mt-0 flex-shrink-0">
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

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 ">
        {data?.slice(0, 6)?.map((item, index) => (
          <ProductCard
            key={index}
            image={item?.images[0]}
            title={item?.name}
            discount={item?.discount}
            category={item?.address}
            price={item?.price}
            cate={item?.category?.name}
            property_id={item}
          />
        ))}

        {/* {productData
          .slice(0, 6)
          .map(({ image, title, discount, category, price }, index) => (
            <ProductCard
              key={index}
              image={image}
              title={title}
              discount={discount}
              category={category}
              price={price}
            />
          ))} */}
      </div>
    </div>
  );
};

export default TopSelling;
