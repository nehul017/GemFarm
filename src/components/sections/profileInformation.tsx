"use client";
import Link from "next/link";
import React, { useEffect } from "react";
const UserIcon = "/assets/icons/profile.svg";
const ProfileIcon = "/assets/images/Ty1.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUserProfile } from "../redux/slices/authSlice";
interface User {
  profileImage?: string;
  userName?: string;
  email?: string;
}

export default function ProfileInformation() {
  // const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="shadow-lg bg-white rounded-xl py-2.5 px-[15px] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          className="w-[60px] min-w-[60px] h-[60px] object-cover block rounded-full"
          src={user?.profileImage || ProfileIcon}
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
