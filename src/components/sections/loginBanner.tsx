import Image from 'next/image';
import React from 'react'
const LoginImage = '/assets/images/login-banner.png';
export default function LoginBanner() {
  return (
    <div className='h-full relative'>
      <Image src={LoginImage} className='h-full w-full' alt='LoginImage' layout='fill' />
    </div>
  )
}
