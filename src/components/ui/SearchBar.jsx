/* eslint-disable react/prop-types */
const SearchBar = ({ handleSearchBar }) => {
  return (
    <div className="flex-1 hidden lg:flex justify-center mx-4">
      <form className="flex-1 py-2 text-slate-900 dark:text-slate-100">
        <div className="bg-slate-100 dark:bg-slate-800 flex items-center space-x-1.5 px-5 py-4 h-full rounded">
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            type="text"
          />
          <button type="button" onClick={handleSearchBar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* <input hidden="" type="submit" className="opacity-0" defaultValue="" /> */}
      </form>
    </div>
  );
};

export default SearchBar;
