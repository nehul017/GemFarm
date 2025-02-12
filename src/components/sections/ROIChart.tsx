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
export default function ROIChart() {
  const [selectedRange, setSelectedRange] = useState("1W");

  const data = [
    { name: "Mon", value: 350000 , value2: 320000 },
    { name: "Tue", value: 345000 , value2: 315000 },
    { name: "Wed", value: 360000 , value2: 325000 },
    { name: "Thu", value: 352521.5 , value2: 340000 },
    { name: "Fri", value: 365000 , value2: 335000 },
    { name: "Sat", value: 375000 , value2: 355000 },
    { name: "Sun", value: 380108 , value2: 345000 },
  ];

  const timeRanges = ["1D", "1W", "1M", "1Y", "All"];

  return (
    <div className=" bg-white ">
      <div className="max-w-md mx-auto">
        <div className="h-64 mb-6">
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
              />
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value / 1000}K`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22C55E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
              <Area
                type="monotone"
                dataKey="value2"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue2)"
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
