// import { Link } from "react-router-dom";
// import { NAVIGATION } from "../../data/menu";
// import Logo from "../shared/Logo/Logo";
// import { CartsIcon, SearchIcon, UsersIcon } from "../../assets/SvgIcons";
import classNames from "classnames";
import { useState } from "react";
// import SearchBar from "./SearchBar";
// import classNames from "classnames";
// import CartMenu from "./CartMenu";
// import UserFloatMenu from "./UserFloatMenu";
// import { useSelector } from "react-redux";
// import SearchBar from "./SearchBar";

const Header = () => {
  // const [openSearchBar, setOpenSearchBar] = useState(false);
  // const [openDashboardMenu, setOpenDashboardMenu] = useState(false);
  // const [openCartMenu, setOpenCartMenu] = useState(false);

  // const handleSearchBar = () => {
  //   setOpenSearchBar(!openSearchBar);
  //   setOpenCartMenu(false);
  //   setOpenDashboardMenu(false);
  // };
  // const handleCartMenu = () => {
  //   setOpenCartMenu(!openCartMenu);
  //   setOpenDashboardMenu(false);
  //   setOpenSearchBar(false);
  // };
  // const handleDashMenu = () => {
  //   setOpenDashboardMenu(!openDashboardMenu);
  //   setOpenCartMenu(false);
  //   setOpenSearchBar(false);
  // };

  const [openMenu, setOpenMenu] = useState(false);

  const toggleOpenMenu = () => setOpenMenu(!openMenu);

  // const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header>
      <nav className="fixed z-10 w-full dark:bg-gray-900/70 bg-white md:absolute md:bg-transparent">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
            <input
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="hidden peer"
            />
            <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
              <a
                href="#"
                aria-label="logo"
                className="flex space-x-2 items-center"
              >
                <div aria-hidden="true" className="flex space-x-1">
                  <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white" />
                  <div className="h-6 w-2 bg-primary" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Arceelus
                </span>
              </a>
              <div
                onClick={toggleOpenMenu}
                className="flex items-center lg:hidden max-h-10"
              >
                <label
                  role="button"
                  htmlFor="toggle_nav"
                  aria-label="humburger"
                  id="hamburger"
                  className="relative  p-6 -mr-6"
                >
                  <div
                    aria-hidden="true"
                    id="line"
                    className={classNames(
                      "m-auto h-0.5 w-6 rounded bg-stone-900 dark:bg-gray-300 transition duration-300",
                      { "rotate-45": openMenu === true }
                    )}
                  />
                  <div
                    aria-hidden="true"
                    id="line2"
                    className={classNames(
                      "m-auto  h-0.5 w-6 rounded bg-stone-900 dark:bg-gray-300 transition duration-300",
                      { " -rotate-[45deg] -mt-[1px]": openMenu === true },
                      { "mt-2 ": openMenu === false }
                    )}
                  />
                </label>
              </div>
            </div>
            <div
              className="hidden absolute top-full transition translate-y-1 lg:peer-checked:translate-y-0 lg:translate-y-0 left-0 
              lg:top-0 lg:relative peer-checked:flex w-full 
              lg:flex lg:flex-row flex-col 
              flex-wrap justify-end lg:items-center 
              gap-6 p-6 rounded-xl 
              bg-white shadow-md lg:shadow-none dark:bg-gray-900 lg:gap-0 
              lg:p-0  
              lg:bg-transparent lg:w-7/12"
            >
              <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                <ul
                  className=" 
                      tracking-wide 
                      font-medium 
                      text-sm flex-col flex 
                      lg:flex-row
                      gap-6 lg:gap-0"
                >
                  <li>
                    <a
                      href="#"
                      className="block md:px-4 transition hover:text-primary"
                    >
                      <span>Home</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block md:px-4 transition hover:text-primary"
                    >
                      <span>Portfolio</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block md:px-4 transition hover:text-primary"
                    >
                      <span>Services</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <a
                  href="#"
                  className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-sm font-semibold text-white dark:text-dark">
                    Get Started
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
