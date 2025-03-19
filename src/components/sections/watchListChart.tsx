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
export default function WatchListChart() {
  const [selectedRange, setSelectedRange] = useState("1W");
  const currentValue = 380108.12;
  const percentageChange = -1.5;
  const changeValue = 0.35;

  const data = [
    { name: "Mon", value: 2000 },
    { name: "Tue", value: 2800 },
    { name: "Wed", value: 5000 },
    { name: "Thu", value: 4500 },
    { name: "Fri", value: 6000 },
    { name: "Sat", value: 4800 },
    { name: "Sun", value: 3800 },
  ];

  const timeRanges = ["1D", "1W", "1M", "1Y", "All"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-1 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-900">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className=" bg-white ">
      <div className="max-w-md mx-auto">
        {/* Value Display */}
        <div className="mb-5">
          <h2 className="text-3xl font-bold">
            ${currentValue.toLocaleString()}
          </h2>
          <p className="text-sm">
            <span
              className={`${
                percentageChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {changeValue}% ({percentageChange}%)
            </span>{" "}
            past 24 hours
          </p>
        </div>

        {/* Chart */}
        <div className="h-64 mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: -24, left: 20, bottom: 0 }}
              onMouseMove={(e) => {
                if (e.isTooltipActive) {
                  // You can add additional hover effects here if needed
                }
              }}
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
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#22C55E",
                  strokeWidth: 2,
                  strokeDasharray: "5 5",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22C55E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{
                  r: 6,
                  fill: "#22C55E",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-[1.5rem] justify-center">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-gray-100 ${
                selectedRange === range
                  ? "bg-gray-200 font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
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
