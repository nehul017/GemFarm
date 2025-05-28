
import React from "react";

const HomeIcon = ({ className = "", ...props }) => {
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
        d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export default HomeIcon;
