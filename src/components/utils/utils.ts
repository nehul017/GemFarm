import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export interface Product {
  unit?: any;
  id: string;
  name: string;
  pricing: {
    wholesaleToDistributors: number;
    wholesaleToRetail: number;
    directToConsumer: number;
  };
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  salesChannel: 'wholesaleToDistributors' | 'wholesaleToRetail' | 'directToConsumer';
  quantity: number; // in kg
  pricePerKg: number;
  totalRevenue: number;
  date: Date;
  customerName?: string;
}

export interface SalesChannel {
  key: 'wholesaleToDistributors' | 'wholesaleToRetail' | 'directToConsumer';
  label: string;
}

export interface PricingData {
  productId: string;
  month: string;
  week: number;
  wholesaleDistributor: number;
  wholesaleRetail: number;
  directConsumer: number;
  costs: {
    production: number;
    labor: number;
    packaging: number;
    distribution: number;
  };
}

export interface WeeklyData {
  id: string;
  week: string; // Format: "2024-W01"
  date: Date;
  income: number;
  expenses: number;
  profit: number;
  description?: string;
}

export interface MonthlyPNL {
  month: string; // Format: "2024-01"
  totalIncome: number;
  totalExpenses: number;
  totalProfit: number;
  weeklyData: WeeklyData[];
}

// Generate mock financial data for PnL display
export type MonthData = {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
};

export type PnLData = {
  year: number;
  monthlyData: MonthData[];
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  averageProfitMargin: number;
};

export type ExpenseCategory = {
  category: string;
  amount: number;
  percentage: number;
};

export type RevenueStream = {
  stream: string;
  amount: number;
  percentage: number;
};

export type DetailedPnLData = PnLData & {
  expenseCategories: ExpenseCategory[];
  revenueStreams: RevenueStream[];
};

const months = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", 
  "September", "October", "November", "December"
];

// Generate random data within a reasonable range
export const generateMockPnLData = (year: number = 2025): DetailedPnLData => {
  const monthlyData: MonthData[] = [];
  let totalRevenue = 0;
  let totalExpenses = 0;
  
  for (let i = 0; i < 12; i++) {
    // Generate revenue between $8,000 and $15,000
    const revenue = Math.floor(Math.random() * 7000) + 8000;
    
    // Generate expenses between 60% and 90% of revenue
    const expenseRatio = Math.random() * 0.3 + 0.6;
    const expenses = Math.floor(revenue * expenseRatio);
    
    const profit = revenue - expenses;
    const profitMargin = (profit / revenue) * 100;
    
    monthlyData.push({
      month: months[i],
      revenue,
      expenses,
      profit,
      profitMargin
    });
    
    totalRevenue += revenue;
    totalExpenses += expenses;
  }
  
  const totalProfit = totalRevenue - totalExpenses;
  const averageProfitMargin = (totalProfit / totalRevenue) * 100;
  
  // Generate expense categories
  const expenseCategories: ExpenseCategory[] = [
    { category: "Seeds & Plants", amount: 0, percentage: 0 },
    { category: "Fertilizers", amount: 0, percentage: 0 },
    { category: "Pesticides", amount: 0, percentage: 0 },
    { category: "Labor", amount: 0, percentage: 0 },
    { category: "Equipment", amount: 0, percentage: 0 },
    { category: "Fuel", amount: 0, percentage: 0 },
    { category: "Utilities", amount: 0, percentage: 0 },
    { category: "Other", amount: 0, percentage: 0 }
  ];
  
  // Assign random percentages to expense categories
  let remainingPercentage = 100;
  for (let i = 0; i < expenseCategories.length - 1; i++) {
    const maxPercentage = remainingPercentage - (expenseCategories.length - i - 1);
    const percentage = i === expenseCategories.length - 2 
      ? remainingPercentage 
      : Math.floor(Math.random() * Math.min(maxPercentage, 30)) + 5;
    
    expenseCategories[i].percentage = percentage;
    expenseCategories[i].amount = Math.floor((percentage / 100) * totalExpenses);
    remainingPercentage -= percentage;
  }
  
  expenseCategories[expenseCategories.length - 1].percentage = remainingPercentage;
  expenseCategories[expenseCategories.length - 1].amount = 
    Math.floor((remainingPercentage / 100) * totalExpenses);
  
  // Generate revenue streams
  const revenueStreams: RevenueStream[] = [
    { stream: "Crops", amount: 0, percentage: 0 },
    { stream: "Livestock", amount: 0, percentage: 0 },
    { stream: "Dairy", amount: 0, percentage: 0 },
    { stream: "Government Subsidies", amount: 0, percentage: 0 },
    { stream: "Other", amount: 0, percentage: 0 }
  ];
  
  // Assign random percentages to revenue streams
  remainingPercentage = 100;
  for (let i = 0; i < revenueStreams.length - 1; i++) {
    const maxPercentage = remainingPercentage - (revenueStreams.length - i - 1);
    const percentage = i === revenueStreams.length - 2 
      ? remainingPercentage 
      : Math.floor(Math.random() * Math.min(maxPercentage, 40)) + 10;
    
    revenueStreams[i].percentage = percentage;
    revenueStreams[i].amount = Math.floor((percentage / 100) * totalRevenue);
    remainingPercentage -= percentage;
  }
  
  revenueStreams[revenueStreams.length - 1].percentage = remainingPercentage;
  revenueStreams[revenueStreams.length - 1].amount = 
    Math.floor((remainingPercentage / 100) * totalRevenue);
  
  return {
    year,
    monthlyData,
    totalRevenue,
    totalExpenses,
    totalProfit,
    averageProfitMargin,
    expenseCategories,
    revenueStreams
  };
};

