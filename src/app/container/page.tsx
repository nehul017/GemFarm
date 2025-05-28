"use client"; // 👈 Add this at the top

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Footer from "@/components/layout/footer";
import withAuth from "../withAuth";
import { fetchContainers } from "@/redux/slices/containerSlice";
import Header from "@/components/layout/header";
import { useRef } from "react";
import AllContainer from "@/components/sections/allContainer";
import { setCrops } from "@/redux/slices/cropsSlice";
import { cropLists } from "@/data/crops";
import Button from "@/components/common/button";

const ContainerIcon = "/assets/icons/Container.svg";
const ContainerImage = "/assets/images/container.png";

function page() {
  const hasFetched = useRef(false);
  const router = useRouter();

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
    dispatch(setCrops(cropLists));
  }, []);

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

  return (
    <div>
      <Header
        header={farm.name}
        isNotificationIcon={true}
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
              <>
                <AllContainer data={data} />
              </>
            ) : (
              <div className="mt-9 pb-[90px]">
                <div className="px-3 py-4 rounded-xl">
                  <img src={ContainerIcon} alt="ContainerIcon" />
                  <div className="mt-9 text-center font-montserrat font-semibold text-[16px] leading-[100%] tracking-[0px] text-[#0A3732]">
                    You haven’t added any containers yet. Let’s create one!
                  </div>
                  <Button
                    buttonClass="mt-3 w-15 h-10 bg-primary flex items-center justify-center rounded-full"
                    text="Add Container"
                    green
                    onClick={() => router.push("/add-container-details")}
                  ></Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default withAuth(page);
