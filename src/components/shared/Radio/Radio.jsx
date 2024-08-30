import PropTypes from "prop-types";

const Radio = ({
  className = "",
  name,
  id,
  onChange,
  label,
  sizeClassName = "w-6 h-6",
  defaultChecked,
}) => {
  return (
    <div className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        className={`focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 ${sizeClassName}`}
        onChange={(e) => onChange && onChange(e.target.value)}
        defaultChecked={defaultChecked}
        value={id}
      />
      {label && (
        <label
          htmlFor={id}
          className="pl-2.5 sm:pl-3 block text-slate-900 dark:text-slate-100 select-none"
          dangerouslySetInnerHTML={{ __html: label }}
        ></label>
      )}
    </div>
  );
};

Radio.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  sizeClassName: PropTypes.string,
  label: PropTypes.string,
};

export default Radio;
