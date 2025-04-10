"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { AppDispatch, RootState } from "../../components/redux/store";
import { loginUser } from "../../components/redux/slices/authSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/button";
import { loginSchema } from "../utils/validations/authValidation";
import { toast, ToastContainer } from "react-toastify";
const EyeIcon = "/assets/icons/eye-open.svg";
const CloseEyeIcon = "/assets/icons/eye-crossed.svg";
const SECRET_KEY = "gemFarmSecret";

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
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), // Connect Yup validation
  });
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const error = searchParams.get("error");
      if (error === "session_expired") {
        Cookies.remove("authToken");
        Cookies.remove("user");
        setErrorMessage("⚠️ Session expired. Please log in again.");
      } else if (error === "session_invalid") {
        Cookies.remove("authToken");
        Cookies.remove("user");
        setErrorMessage(
          "Unauthorized session. Please login again to continue."
        );
      } else if (error === "logged_out") {
        Cookies.remove("authToken");
        Cookies.remove("user");
        setErrorMessage("✅ Logged out successfully.");
      }
      // Remove the error query param from the URL
      const params = new URLSearchParams(window.location.search);
      params.delete("error");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);
  // Load saved email from sessionStorage
  useEffect(() => {
    const encryptedCredentials = Cookies.get("rememberedCredentials");
    if (encryptedCredentials) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedCredentials, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        setValue("email", decryptedData.email);
        setValue("password", decryptedData.password);
        setRememberMe(true);
      } catch (error) {
        console.error("Error decrypting credentials:", error);
      }
    }
  }, [setValue]);

  const onSubmit = async (data: any) => {
    if (rememberMe) {
      sessionStorage.setItem("rememberedEmail", data.email);
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify({ email: data.email, password: data.password }),
        SECRET_KEY
      ).toString();
      Cookies.set("rememberedCredentials", encryptedData, { expires: 7 });
    } else {
      sessionStorage.removeItem("rememberedEmail");
      Cookies.remove("rememberedCredentials");
    }
    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");
        Cookies.set("authToken", resultAction.payload.token, { expires: 1 }); // Set for 7 days
        Cookies.set("user", JSON.stringify(resultAction.payload.user), {
          expires: 1,
        });
        router.push("/home");
        window.location.href = "/home";
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
            value={watch("email")}
            error={errors.email?.message} // Pass the error for email
          />
        </div>

        <div className="pb-3">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              className="accent-primary"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="text-xs text-gray800 font-medium relative top-[1px]">
              Remember Me
            </span>
          </div>
          <Link
            href={loading ? "#" : "/forgot-password"}
            className={`text-sm font-medium cursor-pointer ${
              loading ? "pointer-events-none text-gray-400" : "text-primary"
            }`}
          >
            Forgot Password?
          </Link>
        </div>

        <div className="pt-[30px] cursor-pointer">
          <Button green text="Sign In" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center">
                Sign In...
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
              "Sign In"
            )}
          </Button>
        </div>
      </form>

      <div className="absolute bottom-5 w-full left-0">
        <div className="px-5">
          <p className="text-sm font-normal text-gray800 text-center">
            Don’t have an account?{" "}
            <Link
              href={loading ? "#" : "/signup"}
              className={`text-green font-semibold cursor-pointer ${
                loading ? "pointer-events-none text-gray-400" : ""
              }`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
