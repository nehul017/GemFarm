"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Searchbar from "./searchbar";
import { AppDispatch } from "../redux/store";
import { fetchFarmById } from "../redux/slices/farmSlice";

interface FarmCropsListProps {
  toogle: boolean;
  selectedCrop: string;
  setSelectedCrop: React.Dispatch<React.SetStateAction<string>>;
  setToogle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FarmCropsList({
  selectedCrop,
  setSelectedCrop,
  toogle,
  setToogle,
}: FarmCropsListProps) {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [containers, setContainers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCrops = async (farmId: string) => {
      const response = await dispatch(fetchFarmById(farmId));
      console.log("response", response);
      const payload = response.payload as { data: { containers: any } };

      const crop = payload.data.containers.map((item: any) => {
        return {
          id: item.id,
          name: item.container_crop,
          image: item.container_image,
        };
      });
      console.log("crop", crop);

      setContainers(crop);
    };
    const farmId = localStorage.getItem("farmId");
    if (farmId) {
      fetchCrops(farmId);
    }
  }, []);

  useEffect(() => {
    if (!toogle) {
      setSearchText("");
    }
  }, [toogle]);

  const listRef = useRef<HTMLDivElement>(null);
  const handleSearch = (text: string) => {
    setSearchText(text.toLowerCase());
  };

  const filteredCrops = containers.filter((crop) =>
    crop.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
      <div className="pt-0 h-[calc(100dvh-194px)]  overflow-auto" ref={listRef}>
        <div className="flex items-center mb-2 sticky top-0 bg-white z-10">
          <div className="w-full">
            <div className="pt-2 flex items-center justify-center mb-1 text-sm">
              <Searchbar onSearch={handleSearch} toogle={toogle} />
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-sm text-gray-500 mb-4">Select Crop</p>
          <div className="space-y-3">
            {filteredCrops.map((crop, i) => (
              <div
                key={i}
                className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 cursor-pointer hover:bg-[#E3FBE8]"
                onClick={() => {
                  setSelectedCrop(crop.name.toString());
                  setToogle(false);
                }}
              >
                <div className="grid-cols-[60px_1fr] grid gap-2 items-center">
                  <div>
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="block w-full h-10 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black font-medium truncate max-w-[130px]">
                      {crop.name}
                    </p>
                    <input
                      type="radio"
                      className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
                      before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
                      before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                      value={crop.id}
                      checked={selectedCrop === crop.name.toString()}
                      onChange={() => {
                        setSelectedCrop(crop.name.toString());
                        setToogle(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
