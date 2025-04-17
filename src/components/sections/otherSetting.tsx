"use client";
import HelpIcon from "@/icons/helpIcon";
import InformationIcon from "@/icons/informationIcon";
import NotificationIcon from "@/icons/notificationIcon";
import SignOutIcon from "@/icons/signOutIcon";
import React from "react";
import SignOutModal from "../modal/signOutModal";
import OnBoardingIcon from "@/icons/Onbodaring";
import FinancialIcon from "./Financial";
import { useRouter } from "next/navigation";

export default function OtherSetting() {
  const [showSignOutModal, setShowSignOutModal] = React.useState(false);
  const router = useRouter();

  return (
    <div className="pt-[25px]">
      <h2 className="text-base font-semibold text-black200 mb-[18px]">
        Other Settings
      </h2>
      <div className="shadow-lg bg-white rounded-xl px-5">
        <div
          className="py-5 flex items-center gap-4 border-b border-solid border-borderColor4 cursor-pointer"
          onClick={() => router.push("/add-farm-details")}
        >
          <OnBoardingIcon />
          <span className="block font-medium text-black200 text-base">
            Onboarding
          </span>
        </div>
        <div className="py-5 flex items-center gap-4 border-b border-solid border-borderColor4">
          <FinancialIcon />
          <span className="block font-medium text-black200 text-base">
            Financial
          </span>
        </div>
        <div className="py-5 flex items-center gap-4 border-b border-solid border-borderColor4">
          <NotificationIcon />
          <span className="block font-medium text-black200 text-base">
            Notification
          </span>
        </div>
        <div className="py-5 flex items-center gap-4 border-b border-solid border-borderColor4">
          <HelpIcon />
          <span className="block font-medium text-black200 text-base">
            Help
          </span>
        </div>
        <div className="py-5 flex items-center gap-4 border-b border-solid border-borderColor4">
          <InformationIcon />
          <span className="block font-medium text-black200 text-base">
            About
          </span>
        </div>
        <div
          className="py-5 flex items-center gap-4 "
          onClick={() => setShowSignOutModal(true)}
        >
          <SignOutIcon />
          <span className="block font-medium text-black200 text-base">
            Sign Out
          </span>
        </div>
      </div>
      {showSignOutModal && (
        <SignOutModal setShowSignOutModal={setShowSignOutModal} />
      )}
    </div>
  );
}
