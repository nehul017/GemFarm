"use client"; // 👈 Add this at the top
import React from "react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SensorSettingsPage from "@/components/sections/SensorSetting";

function page() {
  return (
    <>
      <div className="bg-white relative overflow-x-hidden min-h-[calc(100dvh-0px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="flex items-center justify-between">
          <Header
            header="Sensor Settings"
            isNotificationIcon={true}
            isOnlyBackButton={true}
            isWhite={true}
          />
        </div>
        <SensorSettingsPage />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default page;
