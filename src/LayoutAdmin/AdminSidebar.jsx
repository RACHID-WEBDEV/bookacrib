/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import LogoWhite from "src/assets/images/bookacrib-logo.svg";
import DoubleArrown from "src/assets/images/left-double.svg";
// import Avatar from "src/assets/images/Avatar.png";
import classNames from "classnames";
import { LogOutIcon } from "src/assets/SvgIcons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "src/Redux/auth/authThunk";
import { getBasePath } from "src/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

import { adminsidedata } from "../data/sideBarData";
import { AvatarIcon, SettingsIcon } from "../assets/SvgIcons";
import { getNameInitials } from "../lib/constants";
import { persistor } from "../Redux/store";
import { adminLogoutThunk } from "../Redux/adminAuth/adminAuthThunk";
import toast from "react-hot-toast";

const AdminSidebar = ({
  openSideMenu,
  openMenu,
  setOpenMenu,
  collapaseMenu,
  toggleOpenSideBar,
  clickOpenSideBar,
}) => {
  const [open, setOpen] = useState(null);
  // const [hovered, setHovered] = useState(false);
  // console.log("first state", clickOpenSideBar);
  const toggle = (index) => {
    setOpen(index === open ? null : index);
  };

  const { bookacrib_admin_user } = useSelector((state) => state.adminauth);

  // console.log("bookacrib_admin_user one:", bookacrib_admin_user);
  const bookacrib_admin = bookacrib_admin_user?.data || bookacrib_admin_user;
  const location = useLocation();
  const currentPath = location.pathname;
  // console.log("first path: ", currentPath);
  // console.log("get base url: ", getBasePath(currentPath));

  const dispatch = useDispatch();

  const handleLogout = async () => {
    // dispatch(logoutThunk());
    // persistor.purge();
    try {
      const result = await dispatch(adminLogoutThunk()).unwrap();
      persistor.purge();
      // console.log("logged out: ", result);

      if (result.status >= 200 && result.status <= 300) {
        toast.success(result.message);
      }
    } catch (error) {
      console.log("first error: ", error);
      toast.error(error, { duration: 6000 });
      // if (error?.status >= 400 && error?.status <= 499) {
      //   // const errorMessages = Object.values(error?.errors).flat().join(", ");
      // }
    }
  };

  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeMultiMenu, setMultiMenu] = useState(null);

  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const toggleMultiMenu = (subIndex) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };

  return (
    <div className="">
      <motion.aside
        initial={{ width: 65 }}
        animate={{
          width: openMenu === false || clickOpenSideBar === true ? 270 : 65,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={classNames(
          "fixed top-0 left-0 z-40  h-screen transition-transform duration-[1600ms] ",

          { "md:w-16 ": openMenu === true },
          { "w-[270px]": openMenu === false },
          { "w-[270px]": clickOpenSideBar === true }
        )}
        aria-label="Sidebar"
      >
        <div
          className="relative h-full px-3  overflow-y-auto bg-white "
          onMouseEnter={() => setOpenMenu(false)}
          onMouseLeave={() => setOpenMenu(true)}
        >
          <div className=" sticky top-0 w-full z-40 bg-white pt-2">
            <div
              className={classNames(
                "   flex items-center justify-between bg-white  py-6"
                // {
                //   " px-4": !openMenu && clickOpenSideBar === false,
                // }
              )}
            >
              <div
                className={classNames("pl-4", {
                  "hidden group-hover:block":
                    openMenu === true && clickOpenSideBar === false,
                })}
              >
                <Link to="/">
                  <img src={LogoWhite} alt="logo" />
                </Link>
              </div>
              <div
                className={classNames(
                  "p-2 bg-primary-100 rounded-lg cursor-pointer ",
                  {
                    "rotate-180 ":
                      openMenu === true && clickOpenSideBar === false,
                  }
                )}
                onClick={toggleOpenSideBar}
              >
                <img src={DoubleArrown} alt="arrow" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            {adminsidedata.map((item, index) => (
              <div key={index}>
                {item.isHeader ? (
                  <h2
                    className={classNames(
                      "px-4 mt-6 pb-2 text-primary-800 uppercase text-sm -ml-2",
                      {
                        hidden: openMenu === true && clickOpenSideBar === false,
                      }
                    )}
                  >
                    {item.title}
                  </h2>
                ) : (
                  <div>
                    <Link to={item.href} onClick={() => toggleSubmenu(index)}>
                      <div
                        className={classNames(
                          "flex items-center p-2 rounded-lg hover:text-primary-800 group text-base transition duration-75 hover:bg-primary-100",
                          {
                            "py-4 w-full":
                              !openMenu || clickOpenSideBar === true,
                            "bg-primary-100 text-primary-800":
                              getBasePath(currentPath) === item.href,
                            "text-tertiary-500":
                              getBasePath(currentPath) !== item.href,
                          }
                        )}
                      >
                        {item.icon}
                        <span
                          className={classNames(
                            {
                              hidden:
                                openMenu === true && clickOpenSideBar === false,
                            },
                            {
                              "group-hover:text-primary-800":
                                openMenu === false,
                            },
                            "flex-1 ms-3 text-left whitespace-nowrap group-hover:font-medium",
                            {
                              "text-primary-800 font-medium":
                                getBasePath(currentPath) === item.href,
                            },
                            {
                              "text-tertiary-800 font-normal":
                                getBasePath(currentPath) !== item.href,
                            }
                          )}
                        >
                          {item.title}
                        </span>

                        {item.child.length !== 0 && (
                          <span
                            className={classNames({
                              hidden:
                                openMenu === true && clickOpenSideBar === false,
                            })}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`transition-all duration-300 ${
                                activeSubmenu === index ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    </Link>

                    {item.child && (
                      <AnimatePresence>
                        {activeSubmenu === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className={classNames({
                              hidden:
                                openMenu === true && clickOpenSideBar === false,
                            })}
                          >
                            {item.child.map((child, childIndex) => (
                              <div key={childIndex}>
                                <Link
                                  to={child.href}
                                  onClick={() => toggleMultiMenu(childIndex)}
                                  className={`flex items-center px-4 py-2 text-sm ms-3 rounded-md my-2 text-gray-800 hover:text-primary-800 hover:bg-primary-100 ${
                                    location.pathname === child.href
                                      ? "bg-primary-50 text-primary-700"
                                      : ""
                                  }`}
                                >
                                  {child.icon}
                                  <span className="flex-1 ms-3 text-left group-hover:font-medium">
                                    {child.title}
                                  </span>
                                </Link>

                                {child.nested && (
                                  <AnimatePresence>
                                    {activeMultiMenu === childIndex && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                      >
                                        {child.nested.map(
                                          (nested, nestedIndex) => (
                                            <Link
                                              key={nestedIndex}
                                              to={nested.href}
                                              className={`block px-4 rounded-md py-2 ms-8 text-sm font-bold text-gray-100 hover:bg-gray-700 ${
                                                location.pathname ===
                                                nested.href
                                                  ? "bg-gray-700"
                                                  : ""
                                              }`}
                                            >
                                              <span>{nested.title}</span>
                                            </Link>
                                          )
                                        )}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div>
              <div
                className={classNames(
                  "flex items-center py-2 pl-1 rounded-lg hover:text-primary-800 group text-base transition duration-75 hover:bg-primary-100",
                  {
                    "py-4 w-full": !openMenu || clickOpenSideBar === true,
                    "bg-primary-100 text-primary-800":
                      getBasePath(currentPath) === "logout",
                    "text-tertiary-500": getBasePath(currentPath) !== "logout",
                  }
                )}
              >
                <button className="flex rounded-full cursor-pointer">
                  {bookacrib_admin.picture === null ? (
                    <div>
                      <span className="sr-only">Open user menu</span>
                      <div className="relative inline-flex items-center justify-center w-10 h-10  cursor-pointer overflow-hidden bg-gray-200 rounded-full ">
                        <span className="font-medium text-gray-600 uppercase text-sm ">
                          {getNameInitials(bookacrib_admin.last_name)}
                          {getNameInitials(bookacrib_admin.first_name)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={bookacrib_admin.picture}
                      alt="user photo"
                    />
                  )}
                </button>
                {/* <AvatarIcon /> */}
                <span
                  className={classNames(
                    {
                      hidden: openMenu === true && clickOpenSideBar === false,
                    },
                    {
                      "group-hover:text-primary-800": openMenu === false,
                    },
                    "flex-1 ms-3 text-left whitespace-nowrap group-hover:font-medium",
                    {
                      "text-primary-800 font-medium":
                        getBasePath(currentPath) === "logout",
                    },
                    {
                      "text-tertiary-800 font-normal":
                        getBasePath(currentPath) !== "logout",
                    }
                  )}
                >
                  Profile
                </span>
              </div>
            </div>
            <Link to="" onClick={handleLogout}>
              <div
                className={classNames(
                  "flex items-center p-2 rounded-lg hover:text-red-800 group text-base transition duration-75 hover:bg-primary-100",
                  {
                    "py-4 w-full": !openMenu || clickOpenSideBar === true,
                    "bg-red-100 text-red-700":
                      getBasePath(currentPath) === "logout",
                    "text-red-700": getBasePath(currentPath) !== "logout",
                  }
                )}
              >
                <LogOutIcon />
                <span
                  className={classNames(
                    {
                      hidden: openMenu === true && clickOpenSideBar === false,
                    },
                    {
                      "group-hover:text-red-700": openMenu === false,
                    },
                    "flex-1 ms-3 text-left whitespace-nowrap group-hover:font-medium",
                    {
                      "text-red-700 font-medium":
                        getBasePath(currentPath) === "logout",
                    },
                    {
                      "text-red-700 font-normal":
                        getBasePath(currentPath) !== "logout",
                    }
                  )}
                >
                  Logout
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-4 pb-10"></div>
          </div>

          {/* <div className="flex items-start justify-between py-6 my-6   border-t border-white/20">
            <div className="flex items-center gap-4">
              <img
                className={classNames(" rounded-full w-10 h-10")}
                src={Avatar}
                alt="avatar"
              />
              <div
                className={classNames("font-medium text-gray-800", {
                  hidden: openMenu === true && clickOpenSideBar === false,
                })}
              >
                <h2 className=" capitalize">Admin</h2>
                <p className="text-sm text-gray-500 font-light ">
                  admin@example.com
                </p>
              </div>
            </div>
            <div
              onClick={handleLogout}
              className={classNames(" text-primary-800 cursor-pointer", {
                hidden: openMenu === true && clickOpenSideBar === false,
              })}
            >
              <LogOutIcon />
            </div>
          </div> */}
        </div>
      </motion.aside>
    </div>
  );
};

export default AdminSidebar;
