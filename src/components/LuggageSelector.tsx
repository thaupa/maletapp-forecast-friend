
import React from 'react';
import { cn } from '@/lib/utils';
import { LUGGAGE_TYPES } from '@/data/mockData';
import { LuggageType } from '@/types';
import { 
  Backpack, 
  Suitcase 
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
        return <Suitcase size={40} className="text-maletapp-blue" />;
      case 'medium':
        return <Suitcase size={48} className="text-maletapp-blue" />;
      case 'large':
        return <Suitcase size={56} className="text-maletapp-blue" />;
      default:
        return <Suitcase size={48} className="text-maletapp-blue" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {LUGGAGE_TYPES.map((luggage) => (
        <div
          key={luggage.type}
          className={cn(
            "luggage-card border rounded-lg",
            selected === luggage.type ? "selected" : ""
          )}
          onClick={() => onSelect(luggage.type)}
        >
          {getIcon(luggage.type)}
          <span className="text-sm font-medium">{luggage.name}</span>
          <span className="text-xs text-gray-500">
            {luggage.dimensions.width} x {luggage.dimensions.height} x {luggage.dimensions.depth} cm
          </span>
          <span className="text-xs text-gray-600 font-semibold">
            {(luggage.volume / 1000).toFixed(1)} litros
          </span>
        </div>
      ))}
    </div>
  );
};

export default LuggageSelector;
