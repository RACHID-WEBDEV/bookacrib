/* eslint-disable react/prop-types */
import { ScrollArea } from "../../../../components/forms/scroll-area";
// import { Button } from "../UI/Form/Button";

import { Label } from "../../../../components/forms/Label";

import { Badge } from "../../../../components/forms/Badge";
import { formatDateTime, formatNumber } from "../../../../lib/constants";
import { Button } from "../../../../components/forms/Button";
// import { Badge } from "../../../../components/forms/Badge";
// import { DotIcon } from "src/assets/SvgIcons";
// import Spinner from "components/UI/Spinner";
// import ErrorStatus from "components/UI/ErrorStatus";

const ViewFeatureModal = ({ setOpenModal, featureData }) => {
  console.log("ctaea : ", featureData);
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
                  Feature Details
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
                      {featureData?.name}
                    </p>
                  </div>
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Price" />
                    <p className="text-gray-900 font-medium">
                      ₦{formatNumber(featureData?.price)}
                    </p>
                  </div>
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Status" />
                    <div className="text-gray-900 font-medium">
                      <Badge
                        rounded
                        className="capitalize"
                        color={
                          featureData?.is_active === true ? "success" : "error"
                        }
                        text={
                          featureData?.is_active === true
                            ? "Active"
                            : "Not Active"
                        }
                      ></Badge>
                    </div>
                  </div>
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Created Date" />
                    <p className="text-gray-900 font-medium">
                      {formatDateTime(featureData?.created_at)}
                    </p>
                  </div>
                  <div className=" space-y-1 flex items-center justify-between flex-wrap">
                    <Label text="Update Date" />
                    <p className="text-gray-900 font-medium">
                      {formatDateTime(featureData?.updated_at)}
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

export default ViewFeatureModal;
