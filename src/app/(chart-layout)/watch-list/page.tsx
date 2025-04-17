"use client";
import Button from "@/components/common/button";
import Header from "@/components/layout/header";
import WatchListChart from "@/components/sections/watchListChart";
import Link from "next/link";
import { useRouter } from "next/navigation";
const CashIcon = "/assets/icons/cash.svg";
const PlantCareIcon = "/assets/icons/plant-care.svg";

export default function page() {
  const router = useRouter();
  const isFarm = localStorage.getItem("isFarm") === "true";

  const handleClickOnCashFlow = () => {
    router.push("/roi");
  };
  const handleClickOnFarmHealth = () => {
    router.push("/farm-health");
  };
  return (
    <>
      <Header isNotificationIcon={true} />
      <div className="bg-white relative min-h-[calc(90vh-52px-78px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-4 pb-10 px-5">
          <WatchListChart />
          <div className="pt-7">
            <div
              className="p-4 last:mb-0 border mb-4 border-solid border-borderColor rounded-md bg-bglight flex items-center gap-4 cursor-pointer"
              onClick={handleClickOnCashFlow}
            >
              <div className="w-12 h-12 min-w-12 bg-white rounded-full flex items-center justify-center">
                <img src={CashIcon} alt="CashIcon" />
              </div>
              <div>
                <p className="text-sm text-black font-semibold mb-1">
                  Cash Flow
                </p>
                <span className="text-xs text-gray800 font-normal block">
                  Cash flow tracks money movement.
                </span>
              </div>
            </div>
            {!isFarm && (
              <div
                className="p-4 last:mb-0 border mb-4 border-solid border-borderColor rounded-md bg-bglight flex items-center gap-4"
                onClick={handleClickOnFarmHealth}
              >
                <div className="w-12 h-12 min-w-12 bg-white rounded-full flex items-center justify-center">
                  <img src={PlantCareIcon} alt="PlantCareIcon" />
                </div>
                <div>
                  <p className="text-sm text-black font-semibold mb-1">
                    Farm Health
                  </p>
                  <span className="text-xs text-gray800 font-normal block">
                    Farm health measures wellbeing.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
