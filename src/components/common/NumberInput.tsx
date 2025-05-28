
import { Minus, Plus } from 'lucide-react';

interface NumberInputProps {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    disabled?: boolean;
  }
  
  export function NumberInput({
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    unit,
    disabled = false,
  }: NumberInputProps) {
    const increment = () => {
      if (value + step <= max) {
        onValueChange(value + step);
      }
    };
  
    const decrement = () => {
      if (value - step >= min) {
        onValueChange(value - step);
      }
    };
  
    return (
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white min-w-[80px] mr-2">
          <span className="text-base font-medium text-gray-900">{value}</span>
          {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={decrement}
            disabled={disabled || value <= min}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center disabled:opacity-50"
          >
            <Minus size={18} color="white" />
          </button>
          <button
            onClick={increment}
            disabled={disabled || value >= max}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center disabled:opacity-50"
          >
            <Plus size={18} color="white" />
          </button>
        </div>
      </div>
    );
  }
  