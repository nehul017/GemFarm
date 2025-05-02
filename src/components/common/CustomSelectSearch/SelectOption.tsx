import React from 'react';
import Select, {
  StylesConfig,
  SingleValue,
} from 'react-select';


export interface OptionType {
  value: string;
  label: string;
}

interface CustomSearchSelectProps {
  label?: string;
  options: OptionType[];
  value: OptionType | null;
  onChange: (selected: OptionType | null) => void;
  placeholder?: string;
  required?: boolean;
}


const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '6px',
    borderColor: state.isFocused ? '#36BA7E' : '#E6E6E6',
    border : "1px solid #E6E6E6",
    boxShadow: state.isFocused ? '0 0 0 1px #10B981' : 'none',
    backgroundColor: '#f9f9f9',
    minHeight: '50px',
    fontSize: '14px',
    cursor: 'pointer',
  
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9CA3AF',
    fontSize: '14px',
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '4px',
    borderRadius: '6px',
    boxShadow: '0px 6px 10px 2px rgba(0, 0, 0, 0.04), 0px 2px 3px 0px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#fff',
    padding: '6px 4px',
    zIndex: 20,
    border : "1px solid #E5E5E5"
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f5f5f5' : 'white',
    color: '#111827',
    padding: '7px 16px',
    fontSize:'14px',
    borderRadius : "0.5px",
    cursor: 'pointer',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    color: '#111827',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '8px',
    color: '#111827',
  }),
};

const CustomSearchSelect: React.FC<CustomSearchSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Search Farm',
  required = false,
}) => {
  return (
    <div>
      {label && (
        <label className='text-sm text-black font-medium block pb-2'>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Select
        options={options}
        value={value}
        onChange={(selected) => onChange(selected as SingleValue<OptionType>)}
        placeholder={placeholder}
        styles={customStyles}
        isSearchable={true}
      />
    </div>
  );
};

export default CustomSearchSelect;
