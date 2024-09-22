import citiesData from "../../data/cities";
import CityCard from "../ui/CityCard";

const CitiesFeatures = () => {
  return (
    <div className="px-4 max-w-7xl mx-auto pt-6 mt-12">
      <div className=" relative flex items-center justify-between mb-4  text-neutral-800 dark:text-neutral-50">
        <div className="">
          <h2 className=" text-lg lg:text-xl font-semibold">
            Cities in Nigeria
          </h2>
        </div>
        <div className=" flex justify-end sm:ms-2 sm:mt-0 flex-shrink-0">
          <div className=" relative text-sm lg:text-base flex items-center text-slate-600 cursor-pointer dark:text-slate-400 ">
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

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6  ">
        {citiesData
          .slice(0, 6)
          .map(({ image, title, discount, category, price }, index) => (
            <CityCard
              key={index}
              image={image}
              title={title}
              discount={discount}
              category={category}
              price={price}
            />
          ))}
      </div>
    </div>
  );
};

export default CitiesFeatures;
