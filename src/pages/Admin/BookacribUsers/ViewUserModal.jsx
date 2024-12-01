/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ScrollArea } from "../../../components/forms/scroll-area";
// import { Button } from "../UI/Form/Button";

import { Label } from "../../../components/forms/Label";

import { Badge } from "../../../components/forms/Badge";
import { formatDateTime, formatNumber } from "../../../lib/constants";
import { Button } from "../../../components/forms/Button";
// import { Badge } from "../../../components/forms/Badge";
// import { DotIcon } from "src/assets/SvgIcons";
// import Spinner from "components/UI/Spinner";
// import ErrorStatus from "components/UI/ErrorStatus";

const ViewUserModal = ({ setOpenModal, userData }) => {
  console.log("show user : ", userData);
  return (
    <div className="w-full h-full fixed inset-0 bg-black/70 z-50 bg-opacity-50 backdrop-blur">
      <div
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full "
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-2xl shadow ">
            <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 ">
                  User Details
                </h1>
              </div>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => setOpenModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* contents below */}
            <div className=" h-[400px] ">
              <ScrollArea className="h-full">
                {/* {loading ? (
                  <div className="min-h-[400px] flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : error ? (
                  <ErrorStatus
                    message={JSON.stringify(error?.message)}
                    statusCode={error?.status_code || error.status}
                    link="/settings"
                    reload
                  />
                ) : ( */}
                <div className="p-5 space-y-6 text-sm">
                  <section className=" bg-white dark:bg-transparent">
                    <div className=" grid lg:grid-cols-2 gap-2 gap-x-4 text-sm ">
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">Full Name</h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {userData?.first_name} {userData?.last_name}{" "}
                          {userData?.middle_name}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">Email</h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {userData?.email}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">Phone Number</h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {userData?.phone_number}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">User Type</h3>
                        <p className="text-gray-800 mt-1 font-medium capitalize">
                          {userData?.user_type}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">Address</h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {userData?.address === null
                            ? "N/A"
                            : userData?.address}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">
                          Date of Birth
                        </h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {userData?.date_of_birth === null
                            ? "N/A"
                            : userData?.date_of_birth}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">Gender</h3>
                        <p className="text-gray-800 mt-1 font-medium capitalize">
                          {userData?.gender === null ? "N/A" : userData?.gender}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">
                          Marital Status
                        </h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {userData?.marital_status === null
                            ? "N/A"
                            : userData?.marital_status}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">
                          Next of Kin Name
                        </h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {userData?.next_of_kin_name === null
                            ? "N/A"
                            : userData?.next_of_kin_name}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">Status</h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {/* {userData?.is_active === true
                                ? "Active"
                                : "Disabled"} */}
                          <Badge
                            rounded
                            className="capitalize"
                            color={
                              userData?.is_active === true ? "success" : "error"
                            }
                            text={
                              userData?.is_active === true
                                ? "Active User"
                                : "Disabled"
                            }
                          ></Badge>
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">
                          Verify Status
                        </h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {userData?.is_verified === true
                            ? "Verified"
                            : "Not Verified"}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">
                          Verified Date
                        </h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {formatDateTime(userData?.email_verified_at)}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">Created Date</h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {formatDateTime(userData?.created_at)}
                        </p>
                      </div>
                      <div className="pb-2 border-b border-dashed">
                        <h3 className="text-xs  text-gray-600">Updated Date</h3>
                        <p className="text-gray-800 mt-1 font-medium">
                          {formatDateTime(userData?.updated_at)}
                        </p>
                      </div>
                      {userData?.company.length !== 0 && (
                        <div className="lg:col-span-2 pt-2">
                          <h3 className="text-sm font-semibold py-2 text-gray-900">
                            Company Details
                          </h3>
                          {userData?.company?.map((company, companyIndex) => (
                            <div
                              key={companyIndex}
                              className="border border-dashed rounded-md p-4 grid lg:grid-cols-2 gap-4"
                            >
                              <div className="pb-2 border-b border-dashed">
                                <h3 className="text-xs  text-gray-600">Name</h3>
                                <p className="text-gray-800 mt-1 font-medium">
                                  {company?.name}
                                </p>
                              </div>
                              <div className="pb-2 border-b border-dashed">
                                <h3 className="text-xs  text-gray-600">
                                  Email
                                </h3>
                                <p className="text-gray-800 mt-1 font-medium">
                                  {company?.email}
                                </p>
                              </div>
                              <div className="pb-2 border-b border-dashed">
                                <h3 className="text-xs  text-gray-600">
                                  Address
                                </h3>
                                <p className="text-gray-800 mt-1 font-medium">
                                  {company?.address}
                                </p>
                              </div>
                              <div className="pb-2 border-b border-dashed">
                                <h3 className="text-xs  text-gray-600">
                                  Phone Number
                                </h3>
                                <p className="text-gray-800 mt-1 font-medium">
                                  {company?.phone_number}
                                </p>
                              </div>
                              <div className="">
                                <h3 className="text-xs  text-gray-600">
                                  Status
                                </h3>
                                <p className="text-gray-800 mt-1 font-medium capitalize">
                                  {company?.status}
                                </p>
                              </div>
                              <div className="">
                                <h3 className="text-xs  text-gray-600">
                                  Created Date
                                </h3>
                                <p className="text-gray-800 mt-1 font-medium">
                                  {formatDateTime(userData?.created_at)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                </div>
                {/* )} */}
              </ScrollArea>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2 justify-end">
                <Button onClick={() => setOpenModal(false)} size="xs">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
