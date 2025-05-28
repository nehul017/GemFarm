"use client";

import React, { useState } from "react";
import Input from "../common/Input";
import AddCoverPhoto from "./addCoverPhoto";
import Button from "../common/button";
import Header from "../layout/header";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createFarm } from "@/redux/slices/farmSlice";
import { toast, ToastContainer } from "react-toastify";

export default function AddFarmDetails() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    location: "",
    image: "",
  });

  const { loading } = useSelector((state: RootState) => state.farm);
  const { loading: imageLoader } = useSelector(
    (state: RootState) => state.upload
  );

  const validateForm = () => {
    const newErrors = {
      name: name.trim() === "" ? "Farm name is required" : "",
      location: location.trim() === "" ? "Location is required" : "",
      image: image ? "" : "Cover photo is required",
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.location && !newErrors.image;
  };

  const handleCreateFarm = async () => {
    if (!validateForm()) return;

    const data = {
      name: name.trim(),
      location: location.trim(),
      farmImage: image,
    };

    const result = await dispatch(createFarm(data));

    if (createFarm.fulfilled.match(result)) {
      toast.success("Farm created successfully");
      setImage("");
      setTimeout(() => {
        localStorage.setItem("farmId", result.payload.id);
        router.push("/add-container-details");
      }, 600);
    } else {
      toast.error("Failed to create farm: " + (result.payload as string));
    }
  };
  console.log("imageLoader", imageLoader);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header
        header="Create Farm"
        isNotificationIcon={true}
        isOnlyBackButton={true}
        isWhite={true}
      />
      <div className="bg-white relative min-h-[calc(100dvh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-3 px-5">
          <div className="grid grid-cols-1 gap-[18px] pb-[30px]">
            <Input
              label="Farm Name"
              placeholder="Enter your farm name"
              inputClass="bg-bglight"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
                errors.name = "";
              }}
              error={errors.name}
              required
            />
            <Input
              label="Location"
              placeholder="Enter your farm location"
              inputClass="bg-bglight"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLocation(e.target.value);
                errors.location = "";
              }}
              error={errors.location}
              required
            />
            <AddCoverPhoto
              setImageURL={setImage}
              error={errors.image}
              required
            />
          </div>
          <Button
            green
            text={loading ? "Creating..." : "Next"}
            onClick={handleCreateFarm}
            disabled={loading || imageLoader}
          />
        </div>
      </div>
    </div>
  );
}
