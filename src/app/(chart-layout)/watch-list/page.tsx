import Button from "@/components/common/button";
import Tab from "@/components/common/tab";
import WatchListChart from "@/components/sections/watchListChart";
import Link from "next/link";
const CashIcon = "/assets/icons/cash.svg";
export default function page() {
  return (
    <>
      <div className="bg-white relative min-h-[calc(100vh-52px-78px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-4 pb-10 px-5">
          <WatchListChart />
          <div className="pt-7">
            {[...Array(2)].map(() => {
              return (
                <div className="p-4 last:mb-0 border mb-4 border-solid border-borderColor rounded-md bg-bglight flex items-center gap-4">
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
              );
            })}
          </div>
        </div>
      </div>
      <div className="sticky py-3 bottom-0 left-0 bg-white w-full md:max-w-[375px] md:mx-auto">
        <Link href="/roi">
          <Button green text="My Watch List" />
        </Link>
      </div>
    </>
  );
}
