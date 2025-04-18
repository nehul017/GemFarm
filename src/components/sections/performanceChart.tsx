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
import { useMemo, useState } from "react";

const generateChartData = (range: string) => {
  const today = new Date();
  let days;

  switch (range) {
    case "2W":
      days = 14;
      break;
    case "1M":
      days = 30;
      break;
    case "3M":
      days = 90;
      break;
    case "6M":
      days = 180;
      break;
    case "1Y":
      days = 365;
      break;
    case "All":
      days = 365 * 5;
      break;
    default:
      days = 30;
  }

  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const value = 30000 + Math.floor(Math.random() * 10000); // dummy value
    data.push({ date: date.toISOString(), value });
  }

  return data;
};

export default function PerformanceChart({
  selectedTab2,
}: {
  selectedTab2: string;
}) {
  const [selectedRange, setSelectedRange] = useState("2W");

  const timeRanges = ["2W", "1M", "3M", "6M", "1Y", "All"];
  const data = useMemo(() => generateChartData(selectedRange), [selectedRange]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-1 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-900">
            {selectedTab2 === "yield"
              ? `${payload[0].value.toLocaleString()} kg`
              : `$${payload[0].value.toLocaleString()}`}
          </p>
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
              margin={{
                top: 10,
                right: selectedTab2 === "yield" ? -10 : -15,
                left: 20,
                bottom: 0,
              }}
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
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(date: string) =>
                  new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) =>
                  selectedTab2 === "yield"
                    ? `${value / 1000}K kg`
                    : `$${value / 1000}K`
                }
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
        <div className="flex gap-[1.5rem] mb-5 justify-center">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-2 py-2 rounded-full text-sm ${
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
