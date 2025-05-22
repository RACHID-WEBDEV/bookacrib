/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { logoutThunk } from "src/Redux/auth/authThunk";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button } from "../components/forms/Button";
import { switchCompany } from "../Redux/auth/authThunk";
import { Dropdown, DropdownItem } from "flowbite-react";
import { ArrowDownIcon } from "../assets/SvgIcons";
// import { persistor } from "../Redux/store";
import SmallSpinner from "../components/Loading/SmallSpinner";
import { cribOwnerMenu } from "../data/userMenu";

// eslint-disable-next-line react/prop-types
const CribMenu = ({ setShowUserMenu }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
    // persistor.purge();
  };
  const { currentUser, companyId, switchToCompany, loading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  // console.log("currentUser", currentUser);
  // console.log("companyId: ", companyId);

  const newCompanyId = currentUser?.companies[0]?.uuid;
  console.log("newCompanyId: ", newCompanyId);
  const handleSwitchCompany = async () => {
    if (!switchToCompany && currentUser?.companies?.length > 0) {
      dispatch(
        switchCompany({ companyId: newCompanyId, switchToCompany: true })
      )
        .unwrap()
        .then(() => {
          toast.success("Switched to company successfully");
          navigate("/crib-owner/dashboard");
        })
        .catch((error) => toast.error(`Error switching company: ${error}`));
    } else {
      dispatch(switchCompany({ companyId: null, switchToCompany: false }))
        .unwrap()
        .then(() => {
          toast.success("Switched to user successfully");
          navigate("/user/dashboard"); // You might want this line here
        })
        .catch((error) => toast.error(`Error switching to user: ${error}`));
    }
  };

  // const handleSwitchCompany = async () => {
  //   if (!switchToCompany && currentUser?.companies?.length > 0) {
  //     dispatch(
  //       switchCompany({ companyId: newCompanyId, switchToCompany: true })
  //     )
  //       .unwrap()
  //       .then(() => toast.success("Switched to company successfully"))
  //       .catch((error) => toast.error(`Error switching company: ${error}`));
  //   } else {
  //     dispatch(switchCompany({ companyId: null, switchToCompany: false }))
  //       .unwrap()
  //       .then(() => toast.success("Switched to user successfully"))
  //       .catch((error) => toast.error(`Error switching to user: ${error}`));
  //   }
  // };

  return (
    <div className="absolute top-10 right-3 transition-all duration-300 ease-in">
      <div className="z-50 my-4 text-base text-left list-none bg-gray-50  rounded shadow ">
        <div className="border-b pb-2 border-gray-400 p-4 px-8">
          <p className=" text-gray-900 font-semibold capitalize">
            {currentUser?.first_name} {currentUser?.last_name}
          </p>
          <p className="text-sm font-normal text-gray-500 truncate ">
            {currentUser?.email}
          </p>
        </div>
        {newCompanyId && (
          <div className="text-sm pt-4 px-8 text-gray-600 ">
            <Dropdown
              dismissOnClick={true}
              inline
              arrowIcon={false}
              placement="bottom"
              label={
                <Button
                  rightIcon={
                    <span>
                      <ArrowDownIcon />
                    </span>
                  }
                >
                  <span className=" whitespace-nowrap ">Switch Account</span>
                </Button>
              }
            >
              <DropdownItem>
                <span
                  onClick={handleSwitchCompany}
                  className="!text-sm !text-gray-600 font-normal uppercase"
                >
                  {switchToCompany ? "Switch to User" : "Switch to Company"}
                </span>
              </DropdownItem>
            </Dropdown>
          </div>
        )}

        <ul className="py-2 ">
          {cribOwnerMenu.map(({ link, routeName }, index) => (
            <li key={index} className="" onClick={() => setShowUserMenu(false)}>
              <Link
                to={link}
                className="block  py-2 px-8 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-200"
              >
                {routeName}
              </Link>
            </li>
          ))}
          <li
            className="  py-2 px-8 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-200 cursor-pointer flex items-center gap-2 "
            onClick={handleLogout}
          >
            {loading && <SmallSpinner />}
            {loading ? "Signing out" : " Sign out"}
          </li>
          {/* <li
            className="block  py-2 px-8 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
            onClick={handleLogout}
          >
            Sign out
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default CribMenu;
