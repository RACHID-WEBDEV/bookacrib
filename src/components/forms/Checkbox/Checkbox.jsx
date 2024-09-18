import PropTypes from "prop-types";

const Checkbox = ({
  id,
  name,
  checked,
  onChange,
  label,
  className,
  labelClassName,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 cursor-pointer"
        />
        <div
          className={`w-6 h-6 rounded border-2 cursor-pointer border-slate-400 dark:border-slate-700 ${
            checked ? "bg-white" : "bg-transparent"
          } flex items-center justify-center transition duration-300`}
        >
          {checked && (
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

            // <svg
            //   width="12"
            //   height="9"
            //   viewBox="0 0 12 9"
            //   fill="none"
            //   xmlns="http://www.w3.org/2000/svg"
            // >
            //   <path
            //     d="M10.6673 1.5L4.25065 7.91667L1.33398 5"
            //     stroke="#373F41"
            //     strokeWidth="2"
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            //   />
            // </svg>
          )}
        </div>
      </div>
      {label && (
        <label
          htmlFor={id}
          className={`ml-2 text-sm cursor-pointer ${labelClassName} select-none`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default Checkbox;

// import PropTypes from "prop-types";

// /**
//  * Checkbox component props.
//  */
// const CheckboxProps = {
//   label: PropTypes.string,
//   subLabel: PropTypes.string,
//   className: PropTypes.string,
//   sizeClassName: PropTypes.string,
//   labelClassName: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   defaultChecked: PropTypes.bool,
//   onChange: PropTypes.func,
// };

// /**
//  * Checkbox component.
//  *
//  * @param {CheckboxProps} props - Component props.
//  * @returns {JSX.Element} - Checkbox JSX element.
//  */
// const Checkbox = ({
//   subLabel = "",
//   label = "",
//   name,
//   className = "",
//   sizeClassName = "w-6 h-6",
//   labelClassName = "",
//   defaultChecked,
//   onChange,
// }) => {
//   return (
//     <div className={`flex text-sm sm:text-base ${className}`}>
//       <input
//         id={name}
//         name={name}
//         type="checkbox"
//         className={`focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 ${sizeClassName}`}
//         defaultChecked={defaultChecked}
//         onChange={(e) => onChange && onChange(e.target.checked)}
//       />
//       {label && (
//         <label
//           htmlFor={name}
//           className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
//         >
//           <span
//             className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${
//               // eslint-disable-next-line no-extra-boolean-cast
//               !!subLabel ? "-mt-0.5" : ""
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

// Checkbox.propTypes = CheckboxProps;

// export default Checkbox;
