import React from "react";
import Button from "../common/button";
const SignOutIcon = "/assets/icons/signout.svg";
import Cookies from "js-cookie";
import { supabase } from "@/utils/supabaseClient";

interface SignOutModalProps {
  setShowSignOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignOutModal({
  setShowSignOutModal,
}: SignOutModalProps) {
  const handleCloseModal = () => {
    setShowSignOutModal(false);
  };

  const handleSignOut = async () => {
    setShowSignOutModal(false);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    Cookies.remove("authToken");
    Cookies.remove("user");

    // Prevent going back to previous authenticated pages
    window.history.pushState(null, "", "/signin?error=logged_out");
    await supabase.auth.signOut();

    window.location.replace("/signin?error=logged_out"); // Ensures fresh redirect
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-modalBackdrop z-30 flex items-center justify-center">
      <div className="w-[calc(100%-24px-24px)] rounded-xl bg-white shadow-lg p-[25px]">
        <div className="flex items-center justify-center pb-4">
          <img src={SignOutIcon} alt="SignOutIcon" />
        </div>
        <h3 className="text-lg font-semibold text-black200 text-center mb-1">
          Sign Out
        </h3>
        <p className="text-xs text-gray600 text-center mb-5">
          Are You sure want to Sign Out?
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div onClick={handleCloseModal}>
            <Button
              buttonClass="bg-transparent !text-black !p-[12px]"
              text="No"
              green
            />
          </div>
          <div onClick={handleSignOut}>
            <Button buttonClass="!p-[12px]" text="Yes" green />
          </div>
        </div>
      </div>
    </div>
  );
}
