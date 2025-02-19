"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from "../../components/redux/store";
import { resetPassword } from "../../components/redux/slices/authSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/button";
import { resetPasswordFormSchema } from "../utils/validations/authValidation";

const EyeIcon = "/assets/icons/eye-open.svg";
const CloseEyeIcon = "/assets/icons/eye-crossed.svg";

export default function ResetPasswordForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      data.email = sessionStorage.getItem("email");
      const resultAction = await dispatch(resetPassword(data));

      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset successful!");
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
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
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Set Your Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="pb-3">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={showConfirmPassword ? EyeIcon : CloseEyeIcon}
            onIconClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle password visibility
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="pt-[30px]">
          <Button
            green
            text="Set New Password"
            type="submit"
            disabled={loading}
          />
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
