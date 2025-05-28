import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings, Save, Plus, Trash2, Edit3 } from "lucide-react";
import { formatCurrency } from "../utils/utils";
import Button from "./button";
import CustomSearchSelect from "./CustomSelectSearch/SelectOption";

interface MonthlyExpensesManagerProps {
  monthlyExpenses: { [key: string]: number };
  onUpdate: (expenses: { [key: string]: number }) => void;
  availableMonths: string[];
  monthlyRevenues: { [key: string]: number };
}

const MonthlyExpensesManager: React.FC<MonthlyExpensesManagerProps> = ({
  monthlyExpenses,
  onUpdate,
  availableMonths,
  monthlyRevenues,
}) => {
  const [expenses, setExpenses] = useState(monthlyExpenses);
  const [isEditing, setIsEditing] = useState(false);
  const [newMonth, setNewMonth] = useState("");
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());

  // Get all months that have either sales data or custom expenses
  const allMonths = Array.from(
    new Set([...availableMonths, ...Object.keys(expenses)])
  ).sort();

  const handleSave = () => {
    onUpdate(expenses);
    setIsEditing(false);
    // toast({
    //   title: "Expenses Updated",
    //   description: "Monthly expense amounts have been saved",
    // });
  };

  const handleExpenseChange = (month: string, value: string) => {
    const numValue = parseFloat(value);
    const defaultExpenses = (monthlyRevenues[month] || 0) * 0.6;
    setExpenses((prev) => ({
      ...prev,
      [month]: isNaN(numValue) ? defaultExpenses : numValue,
    }));
  };

  const handleAddMonth = () => {
    if (newMonth && newYear) {
      const monthKey = `${newYear}-${newMonth.padStart(2, "0")}`;
      if (!allMonths.includes(monthKey)) {
        const defaultExpenses = (monthlyRevenues[monthKey] || 0) * 0.6;
        setExpenses((prev) => ({
          ...prev,
          [monthKey]: defaultExpenses,
        }));
        setNewMonth("");
        // toast({
        //   title: "Month Added",
        //   description: `Added ${monthKey} to expense tracking`,
        // });
      } else {
        // toast({
        //   title: "Month Already Exists",
        //   description: `${monthKey} is already being tracked`,
        //   variant: "destructive",
        // });
      }
    }
  };

  const handleRemoveMonth = (month: string) => {
    setExpenses((prev) => {
      const updated = { ...prev };
      delete updated[month];
      return updated;
    });
    // toast({
    //   title: "Month Removed",
    //   description: `Removed ${month} from expense tracking`,
    // });
  };

  const getDefaultExpenses = (month: string) => {
    const revenue = monthlyRevenues[month] || 0;
    return revenue * 0.6;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Monthly Expense Settings
          </div>
          <div className="flex gap-2">
            <Button
              green
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                <Save className="h-4 w-4" />
              ) : (
                <Edit3 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add New Month Section */}
          {isEditing && (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-2">
              <h4 className="font-medium mb-3">Add New Month</h4>
              <div className="flex gap-2 items-end">
                <div className="flex w-[110px]">
                  <CustomSearchSelect
                    label="Year"
                    options={years.map((year) => ({
                      value: year.toString(),
                      label: year.toString(),
                    }))}
                    value={
                      years
                        .map((year) => ({
                          value: year.toString(),
                          label: year.toString(),
                        }))
                        .find((year) => year.value === newYear) || null
                    }
                    onChange={(value) => setNewYear(value?.value || "")}
                    placeholder="Select Year"
                  />
                </div>
                <div className="flex">
                  <CustomSearchSelect
                    label="Month"
                    options={months.map((month) => ({
                      value: month.value,
                      label: month.label,
                    }))}
                    value={
                      months.find((month) => month.value === newMonth) || null
                    }
                    placeholder="Select Month"
                    onChange={(value) => setNewMonth(value?.value || "")}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddMonth}
                    green
                    buttonClass="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {allMonths.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allMonths.map((month) => {
                const revenue = monthlyRevenues[month] || 0;
                const defaultExpenses = getDefaultExpenses(month);
                const currentExpenses =
                  expenses[month] !== undefined
                    ? expenses[month]
                    : defaultExpenses;
                const hasRevenue = revenue > 0;

                return (
                  <div key={month} className="space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <label htmlFor={`expense-${month}`}>
                        {new Date(month + "-01").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                        {!hasRevenue && (
                          <span className="text-xs text-orange-500 ml-2">
                            (No sales data)
                          </span>
                        )}
                      </label>
                      {isEditing && !hasRevenue && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleRemoveMonth(month)}
                            green
                            buttonClass="flex items-center gap-1 h-4 w-4"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      {hasRevenue && (
                        <div className="text-xs text-gray-500">
                          Revenue: {formatCurrency(revenue)}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-sm">$</span>
                        <Input
                          id={`expense-${month}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={currentExpenses}
                          onChange={(e) =>
                            handleExpenseChange(month, e.target.value)
                          }
                          disabled={!isEditing}
                          className="flex-1"
                        />
                      </div>
                      {!isEditing && hasRevenue && (
                        <div className="text-xs text-gray-400">
                          Default: {formatCurrency(defaultExpenses)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No expense data configured. Add months above or record sales to
              get started.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyExpensesManager;
