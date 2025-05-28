import { Clock, Keyboard } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeSelectorProps {
  time: string;
  onTimeSelect: (time: string) => void;
  disabled?: boolean;
}

export function TimeSelector({
  time,
  onTimeSelect,
  disabled = false,
}: TimeSelectorProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number>(6);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [mode, setMode] = useState<"clock" | "keyboard">("clock");
  const [step, setStep] = useState<"hour" | "minute">("hour");

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleCancel = () => {
    setShowModal(false);
    setStep("hour");
  };

  const handleConfirm = () => {
    const formattedTime = `${selectedHour
      .toString()
      .padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")} ${ampm}`;
    onTimeSelect(formattedTime);
    setShowModal(false);
    setStep("hour");
  };

  const handleClockSelect = (value: number) => {
    if (step === "hour") {
      setSelectedHour(value);
      setStep("minute");
    } else {
      setSelectedMinute(value);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Selected Time</span>
            <span className="text-2xl font-bold text-gray-900 tracking-wider">
              {time}
            </span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            disabled={disabled}
            className="bg-primary text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Change Time
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center sm:items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm px-5">
          <div className="bg-white rounded-3xl sm:rounded-3xl w-full sm:w-96 max-w-md animate-in slide-in-from-bottom duration-300 sm:animate-in sm:zoom-in-95">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Time
                </h3>
              </div>

              {/* Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    mode === "clock"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setMode("clock")}
                >
                  <Clock size={18} />
                  Clock
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    mode === "keyboard"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setMode("keyboard")}
                >
                  <Keyboard size={18} />
                  Input
                </button>
              </div>
              {mode === "clock" && (
                <div className="space-y-6 mb-8">
                <div className="flex items-center justify-center gap-2">
                  <div className="relative" onClick={() => setStep("hour")}>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={selectedHour}
                      readOnly
                      className="text-4xl font-bold text-primary w-20 h-20 text-center border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                    <label className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium">
                      Hour
                    </label>
                  </div>
                  <span className="text-4xl font-bold text-primary mb-6">
                    :
                  </span>
                  <div className="relative" onClick={() => setStep("minute")}>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={selectedMinute}
                      readOnly
                      className="text-4xl font-bold text-primary w-20 h-20 text-center border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                    <label className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium">
                      Minute
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setAmpm("AM")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      ampm === "AM"
                        ? "bg-primary text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setAmpm("PM")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      ampm === "PM"
                        ? "bg-primary text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
              )}

              {/* Time Selection */}
              {mode === "keyboard" ? (
                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={selectedHour}
                        onChange={(e) =>
                          setSelectedHour(
                            Math.min(12, Math.max(1, +e.target.value))
                          )
                        }
                        className="text-4xl font-bold text-primary w-20 h-20 text-center border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                      <label className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium">
                        Hour
                      </label>
                    </div>
                    <span className="text-4xl font-bold text-primary mb-6">
                      :
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={selectedMinute}
                        onChange={(e) =>
                          setSelectedMinute(
                            Math.min(59, Math.max(0, +e.target.value))
                          )
                        }
                        className="text-4xl font-bold text-primary w-20 h-20 text-center border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                      <label className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium">
                        Minute
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setAmpm("AM")}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        ampm === "AM"
                          ? "bg-primary text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      AM
                    </button>
                    <button
                      onClick={() => setAmpm("PM")}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        ampm === "PM"
                          ? "bg-primary text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      PM
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center mb-8">
                  {/* Clock Face */}
                  <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100 shadow-inner">
                    {/* Hour Numbers */}
                    {step === "hour"
                      ? [...Array(12)].map((_, index) => {
                          const hour = index + 1;
                          const angle = hour * 30;
                          const x =
                            128 + 90 * Math.sin((angle * Math.PI) / 180);
                          const y =
                            128 - 90 * Math.cos((angle * Math.PI) / 180);
                          return (
                            <button
                              key={hour}
                              onClick={() => handleClockSelect(hour)}
                              className={`absolute w-10 h-10 rounded-full transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold transition-all duration-200 hover:scale-110 ${
                                selectedHour === hour
                                  ? "bg-primary text-white shadow-lg scale-110"
                                  : "bg-white text-primary hover:bg-blue-50 shadow-md"
                              }`}
                              style={{ left: `${x}px`, top: `${y}px` }}
                            >
                              {hour}
                            </button>
                          );
                        })
                      : [...Array(12)].map((_, index) => {
                          const minute = index * 5; // 0, 5, 10, ..., 55
                          const angle = minute * 6;
                          const x =
                            128 + 90 * Math.sin((angle * Math.PI) / 180);
                          const y =
                            128 - 90 * Math.cos((angle * Math.PI) / 180);
                          return (
                            <button
                              key={minute}
                              onClick={() => handleClockSelect(minute)}
                              className={`absolute w-10 h-10 rounded-full transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold transition-all duration-200 hover:scale-110 ${
                                selectedMinute === minute
                                  ? "bg-primary text-white shadow-lg scale-110"
                                  : "bg-white text-primary hover:bg-blue-50 shadow-md"
                              }`}
                              style={{ left: `${x}px`, top: `${y}px` }}
                            >
                              {minute.toString().padStart(2, "0")}
                            </button>
                          );
                        })}

                    {/* Center Dot */}
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>

                    {/* Clock Hand */}
                    <div
                      className="absolute top-1/2 left-1/2 w-0.5 bg-primary origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform duration-300"
                      style={{
                        height: "60px",
                        transform: `translate(-50%, -100%) rotate(${
                          step === "hour"
                            ? selectedHour * 30
                            : selectedMinute * 6
                        }deg)`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
