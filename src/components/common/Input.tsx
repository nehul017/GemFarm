export default function Input({ label, placeholder, icon }: any) {
  return (
    <div>
      <label className='block text-sm text-black font-medium pb-2'>
        {label}
      </label>
      <div className='relative'>
        <input
          placeholder={placeholder}
          className={`px-4 w-full border animation-time focus:border-primary border-solid border-borderColor rounded-md h-[50px] text-sm outline-none placeholder:text-sm font-normal text-black placeholder:text-gray800 ${icon ? 'pr-10' : ''}`}
          type='text' />
        {
          icon && (
            <div className='absolute top-[50%] translate-y-[-50%] right-4 flex items-center cursor-pointer'>
              <img src={icon} alt='icon' />
            </div>
          )
        }
      </div>
    </div>
  )
}
