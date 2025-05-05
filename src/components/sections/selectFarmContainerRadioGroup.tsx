"use client";
import React, { useEffect, useState } from "react";
import CustomSearchSelect, {
  OptionType,
} from "../common/CustomSelectSearch/SelectOption";
import Button from "../common/button";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchFarms } from "../../redux/slices/farmSlice";
import { fetchContainers } from "../../redux/slices/containerSlice";

export default function SelectFarmContainerRadioGroup() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [farmOptions, setFarmOptions] = useState<OptionType[]>([]);
  const [containerOptions, setContainerOptions] = useState<OptionType[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<OptionType | null>(null);
  const [selectedContainer, setSelectedContainer] = useState<OptionType | null>(
    null
  );
  const [expenseType, setExpenseType] = useState("fixed");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (!selectedFarm && !selectedContainer) {
      setShowError(true);
      setErrorMessage("Please select both Farm and Container.");
      return;
    } else if (!selectedFarm) {
      setShowError(true);
      setErrorMessage("Please select Farm.");
      return;
    } else if (!selectedContainer) {
      setShowError(true);
      setErrorMessage("Please select Container.");
      return;
    }
    setShowError(false);
    if (expenseType === "fixed") {
      router.push("/fixed-expenses");
    } else if (expenseType === "variable") {
      router.push("/variable-expenses");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchFarms());
        const { data: farmData } = response.payload as { data: any[] };
        const formattedFarmOptions = farmData.map((farm) => ({
          value: farm.id,
          label: farm.name,
        }));
        setFarmOptions(formattedFarmOptions);
      } catch (error) {
        console.error("API request error:", error);
      } finally {
        console.error("API request Success");
      }
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async (farmId: string) => {
      try {
        const response = await dispatch(fetchContainers(farmId as string));
        const { data: containerData } = response.payload as { data: any[] };
        const formattedContainerOptions = containerData.map((container) => ({
          value: container.id,
          label: container.container_crop,
        }));
        setContainerOptions(formattedContainerOptions);
        setIsLoading(false);
      } catch (error) {
        console.error("API request error:", error);
      } finally {
        console.error("API request Success");
      }
    };
    if (selectedFarm) {
      setSelectedContainer(null);
      fetchData(selectedFarm.value);
    }
  }, [selectedFarm]);

  return (
    <>
      <div className="px-5 pb-5 h-[calc(100dvh-142px)] overflow-auto">
        <div className="flex justify-center items-center gap-5 pb-7 pt-2">
          <div className="flex items-center gap-2">
            <input
              className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
              value="fixed"
              checked={expenseType === "fixed"}
              onChange={() => setExpenseType("fixed")}
              type="radio"
            />
            <span
              className={`block text-sm ${
                expenseType === "fixed" ? "text-black" : "text-gray800"
              } font-medium`}
              onClick={() => setExpenseType("fixed")}
            >
              Fixed Expenses
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
              value="variable"
              checked={expenseType === "variable"}
              onChange={() => setExpenseType("variable")}
              type="radio"
            />
            <span
              className={`block text-sm ${
                expenseType === "variable" ? "text-black" : "text-gray800"
              } font-medium`}
              onClick={() => setExpenseType("variable")}
            >
              Variable Expenses
            </span>
          </div>
        </div>
        <div className="pb-5">
          <CustomSearchSelect
            label="Select Farm"
            options={farmOptions}
            value={selectedFarm}
            onChange={(value) => {
              setSelectedFarm(value);
              setErrorMessage(""); // Clear error when farm is selected
              setShowError(false);
            }}
            placeholder="Select Farm"
          />
        </div>
        <CustomSearchSelect
          label="Select Container"
          options={containerOptions}
          value={selectedContainer}
          onChange={(value) => {
            setSelectedContainer(value);
            setErrorMessage(""); // Clear error when farm is selected
            setShowError(false);
          }}
          placeholder={isLoading ? "Loading" : "Select Container"}
          loading={isLoading} // Show loading state if no options
        />
        {showError && (
          <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
      <div className="px-5">
        <Button buttonClass="w-full" green text="Next" onClick={handleNext} />
      </div>
    </>
  );
}
