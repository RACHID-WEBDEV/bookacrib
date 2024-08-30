/* eslint-disable react/prop-types */
import classNames from "classnames";
import AssignEmpty from "src/assets/images/404-light.svg";

const EmptyState = ({ text, className }) => {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
      <div
        className={classNames(
          "flex flex-col items-center justify-center",
          className
        )}
      >
        <img
          src={AssignEmpty}
          alt="Assign Driver Empty Illustration "
          className="w-60 h-60"
        />
        <p className="text-sm text-center text-gray-600 pt-4 ">{text}</p>
      </div>
    </div>
  );
};

export default EmptyState;
