import Header from "@/components/layout/header";
import FixedExpenses from "@/components/sections/fixedExpenses";
import VariableExpenses from "@/components/sections/variableExpenses";
import React from "react";

export default function page() {
  return (
    <div>
      <Header
        header="Variable Expenses"
        isNotificationIcon={true}
        isOnlyBackButton={true}
        isWhite={true}
      />
      <VariableExpenses />
    </div>
  );
}
