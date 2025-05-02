"use client"; // 👈 Add this at the top

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommodityData, fetchUserProfile } from "@/redux/slices/authSlice";
const ContainerIcon = "/assets/icons/Container.svg";

import { AppDispatch, RootState } from "@/redux/store";
import LocationIcon from "@/icons/locationIcon";
import Footer from "@/components/layout/footer";
import withAuth from "../withAuth";
import { fetchContainers } from "@/redux/slices/containerSlice";
import Header from "@/components/layout/header";
import { useRef } from "react";
import LeftIcon from "@/icons/leftIcon";
import SearchIcon from "@/icons/SearchIcon";
import AllContainer from "@/components/sections/allContainer";
import Button from "@/components/common/button";
import { Plus } from "lucide-react";
const ContainerImage = "/assets/images/container.png";

function page() {
  const hasFetched = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [initialLoad, setInitialLoad] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [farm, setFarm] = useState<any>({});

  useEffect(() => {
    setInitialLoad(true);
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, []);
  useRouter;

  useEffect(() => {
    const fetchData = async () => {
      const farmId = localStorage.getItem("farmId");
      try {
        const response = await dispatch(fetchContainers(farmId as string));
        const { data: containerData } = response.payload as { data: any[] };
        setData(containerData);
        setInitialLoad(false);
        setFarm(JSON.parse(localStorage.getItem("farm") || "{}"));
      } catch (error) {
        console.error("API request error:", error);
        setInitialLoad(false);
      } finally {
        setInitialLoad(false);
      }
    };
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, []);

  const router = useRouter();

  const onClickFarm = (container: any) => {
    localStorage.setItem("container", JSON.stringify(container));
    router.push("/watch-list");
  };

  const prices = ["18.20", "12.10", "12.20", "15.55", "22.53", "16.20"];

  return (
    <div>
      <Header
        header={farm.name}
        isNotificationIcon={false}
        isOnlyBackButton={true}
        isWhite={true}
        isShowProfile={loading || initialLoad ? false : true}
      />

      <div className="bg-white relative min-h-[calc(100dvh-0px)] overflow-auto md:max-w-[375px] md:mx-auto">
        {loading || initialLoad ? (
          <div className="flex justify-center items-center h-dvh">
            <div className="relative bottom-[150px] w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="px-5 pt-3">
            <div className="h-[160px]">
              <img
                src={farm.farm_image || ContainerImage}
                className="w-full h-full block rounded-xl object-cover"
                alt="ContainerImage"
              />
            </div>
            {data.length > 0 ? (
              <AllContainer data={data} />
            ) : (
              <div className="mt-9 pb-[90px]">
                <div className="px-3 py-4 rounded-xl">
                  <img src={ContainerIcon} alt="ContainerIcon" />
                  <div className="mt-9 text-center font-montserrat font-semibold text-[16px] leading-[100%] tracking-[0px] text-[#0A3732]">
                    You haven’t added any containers yet. Let’s create one!
                  </div>
                </div>
              </div>
            )}
            <div
              className="fixed z-[999] right-4 bottom-24 bg-primary flex items-center justify-center text-white rounded-full w-10 h-10"
              onClick={() => router.push("/add-container-details")}
            >
              <Plus className="h-4 w-4" />
            </div>
          </div>
        )}
        {/*
        <div className="bg-primary px-5 pb-[120px] rounded-b-[30px]">
          <div className="pt-2 flex items-center justify-between">
            <p className="text-sm font-medium text-white">Your Containers</p>
            <p className="text-sm font-medium text-white">
              <span className="text-green">{data.length}</span> Container
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
                className="bg-white p-4 rounded-xl mb-[18px] cursor-pointer shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px]"
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
                      {item.farm.name} | {item.container_crop}
                    </p>
                    <div className="flex items-center gap-1">
                      <LocationIcon />
                      <span className="block text-sm text-black opacity-[.4]">
                        {item.farm.location}
                      </span>
                    </div>
                  </div>
                  <button className="py-2 px-3 text-sm font-semibold text-green rounded-[4px] bg-[#E6F4EE] cursor-pointer border-none">
                    ${prices[index] || 12}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
      <Footer />
    </div>
  );
}

export default withAuth(page);
