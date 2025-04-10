"use client"; // 👈 Add this at the top

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import {
  fetchCommodityData,
  fetchUserProfile,
} from "@/components/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/components/redux/store";
import LocationIcon from "@/icons/locationIcon";
import NotificationIcon from "@/icons/notificationIcon";
import Footer from "@/components/layout/footer";
import withAuth from "../withAuth";
import { fetchFarms } from "@/components/redux/slices/farmSlice";

// const FarmImage = "/assets/images/farm.png";
const ProfileImage = "/assets/images/Ty1.png";
// const TomatoesFarmImage = "/assets/images/Tomatoes.avif";
// const NFTFarmImage = "/assets/images/NFT.jpg";

function page() {
  const dispatch = useDispatch<AppDispatch>();
  const currentDate = moment().format("dddd, DD MMMM YYYY");
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [initialLoad, setInitialLoad] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setInitialLoad(true);
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
      
  //     const resultAction = await dispatch(fetchCommodityData());
      
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchFarms());
        const { data: farmData } = response.payload as { data: any[] };
        setData(farmData);
        setInitialLoad(false);
      } catch (error) {
        console.error("API request error:", error);
        setInitialLoad(false);
      } finally {
        setInitialLoad(false);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();

  const onClickFarm = (farm: any) => {
    localStorage.setItem("farm", JSON.stringify(farm));
    localStorage.setItem("farmId", farm.id);
    router.push("/container");
  };

  const onClickSetting = () => {
    router.push("/setting");
  };

  const prices = ["18.20", "12.10", "12.20", "15.55", "22.53", "16.20"];

  return (
    <div>
      <div className="bg-white relative min-h-[calc(100vh-0px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="bg-primary pt-5 px-5 pb-[120px] rounded-b-[30px]">
          <div className="grid grid-cols-[1fr_100px] pb-5 gap-1">
            <div>
              <h2 className="text-white text-[22px] break-words font-semibold mb-1">
                Hello,{" "}
                <span className="text-green break-all">{user?.username}</span>
              </h2>
              <p className="text-white opacity-[.55] text-xs font-medium">
                {currentDate}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <div
                className="w-11 h-11 bg-white flex items-center justify-center rounded-full cursor-pointer"
                onClick={onClickSetting}
              >
                <img
                  className="w-full h-full rounded-full block object-cover"
                  src={user?.profileImage || ProfileImage}
                  alt="Profile"
                />
              </div>
              <div className="w-11 h-11 bg-white flex items-center justify-center rounded-full cursor-pointer">
                <NotificationIcon />
              </div>
            </div>
          </div>
          <div className="pt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-white">Your Farms</p>
            <p className="text-sm font-medium text-white">
              <span className="text-green">{data.length}</span> Farm
            </p>
          </div>
        </div>
        {loading || initialLoad ? (
          <div className="flex justify-center items-center h-dvh">
            <div className="relative bottom-[150px] w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-[-100px] px-5 pb-[100px]">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white sha p-4 rounded-xl mb-[18px] cursor-pointer shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px]"
                onClick={() => onClickFarm(item)}
              >
                <img
                  src={item.farmImage}
                  alt="FarmImage"
                  className="block w-full h-[120px] rounded-lg object-cover"
                />
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium text-black ">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <LocationIcon />
                      <span className="block text-sm text-black opacity-[.4]">
                        {item.location}
                      </span>
                    </div>
                  </div>
                  {/* <button className="py-2 px-3 text-sm font-semibold text-green rounded-[4px] bg-[#E6F4EE] cursor-pointer border-none">
                  ${prices[index] || 12}
                </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default withAuth(page);
