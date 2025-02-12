"use client";
import Tab from "@/components/common/tab";
import PerformanceChart from "@/components/sections/performanceChart";
import ROIChart from "@/components/sections/ROIChart";
import GrowthIcon from "@/icons/growthIcon";
import Link from "next/link";
import { useState } from "react";

const tabs = [
  { key: "performance", label: "Performance" },
  { key: "roi", label: "ROI" },
];

const tabs2 = [
  { key: "rev", label: "REV" },
  { key: "yield", label: "Yield" },
];

export default function page() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);
  const [selectedTab2, setSelectedTab2] = useState(tabs2[0].key);
  const [selectedOption, setSelectedOption] = useState("farm");

  return (
    <div>
      <div className="bg-white relative min-h-[calc(100vh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-4 pb-10 px-5">
          <Tab
            tabs={tabs}
            selectedTab={selectedTab}
            onChange={setSelectedTab}
          />
          <div className="pt-6">
            <p className="text-sm text-black font-medium mb-2">
              Forecast revenue
            </p>
            <div className="flex items-center justify-between pb-7">
              <h2 className="text-[26px] font-semibold text-black">
                $380,108.00
              </h2>
              {/* Radio Buttons */}
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="w-[18px] h-[18px] m-0 p-0"
                    value="farm"
                    checked={selectedOption === "farm"}
                    onChange={() => setSelectedOption("farm")}
                  />
                  <span className="text-sm font-medium text-black">Farm</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="w-[18px] h-[18px] m-0 p-0"
                    value="crop"
                    checked={selectedOption === "crop"}
                    onChange={() => setSelectedOption("crop")}
                  />
                  <span className="text-sm font-medium text-gray800">Crop</span>
                </div>
              </div>
            </div>
            {/* <div className="h-[283px] border border-solid border-borderColor rounded-xl bg-white"></div> */}
            {selectedTab === "performance" ? (
              <PerformanceChart />
            ) : (
              <ROIChart />
            )}
            <div className="pt-4 pb-6">
              <Tab
                tabs={tabs2}
                selectedTab={selectedTab2}
                onChange={setSelectedTab2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {selectedTab === "performance" && (
                <>
                  <div className="card-background p-2.5 border border-solid border-borderColor2 rounded-lg">
                    <p className="text-xs text-gray800 mb-1">
                      Total Net Income
                    </p>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      $180,108
                    </h4>
                    <div className="flex items-center gap-1">
                      <button className="bg-white rounded py-1.5 px-1 flex items-center gap-1 text-[8px] text-green font-semibold">
                        <GrowthIcon />
                        2.67%
                      </button>
                      <p className="truncate text-[10px] text-gray800 font-normal">
                        vs previous month
                      </p>
                    </div>
                  </div>
                  <div className="card-background p-2.5 border border-solid border-borderColor2 rounded-lg">
                    <p className="text-xs text-gray800 mb-1">
                      Total Expenses
                    </p>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      $200,000
                    </h4>
                    <div className="flex items-center gap-1">
                      <button className="bg-white rounded py-1.5 px-1 flex items-center gap-1 text-[8px] text-green font-semibold">
                        <GrowthIcon />
                        2.67%
                      </button>
                      <p className="truncate text-[10px] text-gray800 font-normal">
                        vs previous month
                      </p>
                    </div>
                  </div>
                </>
              )}

              {selectedTab === "roi" && (
                <>
                  <div className="card-background p-2.5 border border-solid border-borderColor2 rounded-lg">
                    <p className="text-xs text-gray800 mb-1">
                      Total Income
                    </p>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      $520,64.00
                    </h4>
                    <div className="flex items-center gap-1">
                      <button className="bg-white rounded py-1.5 px-1 flex items-center gap-1 text-[8px] text-green font-semibold">
                        <GrowthIcon />
                        2.67%
                      </button>
                      <p className="truncate text-[10px] text-gray800 font-normal">
                        vs previous month
                      </p>
                    </div>
                  </div>
                  <div className="card-background p-2.5 border border-solid border-borderColor2 rounded-lg">
                    <p className="text-xs text-gray800 mb-1">
                      Total Expenses
                    </p>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      $456,99.00
                    </h4>
                    <div className="flex items-center gap-1">
                      <button className="bg-white rounded py-1.5 px-1 flex items-center gap-1 text-[8px] text-green font-semibold">
                        <GrowthIcon />
                        2.67%
                      </button>
                      <p className="truncate text-[10px] text-gray800 font-normal">
                        vs previous month
                      </p>
                    </div>
                  </div>
                  <div className="card-background p-2.5 border border-solid border-borderColor2 rounded-lg">
                    <p className="text-xs text-gray800 mb-1">
                      Net Profit
                    </p>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      $314,54.00
                    </h4>
                    <div className="flex items-center gap-1">
                      <button className="bg-white rounded py-1.5 px-1 flex items-center gap-1 text-[8px] text-green font-semibold">
                        <GrowthIcon />
                        2.67%
                      </button>
                      <p className="truncate text-[10px] text-gray800 font-normal">
                        vs previous month
                      </p>
                    </div>
                  </div>
                  <div className="card-background p-2.5 border border-solid border-borderColor2 rounded-lg">
                    <p className="text-xs text-gray800 mb-1">
                      Case at End of the Month
                    </p>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      $1895
                    </h4>
                    <div className="flex items-center gap-1">
                      <button className="bg-white rounded py-1.5 px-1 flex items-center gap-1 text-[8px] text-green font-semibold">
                        <GrowthIcon />
                        2.67%
                      </button>
                      <p className="truncate text-[10px] text-gray800 font-normal">
                        vs previous month
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
