/* eslint-disable react/prop-types */

import { getNameInitials } from "../../lib/constants";

const TextAvatar = ({ last_name, first_name }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12  cursor-pointer overflow-hidden bg-gray-200 rounded-full ">
      <span className="font-medium text-gray-600 uppercase text-base ">
        {first_name && getNameInitials(first_name)}
        {last_name && getNameInitials(last_name)}
      </span>
    </div>
  );
};

export default TextAvatar;
