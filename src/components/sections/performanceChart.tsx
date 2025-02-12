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
export default function PerformanceChart() {
  const [selectedRange, setSelectedRange] = useState("1W");

  const data = [
    { name: "Mon", value: 32000 },
    { name: "Tue", value: 33200 },
    { name: "Wed", value: 34500 },
    { name: "Thu", value: 35221.5 },
    { name: "Fri", value: 36000 },
    { name: "Sat", value: 37000 },
    { name: "Sun", value: 38108 },
  ];

  const timeRanges = ["1D", "1W", "1M", "1Y", "All"];

  return (
    <div className=" bg-white ">
      <div className="max-w-md mx-auto">
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: -24, left: 20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />{" "}
              {/* This adds the dotted grid */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22C55E"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-[1.5rem] mb-6 justify-center">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedRange === range
                  ? "bg-gray-200 font-medium"
                  : "text-gray-500"
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
