import Header from "@/components/layout/header";
import SelectFarmContainerRadioGroup from "@/components/sections/selectFarmContainerRadioGroup";
import React from "react";

export default function page() {
  return (
    <div>
      <Header
        header="Financial Data"
        isNotificationIcon={true}
        isOnlyBackButton={true}
        isWhite={true}
      />
      <SelectFarmContainerRadioGroup />
    </div>
  );
}
