/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import AdminMenu from "./AdminMenu";
// import UserAvatar from "src/assets/images/Avatar.png";
import { NotificationIcon, EMailIcon } from "src/assets/SvgIcons";
import MobileSidebar from "./AdminMobileSidebar";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useSelector } from "react-redux";
import { getNameInitials } from "../lib/constants";
import { Button } from "../components/forms/Button";
import { useNavigate } from "react-router-dom";

const AdminNavBar = ({ toggleSideBar, openSideMenu }) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  // const { currentUser } = useSelector((state) => state.auth);
  const { bookacrib_admin_user } = useSelector((state) => state.adminauth);

  // console.log("bookacrib_admin_user one:", bookacrib_admin_user);
  const bookacrib_admin = bookacrib_admin_user?.data || bookacrib_admin_user;

  function toggleUserMenu() {
    setShowUserMenu(!showUserMenu);
  }
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);

  const toogle = () => {
    setShow(!show);
  };

  const closeModal = () => {
    setShow(false);
    navigate("/admin/create-company");
  };
  const controls = useAnimation();

  useEffect(() => {
    if (openSideMenu === true) {
      controls.start({ width: "100%" });
    } else {
      controls.start({ width: "0%" });
    }
  }, [openSideMenu, controls]);

  return (
    <div className="w-full pl-4 lg:pl-[330px] bg-white py-4 fixed top-0 right-0 z-30 border-b border-[#E4E7EC]">
      {/* {openSideMenu && ( */}
      <motion.div
        initial={{ translateX: "120%" }}
        animate={{ translateX: openSideMenu === true ? "0%" : "120%" }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        className=" fixed top-4 right-2 z-40"
        onClick={toggleSideBar}
      >
        <span className="text-bgBlue bg-secondary rounded-lg p-2.5  inline-flex items-center">
          <span className="sr-only">Close sidebar Mobile</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </span>
      </motion.div>
      {/* )} */}

      {/* BG OVERLAY */}

      {/* {openSideMenu && ( */}
      <motion.div
        initial={{ translateX: "-100%" }}
        animate={{ translateX: openSideMenu === true ? "0%" : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className=" bg-neutral-900/70 backdrop-blur transition-all duration-500 z-30 fixed w-full h-full inset-0 "
      >
        <MobileSidebar openSideMenu={openSideMenu} />
      </motion.div>
      {/* )} */}

      <div className="flex  items-center justify-between lg:justify-end">
        <button
          onClick={toggleSideBar}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar Mobile</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        <div className="pr-4 lg:pr-8 relative">
          <div className="flex items-center ml-3 gap-4 lg:gap-6  ">
            <div className="flex items-center gap-6">
              {bookacrib_admin?.companies?.length === 0 && (
                <div className="relative">
                  <p
                    className="text-sm text-gray-500 cursor-pointer "
                    onClick={toogle}
                  >
                    Create a Property?
                  </p>
                  {show && (
                    <div
                      className="absolute top-0 right-0 p-4 border border-gray-300 z-30 w-[310px] rounded-lg bg-gray-50"
                      role="alert"
                    >
                      <div className="flex items-center gap-2">
                        <span className="sr-only">Info</span>
                        <h3 className="text-lg font-bold text-gray-800 ">
                          Create Property
                        </h3>
                      </div>
                      <div className="m1-2 mb-4 text-sm text-gray-500 font-normal max-w-sm mx-auto">
                        {/* <b>
                        You must be a property owner before you can create
                        property
                      </b>{" "} */}
                        <br />
                        Are a property owner? create a property
                        {/* Are you sure you want to create property ? */}
                      </div>
                      <div className="flex items-center justify-end mt-4 w-full gap-2">
                        <Button
                          color="error"
                          size="xs"
                          onClick={() => setShow(false)}
                        >
                          {" "}
                          Cancel
                        </Button>
                        {/* <Link to="/admin/create-company"> */}
                        <Button onClick={closeModal} size="xs">
                          {" "}
                          Proceed{" "}
                        </Button>
                        {/* </Link> */}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <EMailIcon className="w-6 h-6 cursor-pointer text-gray-500" />
              <div className=" relative">
                <NotificationIcon className="w-5 h-5 cursor-pointer text-gray-500" />
                <div className=" bg-red-600 absolute -top-0.5 right-px size-2 rounded-full"></div>
              </div>
            </div>

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
          </div>

          {showUserMenu && <AdminMenu />}
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
