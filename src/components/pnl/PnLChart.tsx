import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MonthData } from "../utils/utils";
import { formatCurrency } from "../utils/utils";

type PnLChartProps = {
  data: MonthData[];
};

const formatYAxisTick = (value: number) => {
  if (value >= 1000) {
    return `$${value / 1000}k`;
  }
  return `$${value}`;
};

const PnLChart: React.FC<PnLChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.month.substring(0, 3),
    Revenue: item.revenue,
    Expenses: item.expenses,
    Profit: item.profit,
  }));

  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 5,
            left: -18,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatYAxisTick} />
          <Tooltip
            formatter={(value) => formatCurrency(value as number)}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Bar dataKey="Revenue" fill="#64A097" />
          <Bar dataKey="Expenses" fill="#D32F2F" />
          <Bar dataKey="Profit" fill="#2E7D32" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PnLChart;
