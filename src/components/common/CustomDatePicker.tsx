// components/common/DatePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  error?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  selectedDate,
  onChange,
  placeholder = "Select Date",
  error,
}) => {
  const inputClassName = `
  h-[50px] px-3 py-2 
  ${
    error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-[#E6E6E6] focus:ring-[#10B981] focus:border-[#36BA7E]"
  } 
  bg-[#f9f9f9] text-[#111827] text-sm 
  rounded-md w-full focus:outline-none
`;

  return (
    <div>
      {label && (
        <label className="text-sm text-black font-medium block pb-2">
          {label}
        </label>
      )}
      {/* <div className={`relative ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" :""}`}> */}
        <DatePicker
          showIcon
          selected={selectedDate}
          onChange={onChange}
          placeholderText={placeholder}
          toggleCalendarOnIconClick
          //   style={{ display: "" }}
          dateFormat="dd/MM/yyyy"
          className={`h-[50px] px-3 py-2 border border-[#E6E6E6] bg-[#f9f9f9] text-[#111827] text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#36BA7E] w-full ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`} 
          calendarClassName="rounded-md shadow-md border border-[#E5E5E5]"
        />
      {/* </div> */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
