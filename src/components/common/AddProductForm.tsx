
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Product, SALES_CHANNELS } from '../utils/utils';
import Button from './button';
import { Input } from '../ui/input';


interface AddProductFormProps {
  onAdd: (product: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    pricing: {
      wholesaleToDistributors: 0,
      wholesaleToRetail: 0,
      directToConsumer: 0
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name.trim()) return;

    const product: Product = {
      id: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      name: newProduct.name,
      pricing: newProduct.pricing
    };

    onAdd(product);
    
    // Reset form
    setNewProduct({
      name: '',
      pricing: {
        wholesaleToDistributors: 0,
        wholesaleToRetail: 0,
        directToConsumer: 0
      }
    });
    setIsOpen(false);
  };

  const updatePrice = (channel: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setNewProduct(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [channel]: numValue
      }
    }));
  };

  if (!isOpen) {
    return (
      <Card className="w-full border-dashed border-2 hover:border-green-300 transition-colors bg-white">
        <CardContent className="flex items-center justify-center py-8">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-green-600"
            
          >
            <Plus className="h-5 w-5" />
            Add New Product
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-green-600" />
          Add New Product
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <span >Product Name</span>
            <Input
              id="productName"
              value={newProduct.name}
              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
              className="mt-1"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">Pricing per kg</div>
            {SALES_CHANNELS.map((channel) => (
              <div key={channel.key}>
                <span className="text-sm">
                  {channel.label}
                </span>
                <Input
                  id={channel.key}
                  type="number"
                  step="0.01"
                  value={newProduct.pricing[channel.key]}
                  onChange={(e) => updatePrice(channel.key, e.target.value)}
                  placeholder="0.00"
                  className="mt-1"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button type="submit"  green>
              Add Product
            </Button>
            <Button
              type="button"
              green
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;