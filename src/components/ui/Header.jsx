import { Link } from "react-router-dom";
import { NAVIGATION } from "../../data/menu";
import Logo from "../shared/Logo/Logo";
import { CartsIcon, SearchIcon, UsersIcon } from "../../assets/SvgIcons";
import { useState } from "react";
import SearchBar from "./SearchBar";
import classNames from "classnames";
import CartMenu from "./CartMenu";
import UserFloatMenu from "./UserFloatMenu";
import { useSelector } from "react-redux";
// import SearchBar from "./SearchBar";

const Header = () => {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openCartMenu, setOpenCartMenu] = useState(false);
  const [openDashboardMenu, setOpenDashboardMenu] = useState(false);

  const handleSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
    setOpenCartMenu(false);
    setOpenDashboardMenu(false);
  };
  const handleCartMenu = () => {
    setOpenCartMenu(!openCartMenu);
    setOpenDashboardMenu(false);
    setOpenSearchBar(false);
  };
  const handleDashMenu = () => {
    setOpenDashboardMenu(!openDashboardMenu);
    setOpenCartMenu(false);
    setOpenSearchBar(false);
  };

  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div>
      <nav className="fixed top-0 z-40 w-full border-b border-gray-100/20 bg-white/80 shadow backdrop-blur transition-colors lg:border-transparent">
        <div className="mx-auto max-w-7xl px-4 md:px-12 lg:px-6 xl:px-0">
          <div className="relative z-20 flex  items-center justify-between gap-6 py-2 md:gap-0 lg:py-3 ">
            {/* <div className="relative  flex w-full justify-between items-center md:px-0 lg:w-max"> */}
            <div className="relative flex max-h-10 items-center lg:hidden">
              <button
                type="button"
                aria-label="humburger"
                id="hamburger"
                className="relative  p-4"
              >
                <div
                  aria-hidden="true"
                  id="line"
                  className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300"
                />
                <div
                  aria-hidden="true"
                  id="line2"
                  className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300"
                />
              </button>
            </div>
            <div className=" pl-5 lg:pl-0">
              <Logo />
            </div>
            {/* </div> */}
            {/* <div
              id="navLayer"
              aria-hidden="true"
              className="fixed inset-0 z-10 h-screen w-screen bg-white/70 backdrop-blur-2xl transition duration-500 lg:hidden origin-bottom scale-y-0"
            /> */}
            <div
              id="navlinks"
              className={classNames(
                " hidden ",
                {
                  hidden: openSearchBar === true,
                },
                { "lg:flex": openSearchBar === false }
              )}
            >
              <div className="w-full text-gray-900 lg:w-auto lg:pr-4 lg:pt-0">
                <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                  {NAVIGATION.map((item, index) => (
                    <li key={index}>
                      <Link
                        to=""
                        className="block md:px-2 transition hover:text-primary-800"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {openSearchBar && (
              <div className=" absolute right-1/2 left-1/2 -translate-x-1/2  -translate-y-[0%] w-[600px] ">
                <SearchBar handleSearchBar={handleSearchBar} />
              </div>
            )}
            <div className=" flex items-center justify-end text-slate-700 dark:text-slate-100">
              {openSearchBar === false && (
                <button
                  onClick={handleSearchBar}
                  className="hidden  lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700  hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                >
                  <SearchIcon />
                </button>
              )}
              <div className="AvatarDropdown ">
                <div className="relative">
                  {isAuthenticated ? (
                    <button
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center"
                      type="button"
                      onClick={handleDashMenu}
                    >
                      <UsersIcon />
                    </button>
                  ) : (
                    <Link to="/login">
                      <button
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center"
                        type="button"
                        id="headlessui-popover-button-:r3f:"
                      >
                        <UsersIcon />
                      </button>
                    </Link>
                  )}
                  {openDashboardMenu && <UserFloatMenu />}
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={handleCartMenu}
                  // onMouseEnter={() => setOpenCartMenu(false)}
                  // onMouseLeave={() => setOpenCartMenu(true)}
                  className="
          text-opacity-90
           group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100  rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:r3h:"
                >
                  <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                    <span className="mt-[1px]">3</span>
                  </div>
                  <CartsIcon />
                  <a
                    className="block md:hidden absolute inset-0"
                    href="/cart"
                  />
                </button>
                {openCartMenu && (
                  <div className=" absolute top-14 right-0">
                    <CartMenu />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
