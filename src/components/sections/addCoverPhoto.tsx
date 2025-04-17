import UploadIcon from '@/icons/uploadIcon'
import React from 'react'

export default function AddCoverPhoto() {
    return (
        <div>
            <span className="block text-sm text-black font-medium pb-2">
                Add Cover Photo
            </span>
            <div className='h-[140px] border-dashed border border-borderColor rounded-md flex items-center justify-center'>
                <div>
                    <div className='flex items-center justify-center pb-2'>
                    <UploadIcon/>
                    </div>
                    <p className='text-sm text-black font-semibold'>
                    Click to upload
                    </p>
                </div>
            </div>
        </div>
    )
}
