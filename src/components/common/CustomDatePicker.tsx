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
  required?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  selectedDate,
  onChange,
  placeholder = "Select Date",
  error,
  required = false,
}) => {

  const CustomInput = React.forwardRef<HTMLInputElement, any>(
    ({ value, onClick, placeholder, error }: any, ref) => (
      <input
        type="text"
        readOnly
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        ref={ref}
        className={`h-[50px] py-2 px-3 border ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#E6E6E6] focus:ring-[#10B981] focus:border-[#36BA7E]"
        } bg-[#f9f9f9] text-[#111827] text-base placeholder:text-base rounded-md focus:outline-none focus:ring-2 w-full`}
      />
    )
  );

  return (
    <div>
      {label && (
        <label className="text-sm text-black font-medium block pb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {/* <div className={`relative ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" :""}`}> */}
        <DatePicker
        showIcon
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        toggleCalendarOnIconClick
        dateFormat="dd/MM/yyyy"
        calendarClassName="rounded-md shadow-md border border-[#E5E5E5]"
        customInput={<CustomInput error={error} placeholder={placeholder} />}
        />
      {/* </div> */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
