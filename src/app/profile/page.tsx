import Button from '@/components/common/button'
import Input from '@/components/common/Input'
import SignOutModal from '@/components/modal/signOutModal'
import LeftIcon from '@/icons/leftIcon'
const EditIcon = '/assets/icons/edit.svg'
import React from 'react'

export default function page() {
    return (
        <>
        <div className='bg-white relative overflow-x-hidden min-h-[calc(100dvh-0px)] overflow-auto md:max-w-[375px] md:mx-auto'>
            <div className='px-5 py-5 flex items-center justify-between'>
                <LeftIcon />
                <p className='text-lg text-black font-semibold'>
                    Profile
                </p>
                <div className='w-[22px]'></div>
            </div>
            <div className='pt-3 px-5'>
                <div className='w-[100px] relative h-[100px] mx-auto'>
                    <img
                        className='w-full h-full rounded-full block object-cover'
                        src='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg' />
                    <div className='absolute bottom-0 right-0'>
                        <img src={EditIcon} alt='EditIcon' className='block cursor-pointer max-w-7' />
                    </div>
                </div>
                <div className='pt-2.5 pb-[30px]'>
                    <h2 className='text-base font-semibold text-black200 text-center'>
                        Dolphine Devtra
                    </h2>
                    <p className='text-[10px] leading-4 text-gray600 block text-center'>
                        gemfarm889@gmail.com
                    </p>
                </div>
                <div>
                    <Input inputClass="bg-[#FAFAFA]" label="Name" placeholder="Enter your name" />
                    <div className='py-5'>
                        <Input inputClass="bg-[#FAFAFA]" label="Email" placeholder="Enter your email" />
                    </div>
                </div>
                <Button green text="Save Changes" />
            </div>
        </div>
        <SignOutModal/>
        </>
    )
}
