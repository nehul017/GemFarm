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
import { ArrowLeft, Bell, DollarSign, Sprout } from "lucide-react";
import { useState } from "react";
export default function WatchListChart() {
  const [selectedRange, setSelectedRange] = useState("1W");
  const currentValue = 380108.0;
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

  return (
    <div className=" bg-white ">
      <div className="max-w-md mx-auto">
        {/* Value Display */}
        <div className="mb-6">
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
              <CartesianGrid strokeDasharray="3 3" /> {/* This adds the dotted grid */}
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
        <div className="flex gap-2 mb-6">
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

        {/* Info Cards */}
        {/* <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <div className="p-2 bg-white rounded-full">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Cash Flow</h3>
                  <p className="text-sm text-gray-500">Cash flow tracks money movement.</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                <div className="p-2 bg-white rounded-full">
                  <Sprout className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Farm Health</h3>
                  <p className="text-sm text-gray-500">Farm health measures wellbeing.</p>
                </div>
              </div>
            </div> */}
      </div>
    </div>
  );
}
