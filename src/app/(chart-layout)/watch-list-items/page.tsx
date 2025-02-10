import LineChart from '@/icons/lineChart';
const StrawberryImage = '/assets/images/Strawberry.png';
export default function page() {
    return (
        <div className="bg-white relative min-h-[calc(100vh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
            <div className="pt-5 pb-10 px-5">
                {
                    [...Array(10)].map(() => {
                        return (
                            <div className='bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between'>
                                <div className='flex items-center gap-5'>
                                    <div className='flex items-center gap-3'>
                                        <img src={StrawberryImage} alt='StrawberryImage' className='block w-[70px] min-w-[70px] rounded-xl h-[70px]' />
                                        <div>
                                            <p className='text-sm text-black font-semibold mb-2'>
                                                Strawberry
                                            </p>
                                            <button className='text-xs font-semibold border-none cursor-pointer text-green py-[5px] px-2.5 rounded-sm bg-[#E6F4EE]'>
                                                $4.78%
                                            </button>
                                        </div>
                                    </div>
                                    <LineChart />
                                </div>
                                <button className='py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full'>
                                    Buy
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

