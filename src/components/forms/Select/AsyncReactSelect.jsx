/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Label } from "../Label";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const AsyncReactSelect = ({
  selectedValue,
  setSelectedValue,
  fetchData,
  placeholder,
  label,
}) => {
  // Handle selection changes

  const [inputValue, setInputValue] = useState("");
  // const [selectedValue, setSelectedValue] = useState(null);
  // console.log("SeleECTED", inputValue, "show", selectedValue);
  const handleInputChange = (value) => {
    setInputValue(value);
  };
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="grid lg:grid-cols-1 grid-cols-1 gap-5">
      <div>
        <Label text={label} className="pb-2"></Label>
        <AsyncSelect
          isClearable={false}
          cacheOptions
          defaultValue={selectedValue}
          defaultOptions
          isMulti
          styles={styles}
          value={selectedValue}
          getOptionLabel={(e) => e.display_name || e.name || e.title}
          getOptionValue={(e) => e.uuid}
          loadOptions={fetchData}
          onInputChange={handleInputChange}
          onChange={handleChange}
          className="react-select"
          placeholder={placeholder}
          classNamePrefix="select"
        />
      </div>
    </div>
  );
};

export default AsyncReactSelect;
