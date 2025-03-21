import classNames from "classnames";
import PropTypes from "prop-types";

const Checkbox = ({
  id,
  name,
  checked,
  setChecked,
  label,
  className,
  labelClassName,
  disabled,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={() => {
            setChecked((prevChecked) => !prevChecked);
          }}
          className={classNames(
            "absolute opacity-0 left-0 w-6 h-6 cursor-pointer",
            {
              "opacity-0": checked,
            }
          )}
        />
        <div
          className={`w-6 h-6 rounded border  border-slate-400 dark:border-slate-700 ${
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
  disabled: PropTypes.bool.isRequired,
  setChecked: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default Checkbox;
