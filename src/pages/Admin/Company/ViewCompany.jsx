import { useEffect, useState } from "react";
import { getData } from "../../../utils/api";
import { useParams } from "react-router-dom";
import { Badge } from "../../../components/forms/Badge";
import { formatDateTime } from "../../../lib/constants";
import TextAvatar from "../../../components/ui/TextAvatar";
import DashboardHeading from "../../../layout/DashboardHeading";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorStatus from "../../../components/forms/ErrorStatus";

const ViewCompany = () => {
  const { uuid } = useParams(); // Type assertion for id
  const [companyDetails, setCompanyDetails] = useState([]);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [errorSingle, setErrorSingle] = useState(null);

  console.log(
    "single com: ",
    companyDetails,
    "loading ",
    loadingSingle,
    "errorSingle",
    errorSingle
  );

  const fetchCompanyDetails = async (url) => {
    setLoadingSingle(true);
    try {
      const response = await getData(url);

      setCompanyDetails(response);
    } catch (error) {
      setErrorSingle(error.response.data);
    } finally {
      setLoadingSingle(false);
    }
  };

  useEffect(() => {
    fetchCompanyDetails(
      `/v1/admin/companies/view-company?id=${uuid}&with[]=users&with[]=country&with[]=state&with[]=timezone&with[]=modules`
    );
  }, [uuid]);

  const userData = companyDetails?.data;
  const statusBadges = {
    pending: { color: "error" },
    approved: { color: "success" },
    suspended: { color: "gray" },
    declined: { color: "warning" },
  };

  const defaultBadge = { color: "primary" };
  const getBadgeColor = (status) => {
    return (statusBadges[status] || defaultBadge).color;
  };
  return (
    <div className="pt-6">
      <DashboardHeading
        // fixed
        title="View Company"
        description=" Overview of the company/property owners sign up"
      />
      {loadingSingle ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : errorSingle ? (
        <ErrorStatus
          message={JSON.stringify(loadingSingle?.message)}
          statusCode={loadingSingle?.status_code || loadingSingle?.status}
          link="/dashboard"
          reload
        />
      ) : (
        <div className="p-5 space-y-6 text-sm">
          <div className="grid lg:grid-cols-2 gap-2 gap-x-4 text-sm lg:max-w-4xl p-5 bg-white rounded-md">
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Company Name</h3>
              <p className="text-gray-800 mt-1 font-medium">
                {/* {userData?.first_name} {userData?.last_name}{" "} */}
                {userData?.name}
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
                {userData?.phone_number || "N/A"}
              </p>
            </div>
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Address</h3>
              <p className="text-gray-800 mt-1 font-medium capitalize">
                {userData?.address}
              </p>
            </div>
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Country</h3>
              <p className="text-gray-800 mt-1 font-medium">
                {userData?.country?.name === null
                  ? "N/A"
                  : userData?.country?.name}
              </p>
            </div>
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">State</h3>
              <p className="text-gray-800 mt-1 font-medium">
                {userData?.state?.name === null ? "N/A" : userData?.state?.name}
              </p>
            </div>
            {/* <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Gender</h3>
              <p className="text-gray-800 mt-1 font-medium capitalize">
                {userData?.gender === null ? "N/A" : userData?.gender}
              </p>
            </div>
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Marital Status</h3>
              <p className="text-gray-800 mt-1 font-medium">
                {userData?.marital_status === null
                  ? "N/A"
                  : userData?.marital_status}
              </p>
            </div> */}
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Verification Status</h3>
              <p className="text-gray-800 mt-1 font-medium">
                <Badge
                  rounded
                  className=" capitalize"
                  //  leftIcon={item?.is_active === true && <DotIcon />}
                  color={getBadgeColor(userData?.status)}
                  text={userData?.status}
                ></Badge>
                {/* {userData?.next_of_kin_name === null
                  ? "N/A"
                  : userData?.next_of_kin_name} */}
              </p>
            </div>
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Crib Status</h3>
              <p className="text-gray-800 mt-1 font-medium">
                <Badge
                  rounded
                  className="capitalize"
                  color={userData?.is_active === true ? "success" : "error"}
                  text={
                    userData?.is_active === true ? "Active Crib" : "Disabled"
                  }
                ></Badge>
              </p>
            </div>
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Verify Status</h3>
              <p className="text-gray-800 mt-1 font-medium">
                {userData?.is_verified === true ? "Verified" : "Not Verified"}
              </p>
            </div>
            <div className="pb-2 border-b border-dashed">
              <h3 className="text-xs  text-gray-600">Verified Date</h3>
              <p className="text-gray-800 mt-1 font-medium">
                {formatDateTime(userData?.verified_at)}
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
          </div>
          <section className=" bg-white dark:bg-transparent p-5 rounded-md">
            <div className=" grid lg:grid-cols-2 gap-2 gap-x-4 text-sm">
              {userData?.users[0].length !== 0 && (
                <div className="lg:col-span-2 pt-2">
                  <h3 className="text-sm font-semibold py-2 text-gray-900">
                    Company Users Details
                  </h3>
                  <div className=" space-y-4">
                    {userData?.users[0]?.map((company, companyIndex) => (
                      <div
                        key={companyIndex}
                        className="border border-dashed rounded-md p-4 grid lg:grid-cols-3 gap-4"
                      >
                        <div className="pb-2 border-b border-dashed">
                          <h3 className="text-xs  text-gray-600">Name</h3>
                          <div className=" flex items-center gap-2 pt-1">
                            <TextAvatar
                              first_name={company?.first_name}
                              last_name={company?.last_name}
                            />
                            <p className="text-gray-800 mt-1 font-medium">
                              {company?.first_name} {company?.last_name}
                            </p>
                          </div>
                        </div>
                        <div className="pb-2 border-b border-dashed">
                          <h3 className="text-xs  text-gray-600">Email</h3>
                          <p className="text-gray-800 mt-1 font-medium">
                            {company?.email}
                          </p>
                        </div>
                        <div className="pb-2 border-b border-dashed">
                          <h3 className="text-xs  text-gray-600">Gender</h3>
                          <p className="text-gray-800 mt-1 font-medium capitalize">
                            {company?.user_type}
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
                          <h3 className="text-xs  text-gray-600">Status</h3>
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
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ViewCompany;
