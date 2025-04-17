"use client";

import React from "react";
import Input from "../common/Input";
import AddCoverPhoto from "./addCoverPhoto";
import Button from "../common/button";
import Header from "../layout/header";
import { useRouter } from "next/navigation";

export default function AddFarmDetails() {
  const router = useRouter();

  return (
    <div>
      <Header
        header="Create Farm"
        isNotificationIcon={false}
        isOnlyBackButton={true}
        isWhite={true}
      />
      <div className="bg-white relative min-h-[calc(100dvh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-3 px-5">
          <div className="grid grid-cols-1 gap-[18px] pb-[30px]">
            <Input
              label="Farm Name"
              placeholder="Enter your farm name"
              inputClass="bg-bglight"
            />
            <Input
              label="Location"
              placeholder="Enter your farm location"
              inputClass="bg-bglight"
            />
            <AddCoverPhoto />
          </div>
        
          <Button
            green
            text="Next"
            onClick={() => router.push("/add-container-details")}
          />
        </div>
      </div>
    </div>
  );
}
