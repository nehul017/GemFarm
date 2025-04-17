"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ChartIcon from "@/icons/chartIcon";
import Co2Icon from "@/icons/co2Icon";
import NPKIcon from "@/icons/npkIcon";
import PHIcon from "@/icons/PHIcon";
import H2oIcon from "@/icons/H2OIcon";
import O2Icon from "@/icons/O2Icon";
import ECIcon from "@/icons/ECIcon";
import Header from "@/components/layout/header";

export default function Page() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [data, setData] = useState<Record<string, any>>({});
  const [container, setContainer] = useState<any | null>({});

  useEffect(() => {
    const fetchData = async () => {
      const containerItem = localStorage.getItem("container");
      const data = containerItem ? JSON.parse(containerItem) : null; // Replace with your actual container ID
      setContainer(data);
      try {
        const response = await axios.post(
          `https://gv5xt68i22.execute-api.us-east-1.amazonaws.com/dev/sensor-data?containerId=${
            data.id || container.id
          }`,
          { action: "GET", containerId: data.id || container.id },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          const { body } = response.data;
          setData(body[0]); // Store sensor data
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

  const currentDate = moment(container.harvest_date).format("MMM DD, YYYY");

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Header header="Farm Health" isNotificationIcon={false} />
      <div className="bg-white relative min-h-[calc(100dvh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-4 pb-10 px-5">
          <div className="card-background border border-solid border-borderColor2 p-3 rounded-lg">
            <h2 className="text-[30px] leading-7 text-green uppercase font-bold mb-1 ">
              HEALTHY
            </h2>
            <p className="text-base font-bold text-black mb-1">
              GemFarms {container.location}
            </p>
            <p className="text-sm text-balance font-medium">
              Harvest Date : <span className="text-xs">{currentDate}</span>
            </p>
          </div>

          {/* Sensor Data List */}
          <div className="pt-5">
            {[
              {
                name: "CO2",
                icon: <Co2Icon />,
                value: data?.co2 + " ppm" || "N/A",
              },
              {
                name: "NPK",
                icon: <NPKIcon />,
                value: data?.npk + " ppm" || "N/A",
              },
              {
                name: "PH",
                icon: <PHIcon />,
                value: data?.ph + " ph" || "N/A",
              },
              {
                name: "EC",
                icon: <ECIcon />,
                value: data?.ec + " mS/cm" || "N/A",
              },
              {
                name: "O2",
                icon: <O2Icon />,
                value: data?.o2 + " mg/L" || "N/A",
              },
              {
                name: "H2O",
                icon: <H2oIcon />,
                value: data?.h2o + " %" || "N/A",
              },
            ].map((sensor, index) => (
              <div
                key={index}
                className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-full min-w-11 bg-white flex items-center justify-center">
                    {sensor.icon}
                  </div>
                  <p className="text-sm font-medium text-black">
                    {sensor.name}
                  </p>
                </div>
                <ChartIcon />
                <p className="text-sm font-bold text-black">{sensor.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
