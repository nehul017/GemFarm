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

  useEffect(() => {
    const fetchData = async () => {
      console.log("------");
      const resultAction = await dispatch(fetchCommodityData());
      console.log("resultAction", resultAction);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://nibx1obi9h.execute-api.us-east-1.amazonaws.com/dev/containerlambda",
          { action: "GET" }, // Stringify the body here
          {
            headers: {
              "Content-Type": "application/json", // Ensure the content type is JSON
            },
          }
        );

        if (response.status === 200) {
          const { body } = response.data;
          console.log("API Response:", body);
          setData(body);
          // Process the data if needed, e.g., update a state with it
        } else {
          console.error("API request failed with status:", response.status);
        }
      } catch (error) {
        console.error("API request error:", error);
      } finally {
        setInitialLoad(false);
      }
    };

    fetchData();
  }, []);
  if (loading || initialLoad) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  const router = useRouter();

  const onClickFarm = (container: any) => {
    localStorage.setItem("container", JSON.stringify(container));
    router.push("/watch-list");
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
          {/* Toggle Buttons */}
          {/* <div className="flex gap-4 mt-4 mb-1">
            <button
              onClick={() => setActiveView("crops")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeView === "crops"
                  ? "bg-emerald-400 text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              Market Price
            </button>
            <button
              onClick={() => setActiveView("containers")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeView === "containers"
                  ? "bg-emerald-400 text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              Containers
            </button>
          </div> */}
          <div className="pt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-white">Your Farms</p>
            <p className="text-sm font-medium text-white">
              <span className="text-green">{data.length}</span> Container
            </p>
          </div>
        </div>
        <div className="mt-[-100px] px-5 pb-[100px]">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-4 rounded-xl mb-[18px] cursor-pointer"
              onClick={() => onClickFarm(item)}
            >
              <img
                src={item.container_image}
                alt="FarmImage"
                className="block w-full h-[120px] rounded-lg object-cover"
              />
              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-sm font-medium text-black ">
                    {item.name} | {item.container_crop}
                  </p>
                  <div className="flex items-center gap-1">
                    <LocationIcon />
                    <span className="block text-sm text-black opacity-[.4]">
                      {item.location}
                    </span>
                  </div>
                </div>
                <button className="py-2 px-3 text-sm font-semibold text-green rounded-[4px] bg-[#E6F4EE] cursor-pointer border-none">
                  ${prices[index] || 12}
                </button>
              </div>
            </div>
          ))}
          {/* <div
            className="bg-white shadow-lg p-4 rounded-xl mb-[18px] cursor-pointer"
            onClick={onClickFarm}
          >
            <img
              src={FarmImage}
              alt="FarmImage"
              className="block w-full h-[120px] rounded-lg object-cover"
            />
            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="text-sm font-medium text-black ">
                  GemFarms | Strawberry
                </p>
                <div className="flex items-center gap-1">
                  <LocationIcon />
                  <span className="block text-sm text-black opacity-[.4]">
                    Thorn Bridge Cir. Shiloh
                  </span>
                </div>
              </div>
              <button className="py-2 px-3 text-sm font-semibold text-green rounded-[4px] bg-[#E6F4EE] cursor-pointer border-none">
                $1.29%
              </button>
            </div>
          </div>

          <div
            className="bg-white shadow-lg p-4 rounded-xl mb-[18px] cursor-pointer"
            onClick={onClickFarm}
          >
            <img
              src={TomatoesFarmImage}
              alt="FarmImage"
              className="block w-full h-[120px] rounded-lg object-cover"
            />
            <div className="flex items-center justify-between pt-4 ">
              <div>
                <p className="text-sm font-medium text-black ">
                  GemFarms | Tomatoes
                </p>
                <div className="flex items-center gap-1">
                  <LocationIcon />
                  <span className="block text-sm text-black opacity-[.4]">
                    Thorn Bridge Cir. Shiloh
                  </span>
                </div>
              </div>
              <button className="py-2 px-3 text-sm font-semibold text-green rounded-[4px] bg-[#E6F4EE] cursor-pointer border-none">
                $1.40%
              </button>
            </div>
          </div>

          <div
            className="bg-white shadow-lg p-4 rounded-xl mb-[18px] cursor-pointer"
            onClick={onClickFarm}
          >
            <img
              src={NFTFarmImage}
              alt="FarmImage"
              className="block w-full h-[120px] rounded-lg object-cover"
            />
            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="text-sm font-medium text-black ">
                  GemFarms | Lettuce Leafy
                </p>
                <div className="flex items-center gap-1">
                  <LocationIcon />
                  <span className="block text-sm text-black opacity-[.4]">
                    Thorn Bridge Cir. Shiloh
                  </span>
                </div>
              </div>
              <button className="py-2 px-3 text-sm font-semibold text-green rounded-[4px] bg-[#E6F4EE] cursor-pointer border-none">
                $1.35%
              </button>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withAuth(page);
