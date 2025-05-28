import React, { useEffect, useState } from "react";
import { DEFAULT_PRODUCTS, getMonthString, MonthlyPNL, PnLData, Product, Sale } from "../utils/utils";
import { Leaf } from "lucide-react";
import EditablePricingCard from "../common/EditablePricingCard";
import AddProductForm from "../common/AddProductForm";
import SalesForm from "../common/SalesForm";
import MonthlyExpensesManager from "../common/MonthlyExpensesManager";

type PnLDetailFormProps = {
  data: PnLData;
  onDataUpdate: (updatedData: PnLData) => void;
};

const PnLDetailForm: React.FC<PnLDetailFormProps> = ({
  data,
  onDataUpdate,
}) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [sales, setSales] = useState<Sale[]>([]);
  const [monthlyPNLData, setMonthlyPNLData] = useState<MonthlyPNL[]>([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const savedProducts = localStorage.getItem("smart-farming-products");
    const savedSales = localStorage.getItem("smart-farming-sales");

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Error loading saved products:", error);
      }
    }

    if (savedSales) {
      try {
        const parsed = JSON.parse(savedSales);
        const salesWithDates = parsed.map((sale: any) => ({
          ...sale,
          date: new Date(sale.date),
        }));
      } catch (error) {
        console.error("Error loading saved sales:", error);
      }
    }
  }, []);

  // Save to localStorage when products or sales change
  useEffect(() => {
    localStorage.setItem("smart-farming-products", JSON.stringify(products));
  }, [products]);

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    // toast({
    //   title: "Product Updated",
    //   description: `${updatedProduct.name} pricing has been updated`,
    // });
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    // toast({
    //   title: "Product Added",
    //   description: `${newProduct.name} has been added to your products`,
    // });
  };

  const handleAddSale = (newSale: Sale) => {
    setSales((prev) => [...prev, newSale]);
    // toast({
    //   title: "Sale Recorded Successfully",
    //   description: `${newSale.quantity}kg of ${newSale.productName} sold for ${newSale.totalRevenue.toFixed(2)}`,
    // });
  };


  const availableMonths = [...new Set(sales.map(sale => getMonthString(sale.date)))].sort();
    // Calculate monthly revenues for the expense manager
    const monthlyRevenues = availableMonths.reduce((acc, month) => {
      const monthSales = sales.filter(sale => getMonthString(sale.date) === month);
      acc[month] = monthSales.reduce((sum, sale) => sum + sale.totalRevenue, 0);
      return acc;
    }, {} as { [key: string]: number });

  return (
    <div className="min-h-screen bg-gradient-to-r from-green50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-2 mt-5">
          <p className="text-black">
            Manage your farm products, pricing, and sales
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          {/* Monthly Expenses Manager */}
          <MonthlyExpensesManager
            monthlyExpenses={monthlyExpenses}
            onUpdate={setMonthlyExpenses}
            availableMonths={availableMonths}
            monthlyRevenues={monthlyRevenues}
          />
        </div>
        {/* Product Pricing Section */}
        <div className="space-y-4 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <EditablePricingCard
                key={product.id}
                product={product}
                onUpdate={handleUpdateProduct}
              />
            ))}
            <AddProductForm onAdd={handleAddProduct} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          {/* Sales Form */}
          <div className="lg:col-span-1">
            <SalesForm products={products} onAddSale={handleAddSale} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnLDetailForm;
