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
  SearchIcon,
  XIconSmall,
} from "../../../../assets/SvgIcons";
import ErrorStatus from "../../../../components/forms/ErrorStatus";
import EditCategoryModal from "./EditCategoryModal";
import CreateCategoriesModal from "./CreateCategoriesModal";
// import { getLastSegmentFromUrl } from "../../../../utils/segmentSpliter";
import Pagination from "../../../../components/forms/Pagination";
import { Badge } from "../../../../components/forms/Badge";
import ViewCategoryModal from "./ViewCategoryModal";
// import { formatNumber } from "../../../../lib/constants";
import Notification from "../../../../components/shared/notification/Notification";
import toast from "react-hot-toast";

// import {
//   // deleteCategories,
//   ,
// } from "../../../../Redux/categories/categoriesThunk";
import { patchData } from "../../../../utils/api";
import {
  fetchadminCategories,
  deleteadminCategories,
  fetchadminCategoriess,
} from "../../../../Redux/admincategories/admincategoriesThunk";

const AdminCategories = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const { categories, category, loading, error } = useSelector(
    (state) => state.admincategory
  );
  // const fetchCategoryHandler = (url) => {
  //   dispatch(fetchadminCategoriess(url));
  // };

  // useEffect(() => {
  //   fetchCategoryHandler("bookacrib-api-routes/v1/room-types/list-room-types");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategoryHandler = (url, search) => {
    let fetchUrl = url;
    if (search) {
      fetchUrl += `?q=${search}`;
    }
    dispatch(fetchadminCategoriess(fetchUrl));
  };

  useEffect(() => {
    fetchCategoryHandler("/v1/public/categories/list-all-categories");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchQuery.length >= 2) {
        fetchCategoryHandler(
          "/v1/public/categories/list-all-categories",
          searchQuery
        );
      }
    };
    fetchSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handlePaginate = (url) => {
    if (url) {
      fetchCategoryHandler(url);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const fetchSingleRole = (category_id) => {
    dispatch(fetchadminCategories(category_id));
    setEditModal(true);
  };

  const fetchViewRole = (category_id) => {
    dispatch(fetchadminCategories(category_id));
    setViewModal(true);
  };

  const deleteCategoryeData = (category_id) => {
    dispatch(fetchadminCategories(category_id));
    setShowDeletePopup(true);
  };

  const handleCategoryeDelete = async (category) => {
    // console.log("category is here", category);
    if (category) {
      // Handle delete category logic here
      try {
        // setLoading(true);
        const result = await dispatch(
          deleteadminCategories(category?.uuid)
        ).unwrap();
        console.log("delete Categorye:", result);
        if (
          (result?.status >= 200 && result?.status < 300) ||
          (result?.status_code >= 200 && result?.status_code)
        ) {
          //   navigate("/admin/property/Categoryes");
          toast.success(result?.message);
          dispatch(
            fetchadminCategoriess("/v1/public/categories/list-all-categories")
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setShowDeletePopup(false);
      }
    }
  };
  // console.log("getSingleRole", role);

  const handleCategoryStatus = async (category_id) => {
    try {
      // console.log("category_id clicked ", category_id);
      if (category_id) {
        const response = await patchData(
          `/v1/admin/categories/toggle-category-status?id=${category_id}`,
          {
            id: category_id,
          }
        );
        if (
          (response?.status >= 200 && response?.status < 300) ||
          (response?.status_code >= 200 && response?.status_code < 300)
        ) {
          toast.success(response?.message);
          // console.log("category status:", response);
          dispatch(
            fetchCategoryHandler("/v1/public/categories/list-all-categories")
          );
        }
      }
    } catch (error) {
      if (error?.status >= 400 && error?.status <= 499) {
        // const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(error?.response?.data?.message, { duration: 6000 });
        console.log("ERROR:", error);
      }
    }
  };
  const Headings = {
    tableHeadings: ["S/N", "Name", "Status", "Toggle", "Action"],
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className=" py-2 pl-2">
            <h1 className="text-lg font-semibold text-gray-900 ">Categories</h1>
            <p className="text-gray-600 text-sm font-normal">
              Manage list of categories available on yhis platform
            </p>
          </div>
          {/* <Button
            onClick={() => setOpenModal(true)}
            size="sm"
            leftIcon={<PlusIcon />}
          >
            Add New Room Type
          </Button> */}
        </div>
        <div className="p-3 border border-gray-300 rounded-md mt-2">
          <div className=" flex items-center justify-between gap-4 flex-wrap ">
            <div className=" lg:w-[65%]">
              <form className="">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only "
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon />
                  </div>

                  <input
                    type="text"
                    id="default-search"
                    className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 font-Inter rounded-md bg-gray-100 outline-none  "
                    placeholder="Search room type..."
                    value={searchQuery}
                    onChange={(e) => {
                      const search = e.target.value;
                      setSearchQuery(search);
                    }}
                  />
                  {searchQuery.length >= 2 && (
                    <div
                      onClick={() => {
                        setSearchQuery("");
                        fetchCategoryHandler(
                          "/v1/public/categories/list-all-categories"
                        );
                      }}
                      className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
                    >
                      <XIconSmall />
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <div className=" hidden lg:flex">
                <Button
                  onClick={() => setOpenModal(true)}
                  size="sm"
                  leftIcon={<PlusIcon />}
                >
                  Add New Category
                </Button>
              </div>
              <div className="lg:hidden">
                <Button
                  onClick={() => setOpenModal(true)}
                  size="sm"
                  leftIcon={<PlusIcon />}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
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

              {categories?.data?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={100} className="">
                      <div className="flex gap-5 flex-col items-center justify-center py-40">
                        {/* <img src={AssignEmpty} alt="" /> */}

                        <p className="text-2xl font-medium font-gray-600">
                          No Categories Found
                        </p>
                        <Button
                          className="w-48 justify-center"
                          onClick={() => {
                            setSearchQuery("");
                            fetchCategoryHandler(
                              "/v1/public/categories/list-all-categories"
                            );
                          }}
                        >
                          Go Back
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {categories?.data?.map((item, rowIndex) => (
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
                              item?.is_active === true ? "Active" : "Not-active"
                            }
                          ></Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm  text-gray-600 ">
                          <label className="inline-flex items-center cursor-pointer  ">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              value=""
                              defaultChecked={item?.is_active === true}
                              onClick={() => handleCategoryStatus(item.uuid)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-success-600"></div>
                          </label>
                        </div>
                        {/* {formatDateTime(item?.created)} */}
                      </td>

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
                            onClick={() => deleteCategoryeData(item?.uuid)}
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
          {categories.length !== 0 && (
            <Pagination
              meta={categories.meta}
              handlePaginate={handlePaginate}
            />
          )}
        </div>
      </>
      {openModal && <CreateCategoriesModal setOpenModal={setOpenModal} />}

      {viewModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              {/* <Spinner /> */}
              ...
            </div>
          ) : (
            <ViewCategoryModal
              setOpenModal={setViewModal}
              categoryData={category?.data}
            />
          )}
        </div>
      )}

      {editModal && (
        <div>
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              {/* <Spinner /> */}
              ...
            </div>
          ) : (
            <EditCategoryModal
              setOpenModal={setEditModal}
              categoryData={category?.data}
            />
          )}
        </div>
      )}

      {showDeletePopup && (
        <>
          <Notification
            message="Are you sure you want to delete this category?"
            type="warning"
            onCancel={() => setShowDeletePopup(false)}
            onApprove={() => {
              handleCategoryeDelete(category?.data);
              setShowDeletePopup(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default AdminCategories;
