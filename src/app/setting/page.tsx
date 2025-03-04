import OtherSetting from '@/components/sections/otherSetting'
import ProfileInformation from '@/components/sections/profileInformation'
import RightIconWhite from '@/icons/rightIconWhite'
import React from 'react'

export default function page() {
  return (
    <div className='bg-white relative overflow-x-hidden min-h-[calc(100dvh-0px)] overflow-auto md:max-w-[375px] md:mx-auto'>
      <div className='bg-primary pt-5 px-5 pb-[100px] rounded-b-[30px]'>
        <div className='flex items-center justify-between'>
          <RightIconWhite />
          <h2 className='text-lg text-white font-semibold'>
            Setting
          </h2>
          <div></div>
        </div>
      </div>
      <div className='px-5 mt-[-50px]'>
        <ProfileInformation />
        <OtherSetting />
      </div>
    </div>
  )
}
