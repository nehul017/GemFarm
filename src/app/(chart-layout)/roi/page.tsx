import Tab from '@/components/common/tab'
import GrowthIcon from '@/icons/growthIcon'
import Link from 'next/link'
export default function page() {
    return (
        <div>
            <div className="bg-white relative min-h-[calc(100vh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
                <div className="pt-4 pb-10 px-5">
                    <Tab />
                    <div className='pt-6'>
                        <p className='text-sm text-black font-medium mb-2'>
                            Forecast revenue
                        </p>
                        <div className='flex items-center justify-between pb-7'>
                            <h2 className='text-[26px] font-semibold text-black'>
                                $380,108.00
                            </h2>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-2'>
                                    <input type='radio' className='w-[18px] h-[18px] m-0 p-0 ' checked />
                                    <span className='text-sm font-medium text-black'>
                                        Farm
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type='radio' className='w-[18px] h-[18px] m-0 p-0 ' />
                                    <span className='text-sm font-medium text-gray800'>
                                        Farm
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='h-[283px] border border-solid border-borderColor rounded-xl bg-white'></div>
                        <div className='pt-4 pb-6'>
                            <Tab />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            {
                                [...Array(3)].map(() => {
                                    return (
                                        <Link href="/farm-health">
                                        <div className='card-background p-2.5 border border-solid border-borderColor2 rounded-lg'>
                                            <p className='text-xs text-gray800 mb-1'>
                                                Total Net Income
                                            </p>
                                            <h4 className='text-lg font-semibold text-black mb-3'>
                                                $180,108
                                            </h4>
                                            <div className='flex items-center gap-1'>
                                                <button className='bg-white rounded py-1.5 px-1 flex items-center gap-1 text-[8px] text-green font-semibold'>
                                                    <GrowthIcon />
                                                    2.67%
                                                </button>
                                                <p className='truncate text-[10px] text-gray800 font-normal'>
                                                    vs previous month
                                                </p>
                                            </div>
                                        </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
