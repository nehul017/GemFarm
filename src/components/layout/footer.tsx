"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../common/button";
import CropsList from "../common/CropsList";
const DownIcon = "/assets/icons/down.svg";

export default function Footer() {
  const [toogle, setToogle] = useState(false);
  const cropsListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (toogle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setTimeout(() => {
      cropsListRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [toogle]);

  return (
    <div>
      {!toogle && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[9] max-w-[410px] w-full mx-auto">
          <div className="px-5" onClick={() => setToogle(!toogle)}>
            <Button
              rotateClass="rotate-180"
              buttonClass="flex items-center justify-center gap-3"
              text="Watch List"
              green
              path={DownIcon}
            />
          </div>
        </div>
      )}
      {toogle && (
        <div
          onClick={() => setToogle(false)}
          className="fixed top-0 w-full h-full bg-modalBackdrop z-[99] mx-auto max-w-[430px] mobile:max-w-[100%]"
        ></div>
      )}
      <div
        className={`bg-white max-w-[410px] w-full bottom-0 left-[50%] translate-x-[-50%] mx-auto fixed  z-[999] rounded-t-lg h-[calc(100dvh-100px)] transition-all duration-500 ease-in-out ${
          toogle ? "translate-y-[0%]" : "translate-y-[100%]"
        }`}
      >
        <div onClick={() => setToogle(false)} className="p-5 pb-0">
          <Button
            buttonClass="flex items-center justify-center gap-3"
            text="Watch List"
            green
            path={DownIcon}
          />
        </div>
        <div className="p-5 pt-0" ref={cropsListRef}>
          <CropsList toogle={toogle} />
        </div>
      </div>
    </div>
  );
}
