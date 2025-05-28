import Header from "@/components/layout/header";
import FixedExpenses from "@/components/sections/fixedExpenses";
import React from "react";

export default function page() {
  return (
    <div>
      <Header
        header="Fixed Expenses"
        isNotificationIcon={true}
        isOnlyBackButton={true}
        isWhite={true}
      />
      <FixedExpenses />
    </div>
  );
}
