import HomeIcon from "src/assets/images/Rooms/home-icon.svg";
import customers from "src/assets/images/Rooms/customer-support.svg";
import transaction from "src/assets/images/Rooms/transaction.svg";

const Features = () => {
  return (
    <div>
      <div className="">
        <div className="xl:container mx-auto space-y-12 px-6 md:px-12 lg:px-20">
          <div className="mt-6 grid gap-8 sm:w-2/3 sm:mx-auto md:w-full md:grid-cols-2 md:-mx-8 lg:grid-cols-3">
            <div className="p-8 py-12  rounded-3xl bg-white border border-gray-100 bg-opacity-50 ">
              <div className="space-y-6 text-center">
                <img
                  src={HomeIcon}
                  className="w-16 mx-auto"
                  width={512}
                  height={512}
                  alt="burger illustration"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 transition dark:text-white">
                    Security Comfort and Affordable
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-gray-300">
                    All time Secured, Comfort and Affordable
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 py-12  rounded-3xl bg-white border border-gray-100 bg-opacity-50 ">
              <div className="space-y-6 text-center">
                <img
                  src={customers}
                  className="w-16 mx-auto"
                  width={512}
                  height={512}
                  alt="burger illustration"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 transition dark:text-white">
                    24/7 Customer Service
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-gray-300">
                    Premium Services and Support
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 py-12  rounded-3xl bg-white border border-gray-100 bg-opacity-50 ">
              <div className="space-y-6 text-center">
                <img
                  src={transaction}
                  className="w-16 mx-auto"
                  width={512}
                  height={512}
                  alt="burger illustration"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 transition dark:text-white">
                    Fast Transaction services
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-gray-300">
                    Premium Services and Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
