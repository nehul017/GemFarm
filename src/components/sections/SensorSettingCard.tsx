"use client";
import Button from "../common/button";
import { Card, CardContent, CardHeader, CardTitle } from "../common/card";
import Input from "../common/Input";

// Required only if using App Router and React hooks inside this component

interface SensorSettings {
  id: string;
  name: string;
  icon: string;
  currentValue: number;
  requiredValue: number;
  minValue: number;
  maxValue: number;
  unit: string;
  color: string;
}

interface SensorSettingCardProps {
  sensor: SensorSettings;
  onUpdate: (
    sensorId: string,
    field: keyof SensorSettings,
    value: number
  ) => void;
  onSave: () => void;
}

const SensorSettingCard = ({
  sensor,
  onUpdate,
  onSave,
}: SensorSettingCardProps) => {
  const handleInputChange = (field: keyof SensorSettings, value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      onUpdate(sensor.id, field, numericValue);
    }
  };

  const getStatusColor = () => {
    if (
      sensor.currentValue < sensor.minValue ||
      sensor.currentValue > sensor.maxValue
    ) {
      return "text-red-600 bg-red-50";
    }
    if (
      Math.abs(sensor.currentValue - sensor.requiredValue) /
        sensor.requiredValue >
      0.1
    ) {
      return "text-yellow-600 bg-yellow-50";
    }
    return "text-green bg-[#dcfce7]";
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">{sensor.icon}</span>
          </div>
          <div>
            <div className={`text-lg font-semibold ${sensor.color}`}>
              {sensor.name}
            </div>
            <div className="text-sm text-gray-500">Unit: {sensor.unit}</div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Value (Read-only) */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">
            Current Value
          </span>
          <div className={`px-3 py-2 rounded-md border-2 ${getStatusColor()}`}>
            <span className="font-semibold">
              {sensor.currentValue} {sensor.unit}
            </span>
          </div>
        </div>

        {/* Required Value */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">
            Required Value
          </span>
          <Input
            id={`required-${sensor.id}`}
            type="number"
            step="0.01"
            value={sensor.requiredValue}
            onChange={(e: any) =>
              handleInputChange("requiredValue", e.target.value)
            }
            className="w-full"
          />
        </div>

        {/* Min and Max Values */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700">
              Minimum Value
            </span>
            <Input
              id={`min-${sensor.id}`}
              type="number"
              step="0.01"
              value={sensor.minValue}
              onChange={(e: any) =>
                handleInputChange("minValue", e.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700">
              Maximum Value
            </span>
            <Input
              id={`max-${sensor.id}`}
              type="number"
              step="0.01"
              value={sensor.maxValue}
              onChange={(e: any) =>
                handleInputChange("maxValue", e.target.value)
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
            >
              {sensor.currentValue < sensor.minValue
                ? "Below Min"
                : sensor.currentValue > sensor.maxValue
                ? "Above Max"
                : Math.abs(sensor.currentValue - sensor.requiredValue) /
                    sensor.requiredValue >
                  0.1
                ? "Off Target"
                : "Optimal"}
            </span>
          </div>
        </div>
        <Button green onClick={onSave}>
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default SensorSettingCard;
