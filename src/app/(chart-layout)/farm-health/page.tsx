import moment from "moment";
import ChartIcon from "@/icons/chartIcon";
import Co2Icon from "@/icons/co2Icon";
import NPKIcon from "@/icons/npkIcon";
import PHIcon from "@/icons/PHIcon";
import H2oIcon from "@/icons/H2OIcon";
import O2Icon from "@/icons/O2Icon";
import ECIcon from "@/icons/ECIcon";
import Header from "@/components/layout/header";

export default function page() {
  const currentDate = moment().format("MMM DD, YYYY");
  ``;
  return (
    <>
      <Header header="Farm Health" isNotificationIcon={false}/>
      <div className="bg-white relative min-h-[calc(100vh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-4 pb-10 px-5">
          <div className="card-background border border-solid border-borderColor2 p-3 rounded-lg">
            <h2 className="text-[30px] leading-7 text-green uppercase font-bold mb-1 ">
              HEALTHY
            </h2>
            <p className="text-base font-bold text-black mb-1">
              GemFarms Madison, GA
            </p>
            <p className="text-sm text-balance font-medium">
              Harvest Date : <span className="text-xs">{currentDate}</span>
            </p>
          </div>
          <div className="pt-5">
            <div className="bg-bglight  mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full min-w-11 bg-white flex items-center justify-center">
                  <Co2Icon />
                </div>
                <p className="text-sm font-medium text-black">CO2</p>
              </div>
              <ChartIcon />
              <p className="text-sm text-black font-medium cursor-pointer">
                {`+ / -`}
              </p>
            </div>
            <div className="bg-bglight  mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full min-w-11 bg-white flex items-center justify-center">
                  <NPKIcon />
                </div>
                <p className="text-sm font-medium text-black">NPK</p>
              </div>
              <ChartIcon />
              <p className="text-sm text-black font-medium cursor-pointer">
                {`+ / -`}
              </p>
            </div>
            <div className="bg-bglight  mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full min-w-11 bg-white flex items-center justify-center">
                  <PHIcon />
                </div>
                <p className="text-sm font-medium text-black">PH</p>
              </div>
              <ChartIcon />
              <p className="text-sm text-black font-medium cursor-pointer">
                {`+ / -`}
              </p>
            </div>
            <div className="bg-bglight  mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full min-w-11 bg-white flex items-center justify-center">
                  <ECIcon />
                </div>
                <p className="text-sm font-medium text-black">EC</p>
              </div>
              <ChartIcon />
              <p className="text-sm text-black font-medium cursor-pointer">
                {`+ / -`}
              </p>
            </div>
            <div className="bg-bglight  mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full min-w-11 bg-white flex items-center justify-center">
                  <O2Icon />
                </div>
                <p className="text-sm font-medium text-black">O2</p>
              </div>
              <ChartIcon />
              <p className="text-sm text-black font-medium cursor-pointer">
                {`+ / -`}
              </p>
            </div>
            <div className="bg-bglight  mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full min-w-11 bg-white flex items-center justify-center">
                  <H2oIcon />
                </div>
                <p className="text-sm font-medium text-black">H2O</p>
              </div>
              <ChartIcon />
              <p className="text-sm text-black font-medium cursor-pointer">
                {`+ / -`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
