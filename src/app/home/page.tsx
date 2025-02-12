"use client";
import Searchbar from "@/components/common/searchbar";
import { fetchUserProfile } from "@/components/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/components/redux/store";
import LocationIcon from "@/icons/locationIcon";
import NotificationIcon from "@/icons/notificationIcon";
const FarmImage = "/assets/images/farm.png";
const TomatoesFarmImage = "/assets/images/Tomatoes.avif";
const NFTFarmImage = "/assets/images/NFT.jpg";



import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const currentDate = moment().format("dddd, DD MMMM YYYY");
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile() as any);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
    const router = useRouter();
  
  const onClickFarm = () => {
    router.push("/watch-list");
  }


  return (
    <div>
      <div className="bg-white relative min-h-[calc(100vh-0px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="bg-primary pt-5 px-5 pb-[120px] rounded-b-[30px]">
          <div className="flex items-center justify-between pb-7">
            <div>
              <h2 className="text-white text-[22px] font-semibold mb-1">
                Hello, <span className="text-green">{user?.userName}</span>
              </h2>
              <p className="text-white opacity-[.55] text-xs font-medium">
                {currentDate}
              </p>
            </div>
            <div className="w-11 h-11 bg-white flex items-center justify-center rounded-full">
              <NotificationIcon />
            </div>
          </div>
          <Searchbar />
          <div className="pt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-white">Your Farms</p>
            <p className="text-sm font-medium text-white">
              <span className="text-green">3</span> Container
            </p>
          </div>
        </div>
        <div className="mt-[-100px] px-5">
          {/* {[...Array(10)].map(() => {
            return ( */}
            
          <div className="bg-white shadow-lg p-4 rounded-xl mb-[18px] cursor-pointer" onClick={onClickFarm}>
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

          <div className="bg-white shadow-lg p-4 rounded-xl mb-[18px] cursor-pointer" onClick={onClickFarm}>
            <img
              src={TomatoesFarmImage}
              alt="FarmImage"
              className="block w-full h-[120px] rounded-lg object-cover"
            />
            <div className="flex items-center justify-between pt-4 " >
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

          <div className="bg-white shadow-lg p-4 rounded-xl mb-[18px] cursor-pointer" onClick={onClickFarm}>
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
          </div>
          {/* );
          })} */}
        </div>
      </div>
    </div>
  );
}
