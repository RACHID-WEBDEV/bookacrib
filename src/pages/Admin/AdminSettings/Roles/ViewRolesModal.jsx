/* eslint-disable react/prop-types */
import { ScrollArea } from "../../../../components/forms/scroll-area";
// import { Button } from "../UI/Form/Button";

import { Label } from "../../../../components/forms/Label";

import { Badge } from "../../../../components/forms/Badge";
import { formatDateTime } from "../../../../lib/constants";
import { Button } from "../../../../components/forms/Button";
// import { Badge } from "../../../../components/forms/Badge";
// import { DotIcon } from "src/assets/SvgIcons";
// import Spinner from "components/UI/Spinner";
// import ErrorStatus from "components/UI/ErrorStatus";

const ViewRolesModal = ({ setOpenModal, roleData }) => {
  console.log("ctaea : ", roleData);
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
                  Role Details
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
            <div className=" h-[300px] ">
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
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Name" />
                    <p className="text-gray-900 text-base font-medium">
                      {roleData?.display_name}
                    </p>
                  </div>
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Description" />
                    <p className="text-gray-900 font-medium">
                      {roleData?.description}
                    </p>
                  </div>

                  {/* <div>
                    {roleData.permissions?.map((item, index) => (
                      <div
                        key={index}
                        className=" space-y-1 flex items-center justify-between flex-wrap"
                      >
                        <div className="opacity-0">
                          <Label text="Permission" />
                        </div>
                        <p className="text-gray-900 font-medium">
                          {item?.display_name}
                        </p>
                      </div>
                    ))}
                  </div> */}
                  <div className=" space-y-1 flex  flex-col ">
                    <div className="pb-2">
                      <Label text="Permissions" />
                    </div>
                    <div className="grid gap-2 lg:grid-cols-2">
                      {roleData?.permissions?.map((item, roleIndex) => (
                        <div
                          key={roleIndex}
                          className="flex rounded-2.5xl border border-gray-200 bg-white py-4 px-7 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700"
                        >
                          <figure className="mr-2 rtl:mr-0 rtl:ml-4 shrink-0">
                            <div className=" flex h-6 w-6  items-center justify-center rounded-full border-2 border-white bg-primary-700 text-xs text-white dark:border-jacarta-600">
                              {roleIndex + 1}
                            </div>
                          </figure>
                          <div className="">
                            <span className="font-display font-semibold text-jacarta-700 hover:text-accent dark:text-white">
                              {item?.display_name}
                            </span>

                            {/* <span className="text-sm dark:text-jacarta-300">
                              6,548,133 ETH
                            </span> */}
                          </div>
                        </div>
                      ))}

                      {/* {roleData.permissions?.map((item, index) => (
                        <div key={index} className=" flex items-center gap-2">
                          <p>{index + 1}.</p>
                          <p className="text-gray-900 font-medium">
                            {item?.display_name}
                          </p>
                        </div>
                      ))} */}
                    </div>
                  </div>
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Status" />
                    <div className="text-gray-900 font-medium">
                      <Badge
                        rounded
                        className="capitalize"
                        color={roleData?.is_active === 1 ? "success" : "error"}
                        text={
                          roleData?.is_active === 1 ? "Active" : "Not Active"
                        }
                      ></Badge>
                    </div>
                  </div>
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Created Date" />
                    <p className="text-gray-900 font-medium">
                      {formatDateTime(roleData?.created_at)}
                    </p>
                  </div>
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Update Date" />
                    <p className="text-gray-900 font-medium">
                      {formatDateTime(roleData?.updated_at)}
                    </p>
                  </div>
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

export default ViewRolesModal;
