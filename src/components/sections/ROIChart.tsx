"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

const generateData = () => {
  const weeks = 260;
  const result = [];
  const today = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i * 7); // weekly data
    result.push({
      name: `${date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      })}`,
      value: 300000 + Math.random() * 100000,
      value2: 280000 + Math.random() * 80000,
      kg: 40 + Math.random() * 20,
      kg2: 35 + Math.random() * 15,
    });
  }
  return result;
};
export default function ROIChart({ selectedTab2 }: { selectedTab2: string }) {
  const [selectedRange, setSelectedRange] = useState("2W");
  const timeRanges = ["2W", "1M", "3M", "6M", "1Y", "All"];
  const fullData = generateData();

  const getFilteredData = () => {
    const rangeMap: Record<string, number> = {
      "2W": 4,
      "1M": 12,
      "3M": 26,
      "6M": 52,
      "1Y": 104,
      "All": fullData.length,
    };
    const weeksToShow = rangeMap[selectedRange] || 4;
    return fullData.slice(-weeksToShow);
  };

  const data = getFilteredData();


  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm font-semibold"
              style={{ color: entry.color }}
            >
              {selectedTab2 === "yield"
                ? `${entry.value.toLocaleString()} kg`
                : `$${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" bg-white ">
      <div className="max-w-md mx-auto">
        <div className="h-64 mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: -15, left: 20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) =>
                  selectedTab2 === "yield" ? `${value}kg` : `$${value / 1000}K`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={selectedTab2 === "yield" ? "kg" : "value"}
                stroke="#22C55E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
              <Area
                type="monotone"
                dataKey={selectedTab2 === "yield" ? "kg2" : "value2"}
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-[1.5rem] mb-5 justify-center">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-2 py-2 rounded-full text-sm transition-colors ${
                selectedRange === range
                  ? "bg-gray-200 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
