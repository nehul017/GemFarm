"use client";
import Link from "next/link";
import React, { useEffect } from "react";
const UserIcon = "/assets/icons/profile.svg";
interface User {
  profileImage?: string;
  userName?: string;
  email?: string;
}

export default function ProfileInformation() {
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  let user: User = {}; 
  useEffect(() => {
    if (typeof window !== "undefined") {
       user = JSON.parse(localStorage.getItem("user") || "{}");
    }
},[])
  return (
    <div className="shadow-lg bg-white rounded-xl py-2.5 px-[15px] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          className="w-[60px] min-w-[60px] h-[60px] object-cover block rounded-full"
          src={
            user?.profileImage ||
            "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
          }
        />
        <div>
          <p className="text-base font-semibold text-black200 m-0">
            {user?.userName}
          </p>
          <span className="text-[10px] text-gray600 block leading-4">
            {user?.email}
          </span>
        </div>
      </div>
      <Link href="/profile">
        <img src={UserIcon} alt="UserIcon" />
      </Link>
    </div>
  );
}
