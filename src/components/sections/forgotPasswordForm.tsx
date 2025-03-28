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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const resultAction = await dispatch(forgotPassword(data));

      if (forgotPassword.fulfilled.match(resultAction)) {
        // sessionStorage.setItem("email", data.email);
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
      <h2 className="text-2xl font-semibold text-gray-900 mb-5">
        Reset Your Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-[18px]">
          <Input
            label="Email ID"
            placeholder="Enter your email"
            {...register("email", {
              onChange: (e) =>
                setValue("email", e.target.value.trim().toLowerCase()),
            })}
            error={errors.email?.message}
          />
        </div>
        <div className="pt-[30px]">
          <Button green text="Continue" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center">
                Sending OTP...
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
              "Continue"
            )}
          </Button>
        </div>
        <div className="absolute bottom-5 w-full left-0">
          <div className="px-5">
            <p className="text-sm font-normal text-gray800 text-center">
              Back to{" "}
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
