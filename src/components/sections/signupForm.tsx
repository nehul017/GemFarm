"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch } from "../../components/redux/store";
import { signupUser } from "../../components/redux/slices/authSlice";
import Input from "../common/Input";
import Button from "../common/button";
import { signupSchema } from "../utils/validations/authValidation";
const EyeIcon = "/assets/icons/eye-open.svg";
const CloseEyeIcon = "/assets/icons/eye-crossed.svg";

export default function SignupForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema), // Connect Yup validation
  });

  const onSubmit = async (data: any) => {
    const resultAction = await dispatch(signupUser(data));
    if (signupUser.fulfilled.match(resultAction)) {
      localStorage.setItem("user", JSON.stringify(resultAction.payload.user));
      localStorage.setItem("authToken", resultAction.payload.token);
      router.push("/home");
    }
  };

  return (
      <div className="pt-[30px] px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-[18px]">
            <Input
              label="Name"
              placeholder="Enter your name"
              {...register("username")}
              error={errors.username?.message} // Pass the error for username
            />
          </div>
          <div className="pb-[18px]">
            <Input
              label="Email ID"
              placeholder="Enter your email"
              {...register("email")}
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
              {...register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className="pt-[30px]">
            <Button green text="Sign Up" type="submit" />
          </div>
          <div className="absolute bottom-5 w-full left-0">
            <div className="px-5">
              <p className="text-sm font-normal text-gray800 text-center">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-green font-semibold cursor-pointer"
                >
                  Sing in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
  );
}
