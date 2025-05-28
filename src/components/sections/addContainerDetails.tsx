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
import { cropLists } from "@/data/crops";

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

const cropOptions: OptionType[] = cropLists
  .map((crop) => crop.name)
  .filter((value, index, self) => self.indexOf(value) === index) // unique
  .map((name) => ({ label: name, value: name }));

export default function AddContainerDetails() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = React.useState<string>("");
  const [cropName, setCropName] = useState("");
  const [cropCategory, setCropCategory] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [autoGrowId, setAutoGrowId] = useState("");
  const [containerCrop, setContainerCrop] = useState("");
  const [harvestDate, setHarvestDate] = useState<Date | null>(null);
  const [harvestSystem, setHarvestSystem] = useState("NFT");
  const [categoryOptions, setCategoryOptions] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [varietyOptions, setVarietyOptions] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [containerSize, setContainerSize] = useState("");
  const [numPlantSites, setNumPlantSites] = useState<number | "">("");
  const [plantingDate, setPlantingDate] = useState<Date | null>(null);
  const [timeToFirstHarvest, setTimeToFirstHarvest] = useState<Date | null>(null);
  const [harvestFrequency, setHarvestFrequency] = useState("");
  const [errors, setErrors] = useState({
    containerName: "",
    cropCategory: "",
    cropVariety: "",
    autoGrowId: "",
    // blueLabId: "",
    // containerStatus: "",
    containerCrop: "",
    harvestSystem: "",
    // harvestDate: "",
    image: "",
    containerSize: "",
    numPlantSites: "",
    plantingDate: "",
    timeToFirstHarvest: "",
    harvestFrequency: "",
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
      // containerStatus: containerStatus ? "" : "Container status is required",
      containerCrop: containerCrop ? "" : "Container crop is required",
      harvestSystem: harvestSystem ? "" : "Harvest system is required",
      // harvestDate: harvestDate ? "" : "Harvest date is required",
      image: image ? "" : "Cover photo is required",
      containerSize: containerSize ? "" : "Container size is required",
      numPlantSites:
        numPlantSites && numPlantSites > 0
          ? ""
          : "Number of plant sites is required and must be greater than 0",
      plantingDate: plantingDate ? "" : "Planting date is required",
      timeToFirstHarvest: timeToFirstHarvest
        ? ""
        : "Time to first harvest is required",
      harvestFrequency: harvestFrequency ? "" : "Harvest frequency is required",
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
      // container_status: containerStatus.trim(),
      harvest_system: harvestSystem.trim(),
      harvest_date: harvestDate,
      container_image: image,
      container_size: containerSize.trim(),
      num_plant_sites: numPlantSites,
      planting_date: plantingDate,
      time_to_first_harvest: timeToFirstHarvest,
      harvest_frequency: harvestFrequency.trim(),
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

  const handleCropChange = (selected: any) => {
    setContainerCrop(selected.value);

    if (selected) {
      // Filter cropLists for the selected crop
      const filtered = cropLists.filter((crop) => crop.name === selected.value);

      // Extract unique categories & varieties from filtered results
      const categories = [
        ...new Set(filtered.map((crop) => crop.category)),
      ].map((cat) => ({
        label: cat,
        value: cat,
      }));

      const varieties = [...new Set(filtered.map((crop) => crop.variety))].map(
        (variety) => ({
          label: variety,
          value: variety,
        })
      );

      setCategoryOptions(categories);
      setVarietyOptions(varieties);

      // Reset selections on new crop select
      setCropCategory("");
      setCropVariety("");
    } else {
      setCategoryOptions([]);
      setVarietyOptions([]);
      setCropCategory("");
      setCropVariety("");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <Header
        header="Create Container"
        isNotificationIcon={true}
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

            <CustomSearchSelect
              label="Container Crop"
              options={cropOptions}
              value={
                containerCrop
                  ? cropOptions.find((opt) => opt.value === containerCrop) ||
                    null
                  : null
              }
              onChange={(selected) => {
                setContainerCrop(selected?.value || "");
                handleCropChange(selected);
                errors.containerCrop = "";
              }}
              placeholder="Select container crop"
              required
              error={errors.containerCrop}
            />

            <CustomSearchSelect
              label="Crop Category"
              options={categoryOptions}
              value={
                cropCategory
                  ? categoryOptions.find((opt) => opt.value === cropCategory) ||
                    null
                  : null
              }
              onChange={(selected) => {
                setCropCategory(selected?.value || "");
                errors.cropCategory = "";
              }}
              placeholder="Select crop category"
              required
              error={errors.cropCategory}
            />

            <CustomSearchSelect
              label="Crop Variety"
              options={varietyOptions}
              value={
                cropVariety
                  ? varietyOptions.find((opt) => opt.value === cropVariety) ||
                    null
                  : null
              }
              onChange={(selected) => {
                setCropVariety(selected?.value || "");
                errors.cropVariety = "";
              }}
              placeholder="Select crop variety"
              required
              error={errors.cropVariety}
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
              error={errors.harvestSystem}
            />
            {/* <CustomDatePicker
              label="Harvest Date"
              selectedDate={harvestDate}
              onChange={(date) => {
                setHarvestDate(date);
                errors.harvestDate = "";
              }}
              placeholder="Select harvest date"
              error={errors.harvestDate}
              required
            /> */}
            <Input
              label="Size of Container"
              placeholder="Enter size of container"
              inputClass="bg-bglight"
              value={containerSize}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContainerSize(e.target.value);
                errors.containerSize = "";
              }}
              error={errors.containerSize}
              required
            />

            <Input
              label="Number of Plant Sites"
              placeholder="Enter number of plant sites"
              inputClass="bg-bglight"
              type="number"
              value={numPlantSites}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setNumPlantSites(value === "" ? "" : parseInt(value));
                errors.numPlantSites = "";
              }}
              error={errors.numPlantSites}
              required
            />

            <CustomDatePicker
              label="Planting Date"
              selectedDate={plantingDate}
              onChange={(date) => {
                setPlantingDate(date);
                errors.plantingDate = "";
              }}
              placeholder="Select planting date"
              error={errors.plantingDate}
              required
            />

            <CustomDatePicker
              label="Time to First Harvest"
              selectedDate={plantingDate}
              onChange={(date) => {
                setTimeToFirstHarvest(date);
                errors.timeToFirstHarvest = "";
              }}
              placeholder="Select First Harvest date"
              error={errors.timeToFirstHarvest}
              required
            />

            <Input
              label="Harvest Frequency"
              placeholder="Enter harvest frequency"
              inputClass="bg-bglight"
              value={harvestFrequency}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setHarvestFrequency(e.target.value);
                errors.harvestFrequency = "";
              }}
              error={errors.harvestFrequency}
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
            {/* <CustomSearchSelect
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
            )} */}

            <AddCoverPhoto
              setImageURL={setImage}
              error={errors.image}
              required
            />
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
