"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from "../../components/redux/store";
import { forgotPassword } from "../../components/redux/slices/authSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/button";
import { forgotPasswordFormSchema } from "../utils/validations/authValidation";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

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
        sessionStorage.setItem("email", data.email);
        toast.success("OTP sent successfully! Check your email.");
        router.push("/verify-otp");
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
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Reset Your Password
      </h2>
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
          <Button green text="Continue" type="submit" disabled={loading} />
        </div>
      </form>
      <div className="mt-6 text-center">
        <span className="text-gray-600">Back to </span>
        <Link
          href="/signin"
          className="text-green font-semibold cursor-pointer"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
