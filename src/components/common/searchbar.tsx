import SearchIcon from '@/icons/SearchIcon'
import VoiceIcon from '@/icons/voiceIcon'
export default function Searchbar() {
  return (
    <div className='relative'>
      <input
      className='px-10 text-sm bg-inputBackground placeholder:text-white placeholder:opacity-[0.45] rounded-full placeholder:text-sm outline-none h-[50px] w-full text-white font-normal border border-solid border-borderColor3'
      placeholder='Search'
      type='text'/>
        <div className='absolute top-[50%] translate-y-[-50%] left-3 flex items-center cursor-pointer'>
            <SearchIcon/>
        </div>
        <div className='absolute top-[50%] translate-y-[-50%] right-3 flex items-center cursor-pointer'>
            <VoiceIcon/>
        </div>

    </div>
  )
}
