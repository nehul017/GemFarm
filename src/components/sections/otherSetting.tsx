"use client";
import HelpIcon from "@/icons/helpIcon";
import InformationIcon from "@/icons/informationIcon";
import NotificationIcon from "@/icons/notificationIcon";
import SignOutIcon from "@/icons/signOutIcon";
import React from "react";
import SignOutModal from "../modal/signOutModal";

export default function OtherSetting() {
  const [showSignOutModal, setShowSignOutModal] = React.useState(false);

  return (
    <div className="pt-[25px]">
      <h2 className="text-base font-semibold text-black200 mb-[18px]">
        Other Setting
      </h2>
      <div className="shadow-lg bg-white rounded-xl px-5">
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
