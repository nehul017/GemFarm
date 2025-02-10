import LeftIcon from '@/icons/leftIcon'
import NotificationIcon from '@/icons/notificationIcon'
import React from 'react'

export default function Header() {
  return (
    <div className='flex sticky top-0 md:max-w-[375px] md:mx-auto bg-white z-10 items-center justify-between py-3 px-5'>
      <LeftIcon/>
      <p className='text-lg text-black font-semibold'>
      GemFarms
      </p>
      <NotificationIcon/>
    </div>
  )
}
