"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch, RootState } from "../../components/redux/store";
import { loginUser } from "../../components/redux/slices/authSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/button";
import { loginSchema } from "../utils/validations/authValidation";
import { toast, ToastContainer } from "react-toastify";
const EyeIcon = "/assets/icons/eye-open.svg";
const CloseEyeIcon = "/assets/icons/eye-crossed.svg";

export default function SigninForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), // Connect Yup validation
  });

  // Load saved email from sessionStorage
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail); // Prefill email input
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data: any) => {
    if (rememberMe) {
      sessionStorage.setItem("rememberedEmail", data.email);
    } else {
      sessionStorage.removeItem("rememberedEmail");
    }
    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        sessionStorage.setItem("user", JSON.stringify(resultAction.payload.user));
        sessionStorage.setItem("authToken", resultAction.payload.token);

        router.push("/home");
      } else {
        const errorMessage = resultAction.payload || "Something went wrong!";
        toast.error(errorMessage as string);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="pt-[30px] px-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-[18px]">
          <Input
            label="Email ID"
            placeholder="Enter your email"
            {...register("email", {
              onChange: (e) =>
                setValue("email", e.target.value.trim().toLowerCase()),
            })}
            error={errors.email?.message} // Pass the error for email
          />
        </div>

        <div className="pb-3">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={showPassword ? EyeIcon : CloseEyeIcon}
            onIconClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            {...register("password", {
              onChange: (e) =>
                setValue("password", e.target.value.replace(/\s/g, "")),
            })}
            error={errors.password?.message}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <input type="checkbox" className="accent-primary" />
            <span className="text-xs text-gray800 font-medium relative top-[1px]">
              Remember Me
            </span>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-primary font-medium cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="pt-[30px]">
          <Button green text="Sign In" type="submit" disabled={loading} />
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
