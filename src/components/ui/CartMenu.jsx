import Cloth from "src/assets/images/product/cloth.png";
import Headphone from "src/assets/images/product/headphone.png";
import Laptop from "src/assets/images/product/laptop.png";
const CartMenu = () => {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5  w-[450px] max-w-2xl">
      <div className="relative bg-white dark:bg-neutral-800">
        <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
          <h3 className="text-xl font-semibold">Shopping cart</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            <div className="flex py-5 last:pb-0">
              <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  alt="cloth"
                  className="h-full w-full object-contain object-center"
                  src={Cloth}
                />
                <a className="absolute inset-0" href="/product-detail" />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between ">
                    <div>
                      <h3 className="text-base font-medium  max-w-48 truncate ">
                        <a href="/product-detail">
                          Triathlon Suit Men Swim Mens Autumn
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        <span>Natural</span>
                        <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4" />
                        <span>XL</span>
                      </p>
                    </div>
                    <div className="mt-0.5">
                      <div className="flex items-center border-2 border-primary-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                        <span className="text-primary-500 !leading-none">
                          $74
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500 dark:text-slate-400">Qty 1</p>
                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-primary-6000 dark:text-primary-500 "
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex py-5 last:pb-0">
              <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  alt='Round Buckle 1" Belt'
                  className="h-full w-full object-contain object-center"
                  sizes="100vw"
                  src={Headphone}
                />
                <a className="absolute inset-0" href="/product-detail" />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between ">
                    <div>
                      <h3 className="text-base font-medium  max-w-48 truncate">
                        <a href="/product-detail">
                          Cat Ear Bluetooth Earphones Wireless
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        <span>Natural</span>
                        <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4" />
                        <span>XL</span>
                      </p>
                    </div>
                    <div className="mt-0.5">
                      <div className="flex items-center border-2 border-primary-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                        <span className="text-primary-500 !leading-none">
                          $68
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500 dark:text-slate-400">Qty 1</p>
                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-primary-6000 dark:text-primary-500 "
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex py-5 last:pb-0">
              <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  alt="Waffle Knit Beanie"
                  className="h-full w-full object-contain object-center"
                  sizes="100vw"
                  src={Laptop}
                />
                <a className="absolute inset-0" href="/product-detail" />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between ">
                    <div>
                      <h3 className="text-base font-medium  max-w-48 truncate">
                        <a href="/product-detail">
                          Hp Pavilion 15 Intel Pentium Quad Core
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        <span>Natural</span>
                        <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4" />
                        <span>XL</span>
                      </p>
                    </div>
                    <div className="mt-0.5">
                      <div className="flex items-center border-2 border-primary-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                        <span className="text-primary-500 !leading-none">
                          $132
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500 dark:text-slate-400">Qty 1</p>
                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-primary-6000 dark:text-primary-500 "
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-50 dark:bg-slate-900 p-5">
          <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
            <span>
              <span>Subtotal</span>
              <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                Shipping and taxes calculated at checkout.
              </span>
            </span>
            <span className="">$299.00</span>
          </p>
          <div className="flex space-x-2 mt-5">
            <a
              className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 flex-1 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
              href="/cart"
            >
              View cart
            </a>
            <a
              className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
              href="/checkout"
            >
              Check out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
