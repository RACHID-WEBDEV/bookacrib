/* eslint-disable no-unused-vars */
import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";

const Checkbox = ({
  subLabel = "",
  label = "",
  name,
  className = "",
  sizeClassName = "w-6 h-6",
  labelClassName = "",
  defaultChecked,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onChange && onChange(e.target.checked);
  };

  return (
    <div className={`flex text-sm sm:text-base ${className}`}>
      <div className="relative flex items-center justify-center">
        <input
          id={name}
          name={name}
          type="checkbox"
          className="hidden"
          defaultChecked={defaultChecked}
          onChange={handleChange}
        />
        <div
          className={`w-6 h-6 border rounded border-slate-400 bg-transparent flex items-center justify-center ${
            isChecked ? "bg-primary-100" : "bg-transparent"
          } ${
            isChecked ? "border-primary-800" : "border-slate-400"
          } ${sizeClassName}`}
        >
          {isChecked && (
            <svg
              width="12"
              height="10"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L3.5 6.5L1 4"
                stroke="#373F41"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {label && (
        <label
          htmlFor={name}
          className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none capitalize"
        >
          <span
            className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${
              subLabel ? "-mt-0.5" : ""
            }`}
          >
            {label}
          </span>
          {subLabel && (
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  subLabel: PropTypes.string,
  className: PropTypes.string,
  sizeClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;

// import classNames from "classnames";
// import PropTypes from "prop-types";
// import { useState } from "react";

// const Checkbox = ({
//   subLabel = "",
//   label = "",
//   name,
//   className = "",
//   sizeClassName = "w-6 h-6",
//   labelClassName = "",
//   defaultChecked,
//   onChange,
//   disabled,
//   checked,
// }) => {
//   return (
//     <div className={`flex text-sm sm:text-base ${className}`}>
//       <input
//         id={name}
//         name={name}
//         type="checkbox"
//         className={`focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 ${sizeClassName}`}
//         defaultChecked={defaultChecked}
//         onChange={(e) => {
//           onChange && onChange(e.target.checked);
//         }}
//       />
//       {label && (
//         <label
//           htmlFor={name}
//           className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
//         >
//           <span
//             className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${
//               subLabel ? "-mt-0.5" : ""
//             }`}
//           >
//             {label}
//           </span>
//           {subLabel && (
//             <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-sm font-light">
//               {subLabel}
//             </p>
//           )}
//         </label>
//       )}
//     </div>
//   );
// };

// Checkbox.propTypes = {
//   label: PropTypes.string,
//   subLabel: PropTypes.string,
//   className: PropTypes.string,
//   sizeClassName: PropTypes.string,
//   labelClassName: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   defaultChecked: PropTypes.bool,
//   checked: PropTypes.bool,
//   disabled: PropTypes.bool,
//   onChange: PropTypes.func,
// };

// export default Checkbox;
