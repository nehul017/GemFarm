import LeftIcon from "@/icons/leftIcon";
import React from "react";
import Input from "../common/Input";
import AddCoverPhoto from "./addCoverPhoto";
import Button from "../common/button";
import Header from "../layout/header";

export default function AddContainerDetails() {
  return (
    <div>
      <Header
        header="Create Container"
        isNotificationIcon={false}
        isOnlyBackButton={true}
        isWhite={true}
      />

      <div className="bg-white relative min-h-[calc(100dvh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-3 px-5 pb-5">
          <div className="grid grid-cols-1 gap-[18px] pb-[30px]">
            <Input
              label="Container Name"
              placeholder="Enter your farm name"
              inputClass="bg-bglight"
            />
            <Input
              label="Auto Grow DeviceId"
              placeholder="Enter auto grow deviceId"
              inputClass="bg-bglight"
            />
            <Input
              label="Blue Lab DeviceId"
              placeholder="Enter blue lab deviceId"
              inputClass="bg-bglight"
            />
            <Input
              label="Container Status"
              placeholder="Enter container status"
              inputClass="bg-bglight"
            />
            <Input
              label="Container Crop"
              placeholder="Enter container crop name"
              inputClass="bg-bglight"
            />
            <AddCoverPhoto />
            <Input
              label="Harvest Date"
              placeholder="Select harvest date"
              inputClass="bg-bglight"
            />
          </div>
        </div>
      </div>
      <div className="sticky px-5 py-2 bottom-0 left-0 bg-white">
        <Button green text="Save" />
      </div>
    </div>
  );
}
