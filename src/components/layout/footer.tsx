import React, { useState } from "react";
import Button from "../common/button";
import CropsList from "../common/CropsList";
const DownIcon = "/assets/icons/down.svg";

export default function Footer() {
  const [toogle, setToogle] = useState(false);
  return (
    <div>
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[9] w-[380px]">
        <div onClick={() => setToogle(!toogle)}>
          <Button
            rotateClass="rotate-180"
            buttonClass="flex items-center justify-center gap-3"
            text="My Watch List"
            green
            path={DownIcon}
          />
        </div>
      </div>
      {toogle && (
        <div className="fixed top-0 left-0 w-full h-full bg-modalBackdrop z-[99]"></div>
      )}
      <div
        className={`bg-white w-full bottom-0  fixed left-0 z-[999] rounded-t-lg h-[calc(100dvh-100px)] transition-all duration-500 ease-in-out ${
          toogle ? "translate-y-[0%]" : "translate-y-[100%]"
        }`}
      >
        <div onClick={() => setToogle(false)} className="p-5">
          <Button
            buttonClass="flex items-center justify-center gap-3"
            text="My Watch List"
            green
            path={DownIcon}
          />
        </div>
        <div className="p-5 h-[calc(100dvh-194px)] overflow-auto">
          <CropsList />
        </div>
      </div>
    </div>
  );
}
