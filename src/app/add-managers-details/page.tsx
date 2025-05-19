import Header from '@/components/layout/header'
import AddManagerDetails from '@/components/sections/addManagerDetails'
import React from 'react'

export default function page() {
    return (
        <div>
            <div className="bg-white relative overflow-x-hidden min-h-[calc(100dvh-0px)] overflow-auto md:max-w-[375px] md:mx-auto">
                <div className="flex items-center justify-between">
                    <Header
                        header="Manager"
                        isNotificationIcon={false}
                        isOnlyBackButton={true}
                        isWhite={true}
                        isShowProfile={true}
                    />
                </div>
                <AddManagerDetails />
            </div>
        </div>
    )
}
