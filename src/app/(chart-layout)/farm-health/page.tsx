"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import ChartIcon from "@/icons/chartIcon";
import Co2Icon from "@/icons/co2Icon";
import NPKIcon from "@/icons/npkIcon";
import PHIcon from "@/icons/PHIcon";
import H2oIcon from "@/icons/H2OIcon";
import O2Icon from "@/icons/O2Icon";
import ECIcon from "@/icons/ECIcon";
import Header from "@/components/layout/header";
import Button from "@/components/common/button";
import { useRouter } from "next/navigation";
import SensorSettingCard from "@/components/sections/SensorSettingCard";

interface SensorSettings {
  id: string;
  name: string;
  icon: string;
  currentValue: number;
  requiredValue: number;
  minValue: number;
  maxValue: number;
  unit: string;
  color: string;
}

export default function Page() {
  const [sensors, setSensors] = useState<SensorSettings[]>([
    {
      id: "co2",
      name: "CO2",
      icon: "🌬️",
      currentValue: 346.56,
      requiredValue: 400,
      minValue: 300,
      maxValue: 500,
      unit: "ppm",
      color: "text-blue-500",
    },
    {
      id: "npk",
      name: "NPK",
      icon: "🌱",
      currentValue: 14.6,
      requiredValue: 15,
      minValue: 10,
      maxValue: 20,
      unit: "ppm",
      color: "text-green-500",
    },
    {
      id: "ph",
      name: "PH",
      icon: "💧",
      currentValue: 7.66,
      requiredValue: 6.5,
      minValue: 6.0,
      maxValue: 7.5,
      unit: "ph",
      color: "text-purple-500",
    },
    {
      id: "ec",
      name: "EC",
      icon: "⚡",
      currentValue: 2.26,
      requiredValue: 2.0,
      minValue: 1.5,
      maxValue: 2.5,
      unit: "mS/cm",
      color: "text-yellow-500",
    },
    {
      id: "o2",
      name: "O2",
      icon: "💨",
      currentValue: 10.09,
      requiredValue: 8,
      minValue: 6,
      maxValue: 12,
      unit: "mg/L",
      color: "text-cyan-500",
    },
    {
      id: "h2o",
      name: "H2O",
      icon: "💧",
      currentValue: 63.09,
      requiredValue: 65,
      minValue: 60,
      maxValue: 80,
      unit: "%",
      color: "text-blue-400",
    },
  ]);

  const router = useRouter();
  const [initialLoad, setInitialLoad] = useState(true);
  const [data, setData] = useState<Record<string, any>>({});
  const [container, setContainer] = useState<any | null>({});
  const [farmData, setFarmData] = useState<Record<string, any>>({});
  const [containerData, setContainerData] = useState<Record<string, any>>({});
  const [showSensorModal, setShowSensorModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<SensorSettings | null>(
    null
  );

  useEffect(() => {
    const farmId = localStorage.getItem("isFarm");
    if (farmId === "false") {
      setContainerData(JSON.parse(localStorage.getItem("container") || "{}"));
    }
    setFarmData(JSON.parse(localStorage.getItem("farm") || "{}"));
  }, []);

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

  useEffect(() => {
    if (showSensorModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSensorModal]);

  const currentDate = moment(
    containerData.harvest_date || containerData.planting_date
  ).format("MMM DD, YYYY");

  const updateSensorSetting = (
    sensorId: string,
    field: keyof SensorSettings,
    value: number
  ) => {
    setSensors((prev) =>
      prev.map((sensor) =>
        sensor.id === sensorId ? { ...sensor, [field]: value } : sensor
      )
    );
  };

  const handleChangeSensorSettings = () => {
    router.push("/sensor-settings");
  };

  const handleSensorClick = (sensorName: string) => {
    console.log(sensorName);
    console.log("sensorName", sensorName);
    setShowSensorModal(true);
    setSelectedSensor(
      sensors.find(
        (sensor) => sensor.id.toLowerCase() === sensorName.toLowerCase()
      ) || null
    );
  };

  const handleSaveSettings = () => {
    console.log("Saved sensor settings:", sensors);
    toast.success("Sensor settings saved successfully!");

    // Redirect to the farm health page
    setTimeout(() => {
      router.push("/farm-health");
    }, 1000);
    // Here you can add the logic to save the settings to your backend or state management
  };

  return initialLoad ? (
    <div className="flex justify-center items-center h-dvh">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  ) : (
    <>
      <ToastContainer position="top-right" autoClose={500} />
      <Header
        header="Container Health"
        isNotificationIcon={true}
        isOnlyBackButton={true}
        isWhite={true}
      />
      <div className="bg-white relative min-h-[calc(100dvh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-4 pb-10 px-5">
          <div className="card-background border border-solid border-borderColor2 p-3 rounded-lg">
            <h2 className="text-[30px] leading-7 text-green uppercase font-bold mb-1 ">
              HEALTHY
            </h2>
            <p className="text-base font-bold text-black mb-1">
              {containerData.name || containerData.container_crop},{" "}
              {farmData.location}
            </p>
            <p className="text-sm text-balance font-medium">
              Harvest Date : <span className="text-xs">{currentDate}</span>
            </p>
          </div>
          <div className="pt-5">
            <Button
              text="Edit System"
              green
              onClick={handleChangeSensorSettings}
            />
          </div>

          {/* Sensor Data List */}
          <div className="pt-5">
            {[
              {
                name: "CO2",
                icon: <Co2Icon />,
                value: data
                  ? data?.co2 + " ppm" || "N/A"
                  : (Math.random() * (450 - 300) + 300).toFixed(2) + " ppm",
              },
              {
                name: "NPK",
                icon: <NPKIcon />,
                value: data
                  ? data?.npk + " ppm" || "N/A"
                  : (Math.random() * (7 - 15) + 20).toFixed(2) + " ppm",
              },
              {
                name: "PH",
                icon: <PHIcon />,
                value: data
                  ? data?.ph + " ph" || "N/A"
                  : (Math.random() * (5 - 7) + 8).toFixed(2) + " ph",
              },
              {
                name: "EC",
                icon: <ECIcon />,
                value: data
                  ? data?.ec + " mS/cm" || "N/A"
                  : (Math.random() * (1 - 2) + 3).toFixed(2) + " mS/cm",
              },
              {
                name: "O2",
                icon: <O2Icon />,
                value: data
                  ? data?.o2 + " mg/L" || "N/A"
                  : (Math.random() * (5 - 10) + 15).toFixed(2) + " mg/L",
              },
              {
                name: "H2O",
                icon: <H2oIcon />,
                value: data
                  ? data?.h2o + " %" || "N/A"
                  : (Math.random() * (50 - 60) + 70).toFixed(2) + " %",
              },
            ].map((sensor, index) => (
              <div
                key={index}
                className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] py-2.5 px-3 flex items-center justify-between"
                onClick={() => handleSensorClick(sensor.name)}
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
        {showSensorModal && selectedSensor && (
          <div
            className="fixed inset-0 flex items-center sm:items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm px-5"
            onClick={() => setShowSensorModal(false)}
          >
            <div className="bg-white rounded-3xl sm:rounded-3xl w-full sm:w-96 max-w-md animate-in slide-in-from-bottom duration-300 sm:animate-in sm:zoom-in-95">
              <SensorSettingCard
                key={selectedSensor.id}
                sensor={selectedSensor}
                onUpdate={updateSensorSetting}
                onSave={handleSaveSettings}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
