import Header from "@/components/layout/header";
import OtherSetting from "@/components/sections/otherSetting";
import ProfileInformation from "@/components/sections/profileInformation";
import React from "react";

export default function page() {
  return (
    <div className="bg-white relative h-screen md:max-w-[375px] md:mx-auto">
      <div className="bg-primary pt-5 pb-[100px] rounded-b-[30px]">
        <Header
          header="Setting"
          isNotificationIcon={false}
          isOnlyBackButton={true}
        />
      </div>
      <div className="px-5 mt-[-50px]">
        <ProfileInformation />
        <OtherSetting />
      </div>
    </div>
  );
}
