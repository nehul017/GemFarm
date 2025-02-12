"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../components/redux/store";
import { forgotPassword } from "../../components/redux/slices/authSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/button";
import { forgotPasswordFormSchema } from "../utils/validations/authValidation";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const resultAction = await dispatch(forgotPassword(data));

      if (forgotPassword.fulfilled.match(resultAction)) {
        toast.success("OTP sent successfully! Check your email.");
        router.push("/reset-password");
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
            label="Email ID"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
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
