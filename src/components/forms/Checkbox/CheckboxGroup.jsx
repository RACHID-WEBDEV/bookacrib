import classNames from "classnames";
import PropTypes from "prop-types";

const CheckboxGroup = ({
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
      {items?.map((item, itemIndex) => (
        <div key={itemIndex} className="flex items-center mb-2">
          <input
            id={item?.id}
            name={item?.name}
            type="checkbox"
            checked={selectedItems.some(
              (selectedItem) => selectedItem?.id === item?.id
            )}
            onChange={() => handleCheckboxChange(item)}
            className={classNames("w-6 h-6 cursor-pointer")}
          />
          {item?.label && (
            <label
              htmlFor={item?.id}
              className={`ml-2 text-sm cursor-pointer ${labelClassName} select-none`}
            >
              {item?.label || item?.name}
            </label>
          )}
        </div>
      ))}
    </div>
  );
};

CheckboxGroup.propTypes = {
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

export default CheckboxGroup;
