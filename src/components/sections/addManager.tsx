"use client";

import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/button";
import { useForm } from "react-hook-form";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { managerValidationSchema } from "../utils/validations/managerValidation";
import CustomMultiSearchSelect, {
  OptionType,
} from "../common/CustomSelectSearch/MultiSelectOption";
import { fetchFarms } from "@/redux/slices/farmSlice";
import { createManager } from "@/redux/slices/managerSlice";
import { useRouter } from "next/navigation";

export default function AddManager() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [farmOptions, setFarmOptions] = useState<OptionType[]>([]);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(managerValidationSchema), // Connect Yup validation
    defaultValues: {
      name: "",
      email: "",
      farmIds: [], // 👈 array
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchFarms());
        const { data } = response.payload as { data: any[] };

        const options = data.map((farm) => ({
          label: farm.name,
          value: farm.id,
        }));

        setFarmOptions(options);
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddManager = async (data: any) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        farmIds: data.farmIds, // 🔁 Match API keys
      };

      const response = await dispatch(createManager(payload));

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/add-managers-details"); // ✅ Redirect after success
      } else {
        console.error("Failed to create manager");
      }
    } catch (error) {
      console.error("Error while creating manager:", error);
    }
  };

  return (
    <div className="px-5 py-7">
      <form onSubmit={handleSubmit(handleAddManager)}>
        <div className="grid grid-cols-1 gap-[18px] pb-[30px]">
          <Input
            label="Name"
            placeholder="Enter your name"
            value={watch("name")}
            {...register("name", {
              onChange: (e) => setValue("name", e.target.value),
            })}
            error={errors.name?.message} // Pass the error for username
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={watch("email")}
            {...register("email", {
              onChange: (e) => setValue("email", e.target.value),
            })}
            error={errors.email?.message} // Pass the error for username
          />
          <CustomMultiSearchSelect
            label="Assign Farm"
            options={farmOptions}
            placeholder="Select farm(s)"
            isSearchable={true}
            value={farmOptions.filter((farm) =>
              watch("farmIds")?.includes(farm.value)
            )}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map((opt) => opt.value);
              setValue("farmIds", selectedValues);
            }}
          />
          {errors.farmIds && (
            <p className="text-red-500 text-sm mt-1">
              {errors.farmIds.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            buttonClass="!p-3"
            onClick={() => {
              router.back();
            }}
          >
            Cancle
          </Button>
          <Button buttonClass="!p-3" green type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
