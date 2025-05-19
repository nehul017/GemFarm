import React from 'react';
import Select, { StylesConfig } from 'react-select';

export interface OptionType {
  value: string;
  label: string;
}

interface CustomSearchSelectProps {
  label?: string;
  options: OptionType[];
  value: OptionType[];
  onChange: (selected: OptionType[]) => void;
  placeholder?: string;
  required?: boolean;
  loading?: boolean;
  isSearchable?: boolean;
}

const customStyles: StylesConfig<OptionType, true> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '6px',
    borderColor: state.isFocused ? '#36BA7E' : '#E6E6E6',
    border: '1px solid #E6E6E6',
    boxShadow: state.isFocused ? '0 0 0 1px #10B981' : 'none',
    backgroundColor: '#f9f9f9',
    minHeight: '50px',
    fontSize: '16px',
    cursor: 'pointer',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9CA3AF',
    fontSize: '16px',
    fontFamily: 'Inter',
    fontWeight: 400,
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '4px',
    borderRadius: '6px',
    boxShadow: '0px 6px 10px 2px rgba(0, 0, 0, 0.04), 0px 2px 3px 0px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#fff',
    padding: '6px 4px',
    zIndex: 20,
    border: '1px solid #E5E5E5',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f5f5f5' : 'white',
    color: '#111827',
    padding: '7px 16px',
    fontSize: '16px',
    borderRadius: '0.5px',
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

const CustomMultiSearchSelect: React.FC<CustomSearchSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Search Farm',
  isSearchable = true,
  required = false,
  loading = false,
}) => {
  return (
    <div>
      {label && (
        <label className='text-sm text-black font-medium block pb-2'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      <Select
        options={options}
        value={value}
        onChange={(selected) => onChange((selected || []) as OptionType[])}
        styles={customStyles}
        isSearchable={isSearchable}
        isLoading={loading}
        isMulti
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomMultiSearchSelect;
