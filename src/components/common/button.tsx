interface ButtonProps {
  text?: string;
  green?: boolean;
  disabled?: boolean;
  buttonClass?: string
  onClick?: any;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

export default function Button({
  text,
  green,
  disabled,
  type,
  children,
  onClick,
  buttonClass
}: ButtonProps) {
  return (
    <button
      className={`text-sm text-white w-full animation-time font-semibold p-4 rounded-full 
      ${disabled ? "bg-gray-400 cursor-not-allowed" : ""}
      ${buttonClass}
      ${green
          ? "bg-primary border-primary hover:border-primary"
          : "bg-green border-green hover:bg-transparent hover:text-green"
          }
          border border-solid
      `}
      type={type} // Add the type prop here
      disabled={disabled} // Disable button functionality
    >
      {children ? children : text}
    </button>
  );
}
