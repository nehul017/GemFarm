"use client";

import * as React from "react";
import {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "../utils/utils";

export type Slot = {
  char: string | null;
  isActive: boolean;  // whether this slot is active
};

export type OTPInputContextType = {
  slots: Slot[];
  handleSlotClick: (index: number) => void;
};

export const OTPInputContext = createContext<OTPInputContextType>({
  slots: [],
  handleSlotClick: (_: number) => {},
});

export interface InputOTPProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  render?: (props: { slots: { char: string | null }[] }) => React.ReactNode;
}

export const InputOTP = forwardRef<HTMLInputElement, InputOTPProps>(
  ({ value, onChange, maxLength, render, ...delegated }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);


        // activeSlotIndex tracks the currently focused slot.
    // Initialize with value.length (i.e. next empty slot).
    const [activeSlotIndex, setActiveSlotIndex] = React.useState<number>(value.length || 0);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, "").slice(0, maxLength);
      onChange(newValue);
    };
    // Build slots from the value.
    const slots: Slot[] = Array.from({ length: maxLength }, (_, i) => ({
      char: value[i] || "",
      isActive: i === activeSlotIndex,
    }));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle digit key presses
      if (/^\d$/.test(e.key)) {
        e.preventDefault();
        const digit = e.key;
        // Create an array representing each slot.
        const otpArray = Array.from({ length: maxLength }, (_, i) => value[i] || "");
        otpArray[activeSlotIndex] = digit; // update the active slot
        const updatedOtp = otpArray.join("");
        onChange(updatedOtp);
        // Move active slot forward if not at end.
        setActiveSlotIndex((prev) => (prev < maxLength - 1 ? prev + 1 : prev));
        return;
      }

      // Handle Backspace: if current slot has a digit, clear it.
      // Otherwise, move to the previous slot and clear that.
      if (e.key === "Backspace") {
        e.preventDefault();
        const otpArray = Array.from({ length: maxLength }, (_, i) => value[i] || "");
        if (otpArray[activeSlotIndex]) {
          otpArray[activeSlotIndex] = "";
          onChange(otpArray.join(""));
        } else if (activeSlotIndex > 0) {
          const newIndex = activeSlotIndex - 1;
          otpArray[newIndex] = "";
          onChange(otpArray.join(""));
          setActiveSlotIndex(newIndex);
        }
        return;
      }

      // Allow navigation with arrow keys.
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeSlotIndex > 0) {
          setActiveSlotIndex(activeSlotIndex - 1);
        }
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (activeSlotIndex < maxLength - 1) {
          setActiveSlotIndex(activeSlotIndex + 1);
        }
        return;
      }
    };

    const handleSlotClick = (index:number) => {
      setActiveSlotIndex(index);
      inputRef.current?.focus();
    };

    return (
      <OTPInputContext.Provider value={{ slots, handleSlotClick }}>
        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="absolute opacity-0 w-0 h-0"
        />
        {render && render({ slots })}
      </OTPInputContext.Provider>
    );
  }
);
InputOTP.displayName = "InputOTP";


export const InputOTPGroup = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...delegated } = props;
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...delegated}
    />
  );
});
InputOTPGroup.displayName = "InputOTPGroup";

export const InputOTPSlot = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { index: number }
>(({ index, className, ...props }, ref) => {
  const { slots, handleSlotClick } = useContext(OTPInputContext);
  const slot = slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "w-12 h-12 flex items-center justify-center text-xl font-semibold rounded-lg border border-gray-300 cursor-pointer",
        className
      )}
      onClick={() => handleSlotClick(index)}
      {...props}
    >
      {slot.char}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
