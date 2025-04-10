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
      if (/^\d$/.test(e.key)) {
        e.preventDefault();
        const digit = e.key;
        const otpArray = value.split("").slice(0, maxLength);
    
        otpArray[activeSlotIndex] = digit;
        onChange(otpArray.join(""));
    
        if (activeSlotIndex < maxLength - 1) {
          setActiveSlotIndex(activeSlotIndex + 1);
        }
        return;
      }
    
      if (e.key === "Backspace") {
        e.preventDefault();
        const otpArray = value.split("").slice(0, maxLength);
    
        if (otpArray[activeSlotIndex]) {
          otpArray[activeSlotIndex] = "";
          onChange(otpArray.join(""));
        } else if (activeSlotIndex > 0) {
          otpArray[activeSlotIndex - 1] = "";
          onChange(otpArray.join(""));
          setActiveSlotIndex(activeSlotIndex - 1);
        }
        return;
      }
    
      if (e.key === "ArrowLeft" && activeSlotIndex > 0) {
        e.preventDefault();
        setActiveSlotIndex(activeSlotIndex - 1);
      }
    
      if (e.key === "ArrowRight" && activeSlotIndex < maxLength - 1) {
        e.preventDefault();
        setActiveSlotIndex(activeSlotIndex + 1);
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
        "w-12 h-12 flex items-center justify-center text-xl font-semibold rounded-lg border cursor-text transition-all",
        slot.isActive ? "border-green" : "border-gray-300", // Apply green border when active
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
