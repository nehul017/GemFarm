import ChartIcon from '@/icons/chartIcon'
import Co2Icon from '@/icons/co2Icon'
import Link from 'next/link'
export default function page() {
    return (
        <div className="bg-white relative min-h-[calc(100vh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
            <div className="pt-4 pb-10 px-5">
                <div className='card-background border border-solid border-borderColor2 p-3 rounded-lg'>
                    <h2 className='text-[30px] leading-7 text-green uppercase font-bold mb-1 '>
                        HEALTHY
                    </h2>
                    <p className='text-base font-bold text-black mb-1'>
                        GemFarms Madison, GA
                    </p>
                    <p className='text-sm text-balance font-medium'>
                        Harvest Date : <span className='text-xs'>Feb 27, 2025</span>
                    </p>
                </div>
                <div className='pt-5'>
                    {
                        [...Array(10)].map(() => {
                            return (
                                <Link href="/watch-list-items">
                                    <div className='bg-bglight  mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between'>
                                        <div className='flex items-center gap-2.5'>
                                            <div className='w-11 h-11 rounded-full min-w-11 bg-white flex items-center justify-center'>
                                                <Co2Icon />
                                            </div>
                                            <p className='text-sm font-medium text-black'>
                                                CO2
                                            </p>
                                        </div>
                                        <ChartIcon />
                                        <p className='text-sm text-black font-medium cursor-pointer'>
                                            {`+ / -`}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
