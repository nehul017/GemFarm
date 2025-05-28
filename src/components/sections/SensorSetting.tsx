import { SetStateAction, useState } from "react";
import Input from "../common/Input";
import { SectionCard } from "../common/SectionCard";
import Button from "../common/button";
import { TimeSelector } from "../common/TimeSelector";
import { NumberInput } from "../common/NumberInput";

export default function SettingsPage() {
  const [deviceName, setDeviceName] = useState("IDose");
  const [deviceType, setDeviceType] = useState("IntelliDose");
  const [tempUnit, setTempUnit] = useState("celsius");
  const [dateFormat, setDateFormat] = useState("mmddyy");
  const [ecUnit, setEcUnit] = useState("ec");
  const [dayStart, setDayStart] = useState("6:00 AM");
  const [dayEnd, setDayEnd] = useState("6:00 PM");
  const [alarmDelay, setAlarmDelay] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-10">
      <SectionCard title="Device Information">
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Device name
          </label>
          <Input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={deviceName}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setDeviceName(e.target.value)
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Device type
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={deviceType}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setDeviceType(e.target.value)
            }
          />
        </div>
      </SectionCard>

      <SectionCard title="General Setup">
        <div className="mb-6">
          <p className="text-base font-medium text-gray-700 mb-3">
            Temperature Units
          </p>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                value="farm"
                checked={tempUnit === "celsius"}
                onChange={() => setTempUnit("celsius")}
              />
              <span className="text-sm font-medium text-black">Celsius °C</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                value="farm"
                checked={tempUnit === "Fahrenheit"}
                onChange={() => setTempUnit("Fahrenheit")}
              />
              <span className="text-sm font-medium text-black">Fahrenheit °F</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-base font-medium text-gray-700 mb-3">
            Date Format
          </p>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                value="ddmmyy"
                checked={dateFormat === "ddmmyy"}
                onChange={() => setDateFormat("ddmmyy")}
              />
              <span className="text-sm font-medium text-black">DD/MM/YY</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                value="mmddyy"
                checked={dateFormat === "mmddyy"}
                onChange={() => setDateFormat("mmddyy")}
              />
              <span className="text-sm font-medium text-black">MM/DD/YY</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-base font-medium text-gray-700 mb-3">EC units</p>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                value="ec"
                checked={ecUnit === "ec"}
                onChange={() => setEcUnit("ec")}
              />{" "}
              <span className="text-sm font-medium text-black">EC</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                value="cf"
                checked={ecUnit === "cf"}
                onChange={() => setEcUnit("cf")}
              />{" "}
              <span className="text-sm font-medium text-black">CF</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-[18px] h-[18px] cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#36BA7E] relative
              before:content-[''] before:block before:w-[10px] before:h-[10px] before:rounded-full before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-[#36BA7E]"
                value="tds"
                checked={ecUnit === "tds"}
                onChange={() => setEcUnit("tds")}
              />{" "}
              <span className="text-sm font-medium text-black">TDS</span>
            </label>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Time Settings">
        <div className="mb-5">
          <p className="text-base font-medium text-gray-700 mb-2">
            Day Start (Lights On)
          </p>
          <TimeSelector time={dayStart} onTimeSelect={setDayStart} />
        </div>

        <div className="mb-5">
          <p className="text-base font-medium text-gray-700 mb-2">
            Day Stop (Lights Off)
          </p>
          <TimeSelector time={dayEnd} onTimeSelect={setDayEnd} />
        </div>

        <div className="mb-5">
          <p className="text-base font-medium text-gray-700 mb-2">
            Alarm Delay
          </p>
          <NumberInput
            value={alarmDelay}
            onValueChange={setAlarmDelay}
            unit="minutes"
            min={1}
            max={60}
          />
        </div>
      </SectionCard>

      <div className="mt-8 flex flex-col gap-3">
        <Button text="Save Changes" onClick={() => {}} green />
        <Button text="Factory Reset" onClick={() => {}} />
      </div>
    </div>
  );
}
