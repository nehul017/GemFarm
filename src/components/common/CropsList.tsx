"use client";
import { useState } from "react";
import Header from "@/components/layout/header";
import LineChartIcon from "@/icons/lineChart";
import LineChartRed from "@/icons/lineChartRed";
import SearchIcon from "@/icons/SearchIcon";
const StrawberryImage = "/assets/images/Strawberry.png";
const PeasImage = "/assets/images/Peas.png";
const JalapenosImage = "/assets/images/Jalapenos.png";
const LettuceImage = "/assets/images/Lettuce.png";
const TomatoImage = "/assets/images/Tomato.png";
const CucumberImage = "/assets/images/Cucumber.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
  Legend,
  Bar,
  BarChart,
  AreaChart,
} from "recharts";
import moment from "moment";

export default function CropsList() {
  const [viewMode, setViewMode] = useState("graph"); // 'graph' or 'table'
  const [showFinancials, setShowFinancials] = useState(false);
  const [selectedItemForBuy, setSelectedItemForBuy] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // System configuration and costs
  const SYSTEM_COSTS = {
    base: 15000,
    installation: 2000,
    maintenance: 500,
  };

  const generateMarketData = (basePrice: number, days: number) => {
    const data = [];
    let currentPrice = basePrice;
    const now = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      // Generate more realistic price movements
      const change = (Math.random() - 0.5) * (basePrice * 0.03); // 3% max daily change
      currentPrice += change;

      // Generate high, low, open, close prices
      const high = currentPrice + Math.random() * basePrice * 0.01;
      const low = currentPrice - Math.random() * basePrice * 0.01;
      const open = currentPrice - Math.random() * (high - low);
      const close = currentPrice;
      const volume = Math.floor(Math.random() * 1000) + 500;

      data.push({
        date: moment(date).format("MM/DD/YYYY"),
        price: Number(currentPrice.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        open: Number(open.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume,
      });
    }
    return data;
  };

  const items = [
    {
      name: "Strawberry",
      basePrice: 34,
      img: StrawberryImage,
      isPositive: true,
    },
    {
      name: "Peas",
      basePrice: 16.75,
      img: PeasImage,
      isPositive: true,
    },
    {
      name: "Jalapenos",
      basePrice: 24,
      img: JalapenosImage,
      isPositive: true,
    },
    {
      name: "Lettuce",
      basePrice: 27.5,
      img: LettuceImage,
      isPositive: false,
    },
    {
      name: "Tomato",
      basePrice: 44,
      img: TomatoImage,
      isPositive: false,
    },
    {
      name: "Cucumber",
      basePrice: 38,
      img: CucumberImage,
      isPositive: false,
    },
  ].map((item) => ({
    ...item,
    marketData: generateMarketData(item.basePrice, 30),
  }));

  const yearlyYields = {
    Strawberry: 2000,
    Peas: 3000,
    Jalapenos: 2500,
    Lettuce: 4000,
    Tomato: 3500,
    Cucumber: 3000,
  };

  const calculateROI = (item: {
    name: keyof typeof yearlyYields;
    basePrice: number;
  }) => {
    const totalInitialCost = SYSTEM_COSTS.base + SYSTEM_COSTS.installation;
    const yearlyYield = yearlyYields[item.name];
    const yearlyRevenue = yearlyYield * item.basePrice;
    const yearlyCosts = SYSTEM_COSTS.maintenance;
    const yearlyProfit = yearlyRevenue - yearlyCosts;
    const paybackPeriod = totalInitialCost / yearlyProfit;
    const fiveYearPL = yearlyProfit * 5 - totalInitialCost;

    const projectionData = Array.from({ length: 6 }, (_, i) => ({
      year: new Date().getFullYear() + i,
      revenue: i === 0 ? -totalInitialCost : yearlyRevenue,
      costs: i === 0 ? 0 : yearlyCosts,
      profit: i === 0 ? -totalInitialCost : yearlyProfit,
      cumulativeProfit:
        i === 0 ? -totalInitialCost : yearlyProfit * i - totalInitialCost,
    }));

    return {
      initialCost: totalInitialCost,
      yearlyYield,
      yearlyRevenue,
      yearlyCosts,
      yearlyProfit,
      paybackPeriod,
      fiveYearPL,
      projectionData,
    };
  };

  const handleBuyClick = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItemForBuy(item);
    setShowFinancials(true);
  };

  const [selectedItem, setSelectedItem] = useState<null | (typeof items)[0]>(
    null
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-bold">{label}</p>
          <p className="text-sm">Price: ${payload[0].value.toFixed(2)}</p>
          <p className="text-sm">High: ${payload[0].payload.high.toFixed(2)}</p>
          <p className="text-sm">Low: ${payload[0].payload.low.toFixed(2)}</p>
          <p className="text-sm">Volume: {payload[0].payload.volume}</p>
        </div>
      );
    }
    return null;
  };

  const FinancialsModal = ({
    item,
    onClose,
  }: {
    item: any;
    onClose: () => void;
  }) => {
    const roi = calculateROI(item);
    const [activeTab, setActiveTab] = useState<"overview" | "projections">(
      "overview"
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 md:p-4">
        <div className="bg-white w-full h-full md:h-auto md:rounded-2xl md:w-full md:max-w-5xl md:max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b md:border-none">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Financial Analysis - {item.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                X
              </button>
            </div>

            <div className="mt-4">
              <div className="flex space-x-4 border-b overflow-x-auto">
                <button
                  className={`py-2 px-4 whitespace-nowrap ${
                    activeTab === "overview"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`py-2 px-4 whitespace-nowrap ${
                    activeTab === "projections"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("projections")}
                >
                  5-Year Projections
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            {activeTab === "overview" ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    System Investment
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-700">Base System Cost</p>
                      <p className="text-lg font-medium">
                        ${SYSTEM_COSTS.base.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">Installation</p>
                      <p className="text-lg font-medium">
                        ${SYSTEM_COSTS.installation.toLocaleString()}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-blue-700">
                        Total Initial Investment
                      </p>
                      <p className="text-xl font-bold">
                        ${roi.initialCost.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Annual Projections
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-700">Yearly Yield</p>
                      <p className="text-lg font-medium">
                        {roi.yearlyYield.toLocaleString()} units
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Yearly Revenue</p>
                      <p className="text-lg font-medium">
                        ${roi.yearlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Yearly Costs</p>
                      <p className="text-lg font-medium">
                        ${roi.yearlyCosts.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Yearly Profit</p>
                      <p className="text-lg font-medium">
                        ${roi.yearlyProfit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    ROI Analysis
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-purple-700">Payback Period</p>
                      <p className="text-lg font-medium">
                        {roi.paybackPeriod.toFixed(1)} years
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-700">5-Year P&L</p>
                      <p className="text-lg font-medium">
                        ${roi.fiveYearPL.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-[300px] mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={roi.projectionData}>
                      <defs>
                        <linearGradient
                          id="colorProfit"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#4CAF50"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#4CAF50"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2196F3"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2196F3"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorCosts"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#E91E63"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#E91E63"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <Tooltip
                        contentStyle={{ fontSize: "12px", padding: "4px" }}
                        wrapperStyle={{ fontSize: "12px" }}
                        itemStyle={{ padding: "2px" }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#4CAF50"
                        fill="url(#colorProfit)"
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2196F3"
                        fill="url(#colorRevenue)"
                      />
                      <Area
                        type="monotone"
                        dataKey="costs"
                        stroke="#E91E63"
                        fill="url(#colorCosts)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Revenue
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Costs
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Profit
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cumulative
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {roi.projectionData.map((year, index) => (
                          <tr key={index}>
                            <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Year {year.year}
                            </td>
                            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                              ${year.revenue.toLocaleString()}
                            </td>
                            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                              ${year.costs.toLocaleString()}
                            </td>
                            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                              ${year.profit.toLocaleString()}
                            </td>
                            <td
                              className={`px-2 py-3 whitespace-nowrap text-sm font-medium ${
                                year.cumulativeProfit >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              ${year.cumulativeProfit.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="h-[300px] mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={roi.projectionData}>
                      <defs>
                        <linearGradient
                          id="colorProfit"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#4CAF50"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#4CAF50"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2196F3"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2196F3"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorCumulative"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#FFC107"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#FFC107"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <Tooltip
                        contentStyle={{ fontSize: "12px", padding: "4px" }}
                        wrapperStyle={{ fontSize: "12px" }}
                        itemStyle={{ padding: "2px" }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#4CAF50"
                        fill="url(#colorProfit)"
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2196F3"
                        fill="url(#colorRevenue)"
                      />
                      <Area
                        type="monotone"
                        dataKey="cumulativeProfit"
                        stroke="#FFC107"
                        fill="url(#colorCumulative)"
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white p-4 border-t">
            <button
              onClick={() => window.alert("Purchase flow would continue here")}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Proceed with Purchase
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <div className="bg-white relative min-h-[calc(100vh-52px)] overflow-auto md:max-w-[375px] md:mx-auto"> */}
      <div className="pt-5 pb-10">
        <div className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between">
          <div
            className="flex items-center gap-5"
            onClick={() => setSelectedItem(items[0])}
          >
            <div className="flex items-center gap-3">
              <img
                src={StrawberryImage}
                alt="StrawberryImage"
                className="block w-[70px] min-w-[70px] rounded-xl h-[70px]"
              />
              <div>
                <p className="text-sm text-black font-semibold mb-2">
                  Strawberry
                </p>
                <button className="text-xs font-semibold border-none cursor-pointer text-green py-[5px] px-2.5 rounded-sm bg-[#E6F4EE]">
                  $4.78%
                </button>
              </div>
            </div>
            <LineChartIcon />
          </div>
          <button
            className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full"
            onClick={(e) => handleBuyClick(items[0], e)}
          >
            Buy
          </button>
        </div>
        <div className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between">
          <div
            className="flex items-center gap-5"
            onClick={() => setSelectedItem(items[1])}
          >
            <div className="flex items-center gap-3">
              <img
                src={PeasImage}
                alt="PeasImage"
                className="block w-[70px] min-w-[70px] rounded-xl h-[70px]"
              />
              <div>
                <p className="text-sm text-black font-semibold mb-2">Peas</p>
                <button className="text-xs font-semibold border-none cursor-pointer text-green py-[5px] px-2.5 rounded-sm bg-[#E6F4EE]">
                  $4.45%
                </button>
              </div>
            </div>
            <LineChartIcon />
          </div>
          <button
            className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full"
            onClick={(e) => handleBuyClick(items[1], e)}
          >
            Buy
          </button>
        </div>
        <div className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between">
          <div
            className="flex items-center gap-5"
            onClick={() => setSelectedItem(items[2])}
          >
            <div className="flex items-center gap-3">
              <img
                src={JalapenosImage}
                alt="JalapenosImage"
                className="block w-[70px] min-w-[70px] rounded-xl h-[70px]"
              />
              <div>
                <p className="text-sm text-black font-semibold mb-2">
                  Jalapenos
                </p>
                <button className="text-xs font-semibold border-none cursor-pointer text-green py-[5px] px-2.5 rounded-sm bg-[#E6F4EE]">
                  $1.29%
                </button>
              </div>
            </div>
            <LineChartIcon />
          </div>
          <button
            className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full"
            onClick={(e) => handleBuyClick(items[2], e)}
          >
            Buy
          </button>
        </div>
        <div className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between">
          <div
            className="flex items-center gap-5"
            onClick={() => setSelectedItem(items[3])}
          >
            <div className="flex items-center gap-3">
              <img
                src={LettuceImage}
                alt="LettuceImage"
                className="block w-[70px] min-w-[70px] rounded-xl h-[70px]"
              />
              <div>
                <p className="text-sm text-black font-semibold mb-2">Lettuce</p>
                <button className="text-xs font-semibold border-none cursor-pointer text-[#FF4747] py-[5px] px-2.5 rounded-sm bg-[#FAE8E8]">
                  $3.67%
                </button>
              </div>
            </div>
            <LineChartRed />
          </div>
          <button
            className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full"
            onClick={(e) => handleBuyClick(items[3], e)}
          >
            Buy
          </button>
        </div>
        <div className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between">
          <div
            className="flex items-center gap-5"
            onClick={() => setSelectedItem(items[4])}
          >
            <div className="flex items-center gap-3">
              <img
                src={TomatoImage}
                alt="TomatoImage"
                className="block w-[70px] min-w-[70px] rounded-xl h-[70px]"
              />
              <div>
                <p className="text-sm text-black font-semibold mb-2">Tomato</p>
                <button className="text-xs font-semibold border-none cursor-pointer text-[#FF4747] py-[5px] px-2.5 rounded-sm bg-[#FAE8E8]">
                  $2.50%
                </button>
              </div>
            </div>
            <LineChartRed />
          </div>
          <button
            className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full"
            onClick={(e) => handleBuyClick(items[4], e)}
          >
            Buy
          </button>
        </div>
        <div className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between">
          <div
            className="flex items-center gap-5"
            onClick={() => setSelectedItem(items[5])}
          >
            <div className="flex items-center gap-3">
              <img
                src={CucumberImage}
                alt="CucumberImage"
                className="block w-[70px] min-w-[70px] rounded-xl h-[70px]"
              />
              <div>
                <p className="text-sm text-black font-semibold mb-2">
                  Cucumber
                </p>
                <button className="text-xs font-semibold border-none cursor-pointer text-[#FF4747] py-[5px] px-2.5 rounded-sm bg-[#FAE8E8]">
                  $2.56%
                </button>
              </div>
            </div>
            <LineChartRed />
          </div>
          <button
            className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full"
            onClick={(e) => handleBuyClick(items[5], e)}
          >
            Buy
          </button>
        </div>
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-[2rem] w-full max-w-md max-h-[90vh] overflow-auto"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transform: "translateY(-5%)",
                marginTop: "65px",
              }}
            >
              {" "}
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedItem.name}
                    </h2>
                    <p
                      className={`text-base ${
                        selectedItem.isPositive
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ${selectedItem.basePrice.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex space-x-2 mb-4">
                  <button
                    className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                      viewMode === "graph"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setViewMode("graph")}
                  >
                    Graph
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                      viewMode === "table"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setViewMode("table")}
                  >
                    Table
                  </button>
                </div>

                {viewMode === "graph" && (
                  <div className="h-[650px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={selectedItem.marketData}
                        margin={{ top: 10, right: -20, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" fontSize={10} tickMargin={8} />
                        <YAxis
                          yAxisId="price"
                          domain={["auto", "auto"]}
                          fontSize={10}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <YAxis
                          yAxisId="volume"
                          orientation="right"
                          fontSize={10}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          yAxisId="volume"
                          dataKey="volume"
                          fill="#E5E7EB"
                          stroke="#9CA3AF"
                          opacity={0.5}
                        />
                        <Line
                          yAxisId="price"
                          type="monotone"
                          dataKey="price"
                          stroke="#2563EB"
                          strokeWidth={1.5}
                          dot={false}
                        />
                        <ReferenceLine
                          y={selectedItem.basePrice}
                          yAxisId="price"
                          stroke="#DC2626"
                          strokeDasharray="3 3"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {viewMode === "table" && (
                  <div className="overflow-x-auto -mx-4">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-2">Date</th>
                          {/* <th className="px-4 py-2">Open</th> */}
                          <th className="px-4 py-2">High</th>
                          <th className="px-4 py-2">Low</th>
                          {/* <th className="px-4 py-2">Close</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.marketData.map((data, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2">{data.date}</td>
                            {/* <td className="px-4 py-2">
                                ${data.open.toFixed(2)}
                              </td> */}
                            <td className="px-4 py-2">
                              ${data.high.toFixed(2)}
                            </td>
                            <td className="px-4 py-2">
                              ${data.low.toFixed(2)}
                            </td>
                            {/* <td className="px-4 py-2">
                                ${data.close.toFixed(2)}
                              </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {showFinancials && selectedItemForBuy && (
          <FinancialsModal
            item={selectedItemForBuy}
            onClose={() => {
              setShowFinancials(false);
              setSelectedItemForBuy(null);
            }}
          />
        )}
      </div>
      {/* </div> */}
    </>
  );
}
