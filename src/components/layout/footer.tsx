import React, { useState } from 'react'
import Button from '../common/button'

export default function Footer() {
    const [toogle, setToogle] = useState(false);
    return (
        <div>
            <div className='px-6 fixed bottom-5 w-full left-0 z-[9]'>
                <div onClick={() => setToogle(!toogle)}>
                    <Button text="Watch List" green />
                </div>
            </div>
            {
                toogle && (
                    <div className='fixed top-0 left-0 w-full h-full bg-modalBackdrop z-[99]'></div>
                )
            }
            <div className={`bg-white w-full bottom-0  fixed left-0 z-[999] rounded-t-lg h-[calc(100dvh-100px)] transition-all duration-500 ease-in-out ${toogle ? 'translate-y-[0%]' : 'translate-y-[100%]'}`}>
                <div onClick={() => setToogle(false)} className='p-5'>
                    <Button text="Watch List" green />
                </div>
                <div className='p-5 h-[calc(100dvh-194px)] overflow-auto'>
                    {
                        [...Array(250)].map(() => {
                            return (
                                <p>
                                    Hello world
                                </p>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}
