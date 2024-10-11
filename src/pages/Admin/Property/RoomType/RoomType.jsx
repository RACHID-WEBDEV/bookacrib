import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Button } from "../../../../components/forms/Button";
import LoadingSpinner from "../../../../components/Loading/LoadingSpinner";
import {
  DeleteIcon,
  EditIcon,
  EyeIconBold,
  PlusIcon,
} from "../../../../assets/SvgIcons";
import ErrorStatus from "../../../../components/forms/ErrorStatus";
import EditRoomTypeModal from "./EditRoomTypeModal";
import AddNewRoomTypeModal from "./AddRoomTypeModal";
// import { getLastSegmentFromUrl } from "../../../../utils/segmentSpliter";
import Pagination from "../../../../components/forms/Pagination";
import { Badge } from "../../../../components/forms/Badge";
import ViewRoomTypeModal from "./ViewRoomTypeModal";
// import { formatNumber } from "../../../../lib/constants";
import Notification from "../../../../components/shared/notification/Notification";
import toast from "react-hot-toast";
import {
  deleteRoomType,
  fetchRoomType,
  fetchRoomTypes,
} from "../../../../Redux/roomtypes/roomtypesThunk";

const RoomTypes = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const { roomtypes, roomtype, loading, error } = useSelector(
    (state) => state.roomtype
  );
  const fetchFeatureHandler = (url) => {
    dispatch(fetchRoomTypes(url));
  };

  useEffect(() => {
    fetchFeatureHandler("bookacrib-api-routes/v1/room-types/list-room-types");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handlePaginate = (url) => {
    if (url) {
      fetchFeatureHandler(url);
    }
  };
  // console.log("roles", roles);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [editSupportModal, setEditSupportModal] = useState(false);
  const [viewSupportModal, setViewSupportModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const fetchSingleRole = (room_type_id) => {
    dispatch(fetchRoomType(room_type_id));
    setEditSupportModal(true);
  };

  const fetchViewRole = (room_type_id) => {
    dispatch(fetchRoomType(room_type_id));
    setViewSupportModal(true);
  };

  const deleteFeatureData = (room_type_id) => {
    dispatch(fetchRoomType(room_type_id));
    setShowDeletePopup(true);
  };

  const handleFeatureDelete = async (roomtype) => {
    // console.log("roomtype is here", roomtype);
    if (roomtype) {
      // Handle delete roomtype logic here
      try {
        // setLoading(true);
        const result = await dispatch(deleteRoomType(roomtype?.uuid)).unwrap();
        console.log("delete feature:", result);
        if (
          (result?.status >= 200 && result?.status < 300) ||
          (result?.status_code >= 200 && result?.status_code)
        ) {
          //   navigate("/admin/property/features");
          toast.success(result?.message);
          dispatch(
            fetchRoomTypes("bookacrib-api-routes/v1/room-types/list-room-types")
          );
        }

        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Support Feature has been deleted successfully",
        //   })
        // );
      } catch (error) {
        console.log(error);
        // dispatch(
        //   openToast({
        //     type: "error",
        //     message: ` Error deleting Feature with error details: ${error.response.data.message}`,
        //   })
        // );
      } finally {
        setShowDeletePopup(false);
      }
    }
  };
  // console.log("getSingleRole", role);

  const Headings = {
    tableHeadings: ["S/N", "Name", "Status", "Action"],
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className=" py-2 pl-2">
            <h1 className="text-lg font-semibold text-gray-900 ">Room Types</h1>
            <p className="text-gray-600 text-sm font-normal">
              Manage list of the room types available
            </p>
          </div>
          <Button
            onClick={() => setOpenRoleModal(true)}
            size="sm"
            leftIcon={<PlusIcon />}
          >
            Add New Room Type
          </Button>
        </div>
      </div>

      <>
        {loading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <ErrorStatus
            message={JSON.stringify(error?.message)}
            statusCode={error?.status_code || error?.status}
            link="/dashboard"
            reload
          />
        ) : (
          <div className="relative overflow-x-auto shadow sm:rounded-lg mt-6 ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
              <thead className="text-xs text-gray-700 bg-gray-100 ">
                <tr className="font-Inter">
                  {Headings.tableHeadings.map((heading, headingIndex) => (
                    <th
                      key={headingIndex}
                      scope="col"
                      className="px-6 py-4 whitespace-nowrap uppercase font-Inter"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              {roomtypes?.data?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={100} className="">
                      <div className="flex gap-5 flex-col items-center justify-center py-40">
                        {/* <img src={AssignEmpty} alt="" /> */}

                        <p className="text-2xl font-medium font-gray-600">
                          No Room Type Found
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {roomtypes?.data?.map((item, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="bg-white border-b text-gray-400  hover:bg-gray-50 [&_tr:last-child]:border-0 font-Inter"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap "
                      >
                        {rowIndex + 1}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* {item?.name === "" ? "Not Available" : item?.name} */}
                        <div className="font-normal  text-gray-600 capitalize ">
                          {item?.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* {formatDateTime(item?.account_type)} */}
                        {item.is_active === null ? (
                          "None"
                        ) : (
                          <Badge
                            rounded
                            className=" capitalize"
                            // leftIcon={<DotIcon />}
                            color={
                              item?.is_active === true ? "success" : "warning"
                            }
                            text={
                              item?.is_active === true ? "Active" : "Not Active"
                            }
                          ></Badge>
                        )}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {formatDateTime(item?.created)}
                      </td> */}

                      <td
                        // onClick={() => checkUserDetail(item)}
                        className="px-6 py-4 whitespace-nowrap "
                      >
                        <div className=" flex items-center gap-2">
                          <div
                            className="cursor-pointer "
                            onClick={() => fetchViewRole(item?.uuid)}
                          >
                            <EyeIconBold />
                          </div>
                          <div
                            className="cursor-pointer "
                            onClick={() => fetchSingleRole(item?.uuid)}
                          >
                            <EditIcon />
                          </div>
                          <div
                            className="cursor-pointer "
                            onClick={() => deleteFeatureData(item?.uuid)}
                          >
                            <DeleteIcon className="text-red-600 w-6 h-6" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        )}

        <div className="py-5">
          {roomtypes.length !== 0 && (
            <Pagination meta={roomtypes.meta} handlePaginate={handlePaginate} />
          )}
        </div>
      </>
      {openRoleModal && <AddNewRoomTypeModal setOpenModal={setOpenRoleModal} />}

      {viewSupportModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              {/* <Spinner /> */}
              ...
            </div>
          ) : (
            <ViewRoomTypeModal
              setOpenModal={setViewSupportModal}
              featureData={roomtype?.data}
            />
          )}
        </div>
      )}

      {editSupportModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              {/* <Spinner /> */}
              ...
            </div>
          ) : (
            <EditRoomTypeModal
              setOpenModal={setEditSupportModal}
              featureData={roomtype?.data}
            />
          )}
        </div>
      )}

      {showDeletePopup && (
        <>
          <Notification
            message="Are you sure you want to delete this room type?"
            type="warning"
            onCancel={() => setShowDeletePopup(false)}
            onApprove={() => {
              handleFeatureDelete(roomtype?.data);
              setShowDeletePopup(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default RoomTypes;
