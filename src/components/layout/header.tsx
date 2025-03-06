"use client";
import React from "react";
import LeftIcon from "@/icons/leftIcon";
import NotificationIcon from "@/icons/notificationIcon";
import SearchIcon from "@/icons/SearchIcon";

interface HeaderProps {
  header?: string;
  isNotificationIcon?: boolean;
  isOnlyBackButton?: boolean;
  isWhite?: boolean;
}

export default function Header({
  header = "GemFarms",
  isNotificationIcon = false,
  isOnlyBackButton = false,
  isWhite = false,
}: HeaderProps) {
  const handleLeftIconClick = () => {
    window.history.back();
  };

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
        <LeftIcon className={isOnlyBackButton && !isWhite ? "text-white" : "text-black"} />
      </div>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold ${
          isOnlyBackButton && !isWhite ? "text-white" : "text-black"
        }`}
      >
        {header}
      </div>

      {!isOnlyBackButton &&
        (isNotificationIcon ? <NotificationIcon /> : <SearchIcon />)}
    </div>
  );
}
