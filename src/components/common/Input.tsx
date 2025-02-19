export default function Input({
  label,
  placeholder,
  icon,
  onIconClick,
  error,
  type = "text",
  ...props
}: any) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-black font-medium pb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={type}
          placeholder={placeholder}
          className={`px-4 w-full border focus:border-primary border-solid ${
            error ? "border-red-500" : "border-borderColor"
          } rounded-md h-[50px] text-sm outline-none placeholder:text-sm font-normal text-black placeholder:text-gray-500`}
        />
        {icon && (
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center w-5 h-5 cursor-pointer"
            onClick={onIconClick}
          >
            <img src={icon} alt="icon" className="w-5 h-5" />
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
