"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch, RootState } from "../../components/redux/store";
import { signupUser } from "../../components/redux/slices/authSlice";
import Input from "../common/Input";
import Button from "../common/button";
import { signupSchema } from "../utils/validations/authValidation";
import { toast, ToastContainer } from "react-toastify";
const EyeIcon = "/assets/icons/eye-open.svg";
const CloseEyeIcon = "/assets/icons/eye-crossed.svg";

export default function SignupForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema), // Connect Yup validation
  });

  const onSubmit = async (data: any) => {
    const trimmedData = {
      userName: data.userName.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };
    try {
      const resultAction = await dispatch(signupUser(trimmedData));
      if (signupUser.fulfilled.match(resultAction)) {
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
            label="Name"
            placeholder="Enter your name"
            {...register("userName", {
              onChange: (e) =>
                setValue("userName", e.target.value.trim().toLowerCase()),
            })}
            error={errors.userName?.message} // Pass the error for username
          />
        </div>
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
        <div className="pt-[30px]">
          <Button green text="Sign Up" type="submit" disabled={loading} />
        </div>
        <div className="absolute bottom-5 w-full left-0">
          <div className="px-5">
            <p className="text-sm font-normal text-gray800 text-center">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-green font-semibold cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
