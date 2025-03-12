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
} from "recharts";
import moment from "moment";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("graph"); // 'graph' or 'table'

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

      // Generate volume
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

  const [selectedItem, setSelectedItem] = useState<null | (typeof items)[0]>(
    null
  );

  return (
    <>
      <Header header="Watch List" isNotificationIcon={true} />
      <div className="bg-white relative min-h-[calc(100vh-52px)] overflow-auto md:max-w-[375px] md:mx-auto">
        <div className="pt-5 pb-10 px-5">
          <div className="mb-4">
            <div className="relative">
              <input
                className="px-10 text-sm bg-inputBackground placeholder:text-white placeholder:opacity-[0.45] rounded-full placeholder:text-sm outline-none h-[50px] w-full text-black font-normal border border-solid"
                placeholder="Search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-[50%] translate-y-[-50%] right-3 flex items-center cursor-pointer">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div
            className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between"
            onClick={() => setSelectedItem(items[0])}
          >
            <div className="flex items-center gap-5">
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
            <button className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full">
              Buy
            </button>
          </div>
          <div
            className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between"
            onClick={() => setSelectedItem(items[1])}
          >
            <div className="flex items-center gap-5">
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
            <button className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full">
              Buy
            </button>
          </div>
          

          <div
            className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between"
            onClick={() => setSelectedItem(items[2])}
          >
            <div className="flex items-center gap-5">
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
            <button className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full">
              Buy
            </button>
          </div>
          <div
            className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between"
            onClick={() => setSelectedItem(items[3])}
          >
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <img
                  src={LettuceImage}
                  alt="LettuceImage"
                  className="block w-[70px] min-w-[70px] rounded-xl h-[70px]"
                />
                <div>
                  <p className="text-sm text-black font-semibold mb-2">
                    Lettuce
                  </p>
                  <button className="text-xs font-semibold border-none cursor-pointer text-[#FF4747] py-[5px] px-2.5 rounded-sm bg-[#FAE8E8]">
                    $3.67%
                  </button>
                </div>
              </div>
              <LineChartRed />
            </div>
            <button className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full">
              Buy
            </button>
          </div>
          <div
            className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between"
            onClick={() => setSelectedItem(items[4])}
          >
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <img
                  src={TomatoImage}
                  alt="TomatoImage"
                  className="block w-[70px] min-w-[70px] rounded-xl h-[70px]"
                />
                <div>
                  <p className="text-sm text-black font-semibold mb-2">
                    Tomato
                  </p>
                  <button className="text-xs font-semibold border-none cursor-pointer text-[#FF4747] py-[5px] px-2.5 rounded-sm bg-[#FAE8E8]">
                    $2.50%
                  </button>
                </div>
              </div>
              <LineChartRed />
            </div>
            <button className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full">
              Buy
            </button>
          </div>
          <div
            className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5 flex items-center justify-between"
            onClick={() => setSelectedItem(items[5])}
          >
            <div className="flex items-center gap-5">
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
            <button className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full">
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
                        <ComposedChart data={selectedItem.marketData} margin={{ top: 10, right: -20, left: -20, bottom: 0 }}>
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
        </div>
      </div>
    </>
  );
}
