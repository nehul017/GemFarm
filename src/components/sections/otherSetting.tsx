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
import DownIcon from "@/icons/downIcon";

export default function OtherSetting() {
  const [showSignOutModal, setShowSignOutModal] = React.useState(false);
  const [showFinancialOptions, setShowFinancialOptions] = React.useState(false);

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
        <div
          className="py-5 flex items-center gap-4 border-b border-solid border-borderColor4"
          onClick={() => setShowFinancialOptions((prev) => !prev)}
        >
          <FinancialIcon />
          <span className="block font-medium text-black200 text-base">
            Financial
          </span>

          <span
            className={`font-medium text-black200 text-base ml-auto transition-all duration-500 ease-in-out transform ${
              showFinancialOptions
                ? "translate-y-[0%] rotate-180"
                : "translate-y-[0%]"
            }`}
          >
            <DownIcon className="#0A3732" />
          </span>
        </div>
        {/* Financial Sub-options */}

        <div
          className={`pl-10 overflow-hidden transition-all duration-300 ease-in-out ${
            showFinancialOptions ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className=" flex items-center gap-4 py-3 cursor-pointer text-sm text-black200 hover:text-primary"
            onClick={() => router.push("/select-fram-container")}
          >
            <FinancialIcon />
            <span className="block font-medium text-black200 text-base">
              Financial Data
            </span>
          </div>
          <div
            className="flex items-center gap-4 py-3 cursor-pointer text-sm text-black200 hover:text-primary"
            onClick={() => router.push("/revenue-data")}
          >
            <FinancialIcon />
            <span className="block font-medium text-black200 text-base">
              Revenue Data
            </span>
          </div>
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
