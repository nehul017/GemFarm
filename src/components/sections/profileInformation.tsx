import Link from 'next/link';
import React from 'react'
const UserIcon = '/assets/icons/profile.svg';
export default function ProfileInformation() {
    return (
        <div className='shadow-lg bg-white rounded-xl py-2.5 px-[15px] flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <img
                    className='w-[60px] min-w-[60px] h-[60px] object-cover block rounded-full'
                    src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" />
                <div>
                    <p className='text-base font-semibold text-black200 m-0'>
                        Dolphine Devtra
                    </p>
                    <span className='text-[10px] text-gray600 block leading-4'>
                        gemfarm889@gmail.com
                    </span>
                </div>
            </div>
            <Link href="/profile">
                <img src={UserIcon} alt='UserIcon' />
            </Link>
        </div>
    )
}