export const mockPnLData = generateMockPnLData();




export const SALES_CHANNELS: SalesChannel[] = [
  { key: 'wholesaleToDistributors', label: 'Wholesale to Distributors' },
  { key: 'wholesaleToRetail', label: 'Wholesale to Retail' },
  { key: 'directToConsumer', label: 'Direct to Consumer' }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'strawberries',
    name: 'Strawberries',
    pricing: {
      wholesaleToDistributors: 7.00,
      wholesaleToRetail: 8.50,
      directToConsumer: 10.00
    },
    unit: undefined
  },
  {
    id: 'jalapenos',
    name: 'Jalapenos',
    pricing: {
      wholesaleToDistributors: 4.00,
      wholesaleToRetail: 6.50,
      directToConsumer: 9.00
    },
    unit: undefined
  }
];

export const calculateSaleTotal = (quantity: number, pricePerKg: number): number => {
  return quantity * pricePerKg;
};

export const getPriceForChannel = (product: Product, channel: string): number => {
  return product.pricing[channel as keyof typeof product.pricing];
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const groupSalesByProduct = (sales: Sale[]) => {
  const grouped = sales.reduce((acc, sale) => {
    if (!acc[sale.productName]) {
      acc[sale.productName] = {
        totalQuantity: 0,
        totalRevenue: 0,
        sales: []
      };
    }
    acc[sale.productName].totalQuantity += sale.quantity;
    acc[sale.productName].totalRevenue += sale.totalRevenue;
    acc[sale.productName].sales.push(sale);
    return acc;
  }, {} as Record<string, { totalQuantity: number; totalRevenue: number; sales: Sale[] }>);

  return grouped;
};


export const calculateProfit = (income: number, expenses: number): number => {
  return income - expenses;
};

export const getWeekString = (date: Date): string => {
  const year = date.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
};

export const getMonthString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
};

export const generateMonthlyPNL = (sales: Sale[], monthlyExpenses: { [key: string]: number } = {}): MonthlyPNL[] => {
  const monthlyData: { [key: string]: MonthlyPNL } = {};

  sales.forEach((sale) => {
    const monthKey = getMonthString(sale.date);
    const weekKey = getWeekString(sale.date);

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        totalIncome: 0,
        totalExpenses: 0,
        totalProfit: 0,
        weeklyData: []
      };
    }

    // Calculate monthly income first to determine default expenses
    monthlyData[monthKey].totalIncome += sale.totalRevenue;
  });

  // Second pass to calculate expenses and profits
  sales.forEach((sale) => {
    const monthKey = getMonthString(sale.date);
    const weekKey = getWeekString(sale.date);

    // Use custom monthly expenses if provided, otherwise default to 60% of total monthly revenue
    const customExpenses = monthlyExpenses[monthKey];
    const defaultExpenses = monthlyData[monthKey].totalIncome * 0.6;
    const totalMonthlyExpenses = customExpenses !== undefined ? customExpenses : defaultExpenses;
    
    // Calculate proportional expenses for this sale
    const saleProportionOfMonth = sale.totalRevenue / monthlyData[monthKey].totalIncome;
    const expenses = totalMonthlyExpenses * saleProportionOfMonth;
    
    const profit = sale.totalRevenue - expenses;

    monthlyData[monthKey].totalExpenses += expenses;
    monthlyData[monthKey].totalProfit += profit;

    // Check if we already have data for this week
    let weekData = monthlyData[monthKey].weeklyData.find(w => w.week === weekKey);
    if (!weekData) {
      weekData = {
        id: `${monthKey}-${weekKey}`,
        week: weekKey,
        date: sale.date,
        income: 0,
        expenses: 0,
        profit: 0,
        description: `Week ${weekKey.split('-W')[1]}`
      };
      monthlyData[monthKey].weeklyData.push(weekData);
    }

    weekData.income += sale.totalRevenue;
    weekData.expenses += expenses;
    weekData.profit += profit;
  });

  return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
};