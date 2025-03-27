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
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Whoops! It looks like your passwords didn't match!");
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
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="text-2xl font-semibold text-gray-900 mb-5">
        Set Your Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-3">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={watch("password")}
            icon={showPassword ? EyeIcon : CloseEyeIcon}
            onIconClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            {...register("password", {
              onChange: (e) =>
                setValue("password", e.target.value.replace(/\s/g, "")),
            })}
            error={errors.password?.message}
          />
        </div>
        <div className="pb-3">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter confirm password"
            value={watch("confirmPassword")}
            icon={showConfirmPassword ? EyeIcon : CloseEyeIcon}
            onIconClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle password visibility
            {...register("confirmPassword", {
              onChange: (e) =>
                setValue("confirmPassword", e.target.value.replace(/\s/g, "")),
            })}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="pt-[30px]">
          <Button
            green
            text="Set New Password"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                Setting New Password...
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Set New Password"
            )}
          </Button>
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
