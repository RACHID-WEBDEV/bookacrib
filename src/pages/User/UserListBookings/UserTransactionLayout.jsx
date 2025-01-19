import { Outlet } from "react-router-dom";

const UserTransactionLayout = () => {
  return (
    <>
      <div className=" p-4 pt-10 bg-white">
        {/* <div className=" fixed top-2 z-30 flex items-center justify-between ">
          <div className="pb-4 pt-1">
            <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">
              Property
            </h1>
            <h5 className="text-gray-500 text-sm font-normal">
              Overview of the properties bookings etc
            </h5>
          </div>
          <div className="flex items-center gap-3"></div>
        </div> */}

        <Outlet />
      </div>
    </>
  );
};

export default UserTransactionLayout;
