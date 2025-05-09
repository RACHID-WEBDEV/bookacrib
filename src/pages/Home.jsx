/* eslint-disable no-unused-vars */
// import Categories from "../components/Section/Categories";
// import FlashSales from "../components/Section/FlashSales";
// import FrequentPurchased from "../components/Section/FrequentPurchased";
import { useEffect, useState } from "react";
import CitiesFeatures from "../components/Section/CitiesFeatures";
import Cta from "../components/Section/CTA";
import Features from "../components/Section/Features";
import Hero from "../components/Section/Hero";
import TopSelling from "../components/Section/TopSelling";
import { getData } from "../utils/api";
import NewHero from "../components/Section/NewHero";

const Home = () => {
  const [loadingProperty, setLoadingProperty] = useState(false);
  const [errorProperty, setErrorProperty] = useState(null);
  const [loadPropery, setLoadPropery] = useState(null);

  // const [selectedOriginCountry, setSelectedOriginCountry] = useState(null);

  // console.log("loadPropery:", loadPropery);

  const IN_APP_PROPERTY = loadPropery?.data?.filter(
    (data) => data?.create_source !== "SEEDER"
  );
  const handleFetchLoadPropery = async () => {
    setLoadingProperty(true);
    try {
      const response = await getData(
        `/bookacrib-api-routes/v1/properties/list-properties-public?is_active=yes&limit=10&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=category`
      );
      setLoadPropery(response);
      // console.log(response);
    } catch (error) {
      setErrorProperty(error.response.data.message);
    } finally {
      setLoadingProperty(false);
    }
  };

  useEffect(() => {
    handleFetchLoadPropery();
  }, []);

  return (
    <>
      <NewHero />
      {/* <Hero /> */}

      {/* <div>
        {loadingProperty ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pt-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                role="status"
                className="max-w-sm p-4 border border-gray-200 rounded shadow  md:p-6 dark:border-gray-700"
              >
                <div className="">
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                </div>

                <div className="h-2.5 fadeloader bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-2 fadeloader2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2  bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 fadeloader2 bg-gray-200 rounded-full dark:bg-gray-700" />
                <div className="flex items-center mt-4">
                  <svg
                    className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700 animate-pulse"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
                    <div className="w-48 h-2 fadeloader bg-gray-200 rounded-full dark:bg-gray-700" />
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
          </div>
        ) : (
          <TopSelling data={IN_APP_PROPERTY} />
        )}
      </div> */}
      <CitiesFeatures />
      <Features />
      <Cta />
      {/* <Categories /> */}
      {/* <FlashSales />
      <FrequentPurchased /> */}
    </>
  );
};

export default Home;
