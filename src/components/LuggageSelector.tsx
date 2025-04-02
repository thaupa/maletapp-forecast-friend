
import React from 'react';
import { cn } from '@/lib/utils';
import { LUGGAGE_TYPES } from '@/data/mockData';
import { LuggageType } from '@/types';
import { 
  Backpack, 
  BaggageClaim,
  Weight
} from 'lucide-react';

interface LuggageSelectorProps {
  selected: LuggageType | null;
  onSelect: (type: LuggageType) => void;
}

const LuggageSelector: React.FC<LuggageSelectorProps> = ({ selected, onSelect }) => {
  const getIcon = (type: LuggageType) => {
    switch(type) {
      case 'backpack':
        return <Backpack size={48} className="text-maletapp-blue" />;
      case 'small':
        return <BaggageClaim size={40} className="text-maletapp-blue" />;
      case 'medium':
        return <BaggageClaim size={48} className="text-maletapp-blue" />;
      case 'large':
        return <BaggageClaim size={56} className="text-maletapp-blue" />;
      default:
        return <BaggageClaim size={48} className="text-maletapp-blue" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {LUGGAGE_TYPES.map((luggage) => (
        <div
          key={luggage.type}
          className={cn(
            "luggage-card border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors",
            selected === luggage.type 
              ? "border-maletapp-blue bg-blue-50" 
              : "border-gray-200 hover:border-maletapp-blue hover:bg-blue-50/50"
          )}
          onClick={() => onSelect(luggage.type)}
        >
          {getIcon(luggage.type)}
          <span className="text-sm font-medium mt-2">{luggage.name}</span>
          <span className="text-xs text-gray-500 text-center mt-1">
            {luggage.dimensions.width} x {luggage.dimensions.height} x {luggage.dimensions.depth} cm
          </span>
          <div className="flex items-center justify-between w-full mt-1 px-2">
            <span className="text-xs text-gray-600 font-semibold flex items-center">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
              {(luggage.usableVolume / 1000).toFixed(1)}L
            </span>
            <span className="text-xs text-gray-600 font-semibold flex items-center">
              <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
              {luggage.maxWeight}kg
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LuggageSelector;
