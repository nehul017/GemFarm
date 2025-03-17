import Header from "@/components/layout/header";
import UpdateProfile from "@/components/sections/updateProfile";
import React from "react";

export default function page() {
  return (
    <>
      <div className="bg-white relative overflow-x-hidden min-h-[calc(100dvh-0px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="py-5 flex items-center justify-between">
          <Header
            header="Profile"
            isNotificationIcon={false}
            isOnlyBackButton={true}
            isWhite={true}
            isShowProfile={false}
          />
        </div>
        <UpdateProfile />
      </div>
      {/* <SignOutModal/> */}
    </>
  );
}
