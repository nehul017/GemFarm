"use client";
import React, { useEffect } from "react";
import LeftIcon from "@/icons/leftIcon";
import NotificationIcon from "@/icons/notificationIcon";
import SearchIcon from "@/icons/SearchIcon";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUserProfile } from "../../redux/slices/authSlice";
import { usePathname } from "next/navigation"; // add this at top

interface HeaderProps {
  header?: string;
  isNotificationIcon?: boolean;
  isOnlyBackButton?: boolean;
  isWhite?: boolean;
  isShowProfile?: boolean;
}

export default function Header({
  header = "",
  isNotificationIcon = false,
  isOnlyBackButton = false,
  isWhite = false,
  isShowProfile = true,
}: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLeftIconClick = () => {
    window.history.back();
  };
  const router = useRouter();
  const { commodity } = useSelector((state: RootState) => state.auth);

  const onClickSetting = () => {
    router.push("/setting");
  };

  const { user } = useSelector((state: RootState) => state.auth) as any;

  const pathname = usePathname();
  useEffect(() => {
    const excludedPaths = [
      "/forgot-password",
      "/reset-password",
      "/verify-otp",
    ];

    if (!user && !excludedPaths.includes(pathname)) {
      dispatch(fetchUserProfile());
    }
  }, []);

  return (
    <div
      className={`flex relative top-0 md:max-w-[375px] md:mx-auto z-10 items-center justify-between py-3 px-5 ${
        isOnlyBackButton ? "absolute w-full" : "bg-white sticky"
      } ${isWhite ? "bg-white" : "bg-primary"}`}
    >
      {isOnlyBackButton && (
        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.07)_5%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.07)_5%)] bg-[length:40px_40px] opacity-20 pointer-events-none"></div>
      )}

      <div onClick={handleLeftIconClick} className="cursor-pointer z-10">
        <LeftIcon
          className={isOnlyBackButton && !isWhite ? "text-white" : "text-black"}
        />
      </div>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold ${
          isOnlyBackButton && !isWhite ? "text-white" : "text-black"
        } flex w-max`}
      >
        <span className="truncate max-w-[150px]">
          {header}
          </span>
      </div>
      <div className="flex gap-[10px]">
        {isShowProfile && user?.profileImage && (
          <div
            className="w-11 h-11 bg-white flex items-center rounded-full cursor-pointer border-2 border-gray-500"
            onClick={onClickSetting}
          >
            <img
              className="w-full h-full rounded-full block object-cover"
              src={user?.profileImage}
              alt="Profile"
            />
          </div>
        )}
        {!isOnlyBackButton && (
          <div className="w-11 h-11 bg-white flex items-center justify-center rounded-full cursor-pointer border-2 border-gray-500">
            {!isOnlyBackButton &&
              (isNotificationIcon ? <NotificationIcon /> : <SearchIcon />)}
          </div>
        )}
        {isOnlyBackButton && isNotificationIcon && (
          <div className="w-11 h-11 bg-white flex items-center justify-center rounded-full cursor-pointer border-2 border-gray-500">
            <NotificationIcon />
          </div>
        )}
      </div>
    </div>
  );
}
