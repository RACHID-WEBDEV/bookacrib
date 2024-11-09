import classNames from "classnames";
import PropTypes from "prop-types";
import { formatNumber } from "../../../lib/constants";

const CustomCheckboxGroup = ({
  items,
  selectedItems,
  setSelectedItems,
  className,
  labelClassName,
}) => {
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (
        prevSelectedItems?.some((selectedItem) => selectedItem?.id === item?.id)
      ) {
        // If the item is already in selectedItems, remove it
        return prevSelectedItems?.filter(
          (selectedItem) => selectedItem?.id !== item?.id
        );
      } else {
        // Otherwise, add the item to selectedItems
        return [...prevSelectedItems, item];
      }
    });
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {items?.map((item, itemIndex) => {
        const isChecked = selectedItems?.some(
          (selectedItem) => selectedItem?.id === item?.id
        );

        return (
          <div
            key={itemIndex}
            className="flex items-center mb-2 border border-gray-200 bg-white rounded-md px-4 py-3  justify-between gap-2"
          >
            <div className="relative inline-flex items-center gap-1">
              <input
                id={item?.id}
                name={item?.name}
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(item)}
                className={classNames(
                  "absolute opacity-0 left-0 w-6 h-6 cursor-pointer",
                  { "opacity-0": isChecked }
                )}
              />
              <div
                className={`w-6 h-6 rounded border border-slate-400 dark:border-slate-700 ${
                  isChecked ? "bg-white" : "bg-transparent"
                } flex items-center justify-center transition duration-300`}
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
              {item?.label && (
                <label
                  htmlFor={item?.id}
                  className={`ml-2 text-sm cursor-pointer ${labelClassName} select-none`}
                >
                  {item?.label || item?.name}
                </label>
              )}
            </div>
            {item?.price && (
              <label
                htmlFor={item?.id}
                className={`ml-2 text-sm cursor-pointer font-semibold select-none`}
              >
                ₦{formatNumber(Number(item?.price))}
              </label>
            )}
          </div>
        );
      })}
    </div>
  );
};

CustomCheckboxGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default CustomCheckboxGroup;
