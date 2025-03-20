
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import OtherSetting from "@/components/sections/otherSetting";
import ProfileInformation from "@/components/sections/profileInformation";
import React from "react";

export default function page() {
  return (
    <div className="bg-white relative h-dvh md:max-w-[375px] md:mx-auto">
      <div className="bg-primary pt-5 pb-[100px] rounded-b-[30px]">
        <Header
          header="Settings"
          isNotificationIcon={false}
          isOnlyBackButton={true}
          isShowProfile={false}
        />
      </div>
      <div className="px-5 mt-[-50px]">
        <ProfileInformation />
        <OtherSetting />
      </div>
      <Footer />
    </div>
  );
}
