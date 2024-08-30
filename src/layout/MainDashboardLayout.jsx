import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { getBasePath } from "../lib/constants";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useViewport } from "../lib/screenSize";
import PropTypes from "prop-types";
// import Skelton from "./Skelton";

export const DashboardLayout = ({ children, openMenu, clickOpenSideBar }) => {
  const { isMobile, isTablet } = useViewport();
  // console.log("isTablet", isTablet, isMobile);
  return (
    <div>
      {isTablet || isMobile ? (
        <main>{children}</main>
      ) : (
        <motion.main
          initial={{ marginLeft: 65 }}
          animate={{
            marginLeft: clickOpenSideBar === true ? 270 : 65,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={classNames(
            "px-2  relative",
            { "lg:ml-[270px]": clickOpenSideBar == true },
            { "lg:ml-16": openMenu == true }
          )}
        >
          {children}
        </motion.main>
      )}
    </div>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  openMenu: PropTypes.bool,
  clickOpenSideBar: PropTypes.bool,
};

const MainDashboardLayout = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);
  const [clickOpenSideBar, setClickOpenSideBar] = useState(false);

  const toggleOpenSideBar = () => {
    setClickOpenSideBar(!clickOpenSideBar);
  };
  const toggleSideBar = () => {
    setOpenSideMenu(!openSideMenu);
  };

  const collapaseMenu = () => {
    setOpenMenu(!openMenu);
  };
  //   const location = useLocation();
  //   const currentPath = location.pathname;
  //   const databasepath = getBasePath(currentPath);

  return (
    <div>
      <>
        <main className="bg-gray-50 ">
          <div className=" hidden lg:block">
            <Sidebar
              openSideMenu={openSideMenu}
              collapaseMenu={collapaseMenu}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              toggleOpenSideBar={toggleOpenSideBar}
              clickOpenSideBar={clickOpenSideBar}
            />
          </div>

          <DashboardLayout
            openMenu={openMenu}
            clickOpenSideBar={clickOpenSideBar}
          >
            <NavBar
              toggleSideBar={toggleSideBar}
              openSideMenu={openSideMenu}
              // animateRight={animateRight}
            />

            <div className=" mt-16 overflow-hidden">
              <Outlet />
            </div>
          </DashboardLayout>
        </main>
      </>
    </div>
  );
};

export default MainDashboardLayout;
