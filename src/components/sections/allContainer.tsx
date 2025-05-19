import { useRouter } from "next/navigation";
import LineChart from "@/icons/lineChart";
import React from "react";
import Button from "../common/button";
const CardImage = "/assets/images/Strawberry.png";

export default function AllContainer({ data }: { data: any[] }) {
  const router = useRouter();

  const onClickFarm = (container: any) => {
    localStorage.setItem("container", JSON.stringify(container));
    localStorage.setItem("isFarm", "false");
    router.push("/watch-list");
  };

  return (
    <div className="mt-3 pb-[90px]">
      <div className="bg-bglight border border-solid border-borderColorlight px-3 py-4 rounded-xl">
        <h2 className="text-sm font-semibold text-black mb-4">All Container</h2>
        <div>
          {data.map((item, i) => {
            return (
              <div
                key={i}
                className="grid grid-cols-[80px_1fr] gap-2.5 mb-4 cursor-pointer"
                onClick={() => onClickFarm(item)}
              >
                <img
                  className="block w-full h-[80px] rounded-xl object-cover"
                  src={item.container_image}
                  alt="CardImage"
                />
                <div>
                  <h3 className="line-clamp-1 text-sm font-medium text-black mb-1">
                    {item.container_crop}
                    {item.variety && (
                      <span className="text-sm text-gray-500">
                        ({item.variety})
                      </span>
                    )}
                  </h3>
                  <p className="text-sm line-clamp-1 text-gray800 font-medium mb-2">
                    {item.harvest_system} | {item.crop_category}
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="p-[5px] rounded-sm text-green font-semibold text-xs bg-[#E6F4EE]">
                      $1.29 / Kg
                    </button>
                    <LineChart />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
        <Button
          buttonClass="mt-3 w-15 h-10 bg-primary flex items-center justify-center rounded-full"
          text="Add Container"
          green
          onClick={() => router.push("/add-container-details")}
        ></Button>
    </div>
  );
}
