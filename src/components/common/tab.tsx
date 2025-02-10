export default function Tab() {
  return (
    <div className='p-1 rounded-lg shadow-md bg-bglight border border-solid border-borderColor grid grid-cols-2 gap-0'>
      <button className='py-3 px-5 text-sm font-semibold rounded-md bg-white shadow-md text-green border-none'>
      Performance
      </button>
      <button className='py-3 px-5 text-sm font-semibold rounded-md   text-gray800 bg-transparent border-none'>
      ROI
      </button>
    </div>
  )
}
