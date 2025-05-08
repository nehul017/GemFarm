"use client";

import React, { useState } from "react";
import Input from "../common/Input";
import AddCoverPhoto from "./addCoverPhoto";
import Button from "../common/button";
import Header from "../layout/header";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import CustomSearchSelect, {
  OptionType,
} from "../common/CustomSelectSearch/SelectOption";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "../common/CustomDatePicker";
import { createContainer } from "@/redux/slices/containerSlice";
import { toast, ToastContainer } from "react-toastify";

const containerStatusOptions: OptionType[] = [
  { value: "Idle", label: "Idle" },
  { value: "Active", label: "Active" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Harvested", label: "Harvested" },
];

const harvestSystemOptions: OptionType[] = [
  { value: "NFT", label: "NFT" },
  { value: "Dutch Bucket", label: "Dutch Bucket" }, // corrected
];
export default function AddContainerDetails() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = React.useState<string>("");
  const [cropName, setCropName] = useState("");
  const [cropCategory, setCropCategory] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [autoGrowId, setAutoGrowId] = useState("");
  const [blueLabId, setBlueLabId] = useState("");
  const [containerStatus, setContainerStatus] = useState("Active");
  const [containerCrop, setContainerCrop] = useState("");
  const [harvestDate, setHarvestDate] = useState<Date | null>(null);
  const [harvestSystem, setHarvestSystem] = useState("NFT");
  const [errors, setErrors] = useState({
    containerName: "",
    cropCategory: "",
    cropVariety: "",
    autoGrowId: "",
    // blueLabId: "",
    containerStatus: "",
    containerCrop: "",
    harvestSystem: "",
    harvestDate: "",
    image: "",
  });

  const { loading } = useSelector((state: RootState) => state.container);

  const { loading: imageLoader } = useSelector(
    (state: RootState) => state.upload
  );

  const handleSave = async () => {
    const farmId = localStorage.getItem("farmId") || undefined;
    const newErrors = {
      containerName: cropName ? "" : "Container name is required",
      cropCategory: cropCategory ? "" : "Crop category is required",
      cropVariety: cropVariety ? "" : "Crop variety is required",
      autoGrowId: autoGrowId ? "" : "Auto Grow Device ID is required",
      // blueLabId: blueLabId ? "" : "Blue Lab Device ID is required",
      containerStatus: containerStatus ? "" : "Container status is required",
      containerCrop: containerCrop ? "" : "Container crop is required",
      harvestSystem: harvestSystem ? "" : "Harvest system is required",
      harvestDate: harvestDate ? "" : "Harvest date is required",
      image: image ? "" : "Cover photo is required",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) return;

    const data = {
      farm_id: farmId,
      container_name: cropName.trim(),
      container_crop: containerCrop.trim(),
      crop_variety: cropVariety.trim(),
      crop_category: cropCategory.trim(),
      auto_grow_device_id: autoGrowId.trim(),
      // blue_lab_device_id: blueLabId.trim(),
      container_status: containerStatus.trim(),
      harvest_system: harvestSystem.trim(),
      harvest_date: harvestDate,
      container_image: image,
    };

    try {
      const result = await dispatch(createContainer(data));
      if (createContainer.fulfilled.match(result)) {
        toast.success("Container created successfully");
        setTimeout(() => {
          router.push("/home");
        }, 600);
      } else {
        toast.error("Failed to create farm: " + (result.payload as string));
      }
    } catch (err: any) {
      alert("Failed to create container: " + err.message);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <Header
        header="Create Container"
        isNotificationIcon={false}
        isOnlyBackButton={true}
        isWhite={true}
      />

      <div className="bg-white relative min-h-[calc(100dvh-52px)] overflow-auto md:max-w-[375px] md:mx-auto mb-1">
        <div className="pt-3 px-5 pb-5">
          <div className="grid grid-cols-1 gap-[18px] pb-[30px]">
            <Input
              label="Container Name"
              placeholder="Enter your Container name"
              inputClass="bg-bglight"
              value={cropName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCropName(e.target.value);
                errors.containerName = "";
              }}
              error={errors.containerName}
              required

            />
            <Input
              label="Container Crop"
              placeholder="Enter container crop name"
              inputClass="bg-bglight"
              value={containerCrop}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContainerCrop(e.target.value);
                errors.containerCrop = "";
              }}
              error={errors.containerCrop}
              required

            />
            <Input
              label="Crop Category"
              placeholder="Enter your crop category"
              inputClass="bg-bglight"
              value={cropCategory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCropCategory(e.target.value);
                errors.cropCategory = "";
              }}
              error={errors.cropCategory}
              required

            />
            <Input
              label="Crop Variety"
              placeholder="Enter your crop variety"
              inputClass="bg-bglight"
              value={cropVariety}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCropVariety(e.target.value);
                errors.cropVariety = "";
              }}
              error={errors.cropVariety}
              required

            />
            <CustomSearchSelect
              label="Harvest System"
              options={harvestSystemOptions}
              value={
                harvestSystem
                  ? harvestSystemOptions.find(
                      (opt) => opt.value === harvestSystem
                    ) || null
                  : null
              }
              onChange={(selected) => {
                setHarvestSystem(selected?.value || "");
                errors.harvestSystem = "";
              }}
              placeholder="Select harvest system"
              required
            />
            {errors.harvestSystem && (
              <p className="text-xs text-red-600">{errors.harvestSystem}</p>
            )}
            <CustomDatePicker
              label="Harvest Date"
              selectedDate={harvestDate}
              onChange={(date) => {
                setHarvestDate(date);
                errors.harvestDate = "";
              }}
              placeholder="Select harvest date"
              error={errors.harvestDate}
              required
            />
            <Input
              label="Auto Grow DeviceId"
              placeholder="Enter auto grow deviceId"
              inputClass="bg-bglight"
              value={autoGrowId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAutoGrowId(e.target.value);
                errors.autoGrowId = "";
              }}
              error={errors.autoGrowId}
              required

            />
            {/* <Input
              label="Blue Lab DeviceId"
              placeholder="Enter blue lab deviceId"
              inputClass="bg-bglight"
              value={blueLabId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBlueLabId(e.target.value);
                errors.blueLabId = "";
              }}
              error={errors.blueLabId}
              required

            /> */}
            <CustomSearchSelect
              label="Container Status"
              options={containerStatusOptions}
              value={
                containerStatus
                  ? containerStatusOptions.find(
                      (opt) => opt.value === containerStatus
                    ) || null
                  : null
              }
              onChange={(selected) => {
                setContainerStatus(selected?.value || "");
                errors.containerStatus = "";
              }}
              placeholder="Select container status"
              required
            />
            {errors.containerStatus && (
              <p className="text-red-500 text-sm mt-1">
                {errors.containerStatus}
              </p>
            )}

            <AddCoverPhoto setImageURL={setImage} error={errors.image} required />
          </div>
        </div>
      </div>
      <div className="sticky px-5 py-2 bottom-0 left-0 bg-white">
        <Button
          green
          text={loading ? "Creating..." : "Save"}
          onClick={handleSave}
          disabled={loading || imageLoader}
        />
      </div>
    </div>
  );
}
