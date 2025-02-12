"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../components/redux/store";
import { resetPassword } from "../../components/redux/slices/authSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/button";
import { resetPasswordFormSchema } from "../utils/validations/authValidation";

const EyeIcon = "/assets/icons/eye-open.svg";
const CloseEyeIcon = "/assets/icons/eye-crossed.svg";

export default function ResetPasswordForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const resultAction = await dispatch(resetPassword(data));

      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset successful!");
        router.push("/signin");
      } else {
        console.log("resultAction.error?.message", resultAction.payload);
        const errorMessage = resultAction.payload || "Something went wrong!";
        toast.error(errorMessage as string);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="pt-[30px] px-5">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-[18px]">
          <Input
            label="OTP"
            placeholder="Enter your OTP"
            {...register("otp")}
            error={errors.otp?.message}
          />
        </div>
        <div className="pb-3">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={showPassword ? EyeIcon : CloseEyeIcon}
            onIconClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            {...register("password")}
            error={errors.password?.message}
          />
        </div>
        <div className="pt-[30px]">
          <Button green text="Send OTP" type="submit" />
        </div>
      </form>

      <div className="absolute bottom-5 w-full left-0">
        <div className="px-5">
          <p className="text-sm font-normal text-gray800 text-center">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-green font-semibold cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
