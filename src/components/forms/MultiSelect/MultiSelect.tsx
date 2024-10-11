import Select from "react-select";

// const fruits = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
//   { value: "orange", label: "Orange" },
//   { value: "apple", label: "Apple" },
// ];

// console.log(fruits);

const styles = {
  multiValue: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base: any, state: any) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const MultiSelect = ({
  data,
  placeholder,
}: {
  data: any;
  placeholder: string;
}) => {
  return (
    <div>
      <Select
        isClearable={false}
        defaultValue={[]}
        styles={styles}
        isMulti
        name="colors"
        options={data}
        className="react-select text-sm text-gray-500 placeholder:text-gray-500"
        classNamePrefix="select"
        placeholder={placeholder}
      />
    </div>
  );
};

export default MultiSelect;
