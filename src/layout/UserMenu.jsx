/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import userMenu from "src/data/userMenu";
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
import { persistor } from "../Redux/store";
import SmallSpinner from "../components/Loading/SmallSpinner";

const UserMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
    persistor.purge();
  };
  const { currentUser, companyId, switchToCompany, loading } = useSelector(
    (state) => state.auth
  );

  // console.log("currentUser", currentUser);
  // console.log("companyId: ", companyId);

  const newCompanyId = currentUser?.companies[0]?.uuid;
  // console.log("newCompanyId: ", newCompanyId);

  const handleSwitchCompany = async () => {
    if (!switchToCompany && currentUser?.companies?.length > 0) {
      dispatch(
        switchCompany({ companyId: newCompanyId, switchToCompany: true })
      )
        .unwrap()
        .then(() => toast.success("Switched to company successfully"))
        .catch((error) => toast.error(`Error switching company: ${error}`));
    } else {
      dispatch(switchCompany({ companyId: null, switchToCompany: false }))
        .unwrap()
        .then(() => toast.success("Switched to user successfully"))
        .catch((error) => toast.error(`Error switching to user: ${error}`));
    }
  };

  // const handleSwitchCompany = async () => {
  //   try {
  //     if (!isActive) {
  //       if (currentUser?.companies.length > 0) {
  //         const newCompanyId = currentUser.companies[0].uuid;
  //         Cookies.set("bookacrib_current_company_id", newCompanyId, {
  //           expires: 7,
  //           sameSite: "None",
  //           secure: true,
  //         });
  //         setCompanyId(newCompanyId);
  //         setIsActive(true);
  //         toast.success("Switched to company successfully");
  //       }
  //     } else {
  //       Cookies.remove("bookacrib_current_company_id");
  //       setCompanyId(null);
  //       setIsActive(false);
  //       toast.success("Switched to user successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error switching company:", error);
  //   }
  // };

  // const handleSwitchCompany = async () => {
  //   try {
  //     const companies = currentUser?.companies;

  //     if (companies?.length > 0) {
  //       const companyId = companies[0].uuid;
  //       Cookies.set("bookacrib_current_company_id", companyId, {
  //         expires: 7,
  //         sameSite: "None",
  //         secure: true,
  //       });
  //       toast.success("Switched to company successfully");
  //     } else {
  //       Cookies.remove("bookacrib_current_company_id");
  //       toast.success("Switched to user successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error switching company:", error);
  //   }
  // };

  // console.log("currentUser", currentUser);
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

        {/* <Button onClick={handleSwitchCompany}>
          {switchToCompany ? "Switch to User" : "Switch to Company"}
        </Button> */}

        {/* <Button onClick={handleSwitchCompany}>
          {isActive ? "Switch to User" : "Switch to Company"}
        </Button> */}

        {/* <div className="text-sm pt-4 px-8 text-gray-600 ">
          <label className="inline-flex items-center gap-2 cursor-pointer  ">
            Switch to Company
            <input
              type="checkbox"
              className="sr-only peer"
              value=""
              //  defaultChecked={item?.is_active === true}
              onClick={() => handleSwitchCompany()}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-success-600"></div>
          </label>
        </div> */}
        <ul className="py-2 ">
          {userMenu.map(({ link, routeName }, index) => (
            <li key={index} className="">
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

export default UserMenu;
