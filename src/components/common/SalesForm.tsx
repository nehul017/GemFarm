import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CustomSearchSelect, {
  OptionType,
} from "../common/CustomSelectSearch/SelectOption";
import {
  calculateSaleTotal,
  getPriceForChannel,
  SALES_CHANNELS,
} from "../utils/utils";
import { ShoppingCart } from "lucide-react";
import { Product, Sale } from "../utils/utils";
import Button from "./button";

interface SalesFormProps {
  products: Product[];
  onAddSale: (sale: Sale) => void;
}

const SalesForm: React.FC<SalesFormProps> = ({ products, onAddSale }) => {
  const [selectedProductId, setSelectedProductId] = useState("");
  console.log('selectedProductId', selectedProductId)
  const [salesChannel, setSalesChannel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [customerName, setCustomerName] = useState("");

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const pricePerKg =
    selectedProduct && salesChannel
      ? getPriceForChannel(selectedProduct, salesChannel)
      : 0;
  const totalRevenue = quantity
    ? calculateSaleTotal(parseFloat(quantity), pricePerKg)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || !salesChannel || !quantity) return;

    const newSale: Sale = {
      id: `${Date.now()}-${Math.random()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      salesChannel: salesChannel as any,
      quantity: parseFloat(quantity),
      pricePerKg,
      totalRevenue,
      date: new Date(),
      customerName: customerName.trim() || undefined,
    };

    onAddSale(newSale);

    // Reset form
    setSelectedProductId("");
    setSalesChannel("");
    setQuantity("");
    setCustomerName("");
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Record Sale
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <CustomSearchSelect
              label="Product"
              options={products.map((product) => ({
                value: product.id,
                label: product.name,
              }))}
              value={
                selectedProductId
                  ? products
                      .map((product) => ({
                        value: product.id,
                        label: product.name,
                      }))
                      .find((p: any) => p.value === selectedProductId) || null
                  : null
              }
              onChange={(selected) =>
                setSelectedProductId(selected?.value || "")
              }
              placeholder="Select product"
              required
            />
          </div>

          <div>
            <CustomSearchSelect
              label="Sales Channel"
              options={SALES_CHANNELS.map((channel) => ({
                value: channel.key,
                label: channel.label,
              }))}
              value={
                salesChannel
                  ? SALES_CHANNELS.map((channel) => ({
                    value: channel.key,
                    label: channel.label,
                  })).find((c: any) => c.value === salesChannel) || null
                  : null
              }
              onChange={(selected) => setSalesChannel(selected?.value || "")}
              placeholder="Select channel"
              required
            />
          </div>

          <div>
          <label className="text-sm text-black font-medium block pb-2">
            Quantity (kg)
          </label>
            <Input
              id="quantity"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-black font-medium block pb-2">
              Customer Name (Optional)
            </label>
            <Input
              id="customer"
              type="text"
              placeholder="Customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1"
            />
          </div>

          {selectedProduct && salesChannel && quantity && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <label className="text-sm text-black font-medium block pb-2">
                    Price per kg:
                  </label>
                  <span className="font-semibold">
                    ${pricePerKg.toFixed(2)}
                  </span>   
                </div>
                <div className="flex justify-between">
                  <label className="text-sm text-black font-medium block pb-2">
                    Quantity:
                  </label>
                  <span className="font-semibold">{quantity} kg</span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <label className="text-sm text-black font-medium block pb-2">
                    Total Revenue:
                  </label>
                  <span className="font-bold text-green-600">
                    ${totalRevenue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={!selectedProduct || !salesChannel || !quantity}
          >
            Record Sale
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SalesForm;
