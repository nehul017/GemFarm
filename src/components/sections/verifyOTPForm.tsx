"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from "../redux/store";
import { forgotPassword, verifyOTP } from "../redux/slices/authSlice";
import { OTPVerificationFormSchema } from "../utils/validations/authValidation";
import { InputOTP, InputOTPSlot } from "../common/input-otp";
import Button from "../common/button";

export default function VerifyOTPForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [email, setEmail] = useState<string | null>(null); // Store email safely

  // Load email from sessionStorage on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(sessionStorage.getItem("email") || null);
    }
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const maskEmail = (email: string | null) => {
    if (!email) return ""; // Handle null or empty string safely
    const [localPart, domain] = email.split("@");
    if (!domain || localPart.length <= 2) return email;
    return `${localPart.slice(0, 2)}******${localPart.slice(-2)}@${domain}`;
  };

  const startTimer = () => {
    setCanResend(false);
    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as unknown as number | undefined);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    if (!canResend || !email) return;
    try {
      const resultAction = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(resultAction)) {
        toast.success("OTP sent successfully! Check your email.");
      } else {
        const errorMessage = resultAction.payload || "Something went wrong!";
        toast.error(errorMessage as string);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    startTimer();
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OTPVerificationFormSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      if (!email) {
        toast.error("Email not found. Please restart the process.");
        return;
      }
      data.email = email;
      const resultAction = await dispatch(verifyOTP(data));

      if (verifyOTP.fulfilled.match(resultAction)) {
        toast.success("OTP verified successfully!");
        router.push("/reset-password");
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
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        OTP Verification
      </h2>
      <p className="text-[13px] text-gray-600 mb-8">
        Enter OTP Code sent to {maskEmail(email)}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputOTP
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setValue("otp", value, { shouldValidate: true });
            }}
            maxLength={6}
            render={({ slots }) => (
              <div className="flex gap-2 justify-center">
                {slots.map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </div>
            )}
          />

          {errors.otp && (
            <p className="text-red-500 text-sm mt-[10px] mb-2">
              {errors.otp.message}
            </p>
          )}

          <div className="text-center mb-2 mt-5">
            <p className="text-gray-600 mb-2 mt-3">
              Don&apos;t receive OTP code?
            </p>
            <button
              type="button"
              onClick={handleResendCode}
              className={`text-[#004D40] font-medium ${
                !canResend
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-[#00352C]"
              }`}
              disabled={!canResend}
            >
              {canResend ? "Resend Code" : `Resend code in ${timer}s`}
            </button>
          </div>
          <Button green text=" Verify OTP" type="submit" disabled={loading} />
        </div>
      </form>
      <div className="mt-6 text-center">
        <span className="text-gray-600">Back to </span>
        <Link href="/signin" className="text-green font-semibold cursor-pointer">
          Sign In
        </Link>
      </div>
    </div>
  );
}
