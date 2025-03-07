"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/common/button";
import Input from "@/components/common/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUserProfile, updateUserProfile } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileSchema } from "../utils/validations/authValidation";

const EditIcon = "/assets/icons/edit.svg";

interface ProfileFormData {
  userName: string;
  email: string;
}
export default function UpdateProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  // Use react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(updateProfileSchema), // Connect Yup validation
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Set form default values when user data is available
  useEffect(() => {
    if (user) {
      setValue("userName", user.userName || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  if (loading) return <p>Loading...</p>;

  // Handle form submission
  const onSubmit = async (data: ProfileFormData) => {

    dispatch(updateUserProfile({ id: user.id, ...data }))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="pt-3 px-5">
      <div className="w-[100px] relative h-[100px] mx-auto">
        <img
          className="w-full h-full rounded-full block object-cover"
          src={
            user?.profileImage ||
            "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
          }
          alt="Profile"
        />
        <div className="absolute bottom-0 right-0">
          <img
            src={EditIcon}
            alt="EditIcon"
            className="block cursor-pointer max-w-7"
          />
        </div>
      </div>
      <div className="pt-2.5 pb-[30px]">
        <h2 className="text-base font-semibold text-black200 text-center">
          {user?.userName || "User Name"}
        </h2>
        <p className="text-[10px] leading-4 text-gray600 block text-center">
          {user?.email || "user@example.com"}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            inputClass="bg-[#FAFAFA]"
            label="Name"
            placeholder="Enter your name"
            {...register("userName", {
              onChange: (e) =>
                setValue("userName", e.target.value.trim().toLowerCase()),
            })}
            error={errors.userName?.message}
          />
          <div className="py-5">
            <Input
              inputClass="bg-[#FAFAFA]"
              label="Email"
              placeholder="Enter your email"
              {...register("email", {
                onChange: (e) =>
                  setValue("email", e.target.value.trim().toLowerCase()),
              })}
              error={errors.email?.message} // Pass the error for email
            />
          </div>
        </div>
        <div>
          <Button green text="Save Changes" type="submit" />
        </div>
      </form>
    </div>
  );
}
