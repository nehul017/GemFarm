import React from "react";

const FilePdfIcon = ({ className = "", ...props }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path 
        d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM16 12V9C16 8.45 15.55 8 15 8H13V13H14V12H14.5L15 13H16L15.2 11.5C15.6 11.2 16 10.7 16 12ZM14 10H14.5V11H14V10ZM18 11H19V8H17.5V10H17V8H16V12H17V11H18ZM9.5 8H13V9H10.5V10H12V11H10.5V13H9.5V8Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export default FilePdfIcon;
