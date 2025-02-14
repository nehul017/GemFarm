"use client";
import LeftIcon from "@/icons/leftIcon";
import NotificationIcon from "@/icons/notificationIcon";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  useEffect(() => {
    setPreviousPage(document.referrer); // Store the previous page URL
  }, []);

  const handleLeftIconClick = () => {
    // if (previousPage && previousPage.includes(window.location.origin)) {
      window.history.back()
      // router.back(); // Go back if the previous page is from the same site
    // }
  };

  return (
    <div className="flex sticky top-0 md:max-w-[375px] md:mx-auto bg-white z-10 items-center justify-between py-3 px-5">
      <LeftIcon onClick={handleLeftIconClick} />
      <p className="text-lg text-black font-semibold">GemFarms</p>
      <NotificationIcon />
    </div>
  );
}
