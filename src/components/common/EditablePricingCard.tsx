import { Leaf, Edit3, Save, X } from "lucide-react";
import { formatCurrency, Product, SALES_CHANNELS } from "../utils/utils";
import { useState } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import Button from "./button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface EditablePricingCardProps {
  product: Product;
  onUpdate: (product: Product) => void;
}

const EditablePricingCard: React.FC<EditablePricingCardProps> = ({
  product,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = () => {
    onUpdate(editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const updatePrice = (channel: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setEditedProduct((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [channel]: numValue,
      },
    }));
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green" />
            {isEditing ? (
              <Input
                value={editedProduct.name}
                onChange={(e:any) =>
                  setEditedProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="text-lg font-semibold"
              />
            ) : (
              product.name
            )}
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} green>
                <Edit3 className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} green>
                  <Save className="h-4 w-4" />
                </Button>
                <Button onClick={handleCancel} green>
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm text-black font-medium text-muted-foreground">Pricing per kg</div>

        <div className="space-y-2">
          {SALES_CHANNELS.map((channel) => (
            <div
              key={channel.key}
              className="flex justify-between items-center"
            >
              <span className="text-sm text-black font-medium">{channel.label}</span>
              {isEditing ? (
                <Input
                  type="number"
                  step="0.01"
                  value={editedProduct.pricing[channel.key]}
                  onChange={(e:any) => updatePrice(channel.key, e.target.value)}
                  className="w-20 h-8  text-right"
                />
              ) : (
                <Badge  className="font-semibold">
                  {formatCurrency(product.pricing[channel.key])}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditablePricingCard;
