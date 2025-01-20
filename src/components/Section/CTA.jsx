import BusinessAds from "../../assets/images/Rooms/ads.png";

import { Button } from "../forms/Button";
const Cta = () => {
  return (
    <div className="pt-20 max-w-6xl mx-auto">
      <div className="bg-blue-50 dark:bg-green-900/10 py-16">
        <div className="container m-auto space-y-8 px-6 md:px-12 lg:px-20">
          <div className="items-center justify-center gap-6 lg:gap-16 text-center flex flex-col md:flex-row md:text-left">
            <div className=" mb-6 space-y-6 md:mb-0 w-full md:w-7/12 lg:w-6/12">
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                Time Square Mall
              </h1>
              <p className=" text-base lg:text-lg text-gray-600 dark:text-gray-300">
                A humongous, awesome shopping mall sprawling on one of the
                busiest districts on the Lekki-Epe Express way.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start lg:gap-6">
                <Button className="w-40 justify-center" color="gray">
                  Visit Mall
                </Button>
              </div>
            </div>
            <div className="order-first md:order-last w-full md:w-5/12">
              <img
                src={BusinessAds}
                // width={832}
                // height={608}
                className=" min-w-[200px] "
                loading="lazy"
                alt="mobility_illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
