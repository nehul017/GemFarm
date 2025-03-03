interface LeftIconProps {
  onClick?: () => void; // Optional onClick handler
  className?: string; // Optional className for styling
}

export default function LeftIcon({ onClick, className }: LeftIconProps) {
  return (
    <svg
      className={`cursor-pointer ${className}`} // Apply className dynamically
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      onClick={onClick} // Attach the onClick handler
    >
      <path
        d="M20.15 10.3126V10.1626H20H3.97173L9.6717 4.07358L9.76767 3.97107L9.6717 3.86856L8.76267 2.89749L8.65317 2.78051L8.54366 2.89749L2.47873 9.37633C1.64042 10.2718 1.64042 11.7268 2.47873 12.6223L8.54494 19.1025L8.65445 19.2195L8.76396 19.1025L9.67299 18.1314L9.76895 18.0289L9.67299 17.9264L3.97301 11.8374H20H20.15V11.6874V10.3139V10.3126Z"
        fill="currentColor" // Use currentColor for dynamic color changes
        stroke="currentColor"
        strokeWidth="0.3"
      />
    </svg>
  );
}
