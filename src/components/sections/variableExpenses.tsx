"use client";
import React, { useState } from "react";
import Button from "../common/button";
import CustomSearchSelect, {
  OptionType,
} from "../common/CustomSelectSearch/SelectOption";
import PlusSmIcon from "@/icons/plusSmIcon";

const variableExpenseOptions: OptionType[] = [
  { value: "cogs_seeds", label: "COGS - Seeds" },
  { value: "cogs_nutrients", label: "COGS - Nutrients" },
  { value: "cogs_grow_materials_medium", label: "COGS - Grow Materials & Medium" },
  { value: "cogs_co2", label: "COGS - CO2" },
  { value: "cogs_packaging", label: "COGS - Packaging" },
  { value: "cogs_general_supplies", label: "COGS - General Supplies" },
];

interface ExpenseItem {
  farm: OptionType | null;
  amount: string;
}

export default function VariableExpenses() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { farm: null, amount: "" },
  ]);

  const handleAddExpense = () => {
    setExpenses([...expenses, { farm: null, amount: "" }]);
  };

  const updateExpense = (
    index: number,
    field: keyof ExpenseItem,
    value: any
  ) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  return (
    <div>
      <div className="px-5 pb-5 h-[calc(100dvh-162px)] pt-2 overflow-auto">
        {expenses.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_100px_50px] gap-1 pb-6"
          >
            <CustomSearchSelect
              options={variableExpenseOptions}
              value={item.farm}
              onChange={(value) => updateExpense(index, "farm", value)}
              placeholder="Select Farm"
            />
            <div className="relative">
              <input
                className="h-[50px] pl-7 text-base text-black w-full transition-all ease-in-out duration-300 focus:outline-none focus:border-green pr-2 border border-solid border-[#CDCDCD] bg-white rounded-md"
                type="number"
                value={item.amount}
                onChange={(e) => updateExpense(index, "amount", e.target.value)}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-3">
                <span className="text-base font-medium text-gray800 block">
                  $
                </span>
              </div>
            </div>
            {index === expenses.length - 1 ? (
              <div
                className="w-full cursor-pointer h-[50px] flex items-center justify-center bg-primary rounded-md"
                onClick={handleAddExpense}
              >
                <PlusSmIcon />
              </div>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
      <div className="p-5">
        <Button buttonClass="w-full" green text="Next" />
      </div>
    </div>
  );
}
