/* eslint-disable react/prop-types */

import { Label } from "./Label";

const OtpInput = ({
  otp,
  activeOTPIndex,
  inputRef,
  handleOnChange,
  handleOnKeyDown,
  label,
}) => {
  return (
    <div className="">
      <Label text={label} className="pb-2" />
      <div className="flex items-center justify-centerr gap-2">
        {otp.map((value, index) => {
          const isActive = activeOTPIndex === index;
          // console.log("first: ", isActive);
          return (
            <div key={index}>
              <div
                // className="size-10 md:size-12 lg:size-[60px] border border-secondary/60 rounded inline-flex items-center justify-center"
                className="size-10 md:size-12 lg:size-[60px] border border-secondary/60 rounded inline-flex items-center justify-center"
              >
                <input
                  ref={isActive ? inputRef : null}
                  type="text" // Use "text" to show masked placeholders
                  className={`size-10 md:size-12 lg:size-[60px] bg-transparent outline-none text-center font-semibold text-xl lg:text-3xl placeholder:text-2xl  spin-button-none  focus:border-gray-700 focus:text-primary-700 transition  ${
                    isActive ? "text-gray-800" : "text-gray-400"
                  }`}
                  onChange={handleOnChange}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  value={isActive ? value : value ? "*" : ""} // Show actual value only when active, otherwise "*"
                  placeholder="*" // Default placeholder
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtpInput;
