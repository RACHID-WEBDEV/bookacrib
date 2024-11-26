/* eslint-disable react/prop-types */

import classNames from "classnames";

const DashboardHeading = ({ title, description, fixed }) => {
  return (
    <div
      className={classNames("  z-30 flex items-center justify-between ", {
        "fixed top-2 ": fixed,
      })}
    >
      <div className="pb-4 pt-1">
        <h1 className=" text-xl font-semibold text-gray-900 pb-1.5">{title}</h1>
        <h5 className="text-gray-500 text-sm font-normal">{description}</h5>
      </div>
      <div className="flex items-center gap-3"></div>
    </div>
  );
};

export default DashboardHeading;
