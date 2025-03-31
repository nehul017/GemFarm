"use client";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
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
    name: "Jalapenos",
    basePrice: 24,
    img: JalapenosImage,
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Jalapeños",
  },
  {
    name: "Romaine Lettuce",
    basePrice: 22.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Romain.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Romaine",
  },
  {
    name: "Iceberg Lettuce",
    basePrice: 30.25,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Iceberg+Lettuce.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Iceberg",
  },
  {
    name: "Butterhead Lettuce",
    basePrice: 33.75,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/butterhead.jpg",
    isPositive: true,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Butterhead",
  },
  {
    name: "Loose Leaf Lettuce",
    basePrice: 31.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Loose+Leaf+Lettuce.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Loose Leaf",
  },
  {
    name: "Arugula",
    basePrice: 32.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Arugula+(Rocket).webp",
    isPositive: false,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Rocket",
  },
  {
    name: "Swiss Chard",
    basePrice: 22.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Swiss+Chard.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Beta vulgaris",
  },
  {
    name: "Bok Choy",
    basePrice: 23.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Bok+Choy.webp",
    isPositive: false,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Pak Choi",
  },
  {
    name: "Endive",
    basePrice: 24.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/EndiveCichorium+endivia.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Cichorium endivia",
  },
  {
    name: "Watercress",
    basePrice: 23.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Watercress-spouts-640.webp",
    isPositive: false,
    systemType: "NFT",
    category: "Leafy Greens",
    variety: "Nasturtium officinale",
  },
  {
    name: "Basil",
    basePrice: 15.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Basil.jpg",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Basil",
  },
  {
    name: "Cilantro",
    basePrice: 14.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Cilantro.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Coriander",
  },
  {
    name: "Parsley",
    basePrice: 13.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/parsley.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Parsley",
  },
  {
    name: "Mint",
    basePrice: 15.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/pepperminit.jpg",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Peppermint",
  },
  {
    name: "Mint",
    basePrice: 15.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Spearmint.jpg",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Spearmint",
  },
  {
    name: "Thyme",
    basePrice: 16.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Thyme-Bundle.jpg",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Thyme",
  },
  {
    name: "Dill",
    basePrice: 14.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Dill.jpg",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Dill",
  },
  {
    name: "Chives",
    basePrice: 13.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Chives.png",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Chives",
  },
  {
    name: "Oregano",
    basePrice: 14.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Oregano.jpeg",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Oregano",
  },
  {
    name: "Sage",
    basePrice: 15.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Sage.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Sage",
  },
  {
    name: "Rosemary",
    basePrice: 16.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Rosemary.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Rosemary",
  },
  {
    name: "Tarragon",
    basePrice: 14.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Tarragon.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Tarragon",
  },
  {
    name: "Lemon Balm",
    basePrice: 13.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/lemonbalm.jpeg",
    isPositive: true,
    systemType: "NFT",
    category: "Herbs",
    variety: "Lemon Balm",
  },
  {
    name: "Albion",
    basePrice: 18.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Albion+strawberries.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Fruits",
    variety: "Strawberry",
  },
  {
    name: "Dwarf Cherry Tomatoes",
    basePrice: 16.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Dwarf-Cherry-Tomato-Rosie-F1-Hybrid.jpeg",
    isPositive: true,
    systemType: "NFT",
    category: "Small Fruiting Plants",
    variety: "Cherry Tomatoes",
  },
  {
    name: "Dwarf Peppers",
    basePrice: 15.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Mck_Vegetable_128571_Pepper_MiniBellMix.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Small Fruiting Plants",
    variety: "Mini Bell Peppers",
  },
  {
    name: "Dwarf Peppers",
    basePrice: 15.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/jalapeno1-700x700.webp",
    isPositive: true,
    systemType: "NFT",
    category: "Small Fruiting Plants",
    variety: "Jalapeños",
  },
  {
    name: "Tomatoes",
    basePrice: 14.5,
    img: TomatoImage,
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Indeterminate",
  },
  {
    name: "Peppers",
    basePrice: 15.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Cayenne.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Cayenne",
  },
  {
    name: "Eggplants",
    basePrice: 13.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/eggplants.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Eggplants",
  },
  {
    name: "Cucumbers",
    basePrice: 12.5,
    img: CucumberImage,
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Cucumbers",
  },
  {
    name: "Zucchini",
    basePrice: 13.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/courgette-large.jpg",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Courgettes",
  },
  {
    name: "Squash",
    basePrice: 14.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Butternut+Squash.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Butternut",
  },
  {
    name: "Squash",
    basePrice: 14.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Squash+(Pumpkin).webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Pumpkin",
  },
  {
    name: "Squash",
    basePrice: 14.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Acorn+Squash.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Fruiting Vegetables",
    variety: "Acorn",
  },
  {
    name: "Green Beans",
    basePrice: 11.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/farmscart-beans-polesuper.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Legumes & Climbing Plants",
    variety: "Pole Beans",
  },
  {
    name: "Green Beans",
    basePrice: 11.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/aeroponic-bush-beans-seedlings_900x.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Legumes & Climbing Plants",
    variety: "Bush Beans",
  },
  {
    name: "Peas",
    basePrice: 12.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Snow+Peas.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Legumes & Climbing Plants",
    variety: "Snow Peas",
  },
  {
    name: "Peas",
    basePrice: 12.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Sugar+Snap+Peas.jpg",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Legumes & Climbing Plants",
    variety: "Sugar Snap Peas",
  },
  {
    name: "Cantaloupe",
    basePrice: 14.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Cantaloupe.jpg",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Melons & Gourds",
    variety: "Cantaloupe",
  },
  {
    name: "Watermelon",
    basePrice: 16.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Dwarf.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Melons & Gourds",
    variety: "Compact",
  },

  {
    name: "Honeydew Melon",
    basePrice: 15.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/Honeydew+Melon.jpg",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Melons & Gourds",
    variety: "Honeydew Melon",
  },
  {
    name: "Carrots",
    basePrice: 9.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/CarrotsParisian18085.png",
    isPositive: false,
    systemType: "Dutch Bucket",
    category: "Root Vegetables",
    variety: "Parisian",
  },
  {
    name: "Beets",
    basePrice: 8.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/beet.webp",
    isPositive: false,
    systemType: "Dutch Bucket",
    category: "Root Vegetables",
    variety: "Beets",
  },
  {
    name: "Radishes",
    basePrice: 7.5,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/radish_GyJvfNq_.jpg",
    isPositive: false,
    systemType: "Dutch Bucket",
    category: "Root Vegetables",
    variety: "Radishes",
  },
  {
    name: "Turnips",
    basePrice: 8.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/turnip.webp",
    isPositive: false,
    systemType: "Dutch Bucket",
    category: "Root Vegetables",
    variety: "Turnips",
  },
  {
    name: "Ginger",
    basePrice: 18.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/ginger-root.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Medicinal & Specialty Plants",
    variety: "Ginger",
  },
  {
    name: "Turmeric",
    basePrice: 20.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/turmeric_header.png",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Medicinal & Specialty Plants",
    variety: "Turmeric",
  },
  {
    name: "Saffron",
    basePrice: 150.0,
    img: "https://dev-gemfarm.s3.us-east-1.amazonaws.com/images/benefits-of-saffron.webp",
    isPositive: true,
    systemType: "Dutch Bucket",
    category: "Medicinal & Specialty Plants",
    variety: "Saffron",
  },
].map((item) => {
  const marketData = generateMarketData(item.basePrice, 30);

  // Find the high price of the previous day
  const previousDayHigh =
    marketData.length > 1 ? marketData[marketData.length - 2].high : null;

  return {
    ...item,
    marketData,
    previousDayHigh,
  };
});
export default function CropsList({ toogle }: { toogle: boolean }) {
  const [viewMode, setViewMode] = useState("graph"); // 'graph' or 'table'
  const [showFinancials, setShowFinancials] = useState(false);
  const [selectedItemForBuy, setSelectedItemForBuy] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState<
    "systemType" | "category" | "name" | "variety"
  >("systemType");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeView, setActiveView] = useState("All");

  useEffect(() => {
    if (!toogle) {
      setSortBy("systemType");
      setShowSortMenu(false);
      setActiveView("All");
    }
  }, [toogle]);

  // Close sort menu on scroll
  useEffect(() => {
    const handleCloseSortMenu = () => {
      setShowSortMenu(false);
    };

    // Attach listener to window
    window.addEventListener("closeSortMenu", handleCloseSortMenu);

    return () => {
      window.removeEventListener("closeSortMenu", handleCloseSortMenu);
    };
  }, []);

  // System configuration and costs
  const SYSTEM_COSTS = {
    base: 15000,
    installation: 2000,
    maintenance: 500,
  };

  const yearlyYields = {
    Strawberry: 2000,
    Peas: 3000,
    Jalapenos: 2500,
    Lettuce: 4000,
    Tomato: 3500,
    Cucumbers: 3000,
    "Romaine Lettuce": 4000,
    "Iceberg Lettuce": 3500,
    "Butterhead Lettuce": 3200,
    "Loose Leaf Lettuce": 3400,
    Arugula: 2900,
    "Swiss Chard": 2700,
    "Bok Choy": 3100,
    Endive: 2600,
    Watercress: 2500,
    Basil: 3000,
    Cilantro: 2800,
    Parsley: 2700,
    Mint: 2500, // Same name appears twice; consider unique identifiers (e.g., Peppermint, Spearmint)
    Thyme: 2600,
    Dill: 2500,
    Chives: 2400,
    Oregano: 2300,
    Sage: 2500,
    Rosemary: 2600,
    Tarragon: 2400,
    "Lemon Balm": 2200,
    Albion: 1800,
    "Dwarf Cherry Tomatoes": 2100,
    Paprika: 2000,
    "Sweet Potato": 1900,
    "Red Onion": 1800,
    "Green Onion": 1700,
    "Yellow Onion": 1600,
    Zucchini: 1500,
    Cabbage: 1400,
    "Green Beans": 1300,
    Broccoli: 1200,
    Corn: 1100,
    Kale: 1000,
    "Sweet Corn": 800,
    Eggplants: 700,
    Cauliflower: 600,
    "Dwarf Peppers": 1000,
    Squash: 1500,
    Watermelon: 1000,
    "Honeydew Melon": 1000,
    Carrots: 600,
    Beets: 800,
    Radishes: 5000,
    Turnips: 700,
    Ginger: 1000,
    Turmeric: 1200,
    Saffron: 1500,
    Tomatoes: 3500,
    Peppers: 2500,
    Cantaloupe: 1000,
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
                      <p className="text-xl font-bold">1.00rem
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
                              {year.year}
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

  const processedCrops = items
    .filter((item) => {
      if (activeView === "All") return true;
      if (activeView === "NFT") return item.systemType === "NFT";
      if (activeView === "Dutch Bucket")
        return item.systemType === "Dutch Bucket";
      return false;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "systemType":
          return a.systemType.localeCompare(b.systemType);
        case "category":
          return a.category.localeCompare(b.category);
        case "name":
          return a.name.localeCompare(b.name);
        case "variety":
          return a.variety.localeCompare(b.variety);
        default:
          return 0;
      }
    });

  return (
    <>
      {/* <div className="bg-white relative min-h-[calc(100vh-52px)] overflow-auto md:max-w-[375px] md:mx-auto"> */}
      <div className="pt-0">
        <div className="flex items-center mb-2">
          <div className="w-full">
            <div className="flex gap-4 mt-4 mb-1 text-sm">
              <button
                onClick={() => {
                  setActiveView("All");
                  setShowSortMenu(false);
                }}
                className={`flex-1 rounded-lg font-medium border transition-colors ${
                  activeView === "All"
                    ? "bg-primary text-white"
                    : "bg-white/10 text-black"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setActiveView("NFT");
                  setShowSortMenu(false);
                }}
                className={`flex-1 rounded-lg font-medium border transition-colors ${
                  activeView === "NFT"
                    ? "bg-primary text-white"
                    : "bg-white/10 text-black"
                }`}
              >
                NFT
              </button>
              <button
                onClick={() => {
                  setActiveView("Dutch Bucket");
                  setShowSortMenu(false);
                }}
                className={`flex-1 rounded-lg font-medium border transition-colors ${
                  activeView === "Dutch Bucket"
                    ? "bg-primary text-white"
                    : "bg-white/10 text-black"
                }`}
              >
                Dutch Bucket
              </button>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1 p-[5px] bg-white border rounded-lg shadow-sm hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Sort by</span>
              </button>
            </div>

            {showSortMenu && (
              <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg border z-50 mr-[1.00rem]">
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      sortBy === "systemType" ? "bg-blue-50 text-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSortBy("systemType");
                      setShowSortMenu(false);
                    }}
                  >
                    System Type
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      sortBy === "category" ? "bg-blue-50 text-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSortBy("category");
                      setShowSortMenu(false);
                    }}
                  >
                    Crop Category
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      sortBy === "name" ? "bg-blue-50 text-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSortBy("name");
                      setShowSortMenu(false);
                    }}
                  >
                    Crop Name
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      sortBy === "variety" ? "bg-blue-50 text-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSortBy("variety");
                      setShowSortMenu(false);
                    }}
                  >
                    Crop Variety
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {processedCrops.map((item, i) => (
          <div
            key={i}
            className="bg-bglight mb-[14px] border border-solid border-borderColor rounded-[10px] p-2.5"
          >
            <div
              className="grid-cols-[1fr_48px_60px] grid gap-2 items-center"
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="block w-[50px] min-w-[50px] rounded-sm h-[50px]"
                />
                <div>
                  <p className="text-sm text-black font-semibold mb-1 truncate max-w-[130px]">
                    {item.name}
                    <span className="text-sm text-gray-500">
                      ({item.variety})
                    </span>
                  </p>
                  <div className="text-xs text-gray-600">
                    <span className="block">{item.systemType}</span>
                    <span className="block">• {item.category}</span>
                  </div>
                  <button
                    className={`text-xs font-semibold border-none cursor-pointer py-[5px] px-2.5 rounded-sm ${
                      item.isPositive
                        ? "text-green bg-[#E6F4EE]"
                        : "text-[#FF4747] bg-[#FAE8E8]"
                    }`}
                  >
                    ${item.previousDayHigh}
                  </button>
                </div>
              </div>
              {item.isPositive ? <LineChartIcon /> : <LineChartRed />}
              <div>
                <button
                  className="py-2.5 px-4 bg-primary text-white text-sm font-medium border-none rounded-full"
                  onClick={(e) => handleBuyClick(item, e)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
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
                        {selectedItem.marketData
                          .sort(
                            (a, b) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime()
                          )
                          .map((data, index) => (
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
    </>
  );
}
