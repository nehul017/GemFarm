"use client";
import LeftIcon from "@/icons/leftIcon";
import NotificationIcon from "@/icons/notificationIcon";
import SearchIcon from "@/icons/SearchIcon";

import React from "react";

interface HeaderProps {
  header?: string;
  isNotificationIcon?: boolean;
  isOnlyBackButton?: boolean; // Only shows back icon and no search icon
}

export default function Header({
  header = "GemFarms",
  isNotificationIcon = false,
  isOnlyBackButton = false,
}: HeaderProps) {
  const handleLeftIconClick = () => {
    window.history.back();
  };

  return (
    <div
      className={`flex  top-0 md:max-w-[375px] md:mx-auto z-10 items-center justify-between py-3 px-5 ${
        isOnlyBackButton ? "bg-primary absolute w-full" : "bg-white sticky"
      }`}
    >
      {isOnlyBackButton && (
        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.07)_5%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.07)_5%)] bg-[length:40px_40px] opacity-20 pointer-events-none"></div>
      )}
      <LeftIcon
        onClick={handleLeftIconClick}
        className={isOnlyBackButton ? "text-white" : "text-black"}
      />
      <p className="text-lg text-black font-semibold">{header}</p>
      {!isOnlyBackButton &&
        (isNotificationIcon ? <NotificationIcon /> : <SearchIcon />)}
    </div>
  );
}
