import { Card, CardContent } from "./card";


interface SensorCardProps {
  name: string;
  icon: string;
  value: number;
  unit: string;
  color: string;
}

const SensorCard = ({ name, icon, value, unit, color }: SensorCardProps) => {
  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">{icon}</span>
            </div>
            <div>
              <div className={`font-semibold ${color}`}>{name}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-6 bg-green-100 rounded flex items-center justify-center">
              <svg className="w-8 h-4 text-green-500" viewBox="0 0 32 16" fill="none">
                <path d="M2 14L8 8L14 12L22 4L30 10" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{value} {unit}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
