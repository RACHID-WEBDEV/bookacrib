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
import { Badge } from "../components/forms/Badge";
import { adminLogoutThunk } from "../Redux/adminAuth/adminAuthThunk";
import SmallSpinner from "../components/Loading/SmallSpinner";

const AdminMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // dispatch(adminLogoutThunk());
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
  // const { currentUser, companyId, switchToCompany } = useSelector(
  //   (state) => state.auth
  // );

  const { bookacrib_admin_user, loading } = useSelector(
    (state) => state.adminauth
  );

  console.log("bookacrib_admin_user one:", bookacrib_admin_user);
  const bookacrib_admin = bookacrib_admin_user?.data || bookacrib_admin_user;

  // const newCompanyId = currentUser?.companies[0]?.uuid;
  // console.log("newCompanyId: ", newCompanyId);

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
            {bookacrib_admin?.first_name} {bookacrib_admin?.last_name}
          </p>
          <p className="text-sm font-normal text-gray-500 truncate ">
            {bookacrib_admin?.email}
          </p>
          {/* <Badge color="success" text={bookacrib_admin?.admin_type}></Badge> */}
          <p className="text-xs font-normal text-gray-600 truncate capitalize pt-1">
            {bookacrib_admin?.roles[0]?.display_name ||
              bookacrib_admin?.admin_type}
          </p>
        </div>
        {/* {newCompanyId && (
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
        )} */}

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
            {loading ? "Signing out" : "Sign out"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
