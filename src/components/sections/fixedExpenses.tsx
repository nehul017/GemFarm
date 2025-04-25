"use client";
import React, { useState } from "react";
import Button from "../common/button";
import CustomSearchSelect, {
  OptionType,
} from "../common/CustomSelectSearch/SelectOption";
import PlusSmIcon from "@/icons/plusSmIcon";
import { useRouter } from "next/navigation";
import MinusIcon from "@/icons/minusIcon";

const expenseOptions: OptionType[] = [
  { value: "admin_accounting_cpa", label: "ADMIN - Accounting / CPA" },
  { value: "admin_legal", label: "ADMIN - Legal" },
  {
    value: "admin_business_insurance_annual",
    label: "ADMIN - Business Insurance (Annual)",
  },
  {
    value: "admin_insurance_sales_vehicle_monthly",
    label: "ADMIN - Insurance - Sales Vehicle (Monthly)",
  },
  { value: "admin_banking_fees", label: "ADMIN - Banking Fees" },
  { value: "admin_mileage", label: "ADMIN - Mileage" },
  { value: "admin_cell_phones", label: "ADMIN - Cell Phones" },
  { value: "admin_general_expenses", label: "ADMIN - General Expenses" },
  { value: "infrastructure_water", label: "Infrastructure - Water" },
  {
    value: "infrastructure_electricity",
    label: "Infrastructure - Electricity",
  },
  { value: "infrastructure_internet", label: "Infrastructure - Internet" },
  {
    value: "web_apps_shopify_gsuite_zoom_other",
    label: "WEB - Apps - Shopify, GSuite, Zoom, Other",
  },
  { value: "web_crm", label: "WEB - Customer Relations Management (CRM)" },
  {
    value: "web_website_software_maintenance",
    label: "WEB - Website & Software Development & Maintenance",
  },
  { value: "web_payment_gateway", label: "WEB - Payment Gateway" },
  {
    value: "staffing_salary_general_manager",
    label: "STAFFING - Salary - General Manager",
  },
  {
    value: "staffing_salary_delivery_driver",
    label: "STAFFING - Salary - Delivery Driver",
  },
  {
    value: "staffing_salary_supporting_farm_staff",
    label: "STAFFING - Salary - Supporting Farm Staff",
  },
  {
    value: "staffing_salary_sales_rep",
    label: "STAFFING - Salary - Sales Rep",
  },
  {
    value: "staffing_contracted_marketing_social_media",
    label: "STAFFING - Contracted - Marketing / Social Media Manager",
  },
  {
    value: "staffing_contracted_graphic_packaging",
    label: "STAFFING - Contracted - Graphic Designer, Packaging & Collateral",
  },
];

interface ExpenseItem {
  farm: OptionType | null;
  amount: string;
}

export default function FixedExpenses() {
  const router = useRouter();

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { farm: null, amount: "" },
  ]);

  const handleAddExpense = () => {
    setExpenses([...expenses, { farm: null, amount: "" }]);
  };

  const handleRemoveExpense = (index: number) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
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
              options={expenseOptions}
              value={item.farm}
              onChange={(value) => updateExpense(index, "farm", value)}
              placeholder="Select Farm"
            />
            <div className="relative">
              <input
                className="h-[50px] pl-7 text-base text-black w-full transition-all ease-in-out duration-300 focus:outline-none focus:border-green pr-2 border border-solid border-[#CDCDCD] bg-white rounded-md"
                type="text"
                inputMode="decimal" // mobile-friendly for numbers with decimals
                value={item.amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*\.?\d{0,2}$/.test(val)) {
                    updateExpense(index, "amount", val);
                  }
                }}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-3">
                <span className="text-base font-medium text-gray800 block">
                  $
                </span>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              {expenses.length > 1 ? (
                <div
                  className="cursor-pointer h-[50px] w-[50px] flex items-center justify-center bg-red-100 rounded-md"
                  onClick={() => handleRemoveExpense(index)}
                >
                  <MinusIcon />
                </div>
              ) : null}
              {index === expenses.length - 1 && (
                <div
                  className={`${
                    expenses.length === 1 ? "" : "ml-2"
                  } cursor-pointer h-[50px] w-[50px] flex items-center justify-center bg-primary rounded-md`}
                  onClick={handleAddExpense}
                >
                  <PlusSmIcon />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-5">
        <Button
          buttonClass="w-full"
          green
          text="Next"
          onClick={() => router.push("/variable-expenses")}
        />
      </div>
    </div>
  );
}
