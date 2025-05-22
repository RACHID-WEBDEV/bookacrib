// import { Link } from "react-router-dom";
// import { NAVIGATION } from "../../data/menu";
import Logo from "src/assets/images/bookacrib-logo.svg";
// import { CartsIcon, SearchIcon, UsersIcon } from "../../assets/SvgIcons";
import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION } from "../../data/menu";
import { Button } from "../forms/Button/Button";
import { useSelector } from "react-redux";
import { getNameInitials } from "../../lib/constants";
import AdminMenu from "../../LayoutAdmin/AdminMenu";
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

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isAdminAuthenticated } = useSelector((state) => state.adminauth);
  console.log("isAdminAuthenticated:", isAdminAuthenticated);
  // const isAuthorised = currentUser?.role.id;

  console.log("isAuthenticated now:", isAuthenticated);

  const [showUserMenu, setShowUserMenu] = useState(false);
  // const { currentUser } = useSelector((state) => state.auth);
  const { bookacrib_admin_user } = useSelector((state) => state.adminauth);

  // const data = localStorage.getItem("persist:root");
  // const userlocal = JSON.parse(data);
  // const localauth = JSON.parse(userlocal?.auth);
  // console.log(
  //   "local auth:",
  //   localauth?.isAuthenticated,
  //   "auth",
  //   isAuthenticated
  // );

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     // if (isAuthenticated === null) {
  //     //   // setLoading(true);
  //     //   return;
  //     // }

  //     if (isAuthenticated) {
  //       console.log("authenticated status:", isAuthenticated);
  //       // navigate("/");
  //     }
  //     // setLoading(false);
  //   };

  //   checkAuthentication();
  // }, [isAuthenticated]);
  // console.log("bookacrib_admin_user one:", bookacrib_admin_user);
  const bookacrib_admin = bookacrib_admin_user?.data || bookacrib_admin_user;

  function toggleUserMenu() {
    setShowUserMenu(!showUserMenu);
  }
  return (
    <header>
      <nav className="fixed z-50 w-full dark:bg-gray-900/70 bg-white  md:bg-[#fff] shadow">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-0 md:gap-0 relative">
            <input
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="hidden peer"
            />
            <div className="w-full px-4 lg:px-6 flex justify-between lg:w-max md:px-0">
              <Link
                to="/"
                href="#"
                aria-label="logo"
                className="flex space-x-2 items-center"
              >
                <img src={Logo} alt="logo" className="w-[160px] lg:w-[220px]" />
                {/* <div aria-hidden="true" className="flex space-x-1">
                  <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white" />
                  <div className="h-6 w-2 bg-primary" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Bookacrib
                </span> */}
              </Link>
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
              lg:bg-transparent lg:w-8/12 xl:w-7/12"
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
                  {NAVIGATION.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="block md:px-4 cursor-pointer transition hover:text-primary-800"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                  {/* <li>
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
                  </li> */}
                </ul>
              </div>
              {isAuthenticated || isAdminAuthenticated ? (
                <div>
                  {isAdminAuthenticated ? (
                    <div className=" relative">
                      <button
                        onClick={toggleUserMenu}
                        className="flex rounded-full cursor-pointer"
                      >
                        {bookacrib_admin?.picture === null ? (
                          <div>
                            <span className="sr-only">Open user menu</span>
                            <div className="relative inline-flex items-center justify-center w-12 h-12  cursor-pointer overflow-hidden bg-gray-200 rounded-full ">
                              <span className="font-medium text-gray-600 uppercase text-base ">
                                {getNameInitials(bookacrib_admin?.last_name)}
                                {getNameInitials(bookacrib_admin?.first_name)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <img
                            className="w-12 h-12 rounded-full"
                            src={bookacrib_admin?.picture}
                            alt="user photo"
                          />
                        )}
                      </button>
                      {showUserMenu && <AdminMenu />}
                    </div>
                  ) : (
                    <Link to="/user/dashboard">
                      <Button
                        className="w-full justify-center lg:w-max"
                        size="sm"
                      >
                        Go to Dashboard →
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className=" flex flex-col lg:flex-row items-center gap-3">
                  <Link to="/sign-up">
                    <Button
                      className="w-full justify-center lg:w-max"
                      size="sm"
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      className="w-full justify-center lg:w-max"
                      size="sm"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
