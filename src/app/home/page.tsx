"use client"; // 👈 Add this at the top

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { fetchCommodityData, fetchUserProfile } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import LocationIcon from "@/icons/locationIcon";
import NotificationIcon from "@/icons/notificationIcon";
import Footer from "@/components/layout/footer";
import withAuth from "../withAuth";
import { fetchFarms } from "@/redux/slices/farmSlice";
import Button from "@/components/common/button";
import GrowWhiteIcon from "@/icons/growWhiteIcon";
import GrowPrimaryIcon from "@/icons/growPrimaryIcon";
import { Plus } from "lucide-react";
const FarmIcon = "/assets/icons/Farm.svg";

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
  const [showOptions, setShowOptions] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    if (showOptions) {
      setAnimateOut(true);
      setIsVisible(false);
      setTimeout(() => {
        setShowOptions(false);
        setAnimateOut(false);
      }, 300);
    } else {
      setShowOptions(true);
      setTimeout(() => setIsVisible(true), 10); // slight delay to trigger transition
    }
  };

  useEffect(() => {
    setInitialLoad(true);
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, []);

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

  const onClickContainer = (farm: any) => {
    localStorage.setItem("farm", JSON.stringify(farm));
    localStorage.setItem("farmId", farm.id);
    localStorage.setItem("isFarm", "false");
    router.push("/container");
  };
  const onClickFarm = (farm: any) => {
    localStorage.setItem("farm", JSON.stringify(farm));
    localStorage.setItem("farmId", farm.id);
    localStorage.setItem("isFarm", "true");
    router.push("/watch-list");
  };

  const onClickSetting = () => {
    router.push("/setting");
  };

  return (
    <div>
      {loading || initialLoad ? (
        <div className="flex justify-center items-center h-dvh">
          <div className="relative w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="bg-white relative md:max-w-[375px] md:mx-auto">
            <div className="bg-primary pt-5 px-5 pb-[80px] rounded-b-[30px]">
              <div className="grid grid-cols-[1fr_100px] pb-5 gap-1">
                <div>
                  <h2 className="text-white text-xl break-words font-semibold mb-1">
                    Hello,{" "}
                    <span className="text-green break-all">
                      {user?.username}
                    </span>
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
            {data.length > 0 ? (
              <div className="mt-[-50px] px-5 pb-[100px] min-h-[calc(100dvh-240px)] overflow-auto h-[50px]">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-cardShadow p-3 mb-4 last:mb-0"
                  >
                    <div className="grid grid-cols-[105px_1fr] gap-2.5">
                      <img
                        src={item.farm_image}
                        alt="FarmImage"
                        className="block w-full h-[105px] rounded-[10px] object-cover"
                      />
                      <div>
                        <h2 className="text-sm font-medium text-black mb-2 truncate max-w-[130px]">
                          {item.name}
                        </h2>
                        <div className="flex pb-2 items-center gap-1 ">
                          <LocationIcon />
                          <span className="text-xs font-medium text-gray800 truncate max-w-[130px]">
                            {" "}
                            {item.location}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-gray800 mb-2.5">
                          {moment(item.created_at).format("DD MMM YYYY")}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onClickFarm(item)}
                            className="p-2 flex items-center gap-2 rounded-full justify-center border border-solid border-primary bg-primary text-white text-xs font-medium"
                          >
                            Farm
                            <GrowWhiteIcon />
                          </button>
                          <button
                            onClick={() => onClickContainer(item)}
                            className="p-2 flex items-center gap-2 rounded-full justify-center border border-solid border-green bg-transparent text-green text-xs font-medium"
                          >
                            Container
                            <GrowPrimaryIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-[50px] px-5 pb-[100px]">
                <div className="bg-white rounded-xl p-3 mb-4 last:mb-0">
                  <img src={FarmIcon} alt="FarmIcon" />
                  <div className="mt-9 text-center font-montserrat font-semibold text-[16px] leading-[100%] tracking-[0px] text-[#0A3732]">
                    You haven’t added any farms yet. Let’s get started!
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div
            className="fixed z-[999] right-4 bottom-24 bg-primary flex items-center justify-center text-white rounded-full w-10 h-10"
            onClick={() => router.push("/add-farm-details")}
          >
            <Plus className="h-4 w-4" />
          </div> */}
          {/* Floating Action Button with Menu */}
          <div className="fixed z-[999] right-4 bottom-24 flex flex-col items-end gap-2">
            {/* Options */}
            {showOptions && (
              <>
                {[
                  {
                    label: "Assign Manager",
                    path: "/add-managers-details",
                    angle: -95,
                    x: "-6",
                    y: "-90",
                  },
                  {
                    label: "Create Farm",
                    path: "/add-farm-details",
                    angle: -155,
                    x: "-6",
                    y: "-45",
                  },
                ].map((item, i) => {
                  const rad = (item.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 80;
                  const y = Math.sin(rad) * 80;

                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        toggleMenu();
                        router.push(item.path);
                      }}
                      style={{
                        transform:
                          animateOut || !isVisible
                            ? "translate(0px, 0px)"
                            : `translate(${item.x || x}px, ${item.y || y}px)`,
                      }}
                      className={`absolute w-[8rem] bg-primary text-white text-sm font-semibold px-1 py-1 rounded-md shadow-md border border-primary
            transition-all duration-300 ease-in-out origin-center
            ${
              animateOut || !isVisible
                ? "opacity-0 scale-75"
                : "opacity-100 scale-100"
            }
          `}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </>
            )}

            <button
              onClick={toggleMenu}
              className="bg-primary flex items-center justify-center text-white rounded-full w-10 h-10 shadow-lg"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}

export default withAuth(page);
