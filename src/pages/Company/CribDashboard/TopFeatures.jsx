/* eslint-disable react/prop-types */
import { Dropdown, DropdownItem } from "flowbite-react";
import { ProgressIcon, MoreInfoIcon } from "../../../assets/SvgIcons";
import classNames from "classnames";
import { useState } from "react";

const TopFeatures = ({ data }) => {
  console.log(data);
  const [activeId, setActiveId] = useState("total_bookings");
  const [activeCrib, setActiveCrib] = useState("total_properties");
  // const [activeUser, setActiveUser] = useState("total_users");
  // const [activeCribOwner, setActiveCribOwner] = useState("total_companies");

  // console.log("activeUser", activeUser);
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  pb-6">
      <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
        <div className="space-y-3 ">
          <p className="text-gray-700 font-medium text- pt-2">
            {activeId === "total_failed" && <span>Failed</span>}{" "}
            {activeId === "total_bookings" && <span>Total</span>}{" "}
            {activeId === "total_pending" && <span>Pending</span>}
            {activeId === "total_paid" && <span>Paid</span>} Bookings
          </p>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">
              {activeId === "total_failed" && data?.bookings?.total_failed}
              {activeId === "total_bookings" && data?.bookings?.total_bookings}
              {activeId === "total_pending" && data?.bookings?.total_pending}
              {activeId === "total_paid" && data?.bookings?.total_paid}
            </p>
            <div className=" flex items-center gap-1">
              <p
                className={classNames(
                  " font-medium",
                  {
                    "text-green-700":
                      // activeId === "total_failed" &&
                      // data?.bookings?.total_failed >= 3,
                      (activeId === "total_failed" &&
                        data?.bookings?.total_failed >= 3) ||
                      (activeId === "total_bookings" &&
                        data?.bookings?.total_bookings >= 3) ||
                      (activeId === "total_pending" &&
                        data?.bookings?.total_pending >= 3) ||
                      (activeId === "total_paid" &&
                        data?.bookings?.total_paid >= 3),
                  },
                  {
                    "text-red-700":
                      // activeId === "total_failed" &&
                      // data?.bookings?.total_failed <= 2,
                      (activeId === "total_failed" &&
                        data?.bookings?.total_failed <= 2) ||
                      (activeId === "total_bookings" &&
                        data?.bookings?.total_bookings <= 2) ||
                      (activeId === "total_pending" &&
                        data?.bookings?.total_pending <= 2) ||
                      (activeId === "total_paid" &&
                        data?.bookings?.total_paid <= 2),
                  }
                )}
              >
                {(activeId === "total_failed" &&
                  data?.bookings?.total_failed <= 2) ||
                (activeId === "total_bookings" &&
                  data?.bookings?.total_bookings <= 2) ||
                (activeId === "total_pending" &&
                  data?.bookings?.total_pending <= 2) ||
                (activeId === "total_paid" && data?.bookings?.total_paid <= 2)
                  ? "-"
                  : "+"}

                {activeId === "total_failed" && data?.bookings?.total_failed}
                {activeId === "total_bookings" &&
                  data?.bookings?.total_bookings}
                {activeId === "total_pending" && data?.bookings?.total_pending}
                {activeId === "total_paid" && data?.bookings?.total_paid}
              </p>
              <div
                className={classNames({
                  "rotate-180":
                    (activeId === "total_failed" &&
                      data?.bookings?.total_failed <= 3) ||
                    (activeId === "total_bookings" &&
                      data?.bookings?.total_bookings <= 3) ||
                    (activeId === "total_pending" &&
                      data?.bookings?.total_pending <= 3) ||
                    (activeId === "total_paid" &&
                      data?.bookings?.total_paid <= 3),
                })}
              >
                <ProgressIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-2">
          <Dropdown
            dismissOnClick={true}
            inline
            arrowIcon={false}
            placement="bottom"
            label={
              <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                <MoreInfoIcon />
                <span>{/* <ArrowDownIcon className="text-gray-800" /> */}</span>
              </div>
            }
          >
            <DropdownItem onClick={() => setActiveId("total_paid")}>
              <p
                id="total_paid"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Paid Bookings
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveId("total_failed")}>
              <p
                id="total_failed"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Failed Bookings
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveId("total_bookings")}>
              <p
                id="total_bookings"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Total Bookings
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveId("total_pending")}>
              <p
                id="total_pending"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Pending Bookings
              </p>
            </DropdownItem>

            {/* <DropdownItem>
               <div className="flex items-center w-full gap-4 justify-between">
                 <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                   View All
                 </p>
               </div>
             </DropdownItem> */}
            {/* <DropdownItem>
               <div className="flex items-center w-full gap-4 justify-between">
                 <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                   Refresh
                 </p>
               </div>
             </DropdownItem> */}
          </Dropdown>
        </div>
      </div>
      <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
        <div className="space-y-3 ">
          <p className="text-gray-700 font-medium text- pt-2">
            {activeCrib === "total_active" && <span>Active</span>}{" "}
            {activeCrib === "total_properties" && <span>Total</span>}{" "}
            {activeCrib === "total_approved" && <span>Approved</span>}
            {activeCrib === "total_pending" && <span>Pending</span>}
            {activeCrib === "total_declined" && <span>Declined</span>}{" "}
            {activeCrib === "total_active_and_approved" && (
              <span>Active & Approved</span>
            )}
            {activeCrib === "total_in_active" && <span>Inactive </span>} Cribs
          </p>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">
              {activeCrib === "total_active" && data?.properties?.total_active}
              {activeCrib === "total_properties" &&
                data?.properties?.total_properties}
              {activeCrib === "total_approved" &&
                data?.properties?.total_approved}
              {activeCrib === "total_pending" &&
                data?.properties?.total_pending}
              {activeCrib === "total_declined" &&
                data?.properties?.total_declined}
              {activeCrib === "total_active_and_approved" &&
                data?.properties?.total_active_and_approved}

              {activeCrib === "total_in_active" &&
                data?.properties?.total_in_active}
            </p>
            <div className=" flex items-center gap-1">
              <p
                className={classNames(
                  " font-medium",
                  {
                    "text-green-700":
                      // activeCrib === "total_active" &&
                      // data?.bookings?.total_failed >= 3,
                      (activeCrib === "total_active" &&
                        data?.properties?.total_active >= 3) ||
                      (activeCrib === "total_properties" &&
                        data?.properties?.total_properties >= 3) ||
                      (activeCrib === "total_approved" &&
                        data?.properties?.total_approved >= 3) ||
                      (activeCrib === "total_pending" &&
                        data?.properties?.total_pending >= 3) ||
                      (activeCrib === "total_declined" &&
                        data?.properties?.total_declined >= 3) ||
                      (activeCrib === "total_active_and_approved" &&
                        data?.properties?.total_active_and_approved >= 3) ||
                      (activeCrib === "total_in_active" &&
                        data?.properties?.total_in_active >= 3),
                  },
                  {
                    "text-red-700":
                      // activeCrib === "total_active" &&
                      // data?.properties?.total_failed <= 2,
                      (activeCrib === "total_active" &&
                        data?.properties?.total_active <= 2) ||
                      (activeCrib === "total_properties" &&
                        data?.properties?.total_properties <= 2) ||
                      (activeCrib === "total_approved" &&
                        data?.properties?.total_approved <= 2) ||
                      (activeCrib === "total_pending" &&
                        data?.properties?.total_pending <= 2) ||
                      (activeCrib === "total_declined" &&
                        data?.properties?.total_declined <= 2) ||
                      (activeCrib === "total_active_and_approved" &&
                        data?.properties?.total_active_and_approved <= 2) ||
                      (activeCrib === "total_in_active" &&
                        data?.properties?.total_in_active <= 2),
                  }
                )}
              >
                {(activeCrib === "total_active" &&
                  data?.properties?.total_active <= 2) ||
                (activeCrib === "total_properties" &&
                  data?.properties?.total_properties <= 2) ||
                (activeCrib === "total_approved" &&
                  data?.properties?.total_approved <= 2) ||
                (activeCrib === "total_pending" &&
                  data?.properties?.total_pending <= 2) ||
                (activeCrib === "total_declined" &&
                  data?.properties?.total_declined <= 2) ||
                (activeCrib === "total_active_and_approved" &&
                  data?.properties?.total_active_and_approved <= 2) ||
                (activeCrib === "total_in_active" &&
                  data?.properties?.total_in_active <= 2)
                  ? "-"
                  : "+"}

                {activeCrib === "total_active" &&
                  data?.properties?.total_active}
                {activeCrib === "total_properties" &&
                  data?.properties?.total_properties}
                {activeCrib === "total_approved" &&
                  data?.properties?.total_approved}
                {activeCrib === "total_pending" &&
                  data?.properties?.total_pending}
                {activeCrib === "total_declined" &&
                  data?.properties?.total_declined}
                {activeCrib === "total_active_and_approved" &&
                  data?.properties?.total_active_and_approved}
                {activeCrib === "total_in_active" &&
                  data?.properties?.total_in_active}
              </p>
              <div
                className={classNames({
                  "rotate-180":
                    (activeCrib === "total_active" &&
                      data?.properties?.total_active <= 3) ||
                    (activeCrib === "total_properties" &&
                      data?.properties?.total_properties <= 3) ||
                    (activeCrib === "total_approved" &&
                      data?.properties?.total_approved <= 3) ||
                    (activeCrib === "total_pending" &&
                      data?.properties?.total_pending <= 3) ||
                    (activeCrib === "total_declined" &&
                      data?.properties?.total_declined <= 3) ||
                    (activeCrib === "total_active_and_approved" &&
                      data?.properties?.total_active_and_approved <= 3) ||
                    (activeCrib === "total_in_active" &&
                      data?.properties?.total_in_active <= 3),
                })}
              >
                <ProgressIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-2">
          <Dropdown
            dismissOnClick={true}
            inline
            arrowIcon={false}
            placement="bottom"
            label={
              <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                <MoreInfoIcon />
                <span>{/* <ArrowDownIcon className="text-gray-800" /> */}</span>
              </div>
            }
          >
            <DropdownItem onClick={() => setActiveCrib("total_active")}>
              <p
                id="total_active"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Active Crib
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCrib("total_properties")}>
              <p
                id="total_properties"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Total Crib
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCrib("total_approved")}>
              <p
                id="total_approved"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Approved Crib
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCrib("total_pending")}>
              <p
                id="total_pending"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Pending Crib
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCrib("total_declined")}>
              <p
                id="total_declined"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Declined Crib
              </p>
            </DropdownItem>
            <DropdownItem
              onClick={() => setActiveCrib("total_active_and_approved")}
            >
              <p
                id="total_active_and_approved"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Active & Approved Crib
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCrib("total_in_active")}>
              <p
                id="total_in_active"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Inactive Crib
              </p>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      {/* <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
        <div className="space-y-3 ">
          <p className="text-gray-700 font-medium text- pt-2">
            {activeCribOwner === "total_active" && <span>Active</span>}{" "}
            {activeCribOwner === "total_companies" && <span>Total</span>}{" "}
            {activeCribOwner === "total_approved" && <span>Approved</span>}
            {activeCribOwner === "total_pending" && <span>Pending</span>}
            {activeCribOwner === "total_declined" && <span>Declined</span>}{" "}
            {activeCribOwner === "total_active_and_approved" && (
              <span>Active & Approved</span>
            )}
            {activeCribOwner === "total_in_active" && <span>Inactive </span>}{" "}
            Crib Owners
          </p>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">
              {activeCribOwner === "total_active" &&
                data?.companies?.total_active}
              {activeCribOwner === "total_companies" &&
                data?.companies?.total_companies}
              {activeCribOwner === "total_approved" &&
                data?.companies?.total_approved}
              {activeCribOwner === "total_pending" &&
                data?.companies?.total_pending}
              {activeCribOwner === "total_declined" &&
                data?.companies?.total_declined}
              {activeCribOwner === "total_active_and_approved" &&
                data?.companies?.total_active_and_approved}

              {activeCribOwner === "total_in_active" &&
                data?.companies?.total_in_active}
            </p>
            <div className=" flex items-center gap-1">
              <p
                className={classNames(
                  " font-medium",
                  {
                    "text-green-700":
                      // activeCribOwner === "total_active" &&
                      // data?.bookings?.total_failed >= 3,
                      (activeCribOwner === "total_active" &&
                        data?.companies?.total_active >= 3) ||
                      (activeCribOwner === "total_companies" &&
                        data?.companies?.total_companies >= 3) ||
                      (activeCribOwner === "total_approved" &&
                        data?.companies?.total_approved >= 3) ||
                      (activeCribOwner === "total_pending" &&
                        data?.companies?.total_pending >= 3) ||
                      (activeCribOwner === "total_declined" &&
                        data?.companies?.total_declined >= 3) ||
                      (activeCribOwner === "total_active_and_approved" &&
                        data?.companies?.total_active_and_approved >= 3) ||
                      (activeCribOwner === "total_in_active" &&
                        data?.companies?.total_in_active >= 3),
                  },
                  {
                    "text-red-700":
                      // activeCribOwner === "total_active" &&
                      // data?.companies?.total_failed <= 2,
                      (activeCribOwner === "total_active" &&
                        data?.companies?.total_active <= 2) ||
                      (activeCribOwner === "total_companies" &&
                        data?.companies?.total_companies <= 2) ||
                      (activeCribOwner === "total_approved" &&
                        data?.companies?.total_approved <= 2) ||
                      (activeCribOwner === "total_pending" &&
                        data?.companies?.total_pending <= 2) ||
                      (activeCribOwner === "total_declined" &&
                        data?.companies?.total_declined <= 2) ||
                      (activeCribOwner === "total_active_and_approved" &&
                        data?.companies?.total_active_and_approved <= 2) ||
                      (activeCribOwner === "total_in_active" &&
                        data?.companies?.total_in_active <= 2),
                  }
                )}
              >
                {(activeCribOwner === "total_active" &&
                  data?.companies?.total_active <= 2) ||
                (activeCribOwner === "total_companies" &&
                  data?.companies?.total_companies <= 2) ||
                (activeCribOwner === "total_approved" &&
                  data?.companies?.total_approved <= 2) ||
                (activeCribOwner === "total_pending" &&
                  data?.companies?.total_pending <= 2) ||
                (activeCribOwner === "total_declined" &&
                  data?.companies?.total_declined <= 2) ||
                (activeCribOwner === "total_active_and_approved" &&
                  data?.companies?.total_active_and_approved <= 2) ||
                (activeCribOwner === "total_in_active" &&
                  data?.companies?.total_in_active <= 2)
                  ? "-"
                  : "+"}

                {activeCribOwner === "total_active" &&
                  data?.companies?.total_active}
                {activeCribOwner === "total_companies" &&
                  data?.companies?.total_companies}
                {activeCribOwner === "total_approved" &&
                  data?.companies?.total_approved}
                {activeCribOwner === "total_pending" &&
                  data?.companies?.total_pending}
                {activeCribOwner === "total_declined" &&
                  data?.companies?.total_declined}
                {activeCribOwner === "total_active_and_approved" &&
                  data?.companies?.total_active_and_approved}
                {activeCribOwner === "total_in_active" &&
                  data?.companies?.total_in_active}
              </p>
              <div
                className={classNames({
                  "rotate-180":
                    (activeCribOwner === "total_active" &&
                      data?.companies?.total_active <= 3) ||
                    (activeCribOwner === "total_companies" &&
                      data?.companies?.total_companies <= 3) ||
                    (activeCribOwner === "total_approved" &&
                      data?.companies?.total_approved <= 3) ||
                    (activeCribOwner === "total_pending" &&
                      data?.companies?.total_pending <= 3) ||
                    (activeCribOwner === "total_declined" &&
                      data?.companies?.total_declined <= 3) ||
                    (activeCribOwner === "total_active_and_approved" &&
                      data?.companies?.total_active_and_approved <= 3) ||
                    (activeCribOwner === "total_in_active" &&
                      data?.companies?.total_in_active <= 3),
                })}
              >
                <ProgressIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-2">
          <Dropdown
            dismissOnClick={true}
            inline
            arrowIcon={false}
            placement="bottom"
            label={
              <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                <MoreInfoIcon />
                <span></span>
              </div>
            }
          >
            <DropdownItem onClick={() => setActiveCribOwner("total_active")}>
              <p
                id="total_active"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Active Crib Owners
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCribOwner("total_companies")}>
              <p
                id="total_companies"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Total Crib Owners
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCribOwner("total_approved")}>
              <p
                id="total_approved"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Approved Crib Owners
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCribOwner("total_pending")}>
              <p
                id="total_pending"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Pending Crib Owners
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCribOwner("total_declined")}>
              <p
                id="total_declined"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Declined Crib Owners
              </p>
            </DropdownItem>
            <DropdownItem
              onClick={() => setActiveCribOwner("total_active_and_approved")}
            >
              <p
                id="total_active_and_approved"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Active & Approved Crib Owners
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveCribOwner("total_in_active")}>
              <p
                id="total_in_active"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Inactive Crib Owners
              </p>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
        <div className="space-y-3 ">
          <p className="text-gray-700 font-medium text- pt-2">
            {activeUser === "total_active" && <span>Active</span>}{" "}
            {activeUser === "total_users" && <span>Total</span>}{" "}
            {activeUser === "total_inactive" && <span>Inactive</span>}
            {activeUser === "total_unverified" && <span>Unverified</span>}{" "}
            Customers
          </p>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">
              {activeUser === "total_active" && data?.users?.total_active}
              {activeUser === "total_users" && data?.users?.total_users}
              {activeUser === "total_inactive" && data?.users?.total_inactive}
              {activeUser === "total_unverified" &&
                data?.users?.total_unverified}
            </p>
            <div className=" flex items-center gap-1">
              <p
                className={classNames(
                  " font-medium",
                  {
                    "text-green-700":
                      // activeUser === "total_active" &&
                      // data?.bookings?.total_failed >= 3,
                      (activeUser === "total_active" &&
                        data?.users?.total_active >= 3) ||
                      (activeUser === "total_users" &&
                        data?.users?.total_users >= 3) ||
                      (activeUser === "total_inactive" &&
                        data?.users?.total_inactive >= 3) ||
                      (activeUser === "total_unverified" &&
                        data?.users?.total_unverified >= 3),
                  },
                  {
                    "text-red-700":
                      // activeUser === "total_active" &&
                      // data?.users?.total_failed <= 2,
                      (activeUser === "total_active" &&
                        data?.users?.total_active <= 2) ||
                      (activeUser === "total_users" &&
                        data?.users?.total_users <= 2) ||
                      (activeUser === "total_inactive" &&
                        data?.users?.total_inactive <= 2) ||
                      (activeUser === "total_unverified" &&
                        data?.users?.total_unverified <= 2),
                  }
                )}
              >
                {(activeUser === "total_active" &&
                  data?.users?.total_active <= 2) ||
                (activeUser === "total_users" &&
                  data?.users?.total_users <= 2) ||
                (activeUser === "total_inactive" &&
                  data?.users?.total_inactive <= 2) ||
                (activeUser === "total_unverified" &&
                  data?.users?.total_unverified <= 2)
                  ? "-"
                  : "+"}

                {activeUser === "total_active" && data?.users?.total_active}
                {activeUser === "total_users" && data?.users?.total_users}
                {activeUser === "total_inactive" && data?.users?.total_inactive}
                {activeUser === "total_unverified" &&
                  data?.users?.total_unverified}
              </p>
              <div
                className={classNames({
                  "rotate-180":
                    (activeUser === "total_active" &&
                      data?.users?.total_active <= 3) ||
                    (activeUser === "total_users" &&
                      data?.users?.total_users <= 3) ||
                    (activeUser === "total_inactive" &&
                      data?.users?.total_inactive <= 3) ||
                    (activeUser === "total_unverified" &&
                      data?.users?.total_unverified <= 3),
                })}
              >
                <ProgressIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-2">
          <Dropdown
            dismissOnClick={true}
            inline
            arrowIcon={false}
            placement="bottom"
            label={
              <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                <MoreInfoIcon />
                <span> <ArrowDownIcon className="text-gray-800" /> </span>
              </div>
            }
          >
            <DropdownItem onClick={() => setActiveUser("total_active")}>
              <p
                id="total_active"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Active Customers
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveUser("total_users")}>
              <p
                id="total_users"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Total Customers
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveUser("total_inactive")}>
              <p
                id="total_inactive"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Inactive Customers
              </p>
            </DropdownItem>
            <DropdownItem onClick={() => setActiveUser("total_unverified")}>
              <p
                id="total_unverified"
                className="!text-sm !text-gray-600 font-normal whitespace-nowrap"
              >
                Unverified Customers
              </p>
            </DropdownItem>
          </Dropdown>
        </div>
      </div> */}
      {/* <div className="relative w-full p-6 pr-10 h-32 rounded-2xl  group bg-white">
         <div className="space-y-3 ">
           <p className="text-gray-700 font-medium text- pt-2">
             Total Customers
           </p>
 
           <div className="flex items-center justify-between">
             <p className="text-2xl font-bold text-gray-800">
               {data?.users?.total_users}
             </p>
             <div className=" flex items-center gap-1">
               <p className="text-green-700 font-medium">+20</p>
 
               <ProgressIcon />
             </div>
           </div>
         </div>
         <div className="absolute top-8 right-2">
           <Dropdown
             dismissOnClick={false}
             inline
             arrowIcon={false}
             placement="bottom"
             label={
               <div className=" text-gray-700 font-medium font-Inter text-sm rounded-md ">
                 <MoreInfoIcon />
                 <span><ArrowDownIcon className="text-gray-800" /></span>
               </div>
             }
           >
             <DropdownItem>
               <div className="flex items-center w-full gap-4 justify-between ">
                 <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                   Active Users
                 </p>
               </div>
             </DropdownItem>
             <DropdownItem>
               <div className="flex items-center w-full gap-4 justify-between">
                 <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                   View All
                 </p>
               </div>
             </DropdownItem>
             <DropdownItem>
               <div className="flex items-center w-full gap-4 justify-between">
                 <p className="!text-sm !text-gray-600 font-normal whitespace-nowrap">
                   Refresh
                 </p>
               </div>
             </DropdownItem>
           </Dropdown>
         </div>
       </div> */}
    </div>
  );
};

export default TopFeatures;
