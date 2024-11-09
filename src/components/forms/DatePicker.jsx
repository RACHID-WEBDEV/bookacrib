/* eslint-disable react/prop-types */
import { Datepicker } from "flowbite-react";
import { Label } from "./Label";

function DatePicker({
  label,
  setSelectedDate,
  // selectedDate,
  inline,
}) {
  const handleDatePickerChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Label htmlFor={label} text={label} className="mb-1.5" />
      <Datepicker
        inline={inline}
        // title="Select date start"
        // defaultValue={today_date}
        // value={selectedDate}
        className="text-xs font-medium bg-white ring-gray-200 add-date-class"
        onSelectedDateChanged={handleDatePickerChange}
        // minDate={new Date()}
        theme={{
          root: {
            input: {
              field: {
                input: {
                  sizes: {
                    sm: "p-2 sm:text-xs",
                    md: "p-1.5 text-sm",
                    lg: "sm:text-md p-4",
                  },
                  colors: {
                    gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 !py-4 !rounded-md",
                  },
                },
              },
            },
          },
          popup: {
            footer: {
              button: {
                today:
                  "bg-primary-700 text-white hover:bg-primary-800 focus:ring-0 rounded-md",
              },
            },
          },
          views: {
            days: {
              items: {
                item: {
                  selected: "bg-primary-700 text-white hover:bg-primary-500",
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
export default DatePicker;
