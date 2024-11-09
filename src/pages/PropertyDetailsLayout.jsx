import { Outlet } from "react-router-dom";

const PropertyDetailsLayout = () => {
  return (
    <>
      <div className=" p-4 pt-10 bg-white">
        <Outlet />
      </div>
    </>
  );
};

export default PropertyDetailsLayout;
