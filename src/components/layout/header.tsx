"use client";
import LeftIcon from "@/icons/leftIcon";
import NotificationIcon from "@/icons/notificationIcon";
import SearchIcon from "@/icons/SearchIcon";

import React from "react";

interface HeaderProps {
  header?: string;
  isNotificationIcon?: boolean;
}

export default function Header({ header = "GemFarms", isNotificationIcon = false }: HeaderProps) {
  const handleLeftIconClick = () => {
    window.history.back();
  };

  return (
    <div className="flex sticky top-0 md:max-w-[375px] md:mx-auto bg-white z-10 items-center justify-between py-3 px-5">
      <LeftIcon onClick={handleLeftIconClick} />
      <p className="text-lg text-black font-semibold">{header}</p>
      {isNotificationIcon ? <NotificationIcon /> : <SearchIcon />}
    </div>
  );
}
