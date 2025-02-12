export default function Input({
  label,
  placeholder,
  icon,
  onIconClick, // Function to handle icon click
  error,
  type = "text",
  ...props
}: any) {
  return (
    <div>
      <label className="block text-sm text-black font-medium pb-2">
        {label}
      </label>
      <div className="relative">
        <input
          {...props} // Spread props (including register values)
          type={type} // Ensure dynamic type (e.g., password toggle)
          placeholder={placeholder}
          className={`px-4 w-full border focus:border-primary border-solid border-borderColor rounded-md h-[50px] text-sm outline-none placeholder:text-sm font-normal text-black placeholder:text-gray800 ${
            icon ? "pr-10" : ""
          }`}
        />
        {icon && (
          <button
            type="button"
            className="absolute top-[50%] translate-y-[-50%] right-4 flex items-center cursor-pointer"
            onClick={onIconClick} // Handle icon clicks
          >
            <img src={icon} alt="icon" className="w-5 h-5" />
          </button>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}
