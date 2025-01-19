/* eslint-disable react/prop-types */
import { EmptyImage } from "../../assets/SvgIcons";

const Notification = ({ title, description }) => {
  return (
    <div>
      {" "}
      <div className=" flex flex-col items-center justify-center gap-24  pb-20 pt-20 bg-white">
        <div className=" text-center">
          <p className="text-xl font-semibold text-dark-100">{title}</p>
          <p className="text- font-normal text-gray-500">{description}</p>
        </div>
        <div className=" max-w-80">
          <EmptyImage />
        </div>
      </div>
    </div>
  );
};

export default Notification;
