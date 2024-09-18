const TopFeatures = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
      <a className="nc-CardCategory3 block" href="/collection">
        <div className="relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group bg-blue-50">
          <div>
            <div className="absolute inset-5 sm:inset-8">
              <p>IMAGE</p>
              {/* <img
                alt=""
                loading="lazy"
                width={362}
                height={396}
                decoding="async"
                data-nimg={1}
                className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                style={{ color: "transparent" }}
                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.0ee67265.png&w=384&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.0ee67265.png&w=750&q=75 2x"
                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.0ee67265.png&w=750&q=75"
              /> */}
            </div>
          </div>
          <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity" />
          <div>
            <div className="absolute inset-5 sm:inset-8 flex flex-col">
              <div className="max-w-xs">
                <span className="block mb-2 text-sm text-slate-700">
                  Sale collection
                </span>
                <h2 className="text-xl md:text-2xl text-slate-900 font-semibold">
                  Up to <br /> 80% off retail
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
      </a>
    </div>
  );
};

export default TopFeatures;
