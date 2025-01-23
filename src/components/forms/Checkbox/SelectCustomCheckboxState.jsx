import classNames from "classnames";
import PropTypes from "prop-types";
import { DropdownItem } from "flowbite-react";

const SelectCustomCheckboxState = ({
  items,
  selectedItems,
  setSelectedItems,
  containerClassName,
  labelClassName,
}) => {
  // console.log("state Item:", items);
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (
        prevSelectedItems?.some(
          (selectedItem) => selectedItem?.uuid === item?.uuid
        )
      ) {
        // If the item is already selected, deselect it
        return [];
      } else {
        // Otherwise, select the new item and clear any previous selection
        return [item];
      }
    });
  };
  // const handleCheckboxChange = (item) => {
  //   setSelectedItems((prevSelectedItems) => {
  //     if (
  //       prevSelectedItems?.some((selectedItem) => selectedItem?.uuid === item?.uuid)
  //     ) {
  //       // If the item is already in selectedItems, remove it
  //       return prevSelectedItems?.filter(
  //         (selectedItem) => selectedItem?.uuid !== item?.uuid
  //       );
  //     } else {
  //       // Otherwise, add the item to selectedItems
  //       return [...prevSelectedItems, item];
  //     }
  //   });
  // };

  return (
    <div className={`flex ${containerClassName} max-h-[400px] overflow-y-auto`}>
      {items?.map((item, itemIndex) => {
        const isChecked = selectedItems?.some(
          (selectedItem) => selectedItem?.uuid === item?.uuid
        );

        return (
          <DropdownItem key={itemIndex}>
            <div className="flex items-center w-full gap-10 lg:gap-4 justify-between">
              {item?.name && (
                <label
                  htmlFor={item?.uuid}
                  className={`text-sm cursor-pointer ${labelClassName}`}
                >
                  {item?.name || item?.name}
                </label>
              )}

              <div className="relative inline-flex items-center ">
                <input
                  id={item?.uuid}
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
              </div>
            </div>
          </DropdownItem>
        );
      })}
    </div>
  );
};

SelectCustomCheckboxState.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default SelectCustomCheckboxState;
