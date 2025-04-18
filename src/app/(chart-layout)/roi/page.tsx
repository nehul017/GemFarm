"use client";
import FarmCropsList from "@/components/common/FarmCropsList";
import Tab from "@/components/common/tab";
import Header from "@/components/layout/header";
import PerformanceChart from "@/components/sections/performanceChart";
import ROIChart from "@/components/sections/ROIChart";
import GrowthIcon from "@/icons/growthIcon";
import { Sprout } from "lucide-react";
import { useEffect, useState } from "react";

const tabs = [
  { key: "performance", label: "Performance" },
  { key: "roi", label: "Projections" },
];

const tabs2 = [
  { key: "rev", label: "Revenue" },
  { key: "yield", label: "Yield" },
];

export default function page() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);
  const [selectedTab2, setSelectedTab2] = useState(tabs2[0].key);
  const [selectedOption, setSelectedOption] = useState("farm");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [toogle, setToogle] = useState(false);
  const [data, setData] = useState<any>({});
  useEffect(() => {
    const isFarm = localStorage.getItem("isFarm");

    if (isFarm === "false") {
      const data = JSON.parse(localStorage.getItem("container") || "{}");
      setData(data);
      setSelectedOption("crop");
      setSelectedCrop(data.container_crop);
    } else {
      setData(JSON.parse(localStorage.getItem("farm") || "{}"));
    }
  }, []);

  useEffect(() => {
    if (toogle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [toogle]);

  return (
    <div>
      <Header
        header={data.name || data.container_crop}
        isNotificationIcon={true}
      />
      <div className="bg-white relative min-h-[calc(100dvh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-4 pb-10 px-5">
          <Tab
            tabs={tabs2}
            selectedTab={selectedTab2}
            onChange={setSelectedTab2}
          />
          <div className="pt-4">
            <Tab
              tabs={tabs}
              selectedTab={selectedTab}
              onChange={setSelectedTab}
            />
          </div>
          <div className="pt-6">
            <p className="text-sm text-black font-medium mb-2">
              Forecast revenue
            </p>
            <div className="flex items-center justify-between pb-5">
              <h2 className="text-[26px] font-semibold text-black">
                $380,108.00
              </h2>
              {/* Radio Buttons */}
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                    value="farm"
                    checked={selectedOption === "farm"}
                    onChange={() => setSelectedOption("farm")}
                  />
                  <span className="text-sm font-medium text-black">Farm</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                    value="crop"
                    checked={selectedOption === "crop"}
                    onClick={() => {
                      if (selectedOption === "crop") {
                        setToogle((prev) => !prev); // toggle when clicking again
                      } else {
                        setSelectedOption("crop");
                        setToogle(true); // or false, depending on your default
                      }
                    }}
                  />
                  <span className="text-sm font-medium text-black">Crop</span>
                </label>
              </div>
            </div>

            {/* Selected Crop Display */}
            {selectedOption === "crop" && (
              <div className="flex items-center gap-2 mb-4 bg-[#36BA7E]/10 py-2 px-3 rounded-lg">
                <Sprout className="w-4 h-4 text-[#36BA7E]" />
                <span className="text-sm font-medium text-[#36BA7E] capitalize">
                  {selectedCrop}
                </span>
              </div>
            )}
            {selectedTab === "performance" ? (
              <PerformanceChart selectedTab2={selectedTab2} />
            ) : (
              <ROIChart selectedTab2={selectedTab2} />
            )}

            <div className="grid grid-cols-2 gap-3 pb-16">
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
                    <p className="text-xs text-gray800 mb-1">Total Expenses</p>
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
                    <p className="text-xs text-gray800 mb-1">Total Income</p>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      $520,64.00
                    </h4>
                    <div className="flex items-center gap-1">
                      <button className="bg-whi.datate rounded py-1.5 px-1 flex items-center gap-1 text-[8px] text-green font-semibold">
                        <GrowthIcon />
                        2.67%
                      </button>
                      <p className="truncate text-[10px] text-gray800 font-normal">
                        vs previous month
                      </p>
                    </div>
                  </div>
                  <div className="card-background p-2.5 border border-solid border-borderColor2 rounded-lg">
                    <p className="text-xs text-gray800 mb-1">Total Expenses</p>
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
                    <p className="text-xs text-gray800 mb-1">Net Profit</p>
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
        {toogle && (
          <div
            onClick={() => {
              if (selectedCrop) {
                setToogle(false);
              } else {
                setSelectedOption("farm");
                setToogle(false);
              }
            }}
            className="fixed top-0  w-full h-full bg-modalBackdrop z-[99] mx-auto max-w-[380px] mobile:max-w-[100%]"
          ></div>
        )}

        <div
          className={`bg-white max-w-[380px] w-full bottom-0 left-[50%] translate-x-[-50%] mx-auto fixed  z-[999] rounded-t-lg h-[calc(100dvh-100px)] transition-all duration-500 ease-in-out ${
            toogle ? "translate-y-[0%]" : "translate-y-[100%]"
          }`}
        >
          <div onClick={() => setToogle(!toogle)} className="p-5 pb-0">
            <h3 className="flex items-center justify-center">Farm Crops</h3>
          </div>
          <div className="p-5 pt-0">
            <FarmCropsList
              toogle={toogle}
              setToogle={setToogle}
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
